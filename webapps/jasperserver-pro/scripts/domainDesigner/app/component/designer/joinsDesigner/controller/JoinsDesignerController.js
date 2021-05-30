define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerController = function JoinsDesignerController(options) {
  this.initialize(options);
};

_.extend(JoinsDesignerController.prototype, {
  initialize: function initialize(options) {
    this.joinsDesignerEventBus = options.joinsDesignerEventBus;
    this.storeChangeEventBus = options.storeChangeEventBus;
    this.joinsDesignerViewModelToStoreConverter = options.joinsDesignerViewModelToStoreConverter;
    this.joinsDesignerSchemaToViewModelConverter = options.joinsDesignerSchemaToViewModelConverter;
    this.isResourceDroppableFieldSpecification = options.isResourceDroppableFieldSpecification;
    this.notEmptyTablesSpecification = options.notEmptyTablesSpecification;
    this.store = options.store;
    this.cache = options.cache;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.storeChangeEventBus, 'change', this._onChangeState);
    this.listenTo(this.joinsDesignerEventBus, 'canvas:scroll', this._onCanvasScroll);
    this.listenTo(this.joinsDesignerEventBus, 'window:resize', this._onWindowResize);
  },
  _onChangeState: function _onChangeState(state) {
    var viewState = state.viewState,
        currentDesigner = viewState.getCurrentDesigner(),
        currentSidebarResource = viewState.getCurrentResource(currentDesigner),
        isEmptyDataStructure = this.notEmptyTablesSpecification.isSatisfied();
    this.store.set({
      'currentDesigner': currentDesigner,
      'isEmptyDataStructure': isEmptyDataStructure
    });

    if (this._isDesignerVisible()) {
      this.store.set({
        'isInitialDroppableZoneActive': this.isResourceDroppableFieldSpecification.isSatisfiedBy({
          id: currentSidebarResource.resourceId,
          type: currentSidebarResource.type
        })
      });

      this._updateStoreFromState(state);

      this._updateStore();
    }
  },
  _updateStoreFromState: function _updateStoreFromState(state) {
    this.cache.add('collection', this.joinsDesignerSchemaToViewModelConverter.convert(state));
  },
  _updateStore: function _updateStore(options) {
    var updatedStore = this.joinsDesignerViewModelToStoreConverter.convert(_.extend({
      store: this.store,
      collection: this.cache.get('collection') || []
    }, options));
    this.store.set(updatedStore);
  },
  _onCanvasScroll: function _onCanvasScroll(scrollPos) {
    this._updateStore({
      scrollPos: scrollPos
    });
  },
  _onWindowResize: function _onWindowResize(canvasHeight) {
    this._updateStore({
      canvasHeight: canvasHeight
    });
  },
  _isDesignerVisible: function _isDesignerVisible() {
    return this.store.get('currentDesigner') === this.store.get('ownDesigner');
  }
}, Backbone.Events);

module.exports = JoinsDesignerController;

});