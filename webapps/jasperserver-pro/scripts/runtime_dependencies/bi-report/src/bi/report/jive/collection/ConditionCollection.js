define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var ConditionModel = require('../model/ConditionModel');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.Collection.extend({
  model: ConditionModel,
  initialize: function initialize(models, options) {
    options || (options = {});
    this.dataType = options.dataType;
  }
});

});