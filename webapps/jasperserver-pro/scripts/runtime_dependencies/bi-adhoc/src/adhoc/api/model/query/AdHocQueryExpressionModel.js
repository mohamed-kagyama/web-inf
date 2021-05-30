define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var MetadataToQueryTypeMap = require('../enum/MetadataToQueryTypeMap');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
     * @class AdHocQueryExpressionModel
     */
function toNode(serverNode) {
  var key = _.keys(serverNode)[0],
      res = _.omit(serverNode[key], 'operands', 'start', 'end');

  res.nodeType = key;

  if (key == 'range') {
    res.operands = [toNode(serverNode[key].start), toNode(serverNode[key].end)];
  } else if (key == 'boundary') {
    res = toNode(serverNode[key]);
  } else if (serverNode[key].operands) {
    res.operands = _.map(serverNode[key].operands, toNode);
  }

  if (serverNode[key].value) {
    res.nodeType = 'literal';
    res.type = key;
  }

  return res;
}

function findNodesOfType(root, type, memo) {
  memo || (memo = []);

  if (root.nodeType === type) {
    memo.push(root);
  }

  if (root.operands) {
    for (var i = 0; i < root.operands.length; i++) {
      findNodesOfType(root.operands[i], type, memo);
    }
  }

  return memo;
}

var AdHocQueryExpressionModel = Backbone.Model.extend({
  initialize: function initialize(attributes, options) {
    this.schema = options.adHocModel.schema;
  },
  acquire: function acquire(resp) {
    resp && resp.object && this.set(toNode(resp.object));
  },
  readFilterInformation: function readFilterInformation() {
    var self = this,
        filters = _.filter(findNodesOfType(this.attributes, 'function'), function (fun) {
      return fun.functionName === 'filter';
    });

    return _.compact(_.map(filters, function (filter) {
      if (filter.operands[1].value !== 'DYNAMIC') return;

      var variables = findNodesOfType(filter.operands[2], 'variable'),
          type = _.reduce(variables, function (memo, variable) {
        if (!memo) {
          var levelData = self.schema.getByReference(variable.name);
          levelData && (memo = MetadataToQueryTypeMap[levelData.type] || levelData.type);
        }

        return memo;
      }, null);

      return {
        id: filter.operands[0].value,
        isDynamic: filter.operands[1].value === 'DYNAMIC',
        levelName: filter.operands[2].operands[0].name,
        filterExpression: filter.operands[2],
        variables: _.map(variables, function (variable) {
          return {
            name: variable.name,
            type: type
          };
        })
      };
    }));
  }
});
module.exports = AdHocQueryExpressionModel;

});