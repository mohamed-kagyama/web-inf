define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  schemaElementNameNotSupportedSymbolsRegexp: "^\\d|[\\s\\*\\(\\)\\-=\\+:\\.\"\\\\/<>\\[\\]'!]+",
  schemaElementNameNotSupportedSymbols: "\\*\\(\\)\\-\\+=:;\\.\\,\"\\\\/<>\\[\\]'!\\{\\}",
  nullLabel: "nullLabel",
  presentationElementNameLengthLimit: 100,
  presentationElementLabelLengthLimit: 100,
  presentationElementLabelIdLengthLimit: 256,
  presentationElementDescriptionLengthLimit: 256,
  presentationElementDescriptionIdLengthLimit: 256,
  supportedDataSources: ["jdbcDataSource", "jndiJdbcDataSource", "virtualDataSource", "awsDataSource", "azureSqlDataSource", "customDataSource"]
};

});