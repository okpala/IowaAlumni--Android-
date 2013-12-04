var WebView = require('ui/common/WebView');
var EditText = require('ui/common/EditText');
var TabNavWindow = require('ui/common/NavigateWindow');
/*
 * Clubs and Game Watch Tabs 
 */
function ClubsWindow(clubData, clubInfoData, tabGroup) {

	var self =  new TabNavWindow(tabGroup);

	var table = Ti.UI.createTableView({
		height: 'auto',
		//top: top
	});

	
	var data = [];
	var rowCounter = 0;
	for (var i = 0; i <= clubInfoData.length - 1; i++) {
		if (rowCounter % 2 == 0){
		    var row = Ti.UI.createTableViewRow({
		    	city: clubInfoData[i].city,
		        height: 'auto',
		        selectionStyle: 'none',
		        bottom: 10
		    });
		}
		else{
			 var row = Ti.UI.createTableViewRow({
		    	city: clubInfoData[i].city,
		        height: 'auto',
		        selectionStyle: 'none',
		        backgroundColor:'#cccccc',
		        bottom: 10
		    });
		}
	    var cityLabel = Ti.UI.createLabel({
	        text: (clubInfoData[i].city),
	        textAlign: 'left',
	        height: 20,
	        top: 10,
	        left: 10,
	        font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
	    });
	    row.add(cityLabel);
	    
	   var leaderLabel = Ti.UI.createLabel({
	        text: (clubInfoData[i].leader),
	        textAlign: 'left',
	        left: 10,
	        top: 31,
	        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	    }); 
	    row.add(leaderLabel);
	    
	    var currentTop = 46;
	    
	    if (clubInfoData[i].phone != 'NA'){
		    var phoneLabel = Ti.UI.createLabel({
		        text: (clubInfoData[i].phone),
		        textAlign: 'left',
		        left: 10,
		        top: currentTop,
		        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
		    });
		    row.add(phoneLabel);
		    currentTop = currentTop + 15;
	    }
	    if (clubInfoData[i].email != 'NA'){
		    var emailLabel = Ti.UI.createLabel({
		        text: (clubInfoData[i].email),
		        textAlign: 'left',
		        color: 'blue',
		        left: 10,
		        top: currentTop,
		        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
		    });
		    
		   
	    	emailLabel.addEventListener('click', function(e) {
	    		//data[e.index].emailLabel.color = 'purple'
	    		//Ti.API.info(e.row);
				var emailDialog = Ti.UI.createEmailDialog();
				emailDialog.toRecipients = [clubInfoData[e.index].email];
				var f = Ti.Filesystem.getFile('cricket.wav');
				emailDialog.addAttachment(f);
				emailDialog.open();
	}); 
	
		    row.add(emailLabel);
	    	currentTop = currentTop + 15;
	    	
	    }
	    
	    if (clubInfoData[i].web != 'NA'){
		    var webLabel = Ti.UI.createLabel({
		        text: (clubInfoData[i].web),
		        textAlign: 'left',
		        left: 10,
		        top: currentTop,
		        color: "blue",
		        font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
		    });
		   
		    
		    webLabel.addEventListener('click', function(e) {
				new WebView (clubInfoData[e.index].web);
			}); 
			row.add(webLabel);
	    }
	   rowCounter++;
	    data.push(row);
	    
	};
	data = addRows(i, data, true);
	table.setData(data);
	
	self.add(table);
 

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



module.exports = ClubsWindow;