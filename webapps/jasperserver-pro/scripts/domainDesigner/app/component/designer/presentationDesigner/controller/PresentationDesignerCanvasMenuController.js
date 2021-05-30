define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var columnSetEnum = require("../enum/columnSetEnum");

var Backbone = require('backbone');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerCanvasMenuController = function PresentationDesignerCanvasMenuController(options) {
  this.model = options.model;
  this.presentationDesignerEventBus = options.presentationDesignerEventBus;
  this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
  this.presentationDesignerViewStateModelService = options.presentationDesignerViewStateModelService;
  this.storeChangeEventBus = options.storeChangeEventBus;

  this._initEvents();
};

_.extend(PresentationDesignerCanvasMenuController.prototype, Backbone.Events, {
  _initEvents: function _initEvents() {
    this.listenTo(this.storeChangeEventBus, 'change', this._onStoreChange);
    this.listenTo(this.presentationDesignerEventBus, 'select:defaultColumnSet', this._useDefaultColumnSet);
    this.listenTo(this.presentationDesignerEventBus, 'select:identificationColumnSet', this._useIdentificationColumnSet);
    this.listenTo(this.presentationDesignerEventBus, 'select:bundleKeysColumnSet', this._useBundleKeysColumnSet);
    this.listenTo(this.presentationDesignerEventBus, 'select:dataColumnSet', this._useDataColumnSet);
    this.listenTo(this.presentationDesignerEventBus, 'select:expandAllProperties', this._expandAllProperties);
    this.listenTo(this.presentationDesignerEventBus, 'select:collapseAllProperties', this._collapseAllProperties);
  },
  _onStoreChange: function _onStoreChange() {
    var columnSet = this.presentationDesignerViewStateModelService.getPresentationDesignerColumnSet();
    this.model.set('columnSet', columnSet);
  },
  _useDefaultColumnSet: function _useDefaultColumnSet() {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_CHANGE_COLUMN_SET, columnSetEnum.DEFAULT);
  },
  _useIdentificationColumnSet: function _useIdentificationColumnSet() {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_CHANGE_COLUMN_SET, columnSetEnum.IDENTIFICATION);
  },
  _useBundleKeysColumnSet: function _useBundleKeysColumnSet() {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_CHANGE_COLUMN_SET, columnSetEnum.BUNDLE_KEYS);
  },
  _useDataColumnSet: function _useDataColumnSet() {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_CHANGE_COLUMN_SET, columnSetEnum.DATA);
  },
  _expandAllProperties: function _expandAllProperties() {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_EXPAND_ALL_PRESENTATION_ITEMS);
  },
  _collapseAllProperties: function _collapseAllProperties() {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_COLLAPSE_ALL_PRESENTATION_ITEMS);
  }
});

module.exports = PresentationDesignerCanvasMenuController;

});