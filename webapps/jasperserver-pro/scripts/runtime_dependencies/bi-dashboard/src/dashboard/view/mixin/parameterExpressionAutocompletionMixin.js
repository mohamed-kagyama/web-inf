define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var ParameterMenu = require('../designer/ParameterMenu');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PARAMETRIZED_INPUT_ATTRIBUTE = 'data-jrs-parameterized-input';
var PARAMETRIZED_INPUT_SELECTOR = 'input[' + PARAMETRIZED_INPUT_ATTRIBUTE + ']';
module.exports = {
  applyParameterExpressionAutocompletionMixin: function applyParameterExpressionAutocompletionMixin() {
    var self = this,
        hanlder = function hanlder() {
      ParameterMenu.onInput.apply(self, arguments);
    };

    this.$(PARAMETRIZED_INPUT_SELECTOR).on('input', hanlder);
    this.on('close', ParameterMenu.close);
    var oRemove = this.remove;

    this.remove = function () {
      this.$(PARAMETRIZED_INPUT_SELECTOR).off('input', hanlder);
      this.off('close', ParameterMenu.close);
      return oRemove.apply(this, arguments);
    };
  }
};

});