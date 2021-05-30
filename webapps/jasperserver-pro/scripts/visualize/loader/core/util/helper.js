define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  serverSettings: function serverSettings(htmlContent) {
    var jsContent = htmlContent.match(/<script[^>]*>([^<]*)<\/script>/)[1],
        //run 'safe' eval
    func = new Function(jsContent + 'return __jrsConfigs__;');
    return func();
  },
  loaderConfig: function loaderConfig(javascript) {
    return new Function('requirejs', 'return ' + javascript)({
      config: function config(opts) {
        return opts;
      }
    });
  }
};

});