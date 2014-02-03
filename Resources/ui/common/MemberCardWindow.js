var ApplicationWindow = require('ui/common/ApplicationWindow');
var GetFeed = require('ui/common/GetFeed');
var Feed = require('ui/common/Feed');
var LoadingScreen = require('ui/common/LoadingScreen');
var ErrorWindow = require('ui/common/ErrorWindow');
function  MemberCardWindow(title, tracker){
	var Feeds = new Feed();
	tracker.trackScreen(title);
	var self = new ApplicationWindow(title);
	var loading = new LoadingScreen();
	var rows = [];
	var table = Ti.UI.createTableView({
			height: 'auto',
			top: 0,
			backgroundColor:'#e2e2e2',
			separatorColor: "transparent"
		
	});
	
	var passwordWin = Ti.UI.createView({
	    top: 0,
	    backgroundColor:'#cccccc',
	    navBarHidden: true
	});
	
	var passwordLabel = Ti.UI.createLabel({
		text: "Please enter your UIAA members-only password below to access your member card.",
		color: "#000000",
		height:'auto',
		width: Ti.UI.FILL,
		left: 10,
		right: 10,
		textAlign: 'center',
		top: 10,
		font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
	});
	
	var row = Ti.UI.createTableViewRow({backgroundSelectedColor : "transparent"});	
	row.add(passwordLabel);
	rows.push(row);
	
	var passwordTextField = Ti.UI.createTextField({
  		color: '#000000',
  		passwordMask: true,
  		top: 10,
  		width: 140, 
  		height: 30,
  		backgroundColor :"#fff",
  		font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	});
	
	var row = Ti.UI.createTableViewRow({backgroundSelectedColor : "transparent"});	
	row.add(passwordTextField);
	rows.push(row);
	
	var loginButton = Ti.UI.createButton({
		title:'Login',
		//width: 50,
		height:35,
		top: 5,
		font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
		
	});
	
	var row = Ti.UI.createTableViewRow({backgroundSelectedColor : "transparent"});	
	row.add(loginButton);
	rows.push(row);
	
	var activityIndicator = Ti.UI.createActivityIndicator({
		  font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'},
		  message: 'Checking Password...',
		  style: Ti.UI.ActivityIndicatorStyle.DARK,
		  top:5,
		  height:'auto',
		  width:'auto'
	});
	
	var row = Ti.UI.createTableViewRow({backgroundSelectedColor : "transparent"});	
	row.add(activityIndicator);
	
	
	var wrongPasswordLabel = Ti.UI.createLabel({
		text: "You may have typed the password incorrectly, try again.",
		textAlign: 'center',
		height:'auto',
		width: 310,
		color:'#FF0000',
		top: 5,
		font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	});
	
	
	wrongPasswordLabel.setVisible(false);
	row.add(wrongPasswordLabel);
	rows.push(row);
	
	
	var passwordHeaderLabel = Ti.UI.createLabel({
		text: "Forgot the Password?",
		color: "#000000",
		width: 300,
		top: 5,
		textAlign: 'left',
  		left: 10,
		font: {fontFamily:'Helvetica-Bold',fontSize:12,fontWeight:'normal'}
	});
	var row = Ti.UI.createTableViewRow({backgroundSelectedColor : "transparent"});	
	row.add(passwordHeaderLabel);
	rows.push(row);
	
	var passwordInfoLabel = Ti.UI.createLabel({
		text: "Let us know via email (alumni-member@uiowa.edu) and we will send it to you promptly during regular business hours. Type 'members-only password' in the subject line of your message and include your first and last name, city, and state.",
		color: "#000000",
		height:'auto',
		width: Ti.UI.FILL,
		top: 3,
  		left: 10,
  		right: 10,
		font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	});
	
	var row = Ti.UI.createTableViewRow({backgroundSelectedColor : "transparent"});	
	row.add(passwordInfoLabel);
	rows.push(row);

	var image = Ti.UI.createImageView({
	  image:    'http://iowalum.com/membership/images/MemberCard.png',
	  //top:    0,
	  height: 420,
	  width:  320
	});
	
	var thawk = Ti.UI.createImageView({
	  image:    Ti.Filesystem.resourcesDirectory + 'thawk.png',
	  top:   10,
	  width: 200,
	  height: 127
	});
	
	var row = Ti.UI.createTableViewRow({backgroundSelectedColor : "transparent"});	
	row.add(thawk);
	rows.push(row);
	function refreshRssTable() {
		self.add(loading);
		loading.show();
		
		var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    	
		
			// function called in readyState DONE (4)
			Ti.API.info('onload called, HTTP status = '+this.status);
			var xml = this.responseXML;
		   	var items = xml.documentElement.getElementsByTagName("item");
		   	var item = items.item(0);
		   	var password = [];
		   	password.push({
				pass: item.getElementsByTagName('pass').item(0).textContent,
				pass2: item.getElementsByTagName('pass2').item(0).textContent,
			});
			var password = password[0];
			
		
			//passwordWin.add(activityIndicator);
			//passwordWin.add(thawk);
			//passwordWin.add(wrongPasswordLabel);
			//wrongPasswordLabel.setVisible(false);
			
			function getMemberCard(isCard2){
					//passwordWin.remove(passwordLabel);
					//passwordWin.remove(passwordInfoLabel);
					//passwordWin.remove(passwordHeaderLabel);
					//passwordWin.remove(passwordTextField);
					//passwordWin.remove(loginButton);
					//passwordWin.remove(thawk);
					
					self.remove(table);
					self.backgroundColor = '#202020';
					wrongPasswordLabel.setVisible(false);
					
					if (isCard2 == true){
						image.image =  'http://iowalum.com/membership/images/MemberCard2.png';
					}
					self.add(image);		
			}
			
			
			loginButton.addEventListener('click',function(){
				wrongPasswordLabel.setVisible(false);
				activityIndicator.show();
				setTimeout(function(){activityIndicator.hide();}, 2000);
				setTimeout(function(){
					
				
				password.pass =  password.pass.replace(" ","");
				password.pass =  password.pass.replace(" ","");
				password.pass2 =  password.pass2.replace(" ","");
				password.pass2 =  password.pass2.replace(" ","");
				
				
		   		if (passwordTextField.value == password.pass) {
					 getMemberCard(false);
					tracker.trackEvent({
						category: "Members Card",
						action: "using card",
						label: "Password: onceahawkeye",
						value: 1
					});
				}
				
				else if (passwordTextField.value == password.pass2) {
					 getMemberCard(true);
					 tracker.trackEvent({
						category: "Members Card",
						action: "using card",
						label: "Password: hawkeyes",
						value: 1
					});
				}
				else {
					wrongPasswordLabel.setVisible(true);
				}
			
			}, 3000);
					
					
				});
			
				//passwordWin.add(passwordLabel);
				//passwordWin.add(passwordInfoLabel);
				//passwordWin.add(passwordHeaderLabel);
				//passwordWin.add(passwordTextField);
				//passwordWin.add(loginButton);
				
				
				
				table.setData(rows);
				self.add(table);
				self.remove(loading);	
				
		    },
		    onerror: function(e) {
		    	self.remove(loading);
				Ti.API.debug("STATUS: " + this.status);
			    Ti.API.debug("TEXT:   " + this.responseText);
			    Ti.API.debug("ERROR:  " + e.error);
			    var errorView = new ErrorWindow(refreshRssTable, title, tracker);
				self.add(errorView);
		    },
		    timeout:5000  /* in milliseconds */
		});
		xhr.open("GET", Feeds.passwordFeed());
		xhr.send();  // request is actually sent with this statement
	}
	refreshRssTable();
	//table.setData(rows);
	//self.add(table);
	//self.remove(loading);	
				
	return self;
}



module.exports = MemberCardWindow;