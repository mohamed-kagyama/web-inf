define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var SimpleModel = require("../../../../model/util/SimpleModel");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = SimpleModel.extend({
  defaults: function defaults(options) {
    return {
      collection: [],
      top: 0,
      scrollPos: 0,
      height: 0,
      canvasHeight: 0
    };
  },
  reset: function reset() {
    var defaultState = this.defaults();

    _.extend(this.attributes, defaultState);
  }
});

});