//var GetFeed = require('ui/common/GetFeed');
//var ApplicationWindow = require('ui/common/ApplicationWindow');
var NavigateWindow = require('ui/common/NavigateWindow');
var WebView = require('ui/common/WebView');
var Feed = require('ui/common/Feed');
var LoadingScreen = require('ui/common/LoadingScreen');
var Map = require('ti.map');
var ErrorWindow = require('ui/common/ErrorWindow');
function MapWindow(title, tracker) {
	var screenHeight = Ti.Platform.displayCaps.platformHeight;
	var Feeds = new Feed(); 
	var url = Feeds.iowaCityFeed();
	var self = new NavigateWindow(title);
	var table = Ti.UI.createTableView();
	var rows = [];	
	var mapWin = Ti.UI.createView({		    
		    backgroundColor:'#ffffff',
			navBarHidden: true
	});
	var map;
	var mapAvailable = true;
	
	var textView = Ti.UI.createView({
				backgroundColor: 	'#e2e2e2',
				height:				75,
				top:				195,
				
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
					 bottom: 2,
					 color: 'blue',
					font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
					        
				});
				
			linkLabel.addEventListener('click', function(e){
				new WebView ('http://iowalum.com/membership/benefits.cfm');
				tracker.trackEvent({
						category: "Benefits",
						action: "click",
						label: "Members Benefits' Website",
						value: 1
					});
			});
			
			var table = Ti.UI.createTableView({
				height: 'auto',
				top: 270
			});
		
	
	
	tracker.trackScreen(title);
	var loading = new LoadingScreen();
	function refreshRssTable() {
		self.add(loading);
		loading.show();
		var xhr = Ti.Network.createHTTPClient({
		    onload: function() {
		    	
			    var xml = this.responseXML;
				var items = xml.documentElement.getElementsByTagName("item");
				var item = items.item(0);
				
				
				var businessesInfo = [];
				for (var i = 0; i < items.length; i++) {
						var item = items.item(i);
			
					businessesInfo.push({
						company:  item.getElementsByTagName('company').item(0).textContent,	
						discount: item.getElementsByTagName('discount').item(0).textContent,	
						latitude: item.getElementsByTagName('latitude').item(0).textContent,	
						longitude: item.getElementsByTagName('longitude').item(0).textContent,	
						street: item.getElementsByTagName('street').item(0).textContent,	
					});
				}
				
				
				var code = Map.isGooglePlayServicesAvailable();

				if (code == Map.SUCCESS) {
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
					
					map = Map.createView({
						mapType:Map.NORMAL_TYPE,
						region: {latitude: companyInfo[0].latitude, longitude: companyInfo[0].longitude,
								latitudeDelta:0.01, longitudeDelta:0.01 },
						animate: true,
						userLocation:false,
						height: screenHeight/2,
					    annotations: companyInfo,
						top: 0
					});
					textView.top = map.height;
					table.top = textView.top + textView.height;
					
					table.addEventListener('click', function(e){
					
						map.region = {latitude: companyInfo[e.index].latitude, longitude: companyInfo[e.index].longitude,
									latitudeDelta:0.01, longitudeDelta:0.01 };
						map.selectAnnotation(companyInfo[e.index]);
						
						tracker.trackEvent({
								category: "Benefits",
								action: "click",
								label: companyInfo[e.index].title,
								value: 1
						});
						
					});
					mapWin.add(map);
					
				}
			
				else{
					textView.top = 0;
					table.top = 75;
					mapAvailable = false;
					
				}
				
			
				
				
				var data = [];
				for (var i = 0; i <= businessesInfo.length - 1; i++) {
					var row;
					if (i % 2 == 0){
					    row = Ti.UI.createTableViewRow({
					    	company: businessesInfo[i].company,
					    	latitude:  businessesInfo[i].latitude,
							longitude: businessesInfo[i].longitude,
							index: i,
					        height: 'auto',
					        bottom: 10,
					    });
					}
					
					else{
						row = Ti.UI.createTableViewRow({
					    	company: businessesInfo[i].company,
					    	latitude:  businessesInfo[i].latitude,
							longitude: businessesInfo[i].longitude,
					        height: 'auto',
					        backgroundColor:'#cccccc',
					        bottom: 10,
					    });
					}
					if(mapAvailable == false){
						row.backgroundSelectedColor = "transparent";
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
				textView.add(linkLabel);	
				
				mapWin.add(textView);
				mapWin.add(table);
				self.add(mapWin);
				self.remove(loading);
				
				
				
				
		    },
		    onerror: function(e) {
			    self.remove(loading);
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



module.exports = MapWindow;