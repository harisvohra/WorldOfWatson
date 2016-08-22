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

/**
 * This function intercepts any incoming POST request
 * for Conversation API.
 */
router.post('/', function(req, res, next) {
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