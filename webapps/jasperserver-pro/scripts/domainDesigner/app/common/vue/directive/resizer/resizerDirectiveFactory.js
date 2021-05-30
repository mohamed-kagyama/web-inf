define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Resizer = require("./Resizer");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    options = options || {};
    var ResizerConstructor = options.Resizer || Resizer;
    return {
      bind: function bind(el, binding) {
        var resizerConfig = binding.value;
        var options = {
          config: resizerConfig
        };
        el._resizer = new ResizerConstructor(el, options);
      },
      unbind: function unbind(el) {
        el._resizer && el._resizer.remove();
      }
    };
  }
};

});