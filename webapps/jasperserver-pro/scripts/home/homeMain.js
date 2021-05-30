define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var domReady = require('requirejs-domready');

var ReactDOM = require('react-dom');

var React = require('react');

var _HomeApp = require('./HomeApp');

var HomeApp = _HomeApp.HomeApp;

var _serviceHyperMediaService = require('./service/hyperMediaService');

var getHomePageResources = _serviceHyperMediaService.getHomePageResources;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
// @ts-ignore
getHomePageResources().then(function (value) {
  domReady(function () {
    var workflows = value.workflows,
        contentReferences = value.contentReferences,
        resources = value.resources;
    ReactDOM.render(React.createElement(HomeApp, {
      recentResources: resources,
      contentReferences: contentReferences,
      workFlows: workflows
    }), document.querySelector('#display div.body'));
  });
});

});