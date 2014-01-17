var FormatDate = require('ui/common/FormatDate');

function ErrorWindow(refreshRssTable, title, tracker){
	var table = Ti.UI.createTableView({
		backgroundColor:'#e2e2e2',
		separatorColor: '#e2e2e2',
		zIndex: 0
	});
	var  rows = [];
	var refreshLabel = Ti.UI.createLabel({
			text:"Press here to refresh...",
			height:"auto",
			color:"#576c89",
			textAlign:"center",
			top: 0,
			font:{fontSize:13,fontWeight:"bold"},
			shadowColor:"#fff",
			shadowOffset:{x:0,y:1}
	});
		
	var lastUpdatedLabel = Ti.UI.createLabel({
		text:"Last Updated: "+ (new FormatDate()).getDate(),
		top:15,
		height:"auto",
		color:"#576c89",
		textAlign:"center",
		font:{fontSize:12},
		shadowColor:"#fff",
		shadowOffset:{x:0,y:1}
	});
	
	var row = Ti.UI.createTableViewRow({height:30});
	row.add(lastUpdatedLabel);	
	row.add(refreshLabel);
	row.addEventListener('click', function() {
		refreshRssTable();
		tracker.trackEvent({
			category: "Refreshing  Window",
			action: "refresh",
			label: "Refreshing " + title + "'s Window",
			value: 1
		});
				
	});
	rows.push(row);
	
	var thawk = Ti.UI.createImageView({
	  image:    Ti.Filesystem.resourcesDirectory + 'thawk.png',
	  top:   10,
	  width: 200,
	  height: 127
	});
	var row = Ti.UI.createTableViewRow({backgroundSelectedColor : "transparent"});
	row.add(thawk);
	rows.push(row);
	
	var errorLabel = Ti.UI.createLabel({
		text:"There was an error retrieving the remote data. Try again.",
		top:15,
		height:"auto",
		color:"#576c89",
		textAlign:"center",
		font: {fontFamily:'HelveticaNeue-Light',fontSize:15,fontWeight:'bold'},
		shadowColor:"#fff",
		shadowOffset:{x:0,y:1}
	});
	var row = Ti.UI.createTableViewRow();
	row.add(errorLabel);
	rows.push(row);
	table.setData(rows);
	return table;
}
module.exports = ErrorWindow;