define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var adhocDesigner = require('./designer');

var adhocDesignerAjax = require('./designer.ajax');

var adhocDesignerContextMenu = require('./designer.contextmenu');

var adhocDesignerFieldActions = require('./designer.field.actions');

var adhocDesignerHelpers = require('./designer.helpers');

var adhocDesignerInit = require('./designer.init');

var adhocDesignerObservers = require('./designer.observers');

var adhocDesignerReportActions = require('./designer.report.actions');

var adhocDesignerSelection = require('./designer.selection');

var adhocDesignerTreeActions = require('./designer.tree.actions');

var adhocDesignerLabelActions = require('./designer.label.actions');

var adhocDesignerObsolete = require('./designer.obsolete');

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var designer = _extends(adhocDesigner, adhocDesignerAjax, adhocDesignerContextMenu, adhocDesignerFieldActions, adhocDesignerHelpers, adhocDesignerInit, adhocDesignerObservers, adhocDesignerReportActions, adhocDesignerSelection, adhocDesignerTreeActions, adhocDesignerObsolete, adhocDesignerLabelActions);

module.exports = designer;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});