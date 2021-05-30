define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var React = require('react');

var ReactDOM = require('react-dom');

var _AttachableColorPicker = require('./AttachableColorPicker');

var AttachableColorPicker = _AttachableColorPicker.AttachableColorPicker;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultOptions = {
  padding: {
    top: 0,
    left: 0
  },
  disableAlpha: true,
  showTransparentPreset: true,
  color: '',
  onChangeComplete: function onChangeComplete() {},
  onHide: function onHide() {},
  ColorPicker: AttachableColorPicker
};

var AttachableColorPickerWrapper =
/*#__PURE__*/
function () {
  function AttachableColorPickerWrapper(attachTo) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;

    _classCallCheck(this, AttachableColorPickerWrapper);

    _defineProperty(this, "attachTo", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "color", void 0);

    _defineProperty(this, "colorPickerContainerWrapper", void 0);

    _defineProperty(this, "onChangeCompleteWrapper", void 0);

    _defineProperty(this, "onHideWrapper", void 0);

    _defineProperty(this, "ColorPicker", void 0);

    _defineProperty(this, "boundOnAttachElementClick", void 0);

    this.options = options;
    this.attachTo = attachTo;
    this.color = this.options.color;
    this.ColorPicker = this.options.ColorPicker || AttachableColorPicker;
    this.colorPickerContainerWrapper = document.createElement('div');
    this.colorPickerContainerWrapper.className = 'jr-jColorPickerWrapper';
    this.boundOnAttachElementClick = this.onAttachElementClick.bind(this);
    var _this$options = this.options,
        onChangeComplete = _this$options.onChangeComplete,
        onHide = _this$options.onHide;

    this.onChangeCompleteWrapper = function (color) {
      _this.color = color.hex;
      onChangeComplete(color);
    };

    this.onHideWrapper = function () {
      var state = _this.getColorPickerState(false);

      _this.renderColorPicker(state);

      if (onHide) {
        onHide();
      }
    };

    var state = this.getColorPickerState(false);
    this.renderColorPicker(state);
  }

  _createClass(AttachableColorPickerWrapper, [{
    key: "renderColorPicker",
    value: function renderColorPicker(state) {
      this.remove();
      this.attachTo.addEventListener('click', this.boundOnAttachElementClick);
      document.body.appendChild(this.colorPickerContainerWrapper);
      ReactDOM.render(React.createElement(this.ColorPicker, state), this.colorPickerContainerWrapper);
    }
  }, {
    key: "onAttachElementClick",
    value: function onAttachElementClick() {
      var state = this.getColorPickerState(true);
      this.renderColorPicker(state);
    }
  }, {
    key: "getColorPickerState",
    value: function getColorPickerState(show) {
      return {
        padding: this.options.padding,
        show: show,
        color: this.color,
        disableAlpha: this.options.disableAlpha,
        showTransparentPreset: this.options.showTransparentPreset,
        onChangeComplete: this.onChangeCompleteWrapper,
        onHide: this.onHideWrapper,
        attachTo: this.attachTo
      };
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      this.color = color;
    }
  }, {
    key: "remove",
    value: function remove() {
      this.attachTo.removeEventListener('click', this.boundOnAttachElementClick);
      ReactDOM.unmountComponentAtNode(this.colorPickerContainerWrapper);
      $(this.colorPickerContainerWrapper).remove();
    }
  }]);

  return AttachableColorPickerWrapper;
}();

module.exports = AttachableColorPickerWrapper;

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