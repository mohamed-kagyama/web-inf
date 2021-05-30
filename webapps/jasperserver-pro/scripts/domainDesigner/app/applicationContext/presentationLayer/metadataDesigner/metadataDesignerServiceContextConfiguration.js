define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var MetadataDesignerViewStateModelService = require("../../../model/service/MetadataDesignerViewStateModelService");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (context, options) {
  context.register('metadataDesignerViewStateModelService', new MetadataDesignerViewStateModelService({
    viewStateModel: context.get('viewStateModelReadOnlyFacade')
  }));
};

});