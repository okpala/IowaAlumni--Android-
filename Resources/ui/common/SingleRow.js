var DateObject = require('ui/common/DateObject');
var EditText = require('ui/common/EditText');
var WebView = require('ui/common/WebView');
/*
 * Return a Single Post Area for Events Window
 * that contains Tilte, Time, and Place
 */

function SingleRow(post) {

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
	        height: 150
	    });

	 rowText.addEventListener('click', function(e) {
			new WebView (post.url);
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
		link: 				post.url,
		layout: 'vertical',
		selectionStyle: 'none',
		backgroundColor: 'e2e2e2'
	});
	row.rightImage = null;
	row.backgroundSelectedImage = null;
	row.backgroundFocusImage = null;

	row.add(table);


	titlelbl = getTitleLabel(post.title);
	rowText.add(titlelbl);

	timebl  = timeLabel();
	rowText.add(timebl);

	inputtimebl  = getTime(post.snl);
	rowText.add(inputtimebl);

	inputplacebl  = getPlace(post.place);
	rowText.add(inputplacebl);

	placebl  = placeLabel();
	rowText.add(placebl);


	timebl.top =   titlelbl.height + 15 ;
	inputtimebl.top  = timebl.top;
	placebl.top =  inputplacebl.top = timebl.height  + titlelbl.height + 15 ;




	rowText.height = titlelbl.height + inputtimebl.height + inputplacebl.height +  25;
	table.height = rowText.height;
	row.height = table.height + 15;




	return row;
}

/*
 * Helper Functions
 */


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
		left: 15,
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

function timeLabel (){

	var text = Ti.UI.createLabel({
		text: 'Time: ',
		left: 15,
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

function getTime (snl){

	var text = Ti.UI.createLabel({
		text: (new EditText (snl)).adjustedText(),
		left: 55,
		top: 0,
		textAlign:'left',
		width: 200,
		height: 20,
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
		height: 20,
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
		left: 15,
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