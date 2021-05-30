define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var filterDataTypes = require('../enum/filterDataTypes');

var filterOperators = require('../enum/filterOperators');

var ListValueEditorAdapter = require('../valueEditor/ListValueEditorAdapter');

var MultiSelectValueEditorAdapter = require('../valueEditor/MultiSelectValueEditorAdapter');

var MultiSelectWithTrueAllValueEditorAdapter = require('../valueEditor/MultiSelectWithTrueAllValueEditorAdapter');

var InputValueEditor = require('../valueEditor/InputValueEditor');

var NumericRangeValueEditor = require('../valueEditor/NumericRangeValueEditor');

var NumericValueEditor = require('../valueEditor/NumericValueEditor');

var BooleanSelectValueEditor = require('../valueEditor/BooleanSelectEditor');

var BooleanMultiSelectValueEditor = require('../valueEditor/BooleanMultiSelectEditor');

var DateInputValueEditor = require('../valueEditor/DateValueEditor');

var DateRangeInputValueEditor = require('../valueEditor/DateRangeValueEditor');

var inputRangeValueEditorTemplate = require("text!../valueEditor/template/inputRangeValueEditorTemplate.htm");

var inputValueEditorTemplate = require("text!../valueEditor/template/inputValueEditorTemplate.htm");

var booleanSelectEditorTemplate = require("text!../valueEditor/template/booleanSelectEditorTemplate.htm");

var dateRangeValueEditorTemplate = require("text!../valueEditor/template/dateRangeValueEditorTemplate.htm");

var dateValueEditorTemplate = require("text!../valueEditor/template/dateValueEditorTemplate.htm");

