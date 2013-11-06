var ApplicationWindow = require('ui/common/ApplicationWindow');
var GetFeed = require('ui/common/GetFeed');
var Feed = require('ui/common/Feed');

function  MemberCardWindow(title){
	
	var Feeds = new Feed();
	var passwordWin = Ti.UI.createView({
	    top: 0,
	    backgroundColor:'#cccccc',
	    navBarHidden: true
	});
	
	
	var passwordLabel = Ti.UI.createLabel({
		text: "Please enter your UIAA members-only password below to access your member card.",
		height:'auto',
		width: 300,
		textAlign: 'center',
		top: 10,
  		left: 10,
		font: {fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
	});
	
	var passwordHeaderLabel = Ti.UI.createLabel({
		text: "Forgot the Password?",
		width: 300,
		top: 120,
		textAlign: 'left',
  		left: 10,
		font: {fontFamily:'Helvetica-Bold',fontSize:12,fontWeight:'normal'}
	});
	
	var passwordInfoLabel = Ti.UI.createLabel({
		text: "Let us know via email (alumni-member@uiowa.edu) and we will send it to you promptly during regular business hours. Type 'members-only password' in the subject line of your message and include your first and last name, city, and state.",
		height:'auto',
		width: 300,
		top: 135,
  		left: 10,
		font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	});
	
	var passwordTextField = Ti.UI.createTextField({
  		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  		color: '#336699',
  		passwordMask: true,
  		top: 60,
  		left: 90,
  		width: 140, 
  		height: 20
	});
	var loginButton = Ti.UI.createButton({
		title:'Login',
		width:50,
		height:25,
		top: 82,
  		left: 130,
		font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
		
	});
	
	var activityIndicator = Ti.UI.createActivityIndicator({
		  font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'},
		  message: 'Checking Password...',
		  style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		  top:105,
		  left:90,
		  height:'auto',
		  width:'auto'
	});
	
	
  	passwordWin.add(activityIndicator);
	
	
	var wrongPasswordLabel = Ti.UI.createLabel({
		text: "You may have typed the password incorrectly, try again.",
		textAlign: 'center',
		height:'auto',
		width: 310,
		color:'#FF0000',
		top: 105,
  		left: 10,
		font: {fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	});
	
	
	var image = Ti.UI.createImageView({
	  image:    'http://iowalum.com/membership/images/MemberCard.png',
	  top:    0,
	  left:   0,
	  height: 420,
	  width:  320
	});
	
	var people = Ti.UI.createImageView({
	  image:    'thawk.png',
	  top:   250,
	  width: 200,
	  height: 127
	});
	
	passwordWin.add(people);
	passwordWin.add(wrongPasswordLabel);
	wrongPasswordLabel.setVisible(false);
	
	function getMemberCard(isCard2){
			passwordWin.remove(passwordLabel);
			passwordWin.remove(passwordInfoLabel);
			passwordWin.remove(passwordHeaderLabel);
			passwordWin.remove(passwordTextField);
			passwordWin.remove(loginButton);
			passwordWin.backgroundColor = '202020';
			wrongPasswordLabel.setVisible(false);
			
			if (isCard2 == true){
				image.image =  'http://iowalum.com/membership/images/MemberCard2.png';
			}
			passwordWin.add(image);
		
			
			
			
	}
	
	
	loginButton.addEventListener('click',function(){
		wrongPasswordLabel.setVisible(false);
		activityIndicator.show();
		setTimeout(function(){activityIndicator.hide();}, 2000);
		setTimeout(function(){
			var password = (new GetFeed(Feeds.passwordFeed())[0]);
		password.pass =  password.pass.replace(" ","");
		password.pass =  password.pass.replace(" ","");
		password.pass2 =  password.pass2.replace(" ","");
		password.pass2 =  password.pass2.replace(" ","");
   		if (passwordTextField.value == password.pass) {
			 getMemberCard(false);
			
		}
		
		else if (passwordTextField.value == password.pass2) {
			 getMemberCard(true);
		}
		else {
			wrongPasswordLabel.setVisible(true);
		}
			
			
			
}, 3000);
		
		
	});

	
	var people = Ti.UI.createImageView({
	  image:    'https://www.iowalum.com/mobile/clubs.png',
	  top:   130
	});
	
	passwordWin.add(passwordLabel);
	passwordWin.add(passwordInfoLabel);
	passwordWin.add(passwordHeaderLabel);
	passwordWin.add(passwordTextField);
	passwordWin.add(loginButton);
	
	
	
	var self = new ApplicationWindow(title, passwordWin);
	return self;
}



module.exports = MemberCardWindow;