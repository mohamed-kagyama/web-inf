define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _runtime_dependenciesJrsUiSrcNamespaceNamespace = require("runtime_dependencies/jrs-ui/src/namespace/namespace");

var JRS = _runtime_dependenciesJrsUiSrcNamespaceNamespace.JRS;

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var addDataToForm = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.addDataToForm;

var _ = require('underscore');

var jQuery = require('jquery');

require("runtime_dependencies/jrs-ui/src/controls/controls.controller");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @version: $Id$
 */
JRS.EditOptions = function (jQuery, _, Controls) {
  return Controls.Base.extend({
    constructor: function constructor(formSelector, reportOptionUri) {
      this.controlsController = new Controls.Controller({
        reportUri: reportOptionUri
      });
      this.viewModel = this.controlsController.getViewModel();
      this.controlsController.fetchAndSetInputControlsState(); // Observe Edit Report Options Page

      var form = jQuery(formSelector);
      form.on("click", "button#done", _.bind(this.handleClick, this, form[0], "save"));
      form.on("click", "button#cancel", _.bind(this.handleClick, this, form[0], "cancel"));
    },
    handleClick: function handleClick(form, eventId, event) {
      event.preventDefault();
      form.method = "post";
      form._eventId.value = eventId;

      if (eventId == "cancel") {
        form.submit();
      } else if (eventId == "save") {
        this.controlsController.validate().then(_.bind(function (areControlsValid) {
          areControlsValid && this.submitForm(form);
        }, this));
      }
    },
    submitForm: function submitForm(form) {
      var postData = this.viewModel.get('selection');
      if (postData) addDataToForm(form, postData);
      form.submit();
    }
  });
}(jQuery, _, JRS.Controls);

module.exports = JRS.EditOptions;

});