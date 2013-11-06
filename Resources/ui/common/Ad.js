var WebView = require('ui/common/WebView');
/*
 * Ad Object
 * Essential attributes
 */

function Ad(post) {

    var row = Ti.UI.createTableViewRow({
		hasChild:true,
		height: 70,
		padding: 0,
		top: 0,
		bottom: 0,
		layout: 'vertical',
		backgroundColor: 'e2e2e2',
		borderRadius: 0.5,
		selectionStyle: 'none'
	});
	row.rightImage = null;
	row.backgroundSelectedImage = null;
	row.backgroundFocusImage = null;

	var container =  Titanium.UI.createView({
		backgroundColor: 'transparent',
			height:			300,
			width: 			300,
			left: 			10,
			top:			-5,
			bottom:			0,
			padding:		0,
			borderRadius:	5
	});


	var imagebox = Ti.UI.createImageView({
		image: post.ad,
		width: 300,
		height: 70,
		hires: true,
		top: 10
		
	});
	
	
	container.add(imagebox);
	

	row.add(container);
	
	row.addEventListener('click', function(e) {
		new WebView (post.link );
	});
	
	return row;

}


module.exports = Ad;
