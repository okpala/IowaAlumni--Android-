//var GetFeed = require('ui/common/GetFeed');
var FormatDate = require('ui/common/FormatDate');
var Feed = require('ui/common/Feed');

function HomeImageSlider(){
	var Feeds = new Feed();
	var url = Feeds.sliderImagesFeed();

var table = Ti.UI.createTableView();
var rows = [];
var row = Ti.UI.createTableViewRow();
 
var xhr = Ti.Network.createHTTPClient({
    onload: function() {
    // Ti.API.debug(this.responseText);
 	
    var xml = this.responseXML;
	   	var items = xml.documentElement.getElementsByTagName("item");
	   	var item = items.item(0);
	   
	  var data = [];
	   		for (var i = 0; i < items.length; i++) {
	   			if (url == Feeds.sliderImagesFeed()){
				data.push({
					url:  item.getElementsByTagName( 'url').item(0).textContent
				});
				
				}
					
			} 	
	 var container =  Titanium.UI.createView({
			backgroundColor: 'transparent',
				height:			250,
				width: 			screenWidth - 20,
				left: 			10,
				top:			10,
				bottom:			0,
				padding:		0,
				borderRadius:	5
		});
		
		
		row.add(container);
		
		var imagebox = Ti.UI.createImageView({
			image: data[0].url,
			width: 300,
			height: 250,
			hires: true,
			top: 30
		});
		
		
		 
		var counter = 0;
		function imageSlider(n){
			 return data[(n + 1) % data.length].url;
		}
		setInterval(imageCounter,3000);
		
		function imageCounter (){
			imagebox.image = imageSlider(counter++);
			}
		
		var overlay = Ti.UI.createImageView({
			width: 300,
			height: 40,
			hires: true,
			top: 1,
			image: Ti.Filesystem.resourcesDirectory + 'gold.png'
		});
		var shadow = Ti.UI.createImageView({
			width: 300,
			height: 100,
			hires: true,
			bottom: 65,
			image: Ti.Filesystem.resourcesDirectory +'shadow.png'
		});
		
		var date = new Date();
		
		var dateLabel = Ti.UI.createLabel({
			text: (new FormatDate()).getMonthString(date.getMonth()) +' '+date.getDate()+', '+date.getFullYear(),
			top: 8,
			left: 10,
			bottom: 10,
			height: 15,
			textAlign:'left',
			width: 270,
			color:'#5c4e1a',
			shadowColor:'#f0d87f',
	        shadowOpacity:0.5,
	        shadowOffset:{x:0, y:1},
			font:{fontFamily:'HelveticaNeue-CondensedBold',fontSize:12,fontWeight:'bold'}
		});
		//overlay.add(dateLabel);
		
	   
		
		var view = Ti.UI.createView({
			backgroundColor: '#0c0c0c',
			backgroundImage: Ti.Filesystem.resourcesDirectory + 'dark.jpg',
			width: 300,
			height: 75,
			bottom: 0
		});
		var titlelbl = Ti.UI.createLabel({
			text: 'Welcome',
			left: 10,
			
			
			textAlign:'left',
			width: 250,
			color:'#efc006',
			shadowColor:'#000000',
	        shadowOpacity:0.5,
	        shadowOffset:{x:0, y:1},
	        top: 0,
			font:{fontFamily:'HelveticaNeue-Light',fontSize:25,fontWeight:'bold'}
		});
		
		view.add(titlelbl);
		
		
	
		
		var text = Ti.UI.createLabel({
			text: "The Official App of the University of Iowa Alumni Association",
			left: 15,
			top: 22,
			bottom: 10,
			height: 55,
			textAlign:'left',
			width: 280,
			color:'#ffffff',
			shadowColor:'#000000',
	        shadowOpacity:0.5,
	        shadowOffset:{x:0, y:1},
			font:{fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
		});
		
		//imagebox.add(shadow);
		view.add(text);
		//imagebox.add(view);
		
		container.add(imagebox);
		container.add(overlay);
		container.add(shadow);
		container.add(view);
		container.add(dateLabel);	
    },
    onerror: function(e) {
    Ti.API.debug("STATUS: " + this.status);
    Ti.API.debug("TEXT:   " + this.responseText);
    Ti.API.debug("ERROR:  " + e.error);
    alert('There was an error retrieving the remote data. Try again.');
    },
    timeout:5000
});
 
xhr.open("GET", url);
xhr.send();
	/*
	var container =  Titanium.UI.createView({
			backgroundColor: 'transparent',
				height:			250,
				width: 			screenWidth - 20,
				left: 			10,
				top:			10,
				bottom:			0,
				padding:		0,
				borderRadius:	5
		});
		
		var row = Ti.UI.createTableViewRow();
		row.add(container);
		
		
		var imageArray = new GetFeed (Feeds.sliderImagesFeed());
		Ti.API.info("the image array lenght -" + imageArray.length);
		
		var imagebox = Ti.UI.createImageView({
			image: imageArray[0].url,
			width: 300,
			height: 250,
			hires: true,
			top: 30
		});
		
		
		 
		 var counter = 0;
		function imageSlider(n){
			 return imageArray[(n + 1) % imageArray.length].url;
		}
		setInterval(imageCounter,3000);
		
		function imageCounter (){
			imagebox.image = imageSlider(counter++);
			}
		
		var overlay = Ti.UI.createImageView({
			width: 300,
			height: 40,
			hires: true,
			top: 1,
			image: 'gold.png'
		});
		var shadow = Ti.UI.createImageView({
			width: 300,
			height: 100,
			hires: true,
			bottom: 65,
			image: 'shadow.png'
		});
		
		var date = new Date();
		var currentDate = new GetFeed (Feeds.todayDateFeed())[0].date;
		var date = Ti.UI.createLabel({
			text: (new FormatDate()).getMonthString(date.getMonth()) +' '+date.getDate()+', '+date.getFullYear(),
			top: 8,
			left: 10,
			bottom: 10,
			height: 15,
			textAlign:'left',
			width: 270,
			color:'#5c4e1a',
			shadowColor:'#f0d87f',
	        shadowOpacity:0.5,
	        shadowOffset:{x:0, y:1},
			font:{fontFamily:'HelveticaNeue-CondensedBold',fontSize:12,fontWeight:'bold'}
		});
		overlay.add(date);
		
		var view = Ti.UI.createView({
			backgroundColor: '#0c0c0c',
			backgroundImage: 'dark.jpg',
			width: 300,
			height: 75,
			bottom: 0
		});
		var titlelbl = Ti.UI.createLabel({
			text: 'Welcome',
			left: 10,
			
			
			textAlign:'left',
			width: 250,
			color:'#efc006',
			shadowColor:'#000000',
	        shadowOpacity:0.5,
	        shadowOffset:{x:0, y:1},
	        top: 0,
			font:{fontFamily:'HelveticaNeue-Light',fontSize:25,fontWeight:'bold'}
		});
		
		view.add(titlelbl);
		
		
	
		
		var text = Ti.UI.createLabel({
			text: "The Official App of the University of Iowa Alumni Association",
			left: 15,
			top: 22,
			bottom: 10,
			height: 55,
			textAlign:'left',
			width: 280,
			color:'#ffffff',
			shadowColor:'#000000',
	        shadowOpacity:0.5,
	        shadowOffset:{x:0, y:1},
			font:{fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
		});
		//imagebox.add(shadow);
		view.add(text);
		//imagebox.add(view);
		
		container.add(imagebox);
		container.add(overlay);
		container.add(shadow);
		container.add(view);
		*/
		return row;
} 
module.exports = HomeImageSlider;
