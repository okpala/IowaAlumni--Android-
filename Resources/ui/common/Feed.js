/*
 * Contains all feeds' URL
 */

function Feed (){
	 return "";
}

Feed.prototype.eventsFeed = function(){
	return 'http://iowalum.com/calendar/feed_xml.cfm';
};

Feed.prototype.magazineFeed = function(){
	return 'http://iowalum.com/magazine/feed_xml.cfm';
};


Feed.prototype.iowaInsiderFeed = function(){
	return 'http://iowalum.com/blog/?feed=rss2';
};

Feed.prototype.clubsFeed = function(){
	return "http://iowalum.com/clubs/feed_p2_xml.cfm";
};

Feed.prototype.gameWatchFeed = function(){
	return "http://iowalum.com/clubs/feed_xml.cfm";
};

Feed.prototype.nationalDiscountFeed = function(){
	return 'http://www.iowalum.com/membership/feed_benefits_xml.cfm';
};

Feed.prototype.iowaCityFeed = function(){
	return 'http://iowalum.com/membership/feed_xml.cfm';
};

Feed.prototype.mobileAlertsFeed = function(){
	return 'http://iowalum.com/mobile-app/root_alert_feed.cfm';
};

Feed.prototype.todayEventsFeed = function(){
	return 'http://iowalum.com/mobile-app/root_events_feed.cfm';
};

Feed.prototype.articleOfTheWeekFeed = function(){
	return 'http://iowalum.com/mobile-app/root_feed.cfm';
};

Feed.prototype.adFeed = function(){
	return 'http://iowalum.com/advertising/feed_xml.cfm';
};

Feed.prototype.todayDateFeed = function(){
	return "http://iowalum.com/mobile-app/root_date_feed.cfm";
};

Feed.prototype.sliderImagesFeed = function(){
	return 'http://iowalum.com/mobile-app/root_homeImages_feed.cfm';
};

Feed.prototype.staticaAdFeed = function(){
	return "http://iowalum.com/mobile-app/feed_xml.cfm";
};

Feed.prototype.passwordFeed = function(){
	return 'http://iowalum.com/membership/password_feed_xml.cfm';
};




module.exports = Feed;
