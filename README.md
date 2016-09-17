# homebridge-RFReceiver

This is a placeholder project for a simple plugin which receives a code from an RF device, using simple and cheap RF rx boards on the RasbPI.

This is still in testing and is by no means ready for production

The code simply sends an event when a code is received, and is compared to the code written in the plugin config (in your config.json). If it matches, it switches the state of the associated motion sensor.

There are some issues with the code. I need to work out why sometimes my timers dont work.

To use, install the code into your plugins folder.

The plugin requires you to have a working install of rpi433:

https://www.npmjs.com/package/rpi-433

Once you are able to run the example code from that project, and can sucessfully receive an RF code from a device, you need to put the rpi-433 code in an accesible place so that we can import the Sniffer function. I will package this up at some point (when its all working) but for now it is a manual process.

Then use the following config:

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
