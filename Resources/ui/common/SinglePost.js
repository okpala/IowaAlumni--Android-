var DateObject = require('ui/common/DateObject');
var CachedImageView = require('ui/common/CachedImageView');
var WebView = require('ui/common/WebView');
var createCachingImageView = require('ui/common/createRemoteImageView2');
var EditText = require('ui/common/EditText');
/*
 * Return a Single Post Area that contains
 * tilte, description, and picture(Not Required)
 */
function SinglePost (post, tracker, title){
	var table = Ti.UI.createTableView({
		separatorColor: 	'#ffffff',
		backgroundColor: 	'#ffffff',
		height:				getTitleLabelHieght(post.title) + 100,
		width: 				Ti.UI.FILL,
		left: 				10,
		right:				10,
		top:				10,
		bottom:				0,
		padding:			0,
		borderRadius:		5,
		borderColor: 		'#d5d5d5',
		borderWidth: 		1,
		scrollable: 		false
	});
	table.addEventListener('click', function(e) {
	 		tracker.trackEvent({
				category: "Articles",
				action: "click",
				label: "An Article in the " + title + "'s Window - " + post.url,
				value: 1
			});
			new WebView ( post.url);
	 });
	 
	  if((Titanium.Platform.displayCaps.dpi / 160) >= 2)  table.height = getTitleLabelHieght(post.title) + 60;
	
	var label = Ti.UI.createLabel({
		text: (new EditText (post.title)).adjustedText(),
		left: 15,
		right: 15,
		top: 10,
		bottom:5,
		//height: view.toImage().height,
		textAlign:'left',
		width: Ti.UI.FILL,
		color:'#303030',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'bold'}
	});
	var row1 = Ti.UI.createTableViewRow({backgroundSelectedColor : "transparent"});
	row1.add(label);
	
	var row2 = Ti.UI.createTableViewRow({backgroundSelectedColor : "transparent"});
	if (post.image != 'NA'){
		var imageContainer = Ti.UI.createView({
			width: 			60,
			height: 		60,
			right: 			15,
			top: 			0,
			borderRadius:	4,
			borderColor: 	'#d5d5d5',
			borderWidth: 	1
		
		});
		
		var imagebox = createCachingImageView.createCachingImageView({
			image: post.image, //'http://www.iowalum.com/giveaway/images/facebookPost.png',
			defaultImage: Ti.Filesystem.resourcesDirectory + "loader120x120.png",
			width: 			60,
			height: 		60,
			top: 0
		});
		
		imageContainer.add(imagebox);	
	
			
		var desclbl =  Ti.UI.createLabel({
			text: post.description,
			left: 10,
			right: 80,
			top: 0,
			height: 70,
			width: Ti.UI.FILL,
			//ellipsize: true,
			color:'#000000',
			font:{fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'normal'}
		});
		row2.add(desclbl);
			
		row2.add(imageContainer);
	}
		
	else{
		var desclbl =  Ti.UI.createLabel({
			text: (new EditText (post.description)).adjustedText(),
			left: 10,
			right: 10,
			top: 0,
			height: 70,
			width: Ti.UI.FILL,
			//ellipsize: true,
			color:'#000000',
			font:{fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'normal'}
		});
		row2.add(desclbl);
		
		}
	/*
	
	var table = Ti.UI.createTableView({
		//separatorColor: 	'#d5d5d5',
		backgroundColor: 	'#ffffff',
		height:				'auto',
		width: 				Ti.UI.FILL,
		left: 				10,
		right:				10,
		top:				10,
		bottom:				0,
		padding:			0,
		borderRadius:		5,  
		//borderColor: 		'#d5d5d5',
		borderWidth: 		1,
		//scrollable: 		false
	});

	 var rowText = Ti.UI.createTableViewRow({
	        height: 120
	    });

	 rowText.addEventListener('click', function(e) {
	 		tracker.trackEvent({
				category: "Articles",
				action: "click",
				label: "An Article in the " + title + "'s Window - " + post.url,
				value: 1
			});
			new WebView ( post.url);
			
	 });
	 
	 
	
	 table.height = rowText.height;
	var data = [];
	 data.push(rowText);
	table.setData(data);

	var row = Ti.UI.createTableViewRow({
		height: table.height+15,
		padding: 0,
		top: 0,
		bottom: 0,
		backgroundColor: '#e2e2e2',
	});
	

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
		
		var imagebox = createCachingImageView.createCachingImageView({
			image: post.image, //'http://www.iowalum.com/giveaway/images/facebookPost.png',
			defaultImage: Ti.Filesystem.resourcesDirectory + "loader120x120.png",
			width: 			60,
			height: 		60,
			top: 0
		});
		
		imageContainer.add(imagebox);	
	
			
			rowText.add(imageContainer);
			
			var desclbl = getDescriptionLabel(post.description, 80);
			rowText.add(desclbl);
		}
		
		else{
			var desclbl = getDescriptionLabel(post.description, 10);
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
		//rowText.add(posted);
		
		//row = rowText.height + 30;
		
		
		rowText.height = titleLabel.height + desclbl.height + posted.height;
		table.height = rowText.height;
		row.height = rowText.height + 10;
		
		imageContainer = null;
		posted = null;
		desclbl = null;
		imagebox = null;
		titleLabel = null;
		table = null;
		*/	
		
		var row = Ti.UI.createTableViewRow({
			//hasChild: true,
			height: table.height,
			padding: 0,
			top: 0,
			bottom: 10,
			link: 				post.url,
			layout: 'vertical',
			selectionStyle: 'none',
			backgroundColor: '#e2e2e2'
		});
		
		table.setData([row1, row2]);
		//table.height = row1.toImage().height + row2.toImage().height;
		row.add(table);
		
		imageContainer = null;
		posted = null;
		desclbl = null;
		imagebox = null;
		label = null;
		table = null;
			
		return row;
		
} 

