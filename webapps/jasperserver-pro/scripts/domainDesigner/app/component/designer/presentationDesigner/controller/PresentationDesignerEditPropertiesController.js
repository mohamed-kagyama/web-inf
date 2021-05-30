define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

var Backbone = require('backbone');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var MODEL_TYPE_TO_EVENT_MAP = {};
MODEL_TYPE_TO_EVENT_MAP[schemaEntitiesEnum.DATA_ISLAND] = applicationStateEventsEnum.PRESENTATION_DESIGNER_UPDATE_DATA_ISLAND;
MODEL_TYPE_TO_EVENT_MAP[schemaEntitiesEnum.PRESENTATION_FIELD] = applicationStateEventsEnum.PRESENTATION_DESIGNER_UPDATE_PRESENTATION_FIELD;
MODEL_TYPE_TO_EVENT_MAP[schemaEntitiesEnum.PRESENTATION_SET] = applicationStateEventsEnum.PRESENTATION_DESIGNER_UPDATE_PRESENTATION_SET;

var PresentationDesignerEditPropertiesController = function PresentationDesignerEditPropertiesController(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerEditPropertiesController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.store = options.store;
    this.storeChangeEventBus = options.storeChangeEventBus;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.presentationDesignerEventBus = options.presentationDesignerEventBus;
    this.validationRulesFactory = options.validationRulesFactory;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.storeChangeEventBus, "change", this._onChange);
    this.listenTo(this.presentationDesignerEventBus, "edit:property", this._onEditProperty);
    this.listenTo(this.presentationDesignerEventBus, "edit:enter:property", this._onEnterProperty);
    this.listenTo(this.presentationDesignerEventBus, "edit:input:property", this._onInputProperty);
    this.listenTo(this.presentationDesignerEventBus, "edit:esc:property", this._onEscProperty);
    this.listenTo(this.presentationDesignerEventBus, "edit:blur:property", this._onBlurProperty);
  },
  _onChange: function _onChange() {
    var editProperty = this.store.get("editProperty");

    if (!editProperty.doNotClearOnChange) {
      this._clearEditProperty();
    } else {
      delete editProperty.doNotClearOnChange;
      this.store.set("editProperty", editProperty);
    }
  },
  _onEditProperty: function _onEditProperty(options) {
    var id = options.item.id,
        value = options.value;
    var validator = this.validationRulesFactory.create({
      property: options.propertyName,
      modelType: options.item.modelType,
      id: id
    });
    var editProperty = {
      item: _.cloneDeep(options.item),
      propertyName: options.propertyName,
      value: value,
      validator: validator,
      errorMessage: validator.validate(value)
    };
    editProperty = this._updateForExistingEditProperty(editProperty);
    this.store.set("editProperty", editProperty);
  },
  // It may happen that during entering edit mode we already
  // editing other property
  // because we enter edit on mouse down event
  // so blur will be fired later.
  // So we have to do what onBlur does
  // and add a flag so onChange action will not clear our
  // new draft editProperty from the store
  _updateForExistingEditProperty: function _updateForExistingEditProperty(editProperty) {
    var existingEditProperty = this.store.get("editProperty");

    if (!_.isEmpty(existingEditProperty)) {
      this._updateIfChangedOrCancelEdit(existingEditProperty);

      _.extend(editProperty, {
        doNotClearOnChange: true
      });
    }

    return editProperty;
  },
  _onInputProperty: function _onInputProperty(value) {
    var editProperty = this.store.get("editProperty"),
        validator = editProperty.validator;
    editProperty.value = value;
    editProperty.errorMessage = validator.validate(value);
    this.store.set("editProperty", editProperty);
  },
  _onBlurProperty: function _onBlurProperty(blurEditProperty) {
    var currentEditProperty = this.store.get("editProperty"),
        isSameId = currentEditProperty.item && currentEditProperty.item.id === blurEditProperty.item.id,
        isSamePropertyName = currentEditProperty.propertyName === blurEditProperty.propertyName;

    if (isSameId && isSamePropertyName) {
      delete currentEditProperty.doNotClearOnChange;
      this.store.set("editProperty", currentEditProperty);

      this._updateIfChangedOrCancelEdit(currentEditProperty);
    }
  },
  _updateIfChangedOrCancelEdit: function _updateIfChangedOrCancelEdit(editProperty) {
    if (editProperty.item) {
      var item = editProperty.item,
          propertyName = editProperty.propertyName,
          value = editProperty.value,
          isValid = !editProperty.errorMessage;
      var originalValue = item[propertyName];

      if (originalValue !== value && isValid) {
        var json = {};
        json[propertyName] = value;
        var eventName = MODEL_TYPE_TO_EVENT_MAP[item.modelType];

        this._updatePresentationItem(eventName, item.id, json);
      } else {
        this._clearEditProperty();
      }
    }
  },
  _onEnterProperty: function _onEnterProperty() {
    var editProperty = this.store.get("editProperty"),
        isValid = !editProperty.errorMessage;

    if (isValid) {
      this._updateIfChangedOrCancelEdit(editProperty);
    }
  },
  _onEscProperty: function _onEscProperty() {
    this._clearEditProperty();
  },
  _clearEditProperty: function _clearEditProperty() {
    this.store.set("editProperty", {});
  },
  _updatePresentationItem: function _updatePresentationItem(event, id, modelJSON) {
    this.applicationDispatcherEventBus.trigger(event, {
      id: id,
      json: modelJSON
    });
  }
});

module.exports = PresentationDesignerEditPropertiesController;

});