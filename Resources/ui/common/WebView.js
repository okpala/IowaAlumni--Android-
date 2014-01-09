var NavigateWindow = require('ui/common/NavigateWindow');
function WebView (link){
	var webview = Titanium.UI.createWebView({
		url: link,
		top:0,
		loading : true
		
		});
	var win2 = new NavigateWindow("");
	win2.add(webview);
	win2.open();
	    
	return win2;
}

module.exports = WebView;