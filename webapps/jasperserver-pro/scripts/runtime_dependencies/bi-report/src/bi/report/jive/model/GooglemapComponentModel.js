define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BaseComponentModel = require('./BaseComponentModel');

var jiveTypes = require('../enum/jiveTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BaseComponentModel.extend({
  defaults: {
    id: null,
    instanceData: null,
    module: 'jasperreports-map',
    type: jiveTypes.GOOGLEMAP
  }
});

});