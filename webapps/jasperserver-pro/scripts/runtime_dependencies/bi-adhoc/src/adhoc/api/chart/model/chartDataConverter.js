define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var config = require("runtime_dependencies/js-sdk/src/jrs.configs");

var moment = require("momentExtension");

var formatterFactory = require('../../model/factory/formattersFactory');

var i18n = require("bundle!AdHocBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @author: Pavel Savushchik
 * @version: $Id$
 */
module.exports = function (state, dataSetJSON, adHocModel, hyperlinkHelper) {
  var chartComponent = adHocModel.component.getChartComponent(),
      levels = chartComponent.components.findComponentDeep("level"),
      measures = chartComponent.components.findComponentDeep("measure"),
      components = levels.concat(measures);

  var chartState = _.extend(chartComponent.getProperties(), {
    chartType: chartComponent.getLegacyAdhocChartType(),
    columnsSelectedLevels: [],
    rowsSelectedLevels: [],
    decimalPoint: ".",
    shortMonths: getMonths(),
    showXAxisLabels: true,
    showYAxisLabels: true,
    thousandSeparator: "None"
  });

  dataSetJSON.dataset.data = parseData(dataSetJSON.dataset.data);
  delete chartState["type"];
  delete chartState["title"];
  var oldState = {
    "title": state.label,
    "chartState": chartState,
    "queryData": {
      metadata: {
        axes: [],
        measureAxis: 0,
        measures: [],
        canRender: true,
        isFullDataQuery: false,
        isOLAP: false
      },
      treeNodes: [],
      data: _.zip.apply(null, dataSetJSON.dataset.data)
    },
    viewType: "ichart"
  };
  fillMetadata(oldState, chartComponent);
  fillTreeNodes(oldState, dataSetJSON);
  fillLevels(oldState, state.query.multiAxis, adHocModel);

  if (chartComponent.isTimeSeries()) {
    oldState.chartState.timeSeriesCategorizerName = state.query.multiAxis.groupBy.rows.items[0].level.categorizer;

    if (!oldState.chartState.rowsSelectedLevels.length) {
      var level = findLevel(adHocModel, state.query.multiAxis.groupBy.rows.expansions[0].level.fieldRef);
      oldState.chartState.rowsSelectedLevels.push({
        "label": level.label(true),
        "dimension": level.get("dimension"),
        "name": level.get("id")
      });
    }

    var momentTime, usersTimezoneAsString;
    oldState.queryData.data = _.map(oldState.queryData.data, function (value, key) {
      return _.map(value, function (axisValue) {
        var node = oldState.queryData.treeNodes[0].children[key],
            timeAsString,
            augmentedString,
            timestamp;

        if (node && node.rawLabel) {
          // we need to convert time because of issues described here: JRS-11126
          timeAsString = normalizeTimeOffset(node.rawLabel); // We get time from API in different formats depending on the
          // groupings settings:
          // for ["hour", "minute", "second", "millisecond"] groupings we are getting time as:
          //      "17:00:00"
          // for ["day"] groupings we are getting time as:
          //      "1958-01-06"
          // for ["hour_by_day", "minute_by_day", "second_by_day", "millisecond_by_day"]
          // groupings we are getting time as:
          //      "1958-01-06T14:00:00.000-0700"
          // For cases then time string is in short format we need to extend it to ISO-like format

          augmentedString = null;

          if (_.contains(["hour", "minute", "second", "millisecond"], oldState.chartState.timeSeriesCategorizerName)) {
            // for this type of groupings we use 1970-01-01 by convention with server
            augmentedString = "1970-01-01T" + timeAsString;
          } else if (_.contains(["day"], oldState.chartState.timeSeriesCategorizerName)) {
            augmentedString = timeAsString + "T00:00:00.000";
          }

          if (augmentedString !== null) {
            // Once we extended it, we need to find out what timezone offset was at the
            // time moment.
            // We'll do the trick: we call moment() to set the time moment, then we set
            // the timezone, and then we'll call the moment() to get the timezone offset:
            momentTime = moment(augmentedString, "YYYY-MM-DDTHH:mm:ss.SSS"); // sometimes server sends to us time as "Total" string, so we need to be carefull

            if (momentTime.isValid()) {
              usersTimezoneAsString = momentTime.tz(config.userTimezone).format("Z");
              timeAsString = augmentedString + usersTimezoneAsString;
            }
          }

          timestamp = new Date(timeAsString).getTime();

          if (!isNaN(timestamp)) {
            hyperlinkHelper.saveInitialValue(timestamp, node.rawLabel);
            return {
              timestamp: timestamp,
              value: parseFloat(axisValue)
            };
          }
        }

        return {
          timestamp: null,
          value: null
        };
      });
    });
  }

  return oldState; // Insert semicolumns into timeoffset. Required by Safari, IE, Edge.

  function normalizeTimeOffset(timestamp) {
    if (timestamp && (timestamp[timestamp.length - 5] === '-' || timestamp[timestamp.length - 5] === '+')) {
      return timestamp.slice(0, timestamp.length - 2).concat(':', timestamp.slice(-2));
    }

    return timestamp;
  }

  function fillMetadata(oldState, chartComponent) {
    var axes = chartComponent.components.findComponentDeep("axis").reverse();
    var measures = chartComponent.components.findComponentDeep("measures");

    _.each(axes, function (axis, index) {
      var axisMetadata = axis.components.map(function (level) {
        var label;

        if (level.get("reference") === "Measures") {
          oldState.queryData.metadata.measureAxis = index;
          label = i18n["adhoc.node.measures.node"];
        } else {
          label = level.label(true);
        }

        return {
          label: label,
          dimension: level.get("dimension"),
          name: level.get("reference")
        };
      });
      oldState.queryData.metadata.axes.push(axisMetadata);
    });

    _.each(measures, function (measure) {
      oldState.queryData.metadata.measures = measure.components.map(function (measureLevel) {
        return measureLevel.label(true);
      });
    });
  }

  function fillTreeNodes(oldState, dataSetJSON) {
    var axes = dataSetJSON.dataset.axes.reverse();

    for (var axisIdx = 0; axisIdx < axes.length; axisIdx++) {
      // fill treeNodes
      oldState.queryData.treeNodes.push({
        label: i18n["adhoc.node.total.node"],
        level: 0,
        axisCoordinate: getDataIdx(axes[axisIdx].axisNode),
        children: fillTreeNodesChildren(axes, axes[axisIdx].axisNode, 1, axisIdx),
        isAll: axes[axisIdx].axisNode.all
      });
    }
  }

  function fillTreeNodesChildren(axes, parentNode, level, axisIdx) {
    return _.map(parentNode.children, function (node) {
      var formattedLabel = getLabelFromDataSet(axes, axisIdx, level - 1, node),
          rawLabel = getRawLabelFromDataSet(axes, axisIdx, level - 1, node);

      if (formattedLabel !== rawLabel) {
        hyperlinkHelper.saveInitialValue(formattedLabel, rawLabel);
      }

      return {
        label: formattedLabel,
        rawLabel: rawLabel,
        level: level,
        type: getNodeType(axes, axisIdx, level - 1),
        axisCoordinate: getDataIdx(node),
        children: fillTreeNodesChildren(axes, node, level + 1, axisIdx),
        isAll: node.all
      };
    });
  }

  function getNodeType(axes, axisIdx, levelIdx) {
    var level = axes[axisIdx].levels[levelIdx];

    if (level && level.hasOwnProperty("level")) {
      return level.level.type;
    }
  }

  function getDataIdx(axisNode) {
    return axisNode.hasOwnProperty("dataIdx") ? axisNode.dataIdx : -1;
  }

  function getLabelFromDataSet(axes, axisIdx, levelIdx, node) {
    if (!node.hasOwnProperty("memberIdx")) {
      return i18n["adhoc.node.total.node"];
    }

    var level = axes[axisIdx].levels[levelIdx];

    if (level.hasOwnProperty("level")) {
      return format(level.level.referenceObject.name, level.level.type, level.level.members[node.memberIdx]);
    } else if (level.hasOwnProperty("aggregation")) {
      return adHocModel.component.getMeasureLabelByReference(level.aggregation.fields[node.memberIdx].reference);
    }

    return "";
  }

  function getRawLabelFromDataSet(axes, axisIdx, levelIdx, node) {
    if (!node.hasOwnProperty("memberIdx")) {
      return i18n["adhoc.node.total.node"];
    }

    var level = axes[axisIdx].levels[levelIdx];

    if (level.hasOwnProperty("level")) {
      return level.level.members[node.memberIdx];
    } else if (level.hasOwnProperty("aggregation")) {
      return adHocModel.component.getMeasureLabelByReference(level.aggregation.fields[node.memberIdx].reference);
    }

    return "";
  }

  function format(reference, type, value) {
    var component = _.find(components, function (component) {
      return component.get("reference") === reference;
    }),
        level = component.level(),
        opts = {
      format: component.get("format"),
      categorizer: level && level.get("categorizer"),
      ignoreTimezone: true
    };

    if (value === "other_node") {
      value = i18n["adhoc.node.other.node"];
    }

    return formatterFactory(type).format(value, opts.format, opts);
  }

  function fillLevels(oldState, query, adHocModel) {
    var level;

    if (query.groupBy.columns.hasOwnProperty("expansions")) {
      _.each(query.groupBy.columns.expansions, function (expansion) {
        if (expansion.level && expansion.level.expanded && !expansion.level.aggregation) {
          level = findLevel(adHocModel, expansion.level.fieldRef);
          oldState.chartState.columnsSelectedLevels = [toSelectedLevel(level)];
        }
      });
    }

    if (oldState.chartState.chartType === "dual_measure_tree_map") {
      level = adHocModel.dataSet.query.rows.axis.first();
      oldState.chartState.rowsSelectedLevels = [toSelectedLevel(level)];
    } else if (oldState.chartState.chartType === "dual_level_pie") {
      _.each(query.groupBy.rows.expansions, function (expansion, index) {
        if (expansion.level && expansion.level.expanded && !expansion.level.aggregation) {
          var nexExp = query.groupBy.rows.expansions[index + 1];

          if (nexExp && nexExp.level && !nexExp.level.aggregation) {
            level = findLevel(adHocModel, nexExp.level.fieldRef);
            oldState.chartState.rowsSelectedLevels = [toSelectedLevel(level)];
          }
        }
      });

      if (!oldState.chartState.rowsSelectedLevels.length) {
        level = adHocModel.dataSet.query.rows.axis.find(function (level) {
          return level.isLevel();
        });
        oldState.chartState.rowsSelectedLevels = [toSelectedLevel(level)];
      }
    } else {
      if (query.groupBy.rows.hasOwnProperty("expansions")) {
        _.each(query.groupBy.rows.expansions, function (expansion) {
          if (expansion.level && expansion.level.expanded && !expansion.level.aggregation) {
            level = findLevel(adHocModel, expansion.level.fieldRef);
            oldState.chartState.rowsSelectedLevels = [toSelectedLevel(level)];
          }
        });
      }
    }
  }

  function toSelectedLevel(level) {
    return {
      label: level.label(true),
      dimension: level.get("dimension"),
      name: level.get("id") || level.get("dimension")
    };
  }

  function findLevel(adHocModel, levelId) {
    var levelFilter = function levelFilter(level) {
      return levelId === level.get("id");
    };

    return adHocModel.dataSet.query.cols.axis.find(levelFilter) || adHocModel.dataSet.query.rows.axis.find(levelFilter);
  }

  function parseData(data) {
    return _.map(data, function (row) {
      return _.map(row, function (value) {
        if ($.isNumeric(value)) {
          return parseFloat(value);
        }

        return null;
      });
    });
  }

  function getMonths() {
    return _.map(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"], function (month) {
      return _.capitalize(moment("1970-".concat(month, "-01")).locale(config.userLocale).format("MMMM")).slice(0, 3);
    });
  }
};

});