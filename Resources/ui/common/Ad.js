var WebView = require('ui/common/WebView');
var createCachingImageView = require('ui/common/createRemoteImageView2');
/*
 * Ad Object
 * Essential attributes
 */

function Ad(post, tracker, title) {
	
    var row = Ti.UI.createTableViewRow({
		height: 'auto',
		padding: 0,
		top: 0,
		bottom: 0,
		layout: 'vertical',
		backgroundColor: '#e2e2e2',
		borderRadius: 0.5,
		selectionStyle: 'none',
		backgroundSelectedImage: "transparent"
	});

	var imagebox = createCachingImageView.createCachingImageView({
		image: post.ad,
		width: Ti.UI.FILL,
		height: Ti.UI.FILL,
		left: 10,
		right: 10,
		top: 10
		
	});

	row.add(imagebox);
	imagebox = null;
	
	row.addEventListener('click', function(e) {
		tracker.trackEvent({
				category: "Ads",
				action: "click",
				label: "An Ad in the " + title + "'s Window - " + post.ad,
				value: 1
		});
		new WebView (post.adUrl );
	});
	
	return row;

}


module.exports = Ad;
