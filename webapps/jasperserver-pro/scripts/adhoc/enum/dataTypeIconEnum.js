define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  string: ['java.lang.String'],
  numeric: ['java.lang.Byte', 'java.lang.Integer', 'java.lang.Short', 'java.lang.Long', 'java.math.BigInteger', 'java.lang.Float', 'java.lang.Double', 'java.math.BigDecimal', 'java.lang.Number'],
  date: ['java.sql.Date', 'java.util.Date'],
  time: ['java.sql.Timestamp', 'java.sql.Time'],
  "boolean": ['java.lang.Boolean']
};

});