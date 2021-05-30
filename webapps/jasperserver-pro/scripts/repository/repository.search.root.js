define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var repositorySearch = require("runtime_dependencies/jrs-ui/src/repository/repository.search.root");

var repositorySearchPro = require('./repository.search');

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

module.exports = _extends(repositorySearch, repositorySearchPro);

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});