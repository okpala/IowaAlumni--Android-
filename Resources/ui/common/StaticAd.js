var GetFeed = require('ui/common/GetFeed');
var FormatDate = require('ui/common/FormatDate');
var WebView = require('ui/common/WebView');
var Feed = require('ui/common/Feed');
/*
 * Add an Ad at the bottom of a window.
 * Parameter "index" determine what ad is selected 
 * from the database.
 */
function StaticAd(adList, tracker, title){
	var screenWidth = Ti.Platform.displayCaps.platformWidth;
	var ad = Ti.UI.createImageView({
	  image:    adList[0].ad,
	  width: screenWidth,
	  height: 70,
	  bottom:0,
	  left: 0
	  
	});
	ad.addEventListener('click', function(e) {
		tracker.trackEvent({
				category: "Ad",
				action: "click",
				label: "An Ad in the " + title + "'s Window - " + adList[0].ad,
				value: 1
		});
		new WebView (adList[0].adUrl);
		
	}); 	
	
	return ad;
}

module.exports = StaticAd;
