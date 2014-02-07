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
	var isAndroid = Ti.Platform.osname === 'android';
	var Feeds = new Feed(); 
	var url = feed;
	var itemsLoad = 4;
	var self = new ApplicationWindow(title);
	var table = Ti.UI.createTableView({
		backgroundColor:'#e2e2e2',
		separatorColor: '#e2e2e2',
	});
	var transparentView = Titanium.UI.createView({ 
		backgroundColor: '#ccc',
		opacity:0.9,
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
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
		self.add(table);
		var group = [];
		var featureSet = false;
		var groupCount = 0;
		var Counter = 0;
		var adIndex = 0;
		rows.push(refresh);
		var data = [];
		var firstpass = true;	var lastRow = 0, loadData = true;
		transparentView.add(loading);
		loading.show();
		self.add(transparentView);
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
				    	//var xml = this.responseXML;
				    	if (firstpass == true){
				    		
				    		
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
								self.add(ad);/*	
							*/
							}
							
				    		
			    			
				    	}
				    	
				        // we got our data; push some new rows
				       
				        var items = xml.documentElement.getElementsByTagName("item");
				        if ( lastRow + itemsLoad < items.length){
				        	
					        for (var i = lastRow, c = lastRow + itemsLoad; i < c; i++) {
					        	var item = items.item(i);
					      		//Ti.API.info(item.getElementsByTagName('title'));
					      		//Ti.API.info(item.getElementsByTagName('title').item(0));
					      		//Ti.API.info(item.getElementsByTagName('title').item(0).textContent);
						   		data.push({
									title: item.getElementsByTagName('title').item(0).textContent,
									link: item.getElementsByTagName('link').item(0).textContent,
									description: item.getElementsByTagName('description').item(0).textContent,
									pubDate: item.getElementsByTagName('pubDate').item(0).textContent
									
								});
								
								var post = new Post(data[i]);
								
								if (i == 0 && feed == Feeds.iowaInsiderFeed()){
									var row = new IIBIntroRow();
									rows.push(row);
								}
									
								if (i == 0 && feed == Feeds.magazineFeed()){
									var row = new IAMIntroRow();
									rows.push(row);
								}
									
								if (Counter != 0 && (Counter % 3) == 0 && adIndex < 3 && feed == Feeds.magazineFeed()){
									//var row = new Ad(innerAdList[adIndex], tracker, title);
									//rows.push(row);
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
										//Ti.API.info(new PostGroup(group));
										//Ti.API.info(rows.length);
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
							
					            //rows.push({ title: 'Row ' + i });
					        }
				        }
				        lastRow = c;
				        // and push this into our table.
				        transparentView.remove(loading);
			    		self.remove(transparentView);
				        firstpass = false;
				        table.setData(rows);
				        // now we're done; reset the loadData flag and start the interval up again
				        loadData = false;
				        setTimeout(checkSync, 200);
				        Ti.API.warn('DATA LOADED!');
				    }, 500);
				   
			 },
		    onerror: function(e) {
			    transparentView.remove(loading);
			    self.remove(transparentView);
			    Ti.API.debug("STATUS: " + this.status);
			    Ti.API.debug("TEXT:   " + this.responseText);
			    Ti.API.debug("ERROR:  " + e.error);
			    if (firstpass == true){
				    var errorView = new ErrorWindow(refreshRssTable, title, tracker);
				    self.add(errorView);
			    }
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
		var xhr = Ti.Network.createHTTPClient({
		    onload: function() {
		    	
		    	
		    	var xml = this.responseXML;
			   	var items = xml.documentElement.getElementsByTagName("item");
			   	//var item = items.item(0);
			   	
			   	var data = [];
			   	for (var i = 0; i < items.length; i++) {
			   		var item = items.item(i);
			   		
			   		
			   		data.push({
						title: item.getElementsByTagName('title').item(0).textContent,
						link: item.getElementsByTagName('link').item(0).textContent,
						description: item.getElementsByTagName('description').item(0).textContent,
						pubDate: item.getElementsByTagName('pubDate').item(0).textContent,
						//image: image
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
		*/
	}
	
	refreshRssTable();
	
	return self;
}
/*post.imageheight != null && post.imageheight > 150 && post.imageheight < 300 && */
module.exports = ArticlesWindow;