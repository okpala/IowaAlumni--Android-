var newText = "";

function EditText(text) {
	text		=  text.replace(/(\r\n|\n|\r|\t)/gm,"");
	text		= text.replace("&#8217;","'");
	var regex       = /(<([^>]+)>)/ig;
	text     = text.replace(regex, "");
	
	var regex2      = /&[^;]+?;/;
	text     = text.replace(regex2, "");
	
	
	var cur = text.substr(0,1);
	while(cur == ' ' || cur == '\t') {
		text = text.substring(text.length - 1, 1);
		cur = text.substr(0,1);
		
	}
	
	
	newText = text;
}

EditText.prototype.adjustedText = function(){
	return newText;
};
module.exports = EditText;
