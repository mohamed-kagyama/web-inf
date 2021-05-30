define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var classUtil = require("runtime_dependencies/js-sdk/src/common/util/classUtil");

var _ = require('underscore');

var $ = require('jquery');

var dialogs = require("runtime_dependencies/jrs-ui/src/components/components.dialogs");

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var loadingDialog = require('../loading/loadingDialog');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var controllerMap = {
  table: 'adhoc/table.html',
  crosstab: 'adhoc/crosstab.html',
  olap_crosstab: 'adhoc/crosstab.html',
  ichart: 'adhoc/intelligentChart.html',
  olap_ichart: 'adhoc/intelligentChart.html'
};
var FilterService = classUtil.extend({
  constructor: function constructor(options) {
    this.clientKey = options.clientKey;
    this.mode = options.mode;
  },
  createUrl: function createUrl(action, baseUrl) {
    return (baseUrl || controllerMap[this.mode()]) + '?action=' + action;
  },
  _request: function _request(ajaxParams, showLoading, callbacks) {
    showLoading = typeof showLoading === 'undefined' ? true : showLoading;
    callbacks = callbacks || FilterService.defaultCallbacks;
    var dfd = $.ajax(ajaxParams).done(callbacks.done || FilterService.defaultCallbacks.done).fail(callbacks.fail || FilterService.defaultCallbacks.fail).always(callbacks.always || FilterService.defaultCallbacks.always);

    if (showLoading) {
      loadingDialog(dfd, {
        el: $('#loading'),
        showDimmer: false,
        focus: false,
        delay: FilterService.SLOW_REQUEST_TIMEOUT
      });
    }

    return dfd;
  },
  get: function get() {
    return this._request({
      url: this.createUrl('generateFilterPanel'),
      data: {
        clientKey: this.clientKey
      }
    });
  },
  add: function add(fieldNames) {
    return this._request({
      url: this.createUrl('addAdhocFilter'),
      type: 'POST',
      data: {
        addAdhocFilterFields: _.map(fieldNames, encodeURIComponent),
        clientKey: this.clientKey
      }
    });
  },
  addOlapFilter: function addOlapFilter(dimensionId, levelId) {
    return this._request({
      url: this.createUrl('addOLAPFilter', controllerMap.olap_crosstab),
      type: 'POST',
      data: {
        dim: dimensionId,
        child: levelId,
        clientKey: this.clientKey
      }
    });
  },
  addSlice: function addSlice(axis, includeOrExclude, pathes) {
    return this._request({
      url: this.createUrl('addQuickSliceFilter', controllerMap.crosstab),
      type: 'POST',
      data: {
        axis: axis,
        includeOrExclude: includeOrExclude,
        pathList: JSON.stringify(_.map(pathes, function (p) {
          return encodeURIComponent(p);
        })),
        clientKey: this.clientKey
      }
    });
  },
  update: function update(id, filterExpression) {
    return this._request({
      url: this.createUrl('editAdhocFilter'),
      type: 'POST',
      data: {
        filterId: id,
        editAdhocFilter: JSON.stringify(filterExpression),
        clientKey: this.clientKey
      }
    });
  },
  remove: function remove(filterId) {
    return this._request({
      url: this.createUrl('deleteAdhocFilter'),
      type: 'POST',
      data: {
        filterId: filterId,
        clientKey: this.clientKey
      }
    });
  },
  removeAll: function removeAll() {
    return this._request({
      url: this.createUrl('deleteAllAdhocFilters'),
      type: 'POST',
      data: {
        clientKey: this.clientKey
      }
    });
  },
  reorder: function reorder(oldIndex, newIndex) {
    return this._request({
      url: this.createUrl('reorderFilters'),
      type: 'POST',
      data: {
        oldIndex: oldIndex,
        newIndex: newIndex,
        clientKey: this.clientKey
      }
    });
  },
  toggleVisibility: function toggleVisibility(filterId) {
    return this._request({
      url: this.createUrl('toggleFilterPodState'),
      type: 'POST',
      data: {
        filterId: filterId,
        clientKey: this.clientKey
      }
    });
  },
  minimizeAll: function minimizeAll() {
    return this._request({
      url: this.createUrl('minimizeAllAdhocFilterPods'),
      type: 'POST',
      data: {
        clientKey: this.clientKey
      }
    });
  },
  maximizeAll: function maximizeAll() {
    return this._request({
      url: this.createUrl('maximizeAllAdhocFilterPods'),
      type: 'POST',
      data: {
        clientKey: this.clientKey
      }
    });
  },

  /**
       * Method to fetch values from the server
       * @param fieldName
       * @param additionalData - usually pagination and search criteria
       * @returns {*}
       */
  fetchValues: function fetchValues(fieldName, additionalData, showLoading) {
    additionalData = additionalData || {};

    if (additionalData.criteria) {
      //search criteria should be uri encoded
      additionalData.criteria = encodeURIComponent(additionalData.criteria);
    }

    return this._request({
      url: this.createUrl('getFieldValues'),
      data: _.extend({
        fieldName: encodeURIComponent(fieldName),
        clientKey: this.clientKey
      }, additionalData)
    }, showLoading);
  },
  applyFiltersAndExpression: function applyFiltersAndExpression(adhocFilters, complexFilterExpression) {
    return this._request({
      url: this.createUrl('applyAdhocFiltersAndExpression'),
      type: 'POST',
      data: {
        complexFilterExpression: complexFilterExpression,
        adhocFilters: JSON.stringify(adhocFilters),
        clientKey: this.clientKey
      }
    });
  },
  getMaxMinValues: function getMaxMinValues(fieldName) {
    return this._request({
      url: this.createUrl('getMaxMinValues'),
      data: {
        fieldName: encodeURIComponent(fieldName),
        clientKey: this.clientKey
      }
    });
  }
});
FilterService.defaultCallbacks = {
  fail: function fail(jqXHR, textStatus, errorThrown) {
    if (jqXHR.getResponseHeader('LoginRequested')) {
      document.location = jrsConfigs.urlContext;
    } else if (jqXHR.getResponseHeader('adhocException')) {
      var errorMessage = jqXHR.getResponseHeader('adhocException');
      errorMessage = decodeURIComponent(errorMessage); // @@ used as delimiter to replace whitespaces before encoding on server side. Need to replace them
      // @@ used as delimiter to replace whitespaces before encoding on server side. Need to replace them
      // @@ used as delimiter to replace whitespaces before encoding on server side. Need to replace them
      // @@ used as delimiter to replace whitespaces before encoding on server side. Need to replace them

      errorMessage = errorMessage.replace(/@@/g, ' ');
      dialogs.errorPopup.show(errorMessage);
    } else if (jqXHR.status == 500 || jqXHR.getResponseHeader('JasperServerError') && !jqXHR.getResponseHeader('SuppressError')) {
      dialogs.errorPopup.show(jqXHR.responseText);
    }
  },
  always: function always() {
    dialogs.popup.hide($('#loading')[0]);
  }
};
FilterService.SLOW_REQUEST_TIMEOUT = 2000; // workaround for non-AMD modules
// workaround for non-AMD modules
// workaround for non-AMD modules
// workaround for non-AMD modules

window.FilterService = FilterService;
module.exports = FilterService;

});