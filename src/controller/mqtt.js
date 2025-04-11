import mqtt from "mqtt";

// Variabel global untuk menyimpan data sensor
let sensorData = [];

export default function initializeMQTT() {
  const broker = process.env.MQTT_BROKER || "mqtt://192.168.101.33:1883";
  const topic = process.env.MQTT_TOPIC || "sensor/data";

  const client = mqtt.connect(broker);

  client.on("connect", () => {
    console.log("Connected to MQTT broker");
    client.subscribe(topic, (err) => {
      if (err) {
        console.error("Error subscribing to MQTT topic:", err);
      }
    });
  });

  client.on("message", (topic, message) => {
    console.log(`Topic: ${topic}, Message: ${message.toString()}`);
    try {
      const parsedData = JSON.parse(message.toString()); // Update data sensor
      if (parsedData && typeof parsedData === "object") {
        sensorData.push(parsedData);
      } else {
        console.warn("received invalid data format");
      }
    } catch (error) {
      console.error("Error parsing MQTT message:", error.message);
    }
  });

  return client; // Mengembalikan instance MQTT client jika diperlukan
}

// Fungsi untuk mendapatkan data sensor
export function getSensorData() {
  return sensorData;
}
