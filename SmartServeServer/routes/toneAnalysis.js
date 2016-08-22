/**
 * toneAnalysis.js - Route to serve Request coming for Watson
 * Tone Analysis Service. 
 */

 //Import Dependencies
var express 	= require('express');
var appConfig	= require('../config.json');
var watson  	= require('watson-developer-cloud/tone-analyzer/v3');


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

//Get Handle of Router
var router = express.Router();

var tone_analyzer = new watson({
  username: username,
  password: password,
  version_date:appConfig['toneAnalysis'].version_date
});

/**
 * This function intercepts any incoming POST request
 * for Tone Analysis API.
 */
router.post('/', function(req, res, next) {		
   var text = req.body.text;
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   tone_analyzer.tone({ text: text },
	function(err, tone) {
	    if (err)
	      res.send(err);
	    else {	
	     res.send(JSON.stringify(tone, null, 2));
		}
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