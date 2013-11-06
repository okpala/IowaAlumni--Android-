var DateObject = require('ui/common/DateObject');
var EditText = require('ui/common/EditText');
var WebView = require('ui/common/WebView');
/*
 * Event Date Header Object
 * Essential attributes
 */

function HeaderRow(post) {

   var table = Ti.UI.createTableView({
		separatorColor: 	'e2e2e2',
		backgroundColor: 	'e2e2e2',
		height:				'auto',
		width: 				300,
		left: 				10,
		top:				10,
		bottom:				0,
		padding:			0,
		scrollable: 		false
	});

	 var rowText = Ti.UI.createTableViewRow({
	 		backgroundImage: 'gold.png', 
	    	text: "hello",
	        height: 50,
	        selectedBackgroundImage: 'blue.png'
	        
	    });
	 rowText.addEventListener('click', function(e) {
			new WebView (post.hlink);
	 });
	 
	table.height = rowText.height;
	var data = [];
	 data.push(rowText);
	table.setData(data);

	var row = Ti.UI.createTableViewRow({
		hasChild: true,
		height: table.height + 8,
		padding: 0,
		top: 0,
		bottom: 0,
		link: 	post.hlink,
		layout: 'vertical',
		selectionStyle: 'none',
		backgroundColor: 'e2e2e2'
	});
	row.rightImage = null;
	row.backgroundSelectedImage = null;
	row.backgroundFocusImage = null;

	row.add(table);
	datebl  = getpubDateLabel(post.pubDate);
	rowText.add(datebl);

	

	return row;
}

/*
 * Helper Functions
 */


function getpubDateLabel(pubDate) {

	var text = Ti.UI.createLabel({
		text: pubDate,		left: 15,
		bottom: 15,
		textAlign:'left',
		width: 200,
		height: 25,
		color:'#5c4e1a',
		font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
	});

	return text;

}

module.exports = HeaderRow;
