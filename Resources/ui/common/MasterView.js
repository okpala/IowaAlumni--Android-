var Post = require('ui/common/Post'),
	FeatureRow = require('ui/common/FeatureRow'),
	Row = require('ui/common/Row'),
	SingleRow = require('ui/common/SingleRow'),
	HeaderRow = require('ui/common/HeaderRow'),
	IIBIntroRow = require('ui/common/IIBIntroRow'),
	IAMIntroRow = require('ui/common/IAMIntroRow'),
	PostGroup = require('ui/common/PostGroup'),
	PostTable = require('ui/common/PostTable'),
	Ad = require('ui/common/Ad'),
	GetFeed = require('ui/common/GetFeed'),
	FormatDate = require('ui/common/FormatDate'),
	RSS = require('services/rss'),
	WebView = require('ui/common/WebView'),
	StaticAd = require('ui/common/StaticAd');
	Feed = require('ui/common/Feed');

/* 
 * Master View is the layout
 * for Events Window, Iowa Magazine Window,
 *  and Iowa Insider Window
 */

function MasterView(feed) {
	
	var minheight = 200;
	var Feeds = new Feed();
	var rssfeed = new RSS(feed);
	

	var self = Ti.UI.createView({
		backgroundColor:'#fff'
	});

	var table = new PostTable();

	// PostTable Event Listeners
	
	table.addEventListener('scroll',function(e)
	{
		var offset = e.contentOffset.y;
		if (offset < -65.0 && !table.pulling && !table.eloading)
		{
			table.pulling = true;
			table.updateLabelText("Release to refresh...");
		}
		else if((offset > -65.0 && offset < 0 ) && table.pulling && !table.reloading)
		{
			table.pulling = false;
			table.updateLabelText("Pull down to refresh...");
		}    
	});
	table.addEventListener('dragEnd', function()
	{	
		if(table.pulling && !table.reloading)
		{
			table.reloading = true;
			table.pulling = false;
			table.showActInd();
			table.setContentInsets({top:60},{animated:true});
			table.scrollToTop(-60,true);
			beginReloading();
		}
	});

	
	
	
	
	function beginReloading() {
		// just mock out the reload
		refreshRSS();
		endReloading();
	}
	function endReloading() {
		table.setContentInsets({top:60},{animated:true});
		table.reloading = false;
		table.updateLabelText("Refreshing...");
		setTimeout(resetTable,700);
	}
	function resetTable() { 
		table.setContentInsets({top:0},{animated:true});
		table.updateDateText("Last Updated: "+ (new FormatDate()).getDate());
		table.hideActInd();
		table.updateLabelText("Pull down to refresh...");
	}


	function refreshRssTable(data) {
		if (Object.prototype.toString.apply(data) === '[object Array]') {
			var rows = [];
			var group = [];
			var featureSet = false;
			var groupCount = 0;
			var Counter = 0;
			var headerCounter = 0;
			var adIndex = 0;
			var ads = new GetFeed(Feeds.adFeed() );
			var tempDate = "";
			for (var i = 0; i < data.length; i++) {
				var post = new Post(data[i]);
				
				
				//Add Feed's Intro Text
				if (i == 0 && feed == Feeds.iowaInsiderFeed()){
						var row = new IIBIntroRow();
						rows.push(row);
					}
				
				if (i == 0 && feed == Feeds.magazineFeed()){
						var row = new IAMIntroRow();
						rows.push(row);
					}
				
				//Add Feed's Ad
				if (Counter != 0 && (Counter % 3) == 0 && adIndex < 3 && feed == Feeds.iowaInsiderFeed()){
					var row = new Ad(ads[adIndex + 3]);
					rows.push(row);
					adIndex++;
				}
				
				if (Counter != 0 && (Counter % 3) == 0 && adIndex < 3 && feed == Feeds.magazineFeed()){
					var row = new Ad(ads[adIndex + 6]);
					rows.push(row);
					adIndex++;
				}
				
				
				
				if(post.imageheight != null && post.imageheight > 150 && post.imageheight < 300 && featureSet == false && feed != Feeds.eventsFeed()) {
					
					var row = new FeatureRow(post);
					featureSet = true;
					row.addEventListener('swipe', function(e){
				 		self.fireEvent('swipeToggle');
					});
					rows.push(row);
				}
				
				else if (feed == Feeds.eventsFeed()){
					if ((Counter == 0) ||(tempDate != post.pubDate && Counter != 0)){
						var header = new HeaderRow(post);
						
						if (headerCounter != 0 && (headerCounter % 3) == 0 && adIndex < 3 ){
							var row = new Ad(ads[adIndex]);
							rows.push(row);
							adIndex++;
							if (adIndex == 3){
								adIndex = 0;
							} 
						}
						rows.push(header);
						headerCounter++;
					}
					var row = new SingleRow(post);
					
					rows.push(row);
				}
				
				else {
					var row =  new Row(post);

					if(groupCount >= 1) {
						group.push(row);
						rows.push(new PostGroup(group));
						group = [];
						groupCount = 0;
						
						featureSet = false;
					}
					else {
						group.push(row);
						groupCount++;
					}
				}
				
				Counter++;
				tempDate = post.pubDate;
			}
			

			table.setData(rows);	
		}	
	}
	

	
	
	function refreshRSS() {
		
		 rssfeed.loadRssFeed({
			success: function(data) {
	    	refreshRssTable(data);
	    				
	    }
		});
		
	}

	// load initial rss feed
	refreshRSS();
	table.bottom = 70;
	self.add(table);
	
	
	if ( feed == Feeds.iowaInsiderFeed()){
		var ad = new StaticAd(13,350);
	}
	else if ( feed == Feeds.magazineFeed()){
		var ad = new StaticAd(12,350);
	}
	else {
		var ad = new StaticAd(10,350);
	}
	
	self.add(ad);
	
	

	return self;
}

module.exports = MasterView;

