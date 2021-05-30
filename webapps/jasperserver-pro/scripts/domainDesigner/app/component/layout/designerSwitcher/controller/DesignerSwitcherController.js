define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DesignerSwitcherController = function DesignerSwitcherController(options) {
  this.initialize(options);
};

_.extend(DesignerSwitcherController.prototype, {
  initialize: function initialize(options) {
    this.designerSwitcherStore = options.designerSwitcherStore;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.storeChangeEventBus = options.storeChangeEventBus;
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.designerSwitcherEventBus = options.designerSwitcherEventBus;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.designerSwitcherEventBus, 'designer:select', this._onDesignerSelect);
    this.listenTo(this.storeChangeEventBus, 'change', this._setTab);
  },
  _onDesignerSelect: function _onDesignerSelect(designer) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.DESIGNER_SWITCHER_SET_DESIGNER, designer);
  },
  _setTab: function _setTab(state) {
    this.designerSwitcherStore.set({
      'errorsPresentOnJoinsTab': this._errorsPresentOnJoinsTab(),
      'currentDesigner': state.viewState.getCurrentDesigner()
    });
  },
  _errorsPresentOnJoinsTab: function _errorsPresentOnJoinsTab() {
    return this.clientDomainSchemaService.isJoinTreesConsistOfASingleComponent();
  }
}, Backbone.Events);

module.exports = DesignerSwitcherController;

});