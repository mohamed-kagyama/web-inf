define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  initTreePlugins: function initTreePlugins(tree, plugins) {
    plugins = plugins || [];

    _.each(plugins, function (plugin) {
      var pluginOptions = _.extend({}, plugin.options, {
        tree: tree
      });

      new plugin.constr(pluginOptions);
    });
  }
};

});