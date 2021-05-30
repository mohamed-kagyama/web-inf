define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ClientSchemaDataStoreDataAdapter = function ClientSchemaDataStoreDataAdapter(options) {
  this.initialize(options);
};

_.extend(ClientSchemaDataStoreDataAdapter.prototype, {
  initialize: function initialize(options) {
    this.schemaModelConverter = options.schemaModelConverter;
  },
  deserialize: function deserialize(data) {
    return this.schemaModelConverter.parse({
      json: data
    });
  },
  serialize: function serialize(collections) {
    return this.schemaModelConverter.toJSON(collections);
  }
});

module.exports = ClientSchemaDataStoreDataAdapter;

});