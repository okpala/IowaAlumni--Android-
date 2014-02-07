var NavigateWindow = require('ui/common/NavigateWindow');
function WebView (link){
	var webview = Titanium.UI.createWebView({
		url: link,
		top:0,
		loading : false
		
		});
	var actInd = Titanium.UI.createActivityIndicator({zIndex:2, height:150,});
	
	actInd.show();
	webview.addEventListener("load", function(e) {
	    actInd.hide();
	});
	var win2 = new NavigateWindow("");
	win2.add(webview);
	win2.add(actInd);
	win2.open();
	    
	return win2;
}

module.exports = WebView;