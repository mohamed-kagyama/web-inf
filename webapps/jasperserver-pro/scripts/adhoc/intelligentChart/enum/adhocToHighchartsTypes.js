define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @author: Igor Nesterenko
 * @version: $Id$
 */
module.exports = {
  column: 'column',
  stacked_column: 'column',
  percent_column: 'column',
  bar: 'bar',
  stacked_bar: 'bar',
  percent_bar: 'bar',
  spider_column: 'column',
  line: 'line',
  spline: 'spline',
  spline_area: 'areaspline',
  area: 'area',
  stacked_area: 'area',
  percent_area: 'area',
  spider_line: 'line',
  spider_area: 'area',
  pie: 'pie',
  semi_pie: 'pie',
  dual_level_pie: 'pie',
  line_time_series: 'line',
  spline_time_series: 'spline',
  area_time_series: 'area',
  spline_area_time_series: 'areaspline',
  // We do not set common chart type for dual and multi-axis charts because it is set
  // for each series independently.
  column_line: '',
  column_spline: '',
  stacked_column_line: '',
  stacked_column_spline: '',
  multi_axis_line: '',
  multi_axis_spline: '',
  multi_axis_column: '',
  scatter: 'scatter',
  //scatter_line: 'scatter',
  bubble: 'bubble',
  heat_map: 'heatmap',
  heat_map_time_series: 'heatmap',
  gauge: 'solidgauge',
  multi_level_gauge: 'solidgauge',
  arc_gauge: 'solidgauge',
  dual_measure_tree_map: 'treemap',
  tree_map: 'treemap',
  one_parent_tree_map: 'treemap'
};

});