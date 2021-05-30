define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var moveEnum = require("../enum/movePresentationItemsPositionEnum");

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var MovePresentationItemsController = function MovePresentationItemsController(options) {
  this.initialize(options);
};

_.extend(MovePresentationItemsController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.store = options.store;
    this.storeChangeEventBus = options.storeChangeEventBus;
    this.presentationDesignerEventBus = options.presentationDesignerEventBus;
    this.movePresentationItemsEventNameFactory = options.movePresentationItemsEventNameFactory;
    this.movePresentationItemsEventOptionsFactory = options.movePresentationItemsEventOptionsFactory;
    this.presentationDesignerViewStateModelService = options.presentationDesignerViewStateModelService;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.storeChangeEventBus, 'change', this._onStoreChange);
    this.listenTo(this.presentationDesignerEventBus, 'movePresentationSetClick', this._movePresentationSetClick);
  },
  _onStoreChange: function _onStoreChange() {
    var enabledButtons = this.presentationDesignerViewStateModelService.getEnabledButtonsForPresentationMoving();
    this.store.set('moveButtonsStatus', {
      topButtonEnabled: enabledButtons[moveEnum.MOVE_TOP],
      upButtonEnabled: enabledButtons[moveEnum.MOVE_UP],
      downButtonEnabled: enabledButtons[moveEnum.MOVE_DOWN],
      bottomButtonEnabled: enabledButtons[moveEnum.MOVE_BOTTOM]
    });
  },
  _movePresentationSetClick: function _movePresentationSetClick(action) {
    var event = this.movePresentationItemsEventNameFactory.create(action);
    var eventOptions = this.movePresentationItemsEventOptionsFactory.create(action);
    this.applicationDispatcherEventBus.trigger(event, eventOptions);
  }
});

module.exports = MovePresentationItemsController;

});