define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var $ = require('jquery');

var browserDetection = require("runtime_dependencies/js-sdk/src/common/util/browserDetection");

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var localLogger = logger.register("BaseJiveComponentView");
module.exports = Backbone.View.extend({
  initialize: function initialize(options) {
    this.stateModel = options.stateModel;
    this.report = options.report;
    localLogger.debug('Create jive view', this);
    Backbone.View.prototype.initialize.apply(this, arguments);
  },
  //protected
  getReportId: function getReportId() {
    return this.report && this.report.id;
  },
  //protected
  setDataReportId: function setDataReportId($el, id) {
    $el.attr('data-reportId', id);
  },
  //protected
  getReportContainer: function getReportContainer(id) {
    return $('[data-reportId = \'' + id + '\']');
  },
  //optional
  scale: function scale(scaleFactor) {
    this.model.set('scaleFactor', scaleFactor);
  },
  // should be overridden; each implementation should return a deferred object
  render: function render($el) {
    var renderDeferred = new $.Deferred();
    renderDeferred.resolve();
    return renderDeferred;
  },
  // should be overridden, optional
  detachEvents: function detachEvents() {},
  remove: function remove() {
    this.detachEvents();
    Backbone.View.prototype.remove.apply(this, arguments);
  },
  _applyScaleTransform: function _applyScaleTransform($container, scaleFactor) {
    var scale = 'scale(' + scaleFactor + ')',
        origin = '0 0',
        transform = {
      '-webkit-transform': scale,
      '-webkit-transform-origin': origin,
      '-moz-transform': scale,
      '-moz-transform-origin': origin,
      '-ms-transform': scale,
      '-ms-transform-origin': origin,
      '-o-transform': scale,
      '-o-transform-origin': origin,
      'transform': scale,
      'transform-origin': origin
    }; // transform: scale, analog for IE8 and lower.
    // transform: scale, analog for IE8 and lower.

    if (browserDetection.isIE8()) {
      transform.filter = 'progid:DXImageTransform.Microsoft.Matrix(M11=' + scaleFactor + ', M12=0, M21=0, M22=' + scaleFactor + ', SizingMethod=\'auto expand\')';
    }

    $container.css(transform);
  }
});

});