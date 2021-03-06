var DateObject = require('ui/common/DateObject');
var EditText = require('ui/common/EditText');
var WebView = require('ui/common/WebView');
/*
 * Event Date Header Object
 * Essential attributes
 */

function HeaderRow(post, tracker, title) {

   var table = Ti.UI.createTableView({
		separatorColor: 	'#e2e2e2',
		backgroundColor: 	'#e2e2e2',
		height:				'auto',
		width: Ti.UI.FILL,
		left: 10,
		right: 10,
		top: 10,
		bottom:	0,
		padding: 0,
	});

	 var rowText = Ti.UI.createTableViewRow({
	 		backgroundImage: Ti.Filesystem.resourcesDirectory + 'gold.png', 
	 		backgroundSelectedImage: Ti.Filesystem.resourcesDirectory + 'blue.png', 
	        height: 50,       
	 });
	 
	 rowText.addEventListener('click', function(e) {
	 		tracker.trackEvent({
				category: "Events",
				action: "click",
				label: "An Event in the " + title + "'s Window - " + post.hlink,
				value: 1
			});
			new WebView (post.hlink);
	 });
	
	table.height = rowText.height + 5;
	var data = [];
	 data.push(rowText);
	table.setData(data);
 
	var row = Ti.UI.createTableViewRow({
		//hasChild: true,
		height: table.height + 8,
		padding: 0,
		top: 0,
		bottom: 0,
		link: 	post.hlink,
		layout: 'vertical',
		backgroundSelectedColor : "transparent",
		backgroundColor: '#e2e2e2',
	});
	

	row.add(table);
	datebl  = getpubDateLabel(post.pubDate);
	rowText.add(datebl);
	table = null;
	datebl = null;
	rowText = null;
	return row;
}

/*
 * Helper Functions
 */


function getpubDateLabel(pubDate) {

	var text = Ti.UI.createLabel({
		text: pubDate,		
		left: 15,
		bottom: 15,
		textAlign:'left',
		width: 200,
		height: 25,
		color:'#5c4e1a',
		font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'bold'}
	});

	return text;

}

module.exports = HeaderRow;
