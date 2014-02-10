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
	
	var ContactUsWindow = require('ui/common/ContactUsWindow');
	var StatesWindow = require('ui/common/StatesWindow');
	var MemberCardWindow = require('ui/common/MemberCardWindow');
	var RootWindow = require('ui/common/RootWindow');
	var EventsWindow = require('ui/common/EventsWindow');
	var ArticlesWindow = require('ui/common/ArticlesWindow');
	var Feed = require('ui/common/Feed');
	var MenuRow = require('ui/common/MenuRow');
	var NationalBenefitsWindow = require('ui/common/NationalBenefitsWindow');
	var Tracker = require('ui/common/Tracker');
	
	var tracker = new Tracker();
	var Feeds = new Feed();
	
	var win = Titanium.UI.createWindow({
		    
		    backgroundImage:'menubg.jpg',
		    navBarHidden : true,
		    exitOnClose: true,
	});
	
	
	
	var logorowHeight = 125;
		var logosLeft = 10;
		
		/*
		//UIAA logo 
		var logorow = Ti.UI.createView({
			height: 125,
			width: screenWidth,
			top: 0,
			backgroundColor: 'transparent',
			//backgroundImage: 'menubg.jpg'
		
		});
		*/
		var logo = Ti.UI.createImageView({
			image: Ti.Filesystem.resourcesDirectory + 'logo.png',
			width: 210,
			height: 75,
			top: 25,
			left: logosLeft,
			//hires: true
			
		});
		
		
	
		win.add(logo);
		logo = null;
		//"Once a Hawkeye" Image
		var taglinerowHeight = 120;
		/*
		var taglinerow = Ti.UI.createImageView({
			height: taglinerowHeight,
			width: screenWidth,
			bottom: 0,
			zIndex: 2,
			backgroundColor: 'transparent'
			
		});
		*/
		var tagline = Ti.UI.createImageView({
			image: Ti.Filesystem.resourcesDirectory + 'tagline.png',
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
			(new MenuRow(home,'home','',false)),
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
		    top: logorowHeight,
		   	bottom: taglinerowHeight
		});
		tableView.setData(menuTitles); // Set the menu in the Home page
		win.add(tableView);
		win.add(tagline);
		tagline = null;
	win.open();
	
	
	
	tableView.addEventListener('click', function(e) {
		if(e.row.feedTitle==home) {
				var win2 = new RootWindow(home, tracker);
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
				var win2 = new ContactUsWindow(contactUsTitle, tracker);
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
				var win2 = new MemberCardWindow(memberCardTitle, tracker);
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
				var win2 = new StatesWindow(clubsTitle, tracker);
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
				var win2 = new NationalBenefitsWindow(e.row.feedTitle, tracker);
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
				var win2 = new ArticlesWindow(e.row.feedTitle, e.row.feed, tracker);
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
				var win2 = new ArticlesWindow(e.row.feedTitle, e.row.feed, tracker);
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
				var win2 = new  EventsWindow (e.row.feedTitle, tracker);
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

/*
var MapModule = require('ti.map');
var win = Ti.UI.createWindow({backgroundColor: 'white'});
var appc = MapModule.createAnnotation({
    latitude: 37.389569,
    longitude: -122.050212,
    title: 'Appcelerator HQ',
    subtitle: 'Mountain View, CA',
    pincolor: MapModule.ANNOTATION_GREEN,
    draggable: true
});
var mapview = MapModule.createView({
    mapType: MapModule.NORMAL_TYPE,
    region: {latitude: 37.389569, longitude: -122.050212, latitudeDelta: 0.2, longitudeDelta: 0.2},
    annotations: [appc]
});

win.add(mapview);
win.open();
*/