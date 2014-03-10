var DateObject = require('ui/common/DateObject');
var CachedImageView = require('ui/common/CachedImageView');
var WebView = require('ui/common/WebView');
var createCachingImageView = require('ui/common/createRemoteImageView2');
var EditText = require('ui/common/EditText');
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
	desclbl.top = titlelbl.height;

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
	posted.top = titlelbl.top + titlelbl.height + desclbl.height + 10; 
	container.add(posted);


	var imageContainer = Ti.UI.createView({
		width: 			60,
		height: 		60,
		right: 			15,
		top: 			titlelbl.height + 3,
		borderRadius:	4,
		borderColor: 	'#d5d5d5',
		borderWidth: 	1

	});
	

	var imagebox = createCachingImageView.createCachingImageView({
		image: post.image, //"http://www.iowalum.com/blog/wp-content/uploads/2014/02/UIAA_Network1-150x150.png",
		defaultImage: Ti.Filesystem.resourcesDirectory + "loader120x120.png",
		width: Ti.UI.FILL,
		height: Ti.UI.FILL,
	});

	//alert(post.image);
	imageContainer.add(imagebox);
	container.add(imageContainer);

	container.height = titlelbl.height + desclbl.height + posted.height + 25;
	 if((Titanium.Platform.displayCaps.dpi / 160) >= 2) {
	 	titlelbl.height = titlelbl.height - 10;
	 	titlelbl.top = 0;
	 	desclbl.top = titlelbl.height;
	 	imageContainer.top = titlelbl.height;
	 	 container.height = titlelbl.height + desclbl.height + posted.height + 10;
	 	 posted.top = titlelbl.top + titlelbl.height + desclbl.height + 5;
	 }
	row.height = container.height;

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


	 posted = null;
	 titlelbl = null;
	 desclbl = null;
	 container = null;
	 imagebox = null;
	imageContainer = null;


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
		top: 5,
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
		text: (new EditText (description)).adjustedText(),
		left: 15,
		bottom: 10,
		top: 3,
		height: 70,
		right: 80,
		//textAlign:'left',
		width: Ti.UI.FILL,
		//ellipsize: true,
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