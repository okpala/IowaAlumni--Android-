
function Description(description) {
	this.description = description;
}

Description.prototype.getImage = function() {
	var imageregex  = /(img|src)=("|')[^"'>]+/;
	var imageurl    = imageregex.exec(this.description);
	//Ti.API.info(String(imageurl));
	var imageurlstr ='';
	if(imageurl!=null) {
		if(imageurl.length>1) {
		imageurlstr 	= imageurl[0];
		imageurlstr 	= imageurlstr.substring(5, imageurlstr.length);
		var dimregex	= /-(\d{3})x(\d{3}).jpg/;
		imageurlstr 	= imageurlstr.replace(dimregex,".jpg");
		imageurlstr		=  imageurlstr.replace(/ /g,"%20");
		//Ti.API.info(imageurlstr);
		}
		else imageurlstr = null;
	}
	else imageurlstr = null;
	return imageurlstr;
	
};

Description.prototype.getImageMagazine = function() {
	var imageregex  = /(img|src)=("|')[^"'>]+/;
	var imageurl    = imageregex.exec(this.description);
	var imageurlstr = imageurl.substring(imageurl.length - 52, 52);
	return imageurlstr;

};

Description.prototype.getDescription = function() {
	
	var description = this.description;
	
	// Remove returns and line
	description		= description.replace(/(\r\n|\n|\r|\t)/gm," ");
	description		= description.replace("&#8217;","'");
	var regex       = /(<([^>]+)>)/ig;
	description     = description.replace(regex, "");
	var regex2      = /&[^;]+?;/;
	description     = description.replace(regex2, "");
	
	// Remove leading tabs from XML formatting
	var cur = description.substr(0,1);
	while(cur == ' ' || cur == '\t') {
		description = description.substring(description.length - 1, 1);
		cur = description.substr(0,1);
	}
	
	return description;
};

module.exports = Description;