function getTitleLabelHieght(title) {
	// Temp label to get height
	// At this font-size/font-face the height per line is 32

	var temp = Ti.UI.createLabel({
		text: title,
		height:'auto',
		width:  "auto" ,
		left: 25,
		right: 25,
		bottom: 5,
		color:'#efc006',
		font:{fontFamily:'Helvetica',fontSize:16,fontWeight:'bold'}
	});
	var view = Ti.UI.createView({
		width: Ti.Platform.displayCaps.platformWidth - 20,
		height:'auto'
	});
        view.add(temp);



	var label = Ti.UI.createLabel({
		text: title,
		left: 15,
		right: 15,
		top: 10,
		bottom:10,
		height: view.toImage().height,
		textAlign:'left',
		width: Ti.UI.FILL,
		color:'#303030',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
	});

	return view.toImage().height;
}

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
		width: Ti.Platform.displayCaps.platformWidth - 20,
		height:'auto'
	});
	view.add(temp);
	

	var label = Ti.UI.createLabel({
		text: title,
		left: 10,
		top: 10,
		bottom:0,
		height: view.toImage().height,
		textAlign:'left',
		width: 270,
		color:'#303030',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'bold'}
	});
	
	return label;

}

function getDescriptionLabel(description, descWidth) {

	var text = Ti.UI.createLabel({
		text: description,
		left: 10,
		right: descWidth,
		bottom: 0,
		top: 10,
		height: 70,
		width: Ti.UI.FILL,
		//ellipsize: true,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'normal'}
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
    
    //new CachedImageView('imageDirectoryName', image, tempimagebox);
	
	var height = tempimagebox.toImage().height;
	var width = tempimagebox.toImage().width;
	var ratio = width / height;

	var adjustedWidth = Math.floor(60 * ratio);

	var imagebox = Ti.UI.createImageView({
		image: image,
		//hires: true,
		width: adjustedWidth,
		top: 0
	});

	return imagebox;
}

module.exports = SinglePost;