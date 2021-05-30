define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var AttachableColorPickerWrapper = require("runtime_dependencies/js-sdk/src/common/component/colorPicker/react/AttachableColorPickerWrapper");

var Colors = require("runtime_dependencies/js-sdk/src/common/component/colorPicker/react/enum/colors");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var getColor = function getColor(value) {
  if (value) {
    return value === Colors.TRANSPARENT ? value : "#".concat(value);
  }

  return Colors.TRANSPARENT;
};

var convertColorForModel = function convertColorForModel(color) {
  var hex = color.hex;

  if (hex === Colors.TRANSPARENT) {
    return Colors.TRANSPARENT;
  }

  return hex.slice(1);
};

module.exports = getColorPickerBinding;

function getColorPickerBinding() {
  return {
    attachableColorPickerWrapper: {
      remove: function remove() {},
      setColor: function setColor(color) {}
    },
    init: function init($element, value, bindings) {
      var showTransparentInput = !!$element.data('showTransparentInput');
      var modelBinding = $element.data('model-attr');
      this.attachableColorPickerWrapper = new AttachableColorPickerWrapper($element[0], {
        padding: {
          top: 0,
          left: 0
        },
        color: getColor(value),
        showTransparentPreset: showTransparentInput,
        onChangeComplete: function onChangeComplete(color) {
          bindings[modelBinding](convertColorForModel(color));
        }
      });
    },
    set: function set($element, value) {
      var color = getColor(value);

      if (value) {
        $element.removeClass('unchanged');
      } else {
        $element.addClass('unchanged');
      }

      $element.find('div.colorpick').css('background-color', color);
      this.attachableColorPickerWrapper.setColor(color);
    },
    clean: function clean() {
      this.attachableColorPickerWrapper.remove();
    }
  };
}

});