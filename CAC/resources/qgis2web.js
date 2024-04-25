

var measuring = false;
var modifying = false;
var overlaysIndex;
var measureIndex;
var modifiedMeasureIndex;
var helpTooltipMsg = 'Click per iniziare a disegnare';
var continuePolygonMsg = 'Click per aggiungere un vertice';
var continueLineMsg = 'Click per aggiungere un vertice';
var modifyingTooltipMsg = 'Click e trascina i vertici';

measureControl = function(opt_options) {

  var options = opt_options || {};

  var button = document.createElement('button');
  button.setAttribute('title', 'Misura distanza');
  button.setAttribute('alt', 'Misura distanza');
  button.innerHTML = '<img src="resources/measure-control.png" />';

  var this_ = this;
  var handleMeasure = function(e) {
    if (!measuring) {
      this_.getMap().addInteraction(draw);
      this_.getMap().addInteraction(modifyInteraction);
      this_.getMap().addInteraction(selectAltClick);
      this_.getMap().addInteraction(snap);
      overlaysIndex = map.getOverlays().getLength();
      measureIndex = 0;
      createHelpTooltip();
      createMeasureTooltip();
      helpTooltipElement.innerHTML = helpTooltipMsg;
      measuring = true;
    } else {
      this_.getMap().removeInteraction(draw);
      this_.getMap().removeInteraction(draw2);
      this_.getMap().removeInteraction(modifyInteraction);
      this_.getMap().removeInteraction(selectAltClick);
      this_.getMap().removeInteraction(snap);
      measuring = false;
      measureIndex = 0;
      this_.getMap().removeOverlay(helpTooltip);
      this_.getMap().removeOverlay(measureTooltip);
      this_.getMap().getOverlays().getArray().slice(overlaysIndex).forEach(function(overlay) {
        this_.getMap().removeOverlay(overlay);
      });
      $( ".tooltip" ).remove();
      selectAltClick.getFeatures().clear();
      measureLayer.getSource().clear();
    }
  };

  button.addEventListener('click', handleMeasure, false);
  button.addEventListener('touchstart', handleMeasure, false);

  var element = document.createElement('div');
  element.className = 'measure-control ol-unselectable ol-control';
  element.appendChild(button);

  ol.control.Control.call(this, {
    element: element,
    target: options.target
  });

};

measureControl2 = function(opt_options) {

  var options = opt_options || {};

  var button = document.createElement('button');
  button.setAttribute('title', 'Misura area');
  button.setAttribute('alt', 'Misura area');
  button.innerHTML = '<img src="resources/measure-control2.png" />';

  var this_ = this;
  var handleMeasure = function(e) {
    if (!measuring) {
      this_.getMap().addInteraction(draw2);
      this_.getMap().addInteraction(modifyInteraction);
      this_.getMap().addInteraction(selectAltClick);
      this_.getMap().addInteraction(snap);
      overlaysIndex = map.getOverlays().getLength();
      measureIndex = 0;
      createHelpTooltip();
      createMeasureTooltip();
      helpTooltipElement.innerHTML = helpTooltipMsg;
      measuring = true;
    } else {
      this_.getMap().removeInteraction(draw2);
      this_.getMap().removeInteraction(draw);
      this_.getMap().removeInteraction(modifyInteraction);
      this_.getMap().removeInteraction(selectAltClick);
      this_.getMap().removeInteraction(snap);
      measuring = false;
      measureIndex = 0;
      this_.getMap().removeOverlay(helpTooltip);
      this_.getMap().removeOverlay(measureTooltip);
      this_.getMap().getOverlays().getArray().slice(overlaysIndex).forEach(function(overlay) {
        this_.getMap().removeOverlay(overlay);
      });
      $( ".tooltip" ).remove();
      selectAltClick.getFeatures().clear();
      measureLayer.getSource().clear();
    }
  };

  button.addEventListener('click', handleMeasure, false);
  button.addEventListener('touchstart', handleMeasure, false);

  var element = document.createElement('div');
  element.className = 'measure-control2 ol-unselectable ol-control';
  element.appendChild(button);

  ol.control.Control.call(this, {
    element: element,
    target: options.target
  });

};

