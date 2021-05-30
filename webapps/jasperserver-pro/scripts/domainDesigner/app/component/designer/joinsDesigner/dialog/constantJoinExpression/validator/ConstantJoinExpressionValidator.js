define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var requestCanceledEnum = require("../../../../../../rest/enum/requestCanceledEnum");

var constantJoinExpressionErrorMessageBuilder = require("../../../util/constantJoinExpressionErrorMessageBuilder");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var ConstantJoinExpressionValidator = function ConstantJoinExpressionValidator(options) {
  this.initialize(options);
};

_.extend(ConstantJoinExpressionValidator.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, '_getExpressionValidationError');

    this.validationService = options.validationService;
  },
  validate: function validate(expression) {
    var self = this;
    this.validationDfd = new $.Deferred();

    this._isExpressionEmpty(expression).then(function () {
      return self.validationService.validateDOMEl(expression).then(function (response) {
        return response;
      }, function (error) {
        return new $.Deferred().reject(self._getExpressionValidationError(expression, error));
      });
    }).then(function (response) {
      return self.validationDfd.resolve(response);
    }, function (error) {
      return self.validationDfd.reject(error);
    });

    return this.validationDfd;
  },
  cancelValidation: function cancelValidation() {
    return this.validationDfd && this.validationDfd.reject(requestCanceledEnum.CANCELED);
  },
  _isExpressionEmpty: function _isExpressionEmpty(expressionObj) {
    var dfd = new $.Deferred(),
        value = expressionObj.expression.string;

    if ($.trim(value) === '') {
      dfd.reject(i18nMessage('domain.validation.constantJoinExpressionValue.empty'));
    } else {
      dfd.resolve();
    }

    return dfd;
  },
  _isExpressionValidDomEl: function _isExpressionValidDomEl(expressionObj) {
    return this.validationService.validateDOMEl(expressionObj).then(null, _.bind(this._getExpressionValidationError, this, expressionObj));
  },
  _getExpressionValidationError: function _getExpressionValidationError(expressionObj, error) {
    return constantJoinExpressionErrorMessageBuilder.getErrorMessage({
      responseJSON: error.responseJSON,
      validationOptions: {
        value: expressionObj.expression.string
      }
    });
  }
});

module.exports = ConstantJoinExpressionValidator;

});