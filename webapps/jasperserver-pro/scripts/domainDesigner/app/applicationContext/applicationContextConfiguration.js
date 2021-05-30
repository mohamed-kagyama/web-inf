define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var devToolsContextConfiguration = require("./devTools/devToolsContextConfiguration");

var applicationContextCleanup = require("./applicationContextCleanup");

var applicationEventBusContextConfiguration = require("./eventBus/applicationEventBusContextConfiguration");

var applicationDispatcherContextConfiguration = require('./applicationDispatcher/applicationDispatcherContextConfiguration');

var applicationPreviousLocationContextConfiguration = require("./util/applicationPreviousLocationContextConfiguration");

var modelsContextConfiguration = require('./model/modelsContextConfiguration');

var clientServicesContextConfiguration = require('./model/clientServicesContextConfiguration');

var postClientServicesSpecificationsContextConfiguration = require('./model/postClientServicesSpecificationsContextConfiguration');

var viewStateModelContextConfiguration = require('./model/viewStateModelContextConfiguration');

var requestContextConfiguration = require("./rest/requestContextConfiguration");

var restServicesContextConfiguration = require("./rest/restServicesContextConfiguration");

var clientSpecificationsContextConfiguration = require("./model/clientSpecificationsContextConfiguration");

var wrappedRestServicesContextConfiguration = require("./rest/wrappedRestServicesContextConfiguration");

var componentsContextConfiguration = require("./presentationLayer/componentsContextConfiguration");

var asyncClientServicesContextConfiguration = require('./model/asyncClientServicesContextConfiguration');

var filterExpressionSerializerContextConfiguration = require("./presentationLayer/filtersDesigner/filterExpressionSerializerContextConfiguration");

var draftStateContextConfiguration = require("./util/draftStateContextConfiguration");

var createRepositoryResourceChooserDialogContextConfiguration = require("./presentationLayer/repositoryResourceChooser/repositoryResourceChooserDialogContextConfiguration");

var dependenciesTrackingContextConfiguration = require("./dependenciesTracking/dependenciesTrackingContextConfiguration");

var validationContextConfiguration = require('./validation/validationContextConfiguration');

var applicationViewContextConfiguration = require("./presentationLayer/applicationViewContextConfiguration");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  configure: function configure(context, options) {
    applicationEventBusContextConfiguration(context, options);
    modelsContextConfiguration(context, options);
    requestContextConfiguration(context, options);
    restServicesContextConfiguration(context, options);
    viewStateModelContextConfiguration(context, options);
    clientServicesContextConfiguration(context, options);
    clientSpecificationsContextConfiguration(context, options);
    postClientServicesSpecificationsContextConfiguration(context, options);
    componentsContextConfiguration(context, options);
    wrappedRestServicesContextConfiguration(context, options);
    asyncClientServicesContextConfiguration(context, options);
    applicationPreviousLocationContextConfiguration(context, options);
    filterExpressionSerializerContextConfiguration(context, options);
    createRepositoryResourceChooserDialogContextConfiguration(context, options);
    dependenciesTrackingContextConfiguration(context, options);
    validationContextConfiguration(context, options);
    applicationDispatcherContextConfiguration(context, options);
    applicationViewContextConfiguration(context, options);
    draftStateContextConfiguration(context, options);
    devToolsContextConfiguration(context, options);
  },
  remove: applicationContextCleanup.cleanup
};

});