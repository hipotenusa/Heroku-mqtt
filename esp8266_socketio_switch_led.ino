#define ESP8266
#include <SocketIOClient.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

SocketIOClient client;
ESP8266WiFiMulti wifiMulti;

unsigned long previousMillis = 0;
long interval = 5000;

char host[] = "192.168.1.132";
int port = 1234;
extern String RID;
extern String Rname;
extern String Rcontent;

void setup() {

  pinMode(LED_BUILTIN, OUTPUT);

  Serial.begin(115200);
  delay(10);
  //Serial.setDebugOutput(true);

// Connect to best WiFi network
  WiFi.mode(WIFI_STA);
  wifiMulti.addAP("infected", "7d329419fbebe50da45b");
  wifiMulti.addAP("JAZZTEL_aHQg", "am3nb4md7mgr");
  wifiMulti.addAP("Laika", "Hola1234");
  wifiMulti.addAP("AquarisM5", "Hola1234");

  Serial.println();
  Serial.print("Connecting to WiFi");
  while(int stat = wifiMulti.run() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
    //Serial.print("WiFi not connected! run returned: ");
    //Serial.println(stat);
  }

  Serial.println("");
  Serial.println("WiFi connected"); 
  WiFi.printDiag(Serial);

// Connect to SocketIO server
  if (!client.connect(host, port))
  {
    Serial.println("connection failed");
    return;
  }
  
  if (client.connected())
  {
    client.send("connection", "message", "Connected !!!!");
  }  
}

void loop() {

  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis > interval)
  {
    previousMillis = currentMillis;
    client.heartbeat(0);
  }

  if (client.monitor())
  {
    if (RID == "cb01" && Rname == "status")
    {
      if (Rcontent == "On")
      {
        digitalWrite(LED_BUILTIN, LOW);
        client.send("ledAGS", "status", "On");
      }
      else if (Rcontent == "Off")
      {
        digitalWrite(LED_BUILTIN, HIGH);
        client.send("ledAGS", "status", "Off");
      }
    }
  }
}
