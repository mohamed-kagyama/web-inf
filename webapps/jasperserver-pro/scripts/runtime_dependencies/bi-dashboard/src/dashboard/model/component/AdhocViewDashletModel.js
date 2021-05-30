define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

var request = require("request");

var i18n = require("bundle!DashboardBundle");

var VisualizationDashletModel = require('./VisualizationDashletModel');

var dashboardSettings = require('../../dashboardSettings');

var dashboardComponentTypes = require('../../enum/dashboardComponentTypes');

var identityUtil = require("runtime_dependencies/js-sdk/src/common/util/identityUtil");

var DashletHyperlinkComponentExtension = require('./extension/DashletHyperlinkComponentExtension');

var sandboxFactory = require('../../factory/sandboxFactory');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var log = logger.register("AdhocViewDashletModel");

function buildTemporaryUri(name) {
  return dashboardSettings.EMBEDDED_ADHOC_VIEW_TEMP_LOCATION + '/' + name;
}

module.exports = VisualizationDashletModel.extend(DashletHyperlinkComponentExtension.mixin).extend({
  componentName: i18n['dashboard.component.adHoc.view.component.name'],
  defaults: _.extend({}, DashletHyperlinkComponentExtension.defaults, VisualizationDashletModel.prototype.defaults, {
    exposeOutputsToFilterManager: false,
    dashletHyperlinkTarget: '',
    dashletHyperlinkUrl: undefined,
    showExportButton: dashboardSettings.DASHLET_SHOW_EXPORT_BUTTON
  }),
  validation: _.extend({}, DashletHyperlinkComponentExtension.validation, VisualizationDashletModel.prototype.validation),
  initialize: function initialize() {
    VisualizationDashletModel.prototype.initialize.apply(this, arguments);

    if (this.get('type') === dashboardComponentTypes.CHART) {
      this.set('isAdhocChart', true);
    } // Hack. Since output parameters currently available for charts only,
    // we can assume that the Adhoc View is a chart if it has outputParameters
    // Hack. Since output parameters currently available for charts only,
    // we can assume that the Adhoc View is a chart if it has outputParameters


    this.get('outputParameters') && this.get('outputParameters').length && this.set('isAdhocChart', true);
    this.on('parameters:set', function () {
      this.get('outputParameters') && this.get('outputParameters').length && this.set('isAdhocChart', true);
    }, this);
  },
  // Introduced dashletHyperlinkUrlVisible attribute to overcome rivets limitations. Should be replaced with compute property when switched to Epoxy.
  toJSON: function toJSON() {
    var data = VisualizationDashletModel.prototype.toJSON.apply(this, arguments);
    delete data.dashletHyperlinkUrlVisible;
    return data;
  },
  acceptWiringVisitor: function acceptWiringVisitor(wiring) {
    var self = this;
    this.on('parameters:set', _.bind(VisualizationDashletModel.prototype.acceptWiringVisitor, this, wiring));

    this._getWiringMetadata().done(function (model, data) {
      wiring.register(model, data);

      if (self.has('outputParameters')) {
        self.notify(_.reduce(self.get('outputParameters'), function (memo, outputParam) {
          if (outputParam.hasOwnProperty('value')) {
            memo[outputParam.id] = outputParam.value;
            delete outputParam.value;
          }

          return memo;
        }, {}));
      }
    });
  },
  getReportResourceUri: function getReportResourceUri() {
    var generatedReports = sandboxFactory.get(this.dashboardId).get('generatedReports') || {},
        resourceUri = generatedReports[this.resource.resource.get('uri')];

    if (!_.isUndefined(resourceUri)) {
      this.componentInitializedDfd.resolve(resourceUri, this.resource.resource.get('uri'));
    } else {
      if (!this.componentInitializedDfd._running) {
        this.componentInitializedDfd._running = true;
        log.debug('Started checking of report existence for ' + this.resource.resource.get('uri'));
        var self = this;
        request({
          type: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          processData: false,
          contentType: 'application/json; charset=UTF-8',
          dataType: 'json',
          data: JSON.stringify({
            dataSourceUri: this.resource.resource.get('uri'),
            label: 'dashboardReport'
          }),
          url: dashboardSettings.CONTEXT_PATH + '/rest_v2/reportGenerators/custom-template'
        }).fail(function (xhr) {
          self.componentInitializedDfd.resolve(false, xhr.responseJSON);
        }).done(function (data) {
          log.debug('Report for ' + self.resource.resource.get('uri') + ' is generated successfully');
          generatedReports[self.resource.resource.get('uri')] = data.uri;
          sandboxFactory.get(self.dashboardId).set('generatedReports', generatedReports);
          self.componentInitializedDfd.resolve(data.uri, self.resource.resource.get('uri'));
        });
      }
    }

    return this.componentInitializedDfd.promise();
  },
  resetCaching: function resetCaching() {
    this.componentInitializedDfd = new $.Deferred();
  },
  getDesignerUri: function getDesignerUri() {
    var saveAsUri = this.isNew() ? buildTemporaryUri(identityUtil.generateUniqueName('tmpAdv_')) : encodeURIComponent(this.resource.resource.get('uri'));
    var pramsMap = {
      _flowId: 'adhocFlow',
      decorate: 'no',
      embeddedDesigner: 'true',
      saveAsUri: saveAsUri,
      saveAsOverwrite: true,
      reportType: this.get('type')
    };
    this.isNew() || (pramsMap.embeddedName = encodeURIComponent(this.get('name')));
    this.resource && (pramsMap.resource = encodeURIComponent(this.resource.resource.get('uri')));
    return dashboardSettings.CONTEXT_PATH + '/flow.html?' + $.param(pramsMap);
  },
  isNew: function isNew() {
    return typeof this.resource === 'undefined';
  },
  toDashboardComponentObject: function toDashboardComponentObject() {
    var data = VisualizationDashletModel.prototype.toDashboardComponentObject.apply(this, arguments);
    data.resource = this.resource.resource.get('uri');
    return data;
  },
  _getDataSourceUri: function _getDataSourceUri() {
    //collection of new visualization types which we can create right in dashboard
    var newVisualizationTypes = [dashboardComponentTypes.CROSSTAB, dashboardComponentTypes.CHART, dashboardComponentTypes.TABLE];

    if (_.indexOf(newVisualizationTypes, this.get('type')) >= 0) {
      //special case: when model is one of new visualization types
      //we have to use other property for data source uri
      return this.resource && this.resource.resource.get('dataSourceUri') || this.get('dataSourceUri');
    } else {
      return VisualizationDashletModel.prototype._getDataSourceUri.call(this);
    }
  }
});

});