define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var adhocViewTrait = require('./designerAdhocViewTrait');

var AdhocDesignerIframeView = require('../../../view/designer/AdhocDesignerIframeView');

var adHocToDashboardTypeMapper = require('../../../mapper/adHocToDashboardTypeMapper');

var ReportsParametersCollection = require('../../../collection/ReportsParametersCollection');

var dashboardComponentTypes = require('../../../enum/dashboardComponentTypes');

var dashletTechnicalOutputs = require('../../../enum/dashletTechnicalOutputs');

var i18n = require("bundle!DashboardBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ParametersCache = ReportsParametersCollection.instance;

var technical = _.values(dashletTechnicalOutputs); // TODO: add unit tests!!!


function stripFields(parameters) {
  return _.map(parameters || [], function (paramObj) {
    return {
      id: paramObj.id,
      uri: paramObj.uri,
      label: paramObj.label
    };
  });
}

function extractOutputParameters(outputParameters) {
  return _.filter(outputParameters || [], function (parameter) {
    return _.indexOf(technical, parameter.id) === -1;
  });
}

module.exports = _.extend({}, adhocViewTrait, {
  additionalContextMenuOptions: [{
    label: i18n['dashboard.context.menu.option.edit'],
    action: 'edit'
  }],
  _initComponentSpecificContextMenuEvents: function _initComponentSpecificContextMenuEvents() {
    this.listenTo(this.contextMenu, 'option:edit', this._editComponent);
  },
  _reInitDashlet: function _reInitDashlet() {
    this._removeComponent();

    this.model.resetCaching();

    this._initComponent();
  },
  _editComponent: function _editComponent() {
    var self = this;

    function closeAdhocDesignerIframe() {
      self.stopListening(adhocDesigner);
      adhocDesigner.remove();
    }

    var adhocDesigner = new AdhocDesignerIframeView({
      model: this.model
    });
    self.listenTo(adhocDesigner, 'close', function () {
      closeAdhocDesignerIframe();
    });
    self.listenTo(adhocDesigner, 'save', function (designerIframe, resourceModel) {
      closeAdhocDesignerIframe(); // We must update report type if it was changed in designer
      // We must update report type if it was changed in designer

      self.model.changeType(adHocToDashboardTypeMapper(resourceModel.type));

      self._reInitDashlet(); // Here we have 3-stage sequence of update of the values for input controls and all visualizations.
      // Stage 1: Discard cache and reload parameters data from server ( ParametersCache.getReportParameters with {force:true}).
      // When call will be finished, in callback components collection is updated, removed in adhoc designer filters removed from dashboard.
      // Then wiring notifies report, which were previously wired to it and hence resets its run parameters, related to removed filters.
      // Stage 2: ParametersCache produces "change" event, which triggers handlers in input controls views. (See designerInputControlTrait.js)
      // Here all affected filters update their selections according to value, set by user in adhoc designer. And if selection was actually changed,
      // wiring routes new values to the corresponding reports.
      // Stage 3: The "change" event happens in the next listener and this makes wiring to trigger refresh signal and refresh
      // all visualizations, which run parameters were changed somehow in any of previous two steps.
      // Here we have 3-stage sequence of update of the values for input controls and all visualizations.
      // Stage 1: Discard cache and reload parameters data from server ( ParametersCache.getReportParameters with {force:true}).
      // When call will be finished, in callback components collection is updated, removed in adhoc designer filters removed from dashboard.
      // Then wiring notifies report, which were previously wired to it and hence resets its run parameters, related to removed filters.
      // Stage 2: ParametersCache produces "change" event, which triggers handlers in input controls views. (See designerInputControlTrait.js)
      // Here all affected filters update their selections according to value, set by user in adhoc designer. And if selection was actually changed,
      // wiring routes new values to the corresponding reports.
      // Stage 3: The "change" event happens in the next listener and this makes wiring to trigger refresh signal and refresh
      // all visualizations, which run parameters were changed somehow in any of previous two steps.


      self.listenTo(ParametersCache, 'change:inputControl', function (model) {
        if (self.model.resource.resource.get('uri') === model.id) {
          self.stopListening(ParametersCache, 'change:inputControl');
          ParametersCache.getReportParameters(self.model.resource.resource.get('uri'), {
            force: true
          }).done(function (parameters, outputParameters) {
            self.model.set({
              outputParameters: stripFields(extractOutputParameters(outputParameters)),
              parameters: stripFields(parameters)
            }); // if params not changed, wiring will not update the report, but since it recreated,
            // the report should be refreshed anyway, thus call refresh manually
            // but we have to wait until report will be regenerated if save happened
            // if params not changed, wiring will not update the report, but since it recreated,
            // the report should be refreshed anyway, thus call refresh manually
            // but we have to wait until report will be regenerated if save happened

            self.model.getReportResourceUri().done(function () {
              self.paramsModel.paramsChanged || self.refresh();

              _.invoke(self.model.collection.where({
                type: dashboardComponentTypes.FILTER_GROUP
              }), 'notify', true);
            });
          });
        }
      });
      ParametersCache.getReportControls(self.model.resource.resource.get('uri'), {
        force: true
      }).done(function (parameters) {
        var oldParams = _.pluck(self.model.get('parameters'), 'id'),
            newParams = _.pluck(parameters, 'id'),
            removed = _.difference(oldParams, newParams),
            controls = self.model.collection.where({
          type: dashboardComponentTypes.INPUT_CONTROL,
          ownerResourceId: self.model.resource.id
        });

        self.model.collection.remove(_.reduce(controls, function (memo, component) {
          if (_.indexOf(removed, component.getOwnerParameterName()) >= 0) {
            memo.push(component);
          }

          return memo;
        }, []));
      });
      self.model.trigger('edit', self.model);
    });
    adhocDesigner.render();
  }
});

});