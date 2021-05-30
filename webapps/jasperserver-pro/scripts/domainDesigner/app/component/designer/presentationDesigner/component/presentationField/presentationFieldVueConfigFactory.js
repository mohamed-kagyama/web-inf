define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var _i18n = require("bundle!DomainDesignerBundle");

var columnSetUtil = require("../../util/columnSetUtil");

var presentationFieldsMeasureOrDimensionOrderedEnum = require("../../../../../model/enum/presentationFieldsMeasureOrDimensionOrderedEnum");

var presentationFieldsAggregationsEnum = require("../../../../../model/enum/presentationFieldsAggregationsEnum");

var treeIconClassEnum = require("../../enum/treeIconClassEnum");

var propertyToPropertyNameEnum = require("../presentationItem/enum/propertyToPropertyNameEnum");

var template = require("text!./template/presentationFieldTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      template: template,
      props: ['presentationField', 'editProperty', 'column0Width', 'column1Width'],
      components: {
        selectPropertyCollapsed: options.selectPropertyCollapsed,
        selectPropertyExpanded: options.selectPropertyExpanded,
        presentationItem: options.presentationItem,
        property: options.property,
        propertyEditor: options.propertyEditor,
        readOnlyProperty: options.readOnlyProperty,
        inputGroup: options.inputGroup,
        cell: options.cell
      },
      computed: {
        i18n: function i18n() {
          return _i18n;
        },
        treeIconClass: function treeIconClass() {
          return treeIconClassEnum[this.presentationField.valueType];
        },
        measureOrDimensionOptions: function measureOrDimensionOptions() {
          var self = this;
          return presentationFieldsMeasureOrDimensionOrderedEnum.map(function (element) {
            return {
              label: element.label,
              value: element.value,
              selected: element.value === self.presentationField.kind
            };
          });
        },
        aggregationOptions: function aggregationOptions() {
          var aggregationOptions = presentationFieldsAggregationsEnum[this.presentationField.valueType],
              value = this.presentationField.aggregation || aggregationOptions.defaults.value;
          return aggregationOptions.available.map(function (element) {
            return {
              label: element.label,
              value: element.value,
              selected: element.value === value
            };
          });
        },
        maskOptions: function maskOptions() {
          var genericTypeToMasksEnum = options.genericTypeToMasksEnum,
              masksForGenericType = genericTypeToMasksEnum[this.presentationField.valueType],
              maskOptions = [],
              maskValue = this.presentationField.mask,
              value;

          if (masksForGenericType && masksForGenericType.available) {
            maskOptions = _.cloneDeep(masksForGenericType.available);
            value = this.presentationField.mask || masksForGenericType.defaults.value;
          }

          if (maskValue) {
            var maskIsAlreadyPresents = _.find(maskOptions, function (option) {
              return maskValue === option.value;
            });

            if (!maskIsAlreadyPresents) {
              maskOptions.push({
                label: maskValue,
                value: maskValue
              });
            }
          }

          return maskOptions.map(function (element) {
            return {
              label: element.label,
              value: element.value,
              selected: element.value === value
            };
          });
        },
        isMaskPresent: function isMaskPresent() {
          return this.maskOptions.length > 0;
        },
        calculationDataName: function calculationDataName() {
          return this.presentationField.isPropertiesEditorExpanded ? options.selectPropertiesExpanded.summaryCalculationSelect : options.selectPropertiesCollapsed.summaryCalculationSelect;
        },
        fieldTypeDataName: function fieldTypeDataName() {
          return this.presentationField.isPropertiesEditorExpanded ? options.selectPropertiesExpanded.fieldTypeSelect : options.selectPropertiesCollapsed.fieldTypeSelect;
        },
        dataFormatDataName: function dataFormatDataName() {
          return this.presentationField.isPropertiesEditorExpanded ? options.selectPropertiesExpanded.dataFormatSelect : options.selectPropertiesCollapsed.dataFormatSelect;
        },
        propertyNames: function propertyNames() {
          return propertyToPropertyNameEnum;
        }
      },
      methods: _.extend({}, columnSetUtil)
    };
  }
};

});