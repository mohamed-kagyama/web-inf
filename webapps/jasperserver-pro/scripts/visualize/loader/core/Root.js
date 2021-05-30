define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var relations = require('./enum/relations');

var _ = require('underscore');

var $ = require('jquery');

var request = require("request");

var helper = require('./util/helper');

var linksEnum = require('./enum/links');

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/*globals __jrsConfigs__*/
var links = linksEnum.links;
var log = logger.register('Root');

function logResults(message, result) {
  log.debug(message, result);
  return result;
}

function findLink(req) {
  return _.find(links, function (link) {
    return link.rel === req.rel && link.name === req.name;
  });
}

function Root(baseUrl, loggerEnabled, logLevel, scripts) {
  this.isLoggerEnabled = loggerEnabled;
  this.logLevel = logLevel;
  this.scripts = scripts;
  this.baseUrl = baseUrl ? baseUrl : '';
}

_.extend(Root.prototype, {
  settings: function settings() {
    var dfd = new $.Deferred(),
        link = findLink({
      rel: relations.SETTINGS
    }),
        self = this;

    if (link) {
      request({
        url: this.baseUrl + link.href
      }).done(function (htmlContent) {
        var serverSettings = helper.serverSettings(htmlContent); //switch context from relative to absolute
        //switch context from relative to absolute

        serverSettings.contextPath = self.baseUrl; //enable Xdm transfer

        if (typeof __jrsConfigs__ !== 'undefined') {
          //Use instance of __jrsConfigs__ from local lexical scope if possible
          _.extend(__jrsConfigs__, serverSettings);
        } else {
          //TODO: refactor jsConfig to build-in in jsp or provide separate service
          window.__jrsConfigs__ = serverSettings;
        }

        dfd.resolve(serverSettings);
      });
    } else {
      dfd.resolve(new Error('Can\'t get server settings'));
    }

    return dfd.promise();
  },
  requirejs: function requirejs() {
    var dfd = new $.Deferred(),
        jrsLink = findLink({
      rel: relations.REQUIREJS,
      name: 'jrs'
    });

    if (links) {
      var scripts = this.scripts ? this.scripts : 'scripts',
          jrsHref = jrsLink.href.replace('{scripts}', this.scripts),
          baseUrlPrefix = this.baseUrl + '/',
          logJrs = _.partial(logResults, 'Script loader configs for JRS: '),
          jrsConfigPromise,
          self = this;

      jrsConfigPromise = request({
        url: this.baseUrl + jrsHref,
        dataType: 'text'
      }).then(helper.loaderConfig).then(function (result) {
        var scriptsBase = result.baseUrl ? result.baseUrl : scripts;
        result.baseUrl = baseUrlPrefix + scriptsBase;

        if (result.config && result.config.logger) {
          result.config.logger.enabled = self.isLoggerEnabled;
          result.config.logger.level = self.logLevel;
        }

        return result;
      }).then(logJrs);
      $.when(jrsConfigPromise).then(function (jrsConfigs) {
        return jrsConfigs;
      }, dfd.reject).then(dfd.resolve);
    } else {
      dfd.reject(new Error('Can\'t get RequireJS configs'));
    }

    return dfd.promise();
  }
});

module.exports = Root;

});