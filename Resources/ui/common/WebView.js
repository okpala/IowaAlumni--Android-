var NavigateWindow = require('ui/common/NavigateWindow');
function WebView (link){
	var webview = Titanium.UI.createWebView({
		url: link,
		top:0
		
		});
	    var win2 = new NavigateWindow("", webview );
	    
	    win2.open();
	    
		return win2;
}

module.exports = WebView;