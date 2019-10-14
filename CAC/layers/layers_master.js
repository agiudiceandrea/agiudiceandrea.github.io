ol.proj.get("EPSG:25833").setExtent([666205.581372, 4548772.644111, 671179.853857, 4552155.819337]);

var ortoSitPugliaAttribution = new ol.Attribution({ html: ' | Ortofoto by <a href="http://www.sit.puglia.it/" target="_blank">SIT Regione Puglia</a>, <a href="https://www.dati.gov.it/content/italian-open-data-license-v20" target="_blank">IODL 2.0</a>'});
var ortoSitPugliaAgeaAttribution = new ol.Attribution({html: ' | Ortofoto by <a href="http://www.sit.puglia.it/" target="_blank">SIT Regione Puglia</a> - &copy; <a href="https://www.agea.gov.it/" target="_blank">AGEA</a>'});
var ortoDemanioPugliaAttribution = new ol.Attribution({html: ' | Ortofoto by <a href="http://93.63.173.228/cms/" target="_blank">Ufficio del Demanio Maritto - Regione Puglia</a>'});
var datiSitPugliaAttribution = new ol.Attribution({ html: ' | Dati by <a href="http://www.sit.puglia.it/" target="_blank">SIT Regione Puglia</a>, <a href="https://www.dati.gov.it/content/italian-open-data-license-v20" target="_blank">IODL 2.0</a>'});
var ctrSitPugliaAttribution = new ol.Attribution({ html: ' | CTR by <a href="http://www.sit.puglia.it/" target="_blank">SIT Regione Puglia</a>, <a href="https://www.dati.gov.it/content/italian-open-data-license-v20" target="_blank">IODL 2.0</a>'});
var topoGpnIgmAttribution = new ol.Attribution({ html: ' | Topografia by <a href="http://www.pcn.minambiente.it/" target="_blank">Geoportale Nazionale</a> - &copy; <a href="http://www.igmi.org/" target="_blank">IGM</a>'});
var catastaleAttribution = new ol.Attribution({html: '| Catastale by <a href="https://geoportale.cartografia.agenziaentrate.gov.it/" target="_blank">Geoportale Cartografico Catastale / Agenzia delle Entrate</a>, <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">CC BY-NC-ND 4.0</a>'});
var topoPcpIgmAttribution = new ol.Attribution({ html: ' | Topografia by <a href="http://www.protezionecivile.puglia.it/" target="_blank">Protezione Civile Puglia</a> - &copy; <a href="http://www.igmi.org/" target="_blank">IGM</a>'});
var geoSGIAttribution = new ol.Attribution({ html: ' | Geologia by <a href="http://portalesgi.isprambiente.it/" target="_blank">Servizio Geologico d&rsquo;Italia</a> - <a href="http://www.isprambiente.gov.it/" target="_blank">ISPRA</a>'});
var datiFSPAttribution = new ol.Attribution({ html: ' | Dati by <a href="http://www.fspuglia.it/" target="_blank">Federeazione Speleologica Pugliese</a>'});
var ortoGeoportaleAttribution = new ol.Attribution({ html: ' | Ortofoto by <a href="http://www.pcn.minambiente.it/" target="_blank">Geoportale Nazionale</a>'});
var quadriUnioneIGM = new ol.Attribution({ html: ' | Quadri unione by <a href="http://www.igmi.org/" target="_blank">Istituto Geografico Militare</a>'});
var stradeGeoportaleAttribution = new ol.Attribution({ html: ' | Carta stradale by <a href="http://www.pcn.minambiente.it/" target="_blank">Geoportale Nazionale</a>'});

var wms_layers = [];

var lyr_trasparente = new ol.layer.Tile({
    'title': 'Trasparente',
    'type': 'base',
});

