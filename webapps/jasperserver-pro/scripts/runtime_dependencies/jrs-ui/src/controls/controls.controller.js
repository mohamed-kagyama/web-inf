define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var jQuery = require('jquery');

var _namespaceNamespace = require("../namespace/namespace");

var JRS = _namespaceNamespace.JRS;

var _ = require('underscore');

var request = require("request");

var InputControlsService = require('./rest/InputControlsService');

var InputControlsServiceWithCache = require('./rest/InputControlsServiceWithCache');

var InputControlsReportViewerService = require('./service/InputControlsReportViewerService');

var _coreCoreAjaxUtils = require('../core/core.ajax.utils');

var showErrorPopup = _coreCoreAjaxUtils.showErrorPopup;

require('./controls.core');

require('./controls.datatransfer');

require('./controls.viewmodel');

require('./controls.components');

require('jquery.urldecoder');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var validatePaginatedValuesResponse = function validatePaginatedValuesResponse(response, controls) {
  var controlsData = response && response.inputControlState ? response.inputControlState : [];
  var areControlsValid = true;
  controlsData.forEach(function (controlData) {
    var control = controls[controlData.id];

    if (control && control.get('error')) {
      control.set({
        error: null
      });
    }

    if (controlData.error) {
      control.set({
        error: controlData.error
      });
      areControlsValid = false;
    }
  });
  return areControlsValid;
};

;

