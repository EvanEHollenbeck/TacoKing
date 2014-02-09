function loadImages(names, callback) {
    var i,
        image,
        result = [],
        count = names.length,
        onload = function() {if (--count == 0) callback(result); };

    for (i = 0; i < names.length; i++) {
        image = names[i];
        result[i] = new Image();
        result[i].addEventListener('load', onload);
        result[i].src = "img/" + image + ".png";
    }
}