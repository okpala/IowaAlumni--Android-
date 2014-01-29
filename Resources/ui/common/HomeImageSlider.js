//var GetFeed = require('ui/common/GetFeed');
var FormatDate = require('ui/common/FormatDate');
var Feed = require('ui/common/Feed');
var CachedImageView = require('ui/common/CachedImageView');

function HomeImageSlider(images){
	this.containerheight = 0;
	
	
	var row = Ti.UI.createTableViewRow({
		height: 355,
		padding: 0,
		top: 0,
		bottom: 0,
		layout: 'vertical',
		backgroundColor: '#e2e2e2',
		borderRadius: 0.5
	});
	
	var container =  Titanium.UI.createView({
			backgroundColor: 'transparent',
			height:			300,
				height:			250,
				width: 			Ti.UI.FILL,
				left: 			10,
				right:			10,
				top:			10,
				bottom:			0,
				padding:		0,
				borderRadius:	5
	});
	
	this.containerheight = getContainerHeight(images[0].image);
	container.height 	 = this.containerheight + 30;
	row.height 			 = this.containerheight + 36 + 8;
	
	
		
		
		row.add(container);
		
		var imagebox = Ti.UI.createImageView({
			image: images[0].image,
			width: Ti.UI.FILL,
			height: Ti.UI.FILL,
			//hires: true,
			top: 30
		});
		
		
		var overlay = Ti.UI.createImageView({
			width: Ti.UI.FILL,
			height: 40,
			//hires: true,
			top: 1,
			image: Ti.Filesystem.resourcesDirectory + 'gold.png'
		});
		var shadow = Ti.UI.createImageView({
			width: Ti.UI.FILL,
			height: 100,		
			bottom: 65,
			image: Ti.Filesystem.resourcesDirectory +'shadow.png'
		});
		
		var date = new Date();
		
		var dateLabel = Ti.UI.createLabel({
			text: (new FormatDate()).getMonthString(date.getMonth()) +' '+date.getDate()+', '+date.getFullYear(),
			top: 8,
			left: 10,
			bottom: 10,
			height: 15,
			textAlign:'left',
			width: 270,
			color:'#5c4e1a',
			shadowColor:'#f0d87f',
	        shadowOpacity:0.5,
	        shadowOffset:{x:0, y:1},
			font:{fontFamily:'HelveticaNeue-CondensedBold',fontSize:12,fontWeight:'bold'}
		});

		var view = Ti.UI.createView({
			backgroundColor: '#0c0c0c',
			backgroundImage: Ti.Filesystem.resourcesDirectory + 'dark.jpg',
			width: Ti.UI.FILL,
			height: 80,
			bottom: 0
		});
		
		var titlelbl = Ti.UI.createLabel({
			text: 'Welcome',
			left: 10,
			textAlign:'left',
			width: 250,
			color:'#efc006',
			shadowColor:'#000000',
	        shadowOpacity:0.5,
	        shadowOffset:{x:0, y:1},
	        top: 0,
			font:{fontFamily:'HelveticaNeue-Light',fontSize:25,fontWeight:'bold'}
		});
		
		view.add(titlelbl);

		var text = Ti.UI.createLabel({
			text: "The Official App of the University of Iowa Alumni Association",
			left: 15,
			right: 15,
			top: 22,
			bottom: 10,
			width: Ti.UI.FILL,
			color:'#ffffff',
			shadowColor:'#000000',
	        shadowOpacity:0.5,
	        shadowOffset:{x:0, y:1},
			font:{fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
		});
		
		view.add(text);
		container.add(imagebox);
		container.add(overlay);
		container.add(shadow);
		container.add(view);
		container.add(dateLabel);	
		
	
		return row;
} 

function getContainerHeight(img) {
	var tempimagebox = Ti.UI.createImageView({
		image: img,
		width: 'auto',
		height: 'auto',
		hires: true,
	});
    new CachedImageView('imageDirectoryName', img, tempimagebox);
	
	var height = tempimagebox.toImage().height;
	var width = tempimagebox.toImage().width;
	var ratio = height / width;

	return Math.floor( 300 * ratio );
}


module.exports = HomeImageSlider;
