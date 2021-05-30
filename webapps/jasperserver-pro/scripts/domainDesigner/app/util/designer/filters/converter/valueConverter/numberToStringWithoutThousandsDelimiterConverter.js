define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var numberUtil = require("../../../../../common/util/numberUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  convert: function convert(value) {
    if (_.isString(value)) {
      value = numberUtil.formatStringNumber(value);
    } else {
      value = numberUtil.formatNumber(value);
    }

    return numberUtil.removeThousandsDelimiter(value);
  }
};

});