define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var $ = require('jquery');

var hyperlinkTargets = require("runtime_dependencies/bi-report/src/bi/report/jive/enum/hyperlinkTargets");

var hyperlinkTypes = require("runtime_dependencies/bi-report/src/bi/report/jive/enum/hyperlinkTypes");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JRS_REPORT_VIEWER_URL = _.template('{{=context}}/flow.html?{{=parameters}}');

function buildReportViewerUrl(link) {
  var resultingParams = _.extend({
    _flowId: 'viewReportFlow'
  }, link.parameters);

  resultingParams.reportUnit = link.resource;

  if (link.parameters && !_.isUndefined(link.parameters._output)) {
    resultingParams.output = link.parameters._output;
  }

  if (!_.isUndefined(link.pages)) {
    resultingParams.pageIndex = link.pages;
  }

  if (!_.isUndefined(link.anchor)) {
    resultingParams.anchor = link.anchor;
  } // do not show UI and back button for Report Viewer hyperlink with target Parent
  // do not show UI and back button for Report Viewer hyperlink with target Parent


  if ((link.target === hyperlinkTargets.PARENT || link.target === hyperlinkTargets.TOP) && !resultingParams.hasOwnProperty('decorate')) {
    resultingParams.decorate = 'no';
  }

  return JRS_REPORT_VIEWER_URL({
    context: jrsConfigs.contextPath,
    parameters: !_.isEmpty(resultingParams) ? $.param(resultingParams, true) : ''
  });
}

module.exports = {
  events: {
    click: function click(ev, link, dashlet) {
      if (link.target !== hyperlinkTargets.SELF) {
        window.open(buildReportViewerUrl(link), _.contains(_.values(hyperlinkTargets), link.target) ? '_' + link.target.toLowerCase() : link.target);
      } else {
        dashlet && dashlet.drilldown && dashlet.drilldown(_.extend({}, link, {
          type: hyperlinkTypes.REPORT_EXECUTION
        }));
      }
    }
  }
};

});