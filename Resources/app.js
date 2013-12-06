/*
* A master detail view, utilizing a native table view component and platform-specific UI and navigation. 
* A starting point for a navigation-based application with hierarchical data, or a stack of windows. 
* Requires Titanium Mobile SDK 1.8.0+.
* 
* In app.js, we generally take care of a few things:
* - Bootstrap the application with any data we need
* - Check for dependencies like device type, platform version or network connection
* - Require and open our top-level UI component
*  
*/
var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		screenHeight = Ti.Platform.displayCaps.platformHeight,
		screenWidth = Ti.Platform.displayCaps.platformWidth;
//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}

// This is a single context application with mutliple windows in a stack
(function() {
	//determine platform and form factor and render approproate components
	
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (screenWidth > 899 || screenHeight > 899));
	
	var Window;
	if (isTablet) {
		Window = require('ui/tablet/ApplicationWindow');
	}
	else {
		// iPhone and Mobile Web make use of the platform-specific navigation controller,
		// all other platforms follow a similar UI pattern
		if (osname === 'iphone') {
			Window = require('ui/handheld/ios/ApplicationWindow');
		}
		else if (osname == 'mobileweb') {
			Window = require('ui/handheld/mobileweb/ApplicationWindow');
		}
		else {
			Window = require('ui/handheld/android/ApplicationWindow');
		}
	}
	
	var ContactUsWindow = require('ui/common/ContactUsWindow');
	var StatesWindow = require('ui/common/StatesWindow');
	var MapWindow = require('ui/common/MapWindow');
	var MemberCardWindow = require('ui/common/MemberCardWindow');
	var RootWindow = require('ui/common/RootWindow');
	var EventsWindow = require('ui/common/EventsWindow');
	var ArticlesWindow = require('ui/common/ArticlesWindow');
	var Feed = require('ui/common/Feed');
	var MenuRow = require('ui/common/MenuRow');
	var NationalBenefitsWindow = require('ui/common/NationalBenefitsWindow');
	var Feeds = new Feed();
	var GetFeed = require('ui/common/GetFeed');
	var Window = require('ui/handheld/android/ApplicationWindow');
	
	var win = Titanium.UI.createWindow({
		    backgroundColor:'#000',
		    zIndex: 2
	});
	
	var logorowHeight = 125;
		var logosLeft = 10;
		//UIAA logo 
		var logorow = Ti.UI.createImageView({
			height: 125,
			width: screenWidth,
			top: 0,
			backgroundImage: 'menubg.jpg'
			
		});
		
		var logo = Ti.UI.createImageView({
			image: 'logo.png',
			width: 210,
			height: 75,
			top: 25,
			left: logosLeft,
			hires: true
			
		});
		
		
		
		win.add(logorow);
		win.add(logo);
//"Once a Hawkeye" Image
		var taglinerowHeight = 120;
		var taglinerow = Ti.UI.createImageView({
			height: taglinerowHeight,
			width: screenWidth,
			bottom: 0,
			backgroundImage: 'menubg.jpg'
			
		});
		var tagline = Ti.UI.createImageView({
			image: 'tagline.png',
			width: 200,
			height: 40,
			bottom: 50,
			left: logosLeft,
			
		
		});
		
		
		
		// Menu Titles
		var iowaInsiderTitle = 'Iowa Insider Blog';
		var  alumniMagazineTitle = 'Iowa Alumni Magazine';
		var eventsTitle = 'Events';
		var memberBenefitsTitle = 'Member Benefits';
		var memberCardTitle = 'Member Benefits Card';
		var clubsTitle = 'Clubs and Game Watches';
		var contactUsTitle = 'Contact Us';
		var home = 'Home';
		
		var menuTitles = [
			(new MenuRow(home,'home','',true)),
			(new MenuRow(eventsTitle,'events',Feeds.eventsFeed(),false)),
			(new MenuRow(clubsTitle,'clubs','',false)),
			(new MenuRow(memberBenefitsTitle,'memberbenefits','',false)),
			(new MenuRow(memberCardTitle,'membercard','',false)),
			(new MenuRow(alumniMagazineTitle,'magazine',Feeds.magazineFeed(),false)),
			
		    (new MenuRow( iowaInsiderTitle,'insider',Feeds.iowaInsiderFeed(),false)),
		    (new MenuRow(contactUsTitle,'info','',false))
		];

		// Tableview
		var tableView = Ti.UI.createTableView({
			separatorColor: '#000000',
			//backgroundImage: 'menubg.jpg',
		    //footerTitle:'',
		    //backgroundColor: "#000000",
		    top: logorowHeight,
		    //height: screenHeight - (taglinerowHeight + logorowHeight),
		   bottom: taglinerowHeight
		});
		tableView.setData(menuTitles); // Set the menu in the Home page
		win.add(tableView);
		win.add(taglinerow);
		win.add(tagline);
		
		

	
	win.open();
	
	
	var win2 = new RootWindow();
	
	win2.open();
	
	tableView.addEventListener('click', function(e) {
		if(e.row.feedTitle==home) {
				var win2 = new RootWindow();
				win2.open();
				menuTitles = [
					(new MenuRow(home,'home','',true)),
				    (new MenuRow(eventsTitle,'events',Feeds.eventsFeed(),false)),
					(new MenuRow(clubsTitle,'clubs','',false)),
					(new MenuRow(memberBenefitsTitle,'memberbenefits','',false)),
					(new MenuRow(memberCardTitle,'membercard','',false)),
					(new MenuRow(alumniMagazineTitle,'magazine',Feeds.magazineFeed(),false)),
				    (new MenuRow( iowaInsiderTitle,'insider',Feeds.iowaInsiderFeed(),false)),
				    (new MenuRow(contactUsTitle,'info','',false))
				];
				tableView.setData(menuTitles); 
				win.add(tableView);
				win.navBarHidden = true;
			
			}
		else if(e.row.feedTitle==contactUsTitle) {
				var win2 = new ContactUsWindow(contactUsTitle);
				win2.open();
				menuTitles = [
					(new MenuRow(home,'home','',false)),
				    (new MenuRow(eventsTitle,'events',Feeds.eventsFeed(),false)),
					(new MenuRow(clubsTitle,'clubs','',false)),
					(new MenuRow(memberBenefitsTitle,'memberbenefits','',false)),
					(new MenuRow(memberCardTitle,'membercard','',false)),
					(new MenuRow(alumniMagazineTitle,'magazine',Feeds.magazineFeed(),false)),
				    (new MenuRow( iowaInsiderTitle,'insider',Feeds.iowaInsiderFeed(),false)),
				    (new MenuRow(contactUsTitle,'info','',true))
				];
				tableView.setData(menuTitles); 
				win.add(tableView);
			}
			
		else if(e.row.feedTitle==memberCardTitle){
				var win2 = new MemberCardWindow(memberCardTitle);
				win2.open();
				menuTitles = [
					(new MenuRow(home,'home','',false)),
				    (new MenuRow(eventsTitle,'events',Feeds.eventsFeed(),false)),
					(new MenuRow(clubsTitle,'clubs','',false)),
					(new MenuRow(memberBenefitsTitle,'memberbenefits','',false)),
					(new MenuRow(memberCardTitle,'membercard','',true)),
					(new MenuRow(alumniMagazineTitle,'magazine',Feeds.magazineFeed(),false)),
				    (new MenuRow( iowaInsiderTitle,'insider',Feeds.iowaInsiderFeed(),false)),
				    (new MenuRow(contactUsTitle,'info','',false))
				];
				tableView.setData(menuTitles);
				win.add(tableView);
			}
			
		else if(e.row.feedTitle==clubsTitle) {
				var win2 = new StatesWindow(clubsTitle);
				win2.open();
				menuTitles = [
					(new MenuRow(home,'home','',false)),
				    (new MenuRow(eventsTitle,'events',Feeds.eventsFeed(),false)),
					(new MenuRow(clubsTitle,'clubs','',true)),
					(new MenuRow(memberBenefitsTitle,'memberbenefits','',false)),
					(new MenuRow(memberCardTitle,'membercard','',false)),
					(new MenuRow(alumniMagazineTitle,'magazine',Feeds.magazineFeed(),false)),
				    (new MenuRow( iowaInsiderTitle,'insider',Feeds.iowaInsiderFeed(),false)),
				    (new MenuRow(contactUsTitle,'info','',false))
				];
				tableView.setData(menuTitles); 
				win.add(tableView);
			}
			
			
		else if(e.row.feedTitle==memberBenefitsTitle) {
				var win2 = new NationalBenefitsWindow();
				win2.open();
				menuTitles = [
					(new MenuRow(home,'home','',false)),
				    (new MenuRow(eventsTitle,'events',Feeds.eventsFeed(),false)),
					(new MenuRow(clubsTitle,'clubs','',false)),
					(new MenuRow(memberBenefitsTitle,'memberbenefits','',true)),
					(new MenuRow(memberCardTitle,'membercard','',false)),
					(new MenuRow(alumniMagazineTitle,'magazine',Feeds.magazineFeed(),false)),
				    (new MenuRow( iowaInsiderTitle,'insider',Feeds.iowaInsiderFeed(),false)),
				    (new MenuRow(contactUsTitle,'info','',false))
				];
				tableView.setData(menuTitles); 
				win.add(tableView);
			}
			
			else if(e.row.feedTitle==alumniMagazineTitle) {
				var win2 = new ArticlesWindow(e.row.feedTitle, e.row.feed);
				win2.open();
				menuTitles = [
					(new MenuRow(home,'home','',false)),
				    (new MenuRow(eventsTitle,'events',Feeds.eventsFeed(),false)),
					(new MenuRow(clubsTitle,'clubs','',false)),
					(new MenuRow(memberBenefitsTitle,'memberbenefits','',false)),
					(new MenuRow(memberCardTitle,'membercard','',false)),
					(new MenuRow(alumniMagazineTitle,'magazine',Feeds.magazineFeed(),true)),
				    (new MenuRow( iowaInsiderTitle,'insider',Feeds.iowaInsiderFeed(),false)),
				    (new MenuRow(contactUsTitle,'info','',false))
				];
				tableView.setData(menuTitles); 
				win.add(tableView);
				win.navBarHidden = true;
			}
			
			else if(e.row.feedTitle==iowaInsiderTitle) {
				var win2 = new ArticlesWindow(e.row.feedTitle, e.row.feed);
				win2.open();
				menuTitles = [
					(new MenuRow(home,'home','',false)),
				    (new MenuRow(eventsTitle,'events',Feeds.eventsFeed(),false)),
					(new MenuRow(clubsTitle,'clubs','',false)),
					(new MenuRow(memberBenefitsTitle,'memberbenefits','',false)),
					(new MenuRow(memberCardTitle,'membercard','',false)),
					(new MenuRow(alumniMagazineTitle,'magazine',Feeds.magazineFeed(),false)),
				    (new MenuRow( iowaInsiderTitle,'insider',Feeds.iowaInsiderFeed(),true)),
				    (new MenuRow(contactUsTitle,'info','',false))
				];
				tableView.setData(menuTitles); 
				win.add(tableView);
				win.navBarHidden = true;
				
			}
			
			else if(e.row.feedTitle==eventsTitle) {
				var win2 = new  EventsWindow (e.row.feedTitle);
				win2.open();
				//var win = new EventsHomeWindow(eventsTitle);
				menuTitles = [
					(new MenuRow(home,'home','',false)),
				    (new MenuRow(eventsTitle,'events',Feeds.eventsFeed(),true)),
					(new MenuRow(clubsTitle,'clubs','',false)),
					(new MenuRow(memberBenefitsTitle,'memberbenefits','',false)),
					(new MenuRow(memberCardTitle,'membercard','',false)),
					(new MenuRow(alumniMagazineTitle,'magazine',Feeds.magazineFeed(),false)),
				    (new MenuRow( iowaInsiderTitle,'insider',Feeds.iowaInsiderFeed(),false)),
				    (new MenuRow(contactUsTitle,'info','',false))
				];
				tableView.setData(menuTitles); 
				win.add(tableView);
				win.navBarHidden = true;
			}
	});
			
})();