ol.inherits(measureControl2, ol.control.Control);
ol.inherits(measureControl, ol.control.Control);

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
closer.onclick = function() {
    container.style.display = 'none';
    closer.blur();
    markerLayer.setVisible(false);
    return false;
};
var overlayPopup = new ol.Overlay({
    element: container
});

var expandedAttribution = new ol.control.Attribution({
    collapsible: false
});

var map = new ol.Map({
    controls: ol.control.defaults({attribution:false}).extend([
        expandedAttribution,
        new measureControl(),
        new measureControl2(),
        new ol.control.ScaleLine({minWidth: 200}),
//        new ol.control.ZoomSlider(),
        new ol.control.FullScreen({tipLabel: 'Schermo intero'}),
//        new ol.control.ZoomToExtent({extent: [666205.581372, 4548772.644111, 671179.853857, 4552155.819337], tipLabel: 'Vista iniziale', label: ''}),
        new ol.control.MousePosition({
          coordinateFormat: function(coord) {
              return "ETRS89 " + ol.coordinate.toStringHDMS(coord,2);
          },
          projection: 'EPSG:4326',
          undefinedHTML: ''
        }),
        new ol.control.MousePosition({
          coordinateFormat: function(coord) {
              return "ETRS89 " + ol.coordinate.format(coord, 'Lon: {x} - Lat: {y}', 6);
          },
          projection: 'EPSG:4326',
          className: 'ol-mouse-position2',
          undefinedHTML: ''
        }),

        new ol.control.MousePosition({
          coordinateFormat: function(coordinate) {
              return ol.coordinate.format(coordinate, 'ETRS89/UTM33N X: {x} - Y: {y}', 1);
          },
          projection: 'EPSG:25833',
          className: 'ol-mouse-position3',
          undefinedHTML: ''
        }),
    ]),
    target: document.getElementById('map'),
    renderer: 'canvas',
    overlays: [overlayPopup],
    layers: layersList,
    view: new ol.View({
         maxZoom: 25, minZoom: 10, projection: new ol.proj.Projection({
            code: 'EPSG:25833',
            units: 'm'})
    })
});

const marker = new ol.Feature({
  geometry: new ol.geom.Point([[]])
});
marker.setStyle(
  new ol.style.Style({
    image: new ol.style.Icon({
      src: "http://maps.google.com/mapfiles/kml/shapes/placemark_circle_highlight.png",
      anchor: [0.5, 0.5],
      scale: 0.5,
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      anchorOrigin: "bottom-left"
    })
  })
);
const markerLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [marker]
  })
});
map.addLayer(markerLayer);

var OSMperOverviewMap = new ol.layer.Tile({
		source: new ol.source.OSM()
             	});

var overviewMap = new ol.control.OverviewMap({
	  collapsed: false,
	  layers: [OSMperOverviewMap],
	  view: new ol.View({
	      projection: new ol.proj.Projection({
              	code: 'EPSG:25833',
              	units: 'm'
	      	}),
	  }),
	  tipLabel: 'Mappa panoramica'
});
/*
var scaleLineControl = new ol.control.CanvasScaleLine();
var titleControl = new ol.control.CanvasTitle();
titleControl.setTitle('Carta archeologica costiera e subacquea');
var attributionControl = new ol.control.CanvasAttribution();
attributionControl.setCanvas(true);
var compass = new ol.control.Compass (
  {	className: "top",
    src: 'resources/NorthArrow_02.svg',
  });

if (typeof sceltaLogo !== 'undefined') {
  var logo = new ol.control.Compass (
    {	className: "top-r-" + sceltaLogo,
      src: 'resources/' + sceltaLogo + '_low.png',
    });
}
var logoFir = new ol.control.Compass (
  {	className: "top-c-fir",
    src: 'resources/FIR_ stringa loghi.png',
  });

var saveButton = new ol.control.Button (
				{	html: '<i class="fa fa-download"></i>',
					className: "savebutton",
					title: "Salva file di immagine",
					handleClick: function () {
            map.addControl(compass);
            if (typeof sceltaLogo !== 'undefined') {map.addControl(logo);}
            map.addControl(logoFir);
            map.addControl(scaleLineControl);
            map.addControl(titleControl);
            map.addControl(attributionControl);
            map.once('postcompose', function(event) {
              var canvas = event.context.canvas;
              if (navigator.msSaveBlob) {
                navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
              } else {
                canvas.toBlob(function(blob) {
                  saveAs(blob, 'map.png');
                });
              }
            });
            map.renderSync();
            map.removeControl(scaleLineControl);
            map.removeControl(titleControl);
            map.removeControl(attributionControl);
            map.removeControl(compass);
            if (typeof sceltaLogo !== 'undefined') {map.removeControl(logo);}
            map.removeControl(logoFir);
          }
        });
map.addControl (saveButton);
*/

