#include <WiFi.h>
#include <PubSubClient.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

// Pines
#define PIR_PIN 33   // Sensor PIR
#define LED_PIN 32   // LED

// Wi-Fi
const char* ssid = "Familia Monte";
const char* password = "Brasil@oi23";

// MQTT Broker (coloque o IP do seu broker Mosquitto)
const char* mqtt_server = "192.168.100.243"; // <-- IP da máquina que roda o Mosquitto
const int mqtt_port = 1883;
const char* mqtt_topic = "PIR";

// Objeto WiFi e MQTT
WiFiClient espClient;
PubSubClient client(espClient);

// NTP para hora
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", -4 * 3600, 60000); // Horário de Manaus

void setup() {
  Serial.begin(115200);

  pinMode(PIR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);

  conectarWiFi();

  client.setServer(mqtt_server, mqtt_port);

  timeClient.begin();

  Serial.println("Sensor PIR iniciado. Aguardando movimento...");
}

void loop() {
  if (!client.connected()) {
    reconnectMQTT();
  }
  client.loop();

  timeClient.update();

  int estadoPIR = digitalRead(PIR_PIN);

  if (estadoPIR == HIGH) {
    digitalWrite(LED_PIN, HIGH);
    Serial.println("Movimento detectado! LED ON");

    String hora = timeClient.getFormattedTime();
    Serial.println("Hora do evento: " + hora);

    String mensagem = "{\"evento\": \"movimento_detectado\", \"hora\": \"" + hora + "\"}";

    client.publish(mqtt_topic, mensagem.c_str());

    delay(2000); // Delay para não enviar muitas vezes seguidas
  } else {
    digitalWrite(LED_PIN, LOW);
    Serial.println("Sem movimento... LED OFF");
  }

  delay(2000);
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
