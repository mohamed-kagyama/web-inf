define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var BaseDataSourceModel = require('./BaseDataSourceModel');

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

var connectionTypes = require('../enum/connectionTypes');

var i18n = require("bundle!jasperserver_messages");

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
module.exports = BaseDataSourceModel.extend({
  type: repositoryResourceTypes.JNDI_DATA_SOURCE,
  defaults: function () {
    var defaults = {};

    _.extend(defaults, BaseDataSourceModel.prototype.defaults, {
      jndiName: '',
      timezone: '',
      connectionType: connectionTypes.JNDI
    });

    return defaults;
  }(),
  validation: function () {
    var validation = {};

    _.extend(validation, BaseDataSourceModel.prototype.validation, {
      jndiName: [{
        required: true,
        msg: i18n['ReportDataSourceValidator.error.not.empty.reportDataSource.jndiName']
      }]
    });

    return validation;
  }()
});

});