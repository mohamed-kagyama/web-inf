define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $ = _prototype.$;

var _ = require('underscore');

var CalculatedFieldsController = require('./calculatedFields/CalculatedFieldsController');

var CalculatedFieldsService = require('./calculatedFields/CalculatedFieldsService');

var jasperserver_messages = require("bundle!jasperserver_messages");

var adhoc_messages = require("bundle!adhoc_messages");

var dialogs = require("runtime_dependencies/jrs-ui/src/components/components.dialogs");

var designerBase = require('../base/designer.base');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var _dialog;

var i18n = _.extend({}, jasperserver_messages, adhoc_messages);

var adhocCalculatedFields = {
  DIALOG_ID: 'calcFieldMeasure',
  FIELDS_CONTAINER_ID: '#calculatedFields-container',
  calcFieldsService: new CalculatedFieldsService({
    clientKey: window.clientKey
  }),

  /*
       * Adhoc Dialog for Calculated Fields
       */
  showDialog: function showDialog(controller) {
    _dialog = $(this.DIALOG_ID);

    _dialog.down('button.doneButton').observe('click', controller.applyField.bind(controller));

    _dialog.down('button.cancelButton').observe('click', function () {
      controller.stop();
      this.closeDialog();
    }.bind(this)); // the _dialog should be built completely so its height could be determined
    // fix for JRS-20100


    setTimeout(function () {
      dialogs.popup.show(_dialog);
    });
  },
  closeDialog: function closeDialog() {
    Event.stopObserving(_dialog.down('button.doneButton'));
    Event.stopObserving(_dialog.down('button.cancelButton'));
    dialogs.popup.hide(_dialog);
  },
  setDialogLabels: function setDialogLabels(isMeasure, isEdit) {
    var labelsMap = isMeasure ? {
      dialogHeader: isEdit ? 'ADH_401_DIALOG_HEADER_EDIT_CUSTOM_MEASURE' : 'ADH_401_DIALOG_HEADER_NEW_CUSTOM_MEASURE',
      okButtonLabel: isEdit ? 'button.save' : 'ADH_430_BUTTON_CREATE_MEASURE'
    } : {
      dialogHeader: isEdit ? 'ADH_401_DIALOG_HEADER_EDIT_CUSTOM_FIELD' : 'ADH_401_DIALOG_HEADER_NEW_CUSTOM_FIELD',
      okButtonLabel: isEdit ? 'button.save' : 'ADH_430_BUTTON_CREATE_FIELD'
    };
    $(_dialog.down('.header.mover > .title')).update(i18n[labelsMap.dialogHeader]);
    $(_dialog.down('.footer button.doneButton span.wrap')).update(i18n[labelsMap.okButtonLabel]);
  },

  /*
       *  Field actions
       */
  createField: function createField(kind) {
    var controller = new CalculatedFieldsController({
      element: this.FIELDS_CONTAINER_ID,
      service: this.calcFieldsService
    });
    controller.listenTo(controller, 'field:loaded', this.setDialogLabels.bind(this));
    controller.listenTo(controller, 'field:applied', function (response) {
      controller.stop();
      this.closeDialog();
      this.createCustomFieldCallback(response);
    }.bind(this));
    this.showDialog(controller);
    controller.start({
      editingMode: false,
      kind: kind
    });
  },
  updateField: function updateField() {
    var selectedObject = designerBase.getSelectedObject();
    var selectedFieldName = selectedObject.model ? selectedObject.model.fieldName : window.adhocDesigner.getNameForSelected(selectedObject);

    if (selectedFieldName == null) {
      throw 'The field "' + selectedFieldName + '" is not found.';
    }

    var controller = new CalculatedFieldsController({
      element: this.FIELDS_CONTAINER_ID,
      service: this.calcFieldsService
    });
    controller.listenTo(controller, 'field:loaded', this.setDialogLabels.bind(this));
    controller.listenTo(controller, 'field:applied', function (response) {
      controller.stop();
      this.closeDialog();
      this.updateCustomFieldCallback(response);
    }.bind(this));
    this.showDialog(controller);
    controller.start({
      editingMode: true,
      selectedFieldName: selectedFieldName
    });
  },
  deleteField: function deleteField() {
    var selectedObject = designerBase.getSelectedObject();
    var fieldName = window.adhocDesigner.getNameForSelected(selectedObject);

    if (!window.adhocDesigner.isInUse(fieldName)) {
      var callback = function (state) {
        this.deleteCustomFieldCallback(fieldName, selectedObject, state);
        window.adhocDesigner.enableCanUndoRedo();
      }.bind(adhocCalculatedFields);

      this.calcFieldsService.remove(fieldName).done(_.bind(function (data, textStatus, jqXHR) {
        if (jqXHR.status === 204) {
          throw 'Field not found.';
        }

        adhocCalculatedFields._updateState(callback);
      }, this));
    } else {
      throw 'The field in use.';
    }
  },

  /*
       *  Callbacks
       */
  createCustomFieldCallback: function createCustomFieldCallback(newField) {
    var isMeasure = newField.kind === 'MEASURE';
    dialogs.systemConfirm.show(i18n[isMeasure ? 'ADH_435_CALCULATED_MEASURE_ADDED' : 'ADH_435_CALCULATED_FIELD_ADDED'], 5000); // Update the fields tree and local context state.
    // Update the fields tree and local context state.

    adhocCalculatedFields._updateState(function (state) {
      var oldSize = window.localContext.state.allColumns.length;
      window.adhocDesigner.updateState(state);
      window.adhocDesigner.enableCanUndoRedo();

      if (window.localContext.state.allColumns.length > oldSize) {
        var newFieldId = newField.name;
        var order = window.adhocDesigner.getFieldIndexByName(newFieldId); // TODO: Get the dataType from newField's "type" property. Currently it has another format: "java.lang.String" while the Tree Node uses "String".
        // TODO: Get the dataType from newField's "type" property. Currently it has another format: "java.lang.String" while the Tree Node uses "String".

        var dataType = window.adhocDesigner.findFieldByName(newFieldId).type; // Add a new node to available fields tree
        // Add a new node to available fields tree

        var metaNode = {
          id: newFieldId,
          label: newField.display,
          type: 'com.jaspersoft.jasperserver.api.metadata.common.domain.NewNode',
          uri: '/' + newFieldId,
          cssClass: 'calculatedField',
          order: order,
          extra: {
            id: newFieldId,
            name: newFieldId,
            isMeasure: isMeasure,
            dimensionId: isMeasure ? window.adhocDesigner.MEASURES : newFieldId,
            dataType: dataType
          }
        };
        var targetTreeName = isMeasure ? 'measuresTree' : 'dimensionsTree';
        window.adhocDesigner.addNodeToTree(metaNode, window.adhocDesigner[targetTreeName]);
        window.adhocDesigner.updateAllFieldLabels();
        window.adhocDesigner[targetTreeName + 'Search'].setKeyword('');
      }
    });
  },
  updateCustomFieldCallback: function updateCustomFieldCallback(field) {
    var isMeasure = field.kind === 'MEASURE';
    dialogs.systemConfirm.show(i18n[isMeasure ? 'ADH_435_CALCULATED_MEASURE_UPDATED' : 'ADH_435_CALCULATED_FIELD_UPDATED'], 5000);

    adhocCalculatedFields._updateState(function (state) {
      window.adhocDesigner.updateState(state);
      window.adhocDesigner.enableCanUndoRedo();

      if (window.adhocDesigner.isInUse(field.name)) {
        window.localContext.updateViewCallback(state);
        window.adhocDesigner.filtersController.setFilters(state, {
          reset: true
        });
      }

      window.adhocDesigner.updateAllFieldLabels();
    });
  },
  deleteCustomFieldCallback: function deleteCustomFieldCallback(fieldName, nodeToDelete, state) {
    var isMeasure = nodeToDelete.param.extra.isMeasure;
    dialogs.systemConfirm.show(i18n[isMeasure ? 'ADH_435_CALCULATED_MEASURE_DELETED' : 'ADH_435_CALCULATED_FIELD_DELETED'], 5000);
    var oldSize = window.localContext.state.allColumns.length;
    window.adhocDesigner.updateState(state);
    window.adhocDesigner.enableCanUndoRedo();

    if (window.localContext.state.allColumns.length < oldSize && nodeToDelete) {
      window.adhocDesigner.removeNodeFromTree(nodeToDelete);
      window.adhocDesigner.updateAllFieldLabels();
    }
  },

  /*
       *  Helpers
       */
  _updateState: function _updateState(handler) {
    designerBase.sendRequest(window.adhocDesigner.getControllerPrefix() + '_recompileQueryAndLoadState', [], function (state) {
      handler(state);
    });
  }
};
window.adhocCalculatedFields = adhocCalculatedFields;
module.exports = window.adhocCalculatedFields;

});