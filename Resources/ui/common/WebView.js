var NavigateWindow = require('ui/common/NavigateWindow');
function WebView (link){
	var webview = Titanium.UI.createWebView({
		url: link,
		top:0
		
		});
	    var win2 = new NavigateWindow("", webview );
	    
	    win2.open();
	    /*
	    win2.open({modal:true});
		 
		 
	
    	
		var closeButton = Titanium.UI.createButton({
			title:'Back',
			font: {fontFamily:'Helvetica Neue',fontSize:14,fontWeight:'bold'},
			backgroundImage: 'backbutton.png',
			width: 63,
			height: 30
	
		});
		
		closeButton.addEventListener('click', function() {
			
			
			 win2.close();
		});
		
		
		win2.setLeftNavButton(closeButton);
		win2.setBarImage('navbar.png');
		*/
		return win2;
}

module.exports = WebView;