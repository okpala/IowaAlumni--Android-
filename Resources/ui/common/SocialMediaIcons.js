var WebView = require('ui/common/WebView');

function SocialMediaIcons(){
	return "";
}

SocialMediaIcons.prototype.facebook = function(iconTop, iconLeft) {
	var facebookimage = Ti.UI.createImageView({
	  image:    'facebook.png',
	  top:    iconTop,
	  left: iconLeft
	});
	
	facebookimage.addEventListener('click', function(e) {
		new WebView ('https://www.facebook.com/UIowaAlumni');
	}); 
	
	
	return facebookimage;
};



SocialMediaIcons.prototype.twitter = function(iconTop, iconLeft) {
	var twitterimage = Ti.UI.createImageView({
	  image:    'twitter.png',
	  top:    iconTop,
	  left: iconLeft
	});

	
	twitterimage.addEventListener('click', function(e) {
		new WebView ('https://twitter.com/uiowaAlumni');
	}); 
	
	
	
	return twitterimage;
};

SocialMediaIcons.prototype.foursquare = function(iconTop, iconLeft) {
	var foursquareimage = Ti.UI.createImageView({
	  image:    'fourquare.png',
	  top:   iconTop,
	  left: iconLeft
	});
	
	foursquareimage.addEventListener('click', function(e) {
		new WebView ('https://foursquare.com/uiowaalumni');
	}); 

	return foursquareimage;
};

SocialMediaIcons.prototype.linkedIn = function(iconTop, iconLeft) {
	var linkedInimage = Ti.UI.createImageView({
	  image:    'linkedin.png',
	  top:    iconTop,
	  left: iconLeft
	});
	
	
	linkedInimage.addEventListener('click', function(e) {
		new WebView ('http://www.linkedin.com/groups?gid=1814071&trk=hb_side_g');
	}); 
	
	
	
	return linkedInimage;
};



SocialMediaIcons.prototype.pinterest = function(iconTop, iconLeft) {
	var pinterestimage = Ti.UI.createImageView({
	  image:    'pinterest.png',
	   top:   iconTop,
	  left: iconLeft
	});

	pinterestimage.addEventListener('click', function(e) {
		new WebView ('https://www.pinterest.com/uiowaalumni');
	}); 
	
	
	return pinterestimage;
};

SocialMediaIcons.prototype.instagram = function(iconTop, iconLeft) {
	var instagramimage = Ti.UI.createImageView({
	  image:    'instagram.png',
	  top:    iconTop,
	  left: iconLeft
	});
	
	instagramimage.addEventListener('click', function(e) {
		new WebView ('http://instagram.com/uiowaalumni');
	
	}); 
	
	return instagramimage;
};

module.exports = SocialMediaIcons;
