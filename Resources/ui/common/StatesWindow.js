//var GetFeed = require('ui/common/GetFeed');
var GameWatchWindow = require('ui/common/GameWatchWindow');
var WebView = require('ui/common/WebView');
var ApplicationWindow = require('ui/common/ApplicationWindow');
var StaticAd = require('ui/common/StaticAd');
var Feed = require('ui/common/Feed');
/*
 * Root Window for Clubs and Gamewatches
 */

function ClubsWindow(title){
	
	var Feeds = new Feed(); 
var url = Feeds.gameWatchFeed();
var self = new ApplicationWindow(title);
var table = Ti.UI.createTableView({
		height: 'auto',
		bottom: 70,
		top: 145
	});
var rows = [];

 
var xhr = Ti.Network.createHTTPClient({
    onload: function() {
    // Ti.API.debug(this.responseText);
    	var xml = this.responseXML;
	   	var items = xml.documentElement.getElementsByTagName("item");
	   	var item = items.item(0);
	   	var clubs = [];
	   		for (var i = 0; i < items.length; i++) {
	   			var item = items.item(i);
	   			
	   			clubs.push({
					state: item.getElementsByTagName('state').item(0).textContent,// getRssText(item, 'state'),
					club:  item.getElementsByTagName('club').item(0).textContent,//getRssText(item, 'club'),
					place: item.getElementsByTagName('place').item(0).textContent,//getRssText(item, 'place'),
					phone: item.getElementsByTagName('phone').item(0).textContent,//getRssText(item, 'phone'),
					latitude: item.getElementsByTagName('latitude').item(0).textContent,//getRssText(item, 'latitude'),
					longitude: item.getElementsByTagName('longitude').item(0).textContent,//getRssText(item, 'longitude'),
					street: item.getElementsByTagName('street').item(0).textContent//getRssText(item, 'street')
				});
			}
		
		var items = xml.documentElement.getElementsByTagName("item2");
	   	var item = items.item(0);
	   	var clubsInfo = [];
	   		for (var i = 0; i < items.length; i++) {
	   			var item = items.item(i);
	   			
	   			clubsInfo.push({
					state: item.getElementsByTagName('state').item(0).textContent,// getRssText(item, 'state'),
					phone: item.getElementsByTagName('phone').item(0).textContent,//getRssText(item, 'phone'),
					leader: item.getElementsByTagName('leader').item(0).textContent,// getRssText(item, 'leader'),
					city: item.getElementsByTagName('city').item(0).textContent,//getRssText(item, 'city'),
					web: item.getElementsByTagName('web').item(0).textContent,//getRssText(item, 'web'),
					email: item.getElementsByTagName('email').item(0).textContent//getRssText(item, 'email'),
					
				});
			}
			Ti.API.info("is it greater than zero " + clubsInfo.length);
		var introLabel = Ti.UI.createLabel({
			 text: 'Want to connect with fellow UI grads, need a place to watch the next game with fellow Hawkeye fans? IOWA clubs have you covered—find a location near you!',
			 textAlign: 'left',
			 left: 10,
			 width: 300,
			 top: 10,
			font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
			        
		});
	self.add(introLabel);		
	
	
	
	var people = Ti.UI.createImageView({
	  image:    'https://www.iowalum.com/mobile/clubs.png',
	  top:   85
	});
	
	self.add(people);
	var data = [];	
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
			 font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
			        
		});
		   
		    row.add(label);
		    data.push(row);
		  	rowCounter++;
	    }
	    
	   
	};		
   	table.setData(data);
	self.add(table);
	
	 table.addEventListener('click', function(e){
			var stateClubs = getStateList(clubs, clubsInfo, e.row.text);
			(new GameWatchWindow(stateClubs[0], stateClubs[1]));
		});
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
	var Feeds = new Feed();
	var masterView = Ti.UI.createView();
	var introLabel = Ti.UI.createLabel({
			 text: 'Want to connect with fellow UI grads, need a place to watch the next game with fellow Hawkeye fans? IOWA clubs have you covered—find a location near you!',
			 textAlign: 'left',
			 left: 10,
			 width: 300,
			 top: 10,
			font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
			        
		});
	masterView.add(introLabel);		
	
	var table = Ti.UI.createTableView({
		height: 'auto',
		bottom: 70,
		top: 145
	});
	
	var people = Ti.UI.createImageView({
	  image:    'https://www.iowalum.com/mobile/clubs.png',
	  top:   85
	});
	
	masterView.add(people);
	
	var clubsInfo = new GetFeed(Feeds.clubsFeed());
	var clubs = new GetFeed(Feeds.gameWatchFeed());
	var data = [];
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
			 font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
			        
		});
		   
		    row.add(label);
		    data.push(row);
		  	rowCounter++;
	    }
	    
	};


	
 
	table.setData(data);
	masterView.add(table);
	table.addEventListener('click', function(e){
		var stateClubs = getStateList(clubs, clubsInfo, e.row.text);
		(new GameWatchWindow(stateClubs[0], stateClubs[1])).open();
	});
	
	
	var ad = new StaticAd(11,395);
	masterView.add(ad);
	
	
	var self = new ApplicationWindow(title, masterView);
	
*/
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