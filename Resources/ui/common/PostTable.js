var FormatDate = require('ui/common/FormatDate');
/*
 *	Post Table constructor
 *		Creates table for each Row object
 */

function PostTable() {

	this.pulling = false;
	this.reloading = false;

	var self = Ti.UI.createTableView({
		separatorColor: 'transparent',
		backgroundColor: '#e2e2e2'
	});

	var tableHeader = Ti.UI.createView({
		backgroundColor:"#e2e2e2",
		width:320,
		height:60
	});

	var statusLabel = Ti.UI.createLabel({
		text:"Pull down to refresh...",
		left:55,
		width:200,
		bottom:30,
		height:"auto",
		color:"#576c89",
		textAlign:"center",
		font:{fontSize:13,fontWeight:"bold"},
		shadowColor:"#fff",
		shadowOffset:{x:0,y:1}
	});

	var lastUpdatedLabel = Ti.UI.createLabel({
		text:"Last Updated: "+ (new FormatDate()).getDate(),
		left:55,
		width:200,
		bottom:15,
		height:"auto",
		color:"#576c89",
		textAlign:"center",
		font:{fontSize:12},
		shadowColor:"#fff",
		shadowOffset:{x:0,y:1}
	});

	var actInd = Titanium.UI.createActivityIndicator({
		left:20,
		bottom:13,
		width:30,
		height:30
	});

	tableHeader.add(statusLabel);
	tableHeader.add(lastUpdatedLabel);
	tableHeader.add(actInd);

	self.headerPullView = tableHeader;

	self.updateLabelText = function(text) {
		statusLabel.text = text;
	};
	self.updateDateText = function(text) {
		lastUpdatedLabel.text = text;
	};

	self.hideActInd = function() {
		actInd.hide();
	};
	self.showActInd = function() {
		actInd.show();
	};

	return self;

}

module.exports = PostTable;



