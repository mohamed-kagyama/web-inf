define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BaseJiveComponentView = require('./BaseJiveComponentView');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @author: Narcis Marcu
 * @version: $Id$
 */

/* global google */
module.exports = BaseJiveComponentView.extend({
  render: function render($el) {
    this.$reportEl = $el;
    this.infowindow = {};

    this._init();
  },
  _init: function _init() {
    var it = this,
        instData = it.model.get('instanceData'),
        reqParams = instData.requestParams || '';

    if (reqParams[0] === '&') {
      reqParams = reqParams.substr(1);
    } // try to load the Gogle Maps API once, otherwise conflicts will happen
    // try to load the Gogle Maps API once, otherwise conflicts will happen


    if (typeof google === 'undefined' || typeof google !== 'undefined' && typeof google.maps === 'undefined') {
      require(['async!//maps.google.com/maps/api/js?' + reqParams + '!callback'], function () {
        it._showMap(it.model.get('id'), instData.latitude, instData.longitude, instData.zoom, instData.mapType, instData.markerList, instData.pathsList);
      });
    } else {
      it._showMap(it.model.get('id'), instData.latitude, instData.longitude, instData.zoom, instData.mapType, instData.markerList, instData.pathsList);
    }
  },
  _configureImage: function _configureImage(pk, pp, po) {
    var width, height, originX, originY, anchorX, anchorY;
    width = pp[pk + '.width'] ? parseInt(pp[pk + '.width']) : null;
    height = pp[pk + '.height'] ? parseInt(pp[pk + '.height']) : null;
    originX = pp[pk + '.origin.x'] ? parseInt(pp[pk + '.origin.x']) : 0;
    originY = pp[pk + '.origin.y'] ? parseInt(pp[pk + '.origin.y']) : 0;
    anchorX = pp[pk + '.anchor.x'] ? parseInt(pp[pk + '.anchor.x']) : 0;
    anchorY = pp[pk + '.anchor.y'] ? parseInt(pp[pk + '.anchor.y']) : 0;
    po[pk] = {
      url: pp[pk + '.url'],
      size: width && height ? new google.maps.Size(width, height) : null,
      origin: new google.maps.Point(originX, originY),
      anchor: new google.maps.Point(anchorX, anchorY)
    };
  },
  _createInfo: function _createInfo(pp) {
    if (pp['infowindow.content'] && pp['infowindow.content'].length > 0) {
      var gg = google.maps,
          po = {
        content: pp['infowindow.content']
      };
      if (pp['infowindow.pixelOffset']) po['pixelOffset'] = pp['infowindow.pixelOffset'];
      if (pp['infowindow.latitude'] && pp['infowindow.longitude']) po['position'] = new gg.LatLng(pp['infowindow.latitude'], pp['infowindow.longitude']);
      if (pp['infowindow.maxWidth']) po['maxWidth'] = pp['infowindow.maxWidth'];
      return new gg.InfoWindow(po);
    }

    return null;
  },
  _showMap: function _showMap(canvasId, latitude, longitude, zoom, mapType, markers, p) {
    var it = this,
        gg = google.maps,
        myOptions = {
      zoom: zoom,
      center: new gg.LatLng(latitude, longitude),
      mapTypeId: gg.MapTypeId[mapType],
      autocloseinfo: true
    },
        container = it.$reportEl.find("#" + canvasId),
        map = new gg.Map(container[0], myOptions);
    container.attr("js-stdnav", "false");

    if (markers) {
      var j;

      for (var i = 0; i < markers.length; i++) {
        var markerProps = markers[i];
        var markerLatLng = new gg.LatLng(markerProps['latitude'], markerProps['longitude']);
        var markerOptions = {
          position: markerLatLng,
          map: map
        };
        if (markerProps['icon.url'] && markerProps['icon.url'].length > 0) it._configureImage('icon', markerProps, markerOptions);else if (markerProps['icon'] && markerProps['icon'].length > 0) markerOptions['icon'] = markerProps['icon'];else if (markerProps['color'] && markerProps['color'].length > 0) markerOptions['icon'] = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + (markerProps['label'] && markerProps['label'].length > 0 ? markerProps['label'] : '%E2%80%A2') + '%7C' + markerProps['color'];else if (markerProps['label'] && markerProps['label'].length > 0) markerOptions['icon'] = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + markerProps['label'] + '%7CFE7569';
        if (markerProps['shadow.url'] && markerProps['shadow.url'].length > 0) it._configureImage('shadow', markerProps, markerOptions);

        for (j in markerProps) {
          if (j.indexOf('.') < 0 && markerProps.hasOwnProperty(j) && !markerOptions.hasOwnProperty(j)) markerOptions[j] = markerProps[j];
        }

        var marker = new google.maps.Marker(markerOptions);
        marker['info'] = it._createInfo(markerProps);
        gg.event.addListener(marker, 'click', function () {
          if (map.autocloseinfo && it.infowindow && it.infowindow.close) it.infowindow.close();

          if (this['info']) {
            it.infowindow = this['info'];
            this['info'].open(map, this);
          } else if (this['url'] && this['url'].length > 0) window.open(this['url'], this['target']);
        });
      }
    }

    if (p) {
      for (var k = 0; k < p.length; k++) {
        var props = p[k],
            o = {},
            l = [],
            isPoly = false;

        for (var prop in props) {
          if (prop === 'locations' && props[prop]) {
            var loc = props[prop];

            for (var j = 0; j < loc.length; j++) {
              var latln = loc[j];
              l.push(new google.maps.LatLng(latln['latitude'], latln['longitude']));
            }
          } else if (prop === 'isPolygon') {
            isPoly = it._getBooleanValue(props[prop]);
          } else if (prop === 'visible' || prop === 'editable' || prop === 'clickable' || prop === 'draggable' || prop === 'geodesic') {
            o[prop] = it._getBooleanValue(props[prop]);
          } else {
            o[prop] = props[prop];
          }
        }

        o['map'] = map;

        if (isPoly) {
          o['paths'] = l;
          new google.maps.Polygon(o);
        } else {
          o['path'] = l;
          new google.maps.Polyline(o);
        }
      }
    }
  },
  _getBooleanValue: function _getBooleanValue(v) {
    return v === true || v === 'true';
  }
});

});