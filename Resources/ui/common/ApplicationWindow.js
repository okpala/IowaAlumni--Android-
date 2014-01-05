<<<<<<< HEAD

=======
var Analytics = require('Ti.Google.Analytics');
>>>>>>> 97e3419d31df4871d6cfe68da897d95e128c5d3e

function ApplicationWindow(windowtitle) {
	var analytics = new Analytics('UA-46448216-1');
	var self = Ti.UI.createWindow({
	    backgroundColor:'#e2e2e2',
		navBarHidden: false,		
<<<<<<< HEAD
=======
	});
	
	// track page view on focus
	self.addEventListener('open', function(e){
	    Titanium.App.Analytics.trackPageview('all-listings/list-view');
	    analytics.trackPageview(windowtitle);
>>>>>>> 97e3419d31df4871d6cfe68da897d95e128c5d3e
	});
	
	var navbar = Ti.UI.createImageView({
			image:  Ti.Filesystem.resourcesDirectory + 'navbar.png',
			height: 60
	});
	
	//self.add(navbar);
	var actionBar;
	self.addEventListener("open", function() {
    if (Ti.Platform.osname === "android") {
        if (! self.activity) {
            Ti.API.error("Can't access action bar on a lightweight window.");
        } else {
            actionBar = self.activity.actionBar;
            if (actionBar) {
                actionBar.backgroundImage = Ti.Filesystem.resourcesDirectory + 'navbar.png';
                actionBar.title = windowtitle;
                actionBar.logo = Ti.Filesystem.resourcesDirectory + "newmenubutton.png";
                actionBar.onHomeIconItemSelected = function() {
                    self.close();
                };
            }
        }
    }
});

	
	return self;
	

};
module.exports = ApplicationWindow; 
