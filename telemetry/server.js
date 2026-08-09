// Variables 
const express = require('express'); 
const http = require('http'); 
const WebSocket = require('ws'); 
const mqtt = require('mqtt'); 
const path = require('path'); 
const mysql = require('mysql2/promise'); 

const app = express(); 
const server = http.createServer(app); 
const wss = new WebSocket.Server({ server }); 
const PORT = 3000; 

// Broker Information 
const MQTT_CONFIG = { 
    host: 'andre.belem.br', 
    port: 1883, 
    username: 'usuario_mqtt', 
    password: 'usuario_mqtt', 
    protocol: 'mqtt' 
}; 
const MQTT_TOPIC = 'casa/temperatura'; 

// MySQL Connection Pool
const dbConfig = {
    host: 'localhost',       
    user: 'iot_user',        
    password: 'H7xK2m9P4wR6', 
    database: 'iot_monitoring',
    waitForConnections: true,
    connectionLimit: 10,     
    queueLimit: 0
};
const pool = mysql.createPool(dbConfig);

// Testar conexão inicial com o MySQL
async function testDatabaseConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('[MySQL] Conexao inicial testada com sucesso! Banco pronto.');
        connection.release();
    } catch (error) {
        console.error('[MySQL] ERRO NA INICIALIZACAO DO BANCO:', error.message);
    }
}
testDatabaseConnection();

// Static files
app.use('/libs/highcharts', express.static(path.join(__dirname, 'node_modules/highcharts'))); 
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); }); 
app.use(express.static(__dirname)); 

// Connect to MQTT
const mqttClient = mqtt.connect(MQTT_CONFIG); 
mqttClient.on('connect', () => { 
    console.log(`Connected to Broker: ${MQTT_CONFIG.host}`); 
    mqttClient.subscribe(MQTT_TOPIC, (err) => { 
        if (!err) console.log(`Successfully subscribed to: ${MQTT_TOPIC}`); 
    }); 
}); 

// Route incoming MQTT messages
mqttClient.on('message', async (topic, message) => { 
    let dbConnection;
    const messageStr = message.toString();

    // FILTRO: Se a mensagem for o aviso de conexão em texto puro, ignora sem estourar erro
    if (messageStr.startsWith('Cliente Conectado')) {
        console.log(`[MQTT Info] Mensagem de status recebida e ignorada: ${messageStr}`);
        return; 
    }

    try { 
        const payload = JSON.parse(messageStr); 
        console.log('Received payload:', payload); 

        // Mapeamento exato do seu JSON do ESP32
        const deviceId         = payload.Device_id || 'dispositivo_padrao';
        const deviceName       = payload.Device_name || 'Sensor Casa';
        const localIp          = payload.Local_Ip || null;
        const publicIp         = payload.public_ip || null; 
        const rssi             = payload.RSSI !== undefined ? payload.RSSI : null;
        const batteryLevel     = payload.Battery !== undefined ? payload.Battery : null; 
        const firmwareVersion  = payload.Firmware || null;
        const uptime           = payload.Up_Time !== undefined ? payload.Up_Time : null;
        
        const temperature      = payload.Temperature_C !== undefined ? parseFloat(payload.Temperature_C) : undefined;
        const humidity         = payload.Humidity_Percent !== undefined ? parseFloat(payload.Humidity_Percent) : undefined;
        const lightIntensity   = payload.Light_ADC !== undefined ? parseInt(payload.Light_ADC) : undefined;

        // Persistência no Banco de Dados
        if (temperature !== undefined && humidity !== undefined && lightIntensity !== undefined) {
            try {
                dbConnection = await pool.getConnection();
                await dbConnection.beginTransaction();

                const upsertDeviceQuery = `
                    INSERT INTO devices (
                        device_id, device_name, local_ip, public_ip, rssi, 
                        battery_level, firmware_version, uptime, status
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'online')
                    ON DUPLICATE KEY UPDATE
                        device_name = VALUES(device_name),
                        local_ip = VALUES(local_ip),
                        public_ip = VALUES(public_ip),
                        rssi = VALUES(rssi),
                        battery_level = VALUES(battery_level),
                        firmware_version = VALUES(firmware_version),
                        uptime = VALUES(uptime),
                        status = 'online';
                `;
                
                await dbConnection.execute(upsertDeviceQuery, [
                    deviceId, deviceName, localIp, publicIp, rssi, 
                    batteryLevel, firmwareVersion, uptime
                ]);

                const insertTelemetryQuery = `
                    INSERT INTO sensor_data (
                        device_id, temperature, humidity, light_intensity
                    ) VALUES (?, ?, ?, ?);
                `;
                await dbConnection.execute(insertTelemetryQuery, [
                    deviceId, temperature, humidity, lightIntensity
                ]);

                await dbConnection.commit();
                console.log(`[MySQL] Dados salvos com sucesso para o ID: ${deviceId}`);
            } catch (dbError) {
                console.error('[MySQL Error] Falha ao salvar no banco:', dbError.message);
                if (dbConnection) await dbConnection.rollback();
            } finally {
                if (dbConnection) dbConnection.release();
            }
        } else {
            console.warn('[MySQL Warning] Valores de sensores nao identificados no JSON.');
        }

        // Envio para o WebSocket (Highcharts)
        const graphPackage = { x: Date.now(), payload: payload }; 
        wss.clients.forEach((client) => { 
            if (client.readyState === WebSocket.OPEN) { 
                client.send(JSON.stringify(graphPackage)); 
            } 
        }); 

    } catch (error) { 
        console.error('Invalid JSON payload received:', messageStr); 
    } 
}); 

mqttClient.on('error', (err) => { console.error('MQTT Client Connection Error:', err); }); 

server.listen(PORT, () => { console.log(`Dashboard active at http://localhost:${PORT}`); });
