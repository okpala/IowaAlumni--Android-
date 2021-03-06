var WebView = require('ui/common/WebView');
var EditText = require('ui/common/EditText');

/*
 * Clubs and Game Watch Tabs 
 */
function ClubsWindow(clubData, clubInfoData, tabGroup, tracker) {

	var self = Ti.UI.createWindow({
	    backgroundColor:'#e2e2e2',
		navBarHidden: false,	
	});


	var table = Ti.UI.createTableView({
		height: 'auto',
	});

	
	var data = [];
	var rowCounter = 0;
	var emailCounter = 0;
	for (var i = 0; i <= clubInfoData.length - 1; i++) {
		if (rowCounter % 2 == 0){
		    var row = Ti.UI.createTableViewRow({
		    	city: clubInfoData[i].city,
		        height: 'auto',
		        backgroundSelectedColor : "transparent",
		        bottom: 10
		    });
		}
		else{
			 var row = Ti.UI.createTableViewRow({
		    	city: clubInfoData[i].city,
		        height: 'auto',
		        backgroundSelectedColor : "transparent",
		        backgroundColor:'#cccccc',
		        bottom: 10
		    });
		}
	    var cityLabel = Ti.UI.createLabel({
	        text: (clubInfoData[i].city),
	        color: "#000000",
	        textAlign: 'left',
	        height: 20,
	        top: 10,
	        left: 10,
	        font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'bold'}
	    });
	    row.add(cityLabel);
	    
	   var currentTop = 31;
	   if (clubInfoData[i].phone != 'NA'){
		   var leaderLabel = Ti.UI.createLabel({
		        text: (clubInfoData[i].leader),
		        color: "#000000",
		        textAlign: 'left',
		        left: 10,
		        top: currentTop,
		        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'normal'}
		    }); 
	    row.add(leaderLabel);
	    currentTop = currentTop + 15;
	   }
	    
	    
	    if (clubInfoData[i].phone != 'NA'){
		    var phoneLabel = Ti.UI.createLabel({
		        text: (clubInfoData[i].phone),
		        color: "#000000",
		        textAlign: 'left',
		        left: 10,
		        top: currentTop,
		        autoLink: Titanium.UI.AUTOLINK_PHONE_NUMBERS,
		        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'normal'}
		    });
		    row.add(phoneLabel);
		    currentTop = currentTop + 15;
	    }
	    if (clubInfoData[i].email != 'NA'){
		    var emailLabel = createEmail(clubInfoData, i, currentTop, tracker);
		
		    row.add(emailLabel);
	    	currentTop = currentTop + 15;
	    	
	    }
	    
	    if (clubInfoData[i].web != 'NA'){
		    var webLabel =  createWeb(clubInfoData, i, currentTop, tracker);
			row.add(webLabel);
	    }
	   rowCounter++;
	    data.push(row);
	    
	};
	data = addRows(i, data, true);
	table.setData(data);
	
	self.add(table);
 
	table = null;
return self;
}

//Helper Functions

function createEmail(clubInfoData, index, currentTop, tracker){
	var emailLabel = Ti.UI.createLabel({
		        text: (clubInfoData[index].email),
		        textAlign: 'left',
		        //color: 'blue',
		        left: 10,
		        top: currentTop,
		        autoLink: Titanium.UI.AUTOLINK_EMAIL_ADDRESSES,
		        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'normal'}
		    });
		    
		   
	    	emailLabel.addEventListener('click', function(e) {
	    		tracker.trackEvent({
					category: "Clubs",
					action: "click",
					label: clubInfoData[index].city + " " + clubInfoData[index].email,
					value: 1
				});
			}); 
			
		return emailLabel;	
	
}

function createWeb(clubInfoData, index, currentTop, tracker){
	var webLabel = Ti.UI.createLabel({
		        text: (clubInfoData[index].web),
		        textAlign: 'left',
		        left: 10,
		        top: currentTop,
		        color: "blue",
		        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'normal'}
		    });
		   
		    
		    webLabel.addEventListener('click', function(e) {
		    	tracker.trackEvent({
					category: "Clubs",
					action: "click",
					label: clubInfoData[index].city + " " + clubInfoData[index].web,
					autoLink: Titanium.UI.AUTOLINK_URLS,
					value: 1
				});
				new WebView (clubInfoData[index].web);
			}); 
			
		return webLabel;	
	
}

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



module.exports = ClubsWindow;