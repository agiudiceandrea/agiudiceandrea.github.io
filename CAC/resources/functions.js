var createTextStyle = function(feature, resolution, labelText, labelFont,
/*                               labelFill, placement, labelStroke, labelStrokeWidth, offSetX, offSetY) { */
                               labelFill, placement, textalign, offSetX, offSetY, labelStroke, labelStrokeWidth) {

    if (feature.hide || !labelText) {
        return; 
    } 

    var textStyle = new ol.style.Text({
        font: labelFont,
        text: labelText,
        textBaseline: "middle",
        textAlign: textalign,
        offsetX: offSetX,
        offsetY: offSetY,
        placement: placement,
        maxAngle: 0,
        fill: new ol.style.Fill({
          color: labelFill
        }),
	stroke: new ol.style.Stroke({color: labelStroke, width: labelStrokeWidth})
    });

    return textStyle;
};

function stripe(stripeWidth, gapWidth, angle, color) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = screen.width;
    canvas.height = stripeWidth + gapWidth;
    context.fillStyle = color;
    context.lineWidth = stripeWidth;
    context.fillRect(0, 0, canvas.width, stripeWidth);
    innerPattern = context.createPattern(canvas, 'repeat');

    var outerCanvas = document.createElement('canvas');
    var outerContext = outerCanvas.getContext('2d');
    outerCanvas.width = screen.width;
    outerCanvas.height = screen.height;
    outerContext.rotate((Math.PI / 180) * angle);
    outerContext.translate(-(screen.width/2), -(screen.height/2));
    outerContext.fillStyle = innerPattern;
    outerContext.fillRect(0,0,screen.width,screen.height);

    return outerContext.createPattern(outerCanvas, 'no-repeat');
};

function getResolutionFromScale(scale){
	var dpi = 25.4 / 0.28;
/*	var units = map.getView().getProjection().getUnits();
	var mpu = ol.proj.METERS_PER_UNIT[units];
	var res = scale / (mpu * 39.37 * dpi); */
	var res = scale / (39.37 * dpi);
	return res;
};

function getScaleFromResolution(resolution){
	var dpi = 25.4 / 0.28;
/*	var units = map.getView().getProjection().getUnits();
	var mpu = ol.proj.METERS_PER_UNIT[units];
	var res = scale / (mpu * 39.37 * dpi); */
	var scale = resolution * 39.37 * dpi;
	return scale;
};

var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
function doGetCORSRequest(url, printResult) {
    var x = new XMLHttpRequest();
    x.open('GET', cors_api_url + url);
    x.onload = x.onerror = function() {
      printResult(
        (x.responseText || '')
      );
    };
    x.send();
};
