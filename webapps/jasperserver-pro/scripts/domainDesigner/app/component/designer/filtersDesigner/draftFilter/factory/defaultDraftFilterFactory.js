define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var filterOperandTypesEnum = require("../../../../../../model/schema/enum/filterOperandTypesEnum");

var defaultNewFilterOptions = require("../enum/defaultNewFilterOptions");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    options = _.cloneDeep(options || {});

    var result = _.defaults(options, {
      id: null,
      sourceId: null,
      sourceType: null,
      errors: {},
      expression: {}
    });

    _.defaults(result.expression, {
      left: {},
      operator: defaultNewFilterOptions.operator
    });

    _.defaults(result.expression.left, {
      type: filterOperandTypesEnum.VARIABLE
    });

    return result;
  }
};

});