var i18n = require("bundle!AdHocFiltersBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var multiSelectWithTrueAllValueEditorFactory = {
  createInstance: function createInstance(model) {
    return new this.constructor({
      model: model
    });
  },
  constructor: MultiSelectWithTrueAllValueEditorAdapter
};
var multiSelectValueEditorFactory = {
  createInstance: function createInstance(model) {
    return new this.constructor({
      model: model
    });
  },
  constructor: MultiSelectValueEditorAdapter
};
var singleSelectValueEditorFactory = {
  createInstance: function createInstance(model) {
    return new this.constructor({
      model: model
    });
  },
  constructor: ListValueEditorAdapter
};
var stringInputValueEditorFactory = {
  createInstance: function createInstance(model) {
    return new this.constructor({
      template: inputValueEditorTemplate,
      model: model,
      i18n: i18n
    });
  },
  constructor: InputValueEditor
};
var booleanMultiSelectValueEditorFactory = {
  createInstance: function createInstance(model) {
    return new this.constructor({
      template: booleanSelectEditorTemplate,
      model: model,
      i18n: i18n
    });
  },
  constructor: BooleanMultiSelectValueEditor
};
var booleanSingleSelectValueEditorFactory = {
  createInstance: function createInstance(model) {
    return new this.constructor({
      template: booleanSelectEditorTemplate,
      model: model,
      i18n: i18n
    });
  },
  constructor: BooleanSelectValueEditor
};
var numericRangeValueEditorFactory = {
  createInstance: function createInstance(model) {
    return new this.constructor({
      template: inputRangeValueEditorTemplate,
      model: model,
      i18n: i18n
    });
  },
  constructor: NumericRangeValueEditor
};
var numericInputValueEditorFactory = {
  createInstance: function createInstance(model) {
    return new this.constructor({
      template: inputValueEditorTemplate,
      model: model,
      i18n: i18n
    });
  },
  constructor: NumericValueEditor
};
var dateInputValueEditorFactory = {
  createInstance: function createInstance(model) {
    return new this.constructor({
      template: dateValueEditorTemplate,
      model: model,
      pickerType: 'date',
      i18n: i18n
    });
  },
  constructor: DateInputValueEditor
};
var dateRangeValueEditorFactory = {
  createInstance: function createInstance(model) {
    return new this.constructor({
      template: dateRangeValueEditorTemplate,
      model: model,
      pickerType: 'date',
      i18n: i18n
    });
  },
  constructor: DateRangeInputValueEditor
};
var timeInputValueEditorFactory = {
  createInstance: function createInstance(model) {
    return new this.constructor({
      template: dateValueEditorTemplate,
      model: model,
      pickerType: 'time',
      i18n: i18n
    });
  },
  constructor: DateInputValueEditor
};
var timeRangeValueEditorFactory = {
  createInstance: function createInstance(model) {
    return new this.constructor({
      template: dateRangeValueEditorTemplate,
      model: model,
      pickerType: 'time',
      i18n: i18n
    });
  },
  constructor: DateRangeInputValueEditor
};
var timestampInputValueEditorFactory = {
  createInstance: function createInstance(model) {
    return new this.constructor({
      template: dateValueEditorTemplate,
      model: model,
      pickerType: 'datetime',
      i18n: i18n
    });
  },
  constructor: DateInputValueEditor
};
var timestampRangeValueEditorFactory = {
  createInstance: function createInstance(model) {
    return new this.constructor({
      template: dateRangeValueEditorTemplate,
      model: model,
      pickerType: 'datetime',
      i18n: i18n
    });
  },
  constructor: DateRangeInputValueEditor
};
var valueEditorMapping = {};
valueEditorMapping[filterDataTypes.STRING] = {};
valueEditorMapping[filterDataTypes.STRING][filterOperators.IN] = multiSelectWithTrueAllValueEditorFactory;
valueEditorMapping[filterDataTypes.STRING][filterOperators.NOT_IN] = multiSelectValueEditorFactory;
valueEditorMapping[filterDataTypes.STRING][filterOperators.EQUALS] = singleSelectValueEditorFactory;
valueEditorMapping[filterDataTypes.STRING][filterOperators.NOT_EQUAL] = singleSelectValueEditorFactory;
valueEditorMapping[filterDataTypes.STRING][filterOperators.CONTAINS] = stringInputValueEditorFactory;
valueEditorMapping[filterDataTypes.STRING][filterOperators.NOT_CONTAINS] = stringInputValueEditorFactory;
valueEditorMapping[filterDataTypes.STRING][filterOperators.STARTS_WITH] = stringInputValueEditorFactory;
valueEditorMapping[filterDataTypes.STRING][filterOperators.NOT_STARTS_WITH] = stringInputValueEditorFactory;
valueEditorMapping[filterDataTypes.STRING][filterOperators.ENDS_WITH] = stringInputValueEditorFactory;
valueEditorMapping[filterDataTypes.STRING][filterOperators.NOT_ENDS_WITH] = stringInputValueEditorFactory;
valueEditorMapping[filterDataTypes.BOOLEAN] = {};
valueEditorMapping[filterDataTypes.BOOLEAN][filterOperators.IN] = booleanMultiSelectValueEditorFactory;
valueEditorMapping[filterDataTypes.BOOLEAN][filterOperators.NOT_IN] = booleanMultiSelectValueEditorFactory;
valueEditorMapping[filterDataTypes.BOOLEAN][filterOperators.EQUALS] = booleanSingleSelectValueEditorFactory;
valueEditorMapping[filterDataTypes.BOOLEAN][filterOperators.NOT_EQUAL] = booleanSingleSelectValueEditorFactory;
valueEditorMapping[filterDataTypes.NUMERIC] = {};
valueEditorMapping[filterDataTypes.NUMERIC][filterOperators.IN] = multiSelectWithTrueAllValueEditorFactory;
valueEditorMapping[filterDataTypes.NUMERIC][filterOperators.NOT_IN] = multiSelectValueEditorFactory;
valueEditorMapping[filterDataTypes.NUMERIC][filterOperators.EQUALS] = numericInputValueEditorFactory;
valueEditorMapping[filterDataTypes.NUMERIC][filterOperators.NOT_EQUAL] = numericInputValueEditorFactory;
valueEditorMapping[filterDataTypes.NUMERIC][filterOperators.GREATER] = numericInputValueEditorFactory;
valueEditorMapping[filterDataTypes.NUMERIC][filterOperators.LESS] = numericInputValueEditorFactory;
valueEditorMapping[filterDataTypes.NUMERIC][filterOperators.GREATER_OR_EQUAL] = numericInputValueEditorFactory;
valueEditorMapping[filterDataTypes.NUMERIC][filterOperators.LESS_OR_EQUAL] = numericInputValueEditorFactory;
valueEditorMapping[filterDataTypes.NUMERIC][filterOperators.BETWEEN] = numericRangeValueEditorFactory;
valueEditorMapping[filterDataTypes.NUMERIC][filterOperators.NOT_BETWEEN] = numericRangeValueEditorFactory;
valueEditorMapping[filterDataTypes.LONG] = {};

_.extend(valueEditorMapping[filterDataTypes.LONG], valueEditorMapping[filterDataTypes.NUMERIC]);

valueEditorMapping[filterDataTypes.INTEGER] = {};

_.extend(valueEditorMapping[filterDataTypes.INTEGER], valueEditorMapping[filterDataTypes.NUMERIC]);

