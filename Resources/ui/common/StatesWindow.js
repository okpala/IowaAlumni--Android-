var GameWatchWindow = require('ui/common/GameWatchWindow');
var WebView = require('ui/common/WebView');
var ApplicationWindow = require('ui/common/ApplicationWindow');
var StaticAd = require('ui/common/StaticAd');

var Feed = require('ui/common/Feed');
var LoadingScreen = require('ui/common/LoadingScreen');
var ErrorWindow = require('ui/common/ErrorWindow');

/*
 * Root Window for Clubs and Gamewatches
 */

function ClubsWindow(title, tracker){
	var Feeds = new Feed(); 
	var url = Feeds.gameWatchFeed();
	var self = new ApplicationWindow(title);
	
	var tableHeader = Ti.UI.createTableView({
			height: 'auto',
			top: 0,
			backgroundColor:'#e2e2e2',
			separatorColor: "transparent"
		
	});
	
	
	var introLabel = Ti.UI.createLabel({
			text: 'Want to connect with fellow UI grads, need a place to watch the next game with fellow Hawkeye fans? IOWA clubs have you covered—find a location near you!',
			textAlign: 'left',
			color: "#000000",
			left: 10,
			right: 10,
			width: Ti.UI.FILL,
			height: 'auto',
			top: 10,
			font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
				        
	});
		
	
		
	var people = Ti.UI.createImageView({
			image:    Ti.Filesystem.resourcesDirectory + 'iowaPeople.png',
		  	left: 10,
			right: 10,
			width: Ti.UI.FILL,
		  	height: 70
		  
	});

	
	var table = Ti.UI.createTableView({
			height: 'auto',
			bottom: 70,
			backgroundColor:'#e2e2e2'
		
	});
	
	tracker.trackScreen(title);
	var loading = new LoadingScreen();
	
	function refreshRssTable() {
		var rows = [];

		/* Table Header */
		var row = Ti.UI.createTableViewRow({backgroundSelectedColor: "transparent"});
		row.add(introLabel);
	
		
		var row1 = Ti.UI.createTableViewRow({backgroundSelectedColor: "transparent"});
		row1.add(people);
		var clubs = [];
		
		tableHeader.setData([row, row1]);
		
		
	
		var screenWidth = Ti.Platform.displayCaps.platformWidth  * (Titanium.Platform.displayCaps.dpi / 160);
		var adList = [];
		var clubsInfo = [];
		var data = [];	
		var textView = Ti.UI.createView({
        	left: 10,
            width: screenWidth,
            visible: false,
            height:'auto'
         });
         textView.add(introLabel);
         self.add(textView) ; 
              
       table.top = textView.toImage().height + people.height; 
       self.remove(textView) ;
  
                
           
		self.add(loading);
		loading.show(); 
		var xhr = Ti.Network.createHTTPClient({
		    onload: function() {
		    	var xml = this.responseXML;
			   	var items = xml.documentElement.getElementsByTagName("item");
			   		for (var i = 0; i < items.length; i++) {
			   			var item = items.item(i);
			   			
			   			clubs.push({
							state: item.getElementsByTagName('state').item(0).textContent,	
							club:  item.getElementsByTagName('club').item(0).textContent,	
							place: item.getElementsByTagName('place').item(0).textContent,	
							phone: item.getElementsByTagName('phone').item(0).textContent,	
							latitude: item.getElementsByTagName('latitude').item(0).textContent,	
							longitude: item.getElementsByTagName('longitude').item(0).textContent,	
							street: item.getElementsByTagName('street').item(0).textContent	
						});
					}
				
				var items = xml.documentElement.getElementsByTagName("item3");
			   	var item = items.item(0);
			   	
			   	adList.push({                 
		           ad: item.getElementsByTagName( 'ad').item(0).textContent,
		           adUrl: item.getElementsByTagName( 'adUrl').item(0).textContent,
		                  
				});
				var ad = new StaticAd(adList, tracker, title);
					
				
				var items = xml.documentElement.getElementsByTagName("item2");

			   	
			   		for (var i = 0; i < items.length; i++) {
			   			var item = items.item(i);
			   			
			   			clubsInfo.push({
							state: item.getElementsByTagName('state').item(0).textContent,
							phone: item.getElementsByTagName('phone').item(0).textContent,
							leader: item.getElementsByTagName('leader').item(0).textContent,
							city: item.getElementsByTagName('city').item(0).textContent,
							web: item.getElementsByTagName('web').item(0).textContent,
							email: item.getElementsByTagName('email').item(0).textContent
							
						});
					}
					
			
			
			
			var rowCounter = 0;	
			for (var i = 0; i <= clubs.length - 1; i++) {
				if ((i == 0) || ((clubs[i - 1].state != clubs[i].state) && i != 0) ){ 
				if (rowCounter % 2 == 0){
					    var row = Ti.UI.createTableViewRow({
					    	text: clubs[i].state,
					        height: 50
					    });
				  }
				  else{
				  		var row = Ti.UI.createTableViewRow({
					    	text: clubs[i].state,
					    	backgroundColor:'#cccccc',
					        height: 50
					    });
				  }
		
				var label = Ti.UI.createLabel({
					 text: clubs[i].state,
					 textAlign: 'center',
					 color: "#000000",
					 font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
					        
				});
				   
				    row.add(label);
				    data.push(row);
				  	rowCounter++;
			    }
			    
			   
			};	

		   	table.setData(data);
		   
			//Ti.API.info(table.top);
			//Ti.API.info(textView.toImage().height);
			//Ti.API.info(people.height);

			self.add(tableHeader);
			self.add(table);
			self.add(ad);
			 table.addEventListener('click', function(e){
			 	tracker.trackEvent({
						category: title,
						action: "click",
						label: e.row.text,
						value: 1
				});
				var stateClubs = getStateList(clubs, clubsInfo, e.row.text);
				(new GameWatchWindow(stateClubs[0], stateClubs[1], tracker));
			});
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

function getStateList (clubsList, clubsInfoList, state){
	var data = [];
	var stateList = [];
	var stateInfoList = [];
	for (var i = 0; i <= clubsList.length - 1; i++){
		if (clubsList[i].state == state ){
			stateList.push(clubsList[i]);
		}
	} 
	data.push(stateList);
	for (var i = 0; i <= clubsInfoList.length - 1; i++){
		if ((clubsInfoList[i].state).toUpperCase() == state ){
			stateInfoList.push(clubsInfoList[i]);
		}
	} 
	
	data.push(stateInfoList);
	return data;
}


module.exports = ClubsWindow;