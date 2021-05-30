define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var expressionsEnum = require("./expressionsEnum");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
module.exports = {
  castFunctions: expressionsEnum.castFunctions,
  functions: _.extend({
    // functions
    notContains: {
      name: 'notContains'
    },
    notStartsWith: {
      name: 'notStartsWith'
    },
    notEndsWith: {
      name: 'notEndsWith'
    }
  }, expressionsEnum.functions),
  operators: _.extend({
    notIn: {
      label: i18nMessage('domain.designer.expression.operator.notIn'),
      name: 'notIn'
    }
  }, _.omit(expressionsEnum.operators, expressionsEnum.operators.or.name))
};

});