var WebView = require('ui/common/WebView');
var EditText = require('ui/common/EditText');
//var TabNavWindow = require('ui/common/TabNavWindow');
var ClubsWindow = require('ui/common/ClubsWindow');
var Map = require('ti.map');
/*
 * Clubs and Game Watch Tabs 
 */
function GameWatchWindow(clubData, clubInfoData, tracker) {
	
//-----------	Game Watch Window -----------//

	
	var tabGroup = Titanium.UI.createTabGroup();
	var screenHeight = Ti.Platform.displayCaps.platformHeight;
	var windowtitle = clubData[0].state;
	var mapAvailable = true;
	var self = Ti.UI.createWindow({
	    backgroundColor:'#e2e2e2',
		navBarHidden: false,	
	});
	
	var table = Ti.UI.createTableView({
		height: 'auto',
		backgroundColor:'#e2e2e2',
		top: 200
	});
	
	var code = Map.isGooglePlayServicesAvailable();
	Ti.API.info(Ti.Platform.version);
	Ti.API.info();
	
	if (code == Map.SUCCESS && Ti.Platform.version >= "4.0" ) {
		var gameWatchInfo = [];
		for (var i = 0; i <= clubData.length - 1; i++) {
			gameWatchInfo.push(
				Map.createAnnotation(
				{
				    latitude:  clubData[i].latitude,
				    longitude: clubData[i].longitude,
				    title: clubData[i].place,
				    subtitle: clubData[i].street,
				    pincolor: Map.ANNOTATION_RED,
				    animate:true,
				})
			);
			
		}
	 		
		
		var map = Map.createView({
			mapType:Map.NORMAL_TYPE,
			region: {latitude: clubData[0].latitude, longitude: clubData[0].longitude,
				latitudeDelta:0.01, longitudeDelta:0.01 },
			animate: true,
			userLocation: false,
			height: 250,
		    annotations: gameWatchInfo,
			top: 0
		});
		table.top = map.height;
		
		table.addEventListener('click', function(e){
			tracker.trackEvent({
					category: "Game Watches",
					action: "click",
					label: clubData[e.index].club,
					value: 1
			});
			self.add(map);
			map.region = {latitude: gameWatchInfo[e.index].latitude, longitude: gameWatchInfo[e.index].longitude,
					latitudeDelta:0.01, longitudeDelta:0.01 };
			
			map.selectAnnotation(gameWatchInfo[e.index]);
		});
		
		self.addEventListener('focus', function(e){
			self.add(map);
		});
			
		
	}
	else{
		
		table.top = 0;
		mapAvailable = false;
	}

	

	
	var data = [];
	var rowCounter = 0;
	for (var i = 0; i <= clubData.length - 1; i++) {
		var row;
		if (rowCounter % 2 == 0){
		    row = Ti.UI.createTableViewRow({
		    	club: clubData[i].club,
		    	latitude:  clubData[i].latitude,
				longitude: clubData[i].longitude,
		        height: 'auto',
		        index: i,
		        bottom: 10
		    });
		}
		else{
			row = Ti.UI.createTableViewRow({
		    	club: clubData[i].club,
		    	latitude:  clubData[i].latitude,
				longitude: clubData[i].longitude,
		        height: 'auto',
		        backgroundColor:'#cccccc',
		        bottom: 10
		    });
		}
		if(mapAvailable == false){
			row.backgroundSelectedColor = "transparent";
		}
	    var clubLabel = Ti.UI.createLabel({
	        text: (clubData[i].club),
	        color: "#000000",
	        textAlign: 'left',
	        height: 20,
	        top: 10,
	        left: 10,
	        font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
	    });
	    var placeLabel = Ti.UI.createLabel({
	        text: (clubData[i].place),
	        color: "#000000",
	        textAlign: 'left',
	        left: 10,
	        top: 31,
	        height: 14,
	        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	    });
	    var streetLabel = Ti.UI.createLabel({
	        text: clubData[i].street,
	        color: "#000000",
	        textAlign: 'left',
	        left: 10,
	        top: 46,
	        height: 14,
	        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	    });
	    if (clubData[i].phone != 'NA'){
	    	var phoneLabel = Ti.UI.createLabel({
	        	text: (clubData[i].phone),
	        	color: "#000000",
		        textAlign: 'left',
		        autoLink: Titanium.UI.AUTOLINK_PHONE_NUMBERS,
		        left: 10,
		        top: 61,
		        height: 14,
		        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
		    });
			
		    row.add(phoneLabel);
	    }
	    row.add(clubLabel);
	    row.add(placeLabel);
	    row.add(streetLabel);
	    data.push(row);
	    rowCounter++;
	};
	data = addRows(i, data, false);
	table.setData(data);
	
	
	self.add(table);
	
	
	
	

	
	

var mainWinTab1 = new ClubsWindow(clubData, clubInfoData, tabGroup, tracker);


var tab1 = Titanium.UI.createTab({  
    icon: "people.png",
    title: 'Iowa Clubs',
    window: mainWinTab1
});
tabGroup.addTab(tab1); 


var tab2 = Titanium.UI.createTab({  
    icon: 'tv.png',
    title: 'Game Watch Locations',
    window: self
});
tabGroup.addTab(tab2); 

//tabGroup.setActiveTab(0); 

var actionBar;
tabGroup.addEventListener("open", function() {
    if (Ti.Platform.osname === "android") {
        if (! tabGroup.activity) {
            Ti.API.error("Can't access action bar on a lightweight window.");
        } else {
            actionBar = tabGroup.activity.actionBar;
            if (actionBar) {
                actionBar.backgroundImage = Ti.Filesystem.resourcesDirectory + 'navbar.png';
                actionBar.title = windowtitle;
                actionBar.logo = Ti.Filesystem.resourcesDirectory + "back.png";
                actionBar.onHomeIconItemSelected = function() {
                    tabGroup.close();
                };
            }
        }
    }
});
tabGroup.open();

return self;
}

//Helper Functions

function addRows(i, data, flag){
	if (i == 1 && flag == true){
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    backgroundSelectedColor : "transparent",
		    backgroundColor:'#cccccc',
		    bottom: 10
		});
		data.push(row);
		
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    backgroundSelectedColor : "transparent",
		    bottom: 10
		});
		data.push(row);
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    backgroundSelectedColor : "transparent",
		    backgroundColor:'#cccccc',
		    bottom: 10
		});
		data.push(row);
	}
	else if (i == 1 && flag == false){
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    backgroundSelectedColor : "transparent",
		    backgroundColor:'#cccccc',
		    bottom: 10
		});
		data.push(row);
		
	}
	else if (i == 2 && flag == true){
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    backgroundSelectedColor : "transparent",
		    bottom: 10
		});
		data.push(row);
		
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    backgroundSelectedColor : "transparent",
		    bottom: 10
		});
		data.push(row);
		
	}
	else if (i == 3 && flag == true){
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    backgroundSelectedColor : "transparent",
		    backgroundColor:'#cccccc',
		    bottom: 10
		});
		data.push(row);
		
	}
	return data;
}



module.exports = GameWatchWindow;