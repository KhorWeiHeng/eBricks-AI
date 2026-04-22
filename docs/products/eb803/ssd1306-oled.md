---
id: "ssd1306-oled"
name: "SSD1306 OLED"
description: "The SSD1306 is a monochrome, 0.96-inch OLED display. It is widely used in embedded projects because it does not require a backlight, resulting in a high contrast ratio and very low power consumption."
icon: "Monitor"
isFunctional: "true"
color: "#B2D7E8"
image: "https://cec.clphs.oncloud.my/web/image/4271-53471c0a/%E6%88%AA%E5%B1%8F2026-03-27%20%E4%B8%8A%E5%8D%8812.34.11.png"
specs:
  resolution: "128 x 64 pixels"
  interface: "I2C (4-pin)"
  voltage: "3.3V to 5V DC"
  address: "0x3C"
detailedSpecs:
  - title: Electrical Characteristics
    items:
      Display Resolution: "128 x 64 pixels"
      Interface: "I2C (4-pin) or SPI (7-pin)"
      Operating Voltage: "3.3V to 5V DC"
      Current Consumption: "10mA to 20mA"
      Protocol: "I2C (Address 0x3C or 0x3D)"
      Operating Temp: "-40°C to +85°C"
  - title: Pin Configuration (I2C)
    items:
      VCC: "Power input (3.3V or 5V)"
      GND: "Ground"
      SCL: "Serial Clock (I2C Clock)"
      SDA: "Serial Data (I2C Data)"
  - title: Working Principle
    items:
      Self-Emissive: "OLED pixels emit light; no backlight"
      Addressing: "Uses internal GDDRAM for image data"
      Pixel Control: "1 bit = 1 pixel (On/Off)"
      Power Efficiency: "Scales with number of lit pixels"
  - title: Implementation Notes
    items:
      Library: "Adafruit SSD1306 + GFX standard"
      I2C Pull-ups: "4.7kΩ may be needed for long runs"
      Burn-in: "Avoid static images at max brightness"
      Address Scan: "Use I2C Scanner to verify 0x3C/0x3D"
      Memory Usage: "Uses 1KB SRAM for 128x64 buffer"
  - title: Critical Tips
    items:
      Display Command: "Must call display.display() to update"
      Text Wrapping: "GFX supports auto wrapping by default"
quickStart:
  connection:
    - VCC -> 3.3V
    - GND -> GND
    - SCL -> GPIO 9 (Standard SCL)
    - SDA -> GPIO 8 (Standard SDA)
  code: |
    #include <Wire.h>
    #include <Adafruit_GFX.h>
    #include <Adafruit_SSD1306.h>
    
    #define SCREEN_WIDTH 128
    #define SCREEN_HEIGHT 64
    #define OLED_RESET -1
    #define SCREEN_ADDRESS 0x3C
    
    Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
    
    void setup() {
      Serial.begin(115200);
    
      if(!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
        Serial.println(F("SSD1306 allocation failed"));
        for(;;);
      }
    
      display.clearDisplay();
      display.setTextSize(1);
      display.setTextColor(SSD1306_WHITE);
      display.setCursor(0,0);
      display.println(F("Ebricks System"));
      display.println(F("Status: ONLINE"));
      
      display.setCursor(0, 30);
      display.setTextSize(2);
      display.println(F("READY"));
    
      display.display();
    }
    
    void loop() {
      // Add dynamic updates here
    }
---
