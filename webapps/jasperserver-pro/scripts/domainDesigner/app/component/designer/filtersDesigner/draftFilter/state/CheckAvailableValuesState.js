define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var requestCanceledEnum = require("../../../../../rest/enum/requestCanceledEnum");

var draftFilterStateEnum = require("../enum/draftFilterStateEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var CheckAvailableValuesState = function CheckAvailableValuesState(options) {
  this.availableValuesDataProvider = options.availableValuesDataProvider;
  this.shouldSwitchToRawValueEditorAfterAvailableValuesCheckFailSpecification = options.shouldSwitchToRawValueEditorAfterAvailableValuesCheckFailSpecification;
};

_.extend(CheckAvailableValuesState.prototype, {
  enter: function enter(context, stateFactory) {
    var currentFilter = context.currentFilter;

    var availableValuesCheckFailed = _.bind(this._availableValuesCheckFailed, this, context, stateFactory),
        availableValuesCheckSuccess = _.bind(this._availableValuesCheckSuccess, this, context, stateFactory);

    this._checkAvailableValues(currentFilter).then(availableValuesCheckSuccess, availableValuesCheckFailed);
  },
  _availableValuesCheckSuccess: function _availableValuesCheckSuccess(context, stateFactory, result) {
    context.availableValues = result.data;
    stateFactory.enter(draftFilterStateEnum.GET_RIGHT_OPERAND_DEFAULT_VALUE_STATE, context);
  },
  _checkAvailableValues: function _checkAvailableValues(currentFilter) {
    return this.availableValuesDataProvider.getData({
      limit: 1,
      offset: 0,
      draftFilter: currentFilter
    });
  },
  _availableValuesCheckFailed: function _availableValuesCheckFailed(context, stateFactory, responseStatus) {
    if (this.shouldSwitchToRawValueEditorAfterAvailableValuesCheckFailSpecification.isSatisfiedBy(context.newFilterOptions)) {
      context = _.extend({}, context, {
        newFilterOptions: _.extend({}, context.newFilterOptions, {
          isRawValueEditor: true
        })
      });
    }

    if (responseStatus !== requestCanceledEnum.CANCELED) {
      context.error = i18nMessage('domain.designer.filters.validation.rightOperand.cannotRetrieveAvailableValues');
    }

    stateFactory.enter(draftFilterStateEnum.GET_RIGHT_OPERAND_STATE, context);
  }
});

module.exports = CheckAvailableValuesState;

});