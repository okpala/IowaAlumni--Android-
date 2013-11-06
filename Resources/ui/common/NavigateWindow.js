function NavigateWindow(windowtitle, webview) {
	
	var self = Ti.UI.createWindow({
	    backgroundColor:'#e2e2e2',
		navBarHidden: true
	});

	 var statusBar = Ti.UI.createView({
	    backgroundColor:'#000',
	    top: 0,
	    height: 20
	});
	
	self.add(statusBar);
	
	//create master view container
	var masterContainerWindow = Ti.UI.createWindow({
		title: windowtitle,
		navBarHidden:false,
		barImage:'navbar.png',
		//hires:true,
		moving:false, // Custom property for movement
		    axis:0 // Custom property for X axis
	});
	var menuButton = Ti.UI.createButton({
		
		//title: 'Back',
		height: 26,
		width:15,
		left: 10,
		
		backgroundImage: 'back.png',
		font: {fontFamily:'Helvetica Neue',fontSize:14,fontWeight:'bold'},
    	toggle:false // Custom property for menu toggle
	});
	masterContainerWindow.setLeftNavButton(menuButton);
	masterContainerWindow.add(webview);

	//menuButton event
	menuButton.addEventListener('click', function(e){
		self.close();
		
	});
	
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:masterContainerWindow
	});
	self.add(navGroup);
	
	
	return self;
};
module.exports = NavigateWindow;