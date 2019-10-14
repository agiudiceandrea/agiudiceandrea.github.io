var size = 0;
var placement = 'point';

var style_campomarino = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    var value = ""
    var labelText = "";
    size = 0;
    var labelFont = "12px \'MS Shell Dlg 2\', sans-serif";
    var labelFill = "rgba(227, 26, 28, 1)";
    var textAlign = "left";
    var offsetX = 8;
    var offsetY = -5;
    var placement = 'point';
    var labelStroke = "white";
    var labelStrokeWidth = 3;

    if (feature.get("UTC") !== null && resolution > 0 && resolution < 0.3) {
/*        labelText = "UTC " + String(feature.get("ut")); */
        labelText = "" + String(feature.get("UTC"));
    }
    var style = [ new ol.style.Style({
        image: new ol.style.RegularShape({radius: 6.0 + size, points: 4,
            stroke: new ol.style.Stroke({color: 'rgba(255,255,255,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 2}), fill: new ol.style.Fill({color: 'rgba(227,26,28,1.0)'})}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
/*                              labelFill, placement, labelStroke, labelStrokeWidth, offsetX, offsetY) */
                              labelFill, placement, textAlign, offsetX, offsetY, labelStroke, labelStrokeWidth)
    })];

    return style;
};
