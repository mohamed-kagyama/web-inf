define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var validationStateNameEnum = require('./enum/validationStateNameEnum');

var validationStateContextUtil = require("./util/validationStateContextUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ReplaceDataSourceDataSourceUriSelectedState = function ReplaceDataSourceDataSourceUriSelectedState(options) {
  this.initialize(options);
};

_.extend(ReplaceDataSourceDataSourceUriSelectedState.prototype, {
  initialize: function initialize(options) {},
  enter: function enter(context, stateFactory) {
    validationStateContextUtil.setDataSource(context, context.dataSourceUri);
    stateFactory.enter(validationStateNameEnum.REPLACE_DATA_SOURCE_STATE, context);
  }
});

module.exports = ReplaceDataSourceDataSourceUriSelectedState;

});