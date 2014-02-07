exports.createCachingImageView = function(params) {
    var image = Ti.UI.createImageView();
	var somedirectory = Ti.Filesystem.resourcesDirectory ;
    image.doRemote = function(imageURL) {
        image.remoteImage = imageURL;
        var file = Ti.Filesystem.getFile(somedirectory, image.localFileName(imageURL));

        if(!file.exists()) {
             // cached file does not exist, load the image
            image.addEventListener("load", image.saveImageOnLoad);
            image.image = imageURL;
        } else {
            //Ti.API.debug(image.localFileName(imageURL) + ' does exist, just setting image');
            image.image = file.nativePath;
        }
    };

    image.saveImageOnLoad = function(e) {
        //Ti.API.debug('saving image ' + image.localFileName(image.remoteImage));
        var f = Ti.Filesystem.getFile(somedirectory, image.localFileName(image.remoteImage));
        if(!f.read()) {
            f.write(e.source.toBlob());
        }
        e.source.removeEventListener('load', image.saveImageOnLoad);
    };

    image.localFileName = function(imageURL) {
        hashedSource = Ti.Utils.md5HexDigest(imageURL + '');
        return hashedSource;
    };
    if(params.image) {
        image.doRemote(params.image);
    }

    for(var v in params) {
        if(v != 'image') {
            image[v] = params[v];
        }
    }

    return image;
};

