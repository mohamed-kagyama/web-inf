define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var SimpleModel = require("../../../../../model/util/SimpleModel");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var OptionsDesignerStore = SimpleModel.extend({
  defaults: function defaults() {
    return {
      ownDesigner: '',
      currentDesigner: '',
      bundles: [],
      securityFile: null
    };
  }
});
module.exports = OptionsDesignerStore;

});