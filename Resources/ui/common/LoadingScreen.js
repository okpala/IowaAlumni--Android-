function LoadingScreen(){
	var activityIndicator = Ti.UI.createActivityIndicator({
		  font: {fontFamily:'HelveticaNeue-Light',fontSize:25,fontWeight:'bold'},
		  message: 'Loading...',
		  style: Ti.UI.ActivityIndicatorStyle.DARK,
	});
	
	
	
	
	return activityIndicator;
}
module.exports = LoadingScreen;