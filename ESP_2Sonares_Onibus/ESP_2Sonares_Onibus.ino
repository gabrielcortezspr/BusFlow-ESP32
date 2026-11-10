// BusFlow - Contador de passageiros (ônibus)
// Dois sensores ultrassônicos HC-SR04 detectam entrada e saída de pessoas
// e publicam o evento via MQTT nos tópicos bus/in e bus/out.

#include <WiFi.h>
#include <PubSubClient.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

#include "secrets.h"  // copie secrets.example.h -> secrets.h

// Identificador do ônibus cadastrado na API
const int BUS_ID = 3;

// Pinos dos sensores
#define TRIG_PIN1 5    // Sensor de entrada
#define ECHO_PIN1 18
#define TRIG_PIN2 33   // Sensor de saída
#define ECHO_PIN2 32

// Distância (cm) abaixo da qual consideramos que há uma pessoa passando
const long DETECTION_DISTANCE_CM = 30;
const unsigned long LOOP_DELAY_MS = 300;

// MQTT
const char* MQTT_TOPIC_IN  = "bus/in";
const char* MQTT_TOPIC_OUT = "bus/out";
const char* MQTT_CLIENT_ID = "ESP32_Sonar";

// Objetos
WiFiClient espClient;
PubSubClient client(espClient);
WiFiUDP ntpUDP;
// Offset 0: o timestamp é enviado em UTC (sufixo "Z" no ISO 8601).
// A conversão para o fuso local (ex.: Manaus, UTC-4) fica a cargo de quem consome.
NTPClient timeClient(ntpUDP, "pool.ntp.org", 0, 60000);

bool person_entering = false;
bool person_exiting = false;

long medirDistancia(int trig, int echo);
String getISO8601Time();
void conectarWiFi();
void reconnectMQTT();
void publicarEvento(const char* topic, const String& dataISO);

void setup() {
  Serial.begin(115200);

  pinMode(TRIG_PIN1, OUTPUT);
  pinMode(ECHO_PIN1, INPUT);
  pinMode(TRIG_PIN2, OUTPUT);
  pinMode(ECHO_PIN2, INPUT);

  conectarWiFi();
  client.setServer(MQTT_SERVER, MQTT_PORT);
  timeClient.begin();

  Serial.println("Sensores iniciados.");
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    conectarWiFi();
  }
  if (!client.connected()) {
    reconnectMQTT();
  }
  client.loop();

  timeClient.update();

  long distEntrada = medirDistancia(TRIG_PIN1, ECHO_PIN1);
  long distSaida   = medirDistancia(TRIG_PIN2, ECHO_PIN2);

  bool detectouEntrada = distEntrada > 0 && distEntrada < DETECTION_DISTANCE_CM;
  bool detectouSaida   = distSaida > 0 && distSaida < DETECTION_DISTANCE_CM;

  // Só publica na borda de subida para não contar a mesma pessoa várias vezes
  if (detectouEntrada && !person_entering) {
    String dataISO = getISO8601Time();
    Serial.println("Pessoa entrou às " + dataISO);
    publicarEvento(MQTT_TOPIC_IN, dataISO);
  }
  person_entering = detectouEntrada;

  if (detectouSaida && !person_exiting) {
    String dataISO = getISO8601Time();
    Serial.println("Pessoa saiu às " + dataISO);
    publicarEvento(MQTT_TOPIC_OUT, dataISO);
  }
  person_exiting = detectouSaida;

  delay(LOOP_DELAY_MS);
}

void publicarEvento(const char* topic, const String& dataISO) {
  String mensagem = "{\"busId\": " + String(BUS_ID) + ", \"date\": \"" + dataISO + "\"}";
  if (!client.publish(topic, mensagem.c_str())) {
    Serial.println("Falha ao publicar no MQTT");
  }
}

long medirDistancia(int trig, int echo) {
  digitalWrite(trig, LOW);
  delayMicroseconds(2);
  digitalWrite(trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(trig, LOW);

  long duracao = pulseIn(echo, HIGH, 30000);
  if (duracao == 0) return -1;

  return duracao * 0.034 / 2;  // velocidade do som: 0,034 cm/us (ida e volta)
}

String getISO8601Time() {
  time_t rawTime = timeClient.getEpochTime();
  struct tm* timeinfo = gmtime(&rawTime);  // UTC

  char buffer[30];
  strftime(buffer, sizeof(buffer), "%Y-%m-%dT%H:%M:%S.000Z", timeinfo);  // NTPClient não fornece ms
  return String(buffer);
}

void conectarWiFi() {
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
