var awsIot = require('aws-iot-device-sdk');
var express = require('express');
var app = express();
var url = require('url');
var bodyParser  = require('body-parser');
var fs = require('fs');
var path = require('path');
var bulb_state = 'null';
var sync = 'null';

app.use(bodyParser.urlencoded({
  extended: true
})); 

app.post('/updatedStatus', function (req, res){
	var body = req.body.access_token;
			if(body == "Bulb On"){
				//console.log(body);
				device.publish('$aws/things/Bulb/shadow/update', JSON.stringify({"state":{"desired":{"bulb_mode": "ON"}}}));
			}else if(body == "Bulb Off"){
				//console.log(body);
				device.publish('$aws/things/Bulb/shadow/update', JSON.stringify({"state":{"desired":{"bulb_mode": "OFF"}}}));
			}
	res.send(sync).end();
});

app.get('/status', function (req, res){
	currentStat();
	setTimeout(function () {
		res.send({"bulb_state":bulb_state,"inSync":sync}).end();
	}, 2050)
	
});
app.use(express.static(__dirname + '/public'));

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.listen(port, function(){
	console.log('Running the server at:',ip,':',port);
});

//var x = path.sep('/cer/0a231e80c3-private.pem.key');
//console.log(x);
/*

var device = awsIot.device({
keyPath:	'cer/0a231e80c3-private.pem.key',
certPath:	'cer/0a231e80c3-certificate.pem.crt',
caPath:	'cer/Bulb.pem',
clientId: 'Bulb_Client',
region: 'us-east-1',
host: 'A24YH4R042AAJX.iot.us-east-1.amazonaws.com'
});

device
  .on('connect', function() {
    console.log('connected');
	device.subscribe('$aws/things/Bulb/shadow/get');
    device.subscribe('$aws/things/Bulb/shadow/update');
	device.subscribe('$aws/things/Bulb/shadow/get/accepted');
	device.publish('$aws/things/Bulb/shadow/get', JSON.stringify(""));
    });
	function currentStat(){
    device.publish('$aws/things/Bulb/shadow/get', JSON.stringify(""));
	}
device
  .on('message', function(topic, payload) {
	//console.log('\n');
	var payLD = JSON.parse(payload);
	if(topic == '$aws/things/Bulb/shadow/get'){
		
	}else if(topic == '$aws/things/Bulb/shadow/get/accepted'){
		bulb_state = payLD.state.reported.bulb_mode;
		if(payLD.state.reported.bulb_mode == payLD.state.desired.bulb_mode){
			console.log("Device is in sync, status is updated successfully!!!");
			sync = true;
		}else
		{
			console.log("Device out of sync. :( ");
			sync = false;
		}
		//console.log(payLD);
	if(bulb_state == "OFF")
	{
			console.log('Current State of Bulb  is OFF');
	}else if(bulb_state == "ON"){
			console.log('Current State of Bulb State is ON');
	}
	} else 
	{
		console.log('message', topic, payload.toString());
	}
  });
  */