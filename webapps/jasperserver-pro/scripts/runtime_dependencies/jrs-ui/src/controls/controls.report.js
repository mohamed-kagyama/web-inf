define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $ = _prototype.$;
var $$ = _prototype.$$;

var _namespaceNamespace = require("../namespace/namespace");

var JRS = _namespaceNamespace.JRS;

var layoutModule = require('../core/core.layout');

var Controls = require('./controls.core');

var _utilUtilsCommon = require("../util/utils.common");

var centerElement = _utilUtilsCommon.centerElement;
var matchAny = _utilUtilsCommon.matchAny;
var triggerNativeEvent = _utilUtilsCommon.triggerNativeEvent;
var isIPad = _utilUtilsCommon.isIPad;
var selectAndFocusOn = _utilUtilsCommon.selectAndFocusOn;

var dialogs = require('../components/components.dialogs');

var _controlsBase = require("./controls.base");

var ControlsBase = _controlsBase.ControlsBase;
var OptionsDialog = _controlsBase.OptionsDialog;
var ControlDialog = _controlsBase.ControlDialog;

var ReportOptions = require('./controls.options');

var _namespaceNamespace2 = require("../namespace/namespace");

var isProVersion = _namespaceNamespace2.isProVersion;

var Report = require('../reportViewer/report.view.base');

var inputControlsSettings = require("settings!inputControls");

var jQuery = require('jquery');

var _ = require('underscore');

var ConfirmationDialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/ConfirmationDialog");

var Overlay = require("runtime_dependencies/js-sdk/src/components/overlay/Overlay");

var _coreCoreAjaxUtils = require('../core/core.ajax.utils');

var showErrorPopup = _coreCoreAjaxUtils.showErrorPopup;

require('../reportViewer/report.view.base');

require('./controls.controller');

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
 * @version: $Id$
 */

/* global viewer, confirm, alert, Report */
var isMandatoryInputControls = function isMandatoryInputControls() {
  var atLeastOneParameterDoesntHaveDefaultOrUrlValue = !_.isUndefined(_.find(Report.parametersWithoutDefaultValues, function (parameterName) {
    return !_.contains(_.keys(Report.getAllRequestParameters()), parameterName);
  })); // Report.reportParameterValues means that parameters were saved in flow and were put on jsp, we do it when we go drill through.
  // _.isEmpty(Report.reportParameterValues) means that we are not returning from drill through.

  return Report.hasInputControls && (Report.reportForceControls || atLeastOneParameterDoesntHaveDefaultOrUrlValue && _.isEmpty(Report.reportParameterValues));
};

