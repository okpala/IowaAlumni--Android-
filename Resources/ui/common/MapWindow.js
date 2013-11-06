var GetFeed = require('ui/common/GetFeed');
var ApplicationWindow = require('ui/common/ApplicationWindow');
var NavigateWindow = require('ui/common/NavigateWindow');
var WebView = require('ui/common/WebView');
var Feed = require('ui/common/Feed');
function MapWindow() {
	var Feeds = new Feed();
	var mapWin = Ti.UI.createView({
	    
	    backgroundColor:'#ffffff',
		navBarHidden: true
	});


	
	
	var businessesInfo =  new GetFeed (Feeds.iowaCityFeed());
	
	var companyInfo = [];
	for (var i = 0; i <= businessesInfo.length - 1; i++) {
		companyInfo.push(
			Titanium.Map.createAnnotation(
			{
			    latitude:  businessesInfo[i].latitude,
			    longitude: businessesInfo[i].longitude,
			    title: businessesInfo[i].company,
			    subtitle: businessesInfo[i].street,
			    pincolor: Titanium.Map.ANNOTATION_RED,
			    animate:true
			})
		);
	}
 
	
	var map = Ti.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		region: {latitude: companyInfo[0].latitude, longitude: companyInfo[0].longitude,
				latitudeDelta:0.01, longitudeDelta:0.01 },
		animate: true,
		regionFit: true,
		userLocation:true,
		height: 200,
	    annotations: companyInfo,
		top: 0
	});
	
	
	
	map.addEventListener('loading', function(e){
		map.setLocation({latitude: companyInfo[0].latitude , longitude: companyInfo[0].longitude,
				latitudeDelta: 0.01, longitudeDelta: 0.01 });	
	});
	map.addEventListener('postlayout', function(e){
		map.setLocation({latitude: companyInfo[0].latitude , longitude: companyInfo[0].longitude,
				latitudeDelta: 0.01, longitudeDelta: 0.01 });	
	});
	

	
	var textView = Ti.UI.createView({
		backgroundColor: 	'#e2e2e2',
		height:				70,
		top:				200,
		
	});
	var introLabel = Ti.UI.createLabel({
			 text: ('UI Alumni Association members have').concat('\nan array of available to them. Use your member benefit card at any of these locations.'),
			 textAlign: 'left',
			 left: 10,
			 width: 300,
			 top: 10,
			font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
			        
		});
	textView.add(introLabel);	
	
	var linkLabel = Ti.UI.createLabel({
			 text: 'benefits',
			 textAlign: 'left',
			 left: 236.5,
			 top: 10,
			 color: 'blue',
			font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
			        
		});
		
	linkLabel.addEventListener('click', function(e){
		new WebView ('http://iowalum.com/membership/benefits.cfm');
	});
	textView.add(linkLabel);	

	var table = Ti.UI.createTableView({
		height: 'auto',
		top: 270
	});

	
	var data = [];
	for (var i = 0; i <= businessesInfo.length - 1; i++) {
		if (i % 2 == 0){
		    var row = Ti.UI.createTableViewRow({
		    	company: businessesInfo[i].company,
		    	latitude:  businessesInfo[i].latitude,
				longitude: businessesInfo[i].longitude,
		        height: 'auto',
		        bottom: 10,
		    });
		}
		else{
			var row = Ti.UI.createTableViewRow({
		    	company: businessesInfo[i].company,
		    	latitude:  businessesInfo[i].latitude,
				longitude: businessesInfo[i].longitude,
		        height: 'auto',
		        backgroundColor:'#cccccc',
		        bottom: 10,
		    });
		}
	    var companyLabel = Ti.UI.createLabel({
	        text: (businessesInfo[i].company),
	        textAlign: 'left',
	        height: 20,
	        top: 10,
	        left: 10,
	        font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
	    });
	    var discountLabel = Ti.UI.createLabel({
	        text: (businessesInfo[i].discount),
	        textAlign: 'left',
	        left: 10,
	        top: 31,
	        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	    });
	    row.add(companyLabel);
	    row.add(discountLabel);
	    data.push(row);
	};

	table.setData(data);
	
	mapWin.add(map);
	mapWin.add(textView);
	mapWin.add(table);
	
   
	
	

	table.addEventListener('click', function(e){
		
		
		map = Ti.Map.createView({
			mapType: Titanium.Map.STANDARD_TYPE,
			region: {latitude: e.row.latitude, longitude: e.row.longitude,
				latitudeDelta:0.01, longitudeDelta:0.01 },
			animate: true,
			regionFit: true,
			userLocation: true,
			height: 200,
		    annotations: companyInfo,
			top: 0
		});
		
		mapWin.add(map);
		
		map.selectAnnotation(companyInfo[e.index]);
	});
	
	
        
	var self = new NavigateWindow("Iowa City Benefits", mapWin);
    
return self;


}



module.exports = MapWindow;