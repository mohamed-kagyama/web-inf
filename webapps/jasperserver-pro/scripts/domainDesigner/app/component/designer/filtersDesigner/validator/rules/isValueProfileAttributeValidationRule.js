define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var profileAttributeUtil = require("../../../../../../model/util/profileAttributeUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  validate: function validate(value) {
    if (!profileAttributeUtil.containsProfileAttribute(value)) {
      return true;
    }
  }
};

});