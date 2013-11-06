function ApplicationWindow(windowtitle, masterView) {
	
	var self = Ti.UI.createWindow({
	    backgroundColor:'#e2e2e2',
		navBarHidden: true,
		//barColor:'#99cc66',
		
		
	});

	

	return self;
	
	/*
	var self = Ti.UI.createWindow({
	    backgroundColor:'#e2e2e2',
		navBarHidden: true,
		//barColor:'#99cc66',
		
		
	});

	//create master view container
	var masterContainerWindow = Ti.UI.createWindow({
		title: windowtitle,
		navBarHidden:false,
		barImage:'navbar.png',
		titleControl: Ti.UI.createLabel({ text: windowtitle, color: 'white', font:{fontFamily:'HelveticaNeue-CondensedBold',fontSize:20,fontWeight:'bold'} }),
		moving:false, // Custom property for movement
		    axis:0 // Custom property for X axis
	});
	var menuButton = Ti.UI.createButton({
		backgroundImage: 'newmenubutton.png',
		backgroundSelectedImage: 'newmenubuttonselected.png',
		title: '',
		height: 22,
		width: 37,
    	toggle:false // Custom property for menu toggle
	});
	masterContainerWindow.setLeftNavButton(menuButton);
	masterContainerWindow.add(masterView);
	
	
	

	//menuButton event
	menuButton.addEventListener('click', function(e){
		self.fireEvent('menuClick');
	});

	self.addEventListener('swipeToggle', function(e){
		self.fireEvent('menuClick');
	});
	self.addEventListener('swipe', function(e){
		self.fireEvent('menuClick');
	});
	self.addEventListener('swipeListen', function(e){
		self.fireEvent('menuClick');
	});
	
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:masterContainerWindow
	});
	self.add(navGroup);
	
	return self;
	*/
};
module.exports = ApplicationWindow; 
