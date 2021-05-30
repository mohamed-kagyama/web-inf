define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var QueryVariableTypes = require('../enum/QueryVariableTypes');

var DefaultFormatMap = require('../enum/DefaultFormatMap');

var DefaultFormatBundle = require('../enum/DefaultFormatBundle');

var TypeKindMap = require('../enum/TypeKindMap');

var i18n = require("bundle!AdHocBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var AdHocQueryLevelModel = Backbone.Model.extend({
  defaults: {
    timeBalanceFunctionName: 'TimeBalanceDefault',
    includeAll: false
  },
  initialize: function initialize() {
    if (this.isDateTime()) {
      if (!this.has('categorizer')) {
        this.set({
          categorizer: this.defaultCategorizer()
        }, {
          silent: true
        });
      }
    } else {
      if (this.get('categorizer') === 'all') {
        this.unset('categorizer', {
          silent: true
        });
      }
    }

    if (!this.has('aggregationType')) {
      this.set({
        aggregationType: aggregationType(this)
      }, {
        silent: true
      });
    }

    if (!this.has('format')) {
      if (this.has('aggregationFormat') && TypeKindMap[this.get('aggregationType')] === TypeKindMap[this.get('type')]) {
        this.set({
          format: this.get('aggregationFormat'),
          formatId: this.get('aggregationFormatId')
        });
      } else {
        this.set({
          format: DefaultFormatBundle[DefaultFormatMap[this.get('type')]],
          formatId: DefaultFormatMap[this.get('type')]
        }, {
          silent: true
        });
      }
    }

    if (!this.has('aggregationFormat')) {
      if (TypeKindMap[this.get('aggregationType')] === TypeKindMap[this.get('type')]) {
        this.set({
          aggregationFormat: this.get('format'),
          aggregationFormatId: this.get('formatId')
        }, {
          silent: true
        });
      } else {
        this.set({
          aggregationFormat: DefaultFormatBundle[DefaultFormatMap[this.get('type')]],
          aggregationFormatId: DefaultFormatMap[this.get('type')]
        }, {
          silent: true
        });
      }
    } // Set default summary function from schema.
    // Set default summary function from schema.


    if (!this.has('defaultFunctionName')) {
      this.set({
        defaultFunctionName: this.collection.adHocModel.schema.getByReference(this.get('hierarchicalName')).aggregation
      }, {
        silent: true
      });
    }
  },
  label: function label(showSummaryFunction) {
    var base;

    if (this.has('labelId') && this.collection.adHocModel.bundles.length) {
      base = this.collection.adHocModel.bundles.getCurrent().toLabel(this.get('labelId'));
    }

    if (_.isUndefined(base)) {
      base = this.has('label') ? this.get('label') : this.get('dimension');
    }

    if (showSummaryFunction && this.has('functionName') && this.get('functionName') !== this.get('defaultFunctionName')) {
      base += ' (' + i18n['adhoc.function.aggregate.name.' + this.get('functionName')] + ')';
    }

    return base;
  },
  isDateTime: function isDateTime() {
    return this.isDate() || this.isTime();
  },
  isDate: function isDate() {
    var type = this.get('type');
    return type === QueryVariableTypes.DATE || type === QueryVariableTypes.TIMESTAMP;
  },
  isTime: function isTime() {
    return this.get('type') === QueryVariableTypes.TIME;
  },
  isFloat: function isFloat() {
    var type = this.get('type');
    return type === QueryVariableTypes.DECIMAL || type === QueryVariableTypes.BIG_DECIMAL || type === QueryVariableTypes.DOUBLE || type === QueryVariableTypes.FLOAT;
  },
  isString: function isString() {
    return this.get('type') === QueryVariableTypes.STRING;
  },
  isMeasure: function isMeasure() {
    return this.get('kind') === 'measure';
  },
  isLevel: function isLevel() {
    return this.get('kind') === 'level';
  },
  isDefaultCategorizer: function isDefaultCategorizer() {
    return this.get('categorizer') === this.defaultCategorizer();
  },
  defaultCategorizer: function defaultCategorizer() {
    if (this.isDateTime()) {
      return this.isTime() ? 'minute' : 'day';
    }
  },
  toQueryMultiaxisAxisItem: function toQueryMultiaxisAxisItem() {
    var res;

    if (this.isMeasure()) {
      res = {
        aggregations: {}
      };
    } else if (this.isLevel()) {
      res = {
        level: _.pick(this.attributes, 'id', 'includeAll', 'dimension')
      };
      res.level.field = this.get('hierarchicalName');

      if (this.isDateTime()) {
        res.level.categorizer = this.get('categorizer');
      }
    } else {
      throw new Error('Unknown kind: ' + this.get('kind'));
    }

    return res;
  }
});

function aggregationType(model) {
  var functionName = model.get('functionName'),
      medianType = model.isDateTime() ? model.get('type') : QueryVariableTypes.DECIMAL;

  if (functionName === 'Sum') {
    return model.isFloat() ? QueryVariableTypes.BIG_DECIMAL : QueryVariableTypes.LONG;
  }

  if (functionName === 'CountAll' || functionName === 'CountDistinct') {
    return QueryVariableTypes.LONG;
  }

  if (functionName === 'Average') {
    return QueryVariableTypes.DOUBLE;
  }

  if (functionName === 'Max' || functionName === 'Median' || functionName === 'Min' || functionName === 'Mode' || functionName === 'Range' || functionName === 'StdDevP' || functionName === 'StdDevS') {
    return medianType;
  }

  if (functionName === 'RangeDays' || functionName === 'RangeHours' || functionName === 'RangeMinutes' || functionName === 'RangeMonths' || functionName === 'RangeQuarters' || functionName === 'RangeSemis' || functionName === 'RangeWeeks' || functionName === 'RangeYears') {
    return QueryVariableTypes.BIG_DECIMAL;
  }
}

module.exports = AdHocQueryLevelModel;

});