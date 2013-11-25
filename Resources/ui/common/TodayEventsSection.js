var Feed = require('ui/common/Feed');
var SingleRow = require('ui/common/SingleRow');

function TodayEventsSection(){
	var Feeds = new Feed();
	var url = Feeds.todayEventsFeed();

var table = Ti.UI.createTableView();
var rows = [];
var row = Ti.UI.createTableViewRow();
 
var xhr = Ti.Network.createHTTPClient({
    onload: function() {
    // Ti.API.debug(this.responseText);
 	
    var xml = this.responseXML;
	   	var items = xml.documentElement.getElementsByTagName("item");
	   	var item = items.item(0);
	   
	  var data = [];
	   		for (var i = 0; i < items.length; i++) {
	   			var item = items.item(i);
	   			if (url == Feeds.sliderImagesFeed()){
				data.push({
					
					 snl: item.getElementsByTagName( 'snl').item(0).textContent,
                                        place: item.getElementsByTagName( 'place').item(0).textContent,
                                        title: item.getElementsByTagName( 'title').item(0).textContent,
                                        url: item.getElementsByTagName( 'link').item(0).textContent,
                                        description: item.getElementsByTagName( 'description').item(0).textContent,
                                        pubDate: item.getElementsByTagName( 'pubDate').item(0).textContent
				});
				
				}
					
			}
			
			if(data.length > 0){
			var eventHeaderLabel = Ti.UI.createLabel({
				text: "Today's Events",
				width: 300,
				top: 10,
				left: 10,
				font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
			});
			
			var row = Ti.UI.createTableViewRow();
			row.add(eventHeaderLabel);
			
			rows.push(row);
			
			
			for (var i = 0; i < data.length; i++) {
				var row = new SingleRow (data[i]);
				
				rows.push(row);
			}
		} 	
		
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
	
		return rows;
} 
module.exports = TodayEventsSection;
