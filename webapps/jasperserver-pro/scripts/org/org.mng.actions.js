define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var orgModule = require('./org.mng.main');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @version: $Id$
 */
orgModule.orgActionFactory = {
  'aliasExist': function aliasExist(options) {
    var org = options.org;
    var data = {
      entityName: org.getNameWithTenant(),
      alias: org.alias
    };
    var action = new orgModule.ServerAction(orgModule.orgManager.Action.ALIAS_EXIST, data);

    action.onSuccess = function (data) {
      data.exist ? options.onExist && options.onExist(data.uniqueAlias) : options.onNotExist && options.onNotExist();
    };

    action.onError = function (data) {
      orgModule.fire(orgModule.Event.SERVER_ERROR, {
        inputData: options,
        responseData: data
      });
    };

    return action;
  }
};
orgModule.orgManager.actionFactory = {};
module.exports = orgModule;

});