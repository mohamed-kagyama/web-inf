define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DELETE_KEY_CODE = 46;

function isTargetATextInput(target) {
  return target.tagName === 'INPUT' && target.type === 'text';
}

var PresentationDesignerDeleteItemsBySelectionController = function PresentationDesignerDeleteItemsBySelectionController(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerDeleteItemsBySelectionController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    _.bindAll(this, '_onKeyup');

    this.presentationDesignerDeleteDataIslandsBySelectionStrategy = options.presentationDesignerDeleteDataIslandsBySelectionStrategy;
    this.presentationDesignerDeletePresentationItemsBySelectionStrategy = options.presentationDesignerDeletePresentationItemsBySelectionStrategy;
    this.presentationDesignerEventBus = options.presentationDesignerEventBus;
    this.presentationDesignerViewStateModelService = options.presentationDesignerViewStateModelService;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.presentationDesignerEventBus, 'keyup', this._onKeyup);
  },
  _onKeyup: function _onKeyup(event) {
    var isDelKey = event.which === DELETE_KEY_CODE;

    if (isDelKey && !isTargetATextInput(event.target)) {
      this._executeDeleteStrategy();
    }
  },
  _executeDeleteStrategy: function _executeDeleteStrategy() {
    var selectionParentId = this.presentationDesignerViewStateModelService.getPresentationCanvasSelectionParentId();

    if (selectionParentId) {
      this.presentationDesignerDeletePresentationItemsBySelectionStrategy.execute();
    } else {
      this.presentationDesignerDeleteDataIslandsBySelectionStrategy.execute();
    }
  }
});

module.exports = PresentationDesignerDeleteItemsBySelectionController;

});