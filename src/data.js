export const componentsData = [
  {
    id: 'esp32-s3',
    name: 'ESP32-S3 DevKit',
    description: 'Powerful AI-capable microcontroller with Wi-Fi and Bluetooth.',
    icon: 'Cpu',
    isFunctional: true,
    color: 'blue',
    image: 'https://cec.clphs.oncloud.my/web/image/4265-3c75e251/%E6%88%AA%E5%B1%8F2026-03-26%20%E4%B8%8B%E5%8D%8811.23.05.png',
    specs: {
      cpu: 'Xtensa® Dual-core 32-bit LX7',
      clock: 'Up to 240 MHz',
      memory: '512KB SRAM / 384KB ROM',
      flash: '8MB/16MB Quad SPI',
      wireless: 'Wi-Fi + BT 5.0 (LE)',
      ai: 'Vector Instructions Support',
      io: '45 Programmable GPIOs',
      voltage: '3.0V to 3.6V (Internal)',
    },
    detailedSpecs: [
      {
        title: 'Core Processor & Memory',
        items: {
          'CPU': 'Xtensa® Dual-core 32-bit LX7',
          'Clock Speed': 'Up to 240 MHz',
          'SRAM': '512KB Internal',
          'ROM': '384 KB',
          'Flash/PSRAM': '8MB PSRAM / 16MB Flash',
        }
      },
      {
        title: 'Connectivity',
        items: {
          'Wi-Fi': '2.4 GHz (802.11 b/g/n), 150 Mbps',
          'Bluetooth': 'BT 5 (LE) with Mesh support',
          'AI Acceleration': 'Supports Vector Instructions',
        }
      },
      {
        title: 'Hardware Interfaces',
        items: {
          'GPIOs': '45 programmable pins',
          'USB': 'Integrated Full-speed USB OTG',
          'Analog': '2 × 12-bit ADCs (20 channels)',
          'Digital': '3xUART, 2xI2C, 4xSPI, 1xI2S',
          'Touch': '14 × Capacitive sensors',
        }
      },
      {
        title: 'Electrical Characteristics',
        items: {
          'Power Supply': '5V via USB or Ext Pin',
          'Logic Level': '3.3V (Not 5V tolerant)',
          'Operating Current': '80 mA (Peak 500 mA)',
          'Operating Temp': '-40°C to +85°C',
        }
      }
    ],
    quickStart: {
      connection: [
        'VCC -> 5V or 3.3V',
        'GND -> GND',
        'USB -> Type-C to PC',
      ],
      code: `void setup() {
  Serial.begin(115200);
  Serial.println("ESP32-S3 Initialized");
}

void loop() {
  // AI inference or sensor reading
  delay(1000);
}`,
    },
  },
  {
    id: 'mpu6050',
    name: 'MPU6050 IMU',
    description: 'The MPU-6050 is a MotionTracking device that contains an integrated 6-axis MotionFusion engine. It is widely used for balancing robots, orientation sensing, and motion detection.',
    icon: 'Activity',
    isFunctional: true,
    color: 'purple',
    image: 'https://cec.clphs.oncloud.my/web/image/4266-5a7a37ef/%E6%88%AA%E5%B1%8F2026-03-27%20%E4%B8%8A%E5%8D%8812.08.07.png',
    schematic: 'https://cec.clphs.oncloud.my/web/image/4241-6a2931d4/%E6%88%AA%E5%B1%8F2026-03-27%20%E4%B8%8A%E5%8D%8812.13.05.png',
    specs: {
      accelerometer: '±2/4/8/16g range',
      gyroscope: '±250/500/1000/2000°/s',
      interface: 'I2C (Address 0x68)',
      voltage: '2.37V to 3.46V',
    },
    detailedSpecs: [
      {
        title: 'Key Components',
        items: {
          '3-Axis Accelerometer': 'Measures linear acceleration',
          '3-Axis Gyroscope': 'Measures rate of rotation',
          'Digital Motion Processor': 'Internal 6-axis MotionFusion',
        }
      },
      {
        title: 'Electrical Characteristics',
        items: {
          'Operating Voltage': '2.37V to 3.46V (5V via regulator)',
          'Logic Level': '3.3V (Requires level shifting for 5V)',
          'Interface': 'I2C (up to 400 kHz)',
          'Current Consumption': '~3.9 mA (Operating)',
          'Temp Sensor': '-40°C to +85°C',
        }
      },
      {
        title: 'Sensor Ranges',
        items: {
          'Gyroscope Range': '±250, 500, 1000, 2000 °/sec',
          'Accelerometer Range': '±2g, 4g, 8g, 16g',
        }
      },
      {
        title: 'Pin Configuration',
        items: {
          'VCC / GND': 'Power Input & Ground',
          'SCL / SDA': 'I2C Clock and Data lines',
          'XDA / XCL': 'Auxiliary I2C bus',
          'AD0': 'I2C Address Select (0x68/0x69)',
          'INT': 'Interrupt output pin',
        }
      },
      {
        title: 'Working Principles',
        items: {
          'Accelerometer': 'Proof mass displacement sensing',
          'Gyroscope': 'Coriolis Effect measurement',
        }
      },
      {
        title: 'Implementation Notes',
        items: {
          'Calibration': 'Calculate & subtract zero-offset error',
          'Drift': 'Use Complementary/Kalman Filter',
          'I2C Pull-ups': 'Typically 2.2kΩ or 4.7kΩ included',
        }
      }
    ],
    quickStart: {
      connection: [
        'VCC -> 3.3V',
        'GND -> GND',
        'SCL -> GPIO 9 (ESP32-S3)',
        'SDA -> GPIO 8 (ESP32-S3)',
      ],
      code: `#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>

Adafruit_MPU6050 mpu;

void setup() {
  Serial.begin(115200);
  // Initialize I2C on ESP32-S3 pins
  Wire.begin(8, 9); 
  
  if (!mpu.begin()) {
    Serial.println("Failed to find MPU6050 chip");
    while (1) { delay(10); }
  }

  mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
  mpu.setGyroRange(MPU6050_RANGE_500_DEG);
  mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);
}

void loop() {
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  Serial.print("Accel X: "); Serial.print(a.acceleration.x);
  Serial.print(", Y: "); Serial.print(a.acceleration.y);
  Serial.print(", Z: "); Serial.println(a.acceleration.z);

  delay(100);
}`,
    },
  },
  {
    id: 'ssd1306-oled',
    name: 'SSD1306 OLED',
    description: 'The SSD1306 is a monochrome, 0.96-inch OLED display. It is widely used in embedded projects because it does not require a backlight, resulting in a high contrast ratio and very low power consumption.',
    icon: 'Monitor',
    isFunctional: true,
    color: 'blue',
    image: 'https://cec.clphs.oncloud.my/web/image/4271-53471c0a/%E6%88%AA%E5%B1%8F2026-03-27%20%E4%B8%8A%E5%8D%8812.34.11.png',
    specs: {
      resolution: '128 x 64 pixels',
      interface: 'I2C (4-pin)',
      voltage: '3.3V to 5V DC',
      address: '0x3C',
    },
    detailedSpecs: [
      {
        title: 'Electrical Characteristics',
        items: {
          'Display Resolution': '128 x 64 pixels',
          'Interface': 'I2C (4-pin) or SPI (7-pin)',
          'Operating Voltage': '3.3V to 5V DC',
          'Current Consumption': '10mA to 20mA',
          'Protocol': 'I2C (Address 0x3C or 0x3D)',
          'Operating Temp': '-40°C to +85°C',
        }
      },
      {
        title: 'Pin Configuration (I2C)',
        items: {
          'VCC': 'Power input (3.3V or 5V)',
          'GND': 'Ground',
          'SCL': 'Serial Clock (I2C Clock)',
          'SDA': 'Serial Data (I2C Data)',
        }
      },
      {
        title: 'Working Principle',
        items: {
          'Self-Emissive': 'OLED pixels emit light; no backlight',
          'Addressing': 'Uses internal GDDRAM for image data',
          'Pixel Control': '1 bit = 1 pixel (On/Off)',
          'Power Efficiency': 'Scales with number of lit pixels',
        }
      },
      {
        title: 'Implementation Notes',
        items: {
          'Library': 'Adafruit SSD1306 + GFX standard',
          'I2C Pull-ups': '4.7kΩ may be needed for long runs',
          'Burn-in': 'Avoid static images at max brightness',
          'Address Scan': 'Use I2C Scanner to verify 0x3C/0x3D',
        }
      },
      {
        title: 'Critical Tips',
        items: {
          'Display Command': 'Must call display.display() to update',
          'Text Wrapping': 'GFX supports auto wrapping by default',
          'Memory Usage': 'Uses 1KB SRAM for 128x64 buffer',
        }
      }
    ],
    quickStart: {
      connection: [
        'VCC -> 3.3V',
        'GND -> GND',
        'SCL -> GPIO 9 (Standard SCL)',
        'SDA -> GPIO 8 (Standard SDA)',
      ],
      code: `#include <Wire.h>
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
}`,
    },
  },
  {
    id: 'buzzer',
    name: 'Active Buzzer',
    description: 'Auditory feedback for gesture recognition events.',
    icon: 'Volume2',
    isFunctional: true,
    color: 'yellow',
    image: 'https://cec.clphs.oncloud.my/web/image/4273-d3acf5a7/%E6%88%AA%E5%B1%8F2026-03-27%20%E4%B8%8A%E5%8D%882.10.35.png',
    specs: {
      type: 'Active (Internal Osc)',
      voltage: '3.3V to 5V DC',
      frequency: '2.3kHz ± 300Hz',
      current: '< 30mA',
    },
    quickStart: {
      connection: [
        'VCC -> 3.3V',
        'GND -> GND',
        'Signal -> GPIO 1 (ESP32-S3)',
      ],
      code: `const int buzzerPin = 1;

void setup() {
  pinMode(buzzerPin, OUTPUT);
}

void loop() {
  digitalWrite(buzzerPin, HIGH);
  delay(500);
  digitalWrite(buzzerPin, LOW);
  delay(500);
}`,
    },
  },
  {
    id: '8-bit-led',
    name: '8-Bit LED',
    description: 'Visual status indicator with 8 individually addressable LEDs.',
    icon: 'Lightbulb',
    isFunctional: true,
    color: 'red',
    image: 'https://cec.clphs.oncloud.my/web/image/4269-349f5f84/%E6%88%AA%E5%B1%8F2026-03-27%20%E4%B8%8A%E5%8D%881.44.31.png',
    schematic: 'https://cec.clphs.oncloud.my/web/image/4245-092db6bc/%E6%88%AA%E5%B1%8F2026-03-27%20%E4%B8%8A%E5%8D%8812.23.27.png',
    specs: {
      type: 'WS2812B (RGB)',
      ledCount: '8 Pixels',
      voltage: '5V DC',
      interface: 'Single-wire (DI)',
    },
    quickStart: {
      connection: [
        'VCC -> 5V',
        'GND -> GND',
        'DI -> GPIO 2 (ESP32-S3)',
      ],
      code: `#include <Adafruit_NeoPixel.h>

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
}`,
    },
  },
  {
    id: 'push-button',
    name: 'Push Button',
    description: 'Simple user input interface for triggering events.',
    icon: 'Hand',
    isFunctional: true,
    color: 'green',
    image: 'https://cec.clphs.oncloud.my/web/image/4268-d5c95904/%E6%88%AA%E5%B1%8F2026-03-27%20%E4%B8%8A%E5%8D%8812.26.23.png',
    schematic: 'https://cec.clphs.oncloud.my/web/image/4249-0439eb62/%E6%88%AA%E5%B1%8F2026-03-27%20%E4%B8%8A%E5%8D%8812.30.49.png',
    specs: {
      type: 'Tactile Switch',
      voltage: 'Max 12V DC',
      current: 'Max 50mA',
      life: '100,000 cycles',
    },
    quickStart: {
      connection: [
        'VCC -> 3.3V',
        'GND -> GND (with Pull-down)',
        'OUT -> GPIO 3 (ESP32-S3)',
      ],
      code: `const int buttonPin = 3;

void setup() {
  pinMode(buttonPin, INPUT);
}

void loop() {
  if (digitalRead(buttonPin) == HIGH) {
    // Action triggered
  }
}`,
    },
  },
  {
    id: 'potentiometer',
    name: 'Potentiometer',
    description: 'A potentiometer is a three-terminal resistor with a sliding or rotating contact that forms an adjustable voltage divider. In electronics projects, it is primarily used to provide a variable analog input signal to a microcontroller.',
    icon: 'Settings2',
    isFunctional: true,
    color: 'orange',
    image: 'https://cec.clphs.oncloud.my/web/image/4264-04ad8826/%E6%88%AA%E5%B1%8F2026-03-26%20%E4%B8%8B%E5%8D%8811.58.28.png',
    schematic: 'https://cec.clphs.oncloud.my/web/image/4237-c6b821c9/%E6%88%AA%E5%B1%8F2026-03-27%20%E4%B8%8A%E5%8D%8812.03.41.png',
    specs: {
      resistance: '1kΩ to 100kΩ',
      type: 'Linear (Type B)',
      rotation: '270° to 300°',
      voltage: 'Max 20V DC',
    },
    detailedSpecs: [
      {
        title: 'Electrical Characteristics',
        items: {
          'Resistance Range': '1kΩ to 100kΩ (10kΩ common)',
          'Resistance Taper': 'Linear (Type B) / Logarithmic (Type A)',
          'Tolerance': '±10% or ± 20%',
          'Power Rating': '0.05W to 0.5W',
          'Max Operating Voltage': '50V AC / 20V DC',
          'Rotation Angle': '270° to 300° (Effective)',
        }
      },
      {
        title: 'Pin Configuration',
        items: {
          'Pin 1 (GND/Fixed)': 'Connected to Ground (0V)',
          'Pin 2 (Wiper/Output)': 'Variable Analog Output Signal',
          'Pin 3 (VCC/Fixed)': 'Connected to Input (3.3V or 5V)',
        }
      },
      {
        title: 'Working Principle',
        items: {
          'Function': 'Voltage Divider: Vout = Vin * (R2 / (R1+R2))',
          'At 0% rotation': 'Vout ≈ 0V',
          'At 50% rotation': 'Vout ≈ Vin / 2',
          'At 100% rotation': 'Vout ≈ Vin',
        }
      },
      {
        title: 'Implementation Notes',
        items: {
          'ADC Input': 'Connect Wiper to ADC-capable GPIO',
          'Voltage Safety': 'Use 3.3V for ESP32-S3 (Not 5V)',
          'Linear vs Log': 'Use Type B for sensor/control input',
          'Noise Filtering': 'Add 0.1μF cap between Wiper & GND',
        }
      }
    ],
    quickStart: {
      connection: [
        'VCC -> 3.3V (Recommended for ESP32)',
        'GND -> GND',
        'Wiper (Pin 2) -> GPIO 4 (ADC)',
      ],
      code: `const int potPin = 4; // ADC-capable GPIO

void setup() {
  Serial.begin(115200);
}

void loop() {
  // Read the analog value (0-4095 for ESP32)
  int val = analogRead(potPin);
  
  // Calculate voltage (approximate)
  float voltage = (val / 4095.0) * 3.3;
  
  Serial.print("ADC: "); Serial.print(val);
  Serial.print(" | Voltage: "); Serial.println(voltage);
  delay(100);
}`,
    },
  },
  {
    id: 'mounting-board',
    name: 'Mounting Board',
    description: 'Premium modular base for secure component installation.',
    icon: 'Layers',
    isFunctional: true,
    color: 'white',
    image: 'https://cec.clphs.oncloud.my/web/image/4269-349f5f84/%E6%88%AA%E5%B1%8F2026-03-27%20%E4%B8%8A%E5%8D%881.44.31.png',
    specs: {
      material: 'High-grade ABS',
      dimensions: '4x4 Grid',
      compatibility: 'LEGO / eBricks',
      color: 'Matte White',
    },
    quickStart: {
      connection: [
        'Snap components onto grid',
        'Secure with 2x2 pins',
        'Route cables through base',
      ],
      code: `// No code required for this passive brick.
// Enjoy the tactile snapping experience!`,
    },
  },
];
