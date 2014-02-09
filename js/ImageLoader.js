function loadImages(names, callback) {
    var i,
        image,
        result = {},
        count = names.length,
        onload = function() {if (--count == 0) callback(result); };

    for (i = 0; i < names.length; i++) {
        image = names[i];
        result = new Image();
        result[image].addEventListener('load', onload);
        result[image].src = "img/" + image + ".png";
    }
}