//map.getView().fit([1889407.198599, 5022748.107195, 1897336.103148, 5027897.317944], map.getSize());
map.getView().fit([666205.581372, 4548772.644111, 671179.853857, 4552155.819337], map.getSize());


map.addControl(overviewMap);


var layerSwitcher = new ol.control.LayerSwitcher({tipLabel: "Layers"});
map.addControl(layerSwitcher);
// layerSwitcher.hidePanel = function() {};
layerSwitcher.showPanel();


/*
map.getView().on('change:resolution', function (e) {
   if (map.getView().getZoom() > 18) {
       if (map.removeLayer(lyr_BA_TAM_001233_18)) {
			map.addLayer(lyr_BA_TAM_001233_18_2);
			layersList.splice(layersList.indexOf(lyr_BA_TAM_001233_18),1,lyr_BA_TAM_001233_18_2);
	   }
       if (map.removeLayer(lyr_BA_S_G_25)) {
			map.addLayer(lyr_BA_S_G_25_2);
			layersList.splice(layersList.indexOf(lyr_BA_S_G_25),1,lyr_BA_S_G_25_2);
	   }
       if (map.removeLayer(lyr_BA_LIA_2018_III_0)) {
			map.addLayer(lyr_BA_LIA_2018_III_0_2);
			layersList.splice(layersList.indexOf(lyr_BA_LIA_2018_III_0),1,lyr_BA_LIA_2018_III_0_2);
	   }
   }
   if (map.getView().getZoom() <= 18) {
       if (map.removeLayer(lyr_BA_TAM_001233_18_2)) {
			map.addLayer(lyr_BA_TAM_001233_18);
			layersList.splice(layersList.indexOf(lyr_BA_TAM_001233_18_2),1,lyr_BA_TAM_001233_18);
	   }
       if (map.removeLayer(lyr_BA_S_G_25_2)) {
			map.addLayer(lyr_BA_S_G_25);
			layersList.splice(layersList.indexOf(lyr_BA_S_G_25_2),1,lyr_BA_S_G_25);
	   }
       if (map.removeLayer(lyr_BA_LIA_2018_III_0_2)) {
			map.addLayer(lyr_BA_LIA_2018_III_0);
			layersList.splice(layersList.indexOf(lyr_BA_LIA_2018_III_0_2),1,lyr_BA_LIA_2018_III_0);
	   }
   }
});
*/




var NO_POPUP = 0
var ALL_FIELDS = 1

/**
 * Returns either NO_POPUP, ALL_FIELDS or the name of a single field to use for
 * a given layer
 * @param layerList {Array} List of ol.Layer instances
 * @param layer {ol.Layer} Layer to find field info about
 */
function getPopupFields(layerList, layer) {
    // Determine the index that the layer will have in the popupLayers Array,
    // if the layersList contains more items than popupLayers then we need to
    // adjust the index to take into account the base maps group
    var idx = layersList.indexOf(layer) - (layersList.length - popupLayers.length);
    return popupLayers[idx];
}


