/**
 * speechToText.js - Route to serve Request coming for Watson
 * Speech To Text Service. 
 */

 //Import Dependencies
var express = require('express');
var appConfig	= require('../config.json');
var watson = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');	
var formidable = require('formidable');

//Initialize core object to hit Service deployed in BlueMix.
var speech_to_text = new watson({
  username: appConfig['speechToText'].username,
  password: appConfig['speechToText'].password
});

//Get Handle of Router
var router = express.Router();

/**
 * This function intercepts any incoming POST request
 * for Speech To Text API.
 */
router.post('/', function(req, res, next) {
  	//Supported Content Type
	var params = {
  		content_type: 'audio/wav'
	};
  	//create the stream
	var recognizeStream = speech_to_text.createRecognizeStream(params);
	var form = new formidable.IncomingForm();
	form.keepExtensions = true;		
	form.parse(req, function(err, fields, files) {										
		var readStream = fs.createReadStream(files.speech.path);			
		readStream.pipe(recognizeStream);
		// and pipe out the transcription
		recognizeStream.pipe(fs.createWriteStream('transcription.txt'));
		// listen for 'data' events for just the final text
		// listen for 'results' events to get the raw JSON with interim results, timings, etc.

		recognizeStream.setEncoding('utf8'); // to get strings instead of Buffers from `data` events
	
		// Listen for events.Send to Client when final data event is obtained.
		recognizeStream.on('data', function(event) { onEvent('Data:', event); res.send(JSON.stringify(event));});
		recognizeStream.on('results', function(event) { onEvent('Results:', event); });
		recognizeStream.on('error', function(event) { onEvent('Error:', event); });
		recognizeStream.on('close-connection', function(event) { onEvent('Close:', event); });
	});
		
});

// Displays events on the console.
function onEvent(name, event) {
    console.log(name, JSON.stringify(event, null, 2));    
};


/**
 * This function intercepts any incoming GET request
 * for Speech To Text API.
 */
router.get('/', function(req, res, next) {
  res.send('Received GET call for speechToText, I am sorry I have nothing to serve you.');
});

module.exports = router;