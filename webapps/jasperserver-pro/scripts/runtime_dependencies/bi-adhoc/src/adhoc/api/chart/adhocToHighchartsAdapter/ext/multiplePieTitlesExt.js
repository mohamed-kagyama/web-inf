define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Highcharts = require("highcharts");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @author: Igor Nesterenko
 * @version: $Id$
 */

/*
     Pie title plugin http://jsfiddle.net/highcharts/tnSRA/.
     It allows to have title attached to each pie in multi-pie chart.
     */
Highcharts.wrap(Highcharts.seriesTypes.pie.prototype, 'render', function (proceed) {
  var chart = this.chart,
      center = this.center || this.yAxis && this.yAxis.center,
      titleOption = this.options.title,
      box;
  proceed.call(this);

  if (center && titleOption) {
    box = {
      x: chart.plotLeft + center[0] - 0.5 * center[2],
      y: chart.plotTop + center[1] - 0.5 * center[2],
      width: center[2],
      height: center[2]
    };

    if (!this.title) {
      this.title = this.chart.renderer.label(titleOption.text).css(titleOption.style).add().align(titleOption, null, box);
    } else {
      this.title.align(titleOption, null, box);
    }
  }
});
module.exports = Highcharts;

});