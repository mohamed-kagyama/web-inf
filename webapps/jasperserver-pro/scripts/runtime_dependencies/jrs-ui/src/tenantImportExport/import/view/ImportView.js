define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var Backbone = require('backbone');

var ImportModel = require('../model/ImportModel');

var ImportStateModel = require('../model/ImportStateModel');

var ImportPendingStateEnum = require('../enum/importPendingStatesEnum');

var BrokenDependencyStrategyEnum = require('../enum/brokenDependencyStrategyEnum');

var LoadingDialog = require('../../export/view/LoadingDialog');

var MergeTenantDialogView = require('./MergeTenantDialogView');

var ImportDependentResourcesDialogView = require('./ImportDependentResourcesDialogView');

var ImportWarningsDialogView = require('./ImportWarningsDialogView');

var warningsFactory = require('../factory/warningsFactory');

var Notification = require("runtime_dependencies/js-sdk/src/common/component/notification/Notification");

var epoxyViewMixin = require("runtime_dependencies/js-sdk/src/common/view/mixin/epoxyViewMixin");

var importTemplate = require("text!../template/importTemplate.htm");

var i18n = require("bundle!ImportExportBundle");

var i18n2 = require("bundle!CommonBundle");

var secretKeyTemplate = require("text!../../templates/secretKeyTemplate.htm");

var CustomKeyModel = require('../../model/CustomKeyModel');

var RepositoryChooserDialogFactory = require("runtime_dependencies/bi-repository/src/bi/repository/dialog/resourceChooser/RepositoryChooserDialogFactory");

var settings = require("settings!treeComponent");

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

var secureKeyTypeEnum = require('../enum/secureKeyTypeEnum');

var importRestErrorCodesEnum = require('../enum/importRestErrorCodesEnum');

var importErrorMessageFactory = require('../factory/importErrorMessageFactory');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved.
 * http://www.jaspersoft.com.
 *
 * Unless you have purchased a commercial license agreement from Jaspersoft,
 * the following license terms apply:
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * @author: Zakhar Tomchenko
 * @version:
 */
