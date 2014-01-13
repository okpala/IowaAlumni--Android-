var Feed = require('ui/common/Feed');
var ApplicationWindow = require('ui/common/ApplicationWindow');
var FeatureRow = require('ui/common/FeatureRow');
var	Post = require('ui/common/Post');
var	Row = require('ui/common/Row');
var	HeaderRow = require('ui/common/HeaderRow');
var	IIBIntroRow = require('ui/common/IIBIntroRow');
var	IAMIntroRow = require('ui/common/IAMIntroRow');
var	PostGroup = require('ui/common/PostGroup');
var	Ad = require('ui/common/Ad');
var	WebView = require('ui/common/WebView');
var	RefreshSection = require('ui/common/RefreshSection');
var	StaticAd = require('ui/common/StaticAd');
var LoadingScreen = require('ui/common/LoadingScreen');
var ErrorWindow = require('ui/common/ErrorWindow');

function ArticlesWindow(title, feed, tracker) {
	
	var Feeds = new Feed(); 
	var url = feed;
	var self = new ApplicationWindow(title);
	var table = Ti.UI.createTableView({
		backgroundColor:'#e2e2e2',
		separatorColor: '#e2e2e2',
	});
	var transparentView = Titanium.UI.createView({ 
		backgroundColor: '#ccc',
		opacity:0.9,
		height: Ti.Platform.displayCaps.platformHeight - 60,
		width: Ti.Platform.displayCaps.platformWidth,
		top: 0,
		zIndex:5,
	});	
	var refresh = new RefreshSection();
	refresh.addEventListener('click', function() {
		refreshRssTable();
		tracker.trackEvent({
			category: "Refreshing  Window",
			action: "refresh",
			label: "Refreshing " + title + "'s Window",
			value: 1
		});
			
	});
	
	tracker.trackScreen(title);
	var loading = new LoadingScreen();
	function refreshRssTable() {
		var rows = [];
		var group = [];
		var featureSet = false;
		var groupCount = 0;
		var Counter = 0;
		var adIndex = 0;
		rows.push(refresh);	
		transparentView.add(loading);
		loading.show();
		self.add(transparentView);
		var xhr = Ti.Network.createHTTPClient({
		    onload: function() {
		    	
		    	
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
						title: item.getElementsByTagName('title').item(0).textContent,
						link: item.getElementsByTagName('link').item(0).textContent,
						description: item.getElementsByTagName('description').item(0).textContent,
						pubDate: item.getElementsByTagName('pubDate').item(0).textContent,
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
					
					var ad = new StaticAd(adList, tracker, title);
					table.bottom = 70;
							
						
					var items = xml.documentElement.getElementsByTagName("item3");
					var innerAdList = [];
					for (var i = 0; i < items.length; i++) {
					   	var item = items.item(i);
						innerAdList.push({                 
					    	ad: item.getElementsByTagName( 'ad').item(0).textContent,
					        adUrl: item.getElementsByTagName( 'adUrl').item(0).textContent,
					                  
						});
					}
				}
					
					
					
					
					
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
						
					if (Counter != 0 && (Counter % 3) == 0 && adIndex < 3 && feed == Feeds.magazineFeed()){
						var row = new Ad(innerAdList[adIndex], tracker, title);
						rows.push(row);
						adIndex++;
					}
						
					if(featureSet == false ) {
						var row = new FeatureRow(post, tracker, title);
						featureSet = true;
						rows.push(row);
					}
						
					else {
						var row =  new Row(post, tracker, title);
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
							
				}
					
				transparentView.remove(loading);
			    self.remove(transparentView);
				table.setData(rows);
				self.add(table);
				if (feed == Feeds.magazineFeed()){ 
					self.add(ad);
				}

		    },
		    onerror: function(e) {
			    transparentView.remove(loading);
			    self.remove(transparentView);
			    Ti.API.debug("STATUS: " + this.status);
			    Ti.API.debug("TEXT:   " + this.responseText);
			    Ti.API.debug("ERROR:  " + e.error);
			    var errorView = new ErrorWindow(refreshRssTable, title, tracker);
			    self.add(errorView);
		    },
		    timeout:5000
		});
		 
		xhr.open("GET", url);
		xhr.send();	
	}
	
	refreshRssTable();
	
	return self;
}
/*post.imageheight != null && post.imageheight > 150 && post.imageheight < 300 && */
module.exports = ArticlesWindow;