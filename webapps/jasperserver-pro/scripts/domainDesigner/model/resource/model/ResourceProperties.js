define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var SimpleModel = require("../../util/SimpleModel");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var ResourceProperties = function ResourceProperties() {
  SimpleModel.apply(this, arguments);
};

_.extend(ResourceProperties.prototype, SimpleModel.prototype, {
  defaults: function defaults() {
    return {
      'version': undefined,
      'permissionMask': undefined,
      'creationDate': undefined,
      'updateDate': undefined,
      'label': i18nMessage('domain.designer.new_domain'),
      'description': undefined,
      'uri': undefined,
      'dataSources': undefined,
      'securityFile': undefined,
      'bundles': []
    };
  }
});

module.exports = ResourceProperties;

});