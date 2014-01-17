function MenuRow(t,i,f,s) {

	this.s = s;
	var self = Ti.UI.createTableViewRow({
		height: "45dp",
		backgroundImage: Ti.Filesystem.resourcesDirectory + 'menu.jpg',
		backgroundFocusedImage: Ti.Filesystem.resourcesDirectory +'pressed.jpg',
		backgroundSelectedImage: Ti.Filesystem.resourcesDirectory + 'pressed.jpg',
		feedTitle: t,
		feed: f
	});
	
	
	if(this.s) {
		
		var text = Ti.UI.createLabel({
			text: t,
			left: "60dp",
			height: "45dp",
			textAlign:'left',
			width: "270dp",
			color:'#ebc22f',
			shadowColor:'#000000',
	        shadowOpacity:0.5,
	        shadowOffset:{x:0, y:1},
	        
			font:{fontFamily:'HelveticaNeue-CondensedBold',fontSize:"17dp",fontWeight:'bold'}
		});
		var imageView = Ti.UI.createImageView({
			image:  Ti.Filesystem.resourcesDirectory + i+'selected.png',
			width: "30dp",
			height: "30dp",
			left: "10dp",
		});
		self.backgroundImage = Ti.Filesystem.resourcesDirectory + 'pressed.jpg';
	}
	else {
		var text = Ti.UI.createLabel({
			text: t,
			left: "60dp",
			height: "45dp",
			textAlign:'left',
			width: "270dp",
			color:'#cccccc',
			shadowColor:'#000000',
	        shadowOpacity:0.5,
	        shadowOffset:{x:0, y:1},
			font:{fontFamily:'HelveticaNeue-CondensedBold',fontSize:"17dp",fontWeight:'bold'}
		});
		var imageView = Ti.UI.createImageView({
			image: Ti.Filesystem.resourcesDirectory + i+'.png',
			width: "30dp",
			height: "30dp",
			left: "10dp",
		});
	}
	
	
	self.add(imageView);
	self.add(text);

	function makeSelected() {
		this.s = true;
	}

	return self;

}

module.exports = MenuRow;