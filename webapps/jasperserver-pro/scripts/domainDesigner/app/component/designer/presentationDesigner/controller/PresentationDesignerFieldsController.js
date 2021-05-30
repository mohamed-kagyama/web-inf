define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerFieldsController = function PresentationDesignerFieldsController(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerFieldsController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.presentationDesignerEventBus = options.presentationDesignerEventBus;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.presentationDesignerEventBus, 'toggle:presentationFieldPropertiesEditor', this._onTogglePropertiesEditor);
    this.listenTo(this.presentationDesignerEventBus, 'update:presentationField', this._onUpdatePresentationField);
    this.listenTo(this.presentationDesignerEventBus, 'remove:presentationField', this._onRemovePresentationField);
  },
  _onTogglePropertiesEditor: function _onTogglePropertiesEditor(model) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_PRESENTATION_ITEM_EDITOR_EXPANDED_STATE, {
      presentationFieldId: model.id,
      isPropertiesEditorExpanded: !model.isPropertiesEditorExpanded
    });
  },
  _onUpdatePresentationField: function _onUpdatePresentationField(id, properties) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_UPDATE_PRESENTATION_FIELD, {
      id: id,
      json: properties
    });
  },
  _onRemovePresentationField: function _onRemovePresentationField(model) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.PRESENTATION_DESIGNER_REMOVE_PRESENTATION_ITEMS, {
      presentationItems: [{
        id: model.id,
        type: model.modelType
      }],
      parentId: model.parentId
    });
  }
});

module.exports = PresentationDesignerFieldsController;

});