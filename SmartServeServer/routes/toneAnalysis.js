/**
 * toneAnalysis.js - Route to serve Request coming for Watson
 * Tone Analysis Service. 
 */

 //Import Dependencies
var express 	= require('express');
var appConfig	= require('../config.json');
var watson  	= require('watson-developer-cloud/tone-analyzer/v3');

//Get Handle of Router
var router = express.Router();

var tone_analyzer = new watson({
  username: appConfig['toneAnalysis'].username,
  password: appConfig['toneAnalysis'].password,
  version_date:appConfig['toneAnalysis'].version_date
});

/**
 * This function intercepts any incoming POST request
 * for Tone Analysis API.
 */
router.post('/', function(req, res, next) {
   var text = req.body.text;
   tone_analyzer.tone({ text: text },
	function(err, tone) {
	    if (err)
	      res.send(err);
	    else
	     res.send(JSON.stringify(tone, null, 2));
	});
});


/**
 * This function intercepts any incoming GET request
 * for Tone Analysis API.
 */
router.get('/', function(req, res, next) {
  res.send('Received GET call for toneAnalysis, I am sorry I have nothing to serve you.');
});

module.exports = router;