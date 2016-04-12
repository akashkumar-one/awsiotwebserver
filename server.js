var express = require('express');
var app = express();
var url = require('url');
var bodyParser  = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
})); 

app.post('/updatedStatus', function (req, res){
	var body = req.body.access_token;
			if(body == "Bulb On"){
				console.log(body);
				//device.publish('$aws/things/Bulb/shadow/update', JSON.stringify({"state":{"desired":{"bulb_mode": "ON"}}}));
			}else if(body == "Bulb Off"){
				console.log(body);
				//device.publish('$aws/things/Bulb/shadow/update', JSON.stringify({"state":{"desired":{"bulb_mode": "OFF"}}}));
			}
	res.send('ON').end();
});

app.get('/status', function (req, res){
	res.send('ON').end();
});
app.use(express.static(__dirname + '/public'));

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.listen(port, function(){
	console.log('Running the server at :',ip,':',port);
});
