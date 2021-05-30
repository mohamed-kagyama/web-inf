define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var dimNamePrefixRegexp2 = /(\[[\w\s.-]+\]\.){2}/;
var dimNamePrefixRegexp1 = /(\[[\w\s.-]+\]\.){1}/;
var dashRegexp = /\]\.\[/g;
var bracketsRegexp = /^\[([^\]]+)\]$/g;

var OlapFilterValueFormatter = function OlapFilterValueFormatter(isFirstLevelAll) {
  _.bindAll(this, 'format');

  this.dimNamePrefixRegexp = isFirstLevelAll ? dimNamePrefixRegexp2 : dimNamePrefixRegexp1;
};

_.extend(OlapFilterValueFormatter.prototype, {
  format: function format(value) {
    //usual OLAP value is [Dimension].[All Level].[Member1]....
    //Remove dimension name and All level prefixes
    value = value.replace(this.dimNamePrefixRegexp, '');
    value = value.replace(dashRegexp, ' - ');
    value = value.replace(bracketsRegexp, '$1');
    return value;
  }
});

module.exports = OlapFilterValueFormatter;

});