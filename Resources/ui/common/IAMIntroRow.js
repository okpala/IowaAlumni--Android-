/*
 * Return Iowa Magazine's Window Header
 */

function IAMIntroRow(post) {
	
	var table = Ti.UI.createTableView({
		separatorColor: 	'#fff',
		backgroundColor: 	'#ffffff',
		height:				'auto',
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
	
	 var image = Ti.UI.createImageView({
	  image:    Ti.Filesystem.resourcesDirectory + 'magfan.jpg',
	  top:   10,
	  right: 5,
	  width: 80,
	  height: 55
	});

	 var rowText = Ti.UI.createTableViewRow({
	 	backgroundSelectedColor : "transparent",
	 	//backgroundColor: '#e2e2e2',
	    height: 'auto'//getTableHeight(image.height)
	       
	 });
	    
	 
	
	
	    
	 
	//table.height = rowText.height;
	
	
	table.setData([rowText]);

	var row = Ti.UI.createTableViewRow({
		padding: 0,
		top: 0,
		bottom: 10,
		layout: 'vertical',
		backgroundSelectedColor : "transparent",
		backgroundColor: '#e2e2e2'
	});

	row.add(table);
	
	
	rowText.add(image);
	
	var introLabel  = getText(image.width, table.width);
	rowText.add(introLabel);
	
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

function getText (imageWidth, tableWidth){

	var text = Ti.UI.createLabel({
		text: 'Our award winning bimonthly magazine published by the University of Iowa Alumni Association. ',
		left: 10,
		top: 10,
		textAlign:'left',
		right: (imageWidth + 15),
		width: Ti.UI.FILL,
		
		//height: view.toImage().height,
		color:'#000000',
		font: {fontFamily:'HelveticaNeueBold',fontSize:12,fontWeight:'bold'}
	});
	

	return text;

}


module.exports = IAMIntroRow;
