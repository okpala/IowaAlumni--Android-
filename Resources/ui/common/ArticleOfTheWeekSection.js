var Feed = require('ui/common/Feed');
var SinglePost= require('ui/common/SinglePost');
function ArticleOfTheWeekSection(){
	var Feeds = new Feed();
	var url = Feeds.articleOfTheWeekFeed();

var table = Ti.UI.createTableView();
var rows = [];


  
var xhr = Ti.Network.createHTTPClient({
    onload: function() {
    // Ti.API.debug(this.responseText);
 	
    var xml = this.responseXML;
	   	var items = xml.documentElement.getElementsByTagName("item");
	   	var item = items.item(0);
	   
	  	var  data = [];
	   		
				data.push({                 
                   title: item.getElementsByTagName( 'title').item(0).textContent,
                   image: item.getElementsByTagName( 'image').item(0).textContent,
                   url: item.getElementsByTagName( 'link').item(0).textContent,
                   description: item.getElementsByTagName( 'description').item(0).textContent,
                   pubDate: item.getElementsByTagName( 'pubDate').item(0).textContent
				});
				
			
			var row = new SinglePost(data[0]);
			
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
	
		return table;
} 
module.exports = ArticleOfTheWeekSection;
