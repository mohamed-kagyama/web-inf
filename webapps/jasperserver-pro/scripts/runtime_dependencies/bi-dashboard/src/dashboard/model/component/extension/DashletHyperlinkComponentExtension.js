define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var request = require("request");

var i18n = require("bundle!DashboardBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var dashboardSettings = require('../../../dashboardSettings');

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

var Dashboardi18nMessage = require('../../../util/Dashboardi18nMessage');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @author: Zakhar.Tomchenko
 * @version: $Id$
 */
var i18nMessage = i18nMessageUtil.extend({
  bundle: i18n
});

function initializeLinkDeferred(model, linkUrlDfd, parameterValues) {
  var url;

  try {
    url = model.getParametrizationResult("dashletHyperlinkUrl", encodeValues(parameterValues), {
      tolerateMissing: true
    });
  } catch (e) {
    linkUrlDfd.reject(new Dashboardi18nMessage("dashboard.error.dialog.text.url.parameters.not.set", e));
  }

  if (url && url.indexOf("repo:/") === 0 && model.get("dashletHyperlinkTarget")) {
    var separator = url.indexOf("?"),
        uri,
        params = "";

    if (separator < 0) {
      uri = url.substring("repo:".length);
    } else {
      uri = url.substring("repo:".length, separator);
      params = url.substring(separator + "?".length);
    }

    request({
      headers: {
        "Accept": "application/json"
      },
      url: dashboardSettings.CONTEXT_PATH + "/rest_v2/discovery" + uri
    }).fail(function () {
      linkUrlDfd.reject(new Dashboardi18nMessage("dashboard.error.dialog.text.url.resource.not.accessible", uri));
    }).done(function (data) {
      url = uriToUrl(data.uri, data.repositoryType, params);
      url ? resolve(linkUrlDfd, url) : linkUrlDfd.reject(new Dashboardi18nMessage("dashboard.error.dialog.text.url.unsupported.resource.type", uri, data.repositoryType));
    });
  } else if (url) {
    resolve(linkUrlDfd, url);
  } else {
    linkUrlDfd.reject(new Dashboardi18nMessage("dashboard.error.dialog.text.url.empty"));
  }
}

function encodeValues(vals) {
  return _.reduce(_.keys(vals), function (memo, key) {
    memo[key] = _.map(vals[key], encodeURIComponent);
    return memo;
  }, {});
}

function resolve(dfd, url) {
  if (url.toLowerCase().indexOf("javascript:") === -1) {
    dfd.resolve(url);
  } else {
    dfd.reject(new Dashboardi18nMessage("dashboard.error.dialog.text.url.empty"));
  }
} // TODO LINKS FOR DISCOVERY SERVICE!


function uriToUrl(uri, type, params) {
  var url,
      contextPath = dashboardSettings.CONTEXT_PATH || "";

  switch (type) {
    case repositoryResourceTypes.DASHBOARD:
      url = contextPath + "/dashboard/viewer.html?" + params + "#" + uri;
      break;

    case repositoryResourceTypes.REPORT_UNIT:
      url = contextPath + "/flow.html?_flowId=viewReportFlow&standAlone=true&ParentFolderUri=" + uri.substring(0, uri.lastIndexOf("/")) + "&reportUnit=" + uri + "&" + params;
      break;

    case repositoryResourceTypes.ADHOC_DATA_VIEW:
      url = contextPath + "/flow.html?_flowId=adhocFlow&ParentFolderUri=" + uri.substring(0, uri.lastIndexOf("/")) + "&resource=" + uri + "&" + params;
      break;
  }

  return url;
}

module.exports = {
  defaults: {
    exposeOutputsToFilterManager: false,
    dashletHyperlinkTarget: "",
    dashletHyperlinkUrl: undefined
  },
  validation: {
    dashletHyperlinkUrl: [{
      fn: function fn(value, attr, computedState) {
        if (computedState.dashletHyperlinkTarget !== "" && computedState.exposeOutputsToFilterManager && _.isEmpty(value)) {
          return "URL is required";
        }
      },
      msg: new i18nMessage("dashboard.component.error.url.required")
    }]
  },
  mixin: {
    isValueProducer: function isValueProducer() {
      return this.get("exposeOutputsToFilterManager") && this.has("outputParameters") && this.get("outputParameters").length;
    },
    getLinkUrl: function getLinkUrl(parameterValues) {
      var noCache = this.get("dashletHyperlinkUrl") && this.get("dashletHyperlinkUrl").indexOf("$P{") > 0;

      if (!this._linkUrlDfd || noCache && parameterValues) {
        this._linkUrlDfd = $.Deferred();
        initializeLinkDeferred(this, this._linkUrlDfd, parameterValues || {});
      }

      return this._linkUrlDfd;
    }
  }
};

});