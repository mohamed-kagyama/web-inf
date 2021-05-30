define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var requestSettings = require("settings!request");

var request = require("request");

var time = require("runtime_dependencies/js-sdk/src/common/util/parse/time");

var i18n = require("bundle!CommonBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/*confirm __resourceQuery */

/*globals confirm*/
var ONE_SEC = 1000;
var DEFAULT_TIMEOUT_WARNING_DELAY = 120 * ONE_SEC;
var maxInactiveInterval = requestSettings['maxInactiveInterval'];
maxInactiveInterval = maxInactiveInterval <= 0 ? 0 : maxInactiveInterval * ONE_SEC;

module.exports = function (options) {
  var timeoutWarningDelay;

  if (options) {
    timeoutWarningDelay = options.timeoutWarningDelay * ONE_SEC || DEFAULT_TIMEOUT_WARNING_DELAY;
  }

  var _timeoutHandle,
      timeout = maxInactiveInterval > timeoutWarningDelay ? maxInactiveInterval - timeoutWarningDelay : maxInactiveInterval / 2,
      timeUntilExpiration = maxInactiveInterval > timeoutWarningDelay ? timeoutWarningDelay : maxInactiveInterval / 2,
      $document;

  if (maxInactiveInterval) {
    $document = $(window.document);
    $document.on('request:before', sessionExpirationHandler);
    $document.on('request:success', sessionExpirationHandler);
  }

  function sessionExpirationHandler() {
    _timeoutHandle && clearTimeout(_timeoutHandle);
    _timeoutHandle = setTimeout(function () {
      var keepAlive = showSessionExpirationWarning();

      if (keepAlive) {
        // TODO make endpoint for session expiration (checkSession)
        request({
          url: requestSettings['contextPath'] + '/rest_v2/resources/'
        });
      }
    }, timeout);
  }

  function showSessionExpirationWarning() {
    var expirationDate = new Date(new Date().getTime() + timeUntilExpiration),
        expirationTime = time.timeToIso8061Time(expirationDate.getHours(), expirationDate.getMinutes(), expirationDate.getSeconds());
    return confirm(i18n['session.expiration.warning'] + ' ' + expirationTime);
  }

  return {
    handle: sessionExpirationHandler,
    showWarning: showSessionExpirationWarning
  };
};

});