var ControlsReport = function (jQuery, _, Controls, Report) {
  return _.extend(Controls, {
    _messages: {},
    layouts: {
      LAYOUT_POPUP_SCREEN: 1,
      LAYOUT_SEPARATE_PAGE: 2,
      LAYOUT_TOP_OF_PAGE: 3,
      LAYOUT_IN_PAGE: 4
    },
    controlDialog: null,
    reportOptionsDialog: null,
    inputControlsLocation: null,
    toggleControlsOn: false,
    controller: null,
    hideControls: null,
    selectionChanged: true,
    initialInputControlsFetched: false,
    initialize: function initialize() {
      this.controller = new JRS.Controls.Controller({
        reportUri: Report.reportUnitURI,
        reportOptionUri: Report.reportOptionsURI
      }); // Pre-selected parameters have priority over url ones.

      this.viewModel = Controls.controller.getViewModel();
      this.initializeOptions();

      var confirmInputValues = _.debounce(function () {
        Controls.applyInputValues(true);
      }, Controls.Utils.LOADING_DIALOG_DELAY, true);

      var applyInputValues = _.debounce(function () {
        Controls.applyInputValues();
      }, Controls.Utils.LOADING_DIALOG_DELAY, true);

      var cancelInputValues = _.debounce(function () {
        Controls.cancel();
      }, Controls.Utils.LOADING_DIALOG_DELAY, true);

      var resetInputValues = _.debounce(function () {
        Controls.resetToInitial();
      }, Controls.Utils.LOADING_DIALOG_DELAY, true);

      this.buttonActions = {
        'button#ok': confirmInputValues,
        'button#apply': applyInputValues,
        'button#cancel': cancelInputValues,
        'button#reset': resetInputValues,
        'button#save': Controls.save,
        'button#remove': Controls.remove
      };
      var dialogButtonActions = {
        'button#ok': confirmInputValues,
        'button#cancel': cancelInputValues,
        'button#reset': resetInputValues,
        'button#apply': applyInputValues,
        'button#save': Controls.save,
        'button#remove': Controls.remove
      };

      if ($(ControlsBase.INPUT_CONTROLS_DIALOG)) {
        this.controlDialog = new ControlDialog(dialogButtonActions);
      }

      if ($(ControlsBase.INPUT_CONTROLS_FORM)) {
        $(ControlsBase.INPUT_CONTROLS_FORM).observe('click', function (e) {
          var elem = e.element(); //                observe Input Controls buttons
          //                observe Input Controls buttons

          for (var pattern in this.buttonActions) {
            if (matchAny(elem, [pattern], true)) {
              this.buttonActions[pattern]();
              e.stop();
              return;
            }
          }
        }.bindAsEventListener(this));
      }

      this.inputControlsLocation = $(ControlsBase.INPUT_CONTROLS_CONTAINER) ? $(ControlsBase.INPUT_CONTROLS_CONTAINER) : $(ControlsBase.INPUT_CONTROLS_FORM);

      if ($(ControlsBase.TOOLBAR_CONTROLS_BUTTON)) {
        this.toggleControlsOn = $(ControlsBase.TOOLBAR_CONTROLS_BUTTON).hasClassName('down');
      }

      JRS.Controls.listen({
        'viewmodel:selection:changed': function viewmodelSelectionChanged() {
          Controls.selectionChanged = true;
        },
        'reportoptions:selection:changed': function reportoptionsSelectionChanged(event, data) {
          Controls.selectionChanged = true;
        }
      });
      var mandatoryInputControls = isMandatoryInputControls();
      var shouldFetchInputControlsOnInitialize = mandatoryInputControls || Report.hasInputControls && Controls.layouts.LAYOUT_IN_PAGE === Report.reportControlsLayout;

      if (Report.hasInputControls) {
        var dfd = this._fetchAndSetInputControlsStateOnce().then(function () {
          var viewModel = Controls.controller.getViewModel();
          var isValidSelection = viewModel.areAllControlsValid(); // when their is wrong URL params show control dailog

          if (mandatoryInputControls || !isValidSelection) {
            Controls.show();
            Controls.controlDialog.show();
          } else {
            return Controls.refreshReport()["catch"](function () {
              return jQuery.Deferred().resolve();
            });
          }
        })["catch"](function (xhr) {
          var refreshReportDfd = Controls.refreshReport();
          Controls.Utils.showLoadingDialogOn(refreshReportDfd, null, true);
        }).always(function () {
          var viewModel = Controls.controller.getViewModel();
          var isValidSelection = viewModel.areAllControlsValid();

          if (mandatoryInputControls || !isValidSelection) {
            if (Report && Report.nothingToDisplay) {
              Report.nothingToDisplay.removeClassName(layoutModule.HIDDEN_CLASS);
              centerElement(Report.nothingToDisplay, {
                horz: true,
                vert: true
              });
              jQuery('#' + Report.DATA_REFRESH_BUTTON).attr(layoutModule.DISABLED_ATTR_NAME, layoutModule.DISABLED_ATTR_NAME);
            }
          }
        });

        Controls.Utils.showLoadingDialogOn(dfd, null, true);
      } else {
        var _dfd = Controls.refreshReport();

        Controls.Utils.showLoadingDialogOn(_dfd, null, true);
      }
    },
    initializeOptions: function initializeOptions() {
      function showSubHeader() {
        var parent;

        if (Controls.layouts.LAYOUT_POPUP_SCREEN == Report.reportControlsLayout) {
          parent = jQuery('#' + ControlsBase.INPUT_CONTROLS_DIALOG);
        } else {
          parent = jQuery('#' + ControlsBase.INPUT_CONTROLS_FORM);
        }

        if (parent && parent.length > 0) {
          parent.addClass('showingSubHeader');
        }
      }

      function hideSubHeader() {
        var parent;

        if (Controls.layouts.LAYOUT_POPUP_SCREEN == Report.reportControlsLayout) {
          parent = jQuery('#' + ControlsBase.INPUT_CONTROLS_DIALOG);
        } else {
          parent = jQuery('#' + ControlsBase.INPUT_CONTROLS_FORM);
        }

        if (parent && parent.length > 0) {
          parent.removeClass('showingSubHeader');
        }
      }

      if (isProVersion()) {
        var optionsContainerSelector;

        if (this.layouts.LAYOUT_POPUP_SCREEN == Report.reportControlsLayout) {
          optionsContainerSelector = '#' + ControlsBase.INPUT_CONTROLS_DIALOG + ' .sub.header';
        } else if (this.layouts.LAYOUT_TOP_OF_PAGE == Report.reportControlsLayout) {
          optionsContainerSelector = '#' + ControlsBase.INPUT_CONTROLS_FORM + ' .sub.header';
        } else {
          optionsContainerSelector = '#' + ControlsBase.INPUT_CONTROLS_FORM + ' .sub.header';
        }

        var reportOptions = new ReportOptions();
        reportOptions.fetch(Report.reportUnitURI, Report.reportOptionsURI).done(function () {
          jQuery(optionsContainerSelector).append(reportOptions.getElem());
          Controls.lastReportOptionsSelection = reportOptions.get('selection');
        }).fail(function () {
          jQuery(optionsContainerSelector).addClass('hidden');
        }).always(function () {
          if (!Controls.lastReportOptionsSelection) {
            Controls.lastReportOptionsSelection = reportOptions.get('defaultOption');
          }
        });

        reportOptions.updateWarningMessage = function () {
          Controls.reportOptionsDialog.showWarning(this.error);
        };

        JRS.Controls.listen({
          'viewmodel:selection:changed': function viewmodelSelectionChanged() {
            var option = reportOptions.find({
              uri: Report.reportUnitURI
            });
            reportOptions.set({
              selection: option
            }, true);
          },
          'viewmodel:order:changed': _.bind(function (event, reorderedStructure) {
            Report.newIcOrder = _.pluck(reorderedStructure, 'id').join(';');
          }, this)
        });
        var optionsButtonActions = {
          'button#saveAsBtnSave': function buttonSaveAsBtnSave() {
            var optionName = Controls.reportOptionsDialog.input.getValue();
            var selectedData = Controls.viewModel.get('selection');
            var overwrite = optionName === Controls.reportOptionsDialog.optionNameToOverwrite;
            reportOptions.add(Report.reportUnitURI, optionName, selectedData, overwrite).done(function () {
              Controls.reportOptionsDialog.hideWarning();
              dialogs.systemConfirm.show(ControlsBase.getMessage('report.options.option.saved'));
              showSubHeader();
              var container = reportOptions.getElem().parent();

              if (container.length > 0) {
                container.removeClass('hidden');
              } else {
                jQuery(optionsContainerSelector).removeClass('hidden');
                jQuery(optionsContainerSelector).append(reportOptions.getElem());
              }

              if (Controls.layouts.LAYOUT_TOP_OF_PAGE == Report.reportControlsLayout) {
                jQuery('#' + ControlsBase.INPUT_CONTROLS_FORM + ' .header').removeClass('hidden');
              }

              Controls.reportOptionsDialog.hide();
              delete Controls.reportOptionsDialog.optionNameToOverwrite;
            }).fail(function (err) {
              if (err) {
                try {
                  var errorResponse = JSON.parse(err.responseText); //check on error  for overwrite

                  if (errorResponse.errorCode === 'report.options.dialog.confirm.message') {
                    !overwrite && (Controls.reportOptionsDialog.optionNameToOverwrite = optionName);
                  }
                } catch (e) {} // In this scenario security error is handled earlier, in errorHandler, so we can ignore exception here.
                // Comment this because it will not work in IE, but can be uncommented for debug purpose.
                // console.error("Can't parse server response: %s", "controls.core", err.responseText);

              }
            });
          },
          'button#saveAsBtnCancel': function buttonSaveAsBtnCancel() {
            Controls.reportOptionsDialog.hide();
            delete Controls.reportOptionsDialog.optionNameToOverwrite;
          }
        };

        if ($(ControlsBase.SAVE_REPORT_OPTIONS_DIALOG)) {
          this.reportOptionsDialog = new OptionsDialog(optionsButtonActions);
        }

        this.remove = function () {
          var optionName = reportOptions.get('selection').label;
          var dialog = new ConfirmationDialog({
            text: ControlsBase.getMessage("report.options.option.confirm.remove", {
              option: optionName
            })
          });
          dialog.on("button:yes", function () {
            reportOptions.removeOption(Report.reportUnitURI, reportOptions.get('selection').id).done(function () {
              if (!reportOptions.get('values')) {
                hideSubHeader();
                var container = reportOptions.getElem().parent();

                if (container.length > 0) {
                  container.addClass('hidden');
                } else {
                  jQuery(optionsContainerSelector).addClass('hidden');
                  jQuery(optionsContainerSelector).html('');
                }

                if (Controls.layouts.LAYOUT_TOP_OF_PAGE == Report.reportControlsLayout) {
                  jQuery('#' + ControlsBase.INPUT_CONTROLS_FORM + ' .header').addClass('hidden');
                }
              }

              reportOptions.enableRemoveButton(false); // change the Remove button to Save

              dialogs.systemConfirm.show(ControlsBase.getMessage("report.options.option.removed"));
            });
            dialog.remove();
          });
          dialog.on("button:no", function () {
            dialog.remove();
          });
          dialog.open();
        };

        Controls.reportOptions = reportOptions;
      }
    },
    cancel: function cancel() {
      var isSelectionChanged = Controls.ViewModel.isSelectionChanged(Controls.lastSelection, Controls.viewModel.get('selection'));

      if (Report.reportControlsLayout === Controls.layouts.LAYOUT_SEPARATE_PAGE && Controls.separatePageICLayoutFirstShow) {
        Report.goBack();
      } else {
        var refreshControlsToSelectionDfd = this._refreshControlsToSelection(Controls.lastSelection);

        refreshControlsToSelectionDfd.then(function () {// below call is to fetch report, since we already fetch report with last selected values
          // return Controls.refreshReport().catch(() => {
          //     return jQuery.Deferred().resolve();
          // });
        })["catch"](function (xhr) {
          showErrorPopup(xhr.responseJSON.message);
        }).always(function () {
          if (Report.reportControlsLayout === Controls.layouts.LAYOUT_POPUP_SCREEN) {
            Controls.controlDialog.hide();
          } else if (Report.reportControlsLayout === Controls.layouts.LAYOUT_SEPARATE_PAGE) {
            Controls.showReport();
          }

          if (Controls.reportOptions) {
            if (Controls.lastReportOptionsSelection) {
              Controls.reportOptions.set({
                'selection': Controls.lastReportOptionsSelection
              }, true);
            }
          }
        });
        Controls.Utils.showLoadingDialogOn(refreshControlsToSelectionDfd, null, true);
      }
    },
    _refreshControlsToSelection: function _refreshControlsToSelection(selection) {
      return Controls.controller.resetControlsToSelection(selection);
    },
    getLastSelection: function getLastSelection() {
      return this.lastSelection;
    },
    save: function save() {
      if (Controls.selectionChanged) {
        Controls.controller.validate().then(Controls.showOptionDialog);
      } else {
        Controls.showOptionDialog();
      }
    },
    refreshReport: function refreshReport(checkOnChangedSelection) {
      if (checkOnChangedSelection) {
        var deferred = new jQuery.Deferred();
        var promise = deferred.promise();
        var selectedData = Controls.viewModel.get('selection');
        var isSelectionChanged = JRS.Controls.ViewModel.isSelectionChanged(Controls.lastSelection, selectedData);

        if (!isSelectionChanged) {
          deferred.resolve();
          return promise();
        }
      }

      return this._refreshReportOnConfirm();
    },
    _refreshReportOnConfirm: function _refreshReportOnConfirm() {
      var selectedData = Controls.viewModel.get('selection');
      var promise;

      try {
        if (selectedData && !_.isEmpty(selectedData)) {
          promise = Report.refreshReport(null, null, ControlsBase.buildSelectedDataUri(selectedData));
          Controls.lastSelection = selectedData;
        } else {
          promise = Report.refreshReport();
          Controls.lastSelection = {};
        }

        return promise;
      } catch (ex) {
        return jQuery.Deferred().reject(ex);
      }
    },
    _refreshReportOnApply: function _refreshReportOnApply() {
      var dfd = jQuery.Deferred();
      var selectedData = Controls.viewModel.get('selection');

      if (selectedData && !_.isEmpty(selectedData)) {
        return Report.refreshReport(null, null, ControlsBase.buildSelectedDataUri(selectedData));
      }

      return dfd.resolve();
    },
    applyInputValues: function applyInputValues(hideControls) {
      var viewModel = Controls.viewModel;

      if (Controls.selectionChanged) {
        Controls.controller.validate().then(function (areAllControlsValid) {
          if (areAllControlsValid) {
            var lastSuccessfulSelection = Controls.lastSelection;
            var lastSuccessfulReportOption;

            if (Controls.reportOptions) {
              lastSuccessfulReportOption = Controls.lastReportOptionsSelection;
            } // Fix for bug #42128 - jive must be hidden before applying input controls values


            window.viewer && window.viewer.jive && window.viewer.jive.hide();
            var refreshReportPromise = Controls.refreshReport();
            refreshReportPromise && refreshReportPromise.then(function () {
              Controls.selectionChanged = false;
              hideControls && Controls.hide();
            }, function () {
              // using overlay here solely for this error dialog,
              // because components.dialogs share state, closing built-in pageDimmer
              // when the option is set to make it visible
              var overlay = new Overlay({
                zIndex: dialogs.errorPopup.getZIndex() - 1
              });
              jQuery("body").append(overlay.$el);
              overlay.show(); //application of input controls was failed probably because of
              //report cancellation
              //in this case if hideControls is true we have to set values to
              //latest successfull value

              Controls.lastSelection = lastSuccessfulSelection;
              Controls.lastReportOptionsSelection = lastSuccessfulReportOption; // refresh report with IC after an error, on error dialog close

              dialogs.errorPopup.onClose = function () {
                Report.hasError = true;

                if (Controls.lastSelection && !_.isEmpty(Controls.lastSelection)) {
                  Report.refreshReport(null, null, ControlsBase.buildSelectedDataUri(Controls.lastSelection));
                } else {
                  Report.refreshReport();
                }

                overlay.remove();
              };

              if (hideControls) {
                Controls.cancel();
                Controls.hide();
                Controls.selectionChanged = false;
              }
            });

            if (Controls.reportOptions) {
              Controls.lastReportOptionsSelection = Controls.reportOptions.get('selection');

              if (!refreshReportPromise) {
                dialogs.popup.hide($('loading'));
              }
            }
          }
        });
      } else if (viewModel.areAllControlsValid()) {
        hideControls && Controls.hide();
      }
    },
    resetToInitial: function resetToInitial() {
      var refreshControlsToSelectionDfd = this._refreshControlsToSelection(Controls.initialSelection).then(function () {
        Controls.selectionChanged = true; // after reset button click "saved values" dropdown should be update

        var reportOptions = Controls.reportOptions;

        if (reportOptions) {
          var option = reportOptions.find({
            uri: Report.reportOptionsURI ? Report.reportOptionsURI : Report.reportUnitURI
          });

          if (option) {
            reportOptions.set({
              selection: option
            });
            return;
          }
        }
      }, function (xhr) {
        showErrorPopup(xhr.responseJSON.message);
      });

      Controls.Utils.showLoadingDialogOn(refreshControlsToSelectionDfd, null, true); // Controls.selectionChanged = true;
      //
      // var reportOptions = Controls.reportOptions;
      //
      // if (reportOptions) {
      //     var option = reportOptions.find({ uri: Report.reportOptionsURI ? Report.reportOptionsURI : Report.reportUnitURI });
      //     if (option) {
      //         reportOptions.set({ selection: option });
      //         return;
      //     }
      // }
      //
      // var finalInitialParameters = null;
      //
      // if (inputControlsSettings.useUrlParametersOnReset === 'true') {
      //     //use params passed through url as defaults
      //     finalInitialParameters = _.extend(Report.getAllRequestParameters(), Report.reportParameterValues);
      // }
      //
      // Controls.controller.reset(null, finalInitialParameters);
    },
    show: function show() {
      switch (Report.reportControlsLayout) {
        case 2:
          Controls.showControls();
          break;

        case 3:
          Controls.toggleControls();
          break;

        case 4:
          /* Controls "in page" cannot be opened or closed, they're always shown. */
          break;

        default:
          Controls.showDialog();
      }
    },
    hide: function hide() {
      switch (Report.reportControlsLayout) {
        case 2:
          Controls.showReport();
          break;

        case 3:
          /* Controls "top of page" can be closed only using input controls button. */
          break;

        case 4:
          /* Controls "in page" cannot be opened or closed, they're always shown. */
          break;

        default:
          Controls.controlDialog.hide();
      }
    },
    toggleControls: function toggleControls() {
      var hideInputControlsPanel = function hideInputControlsPanel() {
        $(ControlsBase.TOOLBAR_CONTROLS_BUTTON).removeClassName('down').addClassName('up');
        $$('.panel.pane.inputControls')[0].addClassName(layoutModule.HIDDEN_CLASS); // Due to the html markup of the AdHoc Chart, there is an issue when the
        // AdHoc Chart Report is rendering and there is an TopOfThePage Control there:
        // they interfere with each other because AdHoc uses absolute positioning to get as much space as it needs,
        // and this prevents controls from being visible.
        // So, when controls are getting closed, we need to re-launch the "resize" event to let viewer.js to re-calculate the position of the window
        // TODO: This should use eventAutomation.triggerNativeEvent when this is converted to use RequireJS

        triggerNativeEvent('resize');
      };

      var showInputControlsPanel = function showInputControlsPanel() {
        $(ControlsBase.TOOLBAR_CONTROLS_BUTTON).removeClassName('up').addClassName('down');
        $$('.panel.pane.inputControls')[0].removeClassName(layoutModule.HIDDEN_CLASS);
      };

      if (Controls.toggleControlsOn) {
        hideInputControlsPanel();
      } else {
        this._fetchAndSetInputControlsStateOnce().then(function () {
          showInputControlsPanel();
        })["catch"](function (xhr) {
          showErrorPopup(xhr.responseJSON.message);
        });
      }

      Controls.toggleControlsOn = !Controls.toggleControlsOn;
      isIPad() && Report.touchController.reset();
      /**
       * Fix to force rendering of input controls on webkit.
       */

      jQuery('#' + ControlsBase.INPUT_CONTROLS_FORM).show().height();
    },
    showDialog: function showDialog() {
      if (Controls.controlDialog) {
        this._fetchAndSetInputControlsStateOnce().then(function () {
          Controls.controlDialog.show();
        })["catch"](function (xhr) {
          showErrorPopup(xhr.responseJSON.message);
        });
      }
    },
    showReport: function showReport() {
      $(layoutModule.PAGE_BODY_ID).removeClassName(layoutModule.CONTROL_PAGE_CLASS).addClassName(layoutModule.ONE_COLUMN_CLASS);
    },
    showControls: function showControls() {
      var showControlsPage = function showControlsPage() {
        $(layoutModule.PAGE_BODY_ID).removeClassName(layoutModule.ONE_COLUMN_CLASS).addClassName(layoutModule.CONTROL_PAGE_CLASS);
        document.getElementById(ControlsBase.INPUT_CONTROLS_FORM) && jQuery('#' + ControlsBase.INPUT_CONTROLS_FORM).show();
      };

      this._fetchAndSetInputControlsStateOnce().then(function () {
        showControlsPage();
      })["catch"](function (xhr) {
        showErrorPopup(xhr.responseJSON.message);
      });
    },
    showOptionDialog: function showOptionDialog() {
      JRS.Controls.Utils.wait(200).then(function () {
        //workaround for bug 27415,
        //because can't prevent bubbling up to parent dialog window,
        //so add delay and only then shows options dialog on top of controls dialog
        if (Controls.viewModel.areAllControlsValid()) {
          Controls.reportOptionsDialog.show();
          selectAndFocusOn(Controls.reportOptionsDialog.input);
        }
      });
    },
    _fetchAndSetInputControlsStateOnce: function _fetchAndSetInputControlsStateOnce() {
      var _this = this;

      var dfd = jQuery.Deferred();

      if (!this.initialInputControlsFetched) {
        var allRequestParameters = _.extend(Report.getAllRequestParameters(), Report.reportParameterValues);

        this.controller.fetchAndSetInputControlsState(allRequestParameters).then(function () {
          _this.initialInputControlsFetched = true;
          var viewModel = Controls.controller.getViewModel();
          var selection = viewModel.get('selection');
          Controls.lastSelection = selection;
          Controls.initialSelection = selection;
          return dfd.resolve();
        }, function () {
          dfd.reject.apply(dfd, arguments);
        });
        Controls.Utils.showLoadingDialogOn(dfd, null, true);
      } else {
        dfd.resolve();
      }

      return dfd;
    }
  });
}(jQuery, _, Controls, Report);

module.exports = ControlsReport;

});