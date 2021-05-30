define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  'links': [{
    'title': 'JRS Settings',
    'rel': 'settings',
    'href': '/login.html',
    'method': 'GET',
    'mediaType': 'text/html'
  }, {
    'title': 'RequireJS configuration for JRS',
    'name': 'jrs',
    'rel': 'requirejs',
    'href': '/{scripts}/require.config.js',
    'method': 'GET',
    'mediaType': 'application/javascript'
  }, {
    'title': 'Xdm provider',
    'rel': 'xdm',
    'href': '/xdm.html',
    'method': 'GET',
    'mediaType': 'text/html'
  }]
};

});