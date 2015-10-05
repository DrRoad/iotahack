#include <SoftwareSerial.h>

#include "DHT.h"
#define DHTTYPE DHT11

#define DHTPIN 2
#define ledPin 13

String DevID ="2003";

DHT dht(DHTPIN, DHTTYPE);
float Humd;
float TempC;
float hic;
void setup() 
{                
  pinMode(ledPin, OUTPUT);    
  Serial.begin(9600); 
  dht.begin();
}

void loop() 
{    
  digitalWrite(ledPin, HIGH);   
  delay(2500);               
  Humd = dht.readHumidity();
  // Read temperature as Celsius (the default)
  TempC = dht.readTemperature();
  if (isnan(Humd) || isnan(TempC)) 
  {
    Serial.println("ERROR");
    while(1);
  }
  
  // Compute heat index in Celsius (isFahreheit = false)
  hic = dht.computeHeatIndex(TempC, Humd, false);
  SendSerial();
  digitalWrite(ledPin, LOW);
}

void SendSerial(void)
{
      digitalWrite(ledPin, LOW);//http://iotahack.eu-gb.mybluemix.net/sensorpush?di=3232&tp=21&hu=43&wa=3.4

    // prepare GET string
    String getStr = "http://iotahack.eu-gb.mybluemix.net/sensorpush?";
    getStr +="DevID=";
    getStr += String(DevID);
    getStr +=",&Temperature=";
    getStr += String(TempC);
    getStr +=",&Humidity=";
    getStr += String(Humd);
 //   getStr += "\r\n\r\n";
    Serial.println(getStr);
   delay(15000);
}


