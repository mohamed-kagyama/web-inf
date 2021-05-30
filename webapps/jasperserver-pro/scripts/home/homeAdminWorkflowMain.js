define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var domReady = require('requirejs-domready');

var ReactDOM = require('react-dom');

var React = require('react');

var HomeAdminWorkflowApp = require('./HomeAdminWorkflowApp');

var _serviceHyperMediaService = require('./service/hyperMediaService');

var getHomeAdminWorkflowResources = _serviceHyperMediaService.getHomeAdminWorkflowResources;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
// @ts-ignore
getHomeAdminWorkflowResources().then(function (value) {
  domReady(function () {
    ReactDOM.render(React.createElement(HomeAdminWorkflowApp, {
      workflows: value
    }), document.querySelector('#display div.body'));
  });
});

});