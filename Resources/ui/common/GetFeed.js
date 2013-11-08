var Feed = require('ui/common/Feed');
var Feeds = new Feed();
/*
 * Get content from the feed
 */

function GetFeed (feed){
	var data = [];
	xmlDoc=loadXMLDoc(feed);

	try{
		var items = xmlDoc.getElementsByTagName("item");
		var item = items.item(i);
	
	
	
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
			
			
			else {
				data.push({
					company:  getRssText(item, 'company'),
					discount: getRssText(item, 'discount'),
					latitude: getRssText(item, 'latitude'),
					longitude: getRssText(item, 'longitude'),
					street: getRssText(item, 'street')
					});
			}
		}
	}
	
	return data;
	}
	catch(err){
		Ti.API.error("Error", "Couldn't get the feed");
		return null;
	}
	
}

var osname = Ti.Platform.osname;
var RSS_URL = osname === 'mobileweb' ? '/feed.xml' : Feeds.magazineFeed();


var getRssText = function(item, key) {/*
	return osname === 'mobileweb' ?
			item.getElementsByTagName(key).item(0).textContent : 
			item.getElementsByTagName(key).item(0).text;
			*/
			Ti.API.info(item.getElementsByTagName(key).item(0).text);
			alert(item.getElementsByTagName(key).item(0).text);
	return item.getElementsByTagName(key).item(0).text;
};

function loadXMLDoc(dname){
	var xmlhttp = Titanium.Network.createHTTPClient();
	xmlhttp.open("GET",dname,false);
	xmlhttp.send();
	return xmlhttp.responseXML;
}

module.exports = GetFeed;