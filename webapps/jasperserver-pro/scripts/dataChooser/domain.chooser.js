define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $ = _prototype.$;
var $break = _prototype.$break;
var $H = _prototype.$H;

var _ = require('underscore');

var jQuery = require('jquery');

var __jrsConfigs__ = require("runtime_dependencies/js-sdk/src/jrs.configs");

var domain = require('./domain.base');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @version: $Id$
 */

/*global confirm*/
////////////////////////////////////
// Common domain data chooser logic
////////////////////////////////////
var REPORT_TYPE_PARAM = "reportType";
var REPORT_TYPE_URL_PARAM_PATTERN = new RegExp("[\\?&]" + REPORT_TYPE_PARAM + "=([^&#]*)");
domain.chooser = {
  // Common elements ids.
  FLOW_ID: 'adhocFlow',
  FIELDS: 'dataChooserFields',
  DISPLAY: 'dataChooserDisplay',
  SAVE_AS_TOPIC: 'dataChooserSaveAsTopic',
  PRE_FILTERS: 'dataChooserPreFilters',
  // Submit form identifier variable. Could be changed.
  submitFormId: 'stepDisplayForm',
  currentPage: null,
  flowExecutionKey: null,
  unsavedChangesPresent: false,
  initialize: function initialize(params) {
    var reportTypeParamValues = REPORT_TYPE_URL_PARAM_PATTERN.exec(location.search);
    this.reportType = reportTypeParamValues == null ? "" : decodeURIComponent(reportTypeParamValues[1].replace(/\+/g, " "));
    if (!window.localContext.rsInitOptions) return;
    var options = window.localContext.rsInitOptions;
    this.currentPage = $(document.body).identify();
    this.flowExecutionKey = options.flowExecutionKey;
    this.unsavedChangesPresent = options.unsavedChangesPresent;
    var module = this.pageInitFactory[this.currentPage]();
    options = _.extend({}, options, params);
    this.initModule(module, options);
    domain.registerClickHandlers([this.getFlowControlsClickEventHandler()]);
  },
  initModule: function initModule(module, options) {
    if (!module) {
      return;
    }

    module.fillForm && (dc.fillForm = module.fillForm.bind(module));
    module.getFlowControlsClickEventHandler && (dc.getFlowControlsClickEventHandler = module.getFlowControlsClickEventHandler.bind(module));
    module.init.bind(module)(options);
  },
  fillForm: function fillForm() {//Nothing to do
  },
  getFlowControlsClickEventHandler: function getFlowControlsClickEventHandler() {
    return dc.flowControlsClickEventHandler.bind(dc);
  },
  flowControlsClickEventHandler: function flowControlsClickEventHandler(element) {
    var eventHandled = false;
    this.flowControlsEventMap.each(function (pair) {
      if (domain.elementClicked(element, pair.key)) {
        eventHandled = true;

        if (pair.value.returnOnPage && this.currentPage === pair.value.returnOnPage) {
          throw $break;
        }

        if (pair.value.confirmLeave && !this.confirmAndLeave()) {
          throw $break;
        }

        delete pair.value.returnOnPage;
        pair.value.flowId = this.FLOW_ID;
        pair.value.flowExecutionKey = this.flowExecutionKey;
        pair.value.reportType = this.reportType;

        if (!__jrsConfigs__.initAdditionalUIComponents) {
          pair.value.decorate = "no";
        }

        if (pair.value.eventId === "cancelRedirect") {
          jQuery(document).trigger("adhocDesigner:cancel");
        }

        domain.submitForm(this.submitFormId, pair.value, this.fillForm);
        throw $break;
      }
    }.bind(this));
    return eventHandled;
  }
}; //Alias for domain.chooser

var dc = domain.chooser;

dc.confirmAndLeave = function () {
  if (dc.unsavedChangesPresent) {
    return confirm(domain.getMessage('exitMessage'));
  }

  return true;
};

dc.setUnsavedChangesPresent = function (present) {
  dc.unsavedChangesPresent = !!present;
};

dc.isUnsavedChangesPresent = function () {
  return dc.unsavedChangesPresent;
}; //////////////////////////
// Factories
//////////////////////////


dc.pageInitFactory = {
  'dataChooserFields': function dataChooserFields() {
    return domain.chooser.fields;
  },
  'dataChooserPreFilters': function dataChooserPreFilters() {
    return domain.chooser.preFilters;
  },
  'dataChooserDisplay': function dataChooserDisplay() {
    return domain.chooser.display;
  },
  'dataChooserSaveAsTopic': function dataChooserSaveAsTopic() {
    return domain.chooser.saveAsTopic;
  }
};
dc.flowControlsEventMap = $H({
  //'#sourceTab': {flowId: 'adhocFlow'},
  '#fieldsTab': {
    returnOnPage: domain.chooser.FIELDS,
    eventId: 'fields'
  },
  '#filtersTab': {
    returnOnPage: domain.chooser.PRE_FILTERS,
    eventId: 'preFilters'
  },
  '#displayTab': {
    returnOnPage: domain.chooser.DISPLAY,
    eventId: 'display'
  },
  '#saveTopicTab': {
    returnOnPage: domain.chooser.SAVE_AS_TOPIC,
    eventId: 'saveAsTopic'
  },
  '#goToDesigner': {
    eventId: 'done',
    reportType: dc.reportType
  },
  '#cancel': {
    eventId: 'cancelRedirect',
    confirmLeave: true
  }
}); // JRS-20951. global navigation looks for global domain.chooser object.

window.domain = window.domain || {};
window.domain.chooser = {
  confirmAndLeave: dc.confirmAndLeave
};
module.exports = dc;

});