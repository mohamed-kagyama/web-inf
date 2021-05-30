define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var _ = require('underscore');

var $ = require('jquery');

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

require('jquery-ui-touch-punch');

require("csslink!../jr/theme/jive.csslink.css");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @author: Igor Nesterenko
 * @version: $Id$
 */
var localLogger = logger.register("JiveComponentCollectionView");

function JiveComponentCollectionView(options) {
  options || (options = {});
  this.stateModel = options.stateModel;
  this.collection = options.collection;
  this.dialogStates = options.dialogStates;
  this.listenTo(this.collection, 'reset', this.initSubviews, this);
}

JiveComponentCollectionView.prototype = {
  initSubviews: function initSubviews() {
    var self = this,
        viewModules = [],
        viewModels = [];

    _.invoke(this.subviews || [], 'remove');

    this.subviews = [];

    if (this.subviewsReadyDfd) {
      var old = this.subviewsReadyDfd;
      this.subviewsReadyDfd = new $.Deferred().done(function () {
        old.resolve();
      }).fail(function () {
        old.reject();
      });
    } else {
      this.subviewsReadyDfd = new $.Deferred();
    }

    this.collection.forEach(function (component) {
      // these modules could be paths in the components JSON or requirejs module mappings inside require.config.js
      component.get('type') === 'chart' && viewModules.push('runtime_dependencies/bi-chart/src/jr/jive/highcharts/view/ChartJiveComponentView') && viewModels.push(component.get('id'));
      component.get('type') === 'fusionMap' && viewModules.push('./FusionComponentView') && viewModels.push(component.get('id'));
      component.get('type') === 'fusionChart' && viewModules.push('./FusionComponentView') && viewModels.push(component.get('id'));
      component.get('type') === 'fusionWidget' && viewModules.push('./FusionComponentView') && viewModels.push(component.get('id'));
      component.get('type') === 'googlemap' && viewModules.push('./GooglemapComponentView') && viewModels.push(component.get('id'));
      component.get('type') === 'tibco-maps' && viewModules.push('./TibcomapComponentView') && viewModels.push(component.get('id'));
      component.get('type') === 'CVComponent' && viewModules.push('./CustomJiveComponentView') && viewModels.push(component.get('id'));
      component.get('type') === 'table' && viewModules.push('./TableJiveComponentView') && viewModels.push(component.get('id'));
      component.get('type') === 'crosstab' && viewModules.push('./CrosstabJiveComponentView') && viewModels.push(component.get('id'));
    });

    require(viewModules, function () {
      var args = _.toArray(arguments);

      _.each(args, function (ViewModule, index) {
        self.subviews.push(new ViewModule({
          model: self.collection.get(viewModels[index]),
          report: self.collection.report,
          dialogStates: self.dialogStates,
          stateModel: self.stateModel
        }));
      });

      localLogger.debug('Create JIVE views ', self.subviews);
      self.subviewsReadyDfd.resolve();
    }, this.subviewsReadyDfd.reject);
  },
  render: function render($el, options) {
    var self = this,
        dfd = new $.Deferred();
    self.subviewsReadyDfd.then(function () {
      var subViewsRenderDeferreds = _.invoke(self.subviews, "render", $el, options);

      $.when.apply($, subViewsRenderDeferreds).then(dfd.resolve, dfd.reject);
    }, dfd.reject);
    return dfd;
  },
  sizableSubviews: function sizableSubviews() {
    return _.filter(this.subviews, function (jiveComponent) {
      return jiveComponent.setSize;
    });
  },
  scalableSubviews: function scalableSubviews() {
    return _.filter(this.subviews, function (jiveComponent) {
      return jiveComponent.scale;
    });
  },
  getSizableSubviews: function getSizableSubviews() {
    var self = this,
        dfd = new $.Deferred();
    this.subviewsReadyDfd.then(function () {
      dfd.resolve(_.filter(self.subviews, function (jiveComponent) {
        return jiveComponent.setSize;
      }));
    });
    return dfd;
  },
  getScalableSubviews: function getScalableSubviews() {
    var self = this,
        dfd = new $.Deferred();
    this.subviewsReadyDfd.then(function () {
      dfd.resolve(_.filter(self.subviews, function (jiveComponent) {
        return jiveComponent.scale;
      }));
    });
    return dfd;
  },
  remove: function remove() {
    _.invoke(this.subviews || [], 'remove');

    this.stopListening(this.collection, 'reset', this.initSubviews, this);
  }
};

_.extend(JiveComponentCollectionView.prototype, Backbone.Events);

module.exports = JiveComponentCollectionView;

});