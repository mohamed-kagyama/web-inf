define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerAddSetController = function PresentationDesignerAddSetController(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerAddSetController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.presentationNewSetFactory = options.presentationNewSetFactory;
    this.store = options.store;
    this.presentationDesignerViewStateModelService = options.presentationDesignerViewStateModelService;
    this.presentationDesignerEventBus = options.presentationDesignerEventBus;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.storeChangeEventBus = options.storeChangeEventBus;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.storeChangeEventBus, 'change', this._onPresentationSetSelection);
    this.listenTo(this.presentationDesignerEventBus, 'addSet', this._addPresentationSet);
  },
  _onPresentationSetSelection: function _onPresentationSetSelection() {
    this.store.set('isAddSetButtonActive', this.presentationDesignerViewStateModelService.canEnableAddPresentationSetButton());
  },
  _addPresentationSet: function _addPresentationSet() {
    var presentationCanvasSelectedItems = this.presentationDesignerViewStateModelService.getPresentationCanvasSelectedItems(),
        parent = _.values(presentationCanvasSelectedItems)[0];

    var presentationSet = this.presentationNewSetFactory.create({
      parentId: parent.id
    });
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_ADD_SET, {
      presentationSet: presentationSet,
      parent: {
        id: parent.id,
        type: parent.type
      }
    });
  }
});

module.exports = PresentationDesignerAddSetController;

});