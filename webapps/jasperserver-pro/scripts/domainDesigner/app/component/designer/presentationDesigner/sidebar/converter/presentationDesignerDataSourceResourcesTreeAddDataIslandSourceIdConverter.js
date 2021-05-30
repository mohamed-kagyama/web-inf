define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = presentationDesignerItemTableReferenceIdProcessor;

function presentationDesignerItemTableReferenceIdProcessor(item, options) {
  if (options.tableReference) {
    item.dataIslandSourceId = options.tableReference.id;
  }

  return item;
}

});