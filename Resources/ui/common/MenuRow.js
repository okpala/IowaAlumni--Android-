function MenuRow(t,i,f,s) {

	this.s = s;
	var self = Ti.UI.createTableViewRow({
		height: 45,
		backgroundImage: Ti.Filesystem.resourcesDirectory + 'menu.jpg',
		backgroundFocusedImage: Ti.Filesystem.resourcesDirectory +'pressed.jpg',
		backgroundSelectedImage: Ti.Filesystem.resourcesDirectory + 'pressed.jpg',
		feedTitle: t,
		feed: f
	});
	
	
	if(this.s) {
		self.backgroundImage = Ti.Filesystem.resourcesDirectory + 'pressed.jpg';
		var text = Ti.UI.createLabel({
			text: t,
			left: 60,
			height: 45,
			textAlign:'left',
			width: 270,
			color:'#ebc22f',
			shadowColor:'#000000',
	        shadowOpacity:0.5,
	        shadowOffset:{x:0, y:1},
	        
			font:{fontFamily:'HelveticaNeue-CondensedBold',fontSize:17,fontWeight:'bold'}
		});
		var imageView = Ti.UI.createImageView({
			image:  Ti.Filesystem.resourcesDirectory + i+'selected.png',
			width: 30,
			height: 30,
			left: 10,
		});
	}
	else {
		var text = Ti.UI.createLabel({
			text: t,
			left: 60,
			height: 45,
			textAlign:'left',
			width: 270,
			color:'#cccccc',
			shadowColor:'#000000',
	        shadowOpacity:0.5,
	        shadowOffset:{x:0, y:1},
			font:{fontFamily:'HelveticaNeue-CondensedBold',fontSize:17,fontWeight:'bold'}
		});
		var imageView = Ti.UI.createImageView({
			image: Ti.Filesystem.resourcesDirectory + i+'.png',
			width: 30,
			height: 30,
			left: 10,
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