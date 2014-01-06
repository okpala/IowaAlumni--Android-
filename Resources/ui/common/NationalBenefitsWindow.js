var MapWindow = require('ui/common/MapWindow');
var ApplicationWindow = require('ui/common/ApplicationWindow');
var GetFeed = require('ui/common/GetFeed');
var WebView = require('ui/common/WebView');
var Feed = require('ui/common/Feed');
var LoadingScreen = require('ui/common/LoadingScreen');

function NationalBenefitsWindow(title, tracker){
var Feeds = new Feed(); 
var url = Feeds.nationalDiscountFeed();
var self = new ApplicationWindow("National Member Benefits");
var table = Ti.UI.createTableView();
var rows = [];	
//var screenWidth = Ti.Platform.displayCaps.platformWidth;
tracker.trackScreen(title);
var loading = new LoadingScreen();

self.add(loading);
loading.show();
var xhr = Ti.Network.createHTTPClient({
    onload: function() {
    var textView = Ti.UI.createView({
		backgroundImage:	Ti.Filesystem.resourcesDirectory +'gray-broder.png',
		height:				90,
		width:				316,
		top:				0,
		left:				2,	
	});
	
	var introLabel = Ti.UI.createLabel({
			 text: ('As a UIAA member, you gain access to a variety of exclusive benefits that show our appreciation for your support of the UIAA.'),
			 color: "#000000",
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
			 //left: 250,
			 right: 10,
			 top: 50,
			 color: 'blue',
			font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
			        
		});
		
	linkLabel.addEventListener('click', function(e){
		(new MapWindow("Iowa City Benefits", tracker)).open();
	});
	
    var xml = this.responseXML;
	var items = xml.documentElement.getElementsByTagName("item");
	//var item = items.item(0);
	var discount = [];
	for (var i = 0; i < items.length; i++) {
			var item = items.item(i);

		discount.push({
			title: item.getElementsByTagName('title').item(0).textContent,// getRssText(item, 'title'),
			link:  item.getElementsByTagName('link').item(0).textContent,//getRssText(item, 'link'),
			description: item.getElementsByTagName('description').item(0).textContent,//getRssText(item, 'description')
		});
	}
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
	        color: "#000000",
	        textAlign: 'left',
	        height: 20,
	        top: 10,
	        left: 10,
	        font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
	    });
	    var descriptionLabel = Ti.UI.createLabel({
	        text: (discount[i].description),
	        color: "#000000",
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
	

	
	
	self.add(textView);  
	textView.add(linkLabel);
	table.setData(data);
	self.add(table);

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
module.exports = NationalBenefitsWindow;