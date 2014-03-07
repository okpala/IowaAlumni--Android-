var DateObject = require('ui/common/DateObject');
var CachedImageView = require('ui/common/CachedImageView');
var WebView = require('ui/common/WebView');
var createCachingImageView = require('ui/common/createRemoteImageView2');
var theheight;
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
		backgroundColor: '#fff',//'transparent',
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
	
	container.height 	 = this.containerheight + 10;
	row.height 			 = container.height + 10;
	
	var imagebox = createCachingImageView.createCachingImageView({
		image: post.image, 
		defaultImage: Ti.Filesystem.resourcesDirectory + "loader400x600.png",
		width: Ti.UI.FILL,
		height: this.containerheight,
		zIndex: 0,
		top: 30,
	});
	
	var overlay = Ti.UI.createImageView({
		width: Ti.UI.FILL,
		height: 40,
		top: 0,
		image: Ti.Filesystem.resourcesDirectory +'gold.png'
	});
	
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
	
	var shadow = Ti.UI.createImageView({
		width: Ti.UI.FILL,
		height: 150,
		top: this.containerheight-120,
		image: Ti.Filesystem.resourcesDirectory +'shadow.png'
	});
	
	
	/*
	
	
	
	
	
	
	
	

	
	
	
	
	
	
	
	

	
	
	
	
	Ti.API.info("current Width " + Ti.Platform.displayCaps.platformWidth  * (Titanium.Platform.displayCaps.dpi / 160));
	Ti.API.info("Width in dp " + Ti.Platform.displayCaps.platformWidth  / (Titanium.Platform.displayCaps.dpi / 160));
	Ti.API.info("Width" + Ti.Platform.displayCaps.platformWidth  );
	Ti.API.info("dp " + Titanium.Platform.displayCaps.dpi );
	
	desclbl = null; 
	titlelbl = null;
	
	
	*/
	
	
	container.add(imagebox);
	container.add(overlay);
	container.add(posted);
	container.add(shadow);
	var titlelbl = getTitleLabel(post.title, container.height);
	
	
	var desclbl  = getDescriptionLabel(post.description, container.height);
	titlelbl.bottom = desclbl.height;
	container.add(titlelbl);
	container.height 	 = container.height + desclbl.height;
	row.height 			 = container.height + 10;
	container.add(desclbl);
	
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
	
	posted = null;
	shadow = null;
	overlay = null;
	imagebox = null;
	container = null;
	
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


function getTitleLabel(title, postheight) {

	// Temp label to get height
	// At this font-size/font-face the height per line is 32
	
	var screenWidth = Ti.Platform.displayCaps.platformWidth  / (Titanium.Platform.displayCaps.dpi / 160);
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
		width: Ti.Platform.displayCaps.platformWidth - 20,
		left: 10,
		right: 10,
		height:'auto'
	});
	view.add(temp);
	theheight = view.toImage().height;

	var titlelbl = Ti.UI.createLabel({
		text: title,
		left: 10,
		right: 10,
		//top: postheight - theheight,
		//bottom: 0,
		height:'auto',//theheight,
		textAlign:'left',
		width: Ti.UI.FILL,
		color:'#efc006',
		shadowColor:'#000000',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'HelveticaNeue-Light',fontSize:25,fontWeight:'normal'}
	});

	return titlelbl;

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
		//ellipsize: true,
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