define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var _s = require('underscore.string');

var i18n = require("bundle!all");

var Marionette = require('backbone.marionette');

var Validation = require("runtime_dependencies/js-sdk/src/common/extension/backboneValidationExtension");

var LogCollectorModel = require('../model/LogCollectorModel');

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

var RepositoryChooserDialogFactory = require("runtime_dependencies/bi-repository/src/bi/repository/dialog/resourceChooser/RepositoryChooserDialogFactory");

var createLogCollectorTemplate = require("text!../templates/createLogCollector.htm");

var dialogErrorMessageTemplate = require("text!runtime_dependencies/js-sdk/src/common/templates/dialogErrorPopupTemplate.htm");

var settings = require("settings!treeComponent");

var dialogs = require("runtime_dependencies/jrs-ui/src/components/components.dialogs");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Marionette.ItemView.extend({
  initialize: function initialize(options) {
    this.options = options || {};
    this.prepareNewModel();
  },
  prepareNewModel: function prepareNewModel() {
    this.unbindValidation();
    this.model = new LogCollectorModel(_.cloneDeep(LogCollectorModel.prototype.defaults), _.extend({}, this.options, {
      parse: true
    }));

    if (this.reportChooserDialog) {
      this.reportChooserDialog.remove();
      this.reportChooserDialog = null;
    }

    this.bindValidation();
  },
  render: function render() {
    this.setElement(_.template(createLogCollectorTemplate, _.extend({}, this.model.attributes, {
      i18n: i18n
    })));
  },
  events: {
    'keyup input[type=\'text\'], input[type=\'password\'], textarea, select': 'updateModelProperty',
    'change input[type=\'text\'], input[type=\'password\'], input[type=\'checkbox\'], textarea, select': 'updateModelProperty',
    'click button[name=resourceUriBrowseButton]': 'onBrowseButtonClick',
    'click button[name=save]': 'onSaveButtonClick',
    'click button[name=cancel]': 'onCancelButtonClick'
  },
  onShow: function onShow() {
    this.$el.find('[name=name]').focus();
  },
  bindValidation: function bindValidation() {
    Validation.bind(this, {
      valid: this.fieldIsValid,
      invalid: this.fieldIsInvalid,
      forceUpdate: true,
      selector: 'name'
    });
  },
  unbindValidation: function unbindValidation() {
    Validation.unbind(this);
  },
  fieldIsValid: function fieldIsValid(view, attr, selector) {
    var $parentEl = view.$('[' + selector + '=' + attr + ']').parent();
    $parentEl.removeClass('error');
    $parentEl.find('.message.warning').text('');
  },
  fieldIsInvalid: function fieldIsInvalid(view, attr, error, selector) {
    var $el = view.$('[' + selector + '=' + attr + ']');
    $el.focus();
    var $parentEl = $el.parent();
    $parentEl.addClass('error');
    $parentEl.find('.message.warning').text(error.toString());
  },
  updateModelProperty: function updateModelProperty(e) {
    var $targetEl = $(e.target),
        update = {},
        attr = $targetEl.attr('name');
    update[attr] = 'checkbox' === $targetEl.attr('type') ? $targetEl.is(':checked') : $.trim($targetEl.val()); // clear validation on "user" field because such validation can be performed on server-side
    // and after such validation there can be some errors.
    // Any client-side validation made after this can highlight that field with error
    // clear validation on "user" field because such validation can be performed on server-side
    // and after such validation there can be some errors.
    // Any client-side validation made after this can highlight that field with error

    if (attr === 'userId') {
      this.fieldIsValid(this, 'userId', 'name');
    }

    this.model.set(update);
    this.model.validate(update);
  },
  getReportChooserDialog: function getReportChooserDialog() {
    if (this.reportChooserDialog) {
      return this.reportChooserDialog;
    }

    var Dialog = RepositoryChooserDialogFactory.getDialog('item');
    this.reportChooserDialog = new Dialog({
      treeBufferSize: parseInt(settings.treeLevelLimit, 10),
      resourcesTypeToSelect: [repositoryResourceTypes.REPORT_UNIT, repositoryResourceTypes.ADHOC_DATA_VIEW]
    });
    this.listenTo(this.reportChooserDialog, 'close', function () {
      var resourceUri;

      if (!this.reportChooserDialog.selectedResource) {
        return;
      }

      resourceUri = this.reportChooserDialog.selectedResource.resourceUri;
      var el = this.$el.find('[name=resourceUri]').val(resourceUri);
      this.model.set('resourceUri', resourceUri);
      el.trigger('change');
    });
    return this.reportChooserDialog;
  },
  onBrowseButtonClick: function onBrowseButtonClick() {
    this.getReportChooserDialog().open();
  },
  onSaveButtonClick: function onSaveButtonClick() {
    if (!this.model.isValid(true)) {
      return;
    }

    var self = this;
    this.model.save().done(function () {
      var modelFromServer = self.model.toJSON();
      self.trigger('logCollectorHasBeenCreated', modelFromServer);
    }).fail(_.bind(this._saveErrorCallback, this));
  },
  onCancelButtonClick: function onCancelButtonClick() {
    this.trigger('cancelButtonClick');
  },
  _saveErrorCallback: function _saveErrorCallback(xhr) {
    var response = false;

    try {
      response = JSON.parse(xhr.responseText);
    } catch (e) {}

    var view = this; // the pointer to the view
    // sometimes the error description comes in this key
    // the pointer to the view
    // sometimes the error description comes in this key

    if (response.errorDescriptor) {
      response = response.errorDescriptor;
    } // First of all, get the field name which created this error
    // First of all, get the field name which created this error


    var fieldName = ''; // in common case field name lays in parameters
    // in common case field name lays in parameters

    if (response && response.parameters) {
      fieldName = response.parameters[0];
    } else {
      // also, sometimes, the field name can be in "message" key
      if (response.message.indexOf('com.jaspersoft.ji.diagnostic.') !== -1) {
        fieldName = response.message;
      }
    } // convert field names from server-side style into client-side
    // convert field names from server-side style into client-side


    fieldName = fieldName.replace('com.jaspersoft.ji.diagnostic.', '');

    if (fieldName === 'Verbosity') {
      fieldName = 'verbosity';
    }

    if (fieldName === 'collector' || fieldName === 'Name') {
      fieldName = 'name';
    }

    if (fieldName == 'reportURI' || fieldName == 'URI') {
      fieldName = 'resourceUri';
    } // Now, get the error message
    // Now, get the error message


    var errorMessage = '';

    if (response.errorCode === 'mandatory.parameter.error') {
      errorMessage = i18n['logCollectors.form.parameterIsMissing'];
    } else if (response.errorCode === 'illegal.parameter.value.error') {
      if (fieldName === 'userId') {
        // in "user" field there must be a special message in this case, more meaning that the default one
        errorMessage = i18n['logCollectors.form.userNameIsWrong'];
      } else if (fieldName === 'resourceUri') {
        errorMessage = i18n['logCollectors.form.resourceNotFound'].replace('{0}', response.parameters[1]);
      } else {
        errorMessage = i18n['logCollectors.form.parameterIsWrong'];
      }
    } else if (response.errorCode === 'resource.already.exists') {
      // seems like there is a change in error handling, and it does not send the field name
      // so in this case we just set it to collector name
      fieldName = 'name';
      errorMessage = i18n['logCollectors.form.nameExists'];
    } // in some cases we know for sure which field create this error
    else // in some cases we know for sure which field create this error
      if (response.errorCode === 'access.denied') {
        errorMessage = i18n['jsp.accessDenied.errorMsg'];
        fieldName = 'resourceUri';
      } else if (response.errorCode === 'resource.not.found') {
        var resource = response.parameters[0];

        if (response.parameters[0].length > 50) {
          resource = '"' + _s.truncate(response.parameters[0], 50) + '"';
        }

        errorMessage = i18n['logCollectors.form.resourceNotFound'].replace('{0}', resource);
        fieldName = 'resourceUri';
      } else if (response.errorCode === 'unsupported.resource.type') {
        errorMessage = i18n['logCollectors.form.resourceNotSupported'];
        fieldName = 'resourceUri';
      } else if (response.errorCode === 'unsupported.olap.based.resource.type') {
        errorMessage = i18n['logCollectors.form.unsupported.olap.based.resource.type'];
        fieldName = 'resourceUri';
      } // Now, display error if we have field name
    // Now, display error if we have field name


    if (fieldName) {
      this.fieldIsInvalid(view, fieldName, errorMessage, 'name');
      return;
    } // otherwise, proceed with common error handling
    // otherwise, proceed with common error handling


    this._displayErrorPopup(errorMessage || false, response, xhr);
  },
  _displayErrorPopup: function _displayErrorPopup(customMessage, response, xhr) {
    var errTempl = _.template(dialogErrorMessageTemplate, {
      message: i18n['logCollectors.form.failedToSave'],
      message2: customMessage,
      errorCode: response[0] ? response[0].errorCode : null,
      errorMsg: response.message,
      errorLabel: i18n['logCollectors.form.theReasonIs'],
      respText: xhr.responseText,
      respTextLabel: i18n['logCollectors.form.fullResponseFromServerIs']
    });

    var msg;
    msg = i18n['logCollectors.form.failedToSave'];

    if (customMessage) {
      msg += '<br/>' + i18n['logCollectors.form.theReasonIs'] + ': ' + customMessage;
    } else if (response[0] && response[0].errorCode) {
      msg += '<br/>' + i18n['logCollectors.form.theReasonIs'] + ': ' + response[0].errorCode;
    } else if (response.message) {
      msg += '<br/>' + i18n['logCollectors.form.theReasonIs'] + ': ' + response.message;
    }

    msg += '<br/><br/>' + i18n['logCollectors.form.fullResponseFromServerIs'] + ': ' + xhr.responseText;
    dialogs.errorPopup.show(errTempl);
  }
});

});