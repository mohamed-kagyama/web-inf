define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var applicationStateEventsEnum = require("../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SaveDomainIsSuccessfulState = function SaveDomainIsSuccessfulState(options) {
  this.initialize(options);
};

_.extend(SaveDomainIsSuccessfulState.prototype, {
  initialize: function initialize(options) {
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.clientDomainValidationService = options.clientDomainValidationService;
    this.serverResourcePropertiesModelParser = options.serverResourcePropertiesModelParser;
    this.clientResourcePropertiesService = options.clientResourcePropertiesService;
  },
  enter: function enter(context) {
    var resourcesContent = this._getResourcesContent();

    var resourceProperties = this.serverResourcePropertiesModelParser.parse(context.response, resourcesContent);
    var state = this.clientDomainValidationService.getDesignerStateAfterSave();
    state.resourceProperties = resourceProperties;
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.SAVE_SUCCESS, state);
  },
  _getResourcesContent: function _getResourcesContent() {
    var existingProperties = this.clientResourcePropertiesService.serializeToClientModel();
    var securityFileContent, bundlesContent;

    if (existingProperties.securityFile) {
      securityFileContent = existingProperties.securityFile.content;
    }

    if (existingProperties.bundles) {
      bundlesContent = existingProperties.bundles.map(function (bundle) {
        return bundle.content;
      });
    }

    return {
      bundlesContent: bundlesContent,
      securityFileContent: securityFileContent
    };
  }
});

module.exports = SaveDomainIsSuccessfulState;

});