// TODO: fix separately
//import '../../../../themes/default/importExport.css';
var ImportView = Backbone.View.extend({
  tagName: "form",
  className: "import-view",
  id: "importDataFile",
  events: {
    "change input[type='file']": "validateFile",
    "change input.jr-jDefaultKey, input.jr-jKeyValue, input.jr-jKeyFile , input.jr-juniversalKeyValue,  input.jr-jCustomKey": "_onKeyTypeChange",
    "input input.jr-jSecretKey": "_onSecretKeyInput",
    "input input.jr-jSecretUri": "_onSecretFileInput",
    "click button.jr-jRepositoryBrowserButton": "_onRepositoryBrowserButtonClick",
    "click .checkBox label": "_clickOnCheckbox",
    "change .control.select.inline": "_onCustomKeyInput"
  },
  computeds: {
    'isKeyUseUniversal': {
      deps: ['keyType'],
      get: function get(keyType) {
        return keyType === secureKeyTypeEnum.UNIVERSALKEY;
      }
    },
    'isKeyUseCustom': {
      deps: ['keyType'],
      get: function get(keyType) {
        return keyType === secureKeyTypeEnum.CUSTOMKEY;
      }
    },
    'isKeyUseValue': {
      deps: ['keyType'],
      get: function get(keyType) {
        return keyType === secureKeyTypeEnum.VALUE;
      }
    },
    'isKeyUseFile': {
      deps: ['keyType'],
      get: function get(keyType) {
        return keyType === secureKeyTypeEnum.FILE;
      }
    }
  },
  initialize: function initialize() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.model || (this.model = new ImportModel(null, {
      form: this.el
    }));
    this.stateModel = new ImportStateModel();
    this.customKeyStateModel = new CustomKeyModel();
    ;
    this.loadingDialog = new LoadingDialog({
      content: i18n2["dialog.overlay.loading"]
    });
    var Dialog = RepositoryChooserDialogFactory.getDialog('item');
    this.keyFileDialog = options.keyFileDialog || new Dialog({
      disableListTab: true,
      treeBufferSize: parseInt(settings.treeLevelLimit, 10),
      resourcesTypeToSelect: [repositoryResourceTypes.SECURE_FILE]
    });
    this.keyFileDialog.on('close', function () {
      if (_this.keyFileDialog.selectedResource && _this.keyFileDialog.selectedResource.resourceUri) {
        var resourceUri = _this.keyFileDialog.selectedResource.resourceUri;

        _this.model.set('secretUri', resourceUri);

        _this._clearSecureKeyErrors();
      }
    });
    this.mergeTenantDialogView = new MergeTenantDialogView();
    this.dependentResourcesDialogView = new ImportDependentResourcesDialogView();
    this.warningsDialogView = new ImportWarningsDialogView();
    this.notification = new Notification();
    this.listenTo(this.stateModel, "change:phase", this._handleImportPhase, this);
    var notFoundNotification = {
      delay: false,
      message: i18n["import.error.cancelled"]
    },
        unexpectedErrorNotification = {
      delay: false,
      message: i18n["import.error.unexpected"]
    };
    this.listenTo(this.model, "change", this._onModelChange);
    this.listenTo(this.model, "error:notFound", _.bind(this.notification.show, this.notification, notFoundNotification));
    this.listenTo(this.stateModel, "error:notFound", _.bind(this.notification.show, this.notification, notFoundNotification));
    this.listenTo(this.model, "error:internalServerError", _.bind(this.notification.show, this.notification, unexpectedErrorNotification));
    this.listenTo(this.stateModel, "error:internalServerError", _.bind(this.notification.show, this.notification, unexpectedErrorNotification));
    this.listenTo(this.model, "error", _.bind(this.loadingDialog.close, this.loadingDialog));
    this.listenTo(this.stateModel, "error", _.bind(this.loadingDialog.close, this.loadingDialog));
    this.listenTo(this.mergeTenantDialogView, "button:import", function () {
      this.model.set("mergeOrganization", true);
      this.doImport();
    }, this);
    this.listenTo(this.mergeTenantDialogView, "button:cancel", _.bind(cancelImportTask, this, ImportStateModel.STATE.CANCELLED));
    this.listenTo(this.dependentResourcesDialogView, "button:skip", applyBrokenDependencyStrategy(this, BrokenDependencyStrategyEnum.SKIP));
    this.listenTo(this.dependentResourcesDialogView, "button:include", applyBrokenDependencyStrategy(this, BrokenDependencyStrategyEnum.INCLUDE));
    this.listenTo(this.dependentResourcesDialogView, "button:cancel", _.bind(cancelImportTask, this, ImportStateModel.STATE.CANCELLED));
    this.epoxifyView();
  },
  render: function render(options) {
    var self = this;
    this.type = options.type;
    this.model.reset(this.type, {
      organization: options.tenantId
    });
    this.$el.html(_.template(importTemplate)({
      i18n: i18n,
      i18n2: i18n2,
      model: _.extend(this.model.toJSON(), {
        secureKeyTypes: secureKeyTypeEnum
      })
    }));
    this.customKeyStateModel.getCustomKeys().done(function (response) {
      if (response && response.length === 0) {
        renderSecTemplate(self, false);
      } else if (response && response.responseJSON && response.responseJSON.error) {
        customKeyFailure(self, response);
      } else {
        self.customKeyElements = response;
        self.model.set('keyAlias', response[0].alias);
        renderSecTemplate(self, true);

        for (var i = 0; i < response.length; ++i) {
          var element = $("<option />").attr("value", response[i].alias);
          element.text(response[i].label ? response[i].label : response[i].alias);
          self.$el.find('#importCustomKey').append(element);
        }
      }

      self.applyEpoxyBindings();
    }).fail(function (response) {
      customKeyFailure(self, response);
    });
    return this;
  },
  validateFile: function validateFile(evt) {
    this.model.set("fileName", $(evt.target).val());
    var $file = $(evt.target),
        $parent = $file.parent();

    if (this.model.isValid(true)) {
      $parent.removeClass("error");
    } else {
      $parent.addClass("error");
    }
  },
  doImport: function doImport() {
    var _this2 = this;

    var dfd = new $.Deferred();
    var self = this;
    this.loadingDialog.open();

    if (this.model.isValid(true)) {
      dfd = this.model.save().fail(function (res) {
        _this2._onImportFail(res);
      }).always(function (res) {
        self.stateModel.set(res);
      });
    } else {
      dfd.reject();
    }

    return dfd;
  },
  _onImportFail: function _onImportFail(res) {
    var errorCode = res.errorCode;

    if (errorCode === importRestErrorCodesEnum.INVALID_SECRET_KEY) {
      this.model.set('invalidKeyError', i18n['import.invalid.secretKey']);
    } else if (errorCode === importRestErrorCodesEnum.INVALID_SECRET_FILE_CONTENT) {
      this.model.set('invalidSecureFileContentError', i18n['import.invalid.secretUri.secretFile']);
    } else if (errorCode === importRestErrorCodesEnum.INVALID_SECRET_FILE) {
      this.model.set('invalidSecureFileContentError', i18n['import.invalid.secretUri']);
    } else if (errorCode === importRestErrorCodesEnum.INVALID_SECRET_KEY_LENGTH) {
      this.model.set('invalidKeyError', i18n['import.invalid.secretKey.length']);
    }
  },
  _handleImportPhase: function _handleImportPhase() {
    var phase = this.stateModel.get("phase");

    if (phase !== ImportStateModel.STATE.INPROGRESS) {
      this.loadingDialog.close();
    }

    if (phase === ImportStateModel.STATE.READY) {
      finishImport.call(this, "import.finished", "success");
    } else if (phase === ImportStateModel.STATE.FAILED) {
      if (this.stateModel.get("error") && this.stateModel.get("error").errorCode) {
        finishImport.call(this, this.stateModel.get("error").errorCode);
      } else if (this.stateModel.get("message")) {
        finishImport.call(this, this.stateModel.get("message"));
      }
    } else if (phase === ImportStateModel.STATE.CANCELLED) {
      finishImport.call(this, "import.error.cancelled");
    } else if (phase === ImportStateModel.STATE.PENDING) {
      finishPendingImport.call(this);
    }
  },
  _onRepositoryBrowserButtonClick: function _onRepositoryBrowserButtonClick() {
    this.keyFileDialog.open();
  },
  _clearSecureKeyErrors: function _clearSecureKeyErrors() {
    this.model.set({
      'invalidKeyError': '',
      'invalidSecureFileContentError': ''
    });
  },
  _onKeyTypeChange: function _onKeyTypeChange(event) {
    var radioValue = event.target.value;
    var element = this.$el.find('input[name ="key-alias"]')[0];
    var index = this.$el.find('#importCustomKey')[0] && this.$el.find('#importCustomKey')[0].selectedIndex;

    if (radioValue == secureKeyTypeEnum.CUSTOMKEY) {
      element.value = $(".control.select.inline").find('option')[index].value;
    } else if (radioValue == secureKeyTypeEnum.UNIVERSALKEY) {
      element.value = radioValue;
    } else if (radioValue == '') {
      element.value = secureKeyTypeEnum.DEFAULTKEY;
    } else {
      element.value = '';
    }

    this.model.set('keyType', radioValue);

    this._clearSecureKeyErrors();
  },
  _onSecretKeyInput: function _onSecretKeyInput(event) {
    var value = event.target.value;
    this.model.set('secretKey', value, {
      silent: true
    });

    this._clearSecureKeyErrors();
  },
  _onSecretFileInput: function _onSecretFileInput(event) {
    var value = event.target.value;
    this.model.set('secretUri', value, {
      silent: true
    });

    this._clearSecureKeyErrors();
  },
  _clickOnCheckbox: function _clickOnCheckbox(evt) {
    var checkbox = $(evt.target).next();

    if (!checkbox[0].disabled) {
      checkbox[0].checked = !checkbox[0].checked;
      checkbox.trigger("change");
    }
  },
  _onCustomKeyInput: function _onCustomKeyInput(evt) {
    var index = evt.target.selectedIndex;
    var element = $(".control.select.inline").find('option')[index];
    this.model.set('keyAlias', element.value, {
      silent: true
    });
    this.$el.find('input[name ="key-alias"]')[0].value = element.value;
  },
  _onModelChange: function _onModelChange() {
    this.model.isValid(true);
  }
});

