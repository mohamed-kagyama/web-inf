define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
var labelKey = 'domain.designer.joinsDesigner.constantJoinExpression.field.template';

var valueTemplate = _.template('{{-joinAliasId}}:{{-fieldId}}');

var ConstantJoinExpressionConverter = function ConstantJoinExpressionConverter(options) {
  this.selectOptionClassName = options.selectOptionClassName;
};

_.extend(ConstantJoinExpressionConverter.prototype, {
  getConstantJoinExpressionOptions: function getConstantJoinExpressionOptions(options) {
    var constantJoinExpressionOptions = {
      joinId: options.joinId,
      availableOperators: options.availableOperators
    };

    if (entityUtil.isConstantJoinExpression(options.modelType)) {
      _.extend(constantJoinExpressionOptions, this._getEditConstantJoinExpressionOptions(options));
    } else {
      _.extend(constantJoinExpressionOptions, this._getCreateConstantJoinExpressionOptions(options));
    }

    return constantJoinExpressionOptions;
  },
  _getCreateConstantJoinExpressionOptions: function _getCreateConstantJoinExpressionOptions(options) {
    var fieldOptions = this._createFieldOptions(options.fields);

    fieldOptions = _.sortBy(fieldOptions, this._fieldOptionsSorter);
    return {
      field: _.first(fieldOptions).value,
      fieldOptions: fieldOptions,
      value: ''
    };
  },
  _getEditConstantJoinExpressionOptions: function _getEditConstantJoinExpressionOptions(constantJoinExpression) {
    var fieldId = constantJoinExpression.fieldId,
        joinAliasId = constantJoinExpression.joinAliasId,
        value = constantJoinExpression.value,
        operator = constantJoinExpression.operator,
        id = constantJoinExpression.id;

    var fieldOptions = this._createFieldOptions(constantJoinExpression.fields);

    fieldOptions = _.sortBy(fieldOptions, this._fieldOptionsSorter);

    var currentFieldValue = this._formatField({
      fieldId: fieldId,
      joinAliasId: joinAliasId
    });

    return {
      id: id,
      field: currentFieldValue,
      fieldOptions: fieldOptions,
      value: value,
      operator: operator
    };
  },
  _createFieldOptions: function _createFieldOptions(fields) {
    return _.map(fields, function (field) {
      return this._createFieldOption({
        field: field.name,
        fieldId: field.id,
        fieldType: field.type,
        joinAlias: field.joinAlias,
        joinAliasId: field.joinAliasId
      });
    }, this);
  },
  _createFieldOption: function _createFieldOption(options) {
    return {
      label: i18nMessage(labelKey, options.joinAlias, options.field),
      value: this._formatField(options),
      fieldType: options.fieldType,
      className: this.selectOptionClassName
    };
  },
  _fieldOptionsSorter: function _fieldOptionsSorter(fieldOption) {
    return fieldOption.label;
  },
  _formatField: function _formatField(options) {
    return valueTemplate({
      fieldId: options.fieldId,
      joinAliasId: options.joinAliasId
    });
  }
});

module.exports = ConstantJoinExpressionConverter;

});