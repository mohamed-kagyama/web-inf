define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var filterTypeUtil = require("../util/filterTypeUtil");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var DraftFilterOptionsMenuOptionsFactory = function DraftFilterOptionsMenuOptionsFactory(options) {
  this.initialize(options);
};

_.extend(DraftFilterOptionsMenuOptionsFactory.prototype, {
  initialize: function initialize(options) {
    this.filterSupportsAlternativeValueEditorSpecification = options.filterSupportsAlternativeValueEditorSpecification;
    this.filterSupportsSwapOptionSpecification = options.filterSupportsSwapOptionSpecification;
    this.filterSupportsFieldToValueEditorSpecification = options.filterSupportsFieldToValueEditorSpecification;
  },
  create: function create(filter) {
    var isRawValueEditor = Boolean(filter.isRawValueEditor),
        isFieldToFieldValueEditor = filterTypeUtil.isFieldToFieldFilter(filter.leftOperand.type, filter.rightOperand.type),
        isFieldToValueValueEditor = !isFieldToFieldValueEditor;
    var options = [];

    if (this.filterSupportsFieldToValueEditorSpecification.isSatisfiedBy(filter)) {
      options.push({
        action: 'fieldToValue',
        value: isFieldToValueValueEditor,
        triggerEvent: 'draftFilter:valueEditor:fieldToValue',
        label: i18nMessage('domain.designer.filters.draftState.optionsMenu.fieldToValueComparison')
      });
    }

    options.push({
      action: 'fieldToField',
      value: isFieldToFieldValueEditor,
      triggerEvent: 'draftFilter:valueEditor:fieldToField',
      label: i18nMessage('domain.designer.filters.draftState.optionsMenu.fieldToFieldComparison')
    });

    if (isFieldToValueValueEditor) {
      options = this._getFieldToValueEditorOptions({
        isRawValueEditor: isRawValueEditor,
        filter: filter,
        options: options
      });
    }

    if (this.filterSupportsSwapOptionSpecification.isSatisfiedBy(filter)) {
      options = this._getFieldToFieldEditorOptions({
        options: options
      });
    }

    return options;
  },
  _getFieldToValueEditorOptions: function _getFieldToValueEditorOptions(options) {
    var filter = options.filter,
        menuOptions = options.options,
        isRawValueEditor = options.isRawValueEditor;
    var isFilterSupportsAlternativeValueEditor = this.filterSupportsAlternativeValueEditorSpecification.isSatisfiedBy(filter);

    if (isFilterSupportsAlternativeValueEditor) {
      menuOptions = menuOptions.concat([{
        value: false,
        label: '',
        cssClass: 'separator'
      }, {
        action: 'singleSelect',
        value: !isRawValueEditor,
        triggerEvent: 'draftFilter:valueEditor:singleSelect',
        label: i18nMessage('domain.designer.filters.draftState.optionsMenu.selectFromAvailableValues')
      }, {
        action: 'input',
        value: isRawValueEditor,
        triggerEvent: 'draftFilter:valueEditor:input',
        label: i18nMessage('domain.designer.filters.draftState.optionsMenu.enterRawValue')
      }]);
    }

    return menuOptions;
  },
  _getFieldToFieldEditorOptions: function _getFieldToFieldEditorOptions(options) {
    var menuOptions = options.options;
    menuOptions = menuOptions.concat([{
      value: false,
      label: '',
      cssClass: 'separator'
    }, {
      action: 'swap',
      value: false,
      triggerEvent: 'draftFilter:variables:swap',
      label: i18nMessage('domain.designer.filters.draftState.optionsMenu.swapFields')
    }]);
    return menuOptions;
  }
});

module.exports = DraftFilterOptionsMenuOptionsFactory;

});