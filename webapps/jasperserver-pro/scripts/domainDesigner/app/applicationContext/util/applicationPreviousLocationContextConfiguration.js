define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var uriLocation = require("../../util/uriLocation");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (context, options) {
  context.register('goToPreviousLocation', _.partial(uriLocation.changeLocation, options.previousLocation));
};

});