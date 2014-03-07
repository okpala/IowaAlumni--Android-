var DateObject = require('ui/common/DateObject');
var EditText = require('ui/common/EditText');
var WebView = require('ui/common/WebView');
var subTextHieght = 15;
/*
 * Return a Single Post Area for Events Window
 * that contains Tilte, Time, and Place
 */

function SingleRow(post, tracker, title) {
   var table = Ti.UI.createTableView({
		separatorColor: 	'#ffffff',
		backgroundColor: 	'#ffffff',
		height:				getTitleLabelHieght(post.title) + 75,
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
				category: "Events",
				action: "click",
				label: "An Event in the " + title + "'s Window - " + post.url,
				value: 1
			});
			new WebView (post.url);

	 });
	if((Titanium.Platform.displayCaps.dpi / 160) >= 2)  table.height = getTitleLabelHieght(post.title) + 50;
	var label = Ti.UI.createLabel({
		text: (new EditText (post.title)).adjustedText(),
		left: 15,
		right: 15,
		top: 10,
		//bottom:10,
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
	
	
	var text = Ti.UI.createLabel({
		text: 'Time: ',
		left: 15,
		top: 5,
		textAlign:'left',
		width: 200,
		height: 15,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Bold',fontSize:12,fontWeight:'bold'}
	});
	
	var timeLabel = Ti.UI.createLabel({
		text: (new EditText (post.snl)).adjustedText(),
		left: 55,
		top: 5,
		textAlign:'left',
		width: 200,
		height: subTextHieght,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'normal'}
	});
	var row2 = Ti.UI.createTableViewRow({backgroundSelectedColor : "transparent"});
	row2.add(text);
	row2.add(timeLabel);
	
	var placeTitleLabel = Ti.UI.createLabel({
		text: 'Place: ',
		left: subTextHieght,
		top: 3,
		textAlign:'left',
		width: 200,
		height: 20,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Bold',fontSize:12,fontWeight:'bold'}
	});
	
	var placeLabel = Ti.UI.createLabel({
		text: (new EditText (post.place)).adjustedText(),
		left: 55,
		//bottom: 10,
		top:3,
		height: subTextHieght,
		textAlign:'left',
		width: 200,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'normal'}
	});
	
	var row3 = Ti.UI.createTableViewRow({backgroundSelectedColor : "transparent"});
	row3.add(placeTitleLabel);
	row3.add(placeLabel);
	
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
	
	table.setData([row1, row2, row3]);
	row.add(table);

	
	placeTitleLabel = null;
	placeLabel  = null;
	timeLabel = null;
	text  = null;
	label = null;
	table = null;
	

	return row;
}

/*
 * Helper Functions
 */



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

/*
function getpubDateLabel(pubDate) {

	var text = Ti.UI.createLabel({
		text: pubDate,
		left: 15,
		top: 10,
		textAlign:'left',
		width: 200,
		height: 20,
		color:'#5c4e1a',
		shadowColor:'#f0d87f',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'HelveticaNeue-CondensedBold',fontSize:12,fontWeight:'bold'}
	});

	return text;

}
*/
function timeLabel (){

	var text = Ti.UI.createLabel({
		text: 'Time: ',
		left: 15,
		top: 0,
		textAlign:'left',
		width: 200,
		height: subTextHieght,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Bold',fontSize:12,fontWeight:'bold'}
	});
	this.postheight += text.toImage().height;

	return text;

}

function getTime (snl){

	var text = Ti.UI.createLabel({
		text: (new EditText (snl)).adjustedText(),
		left: 55,
		top: 0,
		textAlign:'left',
		width: 200,
		height: subTextHieght,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	});

	return text;
}

function getPlace (place){

	var text = Ti.UI.createLabel({

		text: (new EditText (place)).adjustedText(),
		left: 55,
		bottom: 10,
		top:0,
		height: subTextHieght,
		textAlign:'left',
		width: 200,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	});

	return text;
}


function placeLabel (){

	var text = Ti.UI.createLabel({
		text: 'Place: ',
		left: subTextHieght,
		top: 0,
		textAlign:'left',
		width: 200,
		height: 20,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Bold',fontSize:12,fontWeight:'bold'}
	});
	this.postheight += text.toImage().height;

	return text;

}


module.exports = SingleRow;