var baseLayer = new ol.layer.Group({
    'title': 'Mappe di base',
    'fold': 'open',
    layers: [lyr_trasparente,

/**********************
new ol.layer.Tile({
    'title': 'DTM - SIT Puglia',
    'type': 'base',
    source: new ol.source.TileWMS(({
                              url: "http://webapps.sit.puglia.it/arcgis/services/BaseMaps/DTMColori/ImageServer/WMSServer",
    attributions: [datiSitPugliaAttribution],
                              params: {
                                "LAYERS": "0",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            opacity: 1.000000,
}),
new ol.layer.Image({
    'title': 'DTM / ombreggiature - SIT Puglia',
    'type': 'base',
    source: new ol.source.ImageWMS(({
                              url: "http://webapps.sit.puglia.it/arcgis/services/BaseMaps/CartaOmbreggiature/ImageServer/WMSServer",
    attributions: [ndatiSitPugliaAttribution],
                              ratio: 1,
                              params: {
                                "LAYERS": "0",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            opacity: 1.000000,
}),
******************************/

 

new ol.layer.Tile({
    'title': 'Immagini satellitari Bing Maps',
    'type': 'base',
    source: new ol.source.BingMaps({
          key: 'AgWv2ERAAUGvcsfCEL1WNaGoaCwFD3M2FcxcAqLkq46NsNeMiuk9SJm9CC9zo5Ft',
          imagerySet: 'Aerial',
          maxZoom: 19
        })
}),

new ol.layer.Tile({
    'title': 'ESRI World Imagery (Clarity)',
    'type': 'base',
    source: new ol.source.XYZ({
        url: 'https://clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attributions: [new ol.Attribution({html: 'Map tiles by <a href="http://www.arcgis.com/home/item.html?id=ab399b847323487dba26809bf11ea91a" target="_blank">Esri, DigitalGlobe, GeoEye, Earthstar Geographics, and the GIS User Community</a>'})]
    })
}),

new ol.layer.Tile({
    'title': 'ESRI World Topographic Map',
    'type': 'base',
    source: new ol.source.XYZ({
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        attributions: [new ol.Attribution({html: 'Map tiles by <a href="hhttps://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer" target="_blank">Esri, HERE, Garmin, Intermap, increment P Corp., GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), swisstopo, the GIS User Community</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'})]
    })
}),


new ol.layer.Image({
    source: new ol.source.ImageWMS(({
      url: "http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/raster/de_agostini.map",
      attributions: [stradeGeoportaleAttribution],
      ratio: 1,
      params: {
        "LAYERS": "CB.DEAGOSTINI.32",
        "TILED": "true",
        "VERSION": "1.3.0"
      },
      projection: 'EPSG:32633'
      })),
    title: "Carta stradale DeAgostini - GN",
    'type': 'base',
    opacity: 1.000000,
}),


new ol.layer.Tile({
    'title': 'OpenStreetMap',
    'type': 'base',
    source: new ol.source.OSM()
}),
new ol.layer.Tile({
    'title': 'OpenStreetMap - Hillshading',
    'type': 'base',
    source: new ol.source.XYZ({
        url: 'http://tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png',
        attributions: [new ol.Attribution({html: 'Map tiles by <a href="http://stamen.com" target="_blank">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0" target="_blank">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'})]
    })
}),
new ol.layer.Tile({
    'title': 'Stamen Terrain',
    'type': 'base',
    source: new ol.source.Stamen({layer: 'terrain'})
}),
new ol.layer.Tile({
    'title': 'Stamen b/w',
    'type': 'base',
    source: new ol.source.Stamen({layer: 'toner-lite'})
}),
new ol.layer.Tile({
    'title': 'Stamen Watercolor',
    'type': 'base',
    'visible': 'true',
    source: new ol.source.Stamen({
        layer: 'watercolor'
    })
})
]
});


var lyr_Ortofoto19881989PCN_28 = new ol.layer.Image({
                            source: new ol.source.ImageWMS(({
                              url: "http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/raster/ortofoto_bn_88.map",
    attributions: [ortoGeoportaleAttribution],
                              ratio: 1,
                              params: {
                                "LAYERS": "OI.ORTOIMMAGINI.1988.33,OI.ORTOIMMAGINI.1988.32",
                                "TILED": "true",
                                "VERSION": "1.3.0"
                              },
                              projection: 'EPSG:32633'
                            })),
                            title: "1988/1989 - Geoportale Nazionale",
			    'type': 'base',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Ortofoto19881989PCN_28, 0]);


