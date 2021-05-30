define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var SimpleModel = require("../../../../../../../../../model/util/SimpleModel");

var clientExpressionsEnum = require("../../../../../../../../model/enum/clientExpressionsEnum");

var constantJoinExpressionUtil = require("../../../../../util/constantJoinExpressionUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = SimpleModel.extend({
  defaults: function defaults() {
    return {
      id: null,
      joinId: null,
      field: null,
      fieldType: null,
      fieldOptions: [],
      availableOperators: [],
      operator: clientExpressionsEnum.operators.equals.name,
      value: '',
      expressionValidationInProgress: false,
      constantJoinValidationInProgress: false,
      successMessage: '',
      errorMessage: '',
      warningMessage: ''
    };
  },
  reset: function reset() {
    this.set(this.defaults());
  },
  toJSON: function toJSON() {
    var field = this.get('field'),
        fieldIdAndJoinAliasId = constantJoinExpressionUtil.parseField(field);

    var modelAttributes = _.extend({
      joinId: this.get('joinId'),
      operator: this.get('operator'),
      value: this.get('value'),
      fieldType: this.get('fieldType')
    }, fieldIdAndJoinAliasId);

    if (this.get('id')) {
      _.extend(modelAttributes, {
        id: this.get('id')
      });
    }

    return modelAttributes;
  }
});

});