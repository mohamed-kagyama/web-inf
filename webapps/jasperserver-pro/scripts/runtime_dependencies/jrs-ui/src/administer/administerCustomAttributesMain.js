define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var domReady = require('requirejs-domready');

var $ = require('jquery');

var logging = require('../administer/administer.logging');

var Administer = require('../administer/administer.base');

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var attributesDesignerFactory = require('../attributes/factory/attributesDesignerFactory');

var attributesViewOptionsFactory = require('../attributes/factory/attributesViewOptionsFactory');

var scrollEventTrait = require('../attributes/trait/attributesViewScrollEventTrait');

var attributesTypesEnum = require('../attributes/enum/attributesTypesEnum');

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
domReady(function () {
  Administer.urlContext = jrsConfigs.urlContext;
  logging.initialize();
  var attributesView = attributesDesignerFactory(attributesTypesEnum.SERVER, attributesViewOptionsFactory({
    type: attributesTypesEnum.SERVER,
    el: $('.attributes')
  }));
  attributesView.setContext().done(attributesView.render).then(function () {
    scrollEventTrait.initScrollEvent(attributesView);
  });
});

});