define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var DomainRepositoryResourceModel = require("../model/DomainRepositoryResourceModel");

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

var errorMessageUtil = require("../../../../rest/errorHandling/errorMessageUtil");

var SaveDialogView = require("runtime_dependencies/bi-repository/src/bi/repository/dialog/SaveDialogView");

var saveDialogTemplate = require("text!../template/saveDialogTemplate.htm");

var saveDialogContentTemplate = require("text!../template/saveDialogContentTemplate.htm");

var saveDialogButtonTemplate = require("text!../template/saveDialogButtonTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var attrNameToValidationClassMap = {
  label: {
    validationContainer: '.jr-jLabelValidation',
    validationText: '.jr-jLabelValidationText'
  },
  description: {
    validationContainer: '.jr-jDescriptionValidation',
    validationText: '.jr-jDescriptionValidationText'
  }
};
module.exports = SaveDialogView.extend({
  constructor: function constructor(options) {
    this.request = options.request;
    this.dataNameAttrs = options.dataNameAttrs;
    this.skipDataBaseMetadataCheck = options.skipDataBaseMetadataCheck;
    var errorMessages = {
      unknown: errorMessageUtil.getFirstErrorMessage
    },
        additionalCssClasses = 'domainDesigner',
        title = i18n['domain.designer.saveDialog.title'],
        titleSaveAs = i18n['domain.designer.saveAsDialog.title'];
    var defaultSelectedFolder = '';

    if (options.currentDomainUri) {
      defaultSelectedFolder = options.currentDomainUri.substr(0, options.currentDomainUri.lastIndexOf('/'));
    } else if (options.parentFolderUri) {
      defaultSelectedFolder = options.parentFolderUri;
    }

    SaveDialogView.prototype.constructor.call(this, {
      handles: function handles($el) {
        return {
          "e": $el.find(".jr-jDraggable")
        };
      },
      minWidth: 425,
      minHeight: 550,
      template: saveDialogTemplate,
      dialogContentTemplate: saveDialogContentTemplate,
      dialogButtonTemplate: saveDialogButtonTemplate,
      folderTreeOptions: {
        treeBufferSize: options.treeBufferSize,
        treeContainerClass: '.jr-jTree'
      },
      errorMessages: errorMessages,
      additionalCssClasses: additionalCssClasses,
      title: title,
      titleSaveAs: titleSaveAs,
      model: options.model,
      defaultSelectedFolder: defaultSelectedFolder,
      notificationSuccessMessage: i18n['domain.designer.saved']
    });
  },
  render: function render() {
    SaveDialogView.prototype.render.apply(this, arguments);
    this.$el.attr('data-name', this.dataNameAttrs.dialogTitle);
    this.$el.find('input').attr('data-name', this.dataNameAttrs.input);
    this.$el.find('textarea').attr('data-name', this.dataNameAttrs.textarea);
    return this;
  },
  getResourceOnSave: function getResourceOnSave(model) {
    return this._getResourceModel(model);
  },
  getResourceOnSaveAs: function getResourceOnSaveAs(model) {
    return this._getResourceModel(model, true);
  },
  fieldIsValid: function fieldIsValid(view, attr) {
    view._clearValidationMessage(attr);
  },
  fieldIsInvalid: function fieldIsInvalid(view, attr, error) {
    var validationClasses = attrNameToValidationClassMap[attr];

    if (validationClasses) {
      var validationContainer = view.$(validationClasses.validationContainer),
          validationText = view.$(validationClasses.validationText);
      validationContainer.removeClass('jr-isInvisible');
      validationText.text(error.toString());
    }
  },
  clearValidationErrors: function clearValidationErrors() {
    this._clearValidationMessage('name');

    this._clearValidationMessage('description');
  },
  saveModelOnServer: function saveModelOnServer() {
    this.model = this._getResourceModel(this.originalModel);

    this._saveModelOnServer();
  },
  // private methods
  _openDialog: function _openDialog() {
    this.enableButton('cancel');

    SaveDialogView.prototype._openDialog.apply(this, arguments);
  },
  _clearValidationMessage: function _clearValidationMessage(attr) {
    var validationClasses = attrNameToValidationClassMap[attr];

    if (validationClasses) {
      var validationContainer = this.$(validationClasses.validationContainer),
          validationText = this.$(validationClasses.validationText);
      validationContainer.addClass('jr-isInvisible');
      validationText.text('');
    }
  },
  _getResourceModel: function _getResourceModel(model, useContentInsteadOfResourceReferenceForSubResources) {
    var modelJSON = model.toJSON(useContentInsteadOfResourceReferenceForSubResources);
    return new DomainRepositoryResourceModel(modelJSON, {
      contextPath: jrsConfigs.contextPath,
      type: repositoryResourceTypes.DOMAIN,
      request: this.request
    });
  },
  _saveModelOnServer: function _saveModelOnServer(options) {
    options = _.extend({}, options, {
      skipDataBaseMetadataCheck: this.skipDataBaseMetadataCheck
    });

    SaveDialogView.prototype._saveModelOnServer.call(this, options);
  },
  _getSaveOptions: function _getSaveOptions(options) {
    var saveOptions = SaveDialogView.prototype._getSaveOptions.call(this, options);

    return _.extend({}, saveOptions, {
      skipDataBaseMetadataCheck: options.skipDataBaseMetadataCheck
    });
  },
  _saveModelOnServerFail: function _saveModelOnServerFail(model, xhr, options) {
    var saveDialogProperties = {
      label: model.get('label'),
      uri: model.get('uri'),
      parentFolderUri: model.get('parentFolderUri'),
      description: model.get('description')
    };
    this.trigger('save:validation:error', xhr, saveDialogProperties);
  }
});

});