var lyr_Ortofoto19941998PCN_29 = new ol.layer.Image({
                            source: new ol.source.ImageWMS(({
                              url: "http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/raster/ortofoto_bn_94.map",
    attributions: [ortoGeoportaleAttribution],
                              ratio: 1,
                              params: {
                                "LAYERS": "OI.ORTOIMMAGINI.1994.33,OI.ORTOIMMAGINI.1994.32",
                                "TILED": "true",
                                "VERSION": "1.3.0"
                              },
                              projection: 'EPSG:32633'
                            })),
                            title: "1994/1998 - Geoportale Nazionale",
			    'type': 'base',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Ortofoto19941998PCN_29, 0]);


var lyr_Ortofoto2006SITPuglia_0 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://webapps.sit.puglia.it/arcgis/services/BaseMaps/Ortofoto2006/ImageServer/WMSServer",
    attributions: [ortoSitPugliaAttribution],
                              params: {
                                "LAYERS": "0",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "2006 - SIT Puglia",
			    'type': 'base',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Ortofoto2006SITPuglia_0, 0]);

var lyr_Ortofoto2010SITPuglia_1 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://webapps.sit.puglia.it/arcgis/services/BaseMaps/Ortofoto2010/ImageServer/WMSServer",
    attributions: [ortoSitPugliaAgeaAttribution],
                              params: {
                                "LAYERS": "0",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "2010 - SIT Puglia / AGEA",
			    'type': 'base',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Ortofoto2010SITPuglia_1, 0]);

var lyr_Ortofoto2010CosteSITPuglia_1 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://iws.sit.puglia.it/ecwp/ecw_wms.dll?",
    attributions: [ortoSitPugliaAttribution],
                              params: {
                                "LAYERS": "IMAGES_PUGLIACOSTE_2010.ECW",
                                "TILED": "true",
                                "VERSION": "1.1.1",
                                "EXCEPTIONS": "application/vnd.ogc.se_xml"},
                              projection: 'EPSG:32633'
                            })),
                            title: "2010 - Coste - SIT Puglia",
			    'type': 'base',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Ortofoto2010CosteSITPuglia_1, 0]);

var lyr_Ortofoto2011SITPuglia_2 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://webapps.sit.puglia.it/arcgis/services/BaseMaps/Ortofoto2011/ImageServer/WMSServer",
    attributions: [ortoSitPugliaAttribution],
                              params: {
                                "LAYERS": "0",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "2011 - SIT Puglia",
			    'type': 'base',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Ortofoto2011SITPuglia_2, 0]);

var lyr_Ortofoto2013SITPuglia_3 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://webapps.sit.puglia.it/arcgis/services/BaseMaps/Ortofoto2013/ImageServer/WMSServer",
    attributions: [ortoSitPugliaAgeaAttribution],
                              params: {
                                "LAYERS": "0",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "2013 - SIT Puglia / AGEA",
			    'type': 'base',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Ortofoto2013SITPuglia_3, 0]);

var lyr_Ortofoto2016SITPuglia_4 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://webapps.sit.puglia.it/arcgis/services/BaseMaps/Ortofoto2016/ImageServer/WMSServer",
    attributions: [ortoSitPugliaAgeaAttribution],
                              params: {
                                "LAYERS": "0",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "2016 - SIT Puglia / AGEA",
			    'type': 'base',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Ortofoto2016SITPuglia_4, 0]);

var lyr_Ortofoto2017DemaniomarittimoPuglia_5 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://93.63.173.228/cgi-bin/mapserv?MAP=%2Fhome%2Fgis%2Fweb%2Fcake%2Ficpro_demanio%2Fmaps%2Fmapfiles%2FRPUG%2FRPUG_4_124.map",
    attributions: [ortoDemanioPugliaAttribution],
                              params: {
                                "LAYERS": "820",
                                "VERSION": "1.1.1",
                                "EXCEPTIONS": "application/vnd.ogc.se_inimage"
                              },
                              projection: 'EPSG:32633'
                            })),
                            title: "2017 - Demanio marittimo Puglia",
			    'type': 'base',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Ortofoto2017DemaniomarittimoPuglia_5, 0]);

var lyr_Ortofoto2018DemaniomarittimoPuglia_6 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://93.63.173.228/cgi-bin/mapserv?MAP=%2Fhome%2Fgis%2Fweb%2Fcake%2Ficpro_demanio%2Fmaps%2Fmapfiles%2FRPUG%2FRPUG_4_124.map",
    attributions: [ortoDemanioPugliaAttribution],
                              params: {
                                "LAYERS": "852",
                                "VERSION": "1.1.1",
                                "EXCEPTIONS": "application/vnd.ogc.se_inimage"
                              },
                              projection: 'EPSG:32633'
                            })),
                            title: "2018 - Demanio marittimo Puglia",
			    'type': 'base',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Ortofoto2018DemaniomarittimoPuglia_6, 0]);

