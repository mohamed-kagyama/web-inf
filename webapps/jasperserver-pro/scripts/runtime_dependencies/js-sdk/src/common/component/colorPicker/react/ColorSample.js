define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var React = require('react');

var colorConvertUtil = require('../util/colorConvertUtil');

var Colors = require('./enum/colors');

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
var SWATCH_LIGHT_CLASS = 'jr-mControl-launcher-swatchLight';
var TRANSPARENT_CLASS = "".concat(SWATCH_LIGHT_CLASS, " jr-mControl-launcher-swatchTransparent");

var getSwatchLightClass = function getSwatchLightClass(color) {
  if (color === Colors.TRANSPARENT) {
    return TRANSPARENT_CLASS;
  }

  if (!colorConvertUtil.isColorDark(color)) {
    return SWATCH_LIGHT_CLASS;
  }

  return '';
};

var ColorSample = function ColorSample(props) {
  var style = {
    backgroundColor: props.color
  };
  var className = "jr-mControl-launcher-swatch ".concat(getSwatchLightClass(props.color), " jr");
  return (// eslint-disable-next-line jsx-a11y/no-static-element-interactions
    React.createElement("div", {
      className: "jr-mControl-launcher jr",
      onClick: props.onClick
    }, React.createElement("div", {
      className: className,
      style: style
    }), React.createElement("div", {
      className: "jr-mControl-launcher-hex jr"
    }, props.label))
  );
};

exports.ColorSample = ColorSample;

});