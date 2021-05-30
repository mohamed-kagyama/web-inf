define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

var dependenciesSortSequenceEnum = require("../../enum/dependenciesSortSequenceEnum");

var dependenciesGroupNamesEnum = require("../../enum/dependenciesGroupNamesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function GroupByTypeAndSortByNameReducer() {
  _.bindAll(this, 'reduce');
}

_.extend(GroupByTypeAndSortByNameReducer.prototype, {
  reduce: function reduce(collections) {
    var result = [];

    if (!_.isEmpty(collections)) {
      collections = this._combinePreFiltersToGroup(collections);
      collections = this._sortByNameInGroup(collections);
      collections = this._reduceGroupsToArray(collections);
      result = this._flattenGroup(collections);
    }

    return result;
  },
  _combinePreFiltersToGroup: function _combinePreFiltersToGroup(collections) {
    return _.reduce(collections, function (memo, value, key) {
      var isFilterExpression = key === schemaEntitiesEnum.FILTER_EXPRESSION,
          isComplexFilter = key === schemaEntitiesEnum.COMPLEX_FILTER;

      if (!memo[dependenciesGroupNamesEnum.PRE_FILTER]) {
        memo[dependenciesGroupNamesEnum.PRE_FILTER] = [];
      }

      if (isFilterExpression || isComplexFilter) {
        memo[dependenciesGroupNamesEnum.PRE_FILTER] = memo[dependenciesGroupNamesEnum.PRE_FILTER].concat(value);
      } else {
        memo[key] = value;
      }

      return memo;
    }, {});
  },
  _sortByNameInGroup: function _sortByNameInGroup(collections) {
    return _.reduce(collections, function (memo, value, key) {
      memo[key] = value.sort(function (a, b) {
        if (a.name && b.name) {
          return a.name.localeCompare(b.name);
        }
      });
      return memo;
    }, {});
  },
  _reduceGroupsToArray: function _reduceGroupsToArray(collections) {
    var groups = _.reduce(collections, function (memo, entities, entityType) {
      var isAnyEntitiesExist = Boolean(entities.length),
          groupIndex = dependenciesSortSequenceEnum[entityType];

      if (!isAnyEntitiesExist) {
        return memo;
      }

      var group = {
        name: entityType,
        entities: entities
      };

      if (_.isUndefined(groupIndex)) {
        memo.unsortedGroups.push(group);
      } else {
        memo.sortedGroups[groupIndex] = group;
      }

      return memo;
    }, {
      sortedGroups: [],
      unsortedGroups: []
    }, this);

    return _.compact(groups.sortedGroups).concat(groups.unsortedGroups);
  },
  _flattenGroup: function _flattenGroup(entities) {
    return _.reduce(entities, function (memo, entity) {
      if (entity.entities) {
        var children = entity.entities;
        entity.entities = [];
        memo.push(entity);
        memo = memo.concat(children);
      } else {
        memo.push(entity);
      }

      return memo;
    }, []);
  }
});

module.exports = GroupByTypeAndSortByNameReducer;

});