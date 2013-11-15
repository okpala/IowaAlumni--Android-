var Feed = require('ui/common/Feed');
var Feeds = new Feed();
/*
 * Get content from the feed
 */
var rowData = [];
function GetFeed (feed){
	
	var table = Ti.UI.createTableView();
	//table=loadXMLDoc(feed, table);
	
	 
	
	alert(rowData);
	
	var items = [];
 
	var sections = table.data;
 
	for(var i = 0; i < sections.length; i++)
	{
	    var section = sections[i];
	 
	    for(var j = 0; j < section.rowCount; j++)
	    {
	        var row = section.rows[j];
	        items.push(row);
	        
	    }
	}
	Ti.API.info(items.length);
	
	return items;
}
loadXMLDoc(feed, function(data) {rowData.push(data);});
var osname = Ti.Platform.osname;
var RSS_URL = osname === 'mobileweb' ? '/feed.xml' : Feeds.magazineFeed();


var getRssText = function(item, key) {
	return osname === 'mobileweb' ?
			item.getElementsByTagName(key).item(0).textContent : 
			item.getElementsByTagName(key).item(0).text;
};

function loadXMLDoc(dname, callback){
	var xmlhttp = Titanium.Network.createHTTPClient();
	xmlhttp.open("GET",dname);
	xmlhttp.onload = function(){
		var xml = this.responseXML;
	   	var items = xml.documentElement.getElementsByTagName("item");
	   	var data = getFeedItems(items, dname);
	   	//Ti.API.info("the data lenght in loadXML - " + data.length);
	   	//table.data = data;
	   	//Ti.API.info("the table first item in loadXML and onload - " + table.data[0].rowCount);
	   	callback(data);

	   	alert("feed works");
	};
	xmlhttp.onerror = function(error){
	    alert("feed doesn't works");
	};
	xmlhttp.send();
	//Ti.API.info("the table first item in loadXML - " + table.data[0].rowCount);
	return xmlhttp;
}

function getFeedItems(items, feed){
	
	var data = [];

	
	var item = items.item(0);
	
	
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
					title:  getRssText(item, 'title'),
                    header:  getRssText(item, 'header'),
                    url:  getRssText(item, 'link'),
                    image: getRssText(item, 'image'),
                    description: getRssText(item, 'description'),
                    pubDate: getRssText(item, 'pubDate')

					
					});
			}
			
			
			
			else if (feed == Feeds.todayEventsFeed()){
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

module.exports = GetFeed;