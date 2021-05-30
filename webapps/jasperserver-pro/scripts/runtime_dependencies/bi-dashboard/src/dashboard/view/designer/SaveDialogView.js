define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DashboardBundle");

var i18n2 = require("bundle!CommonBundle");

var RepositoryResourceModel = require("runtime_dependencies/bi-repository/src/bi/repository/model/RepositoryResourceModel");

var DialogWithModelInputValidation = require("runtime_dependencies/js-sdk/src/common/component/dialog/DialogWithModelInputValidation");

var ConfirmationDialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/ConfirmationDialog");

var repositoryFolderTreeFactory = require('../../factory/repositoryFolderTreeFactory');

var dashboardSettings = require('../../dashboardSettings');

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

var content = require("text!../../template/saveDialogContentTemplate.htm");

var template = require("text!../../template/saveDialogTemplate.htm");

var saveDialogTooltipTemplate = require("text!../../template/tooltip/saveDialogTooltipTemplate.htm");

var Notification = require("runtime_dependencies/js-sdk/src/common/component/notification/Notification");

var settings = require("settings!treeComponent");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/*
     * Create a simple clone of DashboardModel for saving. We don't need all mechanics related to Dashboard there,
     * that's why we create simple RepositoryResourceModel, but with all attributes from original model and type='dashboard'.
     * Also we clear some system properties first in order to have "clear" clone.
     */
function cloneToSimpleResourceModel(model) {
  var attrsClone = model.toJSON();
  delete attrsClone.uri;
  delete attrsClone.permissionMask;
  delete attrsClone.updateDate;
  delete attrsClone.creationDate;
  delete attrsClone.version;
  var clonedModel = new RepositoryResourceModel(attrsClone, {
    contextPath: model.contextPath,
    type: repositoryResourceTypes.DASHBOARD
  });
  clonedModel.validation = model.validation;
  return clonedModel;
}

