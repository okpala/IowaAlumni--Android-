
function Tracker(){
	var GA = require('analytics.google');
	//GA.optOut = true;
	GA.debug = true;
	//GA.trackUncaughtExceptions = true;

	var tracker = GA.getTracker("UA-46448216-1");
	
	return tracker;
}
module.exports = Tracker;