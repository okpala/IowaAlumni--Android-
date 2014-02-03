var WebView = require('ui/common/WebView');
var GetFeed = require('ui/common/GetFeed');
var SocialMediaIcons = require('ui/common/SocialMediaIcons');

function HomeSMSection(tracker){
	var socialMediaView = Ti.UI.createView({
			
			backgroundColor: 	'#e2e2e2',
			height:				36,
			width: 				300,
			top:				10,
		});
		
		var row = Ti.UI.createTableViewRow({backgroundSelectedColor : "transparent"});
		row.add(socialMediaView);
		
		var icon = new SocialMediaIcons();
	
	var facebookimage = icon.facebook(0,0,tracker);
	var twitterimage = icon.twitter(0,53.6,tracker);
	var instagramimage = icon.instagram(0,107.2,tracker);
	var linkedInimage = icon.linkedIn(0,160.8,tracker);
	var foursquareimage = icon.foursquare(0,214.4,tracker);
	var pinterestimage = icon.pinterest(0,268,tracker);
	
		
	
		//Width (Images)
		pinterestimage.width =  foursquareimage.width = linkedInimage.width = instagramimage.width = twitterimage.width = facebookimage.width = 32;
		
		//Height (Images)
		pinterestimage.height =   foursquareimage.height =  linkedInimage.height = instagramimage.height = twitterimage.height = facebookimage.height = 32;
	//----------------------------------------------------------------------------------------------------------	 
		socialMediaView.add(facebookimage);
		socialMediaView.add(twitterimage);
		socialMediaView.add(instagramimage);
		socialMediaView.add(linkedInimage);
		socialMediaView.add(foursquareimage);
		socialMediaView.add(pinterestimage);
		
		return row;
}

module.exports = HomeSMSection;