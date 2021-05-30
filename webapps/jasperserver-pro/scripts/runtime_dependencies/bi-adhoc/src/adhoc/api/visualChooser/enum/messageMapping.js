define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18nAdhoc = require("bundle!AdHocBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved.
 * http://www.jaspersoft.com.
 *
 * Unless you have purchased a commercial license agreement from Jaspersoft,
 * the following license terms apply:
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
module.exports = {
  'crosstab': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.column.or.row']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.column.or.row']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconCrosstab '
  },
  'table': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.groups']
    },
    'thirdRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconTable'
  },
  'column': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      }
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      }
    },
    'cssClass': 'jr-mVisualchooser-rule-iconColumn'
  },
  'stacked_column': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      }
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      }
    },
    'cssClass': 'jr-mVisualchooser-rule-iconColumnStacked'
  },
  'percent_column': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      }
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      }
    },
    'cssClass': 'jr-mVisualchooser-rule-iconColumnPercent'
  },
  'bar': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      }
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      }
    },
    'cssClass': 'jr-mVisualchooser-rule-iconBar'
  },
  'stacked_bar': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      }
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      }
    },
    'cssClass': 'jr-mVisualchooser-rule-iconBarStacked'
  },
  'percent_bar': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      }
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      }
    },
    'cssClass': 'jr-mVisualchooser-rule-iconBarPercent'
  },
  'spider_column': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconColumnSpider'
  },
  'line': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.one.date.time'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.field'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'thirdRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconLine'
  },
  'spline': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.one.date.time'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.field'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'thirdRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconSpline'
  },
  'area': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.one.date.time'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.field'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'thirdRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconArea'
  },
  'stacked_area': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.one.date.time'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.field'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'thirdRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconAreaStacked'
  },
  'percent_area': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.one.date.time'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.field'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'thirdRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconAreaPercent'
  },
  'spline_area': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.one.date.time'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.field'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'thirdRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconAreaSpline'
  },
  'spider_line': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconLineSpider'
  },
  'spider_area': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconAreaSpider'
  },
  'column_line': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.zero'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'thirdRule': {
      'first': i18nAdhoc['adhoc.rule.two.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconColumnLine'
  },
  'column_spline': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.zero'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'thirdRule': {
      'first': i18nAdhoc['adhoc.rule.two.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconColumnSpline'
  },
  'stacked_column_line': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.zero'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'thirdRule': {
      'first': i18nAdhoc['adhoc.rule.three.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconColumnLineStacked'
  },
  'stacked_column_spline': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.zero'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'thirdRule': {
      'first': i18nAdhoc['adhoc.rule.three.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconColumnSplineStacked'
  },
  'multi_axis_line': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.zero'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'thirdRule': {
      'first': i18nAdhoc['adhoc.rule.two.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconLineMultiAxis'
  },
  'multi_axis_spline': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.zero'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'thirdRule': {
      'first': i18nAdhoc['adhoc.rule.two.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconSplineMultiAxis'
  },
  'multi_axis_column': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.zero'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'thirdRule': {
      'first': i18nAdhoc['adhoc.rule.two.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconColumnMultiAxis'
  },
  'line_time_series': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.time.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'thirdRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'fourthRule': {
      'first': i18nAdhoc['adhoc.rule.time.desciption']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconTimeSeriesLine'
  },
  'spline_time_series': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.time.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'thirdRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'fourthRule': {
      'first': i18nAdhoc['adhoc.rule.time.desciption']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconTimeSeriesSpline'
  },
  'area_time_series': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.time.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'thirdRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'fourthRule': {
      'first': i18nAdhoc['adhoc.rule.time.desciption']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconTimeSeriesArea'
  },
  'spline_area_time_series': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.time.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'thirdRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'fourthRule': {
      'first': i18nAdhoc['adhoc.rule.time.desciption']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconTimeSeriesAreaSpline'
  },
  'scatter': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.column.andor.row']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.two'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconScatter'
  },
  'bubble': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.column.andor.row']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.three'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconBubble'
  },
  'pie': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      }
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      }
    },
    'cssClass': 'jr-mVisualchooser-rule-iconPie'
  },
  'dual_level_pie': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.one.two'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.zero'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'thirdRule': {
      'first': i18nAdhoc['adhoc.rule.one'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measure'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconPieDual'
  },
  'semi_pie': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      }
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      }
    },
    'cssClass': 'jr-mVisualchooser-rule-iconPieSemi'
  },
  'heat_map': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.one'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.field'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.followed.one'],
      'fourth': {
        'msg': i18nAdhoc['adhoc.rule.measure'],
        'typeF/M': 'measure'
      },
      'fifth': i18nAdhoc['adhoc.rule.in.column'],
      'type': 'twospan'
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.one'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.field'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconHeatMap'
  },
  'heat_map_time_series': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.time.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.one'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measure'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'thirdRule': {
      'first': i18nAdhoc['adhoc.rule.time.hours']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconHeatMapTime'
  },
  'dual_measure_tree_map': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.one'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.field'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.two'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconTreeMapDual'
  },
  'tree_map': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.one'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measure'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconTreeMap'
  },
  'one_parent_tree_map': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.two.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.rows']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.one'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measure'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconTreeMapParent'
  },
  'gauge': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.zero'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.or'],
      'fourth': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'fifth': i18nAdhoc['adhoc.rule.in.rows'],
      'type': 'twospan'
    },
    'thirdRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconGauge'
  },
  'multi_level_gauge': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.zero'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.or'],
      'fourth': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'fifth': i18nAdhoc['adhoc.rule.in.rows'],
      'type': 'twospan'
    },
    'thirdRule': {
      'first': i18nAdhoc['adhoc.rule.two.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconMultiLevelGauge'
  },
  'arc_gauge': {
    'firstRule': {
      'first': i18nAdhoc['adhoc.rule.zero.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'secondRule': {
      'first': i18nAdhoc['adhoc.rule.zero'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.fields'],
        'typeF/M': 'field'
      },
      'third': i18nAdhoc['adhoc.rule.or'],
      'fourth': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'fifth': i18nAdhoc['adhoc.rule.in.rows'],
      'type': 'twospan'
    },
    'thirdRule': {
      'first': i18nAdhoc['adhoc.rule.one.more'],
      'second': {
        'msg': i18nAdhoc['adhoc.rule.measures'],
        'typeF/M': 'measure'
      },
      'third': i18nAdhoc['adhoc.rule.in.column']
    },
    'cssClass': 'jr-mVisualchooser-rule-iconArcGauge'
  }
};

});