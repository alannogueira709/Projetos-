#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <ESP32Servo.h> 
#include <ESPAsyncWebServer.h>
#include <AsyncTCP.h>
#define IO_USERNAME  "alandpn"
#define IO_KEY  "aio_migT28OaToelahHEDAeTk4NwTysP"


const char* ssid = "Osvaldo Oi Fibra_2.4G";
const char* password = "osvaldo2019";
const char* mqttserver = "io.adafruit.com";
const int mqttport = 1883;
const char* mqttUser = IO_USERNAME;
const char* mqttPassword = IO_KEY;

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE (50)
char msg[MSG_BUFFER_SIZE];
int value = 0;

const int motor1pinA = 2;
const int motor1pinB = 5;
const int motor2pinA = 4;
const int  motor2pinB = 3;
int servoPosInit = 0;
int pwm_inicial = 155;
int pwm_medio = 100;
Servo s1;
Servo s2;

AsyncWebServer server(80);

void moverRobo(String direcao) {
      if (direcao == "cima") {
        digitalWrite(motor1pinA, pwm_inicial);
        digitalWrite(motor2pinA, pwm_inicial);
        delay(200);
        for(int i = 0; i<255; i+=15){
            pwm_inicial += 15;
        }
      } else if (direcao == "baixo") {
        digitalWrite(motor1pinB, pwm_inicial);
        digitalWrite(motor2pinB, pwm_inicial);
        delay(200);
        for(int i = 0; i<255; i+=15){
            pwm_inicial += 15;
        }
      } else if (direcao == "esquerda") {
        digitalWrite(motor1pinA, pwm_medio);
        digitalWrite(motor2pinB, pwm_inicial);
      } else if (direcao == "direita") {
        digitalWrite(motor1pinB, pwm_medio);
        digitalWrite(motor2pinA, pwm_inicial);
      } else if (direcao == "garraCima") {
        while(direcao == "garraCima"){
          servoPosInit += 15;
          s1.write(servoPosInit);
          s2.write(servoPosInit);
          delay(200);
        }
      } else if (direcao == "garraBaixo") {
        while(direcao == "garraBaixo"){  
          servoPosInit -= 15;
          s1.write(servoPosInit);
          s2.write(servoPosInit);
          delay(200);
        }   
  } 
}

void handlePostRequest(AsyncWebServerRequest *request) {
  if (request->method() == HTTP_POST) {
    String requestBody = request->arg("plain");

    DynamicJsonDocument jsonDoc(512);
    DeserializationError error = deserializeJson(jsonDoc, requestBody);

    if (error) {
      request->send(400, "application/json", "{\"message\":\"Erro no formato JSON\"}");
    } else {
      String direcao = jsonDoc["direcao"];
      moverRobo(direcao);
      request->send(200, "application/json", "{\"message\":\"Comando executado com sucesso\"}");
    }
  } else {
    request->send(400, "application/json", "{\"message\":\"Requisição inválida\"}");
  }
} 

void handleNotFound(AsyncWebServerRequest *request) {
  request->send(404);
}

void setup() {
    s1.attach(6);
    s2.attach(7);
    
    pinMode(motor1pinA, OUTPUT);
    pinMode(motor1pinB, OUTPUT);
    pinMode(motor2pinA, OUTPUT);
    pinMode(motor2pinB, OUTPUT);
    
    Serial.begin(115200);

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
      delay(1000);
      Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi conectado");
    Serial.println("Endereço IP: " + WiFi.localIP().toString());

    server.on("/controller", HTTP_POST, handlePostRequest);
    server.onNotFound(handleNotFound);
    server.begin();
    Serial.println("Servidor HTTP iniciado");
}

void loop() {
  //server.handleClient();
}
