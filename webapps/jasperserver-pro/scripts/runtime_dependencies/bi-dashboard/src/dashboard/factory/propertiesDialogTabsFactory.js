define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DashboardBundle");

var fontSizes = require('../enum/fontSizes');

var fonts = require('../enum/fonts');

var dashboardSettings = require('../dashboardSettings');

var dashboardComponentTypes = require('../enum/dashboardComponentTypes');

var propertiesBasicTemplateFactory = require('../factory/propertiesBasicTemplateFactory');

var propertiesFormattingTemplateFactory = require('../factory/propertiesFormattingTemplateFactory');

var propertiesHyperlinkTemplateFactory = require('../factory/propertiesHyperlinkTemplateFactory');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var basicTabFactory = function basicTabFactory(model) {
  return {
    action: 'basic',
    content: _.template(propertiesBasicTemplateFactory(model), {
      i18n: i18n,
      options: {
        autoRefreshTitle: getAutoRefreshTitle(model),
        filtersPerRow: dashboardSettings.DASHLET_FILTERS_PER_ROW_MAX,
        showVizSelector: getVizSelector(model)
      }
    }),
    primary: true,
    label: i18n['dashboard.dialog.properties.tabs.basic'],
    hidden: false
  };
};

var formattingTabFactory = function formattingTabFactory(model) {
  return {
    action: 'formatting',
    content: _.template(propertiesFormattingTemplateFactory(model), {
      i18n: i18n,
      options: {
        autoRefreshTitle: getAutoRefreshTitle(model),
        fonts: fonts,
        fontSizes: fontSizes,
        filtersPerRow: dashboardSettings.DASHLET_FILTERS_PER_ROW_MAX
      }
    }),
    label: i18n['dashboard.dialog.properties.tabs.formatting'],
    hidden: false
  };
};

var hyperlinkTabFactory = function hyperlinkTabFactory(model) {
  return {
    action: 'hyperlinks',
    content: _.template(propertiesHyperlinkTemplateFactory(model), {
      i18n: i18n,
      model: model.toJSON()
    }),
    label: i18n['dashboard.dialog.properties.tabs.hyperlinks'],
    hidden: false
  };
};

var getAutoRefreshTitle = function getAutoRefreshTitle(model) {
  return model.get('type') === dashboardComponentTypes.DASHBOARD_PROPERTIES ? i18n['dashboard.dialog.properties.auto.refresh'] : i18n['dashboard.dashlet.dialog.properties.auto.refresh'];
};

var getVizSelector = function getVizSelector(model) {
  return model.get('showVizSelector') !== undefined ? model.get('showVizSelector') : true;
};

module.exports = function (model) {
  var type = model.get('type');

  switch (type) {
    case dashboardComponentTypes.FREE_TEXT:
      return [basicTabFactory(model), formattingTabFactory(model), hyperlinkTabFactory(model)];

    case dashboardComponentTypes.IMAGE:
      return [basicTabFactory(model), hyperlinkTabFactory(model)];

    case dashboardComponentTypes.CHART:
      return [basicTabFactory(model), hyperlinkTabFactory(model)];

    case dashboardComponentTypes.ADHOC_VIEW:
      return model.get('isAdhocChart') ? [basicTabFactory(model), hyperlinkTabFactory(model)] : [basicTabFactory(model)];

    default:
      return [basicTabFactory(model)];
  }
};

});