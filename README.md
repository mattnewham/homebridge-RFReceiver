# homebridge-RFReceiver

This is a placeholder project for a simple plugin which receives a code from an RF device, using simple and cheap RF rx boards on the RasbPI.

This is still in testing and is by no means ready for production

The code simply sends an event when a code is received, and is compared to the code written in the plugin config (in your config.json). If it matches, it switches the state of the associated motion sensor.

There are some issues with the code. I need to work out why sometimes my timers dont work
