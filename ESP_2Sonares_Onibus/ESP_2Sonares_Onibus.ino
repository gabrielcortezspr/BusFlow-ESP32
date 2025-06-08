#include <WiFi.h>
#include <PubSubClient.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

// Pinos dos sensores
#define TRIG_PIN1 5    // Sensor de entrada
#define ECHO_PIN1 18
#define TRIG_PIN2 33   // Sensor de saída
#define ECHO_PIN2 32

// Wi-Fi
const char* ssid = "Familia Monte";
const char* password = "Brasil@oi23";

// MQTT
const char* mqtt_server = "192.168.100.43";
const int mqtt_port = 1883;
const char* mqtt_topic_in = "bus/in";
const char* mqtt_topic_out = "bus/out";

// Objetos
WiFiClient espClient;
PubSubClient client(espClient);
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", -4 * 3600, 60000); // UTC-4 (Manaus)

bool person_entering = false;
bool person_exiting = false;

void setup() {
  Serial.begin(115200);

  pinMode(TRIG_PIN1, OUTPUT);
  pinMode(ECHO_PIN1, INPUT);
  pinMode(TRIG_PIN2, OUTPUT);
  pinMode(ECHO_PIN2, INPUT);

  conectarWiFi();
  client.setServer(mqtt_server, mqtt_port);
  timeClient.begin();

  Serial.println("Sensores iniciados.");
}

void loop() {
  if (!client.connected()) {
    reconnectMQTT();
  }
  client.loop();

  timeClient.update();

  long distEntrada = medirDistancia(TRIG_PIN1, ECHO_PIN1);
  long distSaida   = medirDistancia(TRIG_PIN2, ECHO_PIN2);

  String dataISO = getISO8601TimeWithMs();

  if (distEntrada > 0 && distEntrada < 30) {
    if (!person_entering) {
      person_entering = true;
      Serial.println("Pessoa entrou às " + dataISO);
      String mensagem = "{\"busId\": 3, \"date\": \"" + dataISO + "\"}";
      client.publish(mqtt_topic_in, mensagem.c_str());
    }
  } else {
    person_entering = false;
  }

  if (distSaida > 0 && distSaida < 30) {
    if (!person_exiting) {
      person_exiting = true;
      Serial.println("Pessoa saiu às " + dataISO);
      String mensagem = "{\"busId\": 3, \"date\": \"" + dataISO + "\"}";
      client.publish(mqtt_topic_out, mensagem.c_str());
    }
  } else {
    person_exiting = false;
  }

  delay(300);
}

long medirDistancia(int trig, int echo) {
  digitalWrite(trig, LOW);
  delayMicroseconds(2);
  digitalWrite(trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(trig, LOW);

  long duracao = pulseIn(echo, HIGH, 30000);
  if (duracao == 0) return -1;

  return duracao * 0.034 / 2;
}

String getISO8601TimeWithMs() {
  time_t rawTime = timeClient.getEpochTime();
  struct tm* timeinfo = gmtime(&rawTime); // UTC

  char buffer[30];
  strftime(buffer, sizeof(buffer), "%Y-%m-%dT%H:%M:%S.000Z", timeinfo); // milissegundos fixos
  return String(buffer);
}

void conectarWiFi() {
  Serial.print("Conectando ao Wi-Fi ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

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
    if (client.connect("ESP32_Sonar")) {
      Serial.println("Conectado ao MQTT!");
    } else {
      Serial.print("Falhou, rc=");
      Serial.print(client.state());
      Serial.println(" Tentando novamente em 5 segundos...");
      delay(5000);
    }
  }
}
