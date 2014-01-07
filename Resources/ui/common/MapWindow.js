//var GetFeed = require('ui/common/GetFeed');
//var ApplicationWindow = require('ui/common/ApplicationWindow');
var NavigateWindow = require('ui/common/NavigateWindow');
var WebView = require('ui/common/WebView');
var Feed = require('ui/common/Feed');
var LoadingScreen = require('ui/common/LoadingScreen');
var Map = require('ti.map');

function MapWindow(title, tracker) {
	
	var Feeds = new Feed(); 
var url = Feeds.iowaCityFeed();

var self = new NavigateWindow(title);

var table = Ti.UI.createTableView();
var rows = [];	




tracker.trackScreen(title);
var loading = new LoadingScreen();

self.add(loading);
loading.show();
var xhr = Ti.Network.createHTTPClient({
    onload: function() {
    var xml = this.responseXML;
	var items = xml.documentElement.getElementsByTagName("item");
	var item = items.item(0);
	
	var mapWin = Ti.UI.createView({
	    
	    backgroundColor:'#ffffff',
		navBarHidden: true
	});
	
	var businessesInfo = [];
	for (var i = 0; i < items.length; i++) {
			var item = items.item(i);

		businessesInfo.push({
			company:  item.getElementsByTagName('company').item(0).textContent,//getRssText(item, 'company'),
			discount: item.getElementsByTagName('discount').item(0).textContent,//getRssText(item, 'discount'),
			latitude: item.getElementsByTagName('latitude').item(0).textContent,//getRssText(item, 'latitude'),
			longitude: item.getElementsByTagName('longitude').item(0).textContent,//getRssText(item, 'longitude'),
			street: item.getElementsByTagName('street').item(0).textContent,//getRssText(item, 'street')
		});
	}
	var code = Map.isGooglePlayServicesAvailable();
	
	if (code != Map.SUCCESS) {
		alert ("Google Play Services is not installed/updated/available");
	} else {
	var companyInfo = [];
	for (var i = 0; i <= businessesInfo.length - 1; i++) {
		companyInfo.push(
			Map.createAnnotation(
			{
			    latitude:  businessesInfo[i].latitude,
			    longitude: businessesInfo[i].longitude,
			    title: businessesInfo[i].company,
			    subtitle: businessesInfo[i].street,
			    pincolor: Map.ANNOTATION_RED,
			    animate:true
			})
		);
	}
 
	/*
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
	
*/
	var map = Map.createView({
		mapType:Map.NORMAL_TYPE,
		region: {latitude: companyInfo[0].latitude, longitude: companyInfo[0].longitude,
				latitudeDelta:0.01, longitudeDelta:0.01 },
		//animate: true,
		//userLocation:true,
		//regionFit:true,
		height: 200,
	    //annotations: companyInfo,
		top: 0
		});
	mapWin.add(map);
}

	var textView = Ti.UI.createView({
		backgroundColor: 	'#e2e2e2',
		height:				70,
		top:				200,
		
	});
	var introLabel = Ti.UI.createLabel({
			 text: ('UI Alumni Association members have array of benfits available to them. Use your member benefit card at any of these locations.'),
			 color: "#000000",
			 textAlign: 'left',
			 left: 10,
			 width: 300,
			 top: 10,
			font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
			        
		});
	textView.add(introLabel);	
	
	var linkLabel = Ti.UI.createLabel({
			 text: 'Benefits',
			 textAlign: 'left',
			 right: 10,
			 bottom: 10,
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
				index: i,
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
	        color: "#000000",
	        textAlign: 'left',
	        height: 20,
	        top: 10,
	        left: 10,
	        font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
	    });
	    var discountLabel = Ti.UI.createLabel({
	        text: (businessesInfo[i].discount),
	        color: "#000000",
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
	
	//mapWin.add(map);
	mapWin.add(textView);
	mapWin.add(table);
	
   
	
	

	table.addEventListener('click', function(e){
		
		
		var map = Map.createView({
			mapType:Map.NORMAL_TYPE,
			region: {latitude: companyInfo[e.index].latitude, longitude: companyInfo[e.index].longitude,
					latitudeDelta:0.01, longitudeDelta:0.01 },
			animate: true,
			userLocation:true,
			regionFit:true,
			height: 200,
		    annotations: companyInfo,
			top: 0
		});
		
		mapWin.remove(map);
		
		
		
	});
	self.add(mapWin);
	self.remove(loading);
    },
    onerror: function(e) {
    self.remove(loading);
    Ti.API.debug("STATUS: " + this.status);
    Ti.API.debug("TEXT:   " + this.responseText);
    Ti.API.debug("ERROR:  " + e.error);
    alert('There was an error retrieving the remote data. Try again.');
    },
    timeout:5000
});
 
xhr.open("GET", url);
xhr.send();

return self;


}



module.exports = MapWindow;