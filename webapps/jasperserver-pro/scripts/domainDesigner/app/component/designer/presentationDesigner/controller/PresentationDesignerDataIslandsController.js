define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerDataIslandsController = function PresentationDesignerDataIslandsController(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerDataIslandsController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.presentationDesignerEventBus = options.presentationDesignerEventBus;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.presentationDesignerEventBus, 'toggle:dataIsland', this._onToggleDataIsland);
    this.listenTo(this.presentationDesignerEventBus, 'toggle:dataIslandPropertiesEditor', this._onTogglePropertiesEditor);
    this.listenTo(this.presentationDesignerEventBus, 'remove:dataIsland', this._onRemoveDataIsland);
  },
  _onToggleDataIsland: function _onToggleDataIsland(model) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_DATA_ISLAND_EXPANDED_STATE, {
      dataIslandId: model.id,
      isExpanded: !model.isExpanded
    });
  },
  _onTogglePropertiesEditor: function _onTogglePropertiesEditor(model) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_DATA_ISLAND_EDITOR_EXPANDED_STATE, {
      dataIslandId: model.id,
      isPropertiesEditorExpanded: !model.isPropertiesEditorExpanded
    });
  },
  _onRemoveDataIsland: function _onRemoveDataIsland(model) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_REMOVE_DATA_ISLANDS, [model.id]);
  }
});

module.exports = PresentationDesignerDataIslandsController;

});