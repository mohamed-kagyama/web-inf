define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerVisibleDataToNestedStructureConverter = function JoinsDesignerVisibleDataToNestedStructureConverter() {};

_.extend(JoinsDesignerVisibleDataToNestedStructureConverter.prototype, {
  convert: function convert(options) {
    return _.extend(options, {
      models: this._getNestedModels(options.models)
    });
  },
  _getNestedModels: function _getNestedModels(models) {
    return _.reduce(models, function (memo, model) {
      if (model.isJoinTreePlaceholder) {
        memo.result.push(model);
      } else if (model.isDraftJoinTree || entityUtil.isJoinTree(model.modelType)) {
        memo.currentJoinTree = _.extend({}, model, {
          children: []
        });
        memo.result.push(memo.currentJoinTree);
      } else {
        if (_.isEmpty(memo.currentJoinTree)) {
          memo.currentJoinTree = this._getHeadLessJoinTree(model);
          memo.result.push(memo.currentJoinTree);
        }

        memo.currentJoinTree.children.push(model);
      }

      return memo;
    }, {
      currentJoinTree: {},
      result: []
    }, this).result;
  },
  _getHeadLessJoinTree: function _getHeadLessJoinTree(child) {
    var headLessJoinTree = {
      children: [],
      isExpanded: true,
      isHeadLessJoinTree: true
    };

    if (child.isDraftJoinTreeChild) {
      headLessJoinTree = _.extend({
        isDraftJoinTree: true
      }, headLessJoinTree);
    } else {
      headLessJoinTree = _.extend({
        id: child.joinTreeId,
        modelType: schemaEntitiesEnum.JOIN_TREE
      }, headLessJoinTree);
    }

    return headLessJoinTree;
  }
});

module.exports = JoinsDesignerVisibleDataToNestedStructureConverter;

});