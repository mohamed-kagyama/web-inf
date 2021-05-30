define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var DashletModel = require('./DashletModel');

var dashboardComponentTypes = require('../../enum/dashboardComponentTypes');

var dashboardWiringStandardIds = require('../../enum/dashboardWiringStandardIds');

var i18n = require("bundle!DashboardBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var DashletHyperlinkComponentExtension = require('./extension/DashletHyperlinkComponentExtension');

var dashboardSettings = require('../../dashboardSettings');

var scaleStrategies = require("runtime_dependencies/bi-report/src/bi/report/enum/scaleStrategies");

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.extend({
  bundle: i18n
});

function doAcceptWiringVisitor(wiring) {
  var params = this.get('parameters'),
      slots = {},
      model = this;

  if (params && params.length) {
    _.each([dashboardWiringStandardIds.REFRESH_SLOT, dashboardWiringStandardIds.APPLY_SLOT].concat(_.pluck(params, 'id')), function (parameter) {
      slots[parameter] = function (name) {
        return function (value, sender) {
          (model.lastPayload || (model.lastPayload = {}))[name] = value;
          (model.lastSender || (model.lastSender = {}))[name] = sender;
          model.trigger('signal', {
            name: name,
            value: value
          }, sender);
        };
      }(parameter);
    });
  }

  wiring.register(this, {
    signals: this.has('outputParameters') ? _.pluck(this.get('outputParameters'), 'id') : [],
    slots: slots
  });
}

module.exports = DashletModel.extend(DashletHyperlinkComponentExtension.mixin).extend({
  'componentName': i18n['dashboard.component.text.view.component.name'],
  defaults: _.extend({}, DashletHyperlinkComponentExtension.defaults, DashletModel.prototype.defaults, {
    'type': dashboardComponentTypes.FREE_TEXT,
    'alignment': dashboardSettings.DASHLET_TEXT_ALIGNMENT,
    'verticalAlignment': dashboardSettings.DASHLET_TEXT_VERTICAL_ALIGNMENT,
    'bold': dashboardSettings.DASHLET_TEXT_BOLD,
    'text': undefined,
    'italic': dashboardSettings.DASHLET_TEXT_ITALIC,
    'underline': dashboardSettings.DASHLET_TEXT_UNDERLINE,
    'font': dashboardSettings.DASHLET_TEXT_FONT,
    'size': dashboardSettings.DASHLET_TEXT_SIZE,
    'color': dashboardSettings.DASHLET_TEXT_COLOR,
    'backgroundColor': dashboardSettings.DASHLET_TEXT_BACKGROUND_COLOR,
    'scaleToFit': dashboardSettings.DASHLET_TEXT_SCALE_TO_FIT,
    showDashletBorders: dashboardSettings.DASHLET_BORDER,
    borderColor: dashboardSettings.DASHLET_BORDER_COLOR,
    maximized: null,
    toolbar: null
  }),
  validation: _.extend({}, DashletHyperlinkComponentExtension.validation, DashletModel.prototype.validation, {
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
    alignment: [{
      required: true,
      msg: new i18nMessage('dashboard.component.error.alignment.required')
    }, {
      oneOf: ['left', 'center', 'right'],
      msg: new i18nMessage('dashboard.component.error.alignment.oneOf', i18n['dashboard.component.dialog.properties.alignment.left'], i18n['dashboard.component.dialog.properties.alignment.center'], i18n['dashboard.component.dialog.properties.alignment.right'])
    }],
    font: [{
      required: true,
      msg: new i18nMessage('dashboard.component.error.font.required')
    }, {
      doesNotContainSymbols: '~!#\\$%^|`@&*()\\+={}\\[\\];""\\<\\>,?\\|\\\\',
      msg: new i18nMessage('dashboard.component.error.font.forbidden.chars')
    }],
    size: [{
      required: true,
      msg: new i18nMessage('dashboard.component.error.font.size.required')
    }, {
      integerNumber: true,
      msg: new i18nMessage('dashboard.component.error.font.size.integer')
    }, {
      min: dashboardSettings.DASHLET_MIN_FONT_SIZE,
      msg: new i18nMessage('dashboard.component.error.font.size.min', dashboardSettings.DASHLET_MIN_FONT_SIZE)
    }],
    scaleToFit: [{
      required: true,
      msg: new i18nMessage('dashboard.component.error.scale.to.fit.required')
    }, {
      oneOf: [1, scaleStrategies.HEIGHT, scaleStrategies.WIDTH, scaleStrategies.CONTAINER],
      msg: new i18nMessage('dashboard.component.error.scale.to.fit.oneOf', i18n['dashboard.component.dialog.properties.scale.to.fit.no'], i18n['dashboard.component.dialog.properties.scale.to.fit.width'], i18n['dashboard.component.dialog.properties.scale.to.fit.height'], i18n['dashboard.component.dialog.properties.scale.to.fit.page'])
    }]
  }),
  acceptWiringVisitor: function acceptWiringVisitor(wiring) {
    this.on('parameters:set', _.bind(doAcceptWiringVisitor, this, wiring));
    doAcceptWiringVisitor.call(this, wiring);
  }
});

});