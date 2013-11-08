	var ContactUsWindow = require('ui/common/ContactUsWindow');
		var ClubsWindow = require('ui/common/ClubsWindow');
		var MapWindow = require('ui/common/MapWindow');
		var MemberCardWindow = require('ui/common/MemberCardWindow');
		var RootWindow = require('ui/common/RootWindow');
		var Feed = require('ui/common/Feed');
		var MenuRow = require('ui/common/MenuRow');
		var NationalBenefitsWindow = require('ui/common/NationalBenefitsWindow');
		var Feed = new Feed();


var osname = Ti.Platform.osname,
	screenHeight = Ti.Platform.displayCaps.platformHeight,
	screenWidth = Ti.Platform.displayCaps.platformWidth;

var win = Titanium.UI.createWindow({
    //title:'Query7 RSS Feed',
    backgroundColor:'#000',
    left: 0
    
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
			(new MenuRow(eventsTitle,'events',Feed.eventsFeed(),false)),
			(new MenuRow(clubsTitle,'clubs','',false)),
			(new MenuRow(memberBenefitsTitle,'memberbenefits','',false)),
			(new MenuRow(memberCardTitle,'membercard','',false)),
			(new MenuRow(alumniMagazineTitle,'magazine',Feed.magazineFeed(),false)),
		    (new MenuRow( iowaInsiderTitle,'insider',Feed.iowaInsiderFeed(),false)),
		    (new MenuRow(contactUsTitle,'info','',false))
		];

		// Tableview
		var tableView = Ti.UI.createTableView({
			separatorColor: '000000',
			//backgroundImage: 'menubg.jpg',
		    //footerTitle:'',
		    //backgroundColor: "#000000",
		    top: logorowHeight,
		    height: screenHeight - (taglinerowHeight + logorowHeight),
		   bottom: taglinerowHeight
		});
		tableView.setData(menuTitles); // Set the menu in the Home page
		win.add(tableView);
		win.add(taglinerow);
		win.add(tagline);
		
		

	
	win.open();
	var win2 = new RootWindow();
	win2.open();
	
	

/*
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}
else {
	// This is a single context application with multiple windows in a stack
	
	(function() {
		
		//determine platform and form factor and render appropriate components
		
		var osname = Ti.Platform.osname,
			height = Ti.Platform.displayCaps.platformHeight,
			width = Ti.Platform.displayCaps.platformWidth;
		
		//considering tablet to have one dimension over 900px - can define your own
		var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
		
		var Window;
		if (isTablet) {
			Window = require('ui/tablet/ApplicationWindow');
		}
		else {
			if (osname === 'android') {
				
				Tabs = require('ui/handheld/android/ApplicationWindow');
			}
			else if (osname === 'mobileweb') {
				Window = require('ui/handheld/mobileweb/ApplicationWindow');
			}
			else {
				Window = require('ui/handheld/ios/ApplicationWindow');
			}
		}
		
		var ContactUsWindow = require('ui/common/ContactUsWindow');
		var ClubsWindow = require('ui/common/ClubsWindow');
		var MapWindow = require('ui/common/MapWindow');
		var MemberCardWindow = require('ui/common/MemberCardWindow');
		var RootWindow = require('ui/common/RootWindow');
		var Feed = require('ui/common/Feed');
		var MenuRow = require('ui/common/MenuRow');
		var NationalBenefitsWindow = require('ui/common/NationalBenefitsWindow');
		var Feed = new Feed();
		
	
		
		
		//// ---- Menu window, positioned on the left
		var menuWindow = Ti.UI.createWindow({
			backgroundColor: "000"
		});
		menuWindow.open();
	/*
		//UIAA logo 
		var logorow = Ti.UI.createImageView({
			height: 125,
			width: 270,
			top: 0,
			backgroundImage: 'menubg.jpg'
			
		});
		
		var logo = Ti.UI.createImageView({
			image: 'logo.png',
			width: 210,
			height: 75,
			top: 25,
			left: 10,
			hires: true
			
		});
		
		
		
		menuWindow.add(logorow);
		menuWindow.add(logo);
		
		var taglineTop = 400;
		var tableHeight = 270;
		if(height > 500){
			taglineTop = 500;
			tableHeight = 355;
		}
		
		//"Once a Hawkeye" Image
		var taglinerow = Ti.UI.createImageView({
			height: 250,
			width: 270,
			top: 350,
			backgroundImage: 'menubg.jpg'
			
		});
		
		var tagline = Ti.UI.createImageView({
			image: 'tagline.png',
			width: 200,
			height: 40,
			top: taglineTop,
			left: 10
		});

		menuWindow.add(taglinerow);
		menuWindow.add(tagline);
		
		//// ---- Menu Table
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
			(new MenuRow(eventsTitle,'events',Feed.eventsFeed(),false)),
			(new MenuRow(clubsTitle,'clubs','',false)),
			(new MenuRow(memberBenefitsTitle,'memberbenefits','',false)),
			(new MenuRow(memberCardTitle,'membercard','',false)),
			(new MenuRow(alumniMagazineTitle,'magazine',Feed.magazineFeed(),false)),
		    (new MenuRow( iowaInsiderTitle,'insider',Feed.iowaInsiderFeed(),false)),
		    (new MenuRow(contactUsTitle,'info','',false))
		];

		// Tableview
		var tableView = Ti.UI.createTableView({
			separatorColor: '000000',
			backgroundImage: 'menubg.jpg',
		    //footerTitle:'',
		    backgroundColor: "#000000",
		    height: tableHeight,
		    top: 105
		});
		tableView.setData(menuTitles); // Set the menu in the Home page
		menuWindow.add(tableView);
		
		// Main window
		
		var win = new RootWindow();
		
		win.moving = false;
		win.axis = 0;
		win.navBarHidden = true;
		
		//// ---- Window with navigationGroup
		var navWindow = Ti.UI.createWindow({
		    width:320, // Set the width of the sliding window to avoid cut out from animation
			navBarHidden:true
		});
		menuWindow.open();
		
		navWindow.open();
		menuWindow.width = 270;

		
		// NavigationGroup
		var navGroup = Ti.UI.iPhone.createNavigationGroup({
		    window:win
		});
		navWindow.add(navGroup);

		//menu button action
		win.addEventListener('menuClick', function(e){
			
		    // If the menu is opened
		    if(e.source.toggle == true){
		        navWindow.animate({
		            left:0,
		            duration:400,
		            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
		        });
		        e.source.toggle = false;
		    }
		    // If the menu isn't opened
		    else{
		        navWindow.animate({
		            left:270,
		            duration:400,
		            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
		        });
		        e.source.toggle  = true;
		    }
		    
		    });

		tableView.addEventListener('click', function(e) {
			//// ---- Window with navigationGroup
			var navWindow = Ti.UI.createWindow({
			    width:320, // Set the width of the sliding window to avoid cut out from animation
				navBarHidden:true
			});
			menuWindow.open();
			navWindow.open();
			menuWindow.width = 270;

			
			Ti.API.info(e.row.feedTitle);
			
			// Navigate to the item selected
			if(e.row.feedTitle==iowaInsiderTitle) {
				var win = new Window(e.row.feed,e.row.feedTitle);
				menuTitles = [
					(new MenuRow(home,'home','',false)),
				    (new MenuRow(eventsTitle,'events',Feed.eventsFeed(),false)),
					(new MenuRow(clubsTitle,'clubs','',false)),
					(new MenuRow(memberBenefitsTitle,'memberbenefits','',false)),
					(new MenuRow(memberCardTitle,'membercard','',false)),
					(new MenuRow(alumniMagazineTitle,'magazine',Feed.magazineFeed(),false)),
				    (new MenuRow( iowaInsiderTitle,'insider',Feed.iowaInsiderFeed(),true)),
				    (new MenuRow(contactUsTitle,'info','',false))
				];
				tableView.setData(menuTitles); 
				menuWindow.add(tableView);
				win.navBarHidden = true;
				
			}
			
			else if(e.row.feedTitle==home) {
				var win =  new RootWindow();
				
				menuTitles = [
					(new MenuRow(home,'home','',true)),
				    (new MenuRow(eventsTitle,'events',Feed.eventsFeed(),false)),
					(new MenuRow(clubsTitle,'clubs','',false)),
					(new MenuRow(memberBenefitsTitle,'memberbenefits','',false)),
					(new MenuRow(memberCardTitle,'membercard','',false)),
					(new MenuRow(alumniMagazineTitle,'magazine',Feed.magazineFeed(),false)),
				    (new MenuRow( iowaInsiderTitle,'insider',Feed.iowaInsiderFeed(),false)),
				    (new MenuRow(contactUsTitle,'info','',false))
				];
				tableView.setData(menuTitles); 
				menuWindow.add(tableView);
				win.navBarHidden = true;
			}
			
			else if(e.row.feedTitle==alumniMagazineTitle) {
				var win = new Window(e.row.feed,e.row.feedTitle);
				menuTitles = [
					(new MenuRow(home,'home','',false)),
				    (new MenuRow(eventsTitle,'events',Feed.eventsFeed(),false)),
					(new MenuRow(clubsTitle,'clubs','',false)),
					(new MenuRow(memberBenefitsTitle,'memberbenefits','',false)),
					(new MenuRow(memberCardTitle,'membercard','',false)),
					(new MenuRow(alumniMagazineTitle,'magazine',Feed.magazineFeed(),true)),
				    (new MenuRow( iowaInsiderTitle,'insider',Feed.iowaInsiderFeed(),false)),
				    (new MenuRow(contactUsTitle,'info','',false))
				];
				tableView.setData(menuTitles); 
				menuWindow.add(tableView);
				win.navBarHidden = true;
			}
			
			else if(e.row.feedTitle==eventsTitle) {
				var win = new Window(e.row.feed,e.row.feedTitle);
				//var win = new EventsHomeWindow(eventsTitle);
				menuTitles = [
					(new MenuRow(home,'home','',false)),
				    (new MenuRow(eventsTitle,'events',Feed.eventsFeed(),true)),
					(new MenuRow(clubsTitle,'clubs','',false)),
					(new MenuRow(memberBenefitsTitle,'memberbenefits','',false)),
					(new MenuRow(memberCardTitle,'membercard','',false)),
					(new MenuRow(alumniMagazineTitle,'magazine',Feed.magazineFeed(),false)),
				    (new MenuRow( iowaInsiderTitle,'insider',Feed.iowaInsiderFeed(),false)),
				    (new MenuRow(contactUsTitle,'info','',false))
				];
				tableView.setData(menuTitles); 
				menuWindow.add(tableView);
				win.navBarHidden = true;
			}

			else if(e.row.feedTitle==memberBenefitsTitle) {
				var win = new NationalBenefitsWindow();
				menuTitles = [
					(new MenuRow(home,'home','',false)),
				    (new MenuRow(eventsTitle,'events',Feed.eventsFeed(),false)),
					(new MenuRow(clubsTitle,'clubs','',false)),
					(new MenuRow(memberBenefitsTitle,'memberbenefits','',true)),
					(new MenuRow(memberCardTitle,'membercard','',false)),
					(new MenuRow(alumniMagazineTitle,'magazine',Feed.magazineFeed(),false)),
				    (new MenuRow( iowaInsiderTitle,'insider',Feed.iowaInsiderFeed(),false)),
				    (new MenuRow(contactUsTitle,'info','',false))
				];
				tableView.setData(menuTitles); 
				menuWindow.add(tableView);
			}
			
			else if(e.row.feedTitle==clubsTitle) {
				var win = new ClubsWindow(clubsTitle);
				menuTitles = [
					(new MenuRow(home,'home','',false)),
				    (new MenuRow(eventsTitle,'events',Feed.eventsFeed(),false)),
					(new MenuRow(clubsTitle,'clubs','',true)),
					(new MenuRow(memberBenefitsTitle,'memberbenefits','',false)),
					(new MenuRow(memberCardTitle,'membercard','',false)),
					(new MenuRow(alumniMagazineTitle,'magazine',Feed.magazineFeed(),false)),
				    (new MenuRow( iowaInsiderTitle,'insider',Feed.iowaInsiderFeed(),false)),
				    (new MenuRow(contactUsTitle,'info','',false))
				];
				tableView.setData(menuTitles); 
				menuWindow.add(tableView);
			}
			
			else if(e.row.feedTitle==contactUsTitle) {
				var win = new ContactUsWindow(contactUsTitle);
				menuTitles = [
					(new MenuRow(home,'home','',false)),
				    (new MenuRow(eventsTitle,'events',Feed.eventsFeed(),false)),
					(new MenuRow(clubsTitle,'clubs','',false)),
					(new MenuRow(memberBenefitsTitle,'memberbenefits','',false)),
					(new MenuRow(memberCardTitle,'membercard','',false)),
					(new MenuRow(alumniMagazineTitle,'magazine',Feed.magazineFeed(),false)),
				    (new MenuRow( iowaInsiderTitle,'insider',Feed.iowaInsiderFeed(),false)),
				    (new MenuRow(contactUsTitle,'info','',true))
				];
				tableView.setData(menuTitles); 
				menuWindow.add(tableView);
			}
			else {
				var win = new MemberCardWindow(memberCardTitle);
				menuTitles = [
					(new MenuRow(home,'home','',false)),
				    (new MenuRow(eventsTitle,'events',Feed.eventsFeed(),false)),
					(new MenuRow(clubsTitle,'clubs','',false)),
					(new MenuRow(memberBenefitsTitle,'memberbenefits','',false)),
					(new MenuRow(memberCardTitle,'membercard','',true)),
					(new MenuRow(alumniMagazineTitle,'magazine',Feed.magazineFeed(),false)),
				    (new MenuRow( iowaInsiderTitle,'insider',Feed.iowaInsiderFeed(),false)),
				    (new MenuRow(contactUsTitle,'info','',false))
				];
				tableView.setData(menuTitles);
				menuWindow.add(tableView);
			}
	
			win.moving = false;
			win.axis = 0;

			// NavigationGroup
			var navGroup = Ti.UI.iPhone.createNavigationGroup({
			    window:win
			});
			navWindow.add(navGroup);

			win.addEventListener('menuClick', function(e){
				
			    // If the menu is opened
			    if(e.source.toggle == true){
			        navWindow.animate({
			            left:0,
			            duration:400,
			            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
			        });
			        e.source.toggle = false;
			    }
			    // If the menu isn't opened
			    else{
			        navWindow.animate({
			            left:270,
			            duration:400,
			            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
			        });
			        e.source.toggle  = true;
			    }
			   
			});

		});


	})();
	

}*/
