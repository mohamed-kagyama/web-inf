define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var serverSchemaModelParserErrorEnum = require("../enum/serverSchemaModelParserErrorEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var AsyncServerSchemaModelParserService = function AsyncServerSchemaModelParserService(options) {
  this.serverSchemaModelParser = options.serverSchemaModelParser;
};

_.extend(AsyncServerSchemaModelParserService.prototype, {
  parse: function parse(schema) {
    var resultDeferred = new $.Deferred(),
        result;

    try {
      result = this.serverSchemaModelParser.parse(schema);
      resultDeferred.resolve(result);
    } catch (e) {
      resultDeferred.reject({
        responseJSON: {
          errorCode: serverSchemaModelParserErrorEnum.PARSER_ERROR,
          parameters: [e.toString()]
        }
      });
    }

    return resultDeferred;
  }
});

module.exports = AsyncServerSchemaModelParserService;

});