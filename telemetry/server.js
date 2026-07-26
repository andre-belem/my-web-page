const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mqtt = require('mqtt');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configurações do Broker MQTT
const BROKER_URL = 'mqtt://andre.belem.br';
const TOPIC = 'sensor/dados'; // Substitua pelo tópico real do seu sensor
const mqttOptions = {
    username: 'usuario_mqtt',
    password: 'usuario_mqtt'
};

// Conexão com o Broker MQTT
const client = mqtt.connect(BROKER_URL, mqttOptions);

client.on('connect', () => {
    console.log('Conectado ao broker MQTT andre.belem.br');
    client.subscribe(TOPIC, (err) => {
        if (!err) console.log(`Inscrito no tópico: ${TOPIC}`);
    });
});

// Recebendo dados do sensor e enviando para o front-end
client.on('message', (topic, message) => {
    try {
        const dados = JSON.parse(message.toString());
        // Exemplo esperado de payload: { "temperatura": 25.5, "umidade": 60 }
        
        console.log('Dados recebidos:', dados);

        // Emite os dados em tempo real para os clientes conectados
        io.emit('dadosSensor', dados);
    } catch (e) {
        console.error('Erro ao processar mensagem JSON:', e.message);
    }
});

// Servir os arquivos estáticos (Frontend)
app.use(express.static('public'));

server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