_.extend(ImportView.prototype, epoxyViewMixin);

function customKeyFailure(self, response) {
  renderSecTemplate(self, false);
  self.applyEpoxyBindings();
  self.notification.show({
    delay: false,
    message: response && response.responseJSON && response.responseJSON.message
  });
  self.trigger('error', self, response);
}

function renderSecTemplate(self, showCustomKey) {
  $(_.template(secretKeyTemplate, {
    i18n: i18n,
    i18n2: i18n2,
    model: _.extend(self.model.toJSON(), {
      secureKeyTypes: secureKeyTypeEnum
    }),
    showCustomKey: showCustomKey,
    showKeyValue: true,
    exportMode: false
  })).insertAfter(self.$el.find('fieldset:first'));
}

function getWarnings() {
  var warnings = this.stateModel.get("warnings");
  return _.map(warnings, function (value) {
    return warningsFactory(value);
  });
}

function finishImport(code, notificationType) {
  notificationType = notificationType || "warning";
  var warnings = getWarnings.call(this);

  if (code === "import.finished" && !_.isEmpty(warnings)) {
    this.warningsDialogView.open({
      items: warnings
    });
  }

  this.notification.show({
    delay: false,
    message: importErrorMessageFactory.create(code),
    type: notificationType
  });
  this.trigger("import:finished", this.model.get("organization"));
  this.model.reset(this.type, {}, this.customKeyElements);
}

function finishPendingImport() {
  var error = this.stateModel.get("error");

  if (error.errorCode === ImportPendingStateEnum.BROKEN_DEPS) {
    this.dependentResourcesDialogView.open({
      items: error.parameters
    });
  } else if (error.errorCode === ImportPendingStateEnum.TENANT_MISMATCH) {
    this.mergeTenantDialogView.open({
      fileTenantId: error.parameters[0],
      selectedTenantId: this.model.get("organization")
    });
  }
}

function applyBrokenDependencyStrategy(self, strategy) {
  return function (str) {
    self.model.set("brokenDependencies", strategy);
    self.doImport();
  };
}

function cancelImportTask(phase) {
  this.model.cancel();
  this.stateModel.set("phase", phase);
}

module.exports = ImportView;

});