---
id: "8-bit-led"
name: "eB202-R2_8_Bits_LED_Bar"
description: "Visual status indicator with 8 individually addressable LEDs."
icon: "Lightbulb"
isFunctional: "true"
color: "#d70015"
image: "https://cec.clphs.oncloud.my/web/image/4243-e7f9baea/%E6%88%AA%E5%B1%8F2026-03-27%20%E4%B8%8A%E5%8D%8812.17.24.png"
schematic: "https://cec.clphs.oncloud.my/web/image/4245-092db6bc/%E6%88%AA%E5%B1%8F2026-03-27%20%E4%B8%8A%E5%8D%8812.23.27.png"

specs:
  type: "WS2812B (RGB)"
  ledCount: "8 Pixels"
  voltage: "5V DC"
  interface: "Single-wire (DI)"
quickStart:
  connection:
    - VCC -> 5V
    - GND -> GND
    - DI -> GPIO 2 (ESP32-S3)
  code: |
    #include <Adafruit_NeoPixel.h>
    
    #define PIN 2
    #define NUMPIXELS 8
    
    Adafruit_NeoPixel pixels(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);
    
    void setup() {
      pixels.begin();
    }
    
    void loop() {
      for(int i=0; i<NUMPIXELS; i++) {
        pixels.setPixelColor(i, pixels.Color(0, 150, 0));
        pixels.show();
        delay(100);
      }
    }
---