module.exports = DialogWithModelInputValidation.extend({
  constructor: function constructor(options) {
    options || (options = {});
    DialogWithModelInputValidation.prototype.constructor.call(this, {
      modal: true,
      resizable: true,
      minWidth: dashboardSettings.SAVE_AS_DIALOG_MIN_WIDTH,
      minHeight: dashboardSettings.SAVE_AS_DIALOG_MIN_HEIGHT,
      alsoResize: '.treeBox',
      model: options.model,
      additionalCssClasses: 'saveAs',
      title: i18n['dashboard.dialog.save.title'],
      template: template,
      content: _.template(content)({
        i18n: i18n
      }),
      buttons: [{
        label: i18n2['button.save'],
        action: 'save',
        primary: true
      }, {
        label: i18n2['button.cancel'],
        action: 'cancel',
        primary: false
      }]
    });
    this.on('button:save', _.bind(this._onSaveDialogSaveButtonClick, this));
    this.on('button:cancel', _.bind(this._onSaveDialogCancelButtonClick, this));
  },
  initialize: function initialize(options) {
    var self = this;
    DialogWithModelInputValidation.prototype.initialize.apply(this, arguments);
    this.disableButton('save');
    this.foldersTree = repositoryFolderTreeFactory({
      contextPath: this.model.contextPath,
      treeBufferSize: parseInt(settings.treeLevelLimit, 10),
      tooltipContentTemplate: saveDialogTooltipTemplate
    });
    this.notification = new Notification();
    this.listenTo(this.foldersTree, 'selection:change', function (selection) {
      var parentFolderUri;

      if (selection && _.isArray(selection) && selection[0] && selection[0].uri) {
        parentFolderUri = selection[0].uri;
      }

      self.model.set('parentFolderUri', parentFolderUri);
      self.enableButton('save');
    });
    this.$contentContainer.find('.control.groupBox .body').append(this.foldersTree.render().el);
    this.confirmationDialog = new ConfirmationDialog({
      title: i18n['dashboard.confirm.dialog.save.title'],
      text: i18n['dashboard.save.conflict']
    });
    this.listenTo(this.confirmationDialog, 'button:yes', this._onSaveFromDialogConfirm);
  },
  open: function open() {
    var self = this;
    this.enableButton('cancel');
    this.original = this.model;
    this.model = cloneToSimpleResourceModel(this.model);
    this.bindValidation();

    if (this.model) {
      _.each(this.model.attributes, function (value, key) {
        self.$('[name=' + key + ']').val(value);
      });
    } // TODO: expand foldersTree to corresponding parentFolderUri
    // TODO: expand foldersTree to corresponding parentFolderUri


    DialogWithModelInputValidation.prototype.open.apply(this, arguments);
  },
  close: function close() {
    if (this.foldersTree) {
      this.foldersTree.collapse('@fakeRoot', {
        silent: true
      });
      this.foldersTree.collapse('/public', {
        silent: true
      });
      this.foldersTree.resetSelection();
    }

    if (this.original) {
      this.model = this.original;
      this.original = undefined;
    }

    this.unbindValidation();
    this.clearValidationErrors();
    this.disableButton('save');
    DialogWithModelInputValidation.prototype.close.apply(this, arguments);
  },
  save: function save() {
    if (!this.model.isNew()) {
      this.model.save({}, {
        createFolders: false,
        expanded: true,
        success: _.bind(function (model, data) {
          this._saveAjaxSuccessCallback(model, data);
        }, this),
        error: _.bind(function (model, xhr, options) {
          this._saveAjaxErrorCallback(model, xhr, options);
        }, this)
      });
    } else {
      this.saveAs();
    }
  },
  remove: function remove() {
    this.notification.remove();
    this.foldersTree.remove();
    this.confirmationDialog.remove();
    DialogWithModelInputValidation.prototype.remove.apply(this, arguments);
  },
  saveAs: function saveAs() {
    this.open();
  },
  _onSaveDialogCancelButtonClick: function _onSaveDialogCancelButtonClick() {
    this.close();
  },
  _onSaveDialogSaveButtonClick: function _onSaveDialogSaveButtonClick() {
    var self = this,
        modelClone = this.model;

    if (modelClone.isValid(true)) {
      modelClone.set('name', RepositoryResourceModel.generateResourceName(modelClone.get('label')));
      self.buttons.getOptionView('save').disable();
      modelClone.save({}, {
        createFolders: false,
        expanded: true,
        success: _.bind(this._saveFromDialogAjaxSuccessCallback, this),
        error: function error(model, xhr, options) {
          if (xhr.status === 409 || xhr.status === 400 && xhr.responseJSON && xhr.responseJSON.errorCode === 'resource.already.exists') {
            self.confirmationDialog.open();
          } else {
            self._saveFromDialogAjaxErrorCallback(model, xhr, options);
          }

          self.buttons.getOptionView('save').enable();
        }
      });
    }
  },
  // This should not be overridden, however in order to get rid of it
  // every dialog inherited from common/components/Dialog should be fixed
  _setMinSize: function _setMinSize() {
    if (this.dialogOptions.minWidth) {
      this.$el.css({
        minWidth: this.dialogOptions.minWidth
      });
    }

    if (this.dialogOptions.minHeight) {
      this.$el.css({
        minHeight: this.dialogOptions.minHeight
      });
    }
  },
  _saveFromDialogAjaxErrorCallback: function _saveFromDialogAjaxErrorCallback(model, xhr, options) {
    this._saveAjaxErrorCallback(model, xhr, options);
  },
  _saveAjaxErrorCallback: function _saveAjaxErrorCallback(model, xhr, options) {
    var msg;

    switch (xhr.status) {
      case 404:
        msg = i18n['dashboard.notification.message.not.found'];
        break;

      case 403:
        msg = i18n['dashboard.notification.message.access.denied'];
        break;

      case 401:
        msg = i18n['dashboard.notification.message.not.authenticated'];
        break;

      default:
        msg = i18n['dashboard.notification.message.unknown.error'];
        break;
    }

    this.notification.show({
      message: msg
    });
  },
  _saveAjaxSuccessCallback: function _saveAjaxSuccessCallback(model, data) {
    this.model.updateResourceCollection();
    this.trigger('save', this);
    this.notification.show({
      message: i18n['dashboard.notification.message.saved'],
      type: 'success'
    });
  },
  _saveFromDialogAjaxSuccessCallback: function _saveFromDialogAjaxSuccessCallback(model, data) {
    this.close();
    this.model.set(this.model.parse(data));

    this._saveAjaxSuccessCallback(model, data);
  },
  _onSaveFromDialogConfirm: function _onSaveFromDialogConfirm() {
    this.disableButton('save');
    this.disableButton('cancel');
    this.model.save({}, {
      createFolders: false,
      overwrite: true,
      expanded: true,
      success: _.bind(this._saveFromDialogAjaxSuccessCallback, this),
      error: _.bind(this._saveFromDialogAjaxErrorCallback, this)
    });
  }
});

});