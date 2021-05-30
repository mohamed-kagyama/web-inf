define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BaseComponentModel = require("./BaseComponentModel");

var _ = require("underscore");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var EVENT_ACTION = "action";
var reportCreators = {
  AD_HOC_DESIGNER: "adhoc designer",
  JSS_IREPORT_STUDIO: "JSS/iReport studio"
};
var CHART_TYPE_NAME = "chart";
module.exports = BaseComponentModel.extend({
  defaults: function defaults() {
    return {
      charttype: undefined,
      datetimeSupported: false,
      hcinstancedata: undefined,
      id: undefined,
      interactive: true,
      module: "jive.highcharts",
      type: CHART_TYPE_NAME
    };
  },
  api: {
    changeType: {}
  },
  actions: {
    "change:charttype": function changeCharttype() {
      return {
        actionName: "changeChartType",
        changeChartTypeData: {
          chartComponentUuid: this.get("chartUuid"),
          chartType: this.get("charttype")
        }
      };
    }
  },
  initialize: function initialize() {
    if (this.has("hcinstancedata")) {
      var hcinstancedata = this.get("hcinstancedata"),
          creator = this._detectCreator(hcinstancedata);

      if (reportCreators.AD_HOC_DESIGNER === creator) {
        //workaround to stretch adhoc's
        delete hcinstancedata.width;
        delete hcinstancedata.height;
      }
    } // TODO remove uimodule property from JR and here


    this.unset("uimodule"); // JSON.parse(JSON.stringify(....)) is a deep clone.
    // JR services are changing model by initialization, therefore deep clone is done to avoid data corruption
    // should be replaced with true deep clone if JRS-1450 implemented
    // JSON.parse(JSON.stringify(....)) is a deep clone.
    // JR services are changing model by initialization, therefore deep clone is done to avoid data corruption
    // should be replaced with true deep clone if JRS-1450 implemented

    this.config = JSON.parse(JSON.stringify(this.toJSON()));
  },
  changeType: function changeType(parms) {
    this.trigger(EVENT_ACTION, {
      actionName: "changeChartType",
      changeChartTypeData: {
        chartComponentUuid: this.config.chartUuid,
        chartType: parms.type
      },
      options: {
        showErrorDialog: true
      }
    });
  },
  _detectCreator: function _detectCreator(hcInstance) {
    var services = hcInstance.services,
        isCreatedFromAdhoc = _.some(services, function (info) {
      return info.service.indexOf("adhoc") != -1;
    }),
        creator;

    if (isCreatedFromAdhoc) {
      creator = reportCreators.AD_HOC_DESIGNER;
    }

    if (creator) {
      this.set("creator", creator);
    }

    return creator;
  },
  toReportComponentObject: function toReportComponentObject() {
    if (!this.get("interactive")) {
      return undefined;
    }

    return {
      id: this.get("id"),
      componentType: CHART_TYPE_NAME,
      chartType: this.get("charttype"),
      name: this.get("name")
    };
  },
  updateFromReportComponentObject: function updateFromReportComponentObject(obj) {
    this.set({
      charttype: obj.chartType
    });
  },
  handleServerError: function handleServerError(result) {
    this.trigger("serverError", result);
  },
  handleClientError: function handleClientError(result) {
    this.trigger("serverError", result);
  }
});

});