var collection = new ol.Collection();
var featureOverlay = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: collection,
        useSpatialIndex: false // optional, might improve performance
    }),
    style: [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#f00',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.1)'
        }),
    })],
    updateWhileAnimating: true, // optional, for instant visual feedback
    updateWhileInteracting: true // optional, for instant visual feedback
});

var doHighlight = false;
var doHover = false;

var highlight;
var onPointerMove = function(evt) {
    if (!doHover && !doHighlight) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var popupField;
    var popupText = '';
    var currentFeature;
    var currentLayer;
    var currentFeatureKeys;
    var count = 1;
    var clusteredFeatures;
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        // We only care about features from layers in the layersList, ignore
        // any other layers which the map might contain such as the vector
        // layer used by the measure tool
        if (layersList.indexOf(layer) === -1) {
            return;
        }
        var doPopup = false;
        if (count == 1) {
            for (k in layer.get('fieldImages')) {
                if (layer.get('fieldImages')[k] != "Hidden") {
                    doPopup = true;
                }
            }
            currentFeature = feature;
            currentLayer = layer;
            clusteredFeatures = feature.get("features");
            var clusterFeature;
            if (typeof clusteredFeatures !== "undefined") {
                if (doPopup) {
                    popupText = '<ul>';
                    for(var n=0; n<clusteredFeatures.length; n++) {
                        clusterFeature = clusteredFeatures[n];
                        currentFeatureKeys = clusterFeature.getKeys();
                        popupText = popupText + '<li><table>'
                        for (var i=0; i<currentFeatureKeys.length; i++) {
                            if (currentFeatureKeys[i] != 'geometry') {
                                popupField = '';
                                if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label") {
                                popupField += '<th>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</th><td>';
                                } else {
                                    popupField += '<td colspan="2">';
                                }
                                if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label") {
                                    popupField += '<strong>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</strong><br />';
                                }
                                if (layer.get('fieldImages')[currentFeatureKeys[i]] != "Photo") {
                                    popupField += (clusterFeature.get(currentFeatureKeys[i]) != null ? Autolinker.link(String(clusterFeature.get(currentFeatureKeys[i]))) + '</td>' : '');
                                } else {
                                    popupField += (clusterFeature.get(currentFeatureKeys[i]) != null ? '<img src="images/' + clusterFeature.get(currentFeatureKeys[i]).replace(/[\\\/:]/g, '_').trim()  + '" /></td>' : '');
                                }
                                popupText = popupText + '<tr>' + popupField + '</tr>';
                            }
                        } 
                        popupText = popupText + '</table></li>';    
                    }
                    popupText = popupText + '</ul>';
                }
            } else {
                currentFeatureKeys = currentFeature.getKeys();
                if (doPopup) {
                    popupText = '<table>';
                    for (var i=0; i<currentFeatureKeys.length; i++) {
                        if (currentFeatureKeys[i] != 'geometry') {
                            popupField = '';
                            if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label") {
                                popupField += '<th>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</th><td>';
                            } else {
                                popupField += '<td colspan="2">';
                            }
                            if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label") {
                                popupField += '<strong>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</strong><br />';
                            }
                            if (layer.get('fieldImages')[currentFeatureKeys[i]] != "Photo") {
                                popupField += (currentFeature.get(currentFeatureKeys[i]) != null ? Autolinker.link(String(currentFeature.get(currentFeatureKeys[i]))) + '</td>' : '');
                            } else {
                                popupField += (currentFeature.get(currentFeatureKeys[i]) != null ? '<img src="images/' + currentFeature.get(currentFeatureKeys[i]).replace(/[\\\/:]/g, '_').trim()  + '" /></td>' : '');
                            }
                            popupText = popupText + '<tr>' + popupField + '</tr>';
                        }
                    }
                    popupText = popupText + '</table>';
                }
            }
        }
        count++;
    });

    if (doHighlight) {
        if (currentFeature !== highlight) {
            if (highlight) {
                featureOverlay.getSource().removeFeature(highlight);
            }
            if (currentFeature) {
                var styleDefinition = currentLayer.getStyle().toString();

                if (currentFeature.getGeometry().getType() == 'Point') {
                    var radius = styleDefinition.split('radius')[1].split(' ')[1];

                    highlightStyle = new ol.style.Style({
                        image: new ol.style.Circle({
                            fill: new ol.style.Fill({
                                color: "#ffff00"
                            }),
                            radius: radius
                        })
                    })
                } else if (currentFeature.getGeometry().getType() == 'LineString') {

                    var featureWidth = styleDefinition.split('width')[1].split(' ')[1].replace('})','');

                    highlightStyle = new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: '#ffff00',
                            lineDash: null,
                            width: featureWidth
                        })
                    });

                } else {
                    highlightStyle = new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: '#ffff00'
                        })
                    })
                }
                featureOverlay.getSource().addFeature(currentFeature);
                featureOverlay.setStyle(highlightStyle);
            }
            highlight = currentFeature;
        }
    }

    if (doHover) {
        if (popupText) {
            overlayPopup.setPosition(coord);
            content.innerHTML = popupText;
            container.style.display = 'block';        
        } else {
            container.style.display = 'none';
            closer.blur();
        }
    }
};

