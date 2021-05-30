define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var menuEventsEnum = require("../enum/menuEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var ExportSchemaMenuOptionsFactory = function ExportSchemaMenuOptionsFactory(options) {
  this.initialize(options);
};

_.extend(ExportSchemaMenuOptionsFactory.prototype, {
  initialize: function initialize(options) {
    this.exportJSON = options.exportJSON;
    this.schemaIsIntegralAndCompleteSpecification = options.schemaIsIntegralAndCompleteSpecification;
  },
  create: function create() {
    var options = [{
      label: i18nMessage('domain.designer.menu.exportDesignXml'),
      triggerEvent: menuEventsEnum.DOWNLOAD_SCHEMA_XML,
      action: 'downloadSchemaXml',
      test: this.schemaIsIntegralAndCompleteSpecification.isSatisfied
    }];

    if (this.exportJSON) {
      options = [{
        label: i18nMessage('domain.designer.menu.exportDesignJson'),
        triggerEvent: menuEventsEnum.DOWNLOAD_SCHEMA_JSON,
        action: 'downloadSchemaJson',
        test: this.schemaIsIntegralAndCompleteSpecification.isSatisfied
      }].concat(options);
    }

    return options;
  }
});

module.exports = ExportSchemaMenuOptionsFactory;

});