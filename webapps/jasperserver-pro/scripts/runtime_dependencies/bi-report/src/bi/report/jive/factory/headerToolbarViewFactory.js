define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!jasperreports_messages");

var jiveTypes = require('../enum/jiveTypes');

var sortOrder = require('../enum/sortOrder');

var jiveActions = require('../enum/jiveActions');

var HeaderToolbarView = require('../view/overlay/HeaderToolbarView');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @author Taras Bidyuk
 */
var typeToToolbarOptionsMap = {};

var noop = function noop() {};

function generateOptions(type, options) {
  typeToToolbarOptionsMap[jiveTypes.CROSSTAB] = {
    buttons: [{
      icon: 'sortAscIcon',
      title: i18n['net.sf.jasperreports.components.headertoolbar.label.sortasc'],
      message: jiveActions.SORT,
      order: sortOrder.ASC,
      action: 'select'
    }, {
      icon: 'sortDescIcon',
      title: i18n['net.sf.jasperreports.components.headertoolbar.label.sortdesc'],
      message: jiveActions.SORT,
      order: sortOrder.DESC,
      action: 'select'
    }]
  };
  typeToToolbarOptionsMap[jiveTypes.TABLE] = {
    buttons: [{
      title: i18n['net.sf.jasperreports.components.headertoolbar.condition.format'],
      icon: 'formatIcon',
      hoverMenuOptions: [{
        message: jiveActions.FORMAT,
        label: i18n['net.sf.jasperreports.components.headertoolbar.label.formatting'],
        action: 'select'
      }, {
        message: jiveActions.HIDE_COLUMN,
        label: i18n["net.sf.jasperreports.components.headertoolbar.label.hidecolumn"],
        test: options.hideColumnOptionTestFn || noop,
        action: "select"
      }, {
        message: jiveActions.SHOW_COLUMN,
        label: i18n["net.sf.jasperreports.components.headertoolbar.label.showcolumns"],
        test: options.showColumnsOptionTestFn || noop,
        children: options.children || []
      }]
    }, {
      title: i18n['net.sf.jasperreports.components.headertoolbar.label.columnfilters'],
      icon: 'filterIcon',
      message: jiveActions.FILTER,
      action: 'filter'
    }, {
      title: i18n['net.sf.jasperreports.components.headertoolbar.label.sortasc'],
      icon: 'sortAscIcon',
      message: jiveActions.SORT,
      order: 'Asc',
      action: 'sortAsc'
    }, {
      title: i18n['net.sf.jasperreports.components.headertoolbar.label.sortdesc'],
      icon: 'sortDescIcon',
      message: jiveActions.SORT,
      order: 'Desc',
      action: 'sortDesc'
    }]
  };
  return typeToToolbarOptionsMap[type];
}

module.exports = function (type, options) {
  options = _.extend({}, generateOptions(type, options), options);
  return new HeaderToolbarView(options);
};

});