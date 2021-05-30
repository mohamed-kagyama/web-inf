define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

var compositeAndValidationRuleFactory = require("../../../../../common/factory/compositeAndValidationRuleFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationFieldsValidationRulesFactory = function PresentationFieldsValidationRulesFactory(options) {
  this.fieldAndSetNameValidator = options.fieldAndSetNameValidator;
  this.escapeJsonValidator = options.escapeJsonValidator;
  this.bundleKeyValidator = options.bundleKeyValidator;
  this.escapeJsonValidator = options.escapeJsonValidator;
  this.emptyValidator = options.emptyValidator;
  this.idValidator = options.idValidator;
  this.startsFromNumberValidator = options.startsFromNumberValidator;
};

_.extend(PresentationFieldsValidationRulesFactory.prototype, {
  _getBaseValidators: function _getBaseValidators() {
    return {
      'label': [this.escapeJsonValidator],
      'labelId': [this.escapeJsonValidator, this.bundleKeyValidator],
      'description': [this.escapeJsonValidator],
      'descriptionId': [this.escapeJsonValidator, this.bundleKeyValidator],
      'name': [this.emptyValidator, this.idValidator, this.startsFromNumberValidator]
    };
  },
  _getFieldsAndSetsValidators: function _getFieldsAndSetsValidators(id) {
    var fieldAndSetValidators = this._getBaseValidators();

    var fieldsAndSetNameValidator = _.partial(this.fieldAndSetNameValidator.fn, id);

    fieldAndSetValidators['name'].push({
      fn: fieldsAndSetNameValidator
    });
    return fieldAndSetValidators;
  },
  _getValidationRules: function _getValidationRules(options) {
    var property = options.property,
        entityType = options.modelType,
        id = options.id;
    var validationRules;

    if (entityUtil.isPresentationField(entityType) || entityUtil.isPresentationSet(entityType)) {
      validationRules = this._getFieldsAndSetsValidators(id);
    } else if (entityUtil.isDataIsland(entityType)) {
      validationRules = this._getBaseValidators();
    }

    return validationRules[property];
  },
  _adaptBackboneValidationRulesToSingleFunction: function _adaptBackboneValidationRulesToSingleFunction(validationRules) {
    validationRules = _.isArray(validationRules) ? validationRules : [validationRules];
    validationRules = validationRules.map(function (validationRule) {
      return {
        validate: validationRule.fn
      };
    });
    return compositeAndValidationRuleFactory.create(validationRules);
  },
  create: function create(options) {
    var validationRules = this._getValidationRules(options);

    validationRules = this._adaptBackboneValidationRulesToSingleFunction(validationRules);
    return validationRules;
  }
});

module.exports = PresentationFieldsValidationRulesFactory;

});