var onSingleClick = function(evt) {
    if (doHover || measuring) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var popupField;
    var popupText = '';
    var currentFeature;
    var currentFeatureKeys;
    var count = 1;
    var clusteredFeatures;
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        if (feature instanceof ol.Feature) {
            var doPopup = false;
            if (count == 1) {
                for (k in layer.get('fieldImages')) {
                    if (layer.get('fieldImages')[k] != "Hidden") {
                        doPopup = true;
                    }
                }
                currentFeature = feature;
                clusteredFeatures = feature.get("features");
                var clusterFeature;
                if (typeof clusteredFeatures !== "undefined") {
                    if (doPopup) {
                        popupText = '<ul>';
                        for(var n=0; n<clusteredFeatures.length; n++) {
                            clusterFeature = clusteredFeatures[n];
                            currentFeatureKeys = clusterFeature.getKeys();
                            popupText = popupText + '<li><table>'
                            for (var i=0; i<currentFeatureKeys.length; i++) {
                                if (currentFeatureKeys[i] != 'geometry') {
                                    popupField = '';
                                    if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label") {
                                    popupField += '<th>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</th><td>';
                                    } else {
                                        popupField += '<td colspan="2">';
                                    }
                                    if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label") {
                                        popupField += '<strong>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</strong><br />';
                                    }
                                    if (layer.get('fieldImages')[currentFeatureKeys[i]] != "Photo") {
                                        popupField += (clusterFeature.get(currentFeatureKeys[i]) != null ? Autolinker.link(String(clusterFeature.get(currentFeatureKeys[i]))) + '</td>' : '');
                                    } else {
                                        popupField += (clusterFeature.get(currentFeatureKeys[i]) != null ? '<img src="images/' + clusterFeature.get(currentFeatureKeys[i]).replace(/[\\\/:]/g, '_').trim()  + '" /></td>' : '');
                                    }
                                    popupText = popupText + '<tr>' + popupField + '</tr>';
                                }
                            } 
                            popupText = popupText + '</table></li>';    
                        }
                        popupText = popupText + '</ul>';
                    }
                } else {
                    currentFeatureKeys = currentFeature.getKeys();
                    if (doPopup) {
                        popupText = '<table>';
                        for (var i=0; i<currentFeatureKeys.length; i++) {
                            if (currentFeatureKeys[i] != 'geometry') {
                                popupField = '';
                                if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label") {
                                    popupField += '<th>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</th><td>';
                                } else {
                                    popupField += '<td colspan="2">';
                                }
                                if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label") {
                                    popupField += '<strong>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</strong><br />';
                                }
                                if (layer.get('fieldImages')[currentFeatureKeys[i]] != "Photo") {
                                    popupField += (currentFeature.get(currentFeatureKeys[i]) != null ? Autolinker.link(String(currentFeature.get(currentFeatureKeys[i]))) + '</td>' : '');
                                } else {
                                    popupField += (currentFeature.get(currentFeatureKeys[i]) != null ? '<a href="images/' +  currentFeature.get(currentFeatureKeys[i]).replace(/[\\\/:]/g, '_').trim() + '" target="_blank"><img src="images/' + currentFeature.get(currentFeatureKeys[i]).replace(/[\\\/:]/g, '_').trim()  + '" width="300" /></td></a>' : '');
                                }
                                popupText = popupText + '<tr>' + popupField + '</tr>';
                            }
                        }
                        popupText = popupText + '</table>';
                    }
                }
            }
            count++;
        }
    });

    var viewProjection = map.getView().getProjection();
    var viewResolution = map.getView().getResolution();
    var wmsgetfeatureinfo = false;
    for (i = 0; i < wms_layers.length; i++) {
        if (wms_layers[i][1] && wms_layers[i][0].getVisible()) {
            var url = wms_layers[i][0].getSource().getGetFeatureInfoUrl(
                evt.coordinate, viewResolution, viewProjection,
                {
                    'INFO_FORMAT': 'text/html',
                });
            if (url) {
/*		$.get(url).then(function(response) {
			if (response.toUpperCase().split("<TR>").length - 2 !== 0) { */
/*                doGetCORSRequest(url, function printResult(response) {
                    if (response.toUpperCase().split('<TR>').length - 2 !== 0) { */
                        popupText = popupText + wms_layers[i][0].getProperties().title + '<iframe style="width:100%;height:200px;border:0px;" id="iframe" seamless src="' + url + '"></iframe>';
                        var wmsgetfeatureinfo = true;
/*                    }
                }); */
/*			}
		}); */
            }
        }
    }

    var coordToCopy = false;
    if (evt.originalEvent.ctrlKey) {
        var coordToCopyText = "ETRS89 " + ol.coordinate.toStringHDMS(ol.proj.transform(coord, viewProjection, 'EPSG:4326'),2) + "<br>";
        coordToCopyText += "<br>" + ol.coordinate.format(ol.proj.transform(coord, viewProjection, 'EPSG:4326'), 'ETRS89 Lon: {x} - Lat: {y}', 6) + "<br>";
        coordToCopyText += "<br>" + ol.coordinate.format(coord, 'ETRS89/UTM33N X: {x} - Y: {y}', 1);
        popupText = coordToCopyText;
        marker.getGeometry().setCoordinates(coord);
        markerLayer.setVisible(true);
        var coordToCopy = true;
    }

    if (popupText) {
	if (wmsgetfeatureinfo) { $('#popup').css('min-width','500px'); } else if (coordToCopy) { $('#popup').css('min-width','350px'); } else { $('#popup').css('min-width','170px'); } 
        overlayPopup.setPosition(coord);
        content.innerHTML = popupText;
        container.style.display = 'block';  
    } else {
        container.style.display = 'none';
        closer.blur();
    }
};


