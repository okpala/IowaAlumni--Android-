var DateObject = require('ui/common/DateObject');
var CachedImageView = require('ui/common/CachedImageView');
var WebView = require('ui/common/WebView');
var Utils = require('ui/common/Utils');

/*
 * Post Object
 * Essential attributes
 */

function Row(post, tracker, title) {

    //this.postheight		= 0;
	
    var row = Ti.UI.createTableViewRow({
    	link:               post.url,
		height: 			'auto',
		padding: 			0,
		top: 				0,
		bottom: 			0,
		layout: 			'vertical',
		backgroundColor: 	'#e2e2e2'
	});
	
	var container =  Titanium.UI.createView({
		backgroundColor: 	'#ffffff',
		height:				'auto',
		width: 				Ti.UI.FILL,
		left: 				0,
		top:				0,
		bottom:				0,
		padding:			0
	});

	


	titlelbl = getTitleLabel(post.title);
	container.add(titlelbl);
	
	
	
	desclbl  = getDescriptionLabel(post.description);
	container.add(desclbl);
	desclbl.top = titlelbl.height + 15;

	var posted = Ti.UI.createLabel({
		text: 			(new DateObject(post.pubDate)).prettyDate(),
		left: 			15,
		bottom: 		10,
		height: 		15,
		textAlign: 		'left',
		width: 			270,
		color: 			'#616161',
		shadowColor: 	'#ffffff',
        shadowOpacity: 	0.5,
        shadowOffset: 	{x:0, y:1},
		font: 			{fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	});
	posted.top = titlelbl.height + desclbl.height + 20; 
	container.add(posted);
	

	var imageContainer = Ti.UI.createView({
		width: 			60,
		height: 		60,
		right: 			15,
		top: 			titlelbl.height+20,
		borderRadius:	4,
		borderColor: 	'#d5d5d5',
		borderWidth: 	1

	});
	//var postImage = getPostImage(post.image);
	var imagebox = Utils.RemoteImage({
		image: post.image,
		width: Ti.UI.FILL,
		height: Ti.UI.FILL,
		//hires: true,
	});
	//Ti.API.info(post.image);
	//postImage = getPostImage(post.image);
	//new CachedImageView('imageDirectoryName', post.image, postImage);
	
	imageContainer.add(imagebox);
	container.add(imageContainer);

	container.height = titlelbl.height + desclbl.height + posted.height + 35;//<--- container.height = titlelbl.height + timelbl.height + desclbl.height + posted.height + 35;
	row.height = container.height;
/*

*/
	row.add(container);
	
	row.addEventListener('click', function(e) {
		tracker.trackEvent({
				category: "Articles",
				action: "click",
				label: "An Event in the " + title + "'s Window - " + e.row.link,
				value: 1
			});
		
		new WebView (e.row.link);
	});
	
	return row;
}

/*
 * Helper Functions
 */

/*
function getContainerHeight(img) {
	var tempimagebox = Ti.UI.createImageView({
		image: img,
		width: 'auto',
		height: 'auto',
		hires: true,
		//top: -10, // this works for some reason
	});
   new CachedImageView('imageDirectoryName', img, tempimagebox);
	
	var height = tempimagebox.toImage().height;
	var width = tempimagebox.toImage().width;
	var ratio = height / width;

	return Math.floor( 300 * ratio );
}
*/
function getTitleLabel(title) {

	// Temp label to get height
	// At this font-size/font-face the height per line is 32
	var temp = Ti.UI.createLabel({
		text: title,
		height:'auto',
		width:  "auto" ,
		left: 10,
		right: 10,
		color:'#efc006',
		font:{fontFamily:'Helvetica',fontSize:16,fontWeight:'bold'}
	});
	var view = Ti.UI.createView({
		width:  Ti.Platform.displayCaps.platformWidth - 20,
		height:'auto'
	});
	view.add(temp);
	

	var label = Ti.UI.createLabel({
		text: title,
		left: 15,
		top: 15,
		bottom:10,
		height: view.toImage().height + 10,
		textAlign:'left',
		width: 270,
		color:'#303030',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
	});
	
	return label;

}


function getDescriptionLabel(description) {

	var text = Ti.UI.createLabel({
		text: description,
		left: 15,
		bottom: 10,
		top: 0,
		height: 70,
		//textAlign:'left',
		width: 200,
		ellipsize: true,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	});
	//this.postheight += text.toImage().height;

	return text;

}

function getPostImage(image) {
	var tempimagebox = Ti.UI.createImageView({
		image: image,
		width: 'auto',
		height: 'auto',
		hires: true,
		//top: -10, // this works for some reason
	});
    //new CachedImageView('imageDirectoryName', image, tempimagebox);
	
	var height = tempimagebox.toImage().height;
	var width = tempimagebox.toImage().width;
	var ratio = width / height;

	var adjustedWidth = Math.floor(60 * ratio);

	var imagebox = Ti.UI.createImageView({
		image: image,
		hires: true,
		width: adjustedWidth,
		top: 0
	});
	

	return imagebox;
}

 
module.exports = Row;
