var GetFeed = require('ui/common/GetFeed');
var FormatDate = require('ui/common/FormatDate');
var WebView = require('ui/common/WebView');
var Feed = require('ui/common/Feed');
/*
 * Add an Ad at the bottom of a window.
 * Parameter "index" determine what ad is selected 
 * from the database.
 */
function StaticAd(index, topPosition){
	var Feeds = new Feed();
	var url = Feeds.articleOfTheWeekFeed();
	var xhr = Ti.Network.createHTTPClient({
    onload: function() {
    // Ti.API.debug(this.responseText);
 	
    var xml = this.responseXML;
	   	var items = xml.documentElement.getElementsByTagName("item");
	   	var item = items.item(0);
	   
	  	var  data = [];
	   		
				data.push({                 
                   ad: item.getElementsByTagName( 'ad').item(0).textContent,
                   adUrl: item.getElementsByTagName( 'adUrl').item(0).textContent,
                  
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
	var currentAd = new GetFeed(Feeds.staticaAdFeed());
	var ad = Ti.UI.createImageView({
	  image:    currentAd[index].ad,
	  width: 320,
	  height: 70,
	  bottom:0,
	  left: 0
	  
	});
	ad.addEventListener('click', function(e) {
		new WebView (currentAd[index].adUrl);
	}); 	
	
	return ad;
}

module.exports = StaticAd;
