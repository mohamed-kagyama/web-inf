define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var DashletModel = require('./DashletModel');

var dashboardComponentTypes = require('../../enum/dashboardComponentTypes');

var dashboardWiringStandardIds = require('../../enum/dashboardWiringStandardIds');

var scaleStrategies = require("runtime_dependencies/bi-report/src/bi/report/enum/scaleStrategies");

var i18n = require("bundle!DashboardBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var DashletHyperlinkComponentExtension = require('./extension/DashletHyperlinkComponentExtension');

var dashboardSettings = require('../../dashboardSettings');

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18Message = i18nMessageUtil.extend({
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
  componentName: i18n['dashboard.component.image.component.name'],
  defaults: _.extend({}, DashletHyperlinkComponentExtension.defaults, DashletModel.prototype.defaults, {
    type: dashboardComponentTypes.IMAGE,
    url: '',
    scaleToFit: dashboardSettings.DASHLET_SCALE_TO_FIT,
    showTitleBar: dashboardSettings.DASHLET_IMAGE_SHOW_TITLE,
    showRefreshButton: dashboardSettings.DASHLET_IMAGE_SHOW_REFRESH,
    showMaximizeButton: dashboardSettings.DASHLET_IMAGE_SHOW_MAXIMIZE,
    showDashletBorders: dashboardSettings.DASHLET_BORDER,
    borderColor: dashboardSettings.DASHLET_BORDER_COLOR
  }),
  validation: _.extend({}, DashletHyperlinkComponentExtension.validation, DashletModel.prototype.validation, {
    url: [{
      required: true,
      msg: new i18Message('dashboard.component.error.url.required')
    }],
    scaleToFit: [{
      required: true,
      msg: new i18Message('dashboard.component.error.scale.to.fit.required')
    }, {
      oneOf: [1, scaleStrategies.HEIGHT, scaleStrategies.WIDTH, scaleStrategies.CONTAINER],
      msg: new i18Message('dashboard.component.error.scale.to.fit.oneOf', i18n['dashboard.component.dialog.properties.scale.to.fit.no'], i18n['dashboard.component.dialog.properties.scale.to.fit.width'], i18n['dashboard.component.dialog.properties.scale.to.fit.height'], i18n['dashboard.component.dialog.properties.scale.to.fit.page'])
    }]
  }),
  acceptWiringVisitor: function acceptWiringVisitor(wiring) {
    this.on('parameters:set', _.bind(doAcceptWiringVisitor, this, wiring));
    doAcceptWiringVisitor.call(this, wiring);
  }
});

});