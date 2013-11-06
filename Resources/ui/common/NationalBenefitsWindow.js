var MapWindow = require('ui/common/MapWindow');
var ApplicationWindow = require('ui/common/ApplicationWindow');
var GetFeed = require('ui/common/GetFeed');
var WebView = require('ui/common/WebView');
var Feed = require('ui/common/Feed');

function NationalBenefitsWindow(){
	var Feeds = new Feed();
	var masterView = Ti.UI.createView();
	var textView = Ti.UI.createView({
		//backgroundColor: 	'#ebc22f',//#ebc22f  e2e2e2
		backgroundImage:	'gray-broder.png',
		height:				90,
		width:				316,
		top:				0,
		left:				2,
		//borderRadius:		15,
		//borderColor: 		'#444444',
		//borderWidth: 		2

		
	});
	var introLabel = Ti.UI.createLabel({
			 text: ('As a UIAA member, you gain access to a variety of exclusive benefits that show our appreciation for your support of the UIAA.'),
			 textAlign: 'left',
			 left: 10,
			 width: 300,
			 top: 10,
			font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
			        
		});
	textView.add(introLabel);	
	
	var table = Ti.UI.createTableView({
		height: 'auto',
		//top: 134
		top: 70
	});
	
	var linkLabel = Ti.UI.createLabel({
			 text: 'IC benefits',
			 //textAlign: 'left',
			 left: 250,
			 top: 50,
			 color: 'blue',
			font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
			        
		});
		
	linkLabel.addEventListener('click', function(e){
		(new MapWindow()).open();
	});
	
	var discount = new GetFeed (Feeds.nationalDiscountFeed());
	
	var data = [];
	for (var i = 0; i <= discount.length - 1; i++) {
		if (i % 2 == 0){
		    var row = Ti.UI.createTableViewRow({
		        height: 'auto',
		        bottom: 10,
		    });
		}
		else{
			var row = Ti.UI.createTableViewRow({
		        height: 'auto',
		        backgroundColor:'#cccccc',
		        bottom: 10,
		    });
		}
	    var titleLabel = Ti.UI.createLabel({
	        text: (discount[i].title),
	        textAlign: 'left',
	        height: 20,
	        top: 10,
	        left: 10,
	        font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
	    });
	    var descriptionLabel = Ti.UI.createLabel({
	        text: (discount[i].description),
	        textAlign: 'left',
	        left: 10,
	        top: 31,
	        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	    });
	    row.add(titleLabel);
	    row.add(descriptionLabel);
	    data.push(row);
	};
	
	table.addEventListener('click', function(e){
		new WebView (discount[e.index].link);
	});
	

	table.setData(data);
	
	textView.add(linkLabel);
	
	masterView.add(table);
	masterView.add(textView);
	var self = new ApplicationWindow('National Member Benefits', masterView);
	
	return self;
	
}
module.exports = NationalBenefitsWindow;