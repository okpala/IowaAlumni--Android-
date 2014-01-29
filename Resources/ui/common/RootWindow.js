var ApplicationWindow = require('ui/common/ApplicationWindow');
var SingleRow = require('ui/common/SingleRow');
var HomeImageSlider = require('ui/common/HomeImageSlider');
var SinglePost = require('ui/common/SinglePost');
var HomeSMSection = require('ui/common/HomeSMSection');
var FormatDate = require('ui/common/FormatDate');
var StaticAd = require('ui/common/StaticAd');
var Feed = require('ui/common/Feed');
var LoadingScreen = require('ui/common/LoadingScreen');
var ErrorWindow = require('ui/common/ErrorWindow');

/*
 * Home Window
 */
function RootWindow(title, tracker) {
	var self = new ApplicationWindow("Home");

	var tableView = Ti.UI.createTableView({
		backgroundColor:'#e2e2e2',
		separatorColor: '#e2e2e2',
		zIndex:1,
		bottom: 70
	});
	
	var Feeds = new Feed(); 
	var url = Feeds.homeFeed();
	var screenWidth = Ti.Platform.displayCaps.platformWidth;
	
	tracker.trackScreen(title);
	var loading = new LoadingScreen();
	
	var transparentView = Titanium.UI.createView({ 
		backgroundColor: '#ccc',
		opacity:0.9,
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		top: 0,
		zIndex:5,
	});	

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
		top: 15,
		height:"auto",
		color:"#576c89",
		textAlign:"center",
		font:{fontSize:12},
		shadowColor:"#fff",
		shadowOffset:{x:0,y:1}
	});
	
	var introLabel = Ti.UI.createLabel({
		text: "No matter how many years or miles may separate you from the campus, the UI Alumni Association can help you feel part of the life of the University of Iowa.",
		width: Ti.UI.FILL,
		color: "#000000",
		top: 10,
		right: 10,
		left: 10,
		font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
	});
	
	var eventHeaderLabel = Ti.UI.createLabel({
		text: "Today's Events",
		color: "#000000",
		width: 300,
		top: 10,
		left: 10,
		font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
	});
	
	
	var magazineHeaderLabel = Ti.UI.createLabel({
		text: "Article of the Week",
		color: "#000000",
		width: 300,
		top: 10,
		left: 10,
		font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
	});

	function refreshRssTable() {
		var rows = [];
		var row = Ti.UI.createTableViewRow({height:30});
		row.add(lastUpdatedLabel);
		
		row.add(refreshLabel);
		row.addEventListener('click', function() {
			refreshRssTable();
			tracker.trackEvent({
				category: "Refreshing  Window",
				action: "refresh",
				label: "Refreshing " + title + "'s Window",
				value: 1
			});
		});
		rows.push(row);
		transparentView.add(loading);
		loading.show();
		self.add(transparentView);
		
		var xhr = Ti.Network.createHTTPClient({
		    onload: function() {
		    	
		    	
		    	var xml = this.responseXML;
		    	var images = [];
		    	
				var items = xml.documentElement.getElementsByTagName("item5");
				var item = items.item(0);
				
				images.push({                 
			    	image: item.getElementsByTagName( 'url').item(0).textContent,         
				});
				
			    var row = new HomeImageSlider(images);
				rows.push(row);
			 	
				
				var row = Ti.UI.createTableViewRow();	
				row.add(introLabel);
				rows.push(row);
					
			    
				var items = xml.documentElement.getElementsByTagName("item");
				   
				var alerts = [];
				for (var i = 0; i < items.length; i++) {
					var item = items.item(i);
				   	alerts.push({
						title:  item.getElementsByTagName('title').item(0).textContent,
						header:  item.getElementsByTagName('header').item(0).textContent,
						url:  item.getElementsByTagName('link').item(0).textContent,
						image: item.getElementsByTagName('image').item(0).textContent,
						description: item.getElementsByTagName('description').item(0).textContent,
						pubDate: item.getElementsByTagName('pubDate').item(0).textContent,
								
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
					
					
							
				if (alerts.length > 0){
					for (var i = 0; i < alerts.length; i++){
						var headerLabel = Ti.UI.createLabel({
							text: alerts[i].header,
							color: "#000000",
							width: screenWidth - 10,
							top: 10,
							left: 10,
							font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
						});
	
						
						var row = Ti.UI.createTableViewRow();
						
						row.add(headerLabel);
						rows.push(row);
						
						var row = new SinglePost(alerts[i], tracker, title);
						rows.push(row); 
					}
				}
					
				if(events.length > 0){
					
						
					var row = Ti.UI.createTableViewRow();
					row.add(eventHeaderLabel);
						
					rows.push(row);
						
						
					for (var i = 0; i < events.length; i++) {
						var row = new SingleRow (events[i], tracker, title);
							
						rows.push(row);
					}
				} 	
				
			 	
					
				var row = Ti.UI.createTableViewRow();
				row.add(magazineHeaderLabel);
					
				rows.push(row);
					
				var articlePost =  new SinglePost(article[0], tracker, title);
				rows.push(articlePost);
					
				var row = new HomeSMSection(tracker);
					
				rows.push(row);
					
			   	tableView.setData(rows);
			   	self.add(tableView);
			    self.add(ad);
			    transparentView.remove(loading);
			    self.remove(transparentView);
			   
			   
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

module.exports = RootWindow;