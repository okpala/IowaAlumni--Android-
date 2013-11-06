var GetFeed = require('ui/common/GetFeed');
var DateObject = require('ui/common/DateObject');
var CachedImageView = require('ui/common/CachedImageView');
var WebView = require('ui/common/WebView');
/*
 * Return a Single Post Area that contains
 * tilte, description, and picture(Not Required)
 */
function SinglePost (post){
	
	
	
	var table = Ti.UI.createTableView({
		separatorColor: 	'd5d5d5',
		backgroundColor: 	'ffffff',
		height:				'auto',
		width: 				300,
		left: 				10,
		top:				10,
		bottom:				0,
		padding:			0,
		borderRadius:		5,  
		borderColor: 		'#d5d5d5',
		borderWidth: 		1,
		scrollable: 		false
	});

	 var rowText = Ti.UI.createTableViewRow({
	        height: 120
	    });

	 rowText.addEventListener('click', function(e) {
			new WebView ( post.url);
			
	 });
	 
	 table.height = rowText.height;
	var data = [];
	 data.push(rowText);
	table.setData(data);

	var row = Ti.UI.createTableViewRow({
		hasChild: true,
		height: table.height+15,
		padding: 0,
		top: 0,
		bottom: 0,
		//link: 				post.url,
		layout: 'vertical',
		selectionStyle: 'none',
		backgroundColor: 'e2e2e2'
	});
	row.rightImage = null;
	row.backgroundSelectedImage = null;
	row.backgroundFocusImage = null;

	row.add(table);
		
		
		
		var titleLabel = getTitleLabel(post.title);
		rowText.add(titleLabel);
		
		if (post.image != 'NA'){
			var imageContainer = Ti.UI.createView({
				width: 			60,
				height: 		60,
				right: 			15,
				top: 			titleLabel.height+20,
				borderRadius:	4,
				borderColor: 	'#d5d5d5',
				borderWidth: 	1
		
			});
			var postImage = getPostImage(post.image);
			
			imageContainer.add(postImage);
			rowText.add(imageContainer);
			
			var desclbl = getDescriptionLabel(post.description, 200);
			rowText.add(desclbl);
		}
		
		else{
			var desclbl = getDescriptionLabel(post.description, 280);
			rowText.add(desclbl);
		}
		
		
		desclbl.top = titleLabel.height + 10;
		
		
		var posted = Ti.UI.createLabel({
			text: 			(new DateObject(post.pubDate)).prettyDate(),
			left: 			10,
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
		posted.top = titleLabel.height + desclbl.height + 10; 
		rowText.add(posted);
		
		//row = rowText.height + 30;
		
		
		rowText.height = titleLabel.height + desclbl.height + posted.height;
		table.height = rowText.height;
		row.height = rowText.height + 10;
		
		
		return row;
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
	

	var label = Ti.UI.createLabel({
		text: title,
		left: 10,
		top: 10,
		bottom:10,
		height: view.toImage().height,
		textAlign:'left',
		width: 270,
		color:'#303030',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
	});
	
	return label;

}

function getDescriptionLabel(description, descWidth) {

	var text = Ti.UI.createLabel({
		text: description,
		left: 10,
		bottom: 10,
		top: 0,
		height: 70,
		textAlign:'left',
		width: descWidth,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	});
	

	return text;

}

function getPostImage(image) {
	var tempimagebox = Ti.UI.createImageView({
		image: image,
		width: 'auto',
		height: 'auto',
		hires: true,
		
	});
    new CachedImageView('imageDirectoryName', image, tempimagebox);
	
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

module.exports = SinglePost;