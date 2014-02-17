var DateObject = require('ui/common/DateObject');
var CachedImageView = require('ui/common/CachedImageView');
var WebView = require('ui/common/WebView');
var createCachingImageView = require('ui/common/createRemoteImageView2');

/*
 * Post Object
 * Essential attributes
 */

function FeatureRow(post, tracker, title) {

	this.containerheight = 0;

    var row = Ti.UI.createTableViewRow({
		//hasChild:true,
		link: post.url,
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
			width: 			Ti.UI.FILL,
			left: 			10,
			right:			10,
			top:			10,
			bottom:			0,
			padding:		0,
			borderRadius:	5
	});

	this.containerheight = getContainerHeight(post.image);
	container.height 	 = this.containerheight + 65 + 30;
	row.height 			 = this.containerheight + 90 + 8;

	var imagebox = createCachingImageView.createCachingImageView({
		image: post.image,//Ti.Filesystem.resourcesDirectory +'test.png', 
		defaultImage: Ti.Filesystem.resourcesDirectory + "loader400x600.gif",
		width: Ti.UI.FILL,
		height: this.containerheight,
		top: 30,
	});
	
	var overlay = Ti.UI.createImageView({
		width: Ti.UI.FILL,
		height: 40,
		top: 0,
		image: Ti.Filesystem.resourcesDirectory +'gold.png'
	});
	var shadow = Ti.UI.createImageView({
		width: Ti.UI.FILL,
		height: 150,
		top: this.containerheight-120,
		image: Ti.Filesystem.resourcesDirectory +'shadow.png'
	});
	
	
	var titlelbl = getTitleLabel(post.title, this.containerheight+30, post.description);
	container.add(titlelbl);

	//var desclbl  = getDescriptionLabel(post.description, this.containerheight + 30);
	//container.add(desclbl);
	
	
	var posted = Ti.UI.createLabel({
		text: 'Posted ' + (new DateObject(post.pubDate)).prettyDate() + ' in Kudos to Iowa People',
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
        zIndex: 3,
		font:{fontFamily:'HelveticaNeue-CondensedBold',fontSize:12,fontWeight:'bold'}
	});
	container.add(posted);
	
	
	row.add(container);
	
	
	row.addEventListener('click', function(e) {
		tracker.trackEvent({
				category: "Featured Articles",
				action: "click",
				label: "An Event in the " + title + "'s Window - " + post.url,
				value: 1
			});
		new WebView (post.url);
	});
	
	container.add(imagebox);
	container.add(shadow);
	container.add(overlay);
	//alert(post.image);
	desclbl = null; 
	titlelbl = null;
	posted = null;
	container = null;
	shadow = null;
	overlay = null;
	imagebox = null;
	return row;

}



function getContainerHeight(img) {
	var tempimagebox = Ti.UI.createImageView({
		image: Ti.Filesystem.resourcesDirectory +'test.png', //img,
		width: 'auto',
		height: 'auto',
		hires: true,
	});
    //new CachedImageView('imageDirectoryName', img, tempimagebox);

	var height = tempimagebox.toImage().height;
	var width = tempimagebox.toImage().width;
	var ratio = height / width;

	return Math.floor( 300 * ratio );
}

function getTitleLabel(title,postheight, description) {

	// Temp label to get height
	// At this font-size/font-face the height per line is 32
	
	var screenWidth = Ti.Platform.displayCaps.platformWidth  * (Titanium.Platform.displayCaps.dpi / 160);
	var temp = Ti.UI.createLabel({
		text: title,
		width: Ti.UI.FILL,
		left: 10,
		right: 10,
		bottom: 0,
		color:'#efc006',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:25,fontWeight:'bold'}
	});
	var view = Ti.UI.createView({
		width: screenWidth - 20,
		left: 10,
		right: 10,
		height:'auto'
	});
	view.add(temp);
	theheight = view.toImage().height;

	var titlelbl = Ti.UI.createLabel({
		text: title,
		left: 10,
		top : 0,
		//height:theheight,
		width: Ti.UI.FILL,
		color:'#efc006',
		shadowColor:'#000000',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
        zIndex: 3,
		font:{fontFamily:'HelveticaNeue-Light',fontSize:25,fontWeight:'bold'}
	});
	
	var table = Ti.UI.createTableView({
		zIndex: 5, 
		width: Ti.UI.FILL,
		top: postheight,
		separatorColor: '#000000',
	});
	
	var row1 = Ti.UI.createTableViewRow({backgroundSelectedColor : "transparent",});
	row1.add(titlelbl);
	
	var view = Ti.UI.createView({
		backgroundColor: '#0c0c0c',
		backgroundImage: Ti.Filesystem.resourcesDirectory + 'dark.jpg',
		width: Ti.UI.FILL,
		height: 65,
		top: 0
	});

	var text = Ti.UI.createLabel({
		text: description,
		left: 10,
		right: 10,
		top: 0,
		bottom: 10,
		height: 50,
		textAlign:'left',
		ellipsize: true,
		width: Ti.UI.FILL,
		color:'#ffffff',
		shadowColor:'#000000',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
	});
	view.add(text);
	
	var row2 = Ti.UI.createTableViewRow({backgroundSelectedColor : "transparent"});
	row2.add(view);
	table.setData([row1, row2]);
	//titlelbl.top = postheight - (theheight);
	table.top = postheight - theheight - 15;
	temp = null;
	view = null;
	return table;

}

function getDescriptionLabel(description,postheight) {

	var view = Ti.UI.createView({
		backgroundColor: '#0c0c0c',
		backgroundImage: Ti.Filesystem.resourcesDirectory + 'dark.jpg',
		width: Ti.UI.FILL,
		height: 65,
		top: postheight
	});

	var text = Ti.UI.createLabel({
		text: description,
		left: 10,
		right: 10,
		top: 0,
		bottom: 10,
		height: 50,
		textAlign:'left',
		ellipsize: true,
		width: Ti.UI.FILL,
		color:'#ffffff',
		shadowColor:'#000000',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
	});
	view.add(text);

	return view;

}


 
module.exports = FeatureRow;