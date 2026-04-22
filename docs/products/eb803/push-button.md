---
id: "push-button"
name: "eB206-R3_Tact_SW"
description: "Simple user input interface for triggering events."
icon: "Hand"
isFunctional: "true"
color: "#248a3d"
image: "https://cec.clphs.oncloud.my/web/image/4268-d5c95904/%E6%88%AA%E5%B1%8F2026-03-27%20%E4%B8%8A%E5%8D%8812.26.23.png"
schematic: "https://cec.clphs.oncloud.my/web/image/4249-0439eb62/%E6%88%AA%E5%B1%8F2026-03-27%20%E4%B8%8A%E5%8D%8812.30.49.png"
specs:
  type: "Tactile Switch"
  voltage: "Max 12V DC"
  current: "Max 50mA"
  life: "100,000 cycles"
quickStart:
  connection:
    - VCC -> 3.3V
    - GND -> GND (with Pull-down)
    - OUT -> GPIO 3 (ESP32-S3)
  code: |
    const int buttonPin = 3;
    
    void setup() {
      pinMode(buttonPin, INPUT);
    }
    
    void loop() {
      if (digitalRead(buttonPin) == HIGH) {
        // Action triggered
      }
    }
---
