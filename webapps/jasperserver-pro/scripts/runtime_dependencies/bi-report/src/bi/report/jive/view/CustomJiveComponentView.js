define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var $ = require('jquery');

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/* global __visualize__, __jrio__, requirejs */
var localLogger = logger.register("CustomJiveComponentView"),
    globalRequire;

if (typeof __visualize__ !== "undefined") {
  globalRequire = __visualize__.requirejs;
} else if (typeof __jrio__ !== "undefined") {
  globalRequire = __jrio__.requirejs;
} else {
  globalRequire = requirejs;
}

module.exports = Backbone.View.extend({
  initialize: function initialize() {
    var model = this.model,
        loaderConfig = {
      paths: {}
    },
        css = model.get('css'),
        script = model.get('script');
    this.modules = [];
    loaderConfig.paths[script.name] = script.href;
    this.modules.push(script.name);

    if (css) {
      loaderConfig.paths[css.name] = css.href;
      this.modules.push('csslink!' + css.name);
    }

    globalRequire.config(loaderConfig);
    Backbone.View.prototype.initialize.apply(this, arguments);
  },
  render: function render() {
    var renderDeferred = new $.Deferred(),
        data = this.model.get('instanceData');
    globalRequire(this.modules, function (renderer) {
      // Cleanup the DIV...
      // This is due to a bug in the interactive viewer which
      // inovkes the component twice.
      $('#' + data.id + ' svg').remove();
      renderer(data);
      renderDeferred.resolve();
    }, function (err) {
      localLogger.error(err);
      renderDeferred.reject(err);
    });
    return renderDeferred;
  }
});

});