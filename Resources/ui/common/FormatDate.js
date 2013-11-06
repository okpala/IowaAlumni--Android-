function FormatDate(){
	return "";
}

FormatDate.prototype.getDate = function() {
	var date = new Date();
	var datestr = date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear();
	if (date.getHours()>=12)
	{
		datestr+=' '+(date.getHours()==12 ? date.getHours() : date.getHours()-12)+':'+minute(date.getMinutes())+' PM';
		Ti.API.info(date.getMinutes());
	}
	else
	{
		datestr+=' '+date.getHours()+':'+minute(date.getMinutes())+' AM';
	}
	
	return datestr;
};



FormatDate.prototype.getMonthString = function(month) {
	var monthname = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	return monthname[month];
};

function minute (min){
	if (min < 9){
		return "0" + min;
	}
	else{
		return min;
	}
}

module.exports = FormatDate;
