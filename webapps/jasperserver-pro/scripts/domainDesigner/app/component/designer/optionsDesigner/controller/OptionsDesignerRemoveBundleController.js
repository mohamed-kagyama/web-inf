define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var storeChangeEventCallbackExecutorUtil = require("../../../../common/util/storeChangeEventCallbackExecutorUtil");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var Backbone = require('backbone');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var OptionsDesignerRemoveBundleController = function OptionsDesignerRemoveBundleController(options) {
  this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
  this.optionsDesignerEventBus = options.optionsDesignerEventBus;
  this.notification = options.notification;
  this.storeChangeEventBus = options.storeChangeEventBus;

  this._initEvents();
};

_.extend(OptionsDesignerRemoveBundleController.prototype, Backbone.Events, {
  _initEvents: function _initEvents() {
    var executor = storeChangeEventCallbackExecutorUtil.getExecutor(this);
    this.listenTo(this.storeChangeEventBus, 'change', executor);
    this.listenTo(this.optionsDesignerEventBus, 'remove:bundle', this._onRemoveBundle);
  },
  _onRemoveBundle: function _onRemoveBundle(index) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.OPTIONS_DESIGNER_REMOVE_BUNDLE, index);
  },
  'optionsDesigner:removeBundle': function optionsDesignerRemoveBundle() {
    this.notification.show({
      message: i18nMessage('domain.designer.advanced.options.bundleRemoved.notification'),
      type: 'success'
    });
  }
});

module.exports = OptionsDesignerRemoveBundleController;

});