map.on('pointermove', function(evt) {
  if (!measuring || (!modifying && evt.dragging)) {
    return;
  }
  helpTooltip.setPosition(evt.coordinate);
});

map.on('pointermove', function(evt) {
    onPointerMove(evt);
});
map.on('singleclick', function(evt) {
    onSingleClick(evt);
});

var sketch;
var helpTooltipElement;
var helpTooltip;
var measureTooltipElement;
var measureTooltip;


var measureSource = new ol.source.Vector();

var measureLayer = new ol.layer.Vector({
    source: measureSource,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 3
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ffcc33'
            })
        })
    })
});

map.addLayer(measureLayer);

var draw;
function addInteraction() {
  var type = 'LineString';
  draw = new ol.interaction.Draw({
    source: measureSource,
    type: (type),
    style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2
      }),
      image: new ol.style.Circle({
        radius: 5,
        stroke: new ol.style.Stroke({
          color: 'rgba(0, 0, 0, 0.7)'
        }),
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        })
      })
    })
  });

  var listener;
  draw.on('drawstart',
    function(evt) {
      selectAltClick.getFeatures().clear();
      helpTooltipElement.innerHTML = continueLineMsg;
      sketch = evt.feature;
      var tooltipCoord = evt.coordinate;
      listener = sketch.getGeometry().on('change', function(evt) {
        var geom = evt.target;
        var output;
        output = formatLength((geom));
        tooltipCoord = geom.getLastCoordinate();
        measureTooltipElement.innerHTML = output;
        measureTooltip.setPosition(tooltipCoord);
      });
    }, this);

  draw.on('drawend',
    function(evt) {
      evt.feature.setId(measureIndex);
      measureTooltipElement.className = 'tooltip tooltip-static';
      measureTooltipElement.id = 'measure_' + measureIndex;
      measureTooltip.setOffset([0, -7]);
      sketch = null;
      measureTooltipElement = null;
      measureIndex++;
      createMeasureTooltip();
      helpTooltipElement.innerHTML = helpTooltipMsg;
      ol.Observable.unByKey(listener);
    }, this);
}


