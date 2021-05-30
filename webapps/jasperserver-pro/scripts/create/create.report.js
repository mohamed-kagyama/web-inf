define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _runtime_dependenciesJrsUiSrcNamespaceNamespace = require("runtime_dependencies/jrs-ui/src/namespace/namespace");

var JRS = _runtime_dependenciesJrsUiSrcNamespaceNamespace.JRS;

var jQuery = require('jquery');

var dialogs = require("runtime_dependencies/jrs-ui/src/components/components.dialogs");

var _dialogDialogDefinitions = require("../dialog/dialog.definitions");

var GeneratorPropertiesDialog = _dialogDialogDefinitions.GeneratorPropertiesDialog;

var __jrsConfigs__ = require("runtime_dependencies/js-sdk/src/jrs.configs");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @version: $Id: create.report.js 17 2014-07-24 13:14:13Z inesterenko $
 */

/**
 * Module for creating report from Adhoc Data View
 */
JRS.CreateReport = function (jQuery, jrsConfigs) {
  var advSelDialog = null; //this module needs some scripts from PRO in order to run

  var getDialog = function getDialog(advUri) {
    if (!advSelDialog) {
      advSelDialog = new GeneratorPropertiesDialog({
        advUri: advUri,
        okHandler: JRS.CreateReport.showGeneratedReport,
        messages: jrsConfigs
      });
    }

    return advSelDialog;
  };

  return {
    /**
     * Redirects browser page that generates report from advUri Adhoc Data View and displays generated report
     * @param advUri
     */
    showGeneratedReport: function showGeneratedReport(data) {
      var url = "reportGenerator.html?action=displayTempReportUnit" + "&advUri=" + encodeURIComponent(data.sourceURI) + "&template=" + encodeURIComponent(data.template || "") + "&generator=" + encodeURIComponent(data.generator || "") + "&exportFormat=html";
      jQuery.ajax(url, {
        type: 'GET',
        dataType: 'json',
        success: function success(response, textStatus, jqXHR) {
          if (response.status === "OK") {
            window.location = response.data;
          } else {
            dialogs.errorPopup.show(response.data.msg);
          }
        },
        error: function error(jqXHR, textStatus, errorThrown) {
          dialogs.errorPopup.show("Unknown Error");
        }
      });
    },
    selectADV: function selectADV() {
      getDialog().show();
    },
    selectGenerator: function selectGenerator(advUri) {
      getDialog(advUri).show();
    }
  };
}(jQuery, __jrsConfigs__);

jQuery(function () {
  //make sure ajaxbuffer is available
  if (jQuery("#ajaxbuffer").length === 0) {
    jQuery("body").append(jQuery('<div id="ajaxbuffer" style="display:none"></div>'));
  }
});
module.exports = JRS.CreateReport;

});