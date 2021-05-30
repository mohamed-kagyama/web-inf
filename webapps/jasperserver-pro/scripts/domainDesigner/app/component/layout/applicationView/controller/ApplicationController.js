define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var canvasViewDesignersEnum = require("../../../../model/enum/canvasViewDesignersEnum");

var uriLocation = require("../../../../util/uriLocation");

var Backbone = require('backbone');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var ApplicationController = function ApplicationController(options) {
  this.initialize(options);
};

_.extend(ApplicationController.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, '_onPageLeave', '_onSessionExpired');

    this.$ = options.$ || $;
    this.window = options.window;
    this.applicationCrossComponentEventBus = options.applicationCrossComponentEventBus;
    this.loginPageUrl = options.loginPageUrl;
    this.storeChangeEventBus = options.storeChangeEventBus;
    this.clientResourcePropertiesService = options.clientResourcePropertiesService;
    this.model = options.model;
    this.expirationManager = options.expirationManager;
    this.historyModel = options.historyModel;

    this._initEvents();

    this._initSessionExpirationManager(options);

    this._setSidebarWidth(options.initialSidebarWidth);
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.storeChangeEventBus, 'change', this._onChangeState);
    this.listenTo(this.applicationCrossComponentEventBus, 'sidebar:resize', this._onResize);
    this.$(this.window).on('beforeunload', this._onPageLeave);
    this.$(this.window).on('sessionExpired', this._onSessionExpired);
  },
  _initSessionExpirationManager: function _initSessionExpirationManager(options) {
    this.expirationManager({
      timeoutWarningDelay: options.timeoutWarningDelay
    });
  },
  _setSidebarWidth: function _setSidebarWidth(width) {
    this.model.set('sidebarWidth', width);
  },
  _setSidebarWidthInPx: function _setSidebarWidthInPx(widthInPx) {
    this._setSidebarWidth(String(widthInPx) + 'px');
  },
  _onResize: function _onResize(width) {
    this._setSidebarWidthInPx(width);
  },
  _onPageLeave: function _onPageLeave() {
    if (this.model.get('isSessionExpired')) {
      return;
    }

    if (this.historyModel.isUndoAvailable() || this.historyModel.isRedoAvailable()) {
      return true;
    }
  },
  _onSessionExpired: function _onSessionExpired() {
    this.model.set('isSessionExpired', true);
    uriLocation.changeLocation(this.loginPageUrl);
  },
  _onChangeState: function _onChangeState(state) {
    this._updateSidebarWidth(state);

    this._updateDomainLabel();
  },
  _updateSidebarWidth: function _updateSidebarWidth(state) {
    var viewState = state.viewState,
        currentDesigner = viewState.getCurrentDesigner(),
        originalSidebarWidth;
    var isSidebarVisible = this.model.get('isSidebarVisible');
    var shouldHideSidebar = currentDesigner === canvasViewDesignersEnum.OPTIONS_DESIGNER || currentDesigner === canvasViewDesignersEnum.SECURITY_DESIGNER;

    if (shouldHideSidebar) {
      if (isSidebarVisible) {
        originalSidebarWidth = this.model.get('sidebarWidth');
        this.model.set({
          isSidebarVisible: false,
          sidebarWidth: '0',
          originalSidebarWidth: originalSidebarWidth
        });
      }
    } else if (!isSidebarVisible) {
      originalSidebarWidth = this.model.get('originalSidebarWidth');
      this.model.set({
        isSidebarVisible: true,
        sidebarWidth: originalSidebarWidth
      });
    }
  },
  _updateDomainLabel: function _updateDomainLabel() {
    var label = this.clientResourcePropertiesService.getDomainLabel() || i18nMessage('domain.designer.new_domain');
    this.model.set('domainLabel', label);
  },
  remove: function remove() {
    this.window.off('beforeunload', this._onPageLeave);
    this.window.off('sessionExpired', this._onSessionExpired);
  }
}, Backbone.Events);

module.exports = ApplicationController;

});