var draw2;
function addInteraction2() {
  var type = 'Polygon';
  draw2 = new ol.interaction.Draw({
    source: measureSource,
    type: (type),
    style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2
      }),
      image: new ol.style.Circle({
        radius: 5,
        stroke: new ol.style.Stroke({
          color: 'rgba(0, 0, 0, 0.7)'
        }),
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        })
      })
    })
  });

  var listener;
  draw2.on('drawstart',
    function(evt) {
      selectAltClick.getFeatures().clear();
      helpTooltipElement.innerHTML = continuePolygonMsg;
      sketch = evt.feature;
      var tooltipCoord = evt.coordinate;
      listener = sketch.getGeometry().on('change', function(evt) {
        var geom = evt.target;
        var output;
          output = formatArea((geom));
          tooltipCoord = geom.getInteriorPoint().getCoordinates();
        measureTooltipElement.innerHTML = output;
        measureTooltip.setPosition(tooltipCoord);
      });
    }, this);

  draw2.on('drawend',
    function(evt) {
      evt.feature.setId(measureIndex);
      measureTooltipElement.className = 'tooltip tooltip-static';
      measureTooltipElement.id = 'measure_' + measureIndex;
      measureTooltip.setOffset([0, -7]);
      sketch = null;
      measureTooltipElement = null;
      measureIndex++;
      createMeasureTooltip();
      helpTooltipElement.innerHTML = helpTooltipMsg;
      ol.Observable.unByKey(listener);
    }, this);
}

var modifyInteraction;
function addModifyInteraction() {
  modifyInteraction = new ol.interaction.Modify({
    features: selectAltClick.getFeatures(),
  });

  var listener;
  modifyInteraction.on('modifystart',
    function(evt) {
      sketch = evt.features.item(0);
      modifiedMeasureIndex = sketch.getId();
      measureTooltip = map.getOverlayById(modifiedMeasureIndex);
      measureTooltipElement = measureTooltip.getElement();
      measureTooltipElement.className = 'tooltip tooltip-measure';
      var tooltipCoord = evt.coordinate;
      listener = sketch.getGeometry().on('change', function(evt) {
        var geom = evt.target;
        var output;
        if (geom instanceof ol.geom.Polygon) {
          output = formatArea(geom);
          tooltipCoord = geom.getInteriorPoint().getCoordinates();
        } else if (geom instanceof ol.geom.LineString) {
          output = formatLength(geom);
          tooltipCoord = geom.getLastCoordinate();
        }
        measureTooltipElement.innerHTML = output;
        measureTooltip.setPosition(tooltipCoord);
      });
    }, this);

  modifyInteraction.on('modifyend',
    function(evt) {
      measureTooltipElement.className = 'tooltip tooltip-static';
      measureTooltipElement.id = 'measure_' + modifiedMeasureIndex;
      measureTooltip.setOffset([0, -7]);
      sketch = null;
      measureTooltipElement = null;
      measureTooltip = map.getOverlayById(measureIndex);
      measureTooltipElement = measureTooltip.getElement();
      ol.Observable.unByKey(listener);
    }, this);
}

