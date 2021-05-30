define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var RootComponentModel = require('../components/RootComponentModel');

var ChartComponentModel = require('../components/ChartComponentModel');

var TableComponentModel = require('../components/TableComponentModel');

var CrosstabComponentModel = require('../components/CrosstabComponentModel');

var FiltersComponentModel = require('../components/FiltersComponentModel');

var FilterComponentModel = require('../components/FilterComponentModel');

var AxisComponentModel = require('../components/AxisComponentModel');

var MeasuresComponentModel = require('../components/MeasuresComponentModel');

var LevelComponentModel = require('../components/LevelComponentModel');

var MeasureComponentModel = require('../components/MeasureComponentModel');

var ColumnComponentModel = require('../components/ColumnComponentModel');

var GroupComponentModel = require('../components/GroupComponentModel');

var LevelComponentTrait = require('../components/traits/LevelComponentTrait');

var ColumnsAndRowsComponentTrait = require('../components/traits/ColumnsAndRowsComponentTrait');

var ComponentsCollection = require('../components/ComponentsCollection');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var componentsMap = {
  'root': RootComponentModel.extend(ColumnsAndRowsComponentTrait),
  'chart': ChartComponentModel.extend(ColumnsAndRowsComponentTrait),
  'table': TableComponentModel,
  'crosstab': CrosstabComponentModel.extend(ColumnsAndRowsComponentTrait),
  'filters': FiltersComponentModel,
  'filter': FilterComponentModel,
  'axis': AxisComponentModel,
  'measures': MeasuresComponentModel,
  'level': LevelComponentModel.extend(LevelComponentTrait),
  'measure': MeasureComponentModel.extend(LevelComponentTrait),
  'column': ColumnComponentModel.extend(LevelComponentTrait),
  'group': GroupComponentModel.extend(LevelComponentTrait)
};

module.exports = function (adHocModel) {
  var componentsFactory = {
    create: function create(attr, options) {
      var ComponentModel = componentsMap[attr.componentType],
          component = new ComponentModel(attr, options);
      component.components = new ComponentsCollection(attr.components, {
        model: function model(attr, options) {
          return componentsFactory.create(attr, options);
        }
      });
      component.adHocModel = adHocModel;
      return component;
    }
  };
  return componentsFactory;
};

});