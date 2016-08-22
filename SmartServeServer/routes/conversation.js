/**
 * conversation.js - Route to serve Request coming for Watson
 * Coversation Service. 
 */

 //Import Dependencies
var express = require('express');
var appConfig	= require('../config.json');
var watson = require('watson-developer-cloud/document-conversion/v1');

//Get Handle of Router
var router = express.Router();

var username = '';
var password = '';

if (process.env.VCAP_SERVICES) {
	var vcap = JSON.parse(process.env.VCAP_SERVICES);
	password = vcap.tone_analyzer[0].credentials.password;
	username = vcap.tone_analyzer[0].credentials.username;
} else {
	password = appConfig['toneAnalysis'].password;
	username = appConfig['toneAnalysis'].username;
}

/**
 * This function intercepts any incoming POST request
 * for Conversation API.
 */
router.post('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //TODO - Logic Needs to be placed Here
  var text = req.body.text;
  res.send('You passed '+text+'. Unfortunately this Service is not implemented yet!');
});


/**
 * This function intercepts any incoming GET request
 * for Conversation API.
 */
router.get('/', function(req, res, next) {
  //Dummy - Won't be used in real time.	
  res.send('Received GET call for conversation, I am sorry I have nothing to serve you.');
});

module.exports = router;