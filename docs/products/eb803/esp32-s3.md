---
id: "esp32-s3"
name: "eB246-R1_ESP32-S3-DevKit"
description: "Powerful AI-capable microcontroller with Wi-Fi and Bluetooth."
icon: "Cpu"
isFunctional: "true"
color: "#0071e3"
image: "https://cec.clphs.oncloud.my/web/image/4265-3c75e251/%E6%88%AA%E5%B1%8F2026-03-26%20%E4%B8%8B%E5%8D%8811.23.05.png"

specs:
  cpu: "Xtensa® Dual-core 32-bit LX7"
  clock: "Up to 240 MHz"
  memory: "512KB SRAM / 384KB ROM"
  flash: "8MB/16MB Quad SPI"
  wireless: "Wi-Fi + BT 5.0 (LE)"
  ai: "Vector Instructions Support"
  io: "45 Programmable GPIOs"
  voltage: "3.0V to 3.6V (Internal)"
detailedSpecs:
  - title: Core Processor & Memory
    items:
      CPU: "Xtensa® Dual-core 32-bit LX7"
      Clock Speed: "Up to 240 MHz"
      SRAM: "512KB Internal"
      ROM: "384 KB"
      Flash/PSRAM: "8MB PSRAM / 16MB Flash"
  - title: Connectivity
    items:
      Wi-Fi: "2.4 GHz (802.11 b/g/n), 150 Mbps"
      Bluetooth: "BT 5 (LE) with Mesh support"
      AI Acceleration: "Supports Vector Instructions"
  - title: Hardware Interfaces
    items:
      GPIOs: "45 programmable pins"
      USB: "Integrated Full-speed USB OTG"
      Analog: "2 × 12-bit ADCs (20 channels)"
      Digital: "3xUART, 2xI2C, 4xSPI, 1xI2S"
      Touch: "14 × Capacitive sensors"
  - title: Electrical Characteristics
    items:
      Power Supply: "5V via USB or Ext Pin"
      Logic Level: "3.3V (Not 5V tolerant)"
      Operating Current: "80 mA (Peak 500 mA)"
      Operating Temp: "-40°C to +85°C"

add_paragraph_specs: |
  Board Components:

  a. USB-to-UART Port: Used for power supply, firmware flashing, and serial communication.

  b. ESP32-S3 USB Port: A native USB interface for OTG, HID, or virtual disk applications.

  c. Reset (EN) Button: Used to restart the system.

  d. Boot Button: Used to enter the firmware download mode.

add_paragraph_schematic: |
  Hardware Interfaces & Peripherals
  a. The ESP32-S3 provides a vast array of programmable pins:

  b. GPIOs: 45 programmable pins.

  c. USB: Integrated Full-speed USB OTG (supports CDC, HID, MSC).

  d. Analog: 2 × 12-bit ADCs (up to 20 channels).

  e. Digital Interfaces:

  3 × UART, 2 × I2C, 4 × SPI.

  1 × I2S (for digital audio/microphones).

  8 × PWM channels (for LED or Motor control).

Touch: 14 × Capacitive touch sensors.

quickStart:
  connection:
    - VCC -> 5V or 3.3V
    - GND -> GND
    - USB -> Type-C to PC
  code: |
    void setup() {
      Serial.begin(115200);
      Serial.println("ESP32-S3 Initialized");
    }
    
    void loop() {
      // AI inference or sensor reading
      delay(1000);
    }
---
