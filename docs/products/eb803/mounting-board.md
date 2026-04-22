---
id: "mounting-board"
name: "eB244-R1_Mounting Board"
description: "Premium modular base for secure component installation."
icon: "Layers"
isFunctional: "true"
color: "#ffffff"
image: "https://cec.clphs.oncloud.my/web/image/4269-349f5f84/%E6%88%AA%E5%B1%8F2026-03-27%20%E4%B8%8A%E5%8D%881.44.31.png"
specs:
  sensor: "MPU 6050"
  dimensions: "13x8 Grid"
  secure: "Cable Ties"

add_paragraph_hero: |

  Purpose of this Setup:
  a. The primary goal of this mechanical assembly is Inertial Measurement Unit (IMU) Stability.

  b. Axis Alignment: By tying the sensor to a flat mounting board, you ensure that the X, Y, and Z axes of the MPU6050 stay aligned with the orientation of your hand. If the sensor tilted independently, your code would receive "noisy" or "false" rotation data.

add_images_specs:
  - "https://cec.clphs.oncloud.my/web/image/4276-8bbaeed4/%E6%88%AA%E5%B1%8F2026-03-27%20%E4%B8%8A%E5%8D%885.27.41.png"
  - "https://cec.clphs.oncloud.my/web/image/4277-5492e1ff/%E6%88%AA%E5%B1%8F2026-03-27%20%E4%B8%8A%E5%8D%885.30.35.png"

add_paragraph_specs: |
  To securely mount your MPU6050 sensor for hand movement detection, you need a setup that is both stable and low-profile. Using cable ties with the eBricks Mounting Board ensures that the sensor won't shift during rapid gestures, which is critical for maintaining the accuracy of the accelerometer and gyroscope data.

  1. How to Secure the Sensor with Cable Ties
  Alignment: Place the MPU6050 module onto the smaller mounting plate. Ensure the header pins are facing outward or upward so you can easily attach jumper wires later.

  2. Threading the Tie: * Take a small, thin cable tie (zip tie).

  Thread the tail end through one of the large circular holes on the 13x8 Dot Mounting Board, bring it up over the sensor module, and poke it back down through a corresponding hole on the opposite side.

add_images_schematic:
  - "https://cec.clphs.oncloud.my/web/image/4280-7c32465d/%E6%88%AA%E5%B1%8F2026-03-27%20%E4%B8%8A%E5%8D%885.50.08.png"
  - "https://cec.clphs.oncloud.my/web/image/4281-8983ca3c/%E6%88%AA%E5%B1%8F2026-03-27%20%E4%B8%8A%E5%8D%885.51.39.png"


add_paragraph_schematic: |
  3.Tensioning: Tighten the cable tie until the sensor is snug against the board.

  Pro Tip: Position the "head" (the locking mechanism) of the cable tie on the top side or side of the board. This prevents a plastic bump from pressing uncomfortably against your hand.

  4.Final Trim: Use wire cutters to snip the excess tail of the cable tie flush with the head to avoid sharp edges.
add_paragraph_quickstart: |
  5. Securing the Board to Your Hand
  To detect hand movements effectively, the mounting board must act as a rigid extension of your limb.

  The "Glove" Method: Use two longer cable ties or Velcro straps. Thread them through the outermost holes of the mounting board.

  Placement: Loop these straps around your palm (between the thumb and index finger) or around your wrist.

  Stability Tip: Ensure the board is tight enough that it doesn't "wobble" when you shake your hand, but not so tight that it restricts circulation.


quickStartt: {}
---
