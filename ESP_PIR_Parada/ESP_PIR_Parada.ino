// BusFlow - Detecção de presença na parada
// Um sensor PIR verifica periodicamente se há alguém na parada, acende um LED
// local e publica o estado via MQTT no tópico busStop/lightDetection.

#include <WiFi.h>
#include <PubSubClient.h>

#include "secrets.h"  // copie secrets.example.h -> secrets.h

// Identificador da parada cadastrada na API
const int BUS_STOP_ID = 4;

// Pinos
#define PIR_PIN 34   // Sensor PIR
#define LED_PIN 2    // LED

// MQTT
const char* MQTT_TOPIC = "busStop/lightDetection";
const char* MQTT_CLIENT_ID = "ESP32_PIR";

WiFiClient espClient;
PubSubClient client(espClient);

// Controle de tempo
const unsigned long INTERVALO_MS = 5000;  // 5 segundos
unsigned long ultimoTeste = 0;

void conectarWiFi();
void reconnectMQTT();

void setup() {
  Serial.begin(115200);

  pinMode(PIR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);

  conectarWiFi();

  client.setServer(MQTT_SERVER, MQTT_PORT);

  Serial.printf("Sensor PIR iniciado. Verificando a cada %lu ms...\n", INTERVALO_MS);
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    conectarWiFi();
  }
  if (!client.connected()) {
    reconnectMQTT();
  }
  client.loop();

  unsigned long agora = millis();

  if (agora - ultimoTeste >= INTERVALO_MS) {
    ultimoTeste = agora;

    bool detectado = digitalRead(PIR_PIN) == HIGH;

    digitalWrite(LED_PIN, detectado ? HIGH : LOW);

    Serial.print("Movimento detectado? ");
    Serial.println(detectado ? "Sim - LED ON" : "Não - LED OFF");

    String mensagem = "{\"busStopId\": " + String(BUS_STOP_ID) +
                      ", \"detection\": " + (detectado ? "true" : "false") + "}";
    if (!client.publish(MQTT_TOPIC, mensagem.c_str())) {
      Serial.println("Falha ao publicar no MQTT");
    }
  }
}

void conectarWiFi() {
  Serial.println();
  Serial.print("Conectando ao Wi-Fi ");
  Serial.println(WIFI_SSID);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWi-Fi conectado.");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

void reconnectMQTT() {
  while (!client.connected()) {
    Serial.print("Conectando ao MQTT...");
    if (client.connect(MQTT_CLIENT_ID)) {
      Serial.println("Conectado ao MQTT!");
    } else {
      Serial.print("Falhou, rc=");
      Serial.print(client.state());
      Serial.println(" Tentando novamente em 5 segundos...");
      delay(5000);
    }
  }
}
