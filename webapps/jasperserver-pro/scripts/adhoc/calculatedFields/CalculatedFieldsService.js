define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var classUtil = require("runtime_dependencies/js-sdk/src/common/util/classUtil");

var $ = require('jquery');

var requestSettings = require("requestSettings");

var dialogs = require("runtime_dependencies/jrs-ui/src/components/components.dialogs");

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var dialogErrorMessageTemplate = require("text!runtime_dependencies/js-sdk/src/common/templates/dialogErrorPopupTemplate.htm");

var loadingDialog = require('../loading/loadingDialog');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CalculatedFieldsService = classUtil.extend({
  constructor: function constructor(options) {
    this.clientKey = options.clientKey;
  },
  createRestUrl: function createRestUrl(actionUrl) {
    return 'rest_v2/metadata/_temp/' + this.clientKey + actionUrl;
  },
  _request: function _request(ajaxParams, showLoading, callbacks) {
    showLoading = typeof showLoading === 'undefined' ? true : showLoading;
    callbacks = callbacks || CalculatedFieldsService.defaultCallbacks;
    var dfd = $.ajax(_.defaults(ajaxParams, requestSettings)).done(callbacks.done || CalculatedFieldsService.defaultCallbacks.done).fail(callbacks.fail || CalculatedFieldsService.defaultCallbacks.fail).always(callbacks.always || CalculatedFieldsService.defaultCallbacks.always);

    if (showLoading) {
      loadingDialog(dfd, {
        el: $('#loading'),
        showDimmer: false,
        delay: CalculatedFieldsService.SLOW_REQUEST_TIMEOUT
      });
    }

    return dfd;
  },
  fetchFieldsList: function fetchFieldsList() {
    return this._request({
      url: this.createRestUrl('/fields'),
      type: 'GET',
      dataType: 'json'
    });
  },
  fetchFunctionsList: function fetchFunctionsList() {
    return this._request({
      url: this.createRestUrl('/functions'),
      type: 'GET',
      dataType: 'json'
    });
  },
  validate: function validate(field) {
    return this._request({
      url: this.createRestUrl('/action/validate'),
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(field)
    });
  },
  get: function get(fieldId) {
    return this._request({
      url: this.createRestUrl('/fields/' + fieldId),
      type: 'GET',
      dataType: 'json'
    });
  },
  add: function add(field) {
    return this._request({
      url: this.createRestUrl('/fields'),
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(field)
    });
  },
  update: function update(field, fieldId) {
    return this._request({
      url: this.createRestUrl('/fields/' + fieldId),
      type: 'PUT',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(field)
    });
  },
  remove: function remove(fieldId) {
    return this._request({
      url: this.createRestUrl('/fields/' + fieldId),
      type: 'DELETE',
      contentType: 'application/json'
    });
  }
});
CalculatedFieldsService.defaultCallbacks = {
  fail: function fail(jqXHR, textStatus, errorThrown) {
    if (jqXHR.status == 401 || jqXHR.getResponseHeader('LoginRequested')) {
      document.location = jrsConfigs.urlContext;
    } else if (jqXHR.getResponseHeader('adhocException')) {
      dialogs.errorPopup.show(jqXHR.getResponseHeader('adhocException'));
    } else if (jqXHR.status == 500 || jqXHR.getResponseHeader('JasperServerError') && !jqXHR.getResponseHeader('SuppressError')) {
      // TODO: Use some JRS standard way to handle 500 status.
      var jsonError = JSON.parse(jqXHR.responseText);

      var errTemplate = _.template(dialogErrorMessageTemplate, {
        message: errorThrown,
        respText: jsonError.message + ': ' + jsonError.parameters[0]
      });

      dialogs.errorPopup.show(errTemplate);
    }
  },
  always: function always() {
    dialogs.popup.hide($('#loading')[0]);
  }
};
CalculatedFieldsService.SLOW_REQUEST_TIMEOUT = 2000; // workaround for non-AMD modules
// workaround for non-AMD modules
// workaround for non-AMD modules
// workaround for non-AMD modules

window.CalculatedFieldsService = CalculatedFieldsService;
module.exports = CalculatedFieldsService;

});