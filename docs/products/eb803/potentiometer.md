---
id: "potentiometer"
name: "eB247-R1_Potential_Meter"
description: "A potentiometer is a three-terminal resistor with a sliding or rotating contact that forms an adjustable voltage divider. In electronics projects, it is primarily used to provide a variable analog input signal to a microcontroller."
icon: "Settings2"
isFunctional: "true"
color: "#f38016"
image: "https://cec.clphs.oncloud.my/web/image/4264-04ad8826/%E6%88%AA%E5%B1%8F2026-03-26%20%E4%B8%8B%E5%8D%8811.58.28.png"
schematic: "https://cec.clphs.oncloud.my/web/image/4237-c6b821c9/%E6%88%AA%E5%B1%8F2026-03-27%20%E4%B8%8A%E5%8D%8812.03.41.png"
specs:
  resistance: "1kΩ to 100kΩ"
  type: "Linear (Type B)"
  rotation: "270° to 300°"
  voltage: "Max 20V DC"
detailedSpecs:
  - title: Electrical Characteristics
    items:
      Resistance Range: "1kΩ to 100kΩ (10kΩ common)"
      Resistance Taper: "Linear (Type B) / Logarithmic (Type A)"
      Tolerance: "±10% or ± 20%"
      Power Rating: "0.05W to 0.5W"
      Max Operating Voltage: "50V AC / 20V DC"
      Rotation Angle: "270° to 300° (Effective)"
  - title: Pin Configuration
    items:
      Pin 1 (GND/Fixed): "Connected to Ground (0V)"
      Pin 2 (Wiper/Output): "Variable Analog Output Signal"
      Pin 3 (VCC/Fixed): "Connected to Input (3.3V or 5V)"
  - title: Working Principle
    items:
      Function: "Voltage Divider: Vout = Vin * (R2 / (R1+R2))"
      At 0% rotation: "Vout ≈ 0V"
      At 50% rotation: "Vout ≈ Vin / 2"
      At 100% rotation: "Vout ≈ Vin"
  - title: Implementation Notes
    items:
      ADC Input: "Connect Wiper to ADC-capable GPIO"
      Voltage Safety: "Use 3.3V for ESP32-S3 (Not 5V)"
      Linear vs Log: "Use Type B for sensor/control input"
      Noise Filtering: "Add 0.1μF cap between Wiper & GND"
quickStart:
  connection:
    - VCC -> 3.3V (Recommended for ESP32)
    - GND -> GND
    - Wiper (Pin 2) -> GPIO 4 (ADC)
  code: |
    const int potPin = 4; // ADC-capable GPIO
    
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
    }
---
