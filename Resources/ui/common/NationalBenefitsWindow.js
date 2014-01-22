var MapWindow = require('ui/common/MapWindow');
var ApplicationWindow = require('ui/common/ApplicationWindow');
var GetFeed = require('ui/common/GetFeed');
var WebView = require('ui/common/WebView');
var Feed = require('ui/common/Feed');
var LoadingScreen = require('ui/common/LoadingScreen');
var ErrorWindow = require('ui/common/ErrorWindow');

function NationalBenefitsWindow(title, tracker){
	var Feeds = new Feed(); 
	var url = Feeds.nationalDiscountFeed();
	var self = new ApplicationWindow("National Member Benefits");
	var rows = [];        
	var screenWidth = Ti.Platform.displayCaps.platformWidth;
	tracker.trackScreen(title);
	var loading = new LoadingScreen();
	var screenWidth = Ti.Platform.displayCaps.platformWidth; 
	
	 var textView = Ti.UI.createView({
		backgroundImage:        Ti.Filesystem.resourcesDirectory +'gray-broder.png',
		height: 105,
		width: Ti.UI.FILL,
		right: 2,
		top: 0,
		left: 2,   
		zIndex: 2     
	});
	
	var introLabel = Ti.UI.createLabel({
        text: ('As a UIAA member, you gain access to a variety of exclusive benefits that show our appreciation for your support of the UIAA.'),
        color: "#000000",
        textAlign: 'left',
        left: 10,
        right: 10,
        width:  Ti.UI.FILL,
        top: 10,
        font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
                                
     });

 	var table = Ti.UI.createTableView({
        height: 'auto',
        top: 70,
        zIndex: 1 
    });
        
    var linkLabel = Ti.UI.createLabel({
        text: 'IC benefits',
        right: 10,
        top: 60,
        color: 'blue',
        font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
    });
                
   linkLabel.addEventListener('click', function(e){
         (new MapWindow("Iowa City Benefits", tracker)).open();
    });
    
   
		        
    function refreshRssTable() {
		self.add(loading);
		loading.show();
		var xhr = Ti.Network.createHTTPClient({
		    onload: function() {
		    	
		    	
		    
		    
		     textView.add(introLabel);        
		        
		   
		        
		    var xml = this.responseXML;
		    var items = xml.documentElement.getElementsByTagName("item");
		
		    var discount = [];
		    for (var i = 0; i < items.length; i++) {
		         var item = items.item(i);
		
		         discount.push({
		         	title: item.getElementsByTagName('title').item(0).textContent,
		                        link:  item.getElementsByTagName('link').item(0).textContent,
		                        description: item.getElementsByTagName('description').item(0).textContent,
		                });
		        }
		        var data = [];
		        for (var i = 0; i <= discount.length - 1; i++) {
		        	if (i % 2 == 0){
		            	var row = Ti.UI.createTableViewRow({
		                	height: 'auto',
		                    bottom: 10,
		                });
		         	}
		         	
		         	else{
		                var row = Ti.UI.createTableViewRow({
		                     height: 'auto',
		                     backgroundColor:'#cccccc',
		                     bottom: 10,
		                });
		           }
		            var titleLabel = Ti.UI.createLabel({
		                text: (discount[i].title),
		                color: "#000000",
		                textAlign: 'left',
		                height: 20,
		                top: 10,
		                left: 10,
		                font: {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
		            });
		            var descriptionLabel = Ti.UI.createLabel({
		                text: (discount[i].description),
		                color: "#000000",
		                textAlign: 'left',
		                left: 10,
		                top: 31,
		                font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
		            });
		            row.add(titleLabel);
		            row.add(descriptionLabel);
		            data.push(row);
		        };
		        
		        table.addEventListener('click', function(e){
			        tracker.trackEvent({
			            category: "Benefits",
			            action: "click",
			            label: discount[e.index].title,
			            value: 1
			          });
			         new WebView (discount[e.index].link);      
		        });
		        self.add(textView);  
		        textView.add(linkLabel);
		        table.setData(data);
		        self.add(table);
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
module.exports = NationalBenefitsWindow;