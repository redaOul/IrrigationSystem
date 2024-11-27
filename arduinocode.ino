#include <WiFi.h>
#include <FirebaseESP32.h>

// Define pins
const int moistureSensorPin = 34;  // Analog pin for the soil moisture sensor
const int relayPin = 23;           // Digital pin for the relay control

// Define moisture threshold
const int moistureThreshold = 500; // Adjust based on sensor's reading in dry soil

const char* WIFI_SSID = "Support";
const char* WIFI_PASSWORD = "12345678910";

#define FIREBASE_HOST "https://irrigationsystem-5901f-default-rtdb.europe-west1.firebasedatabase.app/" // Replace with your Firebase Realtime Database URL
#define FIREBASE_AUTH "xVkWtWvrHmMesZcDsmzcfKwjFM53zqaVbJI0A7Fm"        // Replace with your database secret

FirebaseData firebaseData; // Firebase object
FirebaseConfig firebaseConfig; // Firebase configuration object
FirebaseAuth firebaseAuth; // Firebase authentication object (if required for authentication)
void setup() {
  // Initialize serial monitor
  Serial.begin(115200);

  // Set pin modes
  pinMode(moistureSensorPin, INPUT);f
  pinMode(relayPin, INPUT);

  // Ensure the relay is off initially (pump is off)
  digitalWrite(relayPin, LOW);
  // Connect to WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConnected to Wi-Fi");

  // Connect to Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true); // Ensure WiFi reconnects if disconnected
}
void loop() {
  // Read soil moisture level
  int moistureLevel = analogRead(moistureSensorPin);

  // Display moisture level on the serial monitor
  Serial.print("Soil Moisture Level: ");
  Serial.println(moistureLevel);

  // Check if the moisture level is below the threshold
  if (moistureLevel < moistureThreshold) {
    // Soil is dry, turn on the pump
    digitalWrite(relayPin, HIGH);
    Serial.println("Soil is dry. Turning on the pump.");
  } else {
    // Soil has enough moisture, turn off the pump
    digitalWrite(relayPin, LOW);
    Serial.println("Soil has enough moisture. Pump is off.");
  }
  // Send data to Firebase
  if (Firebase.setInt(firebaseData, "/SoilMoisture", moisturePercent)) {
    Serial.println("Data sent to Firebase successfully.");
  } else {
    Serial.print("Error sending data: ");
    Serial.println(firebaseData.errorReason());
  }

  // Wait before taking the next reading
  delay(1000);
}