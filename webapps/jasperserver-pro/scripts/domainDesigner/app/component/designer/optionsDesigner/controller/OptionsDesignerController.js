define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var OptionsDesignerController = function OptionsDesignerController(options) {
  this.storeChangeEventBus = options.storeChangeEventBus;
  this.optionsDesignerStore = options.optionsDesignerStore;
  this.optionsDesignerResourcePropertiesToStoreConverter = options.optionsDesignerResourcePropertiesToStoreConverter;

  this._initEvents();
};

_.extend(OptionsDesignerController.prototype, Backbone.Events, {
  _initEvents: function _initEvents() {
    this.listenTo(this.storeChangeEventBus, 'change', this._onChangeState);
  },
  _onChangeState: function _onChangeState(state) {
    var viewState = state.viewState;
    this.optionsDesignerStore.set({
      'currentDesigner': viewState.getCurrentDesigner()
    });

    if (this._isDesignerVisible()) {
      this._updateStoreFromState(state);
    }
  },
  _isDesignerVisible: function _isDesignerVisible() {
    var store = this.optionsDesignerStore;
    return store.get('currentDesigner') === store.get('ownDesigner');
  },
  _updateStoreFromState: function _updateStoreFromState(state) {
    var viewState = this.optionsDesignerResourcePropertiesToStoreConverter.convert(state);
    this.optionsDesignerStore.set(viewState);
  }
});

module.exports = OptionsDesignerController;

});