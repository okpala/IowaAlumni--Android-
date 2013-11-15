var WebView = require('ui/common/WebView');
var Feed = require('ui/common/Feed');

function RSS(feed) {
	this.feed = feed;
}

var Feed = new Feed();
var osname = Ti.Platform.osname;
var RSS_URL = osname === 'mobileweb' ? '/feed.xml' : Feed.iowaInsiderFeed();

var MONTH_MAP = { JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6, JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12 };

var getRssText = function(item, key) {
	return osname === 'mobileweb' ?
			item.getElementsByTagName(key).item(0).textContent : //childNodes[0].nodeValue :
			item.getElementsByTagName(key).item(0).text;
};

var parseDate = function(dateString) {
	var dateParts = dateString.split(' ');
	var timeParts = dateParts[4].split(':');
	return MONTH_MAP[dateParts[2].toUpperCase()] + '/' + dateParts[1] + ' ' + timeParts[0] + ':' + timeParts[1];
};

RSS.prototype.loadRssFeed = function(o, tries) {
	var xhr = Titanium.Network.createHTTPClient();	
	
	tries = tries || 0;
	xhr.open('GET', this.feed);
	
	xhr.onload = function(e) {
		
		
		var xml = this.responseXML;
		
	
	
		
		if (xml === null || xml.documentElement === null) { 
			if (tries < 3) {
				tries++;
				exports.loadRssFeed(o, tries);
				return;
			} else {
				alert('Error reading RSS feed. Make sure you have a network connection and try refreshing.');
				
				if (o.error) { o.error(); }
				return;	
			}	
		}
		
		var items = xml.documentElement.getElementsByTagName("item");
		var data = [];

		for (var i = 0; i < items.length; i++) {
			var item = items.item(i);
			
			var image;
			try {
			var image = item.getElementsByTagNameNS('http://mashable.com/', 'thumbnail').item(0).getElementsByTagName('img').item(0).getAttribute('src');
			} catch (e) {
				image = '';
			}
			/*
			if (feed == Feeds.articleOfTheWeekFeed()){
				data.push({
					title:  getRssText(item, 'title'),
					url:  getRssText(item, 'link'),
					image: getRssText(item, 'image'),
					description: getRssText(item, 'description'),
					pubDate: getRssText(item, 'pubDate')
					
					});
			}
	else if (feed == Feeds.todayDateFeed()){
				data.push({
					date:  getRssText(item, 'date')
					
					});
			}
	else if (feed == Feeds.passwordFeed()){
		data.push({
			pass: getRssText (item, 'pass'),
			pass2: getRssText (item, 'pass2')
		});
				
	}
	
	else{
		for (var i = 0; i < items.length; i++) {
			var item = items.item(i);
			
		
			if (feed == Feeds.gameWatchFeed()){
				data.push({
					state:  getRssText(item, 'state'),
					club:  getRssText(item, 'club'),
					place: getRssText(item, 'place'),
					phone: getRssText(item, 'phone'),
					latitude: getRssText(item, 'latitude'),
					longitude: getRssText(item, 'longitude'),
					street: getRssText(item, 'street')
					});
			}
			else if (feed == Feeds.nationalDiscountFeed()){
				data.push({
					title:  getRssText(item, 'title'),
					link:  getRssText(item, 'link'),
					description: getRssText(item, 'description')
					});
			}
			else if (feed == "http://www.iowalum.com/mobile-app/events_category_feed.cfm"){
				data.push({
					category:getRssText(item, 'category')
					});
			}
			else if (feed == Feeds.mobileAlertsFeed()){
				data.push({
					title:  getRssText(item, 'title'),
					header:  getRssText(item, 'header'),
					url:  getRssText(item, 'link'),
					image: getRssText(item, 'image'),
					description: getRssText(item, 'description'),
					pubDate: getRssText(item, 'pubDate')
					
					});
			}
			
			else if (feed == Feeds.staticaAdFeed()){
				data.push({
					ad:   getRssText(item, 'ad'),
					adUrl:  getRssText(item, 'adUrl')
					});
		}
			
			else if (feed == Feeds.mobileAlertsFeed()){
				data.push({
					snl: getRssText(item, 'snl'),
					place: getRssText(item, 'place'),
					title: getRssText(item, 'title'),
					url: getRssText(item, 'link'),
					description: getRssText(item, 'description'),
					pubDate: getRssText(item, 'pubDate')
				
					
					});
			}
			
			else if (feed == Feeds.clubsFeed()){
				data.push({
					state:  getRssText(item, 'state'),
					leader:  getRssText(item, 'leader'),
					city: getRssText(item, 'city'),
					web: getRssText(item, 'web'),
					email: getRssText(item, 'email'),
					phone: getRssText(item, 'phone')
					});
			}
			
			else if (feed == Feeds.adFeed()){
				data.push({
					ad: getRssText(item, 'ad'),
					link: getRssText(item, 'link'),
				});
				
			}
			
			else if (feed == Feeds.sliderImagesFeed()){
				data.push({
					url: getRssText(item, 'url')
				});
				
			}
			
			else if (feed == Feeds.iowaCityFeed()) {
				data.push({
					company:  getRssText(item, 'company'),
					discount: getRssText(item, 'discount'),
					latitude: getRssText(item, 'latitude'),
					longitude: getRssText(item, 'longitude'),
					street: getRssText(item, 'street')
					});
			}
			else if (feed == Feeds.eventsFeed) {
				data.push({
					title: getRssText(item, 'title'),
					link: getRssText(item, 'link'),
					description: getRssText(item, 'description'),
					pubDate: getRssText(item, 'pubDate'),
					image: image
					});
			}
			else {
				data.push({
					snl: getRssText(item, 'snl'),
					place: getRssText(item, 'place'),
					title: getRssText(item, 'title'),
					link: getRssText(item, 'link'),
					description: getRssText(item, 'description'),
					pubDate: getRssText(item, 'pubDate'),
					hlink: getRssText(item, 'hlink'),
					category:getRssText(item, 'category'),
					image: image
					});
				
			}
			
			
		}
	}
		*/	try {
					data.push({
					snl: getRssText(item, 'snl'),
					place: getRssText(item, 'place'),
					title: getRssText(item, 'title'),
					link: getRssText(item, 'link'),
					description: getRssText(item, 'description'),
					pubDate: getRssText(item, 'pubDate'),
					hlink: getRssText(item, 'hlink'),
					category:getRssText(item, 'category'),
					image: image
					});
			}
			catch (err){
					data.push({
					title: getRssText(item, 'title'),
					link: getRssText(item, 'link'),
					description: getRssText(item, 'description'),
					pubDate: getRssText(item, 'pubDate'),
					image: image
					});
			}
					
			
			
			
			
		}
		if (o.success) { o.success(data); }
		
		
	};
	

	xhr.onerror = function(e) {
		if (o.error) { o.error(); }
		
		
	};
	
	

	if (o.start) { o.start(); }
	xhr.send();
	
	
};


module.exports = RSS;