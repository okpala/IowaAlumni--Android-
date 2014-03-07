var ApplicationWindow = require('ui/common/ApplicationWindow');
var WebView = require('ui/common/WebView');
var SocialMediaIcons = require('ui/common/SocialMediaIcons');
var StaticAd = require('ui/common/StaticAd');
var Feed = require('ui/common/Feed');
var LoadingScreen = require('ui/common/LoadingScreen');
var ErrorWindow = require('ui/common/ErrorWindow');

function ContactUsWindow(title, tracker) {
	var Feeds = new Feed(); 
	var url = Feeds.adFeed();	
	var self = new ApplicationWindow(title);
	var screenHeight = Ti.Platform.displayCaps.platformHeight;
	var loading = new LoadingScreen();
	var transparentView = Titanium.UI.createView({ 
		backgroundColor: '#ccc',
		opacity:0.9,
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		top: 0,
		zIndex:5,
	});	
	
	
	Ti.API.info(Ti.Platform.displayCaps.density);
	tracker.trackScreen(title);
	function refreshRssTable() {
		var contactView = Ti.UI.createView({
			separatorColor: 	'#d5d5d5',
			backgroundColor: 	'#ffffff',
			height:				160,
			width: 				Ti.UI.FILL,
			left: 				10,
			right:				10,
			top:				10,
			bottom:				0,
			padding:			0,
			borderRadius:		5,
			borderColor: 		'#d5d5d5',
			borderWidth: 		1
		});
			
		var socialMediaView = Ti.UI.createView({
			separatorColor: 	'#d5d5d5',
			backgroundColor: 	'#ffffff',
			height:				160,
			width: 				Ti.UI.FILL,
			left: 				10,
			right:				10,
			top:				180,
			bottom:				0,
			padding:			0,
			borderRadius:		5,
			borderColor: 		'#d5d5d5',
			borderWidth: 		1
				
		});
			
		var socialMediaContainer = Ti.UI.createView({
			backgroundColor: 	'#ffffff',
			height:				160,
			width: 				180,
			top:				37,
				
		});
				
		var scrollMainView = Ti.UI.createScrollView({
			  top: 0,
				backgroundColor:'#e2e2e2',
			  contentWidth: Ti.UI.FILL,
			  contentHeight: 420,
			  showVerticalScrollIndicator: false,
			  showHorizontalScrollIndicator: false
		});
			

		if (screenHeight < 350){
			scrollMainView.showVerticalScrollIndicator = true;
			scrollMainView.bottom = 70;
		}
			
			
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
			tracker.trackEvent({
				category: "General Information",
				action: "click",
				label: "UIAA About Us Site",
				value: 1
			});
			new WebView ('http://www.iowalum.com/about/levitt.cfm');
		}); 
			
			
		var addressLabel = Ti.UI.createLabel({
			text: ("P.O. Box 1970").concat('\n').concat("Iowa City, IA 52244-1970"),
			top: textCurrentTop + 15
		});
			
			
		var phoneLabel = Ti.UI.createLabel({
			text: ("Phone: 319-335-3294").concat('\n').concat("Toll Free: 800-469-2586").concat('\n').concat("FAX: 319-335-1079"),
			top: 85,
			autoLink: Titanium.UI.AUTOLINK_PHONE_NUMBERS,
		});
			
			
		var emailLabel = Ti.UI.createLabel({
			text: "alumni@uiowa.edu",
			autoLink: Titanium.UI.AUTOLINK_EMAIL_ADDRESSES,
			top: 128,
		});
			
		var emailline = Ti.UI.createView({
			width: 				99,
			top:				142			
		});
			
		emailLabel.addEventListener('click', function(e) {
			tracker.trackEvent({
				category: "General Information",
				action: "click",
				label: "UIAA Email Address",
				value: 1
			});
				
		}); 
			
			
			
		// Social Network View
		var socialMdeiaLabel = Ti.UI.createLabel({
			text: "Social Networks",
			left: 10,
			top: 10
		});
			
		var icon = new SocialMediaIcons();
			
		var facebookimage = icon.facebook(0,0,tracker);
		var twitterimage = icon.twitter(0,60,tracker);
		var foursquareimage = icon.foursquare(0,120,tracker);
		var linkedInimage = icon.linkedIn(60,0,tracker);
		var pinterestimage = icon.pinterest(60,60,tracker);
		var instagramimage = icon.instagram(60,120,tracker);
			
			
			
		//---------------------------------------------------------   Adjust Common Arttributes Here  -----------------------------------\\
			
		//Font
			 
		emailLabel.font 
		= phoneLabel.font = addressLabel.font =  levittLabel.font = {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'normal'};
			
		// Font (Header)
		socialMdeiaLabel.font =  contactLabel.font = {fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'bold'} ;
			
		//Text Align(For All Text)
		emailLabel.textAlign = phoneLabel.textAlign = addressLabel.textAlign =  levittLabel.textAlign = 
		socialMdeiaLabel.textAlign =   contactLabel.textAlign = 'left' ;
			
		//Text Color
		phoneLabel.color = addressLabel.color =
		socialMdeiaLabel.color =   contactLabel.color = '#000000' ;
			
			
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
			
			
		transparentView.add(loading);
		loading.show();
		self.add(transparentView);
		var xhr = Ti.Network.createHTTPClient({
		    onload: function() {
		    	
		    	
		    	var xml = this.responseXML;
			   	var items = xml.documentElement.getElementsByTagName("item");
			   	var item = items.item(14);
			   	var adList = [];
				adList.push({                 
					ad: item.getElementsByTagName( 'ad').item(0).textContent,
				    adUrl: item.getElementsByTagName( 'link').item(0).textContent,                  
				});
				var ad = new StaticAd(adList, tracker, title);
				
			  
			//The Different Views
			
			//------------------------------------------   Contact View's Objects  ---------------------------------------------------------\\
			contactView.add(contactLabel);	contactView.add(levittLabel);		contactView.add(addressLabel);
			contactView.add(phoneLabel);	contactView.add(emailLabel);	
			
			
			//------------------------------------------   Social Media View's Objects  ---------------------------------------------------------\\
			
				 socialMediaView.add(socialMdeiaLabel);socialMediaContainer.add(facebookimage); socialMediaContainer.add(twitterimage);socialMediaContainer.add(foursquareimage);socialMediaContainer.add(linkedInimage);
			socialMediaContainer.add(pinterestimage);socialMediaContainer.add(instagramimage); socialMediaView.add(socialMediaContainer);
			//------------------------------------------   Views    ---------------------------------------------------------------------------\\	
			scrollMainView.add(socialMediaView);	scrollMainView.add(contactView);	//scrollMainView.add(ad);
			
			
			self.add(scrollMainView);
			self.add(ad);
			transparentView.remove(loading);
			self.remove(transparentView);
			
			socialMdeiaLabel = null;
			facebookimage = null;
			twitterimage = null;
			foursquareimage = null;
			linkedInimage = null;
			pinterestimage = null;
			instagramimage = null;
			socialMediaContainer = null;
			contactLabel = null;
			levittLabel = null;
			addressLabel = null;
			phoneLabel = null;
			emailLabel = null;
			scrollMainView = null;
			socialMediaView = null;
			contactView = null;
			
			 },
		    onerror: function(e) {
			    transparentView.remove(loading);
			    self.remove(transparentView);
			    Ti.API.debug("STATUS: " + this.status);
			    Ti.API.debug("TEXT:   " + this.responseText);
			    Ti.API.debug("ERROR:  " + e.error);
			    var errorView = new ErrorWindow(refreshRssTable, title, tracker);
				self.add(errorView);
		    },
		    timeout:5000
		});
		 
		xhr.open("GET", url);
		xhr.send();
	}
	refreshRssTable();

	return self;
}



module.exports = ContactUsWindow;