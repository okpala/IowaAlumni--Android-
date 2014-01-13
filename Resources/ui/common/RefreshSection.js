var FormatDate = require('ui/common/FormatDate');

function RefreshSection(){
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
	
	return row;
}
module.exports = RefreshSection;