var Feed = require('ui/common/Feed');
var ApplicationWindow = require('ui/common/ApplicationWindow');
var FeatureRow = require('ui/common/FeatureRow'),
	 Post = require('ui/common/Post'),
	SingleRow = require('ui/common/SingleRow'),
	HeaderRow = require('ui/common/HeaderRow'),
	Ad = require('ui/common/Ad'),
	WebView = require('ui/common/WebView'),
	StaticAd = require('ui/common/StaticAd'),
	LoadingScreen = require('ui/common/LoadingScreen'),
	Feed = require('ui/common/Feed');


function EventsWindow(title, tracker) {
var self = new ApplicationWindow(title);
/**
 * We're going to create an infinite loading table view. Whenever you get close to the bottom, we'll load more rows.
 */

var isAndroid = Ti.Platform.osname === 'android';
var Feeds = new Feed(); 
var url = Feeds.eventsFeed();
/**
 * Create our UI elements.
 */
var table = Ti.UI.createTableView({ top: 0, right: 0, bottom: 70, left: 0 });
var rows = [];
self.add(table);
var firstpass = true;
/**
 * Handle where we are in our data, and define how to load more data.
 */
tracker.trackScreen(title);
var loading = new LoadingScreen();

self.add(loading);
loading.show();
var lastRow = 0, loadData = true;
var Counter = 0;
var headerCounter = 0;
var adIndex = 0;
var tempDate = "";
var data = [];
innerAdList = [];
setTimeout(function checkSync() {
    // has someone asked us to load data?
    
    if (loadData == false) {
        // no, return and we'll check again later
        setTimeout(checkSync, 200);
        return;
    }
    Ti.API.warn('LOAD DATA TRIGGERED!');
    var xhr = Ti.Network.createHTTPClient({
	    onload: function() {
	    	var xml = this.responseXML;
	   		
	    	// simulate an asynchronous HTTP request loading data after 500 ms
		    setTimeout(function() {
		    	if (firstpass == true){
		    		firstpass = false;
		    		var items = xml.documentElement.getElementsByTagName("item2");
				   	var item = items.item(0);
				   	var adList = [];
				   	adList.push({                 
			           ad: item.getElementsByTagName( 'ad').item(0).textContent,
			           adUrl: item.getElementsByTagName( 'adUrl').item(0).textContent,
			                  
					});
					var items = xml.documentElement.getElementsByTagName("item2");
					var ad = new StaticAd(adList, tracker, title);
					
					//In database the Events' Ads are from index 0 to 2
					var items = xml.documentElement.getElementsByTagName("item3");
					for (var i = 0; i < 3; i++) {
				   		var item = items.item(i);
					   	innerAdList.push({                 
				           ad: item.getElementsByTagName( 'ad').item(0).textContent,
				           adUrl: item.getElementsByTagName( 'adUrl').item(0).textContent,      
						});
					}
					
					self.add(ad);
		    		loading.hide();
		    	}
		    	
		        // we got our data; push some new rows
		        var items = xml.documentElement.getElementsByTagName("item");
		        if ( lastRow + 10 < items.length){
		        	
			        for (var i = lastRow, c = lastRow + 10; i < c; i++) {
			        	var item = items.item(i);
			   			var image;
						try {
						var image = item.getElementsByTagNameNS('http://mashable.com/', 'thumbnail').item(0).getElementsByTagName('img').item(0).getAttribute('src');
						} catch (e) {
							image = '';
						}
			   			data.push({
							snl: item.getElementsByTagName('snl').item(0).textContent,	
							place: item.getElementsByTagName('place').item(0).textContent,
							title: item.getElementsByTagName('title').item(0).textContent,
							link: item.getElementsByTagName('link').item(0).textContent,
							description: item.getElementsByTagName('description').item(0).textContent,
							pubDate: item.getElementsByTagName('pubDate').item(0).textContent,
							hlink: item.getElementsByTagName('hlink').item(0).textContent,
							category:item.getElementsByTagName('category').item(0).textContent,
							image: image
						});
						Ti.API.info(data[i].title);
						Ti.API.info(data[i].title);
						var post = new Post(data[i]);
				
						if ((Counter == 0) ||(tempDate != post.pubDate && Counter != 0)){
								var header = new HeaderRow(post, tracker, title);
								
								if (headerCounter != 0 && (headerCounter % 3) == 0 && adIndex < 3 ){
									var row = new Ad(innerAdList[adIndex], tracker, title);
									rows.push(row);
									adIndex++;
									if (adIndex == 3){
										adIndex = 0;
									} 
								}
								
								rows.push(header);
								headerCounter++;
								
						}
						var row = new SingleRow(post, tracker, title);
						rows.push(row);
						
						Counter++;
						tempDate = post.pubDate;
			            //rows.push({ title: 'Row ' + i });
			        }
		        }
		        lastRow = c;
		        // and push this into our table.
		        table.setData(rows);
		        // now we're done; reset the loadData flag and start the interval up again
		        loadData = false;
		        setTimeout(checkSync, 200);
		        Ti.API.warn('DATA LOADED!');
		    }, 500);
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
}, 200);
 
table.addEventListener('scroll', function(evt) {
    // If we're on android: our total number of rows is less than the first visible row plus the total number of visible
    // rows plus 3 buffer rows, we need to load more rows!
    // ---OR---
    // If we're on ios: how far we're scrolled down + the size of our visible area + 100 pixels of buffer space
    // is greater than the total height of our table, we need to load more rows!
    if (isAndroid && (evt.totalItemCount < evt.firstVisibleItem + evt.visibleItemCount + 3)
            || (!isAndroid && (evt.contentOffset.y + evt.size.height + 100 > evt.contentSize.height))) {
        // tell our interval (above) to load more rows
        loadData = true;
    }
 
});
/*
var Feeds = new Feed(); 
var url = Feeds.eventsFeed();
var self = new ApplicationWindow(title);
var table = Ti.UI.createTableView({
	separatorColor :'#e2e2e2',
	bottom:70
});
var rows = [];

tracker.trackScreen(title);
var loading = new LoadingScreen();

self.add(loading);
loading.show();
var xhr = Ti.Network.createHTTPClient({
    onload: function() {
    // Ti.API.debug(this.responseText);
    	
    	var xml = this.responseXML;
	   	var items = xml.documentElement.getElementsByTagName("item");
	   	//var item = items.item(0);
	   	var data = [];
	   		for (var i = 0; i < items.length; i++) {
	   			var item = items.item(i);
	   			var image;
				try {
				var image = item.getElementsByTagNameNS('http://mashable.com/', 'thumbnail').item(0).getElementsByTagName('img').item(0).getAttribute('src');
				} catch (e) {
					image = '';
				}
	   			data.push({
					snl: item.getElementsByTagName('snl').item(0).textContent,//getRssText(item, 'snl'),
					place: item.getElementsByTagName('place').item(0).textContent,//getRssText(item, 'place'),
					title: item.getElementsByTagName('title').item(0).textContent,//getRssText(item, 'title'),
					link: item.getElementsByTagName('link').item(0).textContent,//getRssText(item, 'link'),
					description: item.getElementsByTagName('description').item(0).textContent,//getRssText(item, 'description'),
					pubDate: item.getElementsByTagName('pubDate').item(0).textContent,//getRssText(item, 'pubDate'),
					hlink: item.getElementsByTagName('hlink').item(0).textContent,//getRssText(item, 'hlink'),
					category:item.getElementsByTagName('category').item(0).textContent,//getRssText(item, 'category'),
					image: image
				});
			}
			
		var items = xml.documentElement.getElementsByTagName("item2");
	   	var item = items.item(0);
	   	var adList = [];
	   	adList.push({                 
           ad: item.getElementsByTagName( 'ad').item(0).textContent,
           adUrl: item.getElementsByTagName( 'adUrl').item(0).textContent,
                  
		});
		var ad = new StaticAd(adList, tracker, title);
		
		
		var items = xml.documentElement.getElementsByTagName("item3");
	   	var innerAdList = [];
	   	for (var i = 0; i < items.length; i++) {
	   		var item = items.item(i);
		   	innerAdList.push({                 
	           ad: item.getElementsByTagName( 'ad').item(0).textContent,
	           adUrl: item.getElementsByTagName( 'adUrl').item(0).textContent,
	                  
			});
		}
			
			var rows = [];
			var group = [];
			var featureSet = false;
			var groupCount = 0;
			var Counter = 0;
			var headerCounter = 0;
			var adIndex = 0;
			//var ads = new GetFeed(Feeds.adFeed() );
			var tempDate = "";
			for (var i = 0; i < data.length; i++) {
				var post = new Post(data[i]);
				
				if ((Counter == 0) ||(tempDate != post.pubDate && Counter != 0)){
						var header = new HeaderRow(post, tracker, title);
						
						if (headerCounter != 0 && (headerCounter % 3) == 0 && adIndex < 3 ){
							var row = new Ad(innerAdList[adIndex], tracker, title);
							rows.push(row);
							adIndex++;
							if (adIndex == 3){
								adIndex = 0;
							} 
						}
						rows.push(header);
						headerCounter++;
						
				}
				var row = new SingleRow(post, tracker, title);
				rows.push(row);
				
				Counter++;
				tempDate = post.pubDate;
				
			}
			

			table.setData(rows);
			self.add(ad);	
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
 
*/
return self;
}

module.exports = EventsWindow;