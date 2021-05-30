define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var Backbone = require('backbone');

var resourceType = require('../../enum/scheduledResourceTypeEnum');

var ParametersTabCe = require("runtime_dependencies/jrs-ui/src/scheduler/view/editor/ParametersTabView");

var DashboardModel = require("runtime_dependencies/bi-dashboard/src/dashboard/model/DashboardModel");

var dashboardSettings = require("runtime_dependencies/bi-dashboard/src/dashboard/dashboardSettings");

var dashboardComponentViewFactory = require("runtime_dependencies/bi-dashboard/src/dashboard/factory/dashboardComponentViewFactory");

var DashboardControlsController = require('../../model/dashboardControlsControllerAdapter');

var _runtime_dependenciesJrsUiSrcControlsControlsBase = require("runtime_dependencies/jrs-ui/src/controls/controls.base");

var OptionsDialog = _runtime_dependenciesJrsUiSrcControlsControlsBase.OptionsDialog;

var _runtime_dependenciesJrsUiSrcNamespaceNamespace = require("runtime_dependencies/jrs-ui/src/namespace/namespace");

var JRS = _runtime_dependenciesJrsUiSrcNamespaceNamespace.JRS;

require('../../../controls/controls.options');

require("runtime_dependencies/jrs-ui/src/controls/controls.controller");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
// return backbone view
module.exports = ParametersTabCe.extend({
  events: {
    'click [name=saveCurrentValuesButton]': 'saveCurrentValuesClick'
  },
  // initialize view
  initialize: function initialize(options) {
    var result = ParametersTabCe.prototype.initialize.apply(this, arguments);
    this.listenTo(this.model, 'change:source', this.sourceChangeReportOptions);
    return result;
  },
  remove: function remove() {
    if (this.reportOptionsDialog) {
      this.reportOptionsDialog.remove();
    }

    return Backbone.View.prototype.remove.apply(this, arguments);
  },
  render: function render() {
    var result = ParametersTabCe.prototype.render.apply(this, arguments);

    if (this.model.resourceType !== resourceType.DASHBOARD) {
      // create report options instance
      this.reportOptions = new JRS.Controls.ReportOptions(); // handle selection change
      // handle selection change

      $(document).on('viewmodel:selection:changed', _.bind(this.viewModelSelectionChange, this)); // construct save values dialog
      // TODO: use a new dialog or create one
      // construct save values dialog
      // TODO: use a new dialog or create one

      this.reportOptionsDialog = new OptionsDialog({
        'button#saveAsBtnSave': _.bind(this.saveAsDialogButtonSaveClick, this),
        'button#saveAsBtnCancel': _.bind(this.saveAsDialogButtonCancelClick, this)
      });
    }

    return result;
  },
  saveCurrentValuesClick: function saveCurrentValuesClick() {
    this.reportOptionsDialog.show();
  },
  saveAsDialogButtonSaveClick: function saveAsDialogButtonSaveClick() {
    var self = this,
        optionName = this.reportOptionsDialog.input.getValue(),
        selectedData = this.model.controlsController.getViewModel().get('selection'),
        overwrite = optionName === this.reportOptionsDialog.optionNameToOverwrite;
    $.when(this.reportOptions.add(this.reportOptions.optionsUrl || this.reportOptions.url, optionName, selectedData, overwrite)).done(function () {
      self.reportOptionsDialog.hideWarning();
      var container = self.reportOptions.getElem().parent();

      if (container.length === 0) {
        container = self.$el.find('.saveCurrentValuesContainer');
        container.append(self.reportOptions.getElem());
      }

      self.reportOptionsDialog.hide();
      delete self.reportOptionsDialog.optionNameToOverwrite;
    }).fail(function (err) {
      try {
        var response = JSON.parse(err.responseText);

        if (response.errorCode === 'report.options.dialog.confirm.message') {
          !overwrite && (self.reportOptionsDialog.optionNameToOverwrite = optionName);
        }

        self.reportOptionsDialog.showWarning(response.message);
      } catch (e) {} // In this scenario security error is handled earlier, in errorHandler, so we can ignore exception here.
      // Comment this because it will not work in IE, but can be uncommented for debug purpose.
      // console.error("Can't parse server response: %s", "controls.core", err.responseText);

    });
  },
  saveAsDialogButtonCancelClick: function saveAsDialogButtonCancelClick() {
    this.reportOptionsDialog.hide();
  },
  sourceChange: function sourceChange(model, value) {
    if (this.model.resourceType === resourceType.DASHBOARD) {
      this.$('.saveCurrentValuesContainer').hide();
      var fetch = !this.dashboardModel || this.dashboardModel.get('uri') !== value.reportUnitURI,
          jobModel = this.model;

      if (!this.dashboardModel) {
        dashboardSettings.CONTEXT_PATH = '..';
        var $canvasBody = this.$('#inputControlsContainer'),
            self = this;
        this.dashboardModel = new DashboardModel({
          uri: value.reportUnitURI
        }, {
          contextPath: dashboardSettings.CONTEXT_PATH
        });
        this.dashboardModel.on('propertiesAvailable', function (propertiesModel) {
          if (propertiesModel.get('useFixedSize')) {
            self.model.fixedSize = true;
            self.model.update('source', {
              referenceWidth: propertiesModel.get('fixedWidth'),
              referenceHeight: propertiesModel.get('fixedHeight')
            });
          } else {
            var source = self.model.get('source');
            self.model.update('source', {
              referenceWidth: source.referenceWidth || dashboardSettings.DEFAULT_REFERENCE_WIDTH,
              referenceHeight: source.referenceHeight || dashboardSettings.DEFAULT_REFERENCE_HEIGHT
            });
          }
        });
        this.dashboardModel.foundations.on('addComponent', function (componentModel, foundationModel) {
          if (foundationModel === self.dashboardModel.currentFoundation && componentModel.get('type') === 'inputControl') {
            self.dashboardModel.hasControls = true;

            (function (name, id) {
              componentModel.on(name, function (value) {
                var source = jobModel.get('source');
                source.parameters.parameterValues[id] = value;
                jobModel.set('source', source);
              });
              self.model.get('source').parameters.parameterValues[name] && componentModel.set('value', self.model.get('source').parameters.parameterValues[name]);
            })(componentModel.getOwnerParameterName(), componentModel.id);

            var componentView = dashboardComponentViewFactory({
              model: componentModel,
              dashboardProperties: self.dashboardModel.currentFoundation.components.getDashboardPropertiesComponent(),
              dashboardId: value.reportUnitURI
            });
            self.model.controlsController.controls.push(componentView);
            $canvasBody.append(componentView.render().$el);
          }
        });
        this.model.controlsController = new DashboardControlsController(this.model);
      }

      fetch && this.dashboardModel.fetch().done(function () {
        self.trigger(self.dashboardModel.hasControls ? 'IC_Displayed' : 'failedToGet_IC');
      }).fail(function () {
        self.trigger('failedToGet_IC');
      });
    } else {
      ParametersTabCe.prototype.sourceChange.apply(this, arguments);
    }
  },
  sourceChangeReportOptions: function sourceChangeReportOptions(model, value) {
    var self = this,
        url = value && value.reportUnitURI; // if url changed, fetch new data
    // if url changed, fetch new data

    if (this.reportOptions && url !== this.reportOptions.url) {
      // fetch new data
      this.reportOptions.optionsUrl = undefined;
      this.model.resource('reportOptions', this.model.get('source').reportUnitURI, function (err, data) {
        if (err) {
          return;
        }

        self.reportOptions.optionsUrl = data.reportUri;
        $.when(self.reportOptions.fetch(data.reportUri || url, '')).done(function () {
          self.$el.find('.saveCurrentValuesContainer').append(self.reportOptions.getElem());
          $(document).trigger('viewmodel:selection:changed');
        });
      });
      var folderUri = this.model.get('repositoryDestination').folderURI;
      this.model.checkPermissionOnFolder(folderUri, function (err, permission) {
        var saveButtonEnabled = false;

        if (!err) {
          saveButtonEnabled = permission === 1 || permission === 30;
        }

        self.$el.find('[name=saveCurrentValuesButton]').attr('disabled', saveButtonEnabled ? null : 'disabled');
      }); // save new url
      // save new url

      this.reportOptions.url = url;
    }
  },
  viewModelSelectionChange: function viewModelSelectionChange() {
    // update options
    var option = this.reportOptions.find({
      uri: this.reportOptions.url
    });
    this.reportOptions.set({
      selection: option
    }, true);
  }
});

});