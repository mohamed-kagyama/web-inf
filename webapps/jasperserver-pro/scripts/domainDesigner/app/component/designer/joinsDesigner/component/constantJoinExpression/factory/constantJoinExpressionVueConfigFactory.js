define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var template = require("text!../template/constantJoinExpressionVueTemplate.htm");

var constantJoinExpressionOperatorsEnum = require("../../../enum/constantJoinExpressionOperatorsEnum");

var fieldTypesToGenericTypesEnum = require("../../../../../../../model/schema/enum/fieldTypesToGenericTypesEnum");

var availableOperatorsByOperator = require("../../../enum/availableOperatorsByOperator");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var joinsDesignerEventBus = options.joinsDesignerEventBus,
        hoverMenuDirective = options.hoverMenuDirective,
        constantJoinExpressionMenuOptionsFactory = options.constantJoinExpressionMenuOptionsFactory;
    return {
      template: template,
      props: ['constantJoinExpression'],
      directives: {
        hoverMenu: hoverMenuDirective
      },
      computed: {
        operatorOptions: function operatorOptions() {
          var operatorOptions,
              fieldType = this.constantJoinExpression.fieldType,
              operator = this.constantJoinExpression.operator;

          if (!fieldType || !operator) {
            return [];
          }

          var genericFieldType = fieldTypesToGenericTypesEnum[fieldType],
              operatorsByOperator = _.keys(availableOperatorsByOperator[operator]),
              allOperatorsByFieldType = constantJoinExpressionOperatorsEnum[genericFieldType];

          operatorOptions = _.filter(allOperatorsByFieldType, function (operator) {
            return _.indexOf(operatorsByOperator, operator.name) > -1;
          });
          return _.map(operatorOptions, function (operator) {
            return {
              label: operator.label,
              value: operator.name
            };
          });
        },
        constantJoinExpressionMenuOptions: function constantJoinExpressionMenuOptions() {
          return constantJoinExpressionMenuOptionsFactory.create({
            constantJoinExpression: _.cloneDeep(this.constantJoinExpression)
          });
        }
      },
      methods: {
        selectOperator: function selectOperator(operator) {
          joinsDesignerEventBus.trigger('update:constantJoinExpression', {
            id: this.constantJoinExpression.id,
            joinId: this.constantJoinExpression.joinId,
            joinTreeId: this.constantJoinExpression.joinTreeId
          }, {
            operator: operator
          });
        },
        remove: function remove() {
          joinsDesignerEventBus.trigger('remove:constantJoinExpression', {
            id: this.constantJoinExpression.id,
            joinTreeId: this.constantJoinExpression.joinTreeId
          });
        },
        isOperatorSelected: function isOperatorSelected(operator) {
          return this.constantJoinExpression.operator === operator;
        }
      }
    };
  }
};

});