function createHelpTooltip() {
  if (helpTooltipElement) {
    helpTooltipElement.parentNode.removeChild(helpTooltipElement);
  }
  helpTooltipElement = document.createElement('div');
  helpTooltipElement.className = 'tooltip hidden';
  helpTooltip = new ol.Overlay({
    element: helpTooltipElement,
    offset: [15, 0],
    positioning: 'center-left'
  });
  map.addOverlay(helpTooltip);
}
function createMeasureTooltip() {
  if (measureTooltipElement) {
    measureTooltipElement.parentNode.removeChild(measureTooltipElement);
  }
  measureTooltipElement = document.createElement('div');
  measureTooltipElement.className = 'tooltip tooltip-measure';
  measureTooltip = new ol.Overlay({
    element: measureTooltipElement,
    id: measureIndex,
    offset: [0, -15],
    positioning: 'bottom-center'
  });
  map.addOverlay(measureTooltip);
}

var wgs84Sphere = new ol.Sphere(6378137);


var formatLength = function(line) {
  var length;
  var coordinates = line.getCoordinates();
  length = 0;
  var sourceProj = map.getView().getProjection();
  for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
      var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
      var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
      length += wgs84Sphere.haversineDistance(c1, c2);
    }
  var output;
  if (length > 1000) {
    output = (Math.round(length / 1000 * 100) / 100).toLocaleString('it-IT') + ' ' + 'km';
  } else {
    output = (Math.round(length * 100) / 100).toLocaleString('it-IT') + ' ' + 'm';
  }
  return output;
};


var formatArea = function(polygon) {
  var area = ol.Sphere.getArea(polygon);
  var output;
  if (area > 100000) {
    output = (Math.round(area / 1000000 * 100) / 100).toLocaleString('it-IT') + ' ' + 'km<sup>2</sup>';
  } else {
    output = (Math.round(area * 100) / 100).toLocaleString('it-IT') + ' ' + 'm<sup>2</sup>';
  }
  return output;
};


addInteraction();
addInteraction2();


var selectAltClick;
function addSelectInteraction() {
  selectAltClick = new ol.interaction.Select({
    condition: function(mapBrowserEvent) {
      return ol.events.condition.click(mapBrowserEvent) &&
          ol.events.condition.altKeyOnly(mapBrowserEvent);
    },
    layers: [measureLayer]
  });
  selectAltClick.on('select',
    function(evt) {
      modifying = evt.selected.length > 0;
      helpTooltipElement.innerHTML = modifying ? modifyingTooltipMsg : helpTooltipMsg;
    }, this);
}

addSelectInteraction();

addModifyInteraction();


var snap = new ol.interaction.Snap({
  source: measureSource
});


var geolocation = new ol.Geolocation({
  projection: map.getView().getProjection()
});

geolocation.setTracking(true);

var positionFeature = new ol.Feature({
  geometry: new ol.geom.Point([])
});
positionFeature.setStyle(new ol.style.Style({
  image: new ol.style.Circle({
    radius: 4,
    fill: new ol.style.Fill({
      color: '#3399CC'
    }),
    stroke: new ol.style.Stroke({
      color: '#fff',
      width: 1
    })
  })
}));
var accuracyFeature = new ol.Feature();
var locationSource = new ol.source.Vector({
  features: [positionFeature, accuracyFeature]
});
var locationVector = new ol.layer.Vector({
  source: locationSource
});

geolocation.on('change', function(evt) {
  var coord = geolocation.getPosition();
  positionFeature.getGeometry().setCoordinates(coord);
//  map.getView().setCenter(coord);
    });
geolocation.on('change:accuracyGeometry', function() {
        accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
      });

map.addLayer(locationVector);


var attribution = document.getElementsByClassName('ol-attribution')[0];
var attributionList = attribution.getElementsByTagName('ul')[0];
var firstLayerAttribution = attributionList.getElementsByTagName('li')[0];
var qgis2webAttribution = document.createElement('li');
qgis2webAttribution.innerHTML = '<a href="https://github.com/tomchadwin/qgis2web">qgis2web</a>';
attributionList.insertBefore(qgis2webAttribution, firstLayerAttribution);

