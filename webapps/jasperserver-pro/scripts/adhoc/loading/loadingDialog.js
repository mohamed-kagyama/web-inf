define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var dialogs = require("runtime_dependencies/jrs-ui/src/components/components.dialogs");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var DEFAULT_DELAY = 300;

function loadingDialog(dfd) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    el: $('<div></div>')
  };

  var el = options.el,
      _options$showDimmer = options.showDimmer,
      showDimmer = _options$showDimmer === void 0 ? true : _options$showDimmer,
      _options$delay = options.delay,
      delay = _options$delay === void 0 ? DEFAULT_DELAY : _options$delay,
      otherParameters = _objectWithoutProperties(options, ["el", "showDimmer", "delay"]);

  var DOMElement = el[0];
  setTimeout(function () {
    if (dfd.state() === 'pending') {
      dialogs.popup.show(DOMElement, showDimmer, otherParameters);
      dfd.always(function () {
        dialogs.popup.hide(DOMElement);
      });
    }
  }, delay);
}

;
module.exports = loadingDialog;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});