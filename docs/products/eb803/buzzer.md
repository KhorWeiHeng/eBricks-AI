---
id: "buzzer"
name: "eB243-R1_Piezo_Buzzer"
description: "Auditory feedback for gesture recognition events."
icon: "Volume2"
isFunctional: "true"
color: "#f5c518"
image: "https://cec.clphs.oncloud.my/web/image/4273-d3acf5a7/%E6%88%AA%E5%B1%8F2026-03-27%20%E4%B8%8A%E5%8D%882.10.35.png"
specs:
  type: "Active (Internal Osc)"
  voltage: "3.3V to 5V DC"
  frequency: "2.3kHz ± 300Hz"
  current: "< 30mA"
quickStart:
  connection:
    - VCC -> 3.3V
    - GND -> GND
    - Signal -> GPIO 1 (ESP32-S3)
  code: |
    const int buzzerPin = 1;
    
    void setup() {
      pinMode(buzzerPin, OUTPUT);
    }
    
    void loop() {
      digitalWrite(buzzerPin, HIGH);
      delay(500);
      digitalWrite(buzzerPin, LOW);
      delay(500);
    }
---
