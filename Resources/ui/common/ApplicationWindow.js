var Analytics = require('Ti.Google.Analytics');

function ApplicationWindow(windowtitle) {
	var analytics = new Analytics('UA-46448216-1');
	var self = Ti.UI.createWindow({
	    backgroundColor:'#e2e2e2',
		navBarHidden: false,		
	});
	
	// track page view on focus
	self.addEventListener('open', function(e){
	    Titanium.App.Analytics.trackPageview('all-listings/list-view');
	    analytics.trackPageview(windowtitle);
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
