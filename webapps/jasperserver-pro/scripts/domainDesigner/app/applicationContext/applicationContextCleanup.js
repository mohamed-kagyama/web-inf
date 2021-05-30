define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function cleanupModule(module) {
  if (_.isFunction(module.remove)) {
    // By convention module cleanup method should be named 'remove'
    module.remove();
  } else if (_.isFunction(module.stopListening)) {
    // For modules which extends Backbone.Events
    module.stopListening();
  }
}

function cleanupContext(context) {
  _.each(context.getNames(), function (name) {
    context.remove(name, cleanupModule);
  });
}

module.exports = {
  cleanup: cleanupContext
};

});