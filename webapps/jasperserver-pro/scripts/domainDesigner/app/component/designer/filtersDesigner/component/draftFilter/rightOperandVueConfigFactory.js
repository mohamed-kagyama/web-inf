define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var template = require("text!./template/rightOperandTemplate.htm");

var operand = require('./operand');

var genericTypes = require("../../../../../../model/schema/enum/genericTypesEnum");

var filterOperandTypeUtil = require("../../util/filterOperandTypeUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var dateTime = [genericTypes.DATE, genericTypes.TIMESTAMP, genericTypes.TIME];
module.exports = {
  create: function create(options) {
    var filterSupportsAlternativeValueEditorSpecification = options.filterSupportsAlternativeValueEditorSpecification;
    return {
      template: template,
      props: ['filter'],
      components: {
        operand: operand,
        fieldValueEditor: options.fieldValueEditor,
        textInputValueEditor: options.textInputValueEditor,
        dateTimeInputValueEditor: options.dateTimeInputValueEditor,
        dateTimeRangeValueEditor: options.dateTimeRangeValueEditor,
        multiSelectValueEditor: options.multiSelectValueEditor,
        rangeValueEditor: options.rangeValueEditor,
        singleSelectValueEditor: options.singleSelectValueEditor,
        actionButtons: options.actionButtons
      },
      computed: {
        isVariable: function isVariable() {
          return filterOperandTypeUtil.isVariable(this.filter.rightOperand.type);
        },
        isText: function isText() {
          var filterSupportsAltEditor = filterSupportsAlternativeValueEditorSpecification.isSatisfiedBy(this.filter);
          var isText = filterSupportsAltEditor ? this.filter.isRawValueEditor : true;
          return filterOperandTypeUtil.isLiteral(this.filter.rightOperand.type) && isText && !this.isDateTime;
        },
        isSingleSelect: function isSingleSelect() {
          return filterOperandTypeUtil.isLiteral(this.filter.rightOperand.type) && filterSupportsAlternativeValueEditorSpecification.isSatisfiedBy(this.filter) && !this.filter.isRawValueEditor && !this.isDateTime;
        },
        isDateTime: function isDateTime() {
          return filterOperandTypeUtil.isLiteral(this.filter.rightOperand.type) && dateTime.indexOf(this.filter.dataType) > -1;
        },
        isRange: function isRange() {
          return filterOperandTypeUtil.isRange(this.filter.rightOperand.type) && !this.isDateTimeRange;
        },
        isDateTimeRange: function isDateTimeRange() {
          return filterOperandTypeUtil.isRange(this.filter.rightOperand.type) && dateTime.indexOf(this.filter.dataType) > -1;
        },
        isList: function isList() {
          return filterOperandTypeUtil.isList(this.filter.rightOperand.type);
        }
      },
      methods: {}
    };
  }
};

});