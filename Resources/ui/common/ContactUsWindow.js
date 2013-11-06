var ApplicationWindow = require('ui/common/ApplicationWindow');
var WebView = require('ui/common/WebView');
var SocialMediaIcons = require('ui/common/SocialMediaIcons');
var StaticAd = require('ui/common/StaticAd');


function ContactUsWindow(title) {
	

	//The Different Views
	var contactView = Ti.UI.createView({
		separatorColor: 	'd5d5d5',
		backgroundColor: 	'ffffff',
		height:				160,
		width: 				300,
		left: 				10,
		top:				10,
		bottom:				0,
		padding:			0,
		borderRadius:		5,
		borderColor: 		'#d5d5d5',
		borderWidth: 		1
	});
	
	var socialMediaView = Ti.UI.createView({
		separatorColor: 	'd5d5d5',
		backgroundColor: 	'ffffff',
		height:				160,
		width: 				300,
		left: 				10,
		top:				180,
		bottom:				0,
		padding:			0,
		borderRadius:		5,
		borderColor: 		'#d5d5d5',
		borderWidth: 		1
		
	});
		
	var scrollMainView = Ti.UI.createView({
	  top: 0,
	  contentWidth: 320,
	  contentHeight: 420,
	  showVerticalScrollIndicator: false,
	  showHorizontalScrollIndicator: false
	});
	
	var ad = new StaticAd(14,392);
	
	
	
	// The Contact View 
	var textCurrentTop = 0;
	
	var contactLabel = Ti.UI.createLabel({
		text: "Contact Us",
		top: 10
	});
	
	var levittLabel = Ti.UI.createLabel({
		text: "Levitt Center",
		top: 30
	});
	textCurrentTop = levittLabel.top;
	
	var levittline = Ti.UI.createView({
		width: 				67,
		top:				44			
		
	});
	
	levittLabel.addEventListener('click', function(e) {
		new WebView ('http://www.iowalum.com/about/levitt.cfm');
	}); 
	
	
	var addressLabel = Ti.UI.createLabel({
		text: ("P.O. Box 1970").concat('\n').concat("Iowa City, IA 52244-1970"),
		top: textCurrentTop + 15
	});
	
	
	var phoneLabel = Ti.UI.createLabel({
		text: ("Phone: 319/335-3294").concat('\n').concat("Toll Free: 800/469-2586").concat('\n').concat("FAX: 319/335-1079"),
		top: 85
	});
	
	
	var emailLabel = Ti.UI.createLabel({
		text: "alumni@uiowa.edu",
		top: 128
	});
	
	var emailline = Ti.UI.createView({
		width: 				99,
		top:				142			
	});
	
	emailLabel.addEventListener('click', function(e) {
		var emailDialog = Ti.UI.createEmailDialog();
		emailDialog.toRecipients = ['alumni@uiowa.edu'];
		var f = Ti.Filesystem.getFile('cricket.wav');
		emailDialog.addAttachment(f);
		emailDialog.open();
	}); 
	
	
	
	// Social Network View
	var socialMdeiaLabel = Ti.UI.createLabel({
		text: "Social Networks",
		left: 10,
		top: 10
	});
	
	var icon = new SocialMediaIcons();
	
	var facebookimage = icon.facebook(37,55);
	var twitterimage = icon.twitter(37,115);
	var foursquareimage = icon.foursquare(37,175);
	var linkedInimage = icon.linkedIn(97,55);
	var pinterestimage = icon.pinterest(97,115);
	var instagramimage = icon.instagram(97,175);
	
	
	
	//---------------------------------------------------------   Adjust Common Arttributes Here  -----------------------------------\\
	
	//Font
	 
	   emailLabel.font 
	= phoneLabel.font = addressLabel.font =  levittLabel.font = {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'};
	
	// Font (Header)
	socialMdeiaLabel.font =  contactLabel.font = {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'} ;
	
	//Text Align(For All Text)
	 emailLabel.textAlign = phoneLabel.textAlign = addressLabel.textAlign =  levittLabel.textAlign = 
	socialMdeiaLabel.textAlign =   contactLabel.textAlign = 'left' ;
	
	
	//Width (Images)
	instagramimage.width = pinterestimage.width = linkedInimage.width = foursquareimage.width = twitterimage.width = facebookimage.width = 48;
	
	//Height (Images)
	instagramimage.height = pinterestimage.height = linkedInimage.height = foursquareimage.height = twitterimage.height = facebookimage.height = 48;
	 
	 //Link Color
	 emailline.backgroundColor =  levittline.backgroundColor =  emailLabel.color =  levittLabel.color = "blue";
	
	// Line Height
	 emailline.height =  levittline.height = 1 ;
	
	//Left 
	socialMdeiaLabel.left =  contactLabel.left =
	  emailline.left =  levittline.left =  emailLabel.left = phoneLabel.left = addressLabel.left =  levittLabel.left = 10;
	
	
	//------------------------------------------   Contact View's Objects  ---------------------------------------------------------\\
	contactView.add(contactLabel);	contactView.add(levittLabel);	contactView.add(levittline);	contactView.add(addressLabel);
	contactView.add(phoneLabel);	contactView.add(emailLabel);	contactView.add(emailline);
	
	
	//------------------------------------------   Social Media View's Objects  ---------------------------------------------------------\\
	
		socialMediaView.add(socialMdeiaLabel);socialMediaView.add(facebookimage); socialMediaView.add(twitterimage);socialMediaView.add(foursquareimage);socialMediaView.add(linkedInimage);
	socialMediaView.add(pinterestimage);socialMediaView.add(instagramimage); 
	//------------------------------------------   Views    ---------------------------------------------------------------------------\\	
	scrollMainView.add(socialMediaView);	scrollMainView.add(contactView);	scrollMainView.add(ad);
	
	
	
	var self = new ApplicationWindow(title, scrollMainView);
	return self;
}



module.exports = ContactUsWindow;