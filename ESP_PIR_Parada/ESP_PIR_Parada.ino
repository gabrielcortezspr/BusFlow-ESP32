#include <WiFi.h>
#include <PubSubClient.h>

// Pines
#define PIR_PIN 34   // Sensor PIR
#define LED_PIN 2    // LED

// Wi-Fi
const char* ssid = "Familia Monte";
const char* password = "Brasil@oi23";

// MQTT Broker
const char* mqtt_server = "192.168.100.43";
const int mqtt_port = 1883;
const char* mqtt_topic = "busStop/lightDetection";

WiFiClient espClient;
PubSubClient client(espClient);

const int busStopId = 4;

// Controle de tempo
unsigned long ultimoTeste = 0;
const unsigned long intervalo = 5000; // 15 segundos

void setup() {
  Serial.begin(115200);

  pinMode(PIR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);

  conectarWiFi();

  client.setServer(mqtt_server, mqtt_port);

  Serial.println("Sensor PIR iniciado. Verificando a cada 15 segundos...");
}

void loop() {
  if (!client.connected()) {
    reconnectMQTT();
  }
  client.loop();

  unsigned long agora = millis();

  if (agora - ultimoTeste >= intervalo) {
    ultimoTeste = agora;

    int estadoPIR = digitalRead(PIR_PIN);
    bool detectado = (estadoPIR == HIGH);

    digitalWrite(LED_PIN, detectado ? HIGH : LOW);

    Serial.print("Movimento detectado? ");
    Serial.println(detectado ? "Sim - LED ON" : "Não - LED OFF");

    String mensagem = "{\"busStopId\": " + String(busStopId) + ", \"detection\": " + (detectado ? "true" : "false") + "}";
    client.publish(mqtt_topic, mensagem.c_str());
  }
}

void conectarWiFi() {
  Serial.println();
  Serial.print("Conectando ao Wi-Fi ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("Wi-Fi conectado.");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

void reconnectMQTT() {
  while (!client.connected()) {
    Serial.print("Conectando ao MQTT...");
    if (client.connect("ESP32_PIR")) {
      Serial.println("Conectado ao MQTT!");
    } else {
      Serial.print("Falhou, rc=");
      Serial.print(client.state());
      Serial.println(" Tentando novamente em 5 segundos...");
      delay(5000);
    }
  }
}
