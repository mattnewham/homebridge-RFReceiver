# homebridge-RFReceiver

This is a placeholder project for a simple plugin which receives a code from an RF device, using simple and cheap RF rx boards on the RasbPI.

This is still in testing and is by no means ready for production

The code simply sends an event when a code is received, and is compared to the code written in the plugin config (in your config.json). If it matches, it switches the state of the associated motion sensor.

There are some issues with the code. I need to work out why sometimes my timers dont work.

To use, install the code into your plugins folder and use the following config:

```
"accessories": [
    {
        "accessory": "homebridge-RFReceiver.RFReceiver",
        "name": "Hallway",
        "rfcode": "filesensor.txt",
        "window_seconds": "5",
        "inverse": "false",
        "sensor_type": "m"
    }
```

Name is the name you want the sensor to show up in Homekit

RFCode is the code that is emitted from your sensor on motion detection, opening or whatever

Sensor type currently only works with m (motion). c (contact) code needs to be implemented, but I dont have any need for that right now.
