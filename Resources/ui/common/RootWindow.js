//var GetFeed = require('ui/common/GetFeed');
var ApplicationWindow = require('ui/common/ApplicationWindow');
var SingleRow = require('ui/common/SingleRow');
var PostTable = require('ui/common/PostTable');
var HomeImageSlider = require('ui/common/HomeImageSlider');
var SinglePost = require('ui/common/SinglePost');
var HomeSMSection = require('ui/common/HomeSMSection');
//var Row = require('ui/common/Row');
var FormatDate = require('ui/common/FormatDate');
var StaticAd = require('ui/common/StaticAd');
//var WebView = require('ui/common/WebView');
var Feed = require('ui/common/Feed');
var TodayEventsSection = require('ui/common/TodayEventsSection');
var ArticleOfTheWeekSection = require('ui/common/ArticleOfTheWeekSection');
Ti.include(Ti.Filesystem.resourcesDirectory + "ui/common//date.js");



var LoadingScreen = require('ui/common/LoadingScreen');


/*
 * Home Window
 */
function RootWindow(title, tracker) {
	var self = new ApplicationWindow("Home");
	

/*
var scrollView = Ti.UI.createScrollView({
	zIndex:2,
	showVerticalScrollIndicator:false,
	bottom: 70
});

var tableView = Ti.UI.createTableView({
	width:Ti.Platform.displayCaps.platformWidth,
	height:(51*20),
	backgroundColor:'#e2e2e2',
	zIndex:1
});
scrollView.add(tableView);
 
// update the offset value whenever scroll event occurs
var offset = 0;
scrollView.addEventListener('scroll', function(e) {
	if (e.y!=null) {
		offset = e.y;
		Ti.API.debug('offset: '+offset);
	}
});
 
// set the initial position of the scrollView's content
var init = setInterval(function(e){
	Ti.API.info('check if '+offset+' = 50');
	if (offset==50) {
		Ti.API.debug('we have just done what the scrollView\'s contentOffset should be doing');
		clearInterval(init);
	}
	scrollView.scrollTo(0,50);
},100);
 
// Pull-to-Refresh Listeners
var bottomOfScreenOffset = ((51*20)-Ti.Platform.displayCaps.platformHeight);
var lastRowOffset = bottomOfScreenOffset-50;
Ti.API.debug("lastRowOffset: "+lastRowOffset+"\n bottomOfScreenOffset: "+bottomOfScreenOffset);
scrollView.addEventListener('touchend', function() {
	if (offset==0) {
		Ti.API.info('REFRESH !!!!');
		//alertDialog.message = "REFRESH !!!!";
		//alertDialog.show();
		
		scrollView.scrollTo(0,50);
		//self.remove(scrollView);
		refreshRssTable();
		
	} else if (offset<50) {
		scrollView.scrollTo(0,50);
		Ti.API.info('Dont refresh, go back to base');
	} else if (offset==bottomOfScreenOffset) {
		Ti.API.info('LOAD MORE !!!!');
	
		//scrollView.scrollTo(0,lastRowOffset);
	} else if (offset>lastRowOffset) {
		//scrollView.scrollTo(0,lastRowOffset);
		Ti.API.info('Dont load more, go back to base');
	}
});
 

	


*/	

	
	
	var tableView = Ti.UI.createTableView({
		backgroundColor:'#e2e2e2',
		zIndex:1,
		bottom: 70
	});
	
	tableView.separatorColor = '#e2e2e2';
	var Feeds = new Feed(); 
	var url = Feeds.homeFeed();
	
	
	tracker.trackScreen(title);
	var loading = new LoadingScreen();
	
	
	
	
	var refreshLabel = Ti.UI.createLabel({
			text:"Press here to refresh...",
			height:"auto",
			color:"#576c89",
			textAlign:"center",
			top: 0,
			font:{fontSize:13,fontWeight:"bold"},
			shadowColor:"#fff",
			shadowOffset:{x:0,y:1}
		});
		
	var lastUpdatedLabel = Ti.UI.createLabel({
		text:"Last Updated: "+ (new FormatDate()).getDate(),
		top:15,
		height:"auto",
		color:"#576c89",
		textAlign:"center",
		font:{fontSize:12},
		shadowColor:"#fff",
		shadowOffset:{x:0,y:1}
	});
		
 
	var transparentView = Titanium.UI.createView({ 
		backgroundColor: 'rgba(204,204,204,0.7)',
		height: Ti.Platform.displayCaps.platformHeight - 60,
		width: Ti.Platform.displayCaps.platformWidth,
		top: 0,
		zIndex:2,
		});	
	


	function refreshRssTable() {
		var rows = [];
		var row = Ti.UI.createTableViewRow({height:30});
		row.add(lastUpdatedLabel);
		
		row.add(refreshLabel);
		row.addEventListener('click', function() {
			//self.remove(tableView);
			refreshRssTable();
		});
		rows.push(row);
		
		transparentView.add(loading);
		loading.show();
		self.add(transparentView);
	var xhr = Ti.Network.createHTTPClient({
    onload: function() {
    // Ti.API.debug(this.responseText);
    
    
		
    var row = new HomeImageSlider();
	rows.push(row);
 	var introLabel = Ti.UI.createLabel({
			text: "No matter how many years or miles may separate you from the campus, the UI Alumni Association can help you feel part of the life of the University of Iowa.",
			width: screenWidth - 20,
			color: "#000000",
			top: 10,
			left: 10,
			font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
		});
		
		var row = Ti.UI.createTableViewRow();
		
		row.add(introLabel);
		rows.push(row);
		
    	var xml = this.responseXML;
	   	var items = xml.documentElement.getElementsByTagName("item");
	   	//var item = items.item(0);
	   	var data = [];
	   		for (var i = 0; i < items.length; i++) {
	   			var item = items.item(i);
	   			data.push({
					title:  item.getElementsByTagName('title').item(0).textContent,//getRssText(item, 'title'),
					header:  item.getElementsByTagName('header').item(0).textContent,//getRssText(item, 'header'),
					url:  item.getElementsByTagName('link').item(0).textContent,//getRssText(item, 'link'),
					image: item.getElementsByTagName('image').item(0).textContent,//getRssText(item, 'image'),
					description: item.getElementsByTagName('description').item(0).textContent,//getRssText(item, 'description'),
					pubDate: item.getElementsByTagName('pubDate').item(0).textContent,//getRssText(item, 'pubDate')
					
					});
			}
		
		var items = xml.documentElement.getElementsByTagName("item3");
	   	var item = items.item(0);
	   	var adList = [];
	   	adList.push({                 
           ad: item.getElementsByTagName( 'ad').item(0).textContent,
           adUrl: item.getElementsByTagName( 'adUrl').item(0).textContent,
                  
		});
		var ad = new StaticAd(adList, tracker, title);
		
		
		
		var items = xml.documentElement.getElementsByTagName("item2");
	   	var item = items.item(0);
	   
	  	var  article = [];
	   		
		article.push({                 
            title: item.getElementsByTagName( 'title').item(0).textContent,
            image: item.getElementsByTagName( 'image').item(0).textContent,
            url: item.getElementsByTagName( 'link').item(0).textContent,
            description: item.getElementsByTagName( 'description').item(0).textContent,
            pubDate: item.getElementsByTagName( 'pubDate').item(0).textContent
		});
				
		
		var items = xml.documentElement.getElementsByTagName("item4");
	   	var item = items.item(0);
	   
		var events = [];
		for (var i = 0; i < items.length; i++) {
			var item = items.item(i);
			events.push({
				snl: item.getElementsByTagName( 'snl').item(0).textContent,
			    place: item.getElementsByTagName( 'place').item(0).textContent,
			    title: item.getElementsByTagName( 'title').item(0).textContent,
			    url: item.getElementsByTagName( 'link').item(0).textContent,
			    description: item.getElementsByTagName( 'description').item(0).textContent,
			    pubDate: item.getElementsByTagName( 'pubDate').item(0).textContent
			});
		}
		
		
				
		if (data.length > 0){
		for (var i = 0; i < data.length; i++){
			var headerLabel = Ti.UI.createLabel({
				text: data[i].header,
				color: "#000000",
				width: 300,
				top: 10,
				left: 10,
				font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
			});
			
			var row = Ti.UI.createTableViewRow();
			
			row.add(headerLabel);
			rows.push(row);
			
			var row = new SinglePost(data[i], tracker, title);
			rows.push(row); 
			}
		}
		
		if(events.length > 0){
			var eventHeaderLabel = Ti.UI.createLabel({
				text: "Today's Events",
				color: "#000000",
				width: 300,
				top: 10,
				left: 10,
				font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
			});
			
			var row = Ti.UI.createTableViewRow();
			row.add(eventHeaderLabel);
			
			rows.push(row);
			
			
			for (var i = 0; i < events.length; i++) {
				var row = new SingleRow (events[i], tracker, title);
				
				rows.push(row);
			}
		} 	
		
 	var events = new TodayEventsSection();
 	for (var i = 0; i < events.length; i++){
 		rows.push(events[i]);
 	}
 	
 	var magazineHeaderLabel = Ti.UI.createLabel({
			text: "Article of the Week",
			color: "#000000",
			width: 300,
			top: 10,
			left: 10,
			font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
		});
		
		var row = Ti.UI.createTableViewRow();
		row.add(magazineHeaderLabel);
		
		rows.push(row);
		
		var articlePost =  new SinglePost(article[0], tracker, title);
		rows.push(articlePost);
		
		
		//rows.push(row);
		
		var row = new HomeSMSection(tracker);
		
		rows.push(row);
		
   	tableView.setData(rows);
   	self.add(tableView);
    self.add(ad);
    self.remove(loading);
    self.remove(transparentView);
    },
    onerror: function(e) {
    self.remove(loading);
    self.remove(transparentView);
    Ti.API.debug("STATUS: " + this.status);
    Ti.API.debug("TEXT:   " + this.responseText);
    Ti.API.debug("ERROR:  " + e.error);
    alert('There was an error retrieving the remote data. Try again.');
    },
    timeout:5000
});
 
xhr.open("GET", url);
xhr.send();
		
		
	}
	
	
	refreshRssTable();




	

/*
	var Feeds = new Feed(); 
	var url = Feeds.homeFeed();
	//var self = new ApplicationWindow("Home");
	var table = Ti.UI.createTableView({
		separatorColor :'#e2e2e2',
		//selectionStyle: 'none',
		bottom: 70
		});
	var rows = [];
	tracker.trackScreen(title);
	var loading = new LoadingScreen();
	
	self.add(loading);
	loading.show();
var xhr = Ti.Network.createHTTPClient({
    onload: function() {
    // Ti.API.debug(this.responseText);
    
    
    var row = new HomeImageSlider();
	rows.push(row);
 	var introLabel = Ti.UI.createLabel({
			text: "No matter how many years or miles may separate you from the campus, the UI Alumni Association can help you feel part of the life of the University of Iowa.",
			width: screenWidth - 20,
			color: "#000000",
			top: 10,
			left: 10,
			font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
		});
		
		var row = Ti.UI.createTableViewRow();
		
		row.add(introLabel);
		rows.push(row);
		
    	var xml = this.responseXML;
	   	var items = xml.documentElement.getElementsByTagName("item");
	   	//var item = items.item(0);
	   	var data = [];
	   		for (var i = 0; i < items.length; i++) {
	   			var item = items.item(i);
	   			data.push({
					title:  item.getElementsByTagName('title').item(0).textContent,//getRssText(item, 'title'),
					header:  item.getElementsByTagName('header').item(0).textContent,//getRssText(item, 'header'),
					url:  item.getElementsByTagName('link').item(0).textContent,//getRssText(item, 'link'),
					image: item.getElementsByTagName('image').item(0).textContent,//getRssText(item, 'image'),
					description: item.getElementsByTagName('description').item(0).textContent,//getRssText(item, 'description'),
					pubDate: item.getElementsByTagName('pubDate').item(0).textContent,//getRssText(item, 'pubDate')
					
					});
			}
		
		var items = xml.documentElement.getElementsByTagName("item3");
	   	var item = items.item(0);
	   	var adList = [];
	   	adList.push({                 
           ad: item.getElementsByTagName( 'ad').item(0).textContent,
           adUrl: item.getElementsByTagName( 'adUrl').item(0).textContent,
                  
		});
		var ad = new StaticAd(adList, tracker, title);
		
		
		
		var items = xml.documentElement.getElementsByTagName("item2");
	   	var item = items.item(0);
	   
	  	var  article = [];
	   		
		article.push({                 
            title: item.getElementsByTagName( 'title').item(0).textContent,
            image: item.getElementsByTagName( 'image').item(0).textContent,
            url: item.getElementsByTagName( 'link').item(0).textContent,
            description: item.getElementsByTagName( 'description').item(0).textContent,
            pubDate: item.getElementsByTagName( 'pubDate').item(0).textContent
		});
				
		
		var items = xml.documentElement.getElementsByTagName("item4");
	   	var item = items.item(0);
	   
		var events = [];
		for (var i = 0; i < items.length; i++) {
			var item = items.item(i);
			events.push({
				snl: item.getElementsByTagName( 'snl').item(0).textContent,
			    place: item.getElementsByTagName( 'place').item(0).textContent,
			    title: item.getElementsByTagName( 'title').item(0).textContent,
			    url: item.getElementsByTagName( 'link').item(0).textContent,
			    description: item.getElementsByTagName( 'description').item(0).textContent,
			    pubDate: item.getElementsByTagName( 'pubDate').item(0).textContent
			});
		}
		
		
				
		if (data.length > 0){
		for (var i = 0; i < data.length; i++){
			var headerLabel = Ti.UI.createLabel({
				text: data[i].header,
				color: "#000000",
				width: 300,
				top: 10,
				left: 10,
				font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
			});
			
			var row = Ti.UI.createTableViewRow();
			
			row.add(headerLabel);
			rows.push(row);
			
			var row = new SinglePost(data[i], tracker, title);
			rows.push(row); 
			}
		}
		
		if(events.length > 0){
			var eventHeaderLabel = Ti.UI.createLabel({
				text: "Today's Events",
				color: "#000000",
				width: 300,
				top: 10,
				left: 10,
				font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
			});
			
			var row = Ti.UI.createTableViewRow();
			row.add(eventHeaderLabel);
			
			rows.push(row);
			
			
			for (var i = 0; i < events.length; i++) {
				var row = new SingleRow (events[i], tracker, title);
				
				rows.push(row);
			}
		} 	
		
 	var events = new TodayEventsSection();
 	for (var i = 0; i < events.length; i++){
 		rows.push(events[i]);
 	}
 	
 	var magazineHeaderLabel = Ti.UI.createLabel({
			text: "Article of the Week",
			color: "#000000",
			width: 300,
			top: 10,
			left: 10,
			font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
		});
		
		var row = Ti.UI.createTableViewRow();
		row.add(magazineHeaderLabel);
		
		rows.push(row);
		
		var articlePost =  new SinglePost(article[0], tracker, title);
		rows.push(articlePost);
		
		
		//rows.push(row);
		
		var row = new HomeSMSection(tracker);
		
		rows.push(row);
		
    table.setData(rows);
    self.add(ad);
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
 
self.add(table);
*/
return self;
	
}




module.exports = RootWindow;