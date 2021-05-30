define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var webHelpModule = require("runtime_dependencies/jrs-ui/src/components/components.webHelp");

var _ = require('underscore');

var dashboardSettings = require("runtime_dependencies/bi-dashboard/src/dashboard/dashboardSettings");

var config = require("runtime_dependencies/js-sdk/src/jrs.configs");

var DashboardViewer = require("runtime_dependencies/bi-dashboard/src/dashboard/DashboardViewer");

var domReady = require('requirejs-domready');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DASHBOARD_QUERY_STRING_NAME = 'dashboardResource';
var hash = window.location.hash.toString();
var href = window.location.href.toString();
var searchString = window.location.search.toString();
var url = href.indexOf('?') > -1 ? href.split('?')[0] : href.split('#')[0];
var hashParts = hash.split('&');
var dashboardResourceUri,
    newQueryStringParts = [],
    dashboardParams = DashboardViewer.readSpecifiedDashboardParameters();

function getValueOfUrlParam(paramName) {
  var regExp = new RegExp(paramName + '=([^&?]*)'),
      result,
      match;

  if (searchString) {
    match = searchString.match(regExp);

    if (match && match.length > 1) {
      result = match[1];
    }
  }

  return result;
}

function paramsToString(param) {
  var res = [];

  for (var key in param) {
    if (Object.prototype.hasOwnProperty.call(param, key)) {
      res.push(_.map(param[key], function (value) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(value);
      }).join("&"));
    }
  }

  return res.join("&");
}

if (hash === '' && searchString.indexOf(DASHBOARD_QUERY_STRING_NAME + '=') > -1) {
  var searchStringParts = searchString.substring(1).split('&');

  _.each(searchStringParts, function (pair) {
    if (pair.indexOf(DASHBOARD_QUERY_STRING_NAME + '=') > -1) {
      dashboardResourceUri = pair.split(DASHBOARD_QUERY_STRING_NAME + '=')[1];
    } else {
      newQueryStringParts.push(pair);
    }
  });

  window.location.replace(url + '?' + newQueryStringParts.join('&') + '#' + dashboardResourceUri);
} else {
  if (hashParts.length > 1) {
    dashboardResourceUri = hashParts[0];
    window.location.replace(url + "?" + paramsToString(_.extend(dashboardParams, DashboardViewer.parseDashboardParamsFromString(hashParts.slice(1).join("&")))) + dashboardResourceUri);
  } else {
    dashboardSettings.CONTEXT_PATH = config.contextPath;
    webHelpModule.setCurrentContext('dashboard');
    domReady(function () {
      var dashboardViewer = new DashboardViewer({
        el: '#display',
        toolbar: searchString.indexOf('viewAsDashboardFrame=true') === -1,
        params: dashboardParams,
        contextPath: config.contextPath,
        referenceWidth: getValueOfUrlParam('dashboardReferenceWidth'),
        referenceHeight: getValueOfUrlParam('dashboardReferenceHeight')
      });
    });
  }
}

});