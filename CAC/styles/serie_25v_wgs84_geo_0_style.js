var size = 0;
var placement = 'point';

var style_serie_25v_wgs84_geo_0 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    var value = ""
    var labelText = "";
    size = 0;
    var labelFont = "bold 16px \'MS Shell Dlg 2\', sans-serif";
    var labelFill = "rgba(0, 0, 0, 1)";
    var textAlign = "center";
    var offsetX = 0;
    var offsetY = 0;
    var placement = 'point';
    var labelStroke = "white";
    var labelStrokeWidth = 3;

    if (feature.get("TAVOLETTA") !== null) {
        labelText = String(feature.get("TAVOLETTA"));
    }
    var style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(0,90,37,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, textAlign, offsetX, offsetY, labelStroke, labelStrokeWidth)
    })];

    return style;
};
