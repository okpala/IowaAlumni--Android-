function JSON(feed) {
	this.feed = feed;
}

JSON.prototype.loadJSON = function(o, tries) {
	var xhr = Titanium.Network.createHTTPClient();	
	tries = tries || 0;
	xhr.open('GET', this.feed);
	xhr.onload = function(e) {
		Ti.API.info(this.responseText);
		Ti.API.info(JSON.parse(this.responseText));
		var data = JSON.parse(this.responseText).data;
		if (o.success) { o.success(data); }
	};
	xhr.onerror = function(e) {
		if (o.error) { o.error(); }
	};

	if (o.start) { o.start(); }
	xhr.send();	
};

module.exports = JSON;