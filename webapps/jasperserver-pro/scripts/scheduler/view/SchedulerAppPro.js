define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var domReady = require('requirejs-domready');

var Backbone = require('backbone');

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var SchedulerAppFromCE = require("runtime_dependencies/jrs-ui/src/scheduler/view/SchedulerApp");

var JobModelPro = require('../model/JobModelPro');

var resourceType = require('../enum/scheduledResourceTypeEnum');

var JobsViewPro = require('../view/JobsViewPro');

var JobEditorViewPro = require('../view/JobEditorViewPro');

var _runtime_dependenciesJrsUiSrcControlsControlsBase = require("runtime_dependencies/jrs-ui/src/controls/controls.base");

var ControlsBase = _runtime_dependenciesJrsUiSrcControlsControlsBase.ControlsBase;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
domReady(function () {
  _.extend(ControlsBase, jrsConfigs.inputControlsConstants);
});
module.exports = SchedulerAppFromCE.extend({
  _createJobModel: function _createJobModel() {
    return new JobModelPro();
  },
  _createJobsView: function _createJobsView(options) {
    return new JobsViewPro(options);
  },
  _createJobEditorView: function _createJobEditorView(options) {
    return new JobEditorViewPro(options);
  },
  _getChildViewInitParams: function _getChildViewInitParams() {
    var params = SchedulerAppFromCE.prototype._getChildViewInitParams.apply(this, arguments);

    params.isDashboard = this.schedulerStartupParams['resourceType'] === 'DashboardModelResource';
    params.model.resourceType = this.schedulerStartupParams['resourceType'];
    return params;
  },
  openEditJobInterface: function openEditJobInterface(jobId) {
    var _this = this,
        _arguments = arguments;

    if (this.masterViewMode) {
      var model = new Backbone.Model();
      model.urlRoot = this.childViewInitParams.model.urlRoot;
      model.set({
        id: jobId
      });
      model.fetch({
        headers: {
          'Accept': 'application/job+json'
        }
      }).done(function () {
        var source = model.get('source');
        _this.childViewInitParams.isDashboard = !_.isUndefined(source.referenceWidth) && !_.isUndefined(source.referenceHeight);
        _this.childViewInitParams.model.resourceType = _this.childViewInitParams.isDashboard ? resourceType.DASHBOARD : '';
        _this.childViewInitParams.model._fetched = model.attributes;
        SchedulerAppFromCE.prototype.openEditJobInterface.call(_this, _arguments);
      });
    } else {
      SchedulerAppFromCE.prototype.openEditJobInterface.apply(this, arguments);
    }
  }
});

});