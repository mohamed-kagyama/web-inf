define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var VisualizationTypesController = require("runtime_dependencies/bi-adhoc/src/adhoc/api/visualChooser/VisualizationTypesController");

var VisualChooserDialog = require("runtime_dependencies/bi-adhoc/src/adhoc/api/visualChooser/VisualChooserDialog");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var isOLAP = function isOLAP() {
  return window.localContext.mode.indexOf('olap') >= 0;
};

var VisualizationChooser = {
  init: function init() {
    if (!this.visualizationTypesManager) {
      this.visualizationTypesManager = new VisualizationTypesController();
    }

    if (!this._dialog) {
      this._dialog = new VisualChooserDialog();

      this._dialog.on('visualizationTypeChange', this._onVisalizationTypeChange, this);

      this._updateDisabledTypes();
    }
  },
  show: function show() {
    this._dialog.prevChartType = this._dialog.getSelectedType().selectedType;

    this._updateDisabledTypes();

    this._dialog.open();
  },
  hide: function hide() {
    this._dialog.close();
  },
  setSelectedType: function setSelectedType(legacyAdhocTypeName) {
    var typeDescription = this.visualizationTypesManager.getTypeByLegacyAdhocName(legacyAdhocTypeName);

    if (typeDescription) {
      this._dialog.setSelectedType(typeDescription.name);
    }
  },
  _onVisalizationTypeChange: function _onVisalizationTypeChange(newType) {
    var legacyAdhoc = newType.legacyAdhocType;

    if (legacyAdhoc === 'table' || legacyAdhoc === 'crosstab') {
      window.adhocDesigner.onDataModeSelector(this._resolveOLAPDataModes(legacyAdhoc));
    } else {
      window.adhocDesigner.onDataModeSelector(this._resolveOLAPDataModes(window.designerBase.ICHART), legacyAdhoc);
    }
  },
  _resolveOLAPDataModes: function _resolveOLAPDataModes(desiredMode) {
    var res = desiredMode;

    if (isOLAP()) {
      if (desiredMode === 'table' || desiredMode === 'crosstab') {
        res = window.designerBase.OLAP_CROSSTAB;
      } else {
        res = window.designerBase.OLAP_ICHART;
      }
    }

    return res;
  },
  _updateDisabledTypes: function _updateDisabledTypes() {
    var disabledTypesList = [];

    if (isOLAP()) {
      disabledTypesList = disabledTypesList.concat(['Table', 'TimeSeriesLine', 'TimeSeriesSpline', 'TimeSeriesArea', 'TimeSeriesAreaSpline', 'TimeSeriesHeatMap', 'DualMeasureTreeMap', 'TreeMap', 'OneParentTreeMap', 'Gauge', 'MultiLevelGauge', 'ArcGauge']);
    }

    this._dialog.setDisabledTypes(disabledTypesList);
  }
};
module.exports = VisualizationChooser;

});