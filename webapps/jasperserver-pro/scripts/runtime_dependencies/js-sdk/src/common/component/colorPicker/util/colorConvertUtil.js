define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

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
var RGBA_REGEX = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
var THRESHOLD = 127.5;
module.exports = {
  rgba2NoAlphaHex: function rgba2NoAlphaHex(color) {
    var rgb = color.match(RGBA_REGEX) || [];
    var hexValue = '#';
    return [rgb[1], rgb[2], rgb[3]].reduce(function (memo, val) {
      var hex = "0".concat(parseInt(val, 10).toString(16)).slice(-2);
      return memo + hex;
    }, hexValue).toUpperCase();
  },
  isRgbTransparent: function isRgbTransparent(rgb) {
    return rgb.replace(/\s/g, '').indexOf('0,0,0,0') !== -1;
  },
  isRgba: function isRgba(rgb) {
    return RGBA_REGEX.test(rgb);
  },
  isColorDark: function isColorDark(color) {
    var colour, r, g, b;

    if (/^rgb/.test(color)) {
      colour = color.match(RGBA_REGEX) || [];
      r = parseInt(colour[1], 10);
      g = parseInt(colour[2], 10);
      b = parseInt(colour[3], 10);
    } else {
      colour = color.substr(1);
      r = parseInt("".concat(colour[0]).concat(colour[1]), 16);
      g = parseInt("".concat(colour[2]).concat(colour[3]), 16);
      b = parseInt("".concat(colour[4]).concat(colour[5]), 16);
    }

    var rgb = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
    return rgb < THRESHOLD;
  }
};

});