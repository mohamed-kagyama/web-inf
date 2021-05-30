define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerSetsController = function PresentationDesignerSetsController(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerSetsController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.presentationDesignerEventBus = options.presentationDesignerEventBus;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.presentationDesignerEventBus, 'toggle:presentationSet', this._onTogglePresentationSet);
    this.listenTo(this.presentationDesignerEventBus, 'toggle:presentationSetPropertiesEditor', this._onTogglePropertiesEditor);
    this.listenTo(this.presentationDesignerEventBus, 'remove:presentationSet', this._onRemovePresentationSet);
  },
  _onTogglePresentationSet: function _onTogglePresentationSet(model) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_PRESENTATION_SET_EXPANDED_STATE, {
      presentationSetId: model.id,
      isExpanded: !model.isExpanded
    });
  },
  _onTogglePropertiesEditor: function _onTogglePropertiesEditor(model) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_PRESENTATION_SET_EDITOR_EXPANDED_STATE, {
      presentationSetId: model.id,
      isPropertiesEditorExpanded: !model.isPropertiesEditorExpanded
    });
  },
  _onRemovePresentationSet: function _onRemovePresentationSet(model) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_REMOVE_PRESENTATION_ITEMS, {
      presentationItems: [{
        id: model.id,
        type: model.modelType
      }],
      parentId: model.parentId
    });
  }
});

module.exports = PresentationDesignerSetsController;

});