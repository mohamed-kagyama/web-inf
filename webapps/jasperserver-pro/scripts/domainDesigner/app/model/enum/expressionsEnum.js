define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
module.exports = {
  castFunctions: {
    Boolean: {
      name: 'Boolean'
    },
    Integer: {
      name: 'Integer'
    },
    Decimal: {
      name: 'Decimal'
    },
    Time: {
      name: 'Time'
    },
    Timestamp: {
      name: 'Timestamp'
    },
    Date: {
      name: 'Date'
    }
  },
  functions: {
    // Helpers
    'function': {
      name: 'function'
    },
    functionName: {
      name: 'functionName'
    },
    // functions
    contains: {
      name: 'contains'
    },
    startsWith: {
      name: 'startsWith'
    },
    endsWith: {
      name: 'endsWith'
    },
    isAnyValue: {
      name: 'isAnyValue'
    },
    attribute: {
      name: 'attribute'
    },
    concat: {
      name: 'concat'
    }
  },
  operators: {
    // Boolean
    not: {
      name: 'not',
      expressionString: 'not'
    },
    and: {
      name: 'and',
      expressionString: 'and'
    },
    or: {
      name: "or",
      expressionString: "or"
    },
    // Helpers
    operands: {
      name: 'operands'
    },
    items: {
      name: 'items'
    },
    name: {
      name: 'name'
    },
    range: {
      name: 'range'
    },
    start: {
      name: 'start'
    },
    end: {
      name: 'end'
    },
    boundary: {
      name: 'boundary'
    },
    value: {
      name: 'value'
    },
    paren: {
      name: 'paren'
    },
    // With two operands
    equals: {
      name: 'equals',
      label: i18nMessage('domain.designer.expression.operator.equals'),
      expressionString: '=='
    },
    notEqual: {
      name: 'notEqual',
      label: i18nMessage('domain.designer.expression.operator.notEqual'),
      expressionString: '!='
    },
    greater: {
      name: 'greater',
      label: i18nMessage('domain.designer.expression.operator.greater'),
      expressionString: '>'
    },
    less: {
      name: 'less',
      label: i18nMessage('domain.designer.expression.operator.less'),
      expressionString: '<'
    },
    greaterOrEqual: {
      name: 'greaterOrEqual',
      label: i18nMessage('domain.designer.expression.operator.greaterOrEqual'),
      expressionString: '>='
    },
    lessOrEqual: {
      name: 'lessOrEqual',
      label: i18nMessage('domain.designer.expression.operator.lessOrEqual'),
      expressionString: '<='
    },
    'in': {
      label: i18nMessage('domain.designer.expression.operator.in'),
      name: 'in',
      expressionString: 'in'
    },
    // Constant
    variable: {
      name: 'variable'
    },
    list: {
      name: 'list'
    },
    number: {
      name: 'number'
    },
    string: {
      name: 'string'
    },
    "boolean": {
      name: 'boolean'
    },
    date: {
      name: 'date'
    },
    time: {
      name: 'time'
    },
    timestamp: {
      name: 'timestamp'
    },
    NULL: {
      label: 'NULL',
      name: 'NULL',
      expressionString: 'NULL'
    }
  }
};

});