valueEditorMapping[filterDataTypes.DECIMAL] = {};

_.extend(valueEditorMapping[filterDataTypes.DECIMAL], valueEditorMapping[filterDataTypes.NUMERIC]);

valueEditorMapping[filterDataTypes.DATE] = {};
valueEditorMapping[filterDataTypes.DATE][filterOperators.EQUALS] = dateInputValueEditorFactory;
valueEditorMapping[filterDataTypes.DATE][filterOperators.NOT_EQUAL] = dateInputValueEditorFactory;
valueEditorMapping[filterDataTypes.DATE][filterOperators.GREATER] = dateInputValueEditorFactory;
valueEditorMapping[filterDataTypes.DATE][filterOperators.LESS] = dateInputValueEditorFactory;
valueEditorMapping[filterDataTypes.DATE][filterOperators.GREATER_OR_EQUAL] = dateInputValueEditorFactory;
valueEditorMapping[filterDataTypes.DATE][filterOperators.LESS_OR_EQUAL] = dateInputValueEditorFactory;
valueEditorMapping[filterDataTypes.DATE][filterOperators.BETWEEN_DATES] = dateRangeValueEditorFactory;
valueEditorMapping[filterDataTypes.DATE][filterOperators.NOT_BETWEEN_DATES] = dateRangeValueEditorFactory;
valueEditorMapping[filterDataTypes.TIME] = {};
valueEditorMapping[filterDataTypes.TIME][filterOperators.EQUALS] = timeInputValueEditorFactory;
valueEditorMapping[filterDataTypes.TIME][filterOperators.NOT_EQUAL] = timeInputValueEditorFactory;
valueEditorMapping[filterDataTypes.TIME][filterOperators.GREATER] = timeInputValueEditorFactory;
valueEditorMapping[filterDataTypes.TIME][filterOperators.LESS] = timeInputValueEditorFactory;
valueEditorMapping[filterDataTypes.TIME][filterOperators.GREATER_OR_EQUAL] = timeInputValueEditorFactory;
valueEditorMapping[filterDataTypes.TIME][filterOperators.LESS_OR_EQUAL] = timeInputValueEditorFactory;
valueEditorMapping[filterDataTypes.TIME][filterOperators.BETWEEN] = timeRangeValueEditorFactory;
valueEditorMapping[filterDataTypes.TIME][filterOperators.NOT_BETWEEN] = timeRangeValueEditorFactory;
valueEditorMapping[filterDataTypes.TIMESTAMP] = {};
valueEditorMapping[filterDataTypes.TIMESTAMP][filterOperators.EQUALS] = timestampInputValueEditorFactory;
valueEditorMapping[filterDataTypes.TIMESTAMP][filterOperators.NOT_EQUAL] = timestampInputValueEditorFactory;
valueEditorMapping[filterDataTypes.TIMESTAMP][filterOperators.GREATER] = timestampInputValueEditorFactory;
valueEditorMapping[filterDataTypes.TIMESTAMP][filterOperators.LESS] = timestampInputValueEditorFactory;
valueEditorMapping[filterDataTypes.TIMESTAMP][filterOperators.GREATER_OR_EQUAL] = timestampInputValueEditorFactory;
valueEditorMapping[filterDataTypes.TIMESTAMP][filterOperators.LESS_OR_EQUAL] = timestampInputValueEditorFactory;
valueEditorMapping[filterDataTypes.TIMESTAMP][filterOperators.BETWEEN_DATES] = timestampRangeValueEditorFactory;
valueEditorMapping[filterDataTypes.TIMESTAMP][filterOperators.NOT_BETWEEN_DATES] = timestampRangeValueEditorFactory;
var olapValueEditorMapping = {};
olapValueEditorMapping[filterOperators.IN] = multiSelectValueEditorFactory;
olapValueEditorMapping[filterOperators.NOT_IN] = multiSelectValueEditorFactory;
olapValueEditorMapping[filterOperators.EQUALS] = singleSelectValueEditorFactory;
olapValueEditorMapping[filterOperators.NOT_EQUAL] = singleSelectValueEditorFactory;

module.exports = function (dataType, operator, isOlap) {
  if (isOlap) {
    if (olapValueEditorMapping.hasOwnProperty(operator)) {
      return olapValueEditorMapping[operator];
    }

    return undefined;
  } else {
    if (valueEditorMapping.hasOwnProperty(dataType) && valueEditorMapping[dataType].hasOwnProperty(operator)) {
      return valueEditorMapping[dataType][operator];
    }

    return undefined;
  }
};

});