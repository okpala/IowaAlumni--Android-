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
