var Feed = require('ui/common/Feed');
var ApplicationWindow = require('ui/common/ApplicationWindow');
var FeatureRow = require('ui/common/FeatureRow'),
	 Post = require('ui/common/Post'),
	Row = require('ui/common/Row'),
	SingleRow = require('ui/common/SingleRow'),
	HeaderRow = require('ui/common/HeaderRow'),
	IIBIntroRow = require('ui/common/IIBIntroRow'),
	IAMIntroRow = require('ui/common/IAMIntroRow'),
	PostGroup = require('ui/common/PostGroup'),
	//PostTable = require('ui/common/PostTable'),
	Ad = require('ui/common/Ad'),
	//GetFeed = require('ui/common/GetFeed'),
	//FormatDate = require('ui/common/FormatDate'),
	//RSS = require('services/rss'),
	WebView = require('ui/common/WebView'),
	StaticAd = require('ui/common/StaticAd');
	Feed = require('ui/common/Feed');

function ArticlesWindow(title, feed) {

var Feeds = new Feed(); 
var url = feed;
var self = new ApplicationWindow(title);
var table = Ti.UI.createTableView();
var rows = [];

 
var xhr = Ti.Network.createHTTPClient({
    onload: function() {
    // Ti.API.debug(this.responseText);
    	var xml = this.responseXML;
	   	var items = xml.documentElement.getElementsByTagName("item");
	   	var item = items.item(0);
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
					title: item.getElementsByTagName('title').item(0).textContent,//getRssText(item, 'title'),
					link: item.getElementsByTagName('link').item(0).textContent,//getRssText(item, 'link'),
					description: item.getElementsByTagName('description').item(0).textContent,//getRssText(item, 'description'),
					pubDate: item.getElementsByTagName('pubDate').item(0).textContent,//getRssText(item, 'pubDate'),
					image: image
				});
			}
			if (feed == Feeds.magazineFeed()){
				var items = xml.documentElement.getElementsByTagName("item2");
			   	var item = items.item(0);
			   	var adList = [];
			   	adList.push({                 
		           ad: item.getElementsByTagName( 'ad').item(0).textContent,
		           adUrl: item.getElementsByTagName( 'adUrl').item(0).textContent,
		                  
				});
				var ad = new StaticAd(adList);
				self.add(ad);	
			}
			
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
				//Add Feed's Intro Text
				if (i == 0 && feed == Feeds.iowaInsiderFeed()){
						var row = new IIBIntroRow();
						rows.push(row);
					}
				
				if (i == 0 && feed == Feeds.magazineFeed()){
						var row = new IAMIntroRow();
						rows.push(row);
					}
				/*
				//Add Feed's Ad
				if (Counter != 0 && (Counter % 3) == 0 && adIndex < 3 && feed == Feeds.iowaInsiderFeed()){
					//var row = new Ad(innerAdList[adIndex]);
					//rows.push(row);
					adIndex++;
				}
				*/
				if (Counter != 0 && (Counter % 3) == 0 && adIndex < 3 && feed == Feeds.magazineFeed()){
					var row = new Ad(innerAdList[adIndex]);
					rows.push(row);
					adIndex++;
				}
				if(/*post.imageheight != null && post.imageheight > 150 && post.imageheight < 300 && */featureSet == false ) {
					
					var row = new FeatureRow(post);
					featureSet = true;
					
					row.addEventListener('swipe', function(e){
				 		self.fireEvent('swipeToggle');
					});
					rows.push(row);
				}
				
				else {
					var row =  new Row(post);

					if(groupCount >= 1) {
						group.push(row);
						rows.push(new PostGroup(group));
						group = [];
						groupCount = 0;
						
						featureSet = false;
					}
					else {
						group.push(row);
						groupCount++;
					}
				}
				
				Counter++;
				//tempDate = post.pubDate;
				
				
				
			}
			

			table.setData(rows);	
			
			
   
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
 
self.add(table);
return self;
}

module.exports = ArticlesWindow;