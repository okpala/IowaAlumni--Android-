var WebView = require('ui/common/WebView');
/*
 * Ad Object
 * Essential attributes
 */

function Ad(post, tracker, title) {
	var screenWidth = Ti.Platform.displayCaps.platformWidth;
    var row = Ti.UI.createTableViewRow({
		//hasChild:true,
		height: 70,
		padding: 0,
		top: 0,
		bottom: 0,
		layout: 'vertical',
		backgroundColor: '#e2e2e2',
		borderRadius: 0.5,
		selectionStyle: 'none'
	});


	var container =  Titanium.UI.createView({
		backgroundColor: 'transparent',
			height:			300,
			width: 			screenWidth - 20,
			left: 			10,
			top:			-5,
			bottom:			0,
			padding:		0,
			borderRadius:	5
	});


	var imagebox = Ti.UI.createImageView({
		image: post.ad,
		width: screenWidth - 20,
		height: 70,
		hires: true,
		top: 10
		
	});
	
	
	container.add(imagebox);
	

	row.add(container);
	
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
