define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var jQuery = require('jquery');

var Backbone = require('backbone');

var i18n = require("bundle!DashboardBundle");

var HyperlinkParameterView = require('./HyperlinkParameterView');

var HyperlinkParameterModel = require('../model/HyperlinkParameterModel');

var EditHyperlinkParameterView = require('./EditHyperlinkParameterView');

var ConfirmationDialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/ConfirmationDialog");

var AlertDialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/AlertDialog");

var HyperlinkParametersCollection = require('../collection/HyperlinkParametersCollection');

var templateHyperlinkParametersSection = require("text!../template/HyperlinkParametersSectionTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
// Attribute css is located in jrs-ui, can't use it here
// import 'css!attributes.css'; //TODO: Sregey P. commented out as a part of migration to es6
module.exports = Backbone.View.extend({
  className: 'hyperlinkPropertiesSection',
  template: _.template(templateHyperlinkParametersSection),
  initialize: function initialize() {
    this._subviews = [];
    this.collection = new HyperlinkParametersCollection();
    this.confirmationDialog = new ConfirmationDialog();
    this.listenTo(this.collection, 'add', this.addHyperlinkParameterView);
    this.listenTo(this.collection, 'reset', this.onCollectionReset);
    this.listenTo(this.collection, 'validation:invalid', this.onCollectionValidationError);
    this.listenTo(this.collection, 'validation:valid', this.onCollectionValid);
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

  /**
   * Fills parameters view with provided data
   * @public
   */
  reset: function reset(properties) {
    this.collection.reset(_.map(properties, function (element) {
      return {
        name: element.id,
        value: element.defaultValue && element.defaultValue[0]
      };
    }));
  },

  /**
   * Returns json-like representation of parameters
   * @public
   */
  toJSON: function toJSON() {
    return _.map(this.collection.toJSON(), function (element) {
      return {
        id: element.name,
        label: element.name,
        defaultValue: [element.value]
      };
    });
  },

  /**
   * Resets state of parameters view
   * @public
   */
  resetState: function resetState() {
    this.isEditing = false;
    this.showAddBtn();
    this._currentPropertyView && this._currentPropertyView.$el.show();
    this._currentPropertyView = null;
    this._currentEditPropertyView && this._currentEditPropertyView.remove();
    this._currentEditPropertyView = null;
  },
  renderHyperlinkParameter: function renderHyperlinkParameter(hyperlinkParameterModel) {
    var hyperlinkParameterView = new HyperlinkParameterView({
      model: hyperlinkParameterModel
    });
    this.$('tbody').append(hyperlinkParameterView.$el);
    this.listenTo(hyperlinkParameterView, 'edit', this.onEdit);
    this.listenTo(hyperlinkParameterView, 'delete', this.onDelete);
    return hyperlinkParameterView;
  },
  addHyperlinkParameterView: function addHyperlinkParameterView(hyperlinkParameterModel) {
    var view = this.renderHyperlinkParameter(hyperlinkParameterModel);

    this._subviews.push(view);
  },
  showAddBtn: function showAddBtn() {
    this.$('.addNewItem').show();
  },
  hideAddBtn: function hideAddBtn() {
    this.$('.addNewItem').hide();
  },
  onEdit: function onEdit(hyperlinkParameterView) {
    var self = this;

    if (this.isEditing) {
      this.confirmAbort(function () {
        self.showEditHyperlinkParameterView(hyperlinkParameterView);
      });
    } else {
      this.showEditHyperlinkParameterView(hyperlinkParameterView);
    }
  },
  confirmAbort: function confirmAbort(onOk, onCancel) {
    var self = this;
    this.confirmationDialog.setContent(i18n['dashboard.component.dialog.properties.hyperlinks.stop.editing']);
    this.confirmationDialog.open();
    this.listenToOnce(this.confirmationDialog, 'button:yes', function () {
      self.stopListening(self.confirmationDialog, 'button:no');
      self.resetState();
      onOk && onOk();
    });
    this.listenToOnce(this.confirmationDialog, 'button:no', function () {
      self.stopListening(self.confirmationDialog, 'button:yes');
      onCancel && onCancel();
    });
  },
  onCancel: function onCancel(sender, model, originalValues) {
    //revert changes if any
    model.set(originalValues);
    this.removeEditHyperlinkParameterView();
  },
  onCollectionReset: function onCollectionReset() {
    //remove all subviews
    _.invoke(this._subviews, 'remove');

    this.collection.each(this.addHyperlinkParameterView, this);
  },
  onCollectionValid: function onCollectionValid() {
    this.removeEditHyperlinkParameterView();
  },
  onCollectionValidationError: function onCollectionValidationError(collection, model, errors) {
    var self = this,
        alertDialog;

    if (errors.message === collection.validationMessages.DUPLICATE_MODEL_EDIT) {
      //Model name after edition is conflicting with name of the other element in collection
      //inform about this but do nothing with it
      alertDialog = new AlertDialog({
        message: i18n['dashboard.component.dialog.properties.hyperlinks.parameter.exist.no.override'].replace('{0}', model.get('name'))
      });
      this.listenToOnce(alertDialog, 'button:close', function () {
        alertDialog.remove();
      });
      alertDialog.open();
    } else if (errors.message === collection.validationMessages.DUPLICATE_MODEL_ADD) {
      //Trying to add duplicate item
      //Ask for replacement
      this.confirmationDialog.setContent(i18n['dashboard.component.dialog.properties.hyperlinks.parameter.exist'].replace('{0}', model.get('name')));
      this.confirmationDialog.open();
      this.listenToOnce(this.confirmationDialog, 'button:yes', function () {
        collection.get(model).set({
          value: model.get('value')
        });
        self.removeEditHyperlinkParameterView();
      }).listenToOnce(this.confirmationDialog, 'button:no', function () {
        self.stopListening(self.confirmationDialog);
      });
    }
  },
  onSaveItem: function onSaveItem(sender, hyperlinkParameterModel) {
    this.collection.add(hyperlinkParameterModel);
  },
  onDelete: function onDelete(sender, model) {
    var self = this;
    this.confirmationDialog.setContent(i18n['dashboard.component.dialog.properties.hyperlinks.delete.parameter'].replace('{0}', model.get('name')));
    this.confirmationDialog.open();
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
  addNewItem: function addNewItem(ev) {
    this.showEditHyperlinkParameterView();
  },
  scrollTo: function scrollTo($el) {
    var $tableContainer = jQuery('.table-container');
    $tableContainer.animate({
      scrollTop: $el.position().top + $tableContainer.scrollTop() - 29 //29px floating header offset

    }, 1000);
    setTimeout(function () {
      $el.find('input:first').focus();
    }, 0);
  },
  showEditHyperlinkParameterView: function showEditHyperlinkParameterView(hyperlinkParameterView) {
    //Create new edit view
    var editHyperlinkParameterView = hyperlinkParameterView ? new EditHyperlinkParameterView({
      model: hyperlinkParameterView.model
    }, {
      editMode: true
    }) : new EditHyperlinkParameterView({
      model: new HyperlinkParameterModel()
    }); //bind events
    //bind events

    this.listenTo(editHyperlinkParameterView, 'add edit', this.onSaveItem).listenTo(editHyperlinkParameterView, 'cancel', this.onCancel); //remove previous edit view if any
    //remove previous edit view if any

    this._currentEditPropertyView && this._currentEditPropertyView.remove();
    this.isEditing = true;
    this.hideAddBtn();
    this._currentEditPropertyView = editHyperlinkParameterView;

    if (!hyperlinkParameterView) {
      //append new view to the end of the properties list in table
      this.$('tbody').append(editHyperlinkParameterView.$el);
    } else {
      //show any previously hidden property view
      this._currentPropertyView && this._currentPropertyView.$el.show();
      this._currentPropertyView = hyperlinkParameterView; //insert edit view instead of of property view
      //insert edit view instead of of property view

      editHyperlinkParameterView.$el.insertAfter(hyperlinkParameterView.$el);
      hyperlinkParameterView.$el.hide();
    } //scroll to newly created property view
    //scroll to newly created property view


    this.scrollTo(editHyperlinkParameterView.$el);
  },
  removeEditHyperlinkParameterView: function removeEditHyperlinkParameterView() {
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