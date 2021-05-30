define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var ChartTypeGroupCollection = require('./collection/ChartTypeGroupCollection');

var visualizationTypes = require('./enum/visualizationTypes');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var VisualizationTypesController =
/*#__PURE__*/
function () {
  function VisualizationTypesController() {
    _classCallCheck(this, VisualizationTypesController);

    // in some cases we'd like to exclude some types, like Crosstab and Table
    // this may be usefull because these types can't be selected by any reason
    // and it's just doesn't make any sense to show them
    this.typesToExclude = [];

    this._prepareCollection();
  }

  _createClass(VisualizationTypesController, [{
    key: "setTypesToExclude",
    value: function setTypesToExclude(typesToExclude) {
      if (!_.isArray(typesToExclude)) {
        return;
      }

      this.typesToExclude = typesToExclude;

      this._prepareCollection();
    }
  }, {
    key: "_prepareCollection",
    value: function _prepareCollection() {
      var _this = this;

      // make a copy because we are going to modify the structure
      var allTypes = JSON.parse(JSON.stringify(visualizationTypes)); // remove the types which should be excluded

      _.each(allTypes, function (classType) {
        classType.chartTypes = _.filter(classType.chartTypes, function (type) {
          // actually here we select all which doesn't match these types
          return _this.typesToExclude.indexOf(type.name) === -1;
        });
      }); // and remove those groups which hasn't any types


      allTypes = _.filter(allTypes, function (classType) {
        return classType.chartTypes.length;
      });
      this.collection = new ChartTypeGroupCollection(allTypes);
    }
  }, {
    key: "getAllTypes",
    value: function getAllTypes() {
      var models = this.collection.map(function (groupModel) {
        return groupModel.chartTypesCollection.toJSON();
      });
      return _.flatten(models);
    }
  }, {
    key: "getAllGroups",
    value: function getAllGroups() {
      return this.collection.toJSON();
    }
  }, {
    key: "getAllTypesInGroup",
    value: function getAllTypesInGroup(groupName) {
      return this.collection.findWhere({
        name: groupName
      }).chartTypesCollection.toJSON();
    }
  }, {
    key: "findType",
    value: function findType(filter) {
      return _.findWhere(this.getAllTypes(), filter);
    }
  }, {
    key: "getTypeByName",
    value: function getTypeByName(name) {
      return this.findType({
        name: name
      });
    }
  }, {
    key: "getTypeByLegacyAdhocName",
    value: function getTypeByLegacyAdhocName(legacyAdhocName) {
      return this.findType({
        legacyAdhoc: legacyAdhocName
      });
    }
  }, {
    key: "isTimeSeriesType",
    value: function isTimeSeriesType(type) {
      var typeObj = this.findType({
        name: type
      });
      return typeObj['isTimeSeries'];
    }
  }, {
    key: "getTimeseriesAttributes",
    value: function getTimeseriesAttributes(rows) {
      var firstField = rows.first();
      return {
        isDateTime: firstField && firstField.isDateTime(),
        categorizer: firstField && firstField.get('categorizer')
      };
    }
  }, {
    key: "getDisabledTypesList",
    value: function getDisabledTypesList(columns, rows) {
      var column = toPlacement(columns),
          row = toPlacement(rows),
          categorizerFn = function categorizerFn(e) {
        return e.isDefaultCategorizer();
      };

      var categorizers = _.compact(columns.pluck('categorizer').concat(rows.pluck('categorizer')));

      var defaultCategorizersOnly = _.reduce(columns.map(categorizerFn).concat(rows.map(categorizerFn)), function (memo, val) {
        return memo && val;
      });

      var placement = {
        column: column.placement,
        row: row.placement
      };
      return this._getDisabledChartTypes(column.measureCount + row.measureCount, column.fieldsCount + row.fieldsCount, placement, this.getTimeseriesAttributes(rows), columns.allHasSummaries() && rows.allHasSummaries(), categorizers, defaultCategorizersOnly);
    }
  }, {
    key: "getAllowedTypesList",
    value: function getAllowedTypesList(columns, rows) {
      return _.difference(_.pluck(this.getAllTypes(), 'name'), this.getDisabledTypesList(columns, rows));
    }
  }, {
    key: "_getDisabledChartTypes",
    value: function _getDisabledChartTypes(measuresCount, fieldsCount, placement, timeseriesAttr, hasSummaries, categorizers, defaultCategorizersOnly) {
      var types = this.getAllTypes();
      var typesDisabled = [];

      _.each(types, function (typeModel) {
        var categorizerValidationResult = validateCategorizer(typeModel, categorizers, defaultCategorizersOnly);
        var summaryValidationResult = validateSummary(typeModel, hasSummaries);
        var measuresCountValidationResult = validateMeasuresCount(typeModel, measuresCount);
        var measuresPositionValidationResult = validateMeasuresPosition(typeModel, placement);
        var fieldsCountValidationResult = validateFieldsCount(typeModel, fieldsCount);
        var fieldsPositionValidationResult = validateFieldsPosition(typeModel, placement);
        var placementValidationResult = validatePlacement(typeModel, placement);
        var timeSeriesValidationResult = validateTimeSeries(typeModel, timeseriesAttr);

        if (summaryValidationResult || measuresCountValidationResult || measuresPositionValidationResult || fieldsCountValidationResult || fieldsPositionValidationResult || placementValidationResult || timeSeriesValidationResult || categorizerValidationResult) {
          typesDisabled.push(typeModel.name);
        }
      });

      return typesDisabled;
    }
  }, {
    key: "doesChartSupportResizing",
    value: function doesChartSupportResizing(chartType) {
      var allTypes = this.getAllTypes();

      var chartTypesWithResizeAbility = _.filter(allTypes, function (type) {
        return type.supportsResize;
      });

      chartTypesWithResizeAbility = _.pluck(chartTypesWithResizeAbility, 'name');
      return chartTypesWithResizeAbility.indexOf(chartType) !== -1;
    }
  }]);

  return VisualizationTypesController;
}();

