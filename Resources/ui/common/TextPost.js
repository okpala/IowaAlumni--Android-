var DateObject = require('ui/common/DateObject'),
	Description = require('ui/common/Description');
	
var CachedImageView = require('ui/common/CachedImageView');
/*
 * Post Object
 * Essential attributes
 */

function TextPost(item) {
    this.title 			= item.title;
    this.description 	= (new Description(item.description)).getDescription();
    this.timestring 	= (new DateObject(item.pubDate)).dateString();
    this.image 			= (new Description(item.description)).getImage();
    this.url 			= item.link;
    this.postheight		= 0;
}

TextPost.prototype.featureRow = function() {
	
	var row = Ti.UI.createTableViewRow({
		hasChild: 			true,
		link: 				this.url,
		height: 			'auto',
		padding: 			0,
		top: 				0,
		bottom: 			0,
		layout: 			'vertical',
		backgroundColor: 	'e2e2e2'
	});
	row.rightImage = null;
	row.backgroundSelectedImage = null;
	row.backgroundFocusImage = null;

	var container =  Titanium.UI.createView({
		backgroundColor: 	'ffffff',
		height:				'auto',
		width: 				300,
		left: 				10,
		top:				10,
		bottom:				0,
		padding:			0,
		borderRadius:		5,
		borderColor: 		'#d5d5d5',
		borderWidth: 		1
	});

	titlelbl = getTitleLabel(this.title);
	container.add(titlelbl);

	desclbl  = getDescriptionLabel(this.description);
	container.add(desclbl);
	desclbl.top = titlelbl.height + 15;

	var posted = Ti.UI.createLabel({
		text: 			'Posted 2 hours ago in Kudos to Iowa People',
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
	var postImage = getPostImage(this.image);
	new CachedImageView('imageDirectoryName', this.image, postImage);
	//new ImageCaching('imageDirectoryName', this.image);
	imageContainer.add(postImage);
	container.add(imageContainer);

	container.height = titlelbl.height + desclbl.height + posted.height + 35;
	row.height = container.height + 25;

	

	/*
	var icon = Ti.UI.createImageView({
		top: 3,
		left: 280,
		width: 20,
		image:'clock1.png'
	});
	container.add(icon); */

	row.add(container);
	
	return row;
	
};

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

function getTitleLabel(title) {

	// Temp label to get height
	// At this font-size/font-face the height per line is 32
	var temp = Ti.UI.createLabel({
		text: title,
		height:'auto',
		width: 250,
		color:'#efc006',
		font:{fontFamily:'Helvetica',fontSize:16,fontWeight:'bold'}
	});
	var view = Ti.UI.createView({
		width: 250,
		height:'auto'
	});
	view.add(temp);
	//Ti.API.info('[' + view.toImage().width + ' x ' + view.toImage().height + '][' + view.toImage().size + '] ' + title);

	var label = Ti.UI.createLabel({
		text: title,
		left: 15,
		top: 15,
		bottom:10,
		height: view.toImage().height,
		textAlign:'left',
		width: 270,
		color:'#303030',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'Helvetica',fontSize:16,fontWeight:'bold'}
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
		textAlign:'left',
		width: 200,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	});
	this.postheight += text.toImage().height;

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
    new CachedImageView('imageDirectoryName', image, tempimagebox);
	
	var height = tempimagebox.toImage().height;
	var width = tempimagebox.toImage().width;
	var ratio = width / height;

	var adjustedWidth = Math.floor(60 * ratio);

	var imagebox = Ti.UI.createImageView({
		image: this.image,
		hires: true,
		width: adjustedWidth,
		top: 0
	});

	return imagebox;
}


 
module.exports = TextPost;
