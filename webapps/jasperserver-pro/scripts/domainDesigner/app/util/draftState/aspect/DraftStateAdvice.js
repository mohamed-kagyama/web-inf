define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var applicationStateEventsEnum = require("../../../dispatcher/enum/applicationStateEventsEnum");

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DraftStateAdvice = function DraftStateAdvice(options) {
  this._initialize(options);
};

_.extend(DraftStateAdvice.prototype, {
  _initialize: function _initialize(options) {
    _.bindAll(this, 'intercept');

    this.viewStateModelService = options.viewStateModelService;
    this.draftStateEventBus = options.draftStateEventBus;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.draftStateEventBus, 'allowActionExecution', this._onActionExecutionAllowed);
  },
  intercept: function intercept(options) {
    var invokeAction = this._bindActionWithParams(options.invocation, options.args);

    var optionsForInterceptionCheck = {
      actionName: options.actionName,
      blackList: options.blackList,
      whiteList: options.whiteList
    };

    if (this._shouldInterceptAction(optionsForInterceptionCheck)) {
      var optionsForInterception = _.extend({}, optionsForInterceptionCheck, {
        invokeAction: invokeAction
      });

      this._interceptAction(optionsForInterception);
    } else {
      invokeAction();
    }
  },
  _hasDraftState: function _hasDraftState(draftState) {
    var result = _.reduce(draftState, function (memo, value, key) {
      if (value && !_.isEmpty(value)) {
        memo[key] = true;
      }

      return memo;
    }, {});

    return _.isEmpty(result) ? false : result;
  },
  _shouldInterceptAction: function _shouldInterceptAction(options) {
    var actionName = options.actionName,
        blackList = options.blackList,
        whiteList = options.whiteList;
    var draftState = this.viewStateModelService.getDraftState();

    var hasDraftState = this._hasDraftState(draftState);

    if (!hasDraftState) {
      return false;
    }

    if (whiteList) {
      var whiteListedDraftStateTypes = whiteList[actionName];

      if (whiteListedDraftStateTypes) {
        return !_.isEmpty(_.pick(hasDraftState, whiteListedDraftStateTypes));
      } else {
        return false;
      }
    } else if (blackList) {
      var blackListedDraftStateTypes = blackList[actionName];

      if (blackListedDraftStateTypes) {
        return !_.isEmpty(_.omit(hasDraftState, blackListedDraftStateTypes));
      } else {
        return true;
      }
    } else {
      return _.isEmpty(hasDraftState);
    }
  },
  _bindActionWithParams: function _bindActionWithParams(invocation, args) {
    return function () {
      return invocation.apply(null, args);
    };
  },
  _getDraftStateTypesForActionInterceptionBasedOnBlackList: function _getDraftStateTypesForActionInterceptionBasedOnBlackList(actionName, blackList) {
    var blackListedDraftStateTypes = blackList[actionName];
    var draftState = this.viewStateModelService.getDraftState();
    return _.chain(draftState).omit(draftState, blackListedDraftStateTypes).keys().value();
  },
  _getDraftStateTypesForActionInterceptionBasedOnWhiteList: function _getDraftStateTypesForActionInterceptionBasedOnWhiteList(actionName, whiteList) {
    var whiteListedDraftStateTypes = whiteList[actionName];
    var draftState = this.viewStateModelService.getDraftState();
    return _.chain(draftState).pick(draftState, whiteListedDraftStateTypes).keys().value();
  },
  _getDraftStateTypesForActionInterception: function _getDraftStateTypesForActionInterception() {
    var draftState = this.viewStateModelService.getDraftState();
    return _.keys(draftState);
  },
  _interceptAction: function _interceptAction(options) {
    var invokeAction = options.invokeAction,
        actionName = options.actionName,
        blackList = options.blackList,
        whiteList = options.whiteList;
    var draftStateTypes;

    if (whiteList) {
      draftStateTypes = this._getDraftStateTypesForActionInterceptionBasedOnWhiteList(actionName, whiteList);
    } else if (blackList) {
      draftStateTypes = this._getDraftStateTypesForActionInterceptionBasedOnBlackList(actionName, blackList);
    } else {
      draftStateTypes = this._getDraftStateTypesForActionInterception();
    }

    this.draftStateEventBus.trigger('dispatcherActionIntercepted', {
      invokeAction: invokeAction,
      draftStateTypes: draftStateTypes
    });
  },
  _onActionExecutionAllowed: function _onActionExecutionAllowed(options) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.CLEAR_DRAFT_STATE, options.draftStateTypes);
    options.invokeAction();
  }
});

_.extend(DraftStateAdvice.prototype, Backbone.Events);

module.exports = DraftStateAdvice;

});