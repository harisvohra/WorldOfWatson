/**
 * conversation.js - Route to serve Request coming for Watson
 * Coversation Service. 
 */

 //Import Dependencies
var express = require('express');
var appConfig	= require('../config.json');
var watson = require('watson-developer-cloud');

//Get Handle of Router
var router = express.Router();

var username = '';
var password = '';

if (process.env.VCAP_SERVICES) {
	var vcap = JSON.parse(process.env.VCAP_SERVICES);
	password = vcap.conversation[0].credentials.password;
	username = vcap.conversation[0].credentials.username;
} else {
	password = appConfig['conversation'].password;
	username = appConfig['conversation'].username;
}

var conversation = watson.conversation({
  username: username,
  password: password,
  version: 'v1',
  version_date: '2016-07-11'
});

/**
 * This function intercepts any incoming POST request
 * for Conversation API.
 */
router.post('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var text = req.body.text;
  var context = {};
  if (req.body.context && text.length > 0) {
	  context = req.body.context;
  }
  
  console.log("Request text : " + text + ", context : " + JSON.stringify(context));
  
  conversation.message({
	workspace_id: appConfig['conversation'].workspace_id,
	input: {'text': text},
	context: context
  },  function(err, response) {
	 if (err) {
		console.log('error:', err);
		res.send(err);
	}
	else {
		console.log(JSON.stringify(response, null, 2));
		res.send(JSON.stringify(response, null, 2));
	}	
  });
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