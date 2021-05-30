define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var genericTypesEnum = require("../../../model/schema/enum/genericTypesEnum");

var i18n = require("bundle!DomainDesignerBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var aggregations = {};
var ALL_AGGREGATIONS = {
  None: {
    label: i18n['domain.designer.presentationDesigner.presentationField.aggregation.None'],
    value: 'None'
  },
  CountDistinct: {
    label: i18n['domain.designer.presentationDesigner.presentationField.aggregation.CountDistinct'],
    value: 'CountDistinct'
  },
  CountAll: {
    label: i18n['domain.designer.presentationDesigner.presentationField.aggregation.CountAll'],
    value: 'CountAll'
  },
  Mode: {
    label: i18n['domain.designer.presentationDesigner.presentationField.aggregation.Mode'],
    value: 'Mode'
  },
  Sum: {
    label: i18n['domain.designer.presentationDesigner.presentationField.aggregation.Sum'],
    value: 'Sum'
  },
  Average: {
    label: i18n['domain.designer.presentationDesigner.presentationField.aggregation.Average'],
    value: 'Average'
  },
  Max: {
    label: i18n['domain.designer.presentationDesigner.presentationField.aggregation.Max'],
    value: 'Max'
  },
  Min: {
    label: i18n['domain.designer.presentationDesigner.presentationField.aggregation.Min'],
    value: 'Min'
  },
  StdDevP: {
    label: i18n['domain.designer.presentationDesigner.presentationField.aggregation.StdDevP'],
    value: 'StdDevP'
  },
  StdDevS: {
    label: i18n['domain.designer.presentationDesigner.presentationField.aggregation.StdDevS'],
    value: 'StdDevS'
  },
  Median: {
    label: i18n['domain.designer.presentationDesigner.presentationField.aggregation.Median'],
    value: 'Median'
  },
  Range: {
    label: i18n['domain.designer.presentationDesigner.presentationField.aggregation.Range'],
    value: 'Range'
  },
  RangeMinutes: {
    label: i18n['domain.designer.presentationDesigner.presentationField.aggregation.RangeMinutes'],
    value: 'RangeMinutes'
  },
  RangeHours: {
    label: i18n['domain.designer.presentationDesigner.presentationField.aggregation.RangeHours'],
    value: 'RangeHours'
  },
  RangeDays: {
    label: i18n['domain.designer.presentationDesigner.presentationField.aggregation.RangeDays'],
    value: 'RangeDays'
  },
  RangeWeeks: {
    label: i18n['domain.designer.presentationDesigner.presentationField.aggregation.RangeWeeks'],
    value: 'RangeWeeks'
  },
  RangeMonths: {
    label: i18n['domain.designer.presentationDesigner.presentationField.aggregation.RangeMonths'],
    value: 'RangeMonths'
  },
  RangeQuarters: {
    label: i18n['domain.designer.presentationDesigner.presentationField.aggregation.RangeQuarters'],
    value: 'RangeQuarters'
  },
  RangeSemis: {
    label: i18n['domain.designer.presentationDesigner.presentationField.aggregation.RangeSemis'],
    value: 'RangeSemis'
  },
  RangeYears: {
    label: i18n['domain.designer.presentationDesigner.presentationField.aggregation.RangeYears'],
    value: 'RangeYears'
  }
};
aggregations[genericTypesEnum.INTEGER] = {
  defaults: ALL_AGGREGATIONS.Sum,
  available: [ALL_AGGREGATIONS.None, ALL_AGGREGATIONS.Sum, ALL_AGGREGATIONS.Average, ALL_AGGREGATIONS.Max, ALL_AGGREGATIONS.Min, ALL_AGGREGATIONS.StdDevP, ALL_AGGREGATIONS.StdDevS, ALL_AGGREGATIONS.Mode, ALL_AGGREGATIONS.Median, ALL_AGGREGATIONS.Range, ALL_AGGREGATIONS.CountAll, ALL_AGGREGATIONS.CountDistinct]
};
aggregations[genericTypesEnum.DECIMAL] = {
  defaults: ALL_AGGREGATIONS.Sum,
  available: [ALL_AGGREGATIONS.None, ALL_AGGREGATIONS.Sum, ALL_AGGREGATIONS.Average, ALL_AGGREGATIONS.Max, ALL_AGGREGATIONS.Min, ALL_AGGREGATIONS.StdDevP, ALL_AGGREGATIONS.StdDevS, ALL_AGGREGATIONS.Mode, ALL_AGGREGATIONS.Median, ALL_AGGREGATIONS.Range, ALL_AGGREGATIONS.CountAll, ALL_AGGREGATIONS.CountDistinct]
};
var DATE_TIME_AGGREGATIONS = {
  defaults: ALL_AGGREGATIONS.CountAll,
  available: [ALL_AGGREGATIONS.None, ALL_AGGREGATIONS.Max, ALL_AGGREGATIONS.Min, ALL_AGGREGATIONS.Mode, ALL_AGGREGATIONS.Median, ALL_AGGREGATIONS.RangeMinutes, ALL_AGGREGATIONS.RangeHours, ALL_AGGREGATIONS.RangeDays, ALL_AGGREGATIONS.RangeWeeks, ALL_AGGREGATIONS.RangeMonths, ALL_AGGREGATIONS.RangeQuarters, ALL_AGGREGATIONS.RangeSemis, ALL_AGGREGATIONS.RangeYears, ALL_AGGREGATIONS.CountAll, ALL_AGGREGATIONS.CountDistinct]
};
aggregations[genericTypesEnum.DATE] = DATE_TIME_AGGREGATIONS;
aggregations[genericTypesEnum.TIMESTAMP] = DATE_TIME_AGGREGATIONS;
aggregations[genericTypesEnum.TIME] = DATE_TIME_AGGREGATIONS;
var NAN_AGGREGATIONS = [ALL_AGGREGATIONS.None, ALL_AGGREGATIONS.CountDistinct, ALL_AGGREGATIONS.CountAll, ALL_AGGREGATIONS.Mode];
aggregations[genericTypesEnum.STRING] = {
  defaults: ALL_AGGREGATIONS.CountAll,
  available: NAN_AGGREGATIONS
};
aggregations[genericTypesEnum.BOOLEAN] = {
  defaults: ALL_AGGREGATIONS.CountAll,
  available: NAN_AGGREGATIONS
};
module.exports = aggregations;

});