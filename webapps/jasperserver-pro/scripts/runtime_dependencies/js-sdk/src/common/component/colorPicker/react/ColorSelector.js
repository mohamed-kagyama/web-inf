define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var React = require('react');

var ReactDOM = require('react-dom');

var _ColorSample = require('./ColorSample');

var ColorSampleComponent = _ColorSample.ColorSample;

var _AttachableColorPicker = require('./AttachableColorPicker');

var AttachableColorPickerComponent = _AttachableColorPicker.AttachableColorPicker;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createColorSampleWithColorPicker = function createColorSampleWithColorPicker(ColorSample, AttachableColorPicker) {
  var _temp;

  return _temp =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(ColorSelector, _React$Component);

    function ColorSelector(props) {
      var _this;

      _classCallCheck(this, ColorSelector);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ColorSelector).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "colorSampleRef", void 0);

      _defineProperty(_assertThisInitialized(_this), "colorPickerContainerWrapper", void 0);

      _this.state = {
        show: false
      };
      _this.colorSampleRef = React.createRef();
      _this.colorPickerContainerWrapper = null;
      return _this;
    }

    _createClass(ColorSelector, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        this.colorPickerContainerWrapper = document.createElement('div');
        this.colorPickerContainerWrapper.className = 'jr-jColorPickerWrapper';
        document.body.appendChild(this.colorPickerContainerWrapper);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.colorPickerContainerWrapper) {
          this.colorPickerContainerWrapper.remove();
        }
      }
    }, {
      key: "onClick",
      value: function onClick() {
        var isSetState = this.state.show;
        this.setState({
          show: !isSetState
        });
      }
    }, {
      key: "onColorPickerHide",
      value: function onColorPickerHide() {
        this.setState({
          show: false
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var show = this.state.show;
        var _this$props = this.props,
            color = _this$props.color,
            label = _this$props.label;
        var colorSampleEl = this.colorSampleRef.current;
        var showTransparentPreset = typeof this.props.showTransparentPreset === 'undefined' ? true : this.props.showTransparentPreset;
        var colorPicker;

        if (colorSampleEl) {
          colorPicker = React.createElement(AttachableColorPicker, {
            padding: {
              top: 0,
              left: 0
            },
            show: show,
            color: color,
            showTransparentPreset: showTransparentPreset,
            onChangeComplete: this.props.onColorChange,
            onHide: function onHide() {
              _this2.onColorPickerHide();
            },
            attachTo: colorSampleEl
          });
        } else {
          colorPicker = React.createElement("div", null);
        }

        return React.createElement(React.Fragment, null, React.createElement("div", {
          className: "jr-jColorSample",
          ref: this.colorSampleRef
        }, React.createElement(ColorSample, {
          color: color,
          label: label,
          onClick: function onClick() {
            _this2.onClick();
          }
        })), ReactDOM.createPortal(colorPicker, this.colorPickerContainerWrapper));
      }
    }]);

    return ColorSelector;
  }(React.Component), _temp;
};

var ColorSelector = createColorSampleWithColorPicker(ColorSampleComponent, AttachableColorPickerComponent);
exports.createColorSampleWithColorPicker = createColorSampleWithColorPicker;
exports.ColorSelector = ColorSelector;

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