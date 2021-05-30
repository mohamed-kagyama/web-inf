define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var jQuery = require('jquery');

var Backbone = require('backbone');

var i18n = require("bundle!adhoc_messages");

var AdvancedPropertyView = require('../view/AdvancedPropertyView');

var AdvancedPropertyModel = require('../model/AdvancedPropertyModel');

var EditAdvancedPropertyView = require('../view/EditAdvancedPropertyView');

var ConfirmationDialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/ConfirmationDialog");

var AlertDialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/AlertDialog");

var AdvancedPropertiesCollection = require('../collection/AdvancedPropertiesCollection');

var templateAdvancedSection = require("text!../template/AdvancedSectionTemplate.htm");

require("css!attributes.css");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
// TODO: move to jasper-ui.css
module.exports = Backbone.View.extend({
  className: 'advancedSection',
  template: _.template(templateAdvancedSection),
  initialize: function initialize() {
    this._subviews = [];
    this.collection = new AdvancedPropertiesCollection();
    this.confirmationDialog = new ConfirmationDialog();
    this.listenTo(this.collection, 'add', this.addAdvancedPropertyView);
    this.listenTo(this.collection, 'reset', this.onCollectionReset);
    this.listenTo(this.collection, 'validation:invalid', this.onCollectionValidationError);
    this.listenTo(this.collection, 'validation:valid', this.onCollectionValid);
    this.listenTo(Backbone, 'advancedProperty:delete', this.onDelete);
    this.render();
  },
  events: {
    'click .addNewItem': 'addNewItem'
  },
  render: function render() {
    this.$el.html(this.template({
      i18n: i18n
    }));
    return this;
  },
  calculateZIndexes: function calculateZIndexes() {
    //use this dirty hook to place confirmation dialog over other dialogs.
    setTimeout(function () {
      jQuery('#chartFormatDialog').css('z-index', +jQuery('#dialogDimmer').css('z-index') - 1);
      jQuery('#chartTypeSelector').css('z-index', +jQuery('#dialogDimmer').css('z-index') - 2);
    }, 0);
  },
  reset: function reset(properties) {
    this.collection.reset(properties);
  },
  toJSON: function toJSON() {
    return this.collection.toJSON();
  },
  resetState: function resetState() {
    this.isEditing = false;
    this.showAddBtn();
    this._currentPropertyView && this._currentPropertyView.$el.show();
    this._currentPropertyView = null;
    this._currentEditPropertyView && this._currentEditPropertyView.remove();
    this._currentEditPropertyView = null;
  },
  renderAdvancedProperty: function renderAdvancedProperty(advancedPropertyModel) {
    var advancedPropertyView = new AdvancedPropertyView({
      model: advancedPropertyModel
    });
    this.$('tbody').append(advancedPropertyView.$el);
    this.listenTo(advancedPropertyView, 'edit', this.onEdit);
    return advancedPropertyView;
  },
  addAdvancedPropertyView: function addAdvancedPropertyView(advancedPropertyModel) {
    var view = this.renderAdvancedProperty(advancedPropertyModel);

    this._subviews.push(view);
  },
  showAddBtn: function showAddBtn() {
    this.$('.addNewItem').show();
  },
  hideAddBtn: function hideAddBtn() {
    this.$('.addNewItem').hide();
  },
  onEdit: function onEdit(advancedPropertyView) {
    var self = this;

    if (this.isEditing) {
      this.confirmationDialog.setContent(i18n['ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_STOP_EDITING']);
      this.confirmationDialog.open();
      this.calculateZIndexes();
      this.listenToOnce(this.confirmationDialog, 'button:yes', function () {
        self.showEditAdvancedPropertyView(advancedPropertyView);
      });
    } else {
      this.showEditAdvancedPropertyView(advancedPropertyView);
    }
  },
  onCancel: function onCancel(sender, model, originalValues) {
    //revert changes if any
    model.set(originalValues);
    this.removeEditAdvancedPropertyView();
  },
  onCollectionReset: function onCollectionReset() {
    //remove all subviews
    _.invoke(this._subviews, 'remove');

    this.collection.each(this.addAdvancedPropertyView, this);
  },
  onCollectionValid: function onCollectionValid() {
    this.removeEditAdvancedPropertyView();
  },
  onCollectionValidationError: function onCollectionValidationError(collection, model, errors) {
    var self = this,
        alertDialog;

    if (errors.message === collection.validationMessages.DUPLICATE_MODEL_EDIT) {
      //Model name after edition is conflicting with name of the other element in collection
      //inform about this but do nothing with it
      alertDialog = new AlertDialog({
        message: i18n['ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_PROPERTY_ALREADY_EXISTS_NO_OVERRIDE'].replace('{0}', model.get('name'))
      });
      this.listenToOnce(alertDialog, 'button:close', function () {
        alertDialog.remove();
      });
      alertDialog.open();
      this.calculateZIndexes();
    } else if (errors.message === collection.validationMessages.DUPLICATE_MODEL_ADD) {
      //Trying to add duplicate item
      //Ask for replacement
      this.confirmationDialog.setContent(i18n['ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_PROPERTY_ALREADY_EXISTS'].replace('{0}', model.get('name')));
      this.confirmationDialog.open();
      this.calculateZIndexes();
      this.listenToOnce(this.confirmationDialog, 'button:yes', function () {
        collection.get(model).set({
          value: model.get('value')
        });
        self.removeEditAdvancedPropertyView();
      }).listenToOnce(this.confirmationDialog, 'button:no', function () {
        self.stopListening(self.confirmationDialog);
      });
    }
  },
  onSaveItem: function onSaveItem(sender, advancedPropertyModel) {
    this.collection.add(advancedPropertyModel);
  },
  onDelete: function onDelete(sender, model) {
    var self = this;
    this.confirmationDialog.setContent(i18n['ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_CONFIRM_DELETE_PROPERTY'].replace('{0}', model.get('name')));
    this.confirmationDialog.open();
    this.calculateZIndexes();
    this.listenToOnce(this.confirmationDialog, 'button:yes', function () {
      model.trigger('destroy', model);
      self._subviews = _.reject(self._subviews, function (view) {
        return sender === view;
      });
    });
    this.listenToOnce(this.confirmationDialog, 'button:no', function () {
      self.stopListening(self.confirmationDialog);
    });
  },
  addNewItem: function addNewItem() {
    this.showEditAdvancedPropertyView();
  },
  scrollTo: function scrollTo($el) {
    var $tableContainer = jQuery('.table-container');
    $tableContainer.animate({
      scrollTop: $el.position().top + $tableContainer.scrollTop() - 29 //29px floating header offset

    }, 1000);
    $el.find('input:first').focus();
  },
  showEditAdvancedPropertyView: function showEditAdvancedPropertyView(advancedPropertyView) {
    //Create new edit view
    var editAdvancedPropertyView = advancedPropertyView ? new EditAdvancedPropertyView({
      model: advancedPropertyView.model
    }, {
      editMode: true
    }) : new EditAdvancedPropertyView({
      model: new AdvancedPropertyModel()
    }); //bind events
    //bind events

    this.listenTo(editAdvancedPropertyView, 'add edit', this.onSaveItem).listenTo(editAdvancedPropertyView, 'cancel', this.onCancel); //remove previous edit view if any
    //remove previous edit view if any

    this._currentEditPropertyView && this._currentEditPropertyView.remove();
    this.isEditing = true;
    this.hideAddBtn();
    this._currentEditPropertyView = editAdvancedPropertyView;

    if (!advancedPropertyView) {
      //append new view to the end of the properties list in table
      this.$('tbody').append(editAdvancedPropertyView.$el);
    } else {
      //show any previously hidden property view
      this._currentPropertyView && this._currentPropertyView.$el.show();
      this._currentPropertyView = advancedPropertyView; //insert edit view instead of of property view
      //insert edit view instead of of property view

      editAdvancedPropertyView.$el.insertAfter(advancedPropertyView.$el);
      advancedPropertyView.$el.hide();
    } //scroll to newly created property view
    //scroll to newly created property view


    this.scrollTo(editAdvancedPropertyView.$el);
  },
  removeEditAdvancedPropertyView: function removeEditAdvancedPropertyView() {
    if (this._currentEditPropertyView) {
      //stop listening to any events on edit view
      this.stopListening(this._currentEditPropertyView);

      this._currentEditPropertyView.remove();

      this._currentEditPropertyView = null;
    }

    this.showAddBtn();
    this.isEditing = false;

    if (this._currentPropertyView) {
      //show property view if any
      this._currentPropertyView && this._currentPropertyView.$el.show();
      this._currentPropertyView = null;
    }
  },
  remove: function remove() {
    _.invoke(this._subviews, 'remove');

    Backbone.View.prototype.remove.call(this);
  }
});

});