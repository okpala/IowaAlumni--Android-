function DateObject(pubDate) {
	this.pubDate = pubDate;
}

/*
 * Returns format 'Mon 00 00:00AM'
 */

DateObject.prototype.dateString = function() {
	
	var date = new Date(this.pubDate);
			
	var m_names = new Array("Jan", "Feb", "Mar", 
	"Apr", "May", "Jun", "Jul", "Aug", "Sep", 
	"Oct", "Nov", "Dec");
			
	var day = date.getDate();
	if(day<10) day = '0' + day;
	var mon = date.getMonth();
	var textdate = m_names[mon] + ' ' + day;
	var ampm = "AM";
	var hours = date.getHours();
	var mins = date.getMinutes();
	if (hours>=12) {
		ampm = "PM";
	}
	if (hours>12) hours -= 12;
	if (mins<10) mins = "0"+mins.toString();
	if (hours<10) hours = "0"+hours.toString();
	var texttime = hours + ':' + mins + ampm;
		
	return textdate + ' ' + texttime;
	
};

DateObject.prototype.magazineDateString = function() {
	
	var date = new Date(this.pubDate);
			
	var m_names = new Array("Jan", "Feb", "Mar", 
	"Apr", "May", "Jun", "Jul", "Aug", "Sep", 
	"Oct", "Nov", "Dec");
			
	var mon = date.getMonth();
	var textdate = m_names[mon];
		
	return textdate + ' ' + date.getYear();
	
};

DateObject.prototype.prettyDate = function() {
	var monthname = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	var date = new Date(this.pubDate);
	//Ti.API.info(this.pubDate);
	//Ti.API.info(date + date.getTime());
	var newdate = new Date();
	//Ti.API.info(newdate + newdate.getTime());
	var diff = ( ( (new Date()).getTime() - date.getTime() ) ),
	day_diff = Math.floor(diff / 86400);
	//Ti.API.info(diff + ' ' + day_diff)
	//Ti.API.info( ((new Date()).getTime() + ' ' + date.getTime()) );
	if ( isNaN(day_diff) || day_diff < 0 ){
		return '';
	}
	if(day_diff >= 31){
		var date_year = date.getFullYear();
		var month_name = monthname[date.getMonth()];
		var date_month = date.getMonth() + 1;
		if(date_month < 10){
			date_month = "0"+date_month;
		}
		var date_monthday = date.getDate();
		if(date_monthday < 10){
			date_monthday = "0"+date_monthday;
		}
		return date_monthday + " " + month_name + " " + date_year;
	}
	return day_diff == 0 && (
		diff < 60 && "just now" ||
		diff < 120 && "1 minute ago" ||
		diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
		diff < 7200 && "1 hour ago" ||
		diff < 86400 && "about " + Math.floor( diff / 3600 ) + " hours ago") ||
	day_diff == 1 && "Yesterday" ||
	day_diff < 7 && day_diff + " days ago" ||
	day_diff < 31 && Math.ceil( day_diff / 7 ) + " week" + ((Math.ceil( day_diff / 7 )) == 1 ? "" : "s") + " ago";
};

module.exports = DateObject;