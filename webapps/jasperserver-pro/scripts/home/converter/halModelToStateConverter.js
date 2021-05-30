define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _sidebarBlocksConverter = require('./sidebarBlocksConverter');

var sidebarBlocksConverter = _sidebarBlocksConverter.sidebarBlocksConverter;

var _workflowsConverter = require('./workflowsConverter');

var workflowsConverter = _workflowsConverter.workflowsConverter;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var createHalModelToStateConverter = function createHalModelToStateConverter(toSidebarBlocksConverter, toWorkflowsConverter) {
  return function (recentResources, contentReferences, workflows) {
    return {
      sidebarBlocks: toSidebarBlocksConverter(recentResources, contentReferences),
      workflows: toWorkflowsConverter(workflows)
    };
  };
};

var halModelToStateConverter = createHalModelToStateConverter(sidebarBlocksConverter, workflowsConverter);
exports.createHalModelToStateConverter = createHalModelToStateConverter;
exports.halModelToStateConverter = halModelToStateConverter;

});