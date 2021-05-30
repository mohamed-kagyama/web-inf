define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var DashletModel = require('./DashletModel');

var _ = require('underscore');

var i18n = require("bundle!DashboardBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var dashboardWiringStandardIds = require('../../enum/dashboardWiringStandardIds');

var dashboardSettings = require('../../dashboardSettings');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.extend({
  bundle: i18n
});
module.exports = DashletModel.extend({
  componentName: i18n['dashboard.component.filter.group.component.name'],
  defaults: _.extend({}, DashletModel.prototype.defaults, {
    filtersPerRow: dashboardSettings.DASHLET_FILTERS_PER_ROW,
    buttonsPosition: dashboardSettings.DASHLET_BUTTONS_POSITION,
    applyButton: dashboardSettings.DASHLET_FILTER_APPLY_BUTTON,
    resetButton: dashboardSettings.DASHLET_FILTER_RESET_BUTTON,
    floating: false,
    maximized: null,
    toolbar: null
  }),
  validation: _.extend({}, DashletModel.prototype.validation, {
    maximized: function maximized(_maximized) {
      if (_maximized !== null) {
        return i18n['dashboard.component.error.property.unsupported'].replace('{0}', 'maximized');
      }
    },
    toolbar: function toolbar(_toolbar) {
      if (_toolbar !== null) {
        return i18n['dashboard.component.error.property.unsupported'].replace('{0}', 'toolbar');
      }
    },
    filtersPerRow: [{
      required: true,
      msg: new i18nMessage('dashboard.component.error.filters.per.row.required')
    }, {
      integerNumber: true,
      msg: new i18nMessage('dashboard.component.error.filters.per.row.integer')
    }, {
      range: [dashboardSettings.DASHLET_FILTERS_PER_ROW_MIN, dashboardSettings.DASHLET_FILTERS_PER_ROW_MAX],
      msg: new i18nMessage('dashboard.component.error.filtersPerRow.range', dashboardSettings.DASHLET_FILTERS_PER_ROW_MIN, dashboardSettings.DASHLET_FILTERS_PER_ROW_MAX)
    }],
    buttonsPosition: [{
      required: true,
      msg: new i18nMessage('dashboard.component.error.filters.buttons.position.required')
    }, {
      oneOf: ['bottom', 'right'],
      msg: new i18nMessage('dashboard.component.error.filters.buttons.position.oneOf', i18n['dashboard.component.filter.group.component.buttons.position.bottom'], i18n['dashboard.component.filter.group.component.buttons.position.right'])
    }]
  }),
  initialize: function initialize() {
    this.isMute = true;
    return DashletModel.prototype.initialize.apply(this, arguments);
  },
  acceptWiringVisitor: function acceptWiringVisitor(wiring) {
    wiring.register(this, {
      signals: [dashboardWiringStandardIds.REFRESH_SIGNAL],
      slots: {}
    });
  },
  notify: function notify(force) {
    if (force || !this.get('applyButton') && !this.isDesigner && !this.isMute) {
      this.collection.pushParametersState();
      this.trigger(dashboardWiringStandardIds.REFRESH_SIGNAL, {});
    }
  },
  isFloating: function isFloating() {
    return this.get('floating');
  }
});

});