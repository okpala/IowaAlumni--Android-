var WebView = require('ui/common/WebView');
/*
 * Return Iowa Insider Blog's Window Header
 */

function IIBIntroRow(post) {
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
	 	selectionStyle: 'none',
	        height: 50
	    });
	    
	 
	table.height = rowText.height;
	var data = [];
	 data.push(rowText);
	table.setData(data);

	var row = Ti.UI.createTableViewRow({
		hasChild: true,
		height: table.height+10,
		padding: 0,
		top: 0,
		bottom: 0,
		layout: 'vertical',
		backgroundColor: 'e2e2e2'
	});
	row.rightImage = null;
	row.backgroundSelectedImage = null;
	row.backgroundFocusImage = null;

	row.add(table);
	
	

	introLabel  = getText();
	rowText.add(introLabel);

	
	
	

	return row;
}

/*
 * Helper Functions
 */



function getText (){

	var text = Ti.UI.createLabel({
		text: 'The official blog of the University of Iowa Alumni Association.',
		left: 10,
		top: 10,
		textAlign:'left',
		width: 290,
		//height: 20,
		color:'#000000',
		font: {fontFamily:'HelveticaNeueBold',fontSize:12,fontWeight:'bold'}
	});
	

	return text;

}


module.exports = IIBIntroRow;
