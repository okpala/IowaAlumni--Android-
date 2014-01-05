var Feed = require('ui/common/Feed');
var ApplicationWindow = require('ui/common/ApplicationWindow');
var FeatureRow = require('ui/common/FeatureRow'),
	 Post = require('ui/common/Post'),
	//Row = require('ui/common/Row'),
	SingleRow = require('ui/common/SingleRow'),
	HeaderRow = require('ui/common/HeaderRow'),
	//IIBIntroRow = require('ui/common/IIBIntroRow'),
	//IAMIntroRow = require('ui/common/IAMIntroRow'),
	//PostGroup = require('ui/common/PostGroup'),
	//PostTable = require('ui/common/PostTable'),
	Ad = require('ui/common/Ad'),
	//GetFeed = require('ui/common/GetFeed'),
	//FormatDate = require('ui/common/FormatDate'),
	//RSS = require('services/rss'),
	WebView = require('ui/common/WebView'),
	StaticAd = require('ui/common/StaticAd'),
	LoadingScreen = require('ui/common/LoadingScreen'),
	Feed = require('ui/common/Feed');


function EventsWindow(title, tracker) {

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
		var ad = new StaticAd(adList);
		
		
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
						var header = new HeaderRow(post);
						
						if (headerCounter != 0 && (headerCounter % 3) == 0 && adIndex < 3 ){
							var row = new Ad(innerAdList[adIndex]);
							rows.push(row);
							adIndex++;
							if (adIndex == 3){
								adIndex = 0;
							} 
						}
						rows.push(header);
						headerCounter++;
						
				}
				var row = new SingleRow(post);
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
 

return self;
}

module.exports = EventsWindow;