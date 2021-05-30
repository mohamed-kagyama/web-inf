define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerController = function PresentationDesignerController(options) {
  _.bindAll(this, '_triggerKeyupEvent');

  this.document = options.document;
  this.storeChangeEventBus = options.storeChangeEventBus;
  this.presentationDesignerEventBus = options.presentationDesignerEventBus;
  this.cache = options.cache;
  this.presentationDesignerStore = options.presentationDesignerStore;
  this.presentationDesignerSchemaToViewModelConverter = options.presentationDesignerSchemaToViewModelConverter;
  this.presentationDesignerViewModelToStoreConverter = options.presentationDesignerViewModelToStoreConverter;
  this.notEmptyFieldsSpecification = options.notEmptyFieldsSpecification;

  this._initEvents();
};

_.extend(PresentationDesignerController.prototype, Backbone.Events, {
  _initEvents: function _initEvents() {
    this.listenTo(this.storeChangeEventBus, 'change', this._onChangeState);
    this.listenTo(this.presentationDesignerEventBus, 'canvas:scroll', this._onCanvasScroll);
    this.listenTo(this.presentationDesignerEventBus, 'window:resize', this._onWindowResize);
    this.listenTo(this.presentationDesignerEventBus, 'canvas:update', this._onCanvasUpdate);
  },
  _onChangeState: function _onChangeState(state) {
    var store = this.presentationDesignerStore;
    var viewState = state.viewState,
        isVisible = viewState.getCurrentDesigner() === store.get('ownDesigner'),
        isEmptyDataStructure = this.notEmptyFieldsSpecification.isSatisfied();
    this.presentationDesignerStore.set({
      'isVisible': isVisible,
      'isEmptyDataStructure': !isEmptyDataStructure
    });

    if (isVisible) {
      this._initKeyupListener();

      this._updateCacheFromState(state);

      this._updateStore();
    } else {
      this._deleteKeyupListener();
    }
  },
  _initKeyupListener: function _initKeyupListener() {
    this._deleteKeyupListener();

    this.document.on('keyup', this._triggerKeyupEvent);
  },
  _deleteKeyupListener: function _deleteKeyupListener() {
    this.document.off('keyup', this._triggerKeyupEvent);
  },
  _triggerKeyupEvent: function _triggerKeyupEvent(event) {
    this.presentationDesignerEventBus.trigger('keyup', event);
  },
  _updateCacheFromState: function _updateCacheFromState(state) {
    var allData = this.presentationDesignerSchemaToViewModelConverter.convert(state);
    this.cache.add('collection', allData);
    this.cache.add('dataStore', state.dataStore);
  },
  _updateStore: function _updateStore(options) {
    var updatedStore = this.presentationDesignerViewModelToStoreConverter.convert(_.extend({
      store: this.presentationDesignerStore,
      collection: this.cache.get('collection') || [],
      dataStore: this.cache.get('dataStore')
    }, options));
    this.presentationDesignerStore.set(updatedStore);
  },
  _onCanvasScroll: function _onCanvasScroll(scrollPos) {
    this._updateStore({
      scrollPos: scrollPos
    });
  },
  _onCanvasUpdate: function _onCanvasUpdate() {
    var height = this.presentationDesignerStore.get('height'),
        isVisible = this.presentationDesignerStore.get('isVisible'),
        canvasHeight = this.presentationDesignerStore.get('canvasHeight'),
        isScrollBarPresent = this.presentationDesignerStore.get('isScrollBarPresent');
    var isScrollBarCurrentlyPresent = height > canvasHeight;

    if (isVisible && isScrollBarPresent !== isScrollBarCurrentlyPresent) {
      this.presentationDesignerStore.set({
        isScrollBarPresent: isScrollBarCurrentlyPresent
      });
    }
  },
  _onWindowResize: function _onWindowResize(canvasHeight, canvasWidth) {
    var isVisible = this.presentationDesignerStore.get('isVisible'),
        height = this.presentationDesignerStore.get('height');

    if (isVisible) {
      this.presentationDesignerStore.set({
        canvasWidth: canvasWidth,
        isScrollBarPresent: height > canvasHeight
      });

      this._updateStore({
        canvasHeight: canvasHeight
      });
    }
  }
});

module.exports = PresentationDesignerController;

});