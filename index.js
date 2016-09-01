var Service;
var Characteristic;
var rpi433 = require("rpi-433"),
    rfSniffer = rpi433.sniffer({
      pin: 2,                     //Snif on GPIO 2 (or Physical PIN 13)
      debounceDelay: 1000          //Wait 500ms before reading another code
    }),
    rfEmitter = rpi433.emitter({
      pin: 0,                     //Send through GPIO 0 (or Physical PIN 11)
      pulseLength: 350            //Send the code with a 350 pulse length
    });

var debug = require("debug")("RFReceiverAccessory");
var crypto = require("crypto");

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory("homebridge-RFReceiver", "RFReceiver", RFReceiverAccessory);
}

function RFReceiverAccessory(log, config) {
  this.log = log;

  // url info
  this.name = config["name"];
  this.rfcode = config["rfcode"] || 4;
  this.window_seconds = config["window_seconds"] || 5;
  this.sensor_type = config["sensor_type"] || "m";
  this.inverse = config["inverse"] || false;

}

RFReceiverAccessory.prototype = {

  getServices: function() {

    // you can OPTIONALLY create an information service if you wish to override
    // the default values for things like serial number, model, etc.
    var informationService = new Service.AccessoryInformation();

    informationService
      .setCharacteristic(Characteristic.Name, this.name)
      .setCharacteristic(Characteristic.Manufacturer, "Homebridge")
      .setCharacteristic(Characteristic.Model, "RF Receiver")
      .setCharacteristic(Characteristic.SerialNumber, "12345");

    var service, changeAction;
    if(this.sensor_type === "c"){
        service = new Service.ContactSensor();
        changeAction = function(newState){
            service.getCharacteristic(Characteristic.ContactSensorState)
                    .setValue(newState ? Characteristic.ContactSensorState.CONTACT_DETECTED : Characteristic.ContactSensorState.CONTACT_NOT_DETECTED);
        };
    } else {
        service = new Service.MotionSensor();
        changeAction = function(newState){
	    console.log('changing state');
            service.getCharacteristic(Characteristic.MotionDetected)
                    .setValue(newState);
        };
    }

function motionHandler() {
        console.log('im in motionhandler func')
        var newState = true;
        changeAction(newState);
        if(this.timer !== undefined) clearTimeout(this.timer);
        this.timer = setTimeout(function(){changeAction(!newState);}, this.window_seconds * 1000);
    };


    
 
    var code = this.rfcode
    var name = this.name

    rfSniffer.on('data', function (data) {
    console.log('Code received: '+data.code+' pulse length : '+data.pulseLength);
    console.log(code);
    if(data.code == code){
            console.log("Motion Detected In" +name);
            motionHandler()};
    });


   
    

    return [informationService, service];
  }
};

