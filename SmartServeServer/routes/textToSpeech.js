/**
 * speechToText.js - Route to serve Request coming for Watson
 * Text To Speech Service. 
 */

 //Import Dependencies
var express 	= require('express');
var appConfig	= require('../config.json');
var watson 		= require('watson-developer-cloud/text-to-speech/v1');
var fs 			= require('fs');

//Get Handle of Router
var router = express.Router();

//Initialize core object to hit Service deployed in BlueMix.
var text_to_speech = new watson({
  username: appConfig['textToSpeech'].username,
  password: appConfig['textToSpeech'].password
});


/**
 * This function intercepts any incoming POST request
 * for Text To Speech API.
 */
router.post('/', function(req, res, next) {
  var text = req.body.text;
  
  var params = {
	  text: text,
	  voice: 'en-US_AllisonVoice', // Optional voice
	  accept: 'audio/wav'
   };
   var outputFile = fs.createWriteStream('output.wav');
   // Pipe the synthesized text to a file
  text_to_speech.synthesize(params).pipe(outputFile);

  //TODO - Need to write code to download the created file to client.
  
  res.send('output File created in Server.');

});

/**
 * This function intercepts any incoming GET request
 * for Text To Speech API.
 */
router.get('/', function(req, res, next) {
  res.send('Received GET call for textToSpeech, I am sorry I have nothing to serve you.');
});

module.exports = router;