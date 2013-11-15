var GetFeed = require('ui/common/GetFeed');
var ApplicationWindow = require('ui/common/ApplicationWindow');
var SingleRow = require('ui/common/SingleRow');
var PostTable = require('ui/common/PostTable');
var HomeImageSlider = require('ui/common/HomeImageSlider');
var SinglePost = require('ui/common/SinglePost');
var HomeSMSection = require('ui/common/HomeSMSection');
var Row = require('ui/common/Row');
var FormatDate = require('ui/common/FormatDate');
var StaticAd = require('ui/common/StaticAd');
var WebView = require('ui/common/WebView');
var Feed = require('ui/common/Feed');
RSS = require('services/rss');
/*
 * Home Window
 */
function RootWindow(data) {
	
	var masterView = Ti.UI.createView();
	var Feeds = new Feed();
	var tableView = new PostTable();
	tableView.top = 0;
	tableView.bottom = 70;
	tableView.selectionStyle ='none';
	
	// PostTable Event Listeners
	
	tableView.addEventListener('scroll',function(e)
	{
		var offset = e.contentOffset.y;
		if (offset < -65.0 && !tableView.pulling && !tableView.reloading)
		{
			tableView.pulling = true;
			tableView.updateLabelText("Release to refresh...");
		}
		else if((offset > -65.0 && offset < 0 ) && tableView.pulling && !tableView.reloading)
		{
			tableView.pulling = false;
			tableView.updateLabelText("Pull down to refresh...");
		}    
	});
	
	tableView.addEventListener('dragEnd', function()
	{	
		if(tableView.pulling && !tableView.reloading)
		{
			tableView.reloading = true;
			tableView.pulling = false;
			tableView.showActInd();
			tableView.setContentInsets({top:60},{animated:true});
			tableView.scrollToTop(-60,true);
			beginReloading();
		}
	});
	
	function beginReloading() {
		// just mock out the reload
		refreshRSS();
		endReloading();
	}
	function endReloading() {
		tableView.setContentInsets({top:60},{animated:true});
		tableView.reloading = false;
		tableView.updateLabelText("Refreshing...");
		setTimeout(resetTable,700);
	}
	function resetTable() { 
		tableView.setContentInsets({top:0},{animated:true});
		tableView.updateDateText("Last Updated: "+ (new FormatDate()).getDate());
		tableView.hideActInd();
		tableView.updateLabelText("Pull down to refresh...");
	}


	function refreshRssTable() {
		
		var rows = [];
		
	//---------------------------------------------------------------------------------------
	
		var row = new HomeImageSlider();
		rows.push(row);
	//----------------------------------------------------------------------------------------	
		var introLabel = Ti.UI.createLabel({
			text: "No matter how many years or miles may separate you from the campus, the UI Alumni Association can help you feel part of the life of the University of Iowa.",
			width: screenWidth - 20,
			top: 10,
			left: 10,
			font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
		});
		
		var row = Ti.UI.createTableViewRow();
		
		row.add(introLabel);
		rows.push(row);
		
		
	//-----------------------------------------------------------------------------------------
	
	var alerts = new GetFeed (Feeds.mobileAlertsFeed());
	
	/*
	if (alerts.length > 0){
		for (var i = 0; i < alerts.length; i++){
			var headerLabel = Ti.UI.createLabel({
				text: alerts[i].header,
				width: 300,
				top: 10,
				left: 10,
				font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
			});
			
			var row = Ti.UI.createTableViewRow();
			
			row.add(headerLabel);
			rows.push(row);
			
			var row = new SinglePost(alerts[i]);
			rows.push(row);
		}
	}	
	
	//-----------------------------------------------------------------------------------------	
		var events = new GetFeed (Feeds.todayEventsFeed());
		
		if(events.length > 0){
			var eventHeaderLabel = Ti.UI.createLabel({
				text: "Today's Events",
				width: 300,
				top: 10,
				left: 10,
				font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
			});
			
			var row = Ti.UI.createTableViewRow();
			row.add(eventHeaderLabel);
			
			rows.push(row);
			
			
			for (var i = 0; i < events.length; i++) {
				var row = new SingleRow (events[i]);
				
				rows.push(row);
			}
		}
	//-----------------------------------------------------------------------------------------
		var magazineHeaderLabel = Ti.UI.createLabel({
			text: "Article of the Week",
			width: 300,
			top: 10,
			left: 10,
			font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
		});
		
		var row = Ti.UI.createTableViewRow();
		row.add(magazineHeaderLabel);
		
		rows.push(row);
	
		var article = new GetFeed (Feeds.articleOfTheWeekFeed());
		var row = new SinglePost(article[0]);
		
		rows.push(row);
	//----------------------------------------------------------------------------	
		var iowaInsiderLabel = Ti.UI.createLabel({
			text: "Iowa Insider",
			width: 300,
			top: 10,
			left: 10,
			font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
		});
		
		
		var row = new HomeSMSection();
		
		rows.push(row);
		*/
		tableView.setData(rows);
		masterView.add(tableView);
		
	}
	
	function refreshRSS() {	
		refreshRssTable();

	}

	// load initial rss feed
	refreshRSS();
/*
	var ad = new StaticAd(9,392);
	
	
	masterView.add(ad);
	var self = new ApplicationWindow("Home", masterView);
*/
	var self = new ApplicationWindow("Home");
	self.add(masterView);
	return self;

}



module.exports = RootWindow;