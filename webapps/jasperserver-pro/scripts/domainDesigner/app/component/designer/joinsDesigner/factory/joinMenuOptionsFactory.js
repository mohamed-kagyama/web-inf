define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
module.exports = {
  create: function create(join) {
    if (_.isUndefined(join.id)) {
      return [];
    }

    return [{
      label: i18nMessage('domain.designer.joinsDesigner.join.contextMenu.createCustomJoin'),
      value: false,
      join: join,
      action: 'createConstantJoinExpressionDialog',
      triggerEvent: 'show:createConstantJoinExpressionDialog'
    }];
  }
};

});