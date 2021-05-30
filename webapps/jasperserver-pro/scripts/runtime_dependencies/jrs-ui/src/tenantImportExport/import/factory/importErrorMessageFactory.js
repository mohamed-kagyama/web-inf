define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var importRestErrorCodesEnum = require('../enum/importRestErrorCodesEnum');

var i18n = require("bundle!ImportExportBundle");

var awsSettings = require("settings!awsSettings");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getImportDecodeFailedError = function getImportDecodeFailedError() {
  if (awsSettings.productTypeIsJrsAmi || awsSettings.productTypeIsMpAmi) {
    return i18n['import.decode.failed.aws'];
  }

  return i18n['import.decode.failed'];
};

var restErrorCodeToErrorProviderMap = _defineProperty({}, importRestErrorCodesEnum.IMPORT_DECODE_FAILED, getImportDecodeFailedError);

module.exports = {
  create: function create(errorCode) {
    var errorProvider = restErrorCodeToErrorProviderMap[errorCode];

    if (errorProvider) {
      return errorProvider();
    }

    return i18n[errorCode] || i18n["import.error.unexpected"];
  }
};

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