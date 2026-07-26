import time
import paho.mqtt.client as mqtt

# Configurações do Broker e Autenticação
BROKER = "andre.belem.br"  # Substitua pelo IP ou URL do seu broker
PORTA = 1883
TOPICO = "casa/temperatura"
USUARIO = "usuario_mqtt"
SENHA = "usuario_mqtt"


# Função executada quando a conexão é estabelecida
def ao_conectar(client, userdata, flags, rc, properties=None):
    if rc == 0:
        print("Conectado com sucesso ao Broker!")
        client.subscribe(TOPICO)
        print(f"Inscrito no tópico: {TOPICO}")
    else:
        print(f"Falha na conexão. Código de retorno: {rc}")


# Função executada quando uma nova mensagem chega
def ao_receber_mensagem(client, userdata, msg):
    mensagem_texto = msg.payload.decode()
    print(f"Mensagem recebida no tópico {msg.topic}: {mensagem_texto}")


# Inicializa o cliente MQTT (API Callback v2)
cliente = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)

# Configura as credenciais de usuário e senha
cliente.username_pw_set(USUARIO, SENHA)

# Define as funções de retorno (callbacks)
cliente.on_connect = ao_conectar
cliente.on_message = ao_receber_mensagem

# Conecta ao broker
print("Conectando ao broker...")
cliente.connect(BROKER, PORTA, 60)

# Inicia o loop de escuta em segundo plano
cliente.loop_start()

# Mantém o script rodando para receber as mensagens
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("\nDesconectando...")
    cliente.loop_stop()
    cliente.disconnect()
    print("Programa encerrado.")
