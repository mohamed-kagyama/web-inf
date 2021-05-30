define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $ = _prototype.$;

var _runtime_dependenciesJrsUiSrcCoreCoreAjaxUtils = require("runtime_dependencies/jrs-ui/src/core/core.ajax.utils");

var showErrorPopup = _runtime_dependenciesJrsUiSrcCoreCoreAjaxUtils.showErrorPopup;
var baseErrorHandler = _runtime_dependenciesJrsUiSrcCoreCoreAjaxUtils.baseErrorHandler;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/*globals alert*/
function showMessageDialog(ajaxError, ajaxErrorHeader) {
  alert(ajaxError + '\n' + ajaxErrorHeader);
}

var errorHandler = function errorHandler(ajaxAgent) {
  clearTimeout(window.cancelQueryTimer);
  window.cancelQueryTimer = null;
  var sessionTimeout = ajaxAgent.getResponseHeader('LoginRequested');

  if (sessionTimeout) {
    document.location = window.urlContext;
    return true;
  } // case of overwrite prompt
  // case of overwrite prompt


  var fileExistsMessage = ajaxAgent.getResponseHeader('fileExistsException');
  /**
  * need to decode message because it has been encoded on server because rfc 2047 states
  * we need to encode header values that contain non-ascii characters
  */

  /**
   * need to decode message because it has been encoded on server because rfc 2047 states
   * we need to encode header values that contain non-ascii characters
   */

  if (fileExistsMessage) {
    fileExistsMessage = decodeURIComponent(fileExistsMessage); //handled by custom handler.
    //handled by custom handler.

    return true;
  } // case of multiple files with same label alert
  // case of multiple files with same label alert


  var multipleFileExistsMessage = ajaxAgent.getResponseHeader('multipleFileExistException');
  /**
  * need to decode message because it has been encoded on server because rfc 2047 states
  * we need to encode header values that contain non-ascii characters
  */

  /**
   * need to decode message because it has been encoded on server because rfc 2047 states
   * we need to encode header values that contain non-ascii characters
   */

  if (multipleFileExistsMessage) {
    multipleFileExistsMessage = decodeURIComponent(multipleFileExistsMessage); // used as delimiter to replace whitespaces before encoding on server side. Need to replace them
    // used as delimiter to replace whitespaces before encoding on server side. Need to replace them

    alert(multipleFileExistsMessage.replace(/@@/g, ' ')); //in this case the response has come back and we need to give the user a chance to re-submit so lets enable
    //the save button
    //in this case the response has come back and we need to give the user a chance to re-submit so lets enable
    //the save button

    if ($('saveAsBtnSave')) {
      $('saveAsBtnSave').disabled = false;
    }

    return true;
  } // other adhoc error
  // other adhoc error


  var adhocException = ajaxAgent.getResponseHeader('adhocException');

  if (adhocException) {
    var errorMessage = decodeURIComponent(adhocException); // used as delimiter to replace whitespaces before encoding on server side. Need to replace them
    // used as delimiter to replace whitespaces before encoding on server side. Need to replace them

    showErrorPopup(errorMessage.replace(/@@/g, ' '));
    return true;
  } // handle JasperServerError
  // handle JasperServerError


  return baseErrorHandler(ajaxAgent);
};

exports.showErrorPopup = showErrorPopup;
exports.showMessageDialog = showMessageDialog;
exports.errorHandler = errorHandler;
exports.baseErrorHandler = baseErrorHandler;

});