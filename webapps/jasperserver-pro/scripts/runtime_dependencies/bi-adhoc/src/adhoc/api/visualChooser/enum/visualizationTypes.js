define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = [{
  name: 'dataGrid',
  cssClass: 'jr-mTab-item-iconGrid',
  bundleName: 'adhoc.visualisation.chooser.type.GROUP_DATA_GRID',
  chartTypes: [{
    legacyAdhoc: 'crosstab',
    cssClass: 'Crosstab',
    bundleName: 'adhoc.visualisation.chooser.type.CROSSTAB',
    name: 'Crosstab',
    supportsResize: true,
    requirements: {
      measures: {
        min: 1
      },
      fields: {
        min: 0
      }
    }
  }, {
    legacyAdhoc: 'table',
    cssClass: 'Table',
    highchartsName: 'column',
    bundleName: 'adhoc.visualisation.chooser.type.TABLE',
    name: 'Table',
    supportsResize: true,
    requirements: {
      categorizerDefaultOnly: true,
      measures: {
        min: 0,
        inRow: false
      },
      fields: {
        min: 0
      }
    }
  }]
}, {
  name: 'columnAndBar',
  cssClass: 'jr-mTab-item-iconBar',
  bundleName: 'adhoc.visualisation.chooser.type.GROUP_COLUMN_AND_BAR',
  chartTypes: [{
    legacyAdhoc: 'column',
    cssClass: 'Column',
    highchartsName: 'column',
    bundleName: 'adhoc.visualisation.chooser.type.COLUMN',
    name: 'Column',
    supportsResize: true,
    requirements: {
      measures: {
        min: 1
      },
      fields: {
        min: 0
      }
    }
  }, {
    legacyAdhoc: 'stacked_column',
    cssClass: 'ColumnStacked',
    highchartsName: 'column',
    bundleName: 'adhoc.visualisation.chooser.type.STACKED_COLUMN',
    name: 'StackedColumn',
    supportsResize: true,
    requirements: {
      measures: {
        min: 1
      },
      fields: {
        min: 0
      }
    }
  }, {
    legacyAdhoc: 'percent_column',
    cssClass: 'ColumnPercent',
    highchartsName: 'column',
    bundleName: 'adhoc.visualisation.chooser.type.PERCENT_COLUMN',
    name: 'StackedPercentColumn',
    supportsResize: true,
    requirements: {
      measures: {
        min: 1
      },
      fields: {
        min: 0
      }
    }
  }, {
    legacyAdhoc: 'bar',
    cssClass: 'Bar',
    highchartsName: 'bar',
    bundleName: 'adhoc.visualisation.chooser.type.BAR',
    name: 'Bar',
    supportsResize: true,
    requirements: {
      measures: {
        min: 1
      },
      fields: {
        min: 0
      }
    }
  }, {
    legacyAdhoc: 'stacked_bar',
    cssClass: 'BarStacked',
    highchartsName: 'bar',
    bundleName: 'adhoc.visualisation.chooser.type.STACKED_BAR',
    name: 'StackedBar',
    supportsResize: true,
    requirements: {
      measures: {
        min: 1
      },
      fields: {
        min: 0
      }
    }
  }, {
    legacyAdhoc: 'percent_bar',
    cssClass: 'BarPercent',
    highchartsName: 'bar',
    bundleName: 'adhoc.visualisation.chooser.type.PERCENT_BAR',
    name: 'StackedPercentBar',
    supportsResize: true,
    requirements: {
      measures: {
        min: 1
      },
      fields: {
        min: 0
      }
    }
  }, {
    legacyAdhoc: 'spider_column',
    cssClass: 'ColumnSpider',
    highchartsName: 'column',
    bundleName: 'adhoc.visualisation.chooser.type.SPIDER_COLUMN',
    name: 'SpiderColumn',
    supportsResize: true,
    requirements: {
      measures: {
        min: 1
      },
      fields: {
        min: 0
      }
    }
  }]
}, {
  name: 'lineAndArea',
  cssClass: 'jr-mTab-item-iconLine',
  bundleName: 'adhoc.visualisation.chooser.type.GROUP_LINE_AND_AREA',
  chartTypes: [{
    legacyAdhoc: 'line',
    cssClass: 'Line',
    highchartsName: 'line',
    bundleName: 'adhoc.visualisation.chooser.type.LINE',
    name: 'Line',
    supportsResize: true,
    requirements: {
      measures: {
        min: 1
      },
      fields: {
        min: 0
      }
    }
  }, {
    legacyAdhoc: 'spline',
    cssClass: 'Spline',
    highchartsName: 'spline',
    bundleName: 'adhoc.visualisation.chooser.type.SPLINE',
    name: 'Spline',
    supportsResize: true,
    requirements: {
      measures: {
        min: 1
      },
      fields: {
        min: 0
      }
    }
  }, {
    legacyAdhoc: 'area',
    cssClass: 'Area',
    highchartsName: 'area',
    bundleName: 'adhoc.visualisation.chooser.type.AREA',
    name: 'Area',
    supportsResize: true,
    requirements: {
      measures: {
        min: 1
      },
      fields: {
        min: 0
      }
    }
  }, {
    legacyAdhoc: 'stacked_area',
    cssClass: 'AreaStacked',
    highchartsName: 'area',
    bundleName: 'adhoc.visualisation.chooser.type.STACKED_AREA',
    name: 'StackedArea',
    supportsResize: true,
    requirements: {
      measures: {
        min: 1
      },
      fields: {
        min: 0
      }
    }
  }, {
    legacyAdhoc: 'percent_area',
    cssClass: 'AreaPercent',
    highchartsName: 'area',
    bundleName: 'adhoc.visualisation.chooser.type.PERCENT_AREA',
    name: 'StackedPercentArea',
    supportsResize: true,
    requirements: {
      measures: {
        min: 1
      },
      fields: {
        min: 0
      }
    }
  }, {
    legacyAdhoc: 'spline_area',
    cssClass: 'AreaSpline',
    highchartsName: 'areaspline',
    bundleName: 'adhoc.visualisation.chooser.type.AREA_SPLINE',
    name: 'AreaSpline',
    supportsResize: true,
    requirements: {
      measures: {
        min: 1
      },
      fields: {
        min: 0
      }
    }
  }, {
    legacyAdhoc: 'spider_line',
    cssClass: 'LineSpider',
    highchartsName: 'line',
    bundleName: 'adhoc.visualisation.chooser.type.SPIDER_LINE',
    name: 'SpiderLine',
    supportsResize: true,
    requirements: {
      measures: {
        min: 1
      },
      fields: {
        min: 0
      }
    }
  }, {
    legacyAdhoc: 'spider_area',
    cssClass: 'AreaSpider',
    highchartsName: 'area',
    bundleName: 'adhoc.visualisation.chooser.type.SPIDER_AREA',
    name: 'SpiderArea',
    supportsResize: true,
    requirements: {
      measures: {
        min: 1
      },
      fields: {
        min: 0
      }
    }
  }]
}, {
  name: 'dualAndMultiAxis',
  cssClass: 'jr-mTab-item-iconMultiAxis',
  bundleName: 'adhoc.visualisation.chooser.type.GROUP_DUAL_AND_MULTI_AXIS',
  chartTypes: [{
    legacyAdhoc: 'column_line',
    cssClass: 'ColumnLine',
    highchartsName: '',
    bundleName: 'adhoc.visualisation.chooser.type.COLUMN_LINE',
    name: 'ColumnLine',
    supportsResize: true,
    requirements: {
      measures: {
        min: 2,
        inRow: false
      },
      fields: {
        min: 0,
        inColumn: false
      }
    }
  }, {
    legacyAdhoc: 'column_spline',
    cssClass: 'ColumnSpline',
    highchartsName: '',
    bundleName: 'adhoc.visualisation.chooser.type.COLUMN_SPLINE',
    name: 'ColumnSpline',
    supportsResize: true,
    requirements: {
      measures: {
        min: 2,
        inRow: false
      },
      fields: {
        min: 0,
        inColumn: false
      }
    }
  }, {
    legacyAdhoc: 'stacked_column_line',
    cssClass: 'ColumnLineStacked',
    highchartsName: '',
    bundleName: 'adhoc.visualisation.chooser.type.STACKED_COLUMN_LINE',
    name: 'StackedColumnLine',
    supportsResize: true,
    requirements: {
      measures: {
        min: 3,
        inRow: false
      },
      fields: {
        min: 0,
        inColumn: false
      }
    }
  }, {
    legacyAdhoc: 'stacked_column_spline',
    cssClass: 'ColumnSplineStacked',
    highchartsName: '',
    bundleName: 'adhoc.visualisation.chooser.type.STACKED_COLUMN_SPLINE',
    name: 'StackedColumnSpline',
    supportsResize: true,
    requirements: {
      measures: {
        min: 3,
        inRow: false
      },
      fields: {
        min: 0,
        inColumn: false
      }
    }
  }, {
    legacyAdhoc: 'multi_axis_line',
    cssClass: 'LineMultiAxis',
    highchartsName: '',
    bundleName: 'adhoc.visualisation.chooser.type.MULTI_AXIS_LINE',
    name: 'MultiAxisLine',
    supportsResize: true,
    requirements: {
      measures: {
        min: 2,
        inRow: false
      },
      fields: {
        min: 0,
        inColumn: false
      }
    }
  }, {
    legacyAdhoc: 'multi_axis_spline',
    cssClass: 'SplineMultiAxis',
    highchartsName: '',
    bundleName: 'adhoc.visualisation.chooser.type.MULTI_AXIS_SPLINE',
    name: 'MultiAxisSpline',
    supportsResize: true,
    requirements: {
      measures: {
        min: 2,
        inRow: false
      },
      fields: {
        min: 0,
        inColumn: false
      }
    }
  }, {
    legacyAdhoc: 'multi_axis_column',
    cssClass: 'ColumnMultiAxis',
    highchartsName: '',
    bundleName: 'adhoc.visualisation.chooser.type.MULTI_AXIS_COLUMN',
    name: 'MultiAxisColumn',
    supportsResize: true,
    requirements: {
      measures: {
        min: 2,
        inRow: false
      },
      fields: {
        min: 0,
        inColumn: false
      }
    }
  }]
}, {
  name: 'timeSeries',
  cssClass: 'jr-mTab-item-iconTime',
  bundleName: 'adhoc.visualisation.chooser.type.GROUP_TIME_SERIES',
  chartTypes: [{
    legacyAdhoc: 'line_time_series',
    cssClass: 'Line',
    highchartsName: 'line',
    bundleName: 'adhoc.visualisation.chooser.type.LINE_TIME_SERIES',
    name: 'TimeSeriesLine',
    isTimeSeries: true,
    supportsResize: true,
    requirements: {
      measures: {
        min: 1,
        inRow: false
      },
      fields: {
        min: 1,
        max: 1,
        inColumn: false,
        type: 'time',
        categorizer: ['day', 'hour', 'minute', 'second', 'millisecond', 'hour_by_day', 'minute_by_day', 'second_by_day', 'millisecond_by_day']
      }
    }
  }, {
    legacyAdhoc: 'spline_time_series',
    cssClass: 'Spline',
    highchartsName: 'spline',
    bundleName: 'adhoc.visualisation.chooser.type.SPLINE_TIME_SERIES',
    name: 'TimeSeriesSpline',
    isTimeSeries: true,
    supportsResize: true,
    requirements: {
      measures: {
        min: 1,
        inRow: false
      },
      fields: {
        min: 1,
        max: 1,
        inColumn: false,
        type: 'time',
        categorizer: ['day', 'hour', 'minute', 'second', 'millisecond', 'hour_by_day', 'minute_by_day', 'second_by_day', 'millisecond_by_day']
      }
    }
  }, {
    legacyAdhoc: 'area_time_series',
    cssClass: 'Area',
    highchartsName: 'area',
    bundleName: 'adhoc.visualisation.chooser.type.AREA_TIME_SERIES',
    name: 'TimeSeriesArea',
    isTimeSeries: true,
    supportsResize: true,
    requirements: {
      measures: {
        min: 1,
        inRow: false
      },
      fields: {
        min: 1,
        max: 1,
        inColumn: false,
        type: 'time',
        categorizer: ['day', 'hour', 'minute', 'second', 'millisecond', 'hour_by_day', 'minute_by_day', 'second_by_day', 'millisecond_by_day']
      }
    }
  }, {
    legacyAdhoc: 'spline_area_time_series',
    cssClass: 'AreaSpline',
    highchartsName: 'areaspline',
    bundleName: 'adhoc.visualisation.chooser.type.SPLINE_AREA_TIME_SERIES',
    name: 'TimeSeriesAreaSpline',
    isTimeSeries: true,
    supportsResize: true,
    requirements: {
      measures: {
        min: 1,
        inRow: false
      },
      fields: {
        min: 1,
        max: 1,
        inColumn: false,
        type: 'time',
        categorizer: ['day', 'hour', 'minute', 'second', 'millisecond', 'hour_by_day', 'minute_by_day', 'second_by_day', 'millisecond_by_day']
      }
    }
  }]
}, {
  name: 'scatterAndBubble',
  cssClass: 'jr-mTab-item-iconScatter',
  bundleName: 'adhoc.visualisation.chooser.type.GROUP_SCATTER_AND_BUBBLE',
  chartTypes: [{
    legacyAdhoc: 'scatter',
    cssClass: 'Scatter',
    highchartsName: 'scatter',
    bundleName: 'adhoc.visualisation.chooser.type.SCATTER',
    name: 'Scatter',
    supportsResize: true,
    requirements: {
      measures: {
        min: 2,
        max: 2,
        inRow: false
      },
      fields: {
        min: 0
      },
      placement: {
        forbidden: [{
          column: '[f]+[m]{2}[f]+',
          row: '[fm]*'
        }]
      }
    }
  }, {
    legacyAdhoc: 'bubble',
    cssClass: 'Bubble',
    highchartsName: 'bubble',
    bundleName: 'adhoc.visualisation.chooser.type.BUBBLE',
    name: 'Bubble',
    supportsResize: true,
    requirements: {
      measures: {
        min: 3,
        max: 3,
        inRow: false
      },
      fields: {
        min: 0
      },
      placement: {
        forbidden: [{
          column: '[f]+[m]{3}[f]+',
          row: '[fm]*'
        }]
      }
    }
  }]
}, {
  name: 'pie',
  cssClass: 'jr-mTab-item-iconPie',
  bundleName: 'adhoc.visualisation.chooser.type.GROUP_PIE',
  chartTypes: [{
    legacyAdhoc: 'pie',
    cssClass: 'Pie',
    highchartsName: 'pie',
    bundleName: 'adhoc.visualisation.chooser.type.PIE',
    name: 'Pie',
    supportsResize: false,
    requirements: {
      measures: {
        min: 1
      },
      fields: {
        min: 0
      }
    }
  }, {
    legacyAdhoc: 'dual_level_pie',
    cssClass: 'PieDual',
    highchartsName: 'pie',
    bundleName: 'adhoc.visualisation.chooser.type.DUAL_LEVEL_PIE',
    name: 'DualLevelPie',
    supportsResize: false,
    requirements: {
      measures: {
        min: 1
      },
      fields: {
        min: 1,
        inColumn: false
      },
      placement: {
        allowed: [{
          column: 'm',
          row: '[f]{1,2}'
        }, {
          column: '',
          row: 'f[m]+'
        }, {
          column: '',
          row: '[m]+f'
        }]
      }
    }
  }, {
    legacyAdhoc: 'semi_pie',
    cssClass: 'PieSemi',
    highchartsName: 'pie',
    bundleName: 'adhoc.visualisation.chooser.type.SEMI_PIE',
    name: 'SemiPie',
    supportsResize: false,
    requirements: {
      measures: {
        min: 1
      },
      fields: {
        min: 0
      }
    }
  }]
}, {
  name: 'range',
  cssClass: 'jr-mTab-item-iconRange',
  bundleName: 'adhoc.visualisation.chooser.type.GROUP_RANGE',
  chartTypes: [{
    legacyAdhoc: 'heat_map',
    cssClass: 'HeatMap',
    highchartsName: 'heatmap',
    bundleName: 'adhoc.visualisation.chooser.type.HEAT_MAP',
    name: 'HeatMap',
    supportsResize: true,
    requirements: {
      measures: {
        min: 1,
        max: 1,
        inRow: false
      },
      fields: {
        min: 2,
        max: 2
      },
      placement: {
        allowed: [{
          column: 'fm',
          row: 'f'
        }]
      }
    }
  }, {
    legacyAdhoc: 'heat_map_time_series',
    cssClass: 'HeatMapTime',
    highchartsName: 'heatmap',
    bundleName: 'adhoc.visualisation.chooser.type.TIME_SERIES_HEAT_MAP',
    name: 'TimeSeriesHeatMap',
    supportsResize: false,
    isTimeSeries: true,
    requirements: {
      measures: {
        min: 1,
        max: 1,
        inRow: false
      },
      fields: {
        min: 1,
        max: 1,
        inColumn: false,
        type: 'time',
        categorizer: ['hour_by_day']
      }
    }
  }, {
    legacyAdhoc: 'dual_measure_tree_map',
    cssClass: 'TreeMapDual',
    highchartsName: 'treemap',
    bundleName: 'adhoc.visualisation.chooser.type.DUAL_MEASURE_TREE_MAP',
    name: 'DualMeasureTreeMap',
    supportsResize: true,
    requirements: {
      measures: {
        min: 2,
        max: 2,
        inRow: false
      },
      fields: {
        min: 1,
        max: 1,
        inColumn: false
      }
    }
  }, {
    legacyAdhoc: 'tree_map',
    cssClass: 'TreeMap',
    highchartsName: 'treemap',
    bundleName: 'adhoc.visualisation.chooser.type.TREE_MAP',
    name: 'TreeMap',
    supportsResize: true,
    requirements: {
      measures: {
        min: 1,
        max: 1,
        inRow: false
      },
      fields: {
        min: 1,
        inColumn: false
      }
    }
  }, {
    legacyAdhoc: 'one_parent_tree_map',
    cssClass: 'TreeMapParent',
    highchartsName: 'treemap',
    bundleName: 'adhoc.visualisation.chooser.type.ONE_PARENT_TREE_MAP',
    name: 'OneParentTreeMap',
    supportsResize: true,
    requirements: {
      measures: {
        min: 1,
        max: 1,
        inRow: false
      },
      fields: {
        min: 2,
        inColumn: false
      }
    }
  }]
}, {
  name: 'gauge',
  cssClass: 'jr-mTab-item-iconGauge',
  bundleName: 'adhoc.visualisation.chooser.type.GROUP_GAUGE',
  chartTypes: [{
    legacyAdhoc: 'gauge',
    cssClass: 'Gauge',
    highchartsName: 'solidgauge',
    bundleName: 'adhoc.visualisation.chooser.type.GAUGE',
    name: 'Gauge',
    supportsResize: false,
    requirements: {
      measures: {
        min: 1,
        inRow: false
      },
      fields: {
        inRow: false
      }
    }
  }, {
    legacyAdhoc: 'multi_level_gauge',
    cssClass: 'MultiLevelGauge',
    highchartsName: 'solidgauge',
    bundleName: 'adhoc.visualisation.chooser.type.MULTI_LEVEL_GAUGE',
    name: 'MultiLevelGauge',
    supportsResize: false,
    requirements: {
      measures: {
        min: 2,
        inRow: false
      },
      fields: {
        inRow: false
      }
    }
  }, {
    legacyAdhoc: 'arc_gauge',
    cssClass: 'ArcGauge',
    highchartsName: 'solidgauge',
    bundleName: 'adhoc.visualisation.chooser.type.ARC_GAUGE',
    name: 'ArcGauge',
    supportsResize: false,
    requirements: {
      measures: {
        min: 1,
        inRow: false
      },
      fields: {
        inRow: false
      }
    }
  }]
}];

});