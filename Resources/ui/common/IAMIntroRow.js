var WebView = require('ui/common/WebView');
/*
 * Return Iowa Magazine's Window Header
 */

function IAMIntroRow(post) {
	
	var table = Ti.UI.createTableView({
		separatorColor: 	'#d5d5d5',
		backgroundColor: 	'#ffffff',
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
	
	 var image = Ti.UI.createImageView({
	  image:    Ti.Filesystem.resourcesDirectory + 'magfan.jpg',
	  top:   10,
	  right: 10,
	  width: 80,
	  height: 55
	});

	 var rowText = Ti.UI.createTableViewRow({
	 	selectionStyle: 'none',
	    height: getTableHeight(image.height)
	       
	 });
	    
	 var screenWidth = Ti.Platform.displayCaps.platformWidth;  
	
	
	    
	 
	table.height = rowText.height;
	var data = [];
	 data.push(rowText);
	table.setData(data);

	var row = Ti.UI.createTableViewRow({
		//hasChild: true,
		height: table.height+10,
		padding: 0,
		top: 0,
		bottom: 0,
		layout: 'vertical',
		selectionStyle: 'none',
		backgroundColor: '#e2e2e2'
	});

	row.add(table);
	
	

	introLabel  = getText(image.width);
	rowText.add(introLabel);
	rowText.add(image);

	
	
	

	return row;
}

/*
 * Helper Functions
 */

function getTableHeight(imageHeight){
	var temp = Ti.UI.createLabel({
		text: 'Our award winning bimonthly magazine published by the University of Iowa Alumni Association. ',
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
	var height;
	if (view.toImage().height > imageHeight){
		height = view.toImage().height;
	}
	else{
		height = imageHeight;
	}
	
	return height;
}

function getText (imageWidth){

	var text = Ti.UI.createLabel({
		text: 'Our award winning bimonthly magazine published by the University of Iowa Alumni Association. ',
		left: 10,
		top: 10,
		textAlign:'left',
		width: screenWidth - (imageWidth + 20),
		
		//height: view.toImage().height,
		color:'#000000',
		font: {fontFamily:'HelveticaNeueBold',fontSize:12,fontWeight:'bold'}
	});
	

	return text;

}


module.exports = IAMIntroRow;
