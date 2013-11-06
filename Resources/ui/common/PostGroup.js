/*
 *	Post Table constructor
 *		Creates table for each Row object
 */

function PostGroup(rows) {

	var table = Ti.UI.createTableView({
		separatorColor: 	'd5d5d5',
		backgroundColor: 	'ffffff',
		height:				'auto',
		width: 				300,
		left: 				10,
		top:				10,
		bottom:				0,
		padding:			0,
		borderRadius:		5,
		borderColor: 		'#d5d5d5',
		borderWidth: 		1,
		scrollable: 		false
	});

	var height = 0;
	for (var i = 0; i < rows.length; i++) {
		height += rows[i].height;
	}
	table.height = height;
	table.setData(rows);

	var row = Ti.UI.createTableViewRow({
		hasChild: true,
		height: height+15,
		padding: 0,
		top: 0,
		bottom: 0,
		layout: 'vertical',
		selectionStyle: 'none',
		backgroundColor: 'e2e2e2'
	});
	row.rightImage = null;
	row.backgroundSelectedImage = null;
	row.backgroundFocusImage = null;

	row.add(table);

	return row;

}

module.exports = PostGroup;


