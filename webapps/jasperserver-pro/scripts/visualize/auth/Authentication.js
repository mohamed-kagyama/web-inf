define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var ComponentEngine = require("runtime_dependencies/js-sdk/src/common/bi/component/ComponentEngine");

var BiComponent = require("runtime_dependencies/js-sdk/src/common/bi/component/BiComponent");

var request = require("request");

var errorCodes = require("runtime_dependencies/js-sdk/src/common/bi/error/enum/biComponentErrorCodes");

var biComponentErrorFactory = require("runtime_dependencies/js-sdk/src/common/bi/error/biComponentErrorFactory");

var schema = require("json!./Authentication.json");

var authSettingsObj = require("settings!auth");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var defaultTokenParameterName = 'ticket';
var authSettings = authSettingsObj || {
  'ticketParameterName': defaultTokenParameterName
};

function getParametersString(properties) {
  if (properties.token) {
    return (properties.tokenName || authSettings.ticketParameterName || defaultTokenParameterName) + '=' + properties.token;
  } else {
    return 'j_username=' + properties.name + '&j_password=' + properties.password + '&orgId=' + (properties.organization ? properties.organization : 'null') + (properties.locale ? '&userLocale=' + properties.locale : '') + (properties.timezone ? '&userTimezone=' + properties.timezone : '');
  }
}

var JrsAuthenticationExecutor = {
  login: function login(properties, request) {
    var dfd = $.Deferred();
    request({
      url: properties.url + (properties.preAuth ? '/' : '/j_spring_security_check') + '?' + getParametersString(properties),
      headers: {
        'Accept': 'application/json'
      }
    }).done(function (response, a, b) {
      var result = response;

      if (typeof response === 'string') {
        try {
          result = JSON.parse(response);
        } catch (error) {
          dfd.reject(error);
        }
      }

      if (result.success === true) {
        dfd.resolve(result);
      } else {
        dfd.reject(b);
      }
    }).fail(function (xhr) {
      dfd.reject(xhr);
    });
    return dfd;
  },
  logout: function logout(properties, request) {
    return request({
      url: properties.url + '/logout.html'
    });
  }
};

var Authentication = function Authentication(properties) {
  var engine = ComponentEngine.newInstance(schema, properties),
      self = this;
  engine.decorateComponent(this, function (instanceData, dfd) {
    var loginFunction;

    if (instanceData.properties && instanceData.properties.loginFn && _.isFunction(instanceData.properties.loginFn)) {
      // Authentication login hook is defined. Let's use it.
      loginFunction = instanceData.properties.loginFn;
    } else {
      loginFunction = JrsAuthenticationExecutor.login;
    }

    loginFunction(instanceData.properties, request).done(function (result) {
      instanceData.data = true;
      dfd.resolve(result);
    }).fail(function (xhr) {
      dfd.reject(biComponentErrorFactory.requestError(xhr, errorCodes.AUTHENTICATION_ERROR));
    });
  });

  this.logout = function (callback, errorback, always) {
    var instanceData = engine.instanceData;
    var logoutFunction;

    if (instanceData.properties && instanceData.properties.logoutFn && _.isFunction(instanceData.properties.logoutFn)) {
      // Authentication logout hook is defined. Let's use it.
      logoutFunction = instanceData.properties.logoutFn;
    } else {
      logoutFunction = JrsAuthenticationExecutor.logout;
    }

    return logoutFunction(instanceData.properties, request).done(function (result) {
      instanceData.data = false;

      if (callback && _.isFunction(callback)) {
        callback(result);
      }
    }).fail(function (xhr) {
      if (errorback && _.isFunction(errorback)) {
        errorback(xhr);
      }
    }).always(function () {
      if (always && _.isFunction(always)) {
        always();
      }
    });
  };

  this.login = function (loginData, callback, errorback, always) {
    self.properties(loginData);
    return self.run(callback, errorback, always);
  };
};

Authentication.prototype = new BiComponent();
module.exports = Authentication;

});