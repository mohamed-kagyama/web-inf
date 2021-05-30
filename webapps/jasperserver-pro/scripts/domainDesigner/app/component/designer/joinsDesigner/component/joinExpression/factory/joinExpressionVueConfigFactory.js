define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var template = require("text!../template/joinExpressionVueTemplate.htm");

var joinsEnum = require("../../../../../../model/enum/joinsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var joinsDesignerEventBus = options.joinsDesignerEventBus;
    return {
      template: template,
      props: ['joinExpression'],
      computed: {
        operatorOptions: function operatorOptions() {
          return _.map(joinsEnum.joinOperators, function (joinOperator) {
            return {
              label: joinOperator.label,
              value: joinOperator.name
            };
          });
        }
      },
      methods: {
        selectOperator: function selectOperator(operator) {
          joinsDesignerEventBus.trigger('update:joinExpression', {
            id: this.joinExpression.id,
            joinId: this.joinExpression.joinId,
            joinTreeId: this.joinExpression.joinTreeId
          }, {
            operator: operator
          });
        },
        remove: function remove() {
          joinsDesignerEventBus.trigger('remove:joinExpression', {
            id: this.joinExpression.id,
            joinId: this.joinExpression.joinId,
            joinTreeId: this.joinExpression.joinTreeId
          });
        },
        isOperatorSelected: function isOperatorSelected(operator) {
          return this.joinExpression.operator === operator;
        }
      }
    };
  }
};

});