var lyr_Particelle_7 = new ol.layer.Image({
                            source: new ol.source.ImageWMS(({
                              url: "https://wms.cartografia.agenziaentrate.gov.it/inspire/wms/ows01.php",
    attributions: [catastaleAttribution],
                              ratio: 1,
                              params: {
                                "LAYERS": "CP.CadastralParcel",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "Particelle",
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Particelle_7, 0]);

var lyr_Fabbricati_8 = new ol.layer.Image({
                            source: new ol.source.ImageWMS(({
                              url: "https://wms.cartografia.agenziaentrate.gov.it/inspire/wms/ows01.php",
    attributions: [catastaleAttribution],
                              ratio: 1,
                              params: {
                                "LAYERS": "fabbricati",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "Fabbricati",
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Fabbricati_8, 0]);

var lyr_Vestizioni_9 = new ol.layer.Image({
                            source: new ol.source.ImageWMS(({
                              url: "https://wms.cartografia.agenziaentrate.gov.it/inspire/wms/ows01.php",
    attributions: [catastaleAttribution],
                              ratio: 1,
                              params: {
                                "LAYERS": "vestizioni",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "Vestizioni",
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Vestizioni_9, 0]);

var lyr_Strade_10 = new ol.layer.Image({
                            source: new ol.source.ImageWMS(({
                              url: "https://wms.cartografia.agenziaentrate.gov.it/inspire/wms/ows01.php",
    attributions: [catastaleAttribution],
                              ratio: 1,
                              params: {
                                "LAYERS": "strade",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "Strade",
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Strade_10, 0]);

var lyr_Acque_11 = new ol.layer.Image({
                            source: new ol.source.ImageWMS(({
                              url: "https://wms.cartografia.agenziaentrate.gov.it/inspire/wms/ows01.php",
    attributions: [catastaleAttribution],
                              ratio: 1,
                              params: {
                                "LAYERS": "acque",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "Acque",
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Acque_11, 0]);

var lyr_Mappe_12 = new ol.layer.Image({
                            source: new ol.source.ImageWMS(({
                              url: "https://wms.cartografia.agenziaentrate.gov.it/inspire/wms/ows01.php",
    attributions: [catastaleAttribution],
                              ratio: 1,
                              params: {
                                "LAYERS": "CP.CadastralZoning",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "Fogli di mappa",
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Mappe_12, 0]);

var lyr_Geologia50kSGI_20 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://sgi2.isprambiente.it/arcgis/services/raster/geo_50k_italia/ImageServer/WMSServer",
    attributions: [geoSGIAttribution],
                              params: {
                                "LAYERS": "0",
                                "TILED": "true",
                                "VERSION": "1.3.0"
                              },
                              projection: 'EPSG:32633'
                            })),
                            title: "1:50'000 - SGI / ISPRA",
			    'type': 'base',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Geologia50kSGI_20, 0]);

var lyr_Geologia100kSGI_21 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://sgi2.isprambiente.it/arcgis/services/raster/geo_100k_italia/ImageServer/WMSServer",
    attributions: [geoSGIAttribution],
                              params: {
                                "LAYERS": "0",
                                "TILED": "true",
                                "VERSION": "1.3.0"
                              },
                              projection: 'EPSG:32633'
                            })),
                            title: "1:100'000 - SGI / ISPRA",
			    'type': 'base',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Geologia100kSGI_21, 0]);

var lyr_IGM125000PCN_13 = new ol.layer.Image({
                            source: new ol.source.ImageWMS(({
                              url: "http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/raster/IGM_25000.map",
    attributions: [topoGpnIgmAttribution],
                              ratio: 1,
                              params: {
                                "LAYERS": "CB.IGM25000.33,CB.IGM25000.32",
                                "TILED": "true",
                                "VERSION": "1.3.0"
                              },
                              projection: 'EPSG:32633'
                            })),
                            title: "1:25'000 - Geoportale Nazionale",
			    'type': 'base',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_IGM125000PCN_13, 0]);

var lyr_IGM150000PCP_19 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://webgis.protezionecivile.puglia.it/prc/geoserver/prociv/wms",
    attributions: [topoPcpIgmAttribution],
                              params: {
                                "LAYERS": "IGM_50000",
                                "TILED": "true",
                                "VERSION": "1.3.0"
                              },
                              projection: 'EPSG:32633'
                            })),
                            title: "1:50'000 - Protezione Civile Puglia",
			    'type': 'base',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_IGM150000PCP_19, 0]);

var lyr_PianoRegionaleCoste_22 = new ol.layer.Image({
                            source: new ol.source.ImageWMS(({
                              url: "http://webapps.sit.puglia.it/arcgis/services/Operationals/PRC/MapServer/WMSServer",
    attributions: [datiSitPugliaAttribution],
                              ratio: 1,
                              params: {
/*                                "LAYERS": "0,1,2,4,5,7,9,10,11,12,13,14,15,16,17,18,19,21,22,24,26,27,28,30,31,32,33,34,35", */
                                "LAYERS": "35,34,33,32,31,29,27,26,25,24,23,22,21,20,19,18,17,15,14,12,11,10,9,7,6,5,4,3,2",
                                "TILED": "true",
                                "VERSION": "1.3.0"
			      },
			      projection: 'EPSG:32633'
                            })),
                            title: "Piano Regionale Coste - SIT Puglia",
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_PianoRegionaleCoste_22, 1]);

var lyr_PPTR_23 = new ol.layer.Image({
                            source: new ol.source.ImageWMS(({
/*                            source: new ol.source.ImageArcGISRest(({ */
/*                              url: "http://webapps.sit.puglia.it/arcgis/rest/services/Operationals/PPTR_APPROVATO/MapServer", */
                              url: "http://webapps.sit.puglia.it/arcgis/services/Operationals/PPTR_APPROVATO/MapServer/WMSServer",
    attributions: [datiSitPugliaAttribution],
                              ratio: 1,
                              params: {
/*                                "LAYERS": "show:4,15,31,38,44,48",  6,7,8,9,10,11,12,14,15,16,17,19,20,23,27,28,29,33,35,36,39,40,41,42,44,45,46,47,49,50,51,56,65,68,70,71,72,78 */
                                "LAYERS": "309,308,307,306,305,304,303,300,282,280,279,276,275,274,273,271,270,269,267,266,265",
                                "TILED": "true",
                                "VERSION": "1.3.0"
			      },
			      projection: 'EPSG:32633'
                            })),
                            title: "PPTR - SIT Puglia",
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_PPTR_23, 1]);

var lyr_IDROGEO_100 = new ol.layer.Image({
                            source: new ol.source.ImageWMS(({
                              url: "http://webapps.sit.puglia.it/arcgis/services/ServicesArcIMS/Idrogeomorfologia/MapServer/WMSServer",
    attributions: [datiSitPugliaAttribution],
                              ratio: 1,
                              params: {
                                "LAYERS": "1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,22,23,24,25,26,28,29,30,32,33,34,36,37,38,40,41,42,43,44,45",
                                "TILED": "true",
                                "VERSION": "1.3.0"
			      },
			      projection: 'EPSG:32633'
                            })),
                            title: "Idrogeomorfologica - SIT Puglia",
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_IDROGEO_100, 1]);

var lyr_BBCC_24 = new ol.layer.Image({
                            source: new ol.source.ImageWMS(({
                              url: "http://webapps.sit.puglia.it/arcgis/services/Operationals/ConsultaBBCC/MapServer/WMSServer",
    attributions: [datiSitPugliaAttribution],
                              ratio: 1,
                              params: {
                                "LAYERS": "4,5,6,8,9,10,11,12,13,14,16,17",
                                "TILED": "true",
                                "VERSION": "1.3.0"
			      },
			      projection: 'EPSG:32633'
                            })),
                            title: "Carta Beni Culturali - SIT Puglia",
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_BBCC_24, 1]);

var lyr_CatastoGrotteSIT_26 = new ol.layer.Image({
                            source: new ol.source.ImageWMS(({
                              url: "http://webapps.sit.puglia.it/arcgis/services/Operationals/CatastoGrotte/MapServer/WMSServer",
    attributions: [datiSitPugliaAttribution],
                              ratio: 1,
                              params: {
                                "LAYERS": "0,1,2",
                                "TILED": "true",
                                "VERSION": "1.3.0"
			      },
			      projection: 'EPSG:32633'
                            })),
                            title: "Catasto Grotte - SIT Puglia",
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_CatastoGrotteSIT_26, 1]);

var lyr_CatastoGrotteFSP_27 = new ol.layer.Image({
                            source: new ol.source.ImageWMS(({
                              url: "http://www.catasto.fspuglia.it/geoserver/wms",
    attributions: [datiFSPAttribution],
                              ratio: 1,
                              params: {
                                "LAYERS": "ingressi_last_completi_gruppo3_geom_tutte_static",
                                "TILED": "true",
                                "VERSION": "1.3.0"
			      },
			      projection: 'EPSG:32633'
                            })),
                            title: "Catasto Grotte - FSP",
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_CatastoGrotteFSP_27, 1]);

var lyr_BatimetriaSITPuglia_14 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://webapps.sit.puglia.it/arcgis/services/ServicesArcIMS/batimetria/MapServer/WMSServer",
    attributions: [datiSitPugliaAttribution],
                              params: {
                                "LAYERS": "0",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "Batimetria - SIT Puglia",
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_BatimetriaSITPuglia_14, 0]);

var lyr_ConfiniComunali_15 = new ol.layer.Image({
                            source: new ol.source.ImageWMS(({
                              url: "http://webapps.sit.puglia.it/arcgis/services/Background/TNOInquadramento/MapServer/WMSServer",
    attributions: [datiSitPugliaAttribution],
                              ratio: 1,
                              params: {
                                "LAYERS": "59",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "Confini Comunali",
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_ConfiniComunali_15, 0]);

var lyr_InquadramentoSITPuglia_16 = new ol.layer.Image({
                            source: new ol.source.ImageWMS(({
                              url: "http://webapps.sit.puglia.it/arcgis/services/Background/Inquadramento/MapServer/WMSServer?",
    attributions: [datiSitPugliaAttribution],
                              ratio: 1,
                              params: {
                                "LAYERS": "0,1,2,3,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
/*			    minResolution: getResolutionFromScale(2000),
			    maxResolution: getResolutionFromScale(20000), */
                            title: "Inquadramento - SIT Puglia",
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_InquadramentoSITPuglia_16, 0]);

var lyr_CartaTecnicaRegionaleSITPuglia_17 = new ol.layer.Image({
                            source: new ol.source.ImageWMS(({
                              url: "http://webapps.sit.puglia.it/arcgis/services/Background/CTR2008/MapServer/WMSServer?",
    attributions: [ctrSitPugliaAttribution],
                              ratio: 1,
                              params: {
                                "LAYERS": "1,2,3,4,6",
                                "TILED": "true",
                                "VERSION": "1.3.0"
			      },
			      projection: 'EPSG:32633'
                            })),
                            title: "Carta Tecnica Regionale - SIT Puglia",
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_CartaTecnicaRegionaleSITPuglia_17, 0]);

var lyr_RetiGeodeticheSITPUglia = new ol.layer.Image({
          source: new ol.source.ImageArcGISRest({
            ratio: 1,
            params: {},
            url: "http://webapps.sit.puglia.it/arcgis/rest/services/ServicesArcIMS/RetiGeodetiche/MapServer",
            projection: 'EPSG:32633',
            attributions: [ortoSitPugliaAttribution]
          }),
          title: "Reti Geodetiche - SIT Puglia",
        });
              wms_layers.push([lyr_RetiGeodeticheSITPUglia, 1]);







var format_serie_25v_wgs84_geo_0 = new ol.format.GeoJSON();
var features_serie_25v_wgs84_geo_0 = format_serie_25v_wgs84_geo_0.readFeatures(json_serie_25v_wgs84_geo_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:32633'});
var jsonSource_serie_25v_wgs84_geo_0 = new ol.source.Vector({
    attributions: [quadriUnioneIGM],
});
jsonSource_serie_25v_wgs84_geo_0.addFeatures(features_serie_25v_wgs84_geo_0);
var lyr_serie_25v_wgs84_geo_0 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_serie_25v_wgs84_geo_0, 
                style: style_serie_25v_wgs84_geo_0,
                title: '<img style="vertical-align: middle;" src="styles/legend/serie_25v_wgs84_geo_0.png" /> Quadro unione IGM 1:25000'
            });

var format_serie_50_wgs84_geo_0 = new ol.format.GeoJSON();
var features_serie_50_wgs84_geo_0 = format_serie_50_wgs84_geo_0.readFeatures(json_serie_50_wgs84_geo_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:32633'});
var jsonSource_serie_50_wgs84_geo_0 = new ol.source.Vector({
    attributions: [quadriUnioneIGM],
});
jsonSource_serie_50_wgs84_geo_0.addFeatures(features_serie_50_wgs84_geo_0);
var lyr_serie_50_wgs84_geo_0 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_serie_50_wgs84_geo_0, 
                style: style_serie_50_wgs84_geo_0,
                title: '<img style="vertical-align: middle;" src="styles/legend/serie_50_wgs84_geo_0.png" /> Quadro unione IGM 1:50000'
            });


var format_grigliato_sitpuglia_5000_0 = new ol.format.GeoJSON();
var features_grigliato_sitpuglia_5000_0 = format_serie_50_wgs84_geo_0.readFeatures(json_grigliato_sitpuglia_5000_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:32633'});
var jsonSource_grigliato_sitpuglia_5000_0 = new ol.source.Vector({
    attributions: [quadriUnioneIGM],
});
jsonSource_grigliato_sitpuglia_5000_0.addFeatures(features_grigliato_sitpuglia_5000_0);
var lyr_grigliato_sitpuglia_5000_0 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_grigliato_sitpuglia_5000_0, 
                style: style_grigliato_sitpuglia_5000_0,
                title: '<img style="vertical-align: middle;" src="styles/legend/grigliato_sitpuglia_5000_0.png" /> Quadro unione CTR Puglia 1:5000'
            });


var group_Cartografiacatastale = new ol.layer.Group({
                                layers: [lyr_Particelle_7,lyr_Fabbricati_8,lyr_Vestizioni_9,lyr_Strade_10,lyr_Acque_11,lyr_Mappe_12,],
				fold: 'close',
                                title: "Cartografia catastale - AdE"});
var group_GeologiaSGI = new ol.layer.Group({
                                layers: [lyr_trasparente,lyr_Geologia50kSGI_20,lyr_Geologia100kSGI_21,],
				fold: 'close',
                                title: "Cartografia geologica"});
var group_TopografiaIGM = new ol.layer.Group({
                                layers: [lyr_trasparente,lyr_IGM125000PCN_13,lyr_IGM150000PCP_19,],
				fold: 'close',
                                title: "Topografia IGM"});
var group_ORTOFOTO = new ol.layer.Group({
                                layers: [lyr_trasparente,lyr_Ortofoto19881989PCN_28,lyr_Ortofoto19941998PCN_29,lyr_Ortofoto2006SITPuglia_0,lyr_Ortofoto2010SITPuglia_1,lyr_Ortofoto2010CosteSITPuglia_1,lyr_Ortofoto2011SITPuglia_2,lyr_Ortofoto2013SITPuglia_3,lyr_Ortofoto2016SITPuglia_4,lyr_Ortofoto2017DemaniomarittimoPuglia_5,lyr_Ortofoto2018DemaniomarittimoPuglia_6,],
				fold: 'close',
                                title: "Ortofoto"});
var group_PR = new ol.layer.Group({
                                layers: [lyr_PPTR_23,lyr_BBCC_24,lyr_IDROGEO_100,lyr_PianoRegionaleCoste_22,],
				fold: 'close',
                                title: "Pianificazione Regione Puglia"});




lyr_Ortofoto2006SITPuglia_0.setVisible(false);lyr_Ortofoto2010SITPuglia_1.setVisible(false);lyr_Ortofoto2010CosteSITPuglia_1.setVisible(false);lyr_Ortofoto2011SITPuglia_2.setVisible(false);lyr_Ortofoto2013SITPuglia_3.setVisible(false);
lyr_Ortofoto2016SITPuglia_4.setVisible(false);lyr_Ortofoto2017DemaniomarittimoPuglia_5.setVisible(false);lyr_Ortofoto2018DemaniomarittimoPuglia_6.setVisible(false);
lyr_Particelle_7.setVisible(false);lyr_Fabbricati_8.setVisible(false);lyr_Vestizioni_9.setVisible(false);lyr_Strade_10.setVisible(false);lyr_Acque_11.setVisible(false);
lyr_Mappe_12.setVisible(false);lyr_IGM125000PCN_13.setVisible(false);lyr_BatimetriaSITPuglia_14.setVisible(true);lyr_ConfiniComunali_15.setVisible(true);
lyr_InquadramentoSITPuglia_16.setVisible(true);lyr_CartaTecnicaRegionaleSITPuglia_17.setVisible(false);
lyr_IGM150000PCP_19.setVisible(false);lyr_Geologia50kSGI_20.setVisible(false);lyr_Geologia100kSGI_21.setVisible(false);lyr_PianoRegionaleCoste_22.setVisible(false);
lyr_PPTR_23.setVisible(false);lyr_BBCC_24.setVisible(false);lyr_CatastoGrotteSIT_26.setVisible(false);lyr_CatastoGrotteFSP_27.setVisible(false);lyr_trasparente.setVisible(false);
lyr_serie_25v_wgs84_geo_0.setVisible(false);lyr_serie_50_wgs84_geo_0.setVisible(false);lyr_Ortofoto19881989PCN_28.setVisible(false);lyr_Ortofoto19941998PCN_29.setVisible(false);
lyr_grigliato_sitpuglia_5000_0.setVisible(false);
lyr_IDROGEO_100.setVisible(false);lyr_RetiGeodeticheSITPUglia.setVisible(false);

var layersList = [baseLayer,group_TopografiaIGM,group_GeologiaSGI,group_ORTOFOTO,group_PR,group_Cartografiacatastale,lyr_CartaTecnicaRegionaleSITPuglia_17,lyr_RetiGeodeticheSITPUglia,lyr_CatastoGrotteFSP_27,lyr_CatastoGrotteSIT_26,lyr_BatimetriaSITPuglia_14,lyr_grigliato_sitpuglia_5000_0,lyr_serie_25v_wgs84_geo_0,lyr_serie_50_wgs84_geo_0,lyr_ConfiniComunali_15,lyr_InquadramentoSITPuglia_16];

lyr_serie_25v_wgs84_geo_0.set('fieldAliases', {'TAVOLETTA': 'TAVOLETTA', 'TITOLO': 'TITOLO', 'ANNO': 'ANNO', 'EDIZIONE': 'EDIZIONE', 'SERIE': 'SERIE', });
lyr_serie_25v_wgs84_geo_0.set('fieldImages', {'TAVOLETTA': 'TextEdit', 'TITOLO': 'TextEdit', 'ANNO': 'TextEdit', 'EDIZIONE': 'TextEdit', 'SERIE': 'TextEdit', });
lyr_serie_25v_wgs84_geo_0.set('fieldLabels', {'TAVOLETTA': 'inline label', 'TITOLO': 'inline label', 'ANNO': 'inline label', 'EDIZIONE': 'inline label', 'SERIE': 'inline label', });
lyr_serie_25v_wgs84_geo_0.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});

lyr_serie_50_wgs84_geo_0.set('fieldAliases', {'FOGLIO': 'FOGLIO', 'TITOLO': 'TITOLO', 'ANNO': 'ANNO', 'EDIZIONE': 'EDIZIONE', 'SERIE': 'SERIE', });
lyr_serie_50_wgs84_geo_0.set('fieldImages', {'FOGLIO': 'TextEdit', 'TITOLO': 'TextEdit', 'ANNO': 'TextEdit', 'EDIZIONE': 'TextEdit', 'SERIE': 'TextEdit', });
lyr_serie_50_wgs84_geo_0.set('fieldLabels', {'FOGLIO': 'inline label', 'TITOLO': 'inline label', 'ANNO': 'inline label', 'EDIZIONE': 'inline label', 'SERIE': 'inline label', });
lyr_serie_50_wgs84_geo_0.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});

lyr_grigliato_sitpuglia_5000_0.set('fieldAliases', {'Elemento': 'Elemento CTR Puglia', });
lyr_grigliato_sitpuglia_5000_0.set('fieldImages', {'Elemento': 'TextEdit', });
lyr_grigliato_sitpuglia_5000_0.set('fieldLabels', {'Elemento': 'inline label', });
lyr_grigliato_sitpuglia_5000_0.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});
