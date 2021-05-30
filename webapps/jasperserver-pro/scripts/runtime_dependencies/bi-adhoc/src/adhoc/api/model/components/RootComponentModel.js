define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var BaseComponentModel = require('./BaseComponentModel');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BaseComponentModel.extend({
  initialize: function initialize(attributes, options) {
    this.on('change:visualizationType', function () {
      if (this.get('visualizationType') != 'Table' || this.get('visualizationType') != 'Crosstab') {
        var chart = this.components.findComponentDeep('chart')[0];
        chart && chart.set({
          type: this.get('visualizationType')
        });
      }

      this.adHocModel.trigger('change:visualizationType', this, this.get('visualizationType'));
    });

    for (var i = 0; i < attributes.components.length; i++) {
      if (attributes.components[i].componentType === 'crosstab') {
        this.set({
          visualizationType: 'Crosstab'
        }, {
          silent: true
        });
      } else if (attributes.components[i].componentType === 'table') {
        this.set({
          visualizationType: 'Table'
        }, {
          silent: true
        });
      } else if (attributes.components[i].componentType === 'chart') {
        this.set({
          visualizationType: attributes.components[i].properties.type
        }, {
          silent: true
        });
      }
    }
  },
  setComponentProperty: function setComponentProperty(componentType, attr, val, opts) {
    var components = this.components.findComponentDeep(componentType);

    _.each(components, function (component) {
      component.set(attr, val, opts);
    });
  },
  isChart: function isChart() {
    return this.get('visualizationType') != 'Crosstab' && this.get('visualizationType') != 'Table';
  },
  getChartComponent: function getChartComponent() {
    var chart = this.components.findComponentDeep('chart')[0];

    if (!chart) {
      chart = this.adHocModel.componentsFactory.create({
        componentType: 'chart',
        properties: {
          type: this.get('visualizationType')
        }
      });
      this.components.add(chart);
    }

    return chart;
  },
  getCrosstabComponent: function getCrosstabComponent() {
    var crosstab = this.components.findComponentDeep('crosstab')[0];

    if (!crosstab) {
      crosstab = this.adHocModel.componentsFactory.create({
        componentType: 'crosstab'
      });
      this.components.add(crosstab);
    }

    return crosstab;
  },
  getTableComponent: function getTableComponent() {
    var table = this.components.findComponentDeep('table')[0];

    if (!table) {
      table = this.adHocModel.componentsFactory.create({
        componentType: 'table'
      });
      this.components.add(table);
    }

    return table;
  },
  getMultiAxisComponent: function getMultiAxisComponent() {
    return this.components.findComponentDeep('crosstab')[0] || this.components.findComponentDeep('chart')[0];
  },
  getMeasureComponents: function getMeasureComponents() {
    var component = this.getChartComponent();
    component.components.length || (component = this.getCrosstabComponent());
    return component.components.findComponentDeep('measure');
  },
  findComponentDeep: function findComponentDeep() {
    return this.components.findComponentDeep.apply(this.components, arguments);
  },
  getMeasureLabelByReference: function getMeasureLabelByReference(reference) {
    var measure = _.find(this.getMeasureComponents(), function (component) {
      return component.get('reference') === reference;
    }); //Show summary function.
    //Show summary function.


    return measure && measure.label(true);
  },
  parseQuery: function parseQuery(query) {
    var component;
    component = this.getTableComponent();

    if (!component.components.length) {
      component.components.reset(query.getTableComponents());
      component.ensureArtificialColumn();
    }

    this.getCrosstabComponent().components.reset(query.getCrosstabComponents());
    this.getChartComponent().components.reset(query.getChartComponents());
  }
});

});