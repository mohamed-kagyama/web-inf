define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Validation = require("../validation/Validation");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      template: options.template,
      components: {
        validation: Validation
      },
      props: ['message', 'type']
    };
  }
};

});