module.exports = VisualizationTypesController;

function toPlacement(axis) {
  var res,
      fieldsCount = 0,
      measuresCount = axis.reduce(function (memo, item) {
    return item.isMeasure() ? memo + 1 : memo;
  }, 0),
      // multiAxisMap required in this case, because it is exact configuration,
  // which will be used for any chart and crosstab and sure will pass check for table
  arr = axis.multiAxisMap(function (el) {
    if (el.isMeasure()) {
      return 'm';
    } else {
      fieldsCount++;
      return 'f';
    }
  }); // multiAxisMap shows only location of measures, its required to put additional "m"s to cover measures size
  // multiAxisMap shows only location of measures, its required to put additional "m"s to cover measures size

  if (measuresCount > 1) {
    res = [];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === 'm') {
        for (var j = 0; j < measuresCount; j++) {
          res.push('m');
        }
      } else {
        res.push(arr[i]);
      }
    }
  } else {
    res = arr;
  }

  return {
    fieldsCount: fieldsCount,
    measureCount: measuresCount,
    placement: res.join('')
  };
}

function validateCategorizer(typeModel, categorizers, defaultCategorizersOnly) {
  var res = typeModel.requirements.categorizerAllowed && _.difference(categorizers, typeModel.requirements.categorizerAllowed).length || typeModel.requirements.categorizerForbidden && _.difference(categorizers, typeModel.requirements.categorizerForbidden).length < categorizers.length;
  return res || typeModel.requirements.categorizerDefaultOnly && !defaultCategorizersOnly;
}

function validateSummary(typeModel, hasSummary) {
  return !(hasSummary || typeModel.name === 'Crosstab' || typeModel.name === 'Table');
}

function validateMeasuresCount(typeModel, measuresCount) {
  var req = typeModel.requirements;

  if (req.measures) {
    if (!_.isUndefined(req.measures.min) && req.measures.min > measuresCount) {
      return true;
    }

    if (!_.isUndefined(req.measures.max) && req.measures.max < measuresCount) {
      return true;
    }

    return false;
  }
}

function validateFieldsCount(typeModel, fieldsCount) {
  var req = typeModel.requirements;

  if (req.fields) {
    if (!_.isUndefined(req.fields.min) && req.fields.min > fieldsCount) {
      return true;
    }

    if (!_.isUndefined(req.fields.max) && req.fields.max < fieldsCount) {
      return true;
    }
  }

  return false;
}

function validateMeasuresPosition(typeModel, placement) {
  var req = typeModel.requirements;

  if (req.measures) {
    if (req.measures.inRow === false && placement.row.indexOf('m') > -1) {
      return true;
    }

    if (req.measures.inColumn === false && placement.column.indexOf('m') > -1) {
      return true;
    }
  }

  return false;
}

function validateFieldsPosition(typeModel, placement) {
  var req = typeModel.requirements;

  if (req.fields) {
    if (req.fields.inRow === false && placement.row.indexOf('f') > -1) {
      return true;
    }

    if (req.fields.inColumn === false && placement.column.indexOf('f') > -1) {
      return true;
    }
  }

  return false;
}

function validatePlacement(typeModel, placement) {
  var req = typeModel.requirements;

  if (req.placement) {
    if (req.placement.allowed) {
      return !_.some(req.placement.allowed, function (allowedPattern) {
        return placement.column.match(new RegExp('^' + allowedPattern.column + '$')) !== null && placement.row.match(new RegExp('^' + allowedPattern.row + '$')) !== null;
      });
    }

    if (req.placement.forbidden) {
      return _.some(req.placement.forbidden, function (forbiddenPattern) {
        return placement.column.match(new RegExp('^' + forbiddenPattern.column + '$')) !== null && placement.row.match(new RegExp('^' + forbiddenPattern.row + '$')) !== null;
      });
    }
  }

  return false;
}

function validateTimeSeries(typeModel, timeseriesAttr) {
  var req = typeModel.requirements;

  if (typeModel.isTimeSeries && req.fields) {
    if (req.fields.type === 'time' && !timeseriesAttr.isDateTime) {
      return true;
    }

    if (req.fields.categorizer && !_.contains(req.fields.categorizer, timeseriesAttr.categorizer)) {
      return true;
    }
  }

  return false;
}

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});