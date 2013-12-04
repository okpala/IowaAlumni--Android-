var WebView = require('ui/common/WebView');
var EditText = require('ui/common/EditText');
var TabNavWindow = require('ui/common/TabNavWindow');
var ClubsWindow = require('ui/common/ClubsWindow');
/*
 * Clubs and Game Watch Tabs 
 */
function GameWatchWindow(clubData, clubInfoData) {
	
//-----------	Game Watch Window -----------//

	
	var tabGroup = Titanium.UI.createTabGroup();
	
	var windowtitle = clubData[0].state;
	
	var self =  new TabNavWindow(tabGroup);

	var gameWatchInfo = [];
	for (var i = 0; i <= clubData.length - 1; i++) {
		gameWatchInfo.push(
			Titanium.Map.createAnnotation(
			{
			    latitude:  clubData[i].latitude,
			    longitude: clubData[i].longitude,
			    title: clubData[i].place,
			    subtitle: clubData[i].street,
			    pincolor: Titanium.Map.ANNOTATION_RED,
			    animate:true,
			})
		);
		
	}
 		
	
	var map = Ti.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		region: {latitude: clubData[0].latitude, longitude: clubData[0].longitude,
			latitudeDelta:0.01, longitudeDelta:0.01 },
		animate: true,
		regionFit: true,
		userLocation: true,
		height: 200,
	    annotations: gameWatchInfo,
		top: 0
	});
	
	map.addEventListener('loading', function(e){
		map.setLocation({latitude: clubData[0].latitude , longitude: clubData[0].longitude,
				latitudeDelta: 0.01, longitudeDelta: 0.01 });	
	});
	map.addEventListener('postlayout', function(e){
		map.setLocation({latitude: clubData[0].latitude , longitude: clubData[0].longitude,
				latitudeDelta: 0.01, longitudeDelta: 0.01 });	
	});

	var table = Ti.UI.createTableView({
		height: 'auto',
		top: 200
	});

	
	var data = [];
	var rowCounter = 0;
	for (var i = 0; i <= gameWatchInfo.length - 1; i++) {
		if (rowCounter % 2 == 0){
		    var row = Ti.UI.createTableViewRow({
		    	club: clubData[i].club,
		    	latitude:  clubData[i].latitude,
				longitude: clubData[i].longitude,
		        height: 'auto',
		        bottom: 10
		    });
		}
		else{
			var row = Ti.UI.createTableViewRow({
		    	club: clubData[i].club,
		    	latitude:  clubData[i].latitude,
				longitude: clubData[i].longitude,
		        height: 'auto',
		        backgroundColor:'#cccccc',
		        bottom: 10
		    });
		}
	    var clubLabel = Ti.UI.createLabel({
	        text: (clubData[i].club),
	        textAlign: 'left',
	        height: 20,
	        top: 10,
	        left: 10,
	        font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
	    });
	    var placeLabel = Ti.UI.createLabel({
	        text: (clubData[i].place),
	        textAlign: 'left',
	        left: 10,
	        top: 31,
	        height: 14,
	        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	    });
	    var streetLabel = Ti.UI.createLabel({
	        text: clubData[i].street,//new EditText(clubData[i].street).adjustedText(),
	        textAlign: 'left',
	        left: 10,
	        top: 46,
	        height: 14,
	        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	    });
	    if (clubData[i].phone != 'NA'){
	    	var phoneLabel = Ti.UI.createLabel({
	        	text: (clubData[i].phone),
		        textAlign: 'left',
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
	
	self.add(map);
	self.add(table);
	
	//masterContainerWindow.add(mapWin);
	//self.add(mapWin);
	

	table.addEventListener('click', function(e){
		
		map = Ti.Map.createView({
			mapType: Titanium.Map.STANDARD_TYPE,
			region: {latitude: e.row.latitude, longitude: e.row.longitude,
				latitudeDelta:0.01, longitudeDelta:0.01 },
			animate: true,
			regionFit: true,
			userLocation: true,
			height: 200,
		    annotations: gameWatchInfo,
			top: 0
		});
		
		self.add(map);
		
		map.selectAnnotation(gameWatchInfo[e.index]);
	});
	

	
	
	
//--------------Club Window ----------------------//

var mainWinTab1 = new ClubsWindow(clubData, clubInfoData, tabGroup);


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

tabGroup.setActiveTab(0); 
tabGroup.open();

return self;
}

//Helper Functions

function addRows(i, data, flag){
	if (i == 1 && flag == true){
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    selectionStyle: 'none',
		    backgroundColor:'#cccccc',
		    bottom: 10
		});
		data.push(row);
		
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    selectionStyle: 'none',
		    bottom: 10
		});
		data.push(row);
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    selectionStyle: 'none',
		    backgroundColor:'#cccccc',
		    bottom: 10
		});
		data.push(row);
	}
	else if (i == 1 && flag == false){
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    selectionStyle: 'none',
		    backgroundColor:'#cccccc',
		    bottom: 10
		});
		data.push(row);
		
	}
	else if (i == 2 && flag == true){
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    selectionStyle: 'none',
		    bottom: 10
		});
		data.push(row);
		
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    selectionStyle: 'none',
		    backgroundColor:'#cccccc',
		    bottom: 10
		});
		data.push(row);
		
	}
	else if (i == 3 && flag == true){
		var row = Ti.UI.createTableViewRow({
		    height: 100,
		    selectionStyle: 'none',
		     backgroundColor:'#cccccc',
		    bottom: 10
		});
		data.push(row);
		
	}
	return data;
}



module.exports = GameWatchWindow;