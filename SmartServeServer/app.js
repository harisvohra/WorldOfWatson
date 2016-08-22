/**
 * app.js - Main file for SmartServeServer app. Initializes Express and
 * configures routes and listens to incoming requests. 
 */
var string 		= require('string'); 
var appConfig	= require('./config.json');


var express 	= require('express'),
	app     	= express(),
	ibmbluemix 	= require('ibmbluemix'),
	config  	= {		
		applicationRoute : appConfig['app'].applicationRoute,		
		applicationId : appConfig['app'].applicationId
	};


// init core sdk
ibmbluemix.initialize(config);
var logger = ibmbluemix.getLogger();


app.get('/desktop', function(req, res){
	res.sendfile('public/desktop.html');
});


// init service sdks 
app.use(function(req, res, next) {
    req.logger = logger;
    next();
});

// init basics for an express app
app.use(require('./lib/setup'));

//API Routes
app.use('/conversation',require('./routes/conversation'));
app.use('/speechToText',require('./routes/speechToText'));
app.use('/textToSpeech',require('./routes/textToSpeech'));
app.use('/toneAnalysis',require('./routes/toneAnalysis'));

var ibmconfig = ibmbluemix.getConfig();

logger.info('mbaas context root: '+ibmconfig.getContextRoot());
// "Require" modules and files containing endpoints and apply the routes to our application
app.use(ibmconfig.getContextRoot(), require('./lib/staticfile'));

app.listen(ibmconfig.getPort());
logger.info('Server started at port: '+ibmconfig.getPort());