(function (jQuery, _, Controls) {
  //module:
  //
  //  controls.controller
  //
  //summary:
  //
  //  Connect input controls with server
  //
  //main types:
  //
  //  Controller - provide common functions around input controls, like update, reset, etc.
  //
  //dependencies:
  //
  //  jQuery          - v1.7.1
  //  _,              - underscore.js 1.3.1
  //  Controls        - controls.viewmodel and controls.datatransfer
  return _.extend(Controls, {
    //Provides common operations under input controls
    Controller: Controls.Base.extend({
      constructor: function constructor(options) {
        var _this = this;

        _.bindAll(this, "getViewModel", "resetControlsToSelection", "validate");

        this.inputControlsService = new InputControlsServiceWithCache({
          inputControlsService: new InputControlsService({
            request: request
          })
        });
        this.inputControlsReportViewerService = new InputControlsReportViewerService({
          inputControlsService: this.inputControlsService
        });
        this.viewModel = options && options.viewModel ? options.viewModel : new Controls.ViewModel(); // Common initialization

        this.initialize(options);
        Controls.ignore('reportoptions:selection:changed');
        Controls.listen({
          "viewmodel:selection:changed": function viewmodelSelectionChanged() {
            _this._onViewModelSelectionChange.apply(_this, arguments);
          },
          "reportoptions:selection:changed": function reportoptionsSelectionChanged() {
            _this._onReportOptionsSelectionChanged.apply(_this, arguments);
          }
        });
        Controls.getController = _.bind(function () {
          return this;
        }, this); // Triggered right after controller is initialized but before
        // this allows custom code to listen when controls are actually initialized
        // and override draw method of viewModel

        jQuery(document).trigger('controls:initialized', [this.getViewModel()]);
      },
      _onViewModelSelectionChange: function _onViewModelSelectionChange(event, controlId, value, inCascade) {
        var _this2 = this;

        var viewModel = this.getViewModel();
        var controls = viewModel.getControls();

        if (value && inCascade) {
          var dfd = this.inputControlsReportViewerService.fetchInputControlsValuesOnControlSelectionChange({
            controlId: controlId,
            value: value,
            uri: this.dataUri,
            structure: viewModel.structure,
            selection: viewModel.get('selection'),
            initialSelectedValues: viewModel.controlsOptions.initialSelectedValues
          }).then(function (response, selectionPerControl, paginationOptions) {
            var promises = paginationOptions.map(function (controlPaginationOptions) {
              var controlId = controlPaginationOptions.name;
              return controls[controlId].fetch(_this2.dataUri, paginationOptions);
            });
            return jQuery.when.apply(jQuery, _toConsumableArray(promises)).then(function () {
              return jQuery.Deferred().resolve(selectionPerControl, response);
            });
          }).then(function (selectionPerControl, response) {
            selectionPerControl = _extends({}, selectionPerControl, _defineProperty({}, controlId, value));

            _.each(selectionPerControl, function (values, id) {
              controls[id].set({
                values: values
              });
            });

            validatePaginatedValuesResponse(response, controls);
          })["catch"](function (xhr) {
            var control = controls[controlId];
            control.set({
              values: control.selection
            });
            showErrorPopup(xhr.responseJSON.message);
            return jQuery.Deferred().reject(xhr);
          });
          Controls.Utils.showLoadingDialogOn(dfd, null, true);
        } else {
          controlId && this.viewModel.controls[controlId].set({
            'selection': value
          }, true);
        }
      },
      _onReportOptionsSelectionChanged: function _onReportOptionsSelectionChanged(event, data) {
        var _this3 = this;

        var reportOption = data.reportOption,
            previousReportOption = data.previousReportOption;
        var viewModel = this.viewModel;
        var controls = viewModel.getControls();
        this.dataUri = reportOption && reportOption.uri || this.dataUri;
        var dfd = this.inputControlsReportViewerService.fetchInitialInputControlsValuesByUri(this.dataUri, viewModel.structure).then(function (options) {
          var selection = options.selection,
              paginatedValuesResponse = options.paginatedValuesResponse,
              paginationOptionsPerControl = options.paginationOptionsPerControl;

          var promises = _.map(paginationOptionsPerControl, function (controlPaginatedOptions, id) {
            var control = controls[id]; // update initialselectedvalues on report option change

            control.updateSelectionOnOptionChange && control.updateSelectionOnOptionChange(selection[id] || []);
            return control.fetch(_this3.dataUri, controlPaginatedOptions);
          });

          return jQuery.when.apply(jQuery, _toConsumableArray(promises)).then(function () {
            return jQuery.Deferred().resolve(selection, paginatedValuesResponse);
          });
        }).then(function (selection, response) {
          _.each(selection, function (controlSelection, key) {
            controls[key].set({
              values: controlSelection.map(function (option) {
                return option.value;
              })
            });
          });

          validatePaginatedValuesResponse(response, controls);
        })["catch"](function (xhr) {
          showErrorPopup(xhr.responseJSON.message);
          Controls.reportOptions.set({
            selection: previousReportOption
          }, true);
          return jQuery.Deferred().reject(xhr);
        });
        Controls.Utils.showLoadingDialogOn(dfd, null, true);
      },

      /**
       * Common initialization method that can be overridden by inherited classes
       * @param args
       */
      initialize: function initialize(options) {
        this.dataUri = options.reportOptionUri || options.reportUri;
      },
      fetchAndSetInputControlsState: function fetchAndSetInputControlsState(allRequestParameters) {
        var _this4 = this;

        var dfd = this.inputControlsReportViewerService.fetchInputControlsInitialState(this.dataUri, allRequestParameters).then(function (options) {
          if (options) {
            _this4.viewModel.set({
              structure: options.structure,
              controlsOptions: {
                dataUri: _this4.dataUri,
                inputControlsService: _this4.inputControlsService,
                initialSelectedValues: options.selection,
                paginatedValuesOptions: options.paginationOptionsPerControl,
                paginatedValuesResponse: options.paginatedValuesResponse
              }
            });

            var viewModel = _this4.getViewModel();

            var controls = viewModel.getControls();
            validatePaginatedValuesResponse(options.paginatedValuesResponse, controls);
          }

          return jQuery.Deferred().resolve(options);
        });
        Controls.Utils.showLoadingDialogOn(dfd, null, true);
        return dfd;
      },
      //Returns object responsible for initialization and drawing of controls
      getViewModel: function getViewModel() {
        return this.viewModel;
      },
      //update controls by given selection or by current selection
      resetControlsToSelection: function resetControlsToSelection(selectedData) {
        var _this5 = this;

        var viewModel = this.getViewModel();
        var controls = viewModel.getControls();

        if (!selectedData) {
          selectedData = viewModel.get("selection");
        }

        return this.inputControlsReportViewerService.fetchInputControlsOptionsBySelectionAndUri(selectedData, this.dataUri, viewModel.structure).then(function (response, paginationOptions, paginationOptionsPerControl) {
          var promises = paginationOptions.map(function (controlPaginationOptions) {
            var control = controls[controlPaginationOptions.name];
            return control.fetch(_this5.dataUri, paginationOptionsPerControl[controlPaginationOptions.name] || paginationOptions);
          });
          return jQuery.when.apply(jQuery, _toConsumableArray(promises)).then(function () {
            return response;
          });
        }).then(function (response) {
          validatePaginatedValuesResponse(response, controls);

          _.each(controls, function (control, id) {
            var value = selectedData[id];
            var options;

            if (value) {
              options = {
                values: value
              };
            } else {
              options = {
                error: null,
                values: undefined,
                selection: undefined
              };
            }

            control.reset(options);
          });
        });
      },
      //validate controls values and update only invalid controls
      validate: function validate() {
        var viewModel = this.getViewModel();
        var controls = viewModel.getControls();
        var selectedData = viewModel.get("selection");
        var dfd = jQuery.Deferred();
        this.inputControlsReportViewerService.fetchInputControlsOptionsBySelectionAndUri(selectedData, this.dataUri, viewModel.structure).then(function (response) {
          var areControlsValid = validatePaginatedValuesResponse(response, controls);

          if (areControlsValid) {
            return dfd.resolve(areControlsValid);
          }

          return dfd.reject();
        });
        Controls.Utils.showLoadingDialogOn(dfd, null, true);
        return dfd;
      }
    })
  });
})(jQuery, _, JRS.Controls);

module.exports = JRS.Controls;

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

});