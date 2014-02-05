var DateObject = require('ui/common/DateObject');
var CachedImageView = require('ui/common/CachedImageView');
var WebView = require('ui/common/WebView');
var Utils = require('ui/common/Utils');
//Ti.include('createRemoteImageView');
//var ImageView  = require('ui/common/createRemoteImageView');
//var remoteImage = require('ui/common/RemoteImageView');
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
	row.height 			 = this.containerheight + 100 + 8;

	var imagebox = Utils.RemoteImage({
		image: post.image,
		width: Ti.UI.FILL,
		height: this.containerheight,
		//hires: true,
		top: 30
	});
	//new CachedImageView('imageDirectoryName', post.image, imagebox);
	var overlay = Ti.UI.createImageView({
		width: Ti.UI.FILL,
		height: 40,
		hires: true,
		top: 1,
		image: Ti.Filesystem.resourcesDirectory +'gold.png'
	});
	var shadow = Ti.UI.createImageView({
		width: Ti.UI.FILL,
		height: 150,
		hires: true,
		top: this.containerheight-120,
		image: Ti.Filesystem.resourcesDirectory +'shadow.png'
	});
	container.add(imagebox);
	container.add(shadow);
	container.add(overlay);

	titlelbl = getTitleLabel(post.title,this.containerheight+30);
	container.add(titlelbl);

	desclbl  = getDescriptionLabel(post.description, titlelbl.top + titlelbl.height);
	container.add(desclbl);


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

function getTitleLabel(title,postheight) {

	// Temp label to get height
	// At this font-size/font-face the height per line is 32
	var temp = Ti.UI.createLabel({
		text: title,
		height:'auto',
		width: 250,
		left: 10,
		right: 10,
		bottom: 10,
		color:'#efc006',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:25,fontWeight:'bold'}
	});
	var view = Ti.UI.createView({
		width: Ti.Platform.displayCaps.platformWidth - 20,
		height:'auto'
	});
	view.add(temp);
	theheight = view.toImage().height;

	var titlelbl = Ti.UI.createLabel({
		text: title,
		left: 10,
		bottom:10,
		height:theheight,
		textAlign:'left',
		width: Ti.UI.FILL,
		color:'#efc006',
		shadowColor:'#000000',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'HelveticaNeue-Light',fontSize:25,fontWeight:'bold'}
	});

	titlelbl.top = postheight - (theheight + 5);

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