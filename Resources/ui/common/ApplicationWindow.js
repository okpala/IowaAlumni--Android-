function ApplicationWindow(windowtitle) {
	
	var self = Ti.UI.createWindow({
	    backgroundColor:'#e2e2e2',
		navBarHidden: false,
		//barColor:'#99cc66',
		
		
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
