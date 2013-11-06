var	Description = require('ui/common/Description');
var CachedImageView = require('ui/common/CachedImageView');
/*
 * Post Object
 * Essential attributes
 */

function Post(item) {//<----
    this.title = (new Description(item.title)).getDescription();
    this.snl = item.snl;
    this.place = item.place;
    this.description = (new Description(item.description)).getDescription();
    this.pubDate = item.pubDate;
    this.hlink = item.hlink;
    this.image = (new Description(item.description)).getImage();
    this.url = item.link;
    this.imageheight = (this.image!=null) ? getImageHeight(this.image) : null;
    
}
function getImageHeight(img) {
	var tempimagebox = Ti.UI.createImageView({
		image: img,
		width: 'auto',
		height: 'auto',
		hires: true,
	});
    new CachedImageView('imageDirectoryName', img, tempimagebox);
	var ratio = tempimagebox.toImage().height / tempimagebox.toImage().width;
	return Math.floor( 300 * ratio );
}


 
module.exports = Post;
