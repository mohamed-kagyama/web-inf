define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Highcharts = require("highcharts");

require("highcharts-grouped-categories");

require('./ext/multiplePieTitlesExt');

require("highcharts-more");

require("highcharts-heatmap");

require("highcharts-treemap");

require("highcharts-solid-gauge");

require("highcharts-3d");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @author: Igor Nesterenko
 * @version: $Id$
 */

/**
 *  Extend Highcharts with plugin and extensions,
 */
module.exports = Highcharts;

});