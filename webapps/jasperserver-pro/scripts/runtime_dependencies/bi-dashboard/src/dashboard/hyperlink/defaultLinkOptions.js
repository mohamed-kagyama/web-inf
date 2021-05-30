define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var LocalAnchor = require('./handler/dashboardHyperlinkHandlerLocalAnchor');

var LocalPage = require('./handler/dashboardHyperlinkHandlerLocalPage');

var RemotePage = require('./handler/dashboardHyperlinkHandlerRemotePage');

var RemoteAnchor = require('./handler/dashboardHyperlinkHandlerRemoteAnchor');

var Referenc = require('./handler/dashboardHyperlinkHandlerReference');

var ReportExecution = require('./handler/dashboardHyperlinkHandlerReportExecution');

var AdhocExecution = require('./handler/dashboardHyperlinkHandlerAdhocExecution');

var _ = require('underscore');

var $ = require('jquery');

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

var dashboardSettings = require('../dashboardSettings');

var hyperlinkTypes = require("runtime_dependencies/bi-report/src/bi/report/jive/enum/hyperlinkTypes");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var log = logger.register("defaultLinkOptions");
var handlers = {};
handlers[hyperlinkTypes.LOCAL_ANCHOR] = LocalAnchor;
handlers[hyperlinkTypes.LOCAL_PAGE] = LocalPage;
handlers[hyperlinkTypes.REMOTE_PAGE] = RemotePage;
handlers[hyperlinkTypes.REMOTE_ANCHOR] = RemoteAnchor;
handlers[hyperlinkTypes.REFERENCE] = Referenc;
handlers[hyperlinkTypes.REPORT_EXECUTION] = ReportExecution;
handlers[hyperlinkTypes.ADHOC_EXECUTION] = AdhocExecution;

function onHandlerLoaded(type, handlerDeferreds, hyperlinkHandler) {
  handlers[type] = hyperlinkHandler;
  handlerDeferreds[type].resolve();
}

function onLoadFailed(type, err) {
  var moduleId = err.requireModules && err.requireModules[0];

  if (moduleId) {
    log.error('Failed to load module: \'' + moduleId + '\' for handling hyperlinks of type: \'' + type + '\'!');
  }
}

module.exports = {
  events: function () {
    var obj = {},
        events = dashboardSettings.DEFAULT_HYPERLINK_EVENTS;

    for (var i = 0; i < events.length; i++) {
      obj[events[i]] = function (ev, link, dashlet) {
        // convert fusion charts click to normal event type
        var eventName = ev.eventType === 'jr_hyperlink_interception' ? 'click' : ev.type.toLowerCase(),
            type = link.type,
            handler = handlers[type];

        if (handler && handler.events && typeof handler.events[eventName] === 'function') {
          return handler.events[eventName].apply(this, arguments);
        }
      };
    }

    return obj;
  }(),
  beforeRender: function beforeRender(linkToElemPairs, dashlet) {
    //PRE-load hyperlink handlers
    var pairsByType = {},
        self = this; //get unique list of link types
    //get unique list of link types

    _.each(linkToElemPairs, function (pair) {
      if (!pairsByType[pair.data.type]) {
        pairsByType[pair.data.type] = [];
      }

      pairsByType[pair.data.type].push(pair);
    }); //load modules to handle these types
    //load modules to handle these types


    _.each(_.keys(pairsByType), function (type) {
      if (handlers[type] && handlers[type].beforeRender) {
        handlers[type].beforeRender.apply(self, arguments);
      }
    });
  },
  discoverHyperlinkHandlers: function discoverHyperlinkHandlers(linkToElemPairs) {
    var dfd = new $.Deferred(),
        handlerDeferreds = {},
        hyperlinkTypes = _.chain(linkToElemPairs).map(function (obj) {
      return obj.data.type;
    }).unique().value();

    _.each(hyperlinkTypes, function (type) {
      if (!handlers[type]) {
        handlerDeferreds[type] = new $.Deferred();

        require(['vizShim!' + dashboardSettings.HYPERLINK_MODULE_PREFIX + type], _.partial(onHandlerLoaded, type, handlerDeferreds), _.partial(onLoadFailed, type));
      }
    });

    $.when.apply($, _.values(handlerDeferreds)).always(function () {
      dfd.resolve();
    });
    return dfd;
  }
};

});