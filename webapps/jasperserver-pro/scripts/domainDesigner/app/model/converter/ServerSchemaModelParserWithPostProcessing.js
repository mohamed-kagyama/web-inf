define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ServerSchemaModelParserWithPostProcessing = function ServerSchemaModelParserWithPostProcessing(options) {
  this.initialize(options);
};

_.extend(ServerSchemaModelParserWithPostProcessing.prototype, {
  initialize: function initialize(options) {
    this.parser = options.parser;
    this.postProcess = options.postProcess;
  },
  parse: function parse(schema) {
    var collections = this.parser.parse(schema);
    return this.postProcess(collections);
  }
});

module.exports = ServerSchemaModelParserWithPostProcessing;

});