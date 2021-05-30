define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

var joinsDesignerUtil = require("../util/joinsDesignerUtil");

var byIdReducer = require("../../../../common/util/byIdReducer");

var joinTreeComponentsVisibilityUtil = require("../util/joinTreeComponentsVisibilityUtil");

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerSchemaToViewModelConverter = function JoinsDesignerSchemaToViewModelConverter(options) {
  this.initialize(options);
};

_.extend(JoinsDesignerSchemaToViewModelConverter.prototype, {
  initialize: function initialize(options) {
    this.settings = options.settings;
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.joinsDesignerViewStateModelService = options.joinsDesignerViewStateModelService;
    this.advancedJoinsMappingSpecification = options.advancedJoinsMappingSpecification;
    this.shouldJoinConstructorRightDroppableAreaBeActiveSpecification = options.shouldJoinConstructorRightDroppableAreaBeActiveSpecification;
  },
  convert: function convert(state) {
    return this._convertJoinTrees(state);
  },
  _convertJoinTrees: function _convertJoinTrees(state) {
    var collections = state.dataStore,
        joinTrees = collections.joinTrees,
        joinTreesSize = joinTrees.size(),
        lastJoinTreeIndex = joinTrees.size() - 1;
    var convertedJoinTrees = [];

    var draftJoinTreeModels = this._getDraftJoinTreeModels({
      joinTreesSize: joinTreesSize
    });

    if (joinTreesSize) {
      var tablesMap = collections.tables.reduce(byIdReducer, {});
      var tableReferencesMap = collections.tableReferences.reduce(byIdReducer, {});
      var joinAliasesMap = collections.joinAliases.reduce(byIdReducer, {});
      var fieldsMap = collections.fields.reduce(byIdReducer, {});
      convertedJoinTrees = joinTrees.reduce(function (memo, joinTree, index) {
        var convertedJoinTree,
            joinTreePlaceholder,
            isFirstJoinTree = index === 0,
            isLastJoinTree = index === lastJoinTreeIndex;

        if (draftJoinTreeModels && draftJoinTreeModels.index === index) {
          isFirstJoinTree = draftJoinTreeModels.index !== 0;
          memo = memo.concat(draftJoinTreeModels.models);
        }

        joinTreePlaceholder = this._getJoinTreePlaceHolder({
          isFirstJoinTree: isFirstJoinTree,
          joinTree: joinTree,
          index: index
        });
        convertedJoinTree = this._convertJoinTree({
          index: index,
          joinTree: joinTree,
          state: state,
          maps: {
            tablesMap: tablesMap,
            tableReferencesMap: tableReferencesMap,
            joinAliasesMap: joinAliasesMap,
            fieldsMap: fieldsMap
          }
        });

        if (convertedJoinTree) {
          memo = memo.concat(joinTreePlaceholder).concat(convertedJoinTree);
        }

        if (isLastJoinTree) {
          joinTreePlaceholder = this._getJoinTreePlaceHolder({
            isFirstJoinTree: false,
            joinTree: joinTree,
            index: index + 1
          });
          joinTreePlaceholder = _.extend({}, joinTreePlaceholder, {
            isLastJoinTreePlaceholder: true
          });
          memo = memo.concat(joinTreePlaceholder);
        }

        if (draftJoinTreeModels && isLastJoinTree && draftJoinTreeModels.index === index + 1) {
          memo = memo.concat(draftJoinTreeModels.models);
        }

        return memo;
      }, [], this);
    } else if (draftJoinTreeModels) {
      convertedJoinTrees = draftJoinTreeModels.models;
    }

    return convertedJoinTrees;
  },
  _convertJoinTree: function _convertJoinTree(options) {
    var joinTree = options.joinTree,
        index = options.index,
        joinTreeChildren = [],
        state = options.state,
        collections = state.dataStore,
        searchKeyword = joinsDesignerUtil.getSearchKeyword(state);
    var joinTreeConverterOptions = {
      joinTree: joinTree,
      index: index,
      searchKeyword: searchKeyword,
      collections: collections,
      state: state,
      maps: options.maps
    };

    var joinConstructor = this._getJoinConstructor();

    var joinTreeJSON = this._convertJoinTreeOwnProps(joinTreeConverterOptions),
        isJoinTreeVisible = joinTreeComponentsVisibilityUtil.isJoinTreeVisible(searchKeyword, joinTreeJSON);

    joinTreeConverterOptions.isParentVisible = isJoinTreeVisible;

    if (joinTreeJSON.isExpanded) {
      joinTreeChildren = joinTreeChildren.concat(this._convertJoinTreeChildren(joinTreeConverterOptions));

      if (joinConstructor && joinConstructor.joinTreeId === joinTree.id) {
        joinTreeChildren = joinTreeChildren.concat(joinConstructor);
      }
    }

    _.extend(joinTreeJSON, {
      isValid: this.clientDomainSchemaService.isJoinTreeConsistsOfASingleComponent(joinTree)
    });

    if (isJoinTreeVisible || joinTreeChildren.length) {
      return [joinTreeJSON].concat(joinTreeChildren);
    }
  },
  _getJoinConstructor: function _getJoinConstructor() {
    var joinConstructor = this.joinsDesignerViewStateModelService.getJoinConstructor(),
        currentSidebarResource = this.joinsDesignerViewStateModelService.getCurrentSidebarResource();

    if (!joinConstructor) {
      return;
    }

    var rightDropZoneShouldBeActive = this.shouldJoinConstructorRightDroppableAreaBeActiveSpecification.isSatisfiedBy({
      joinConstructor: joinConstructor,
      currentSidebarResource: currentSidebarResource
    });
    joinConstructor = _.extend({}, _.cloneDeep(joinConstructor), {
      height: this.settings.height.JOIN_CONSTRUCTOR,
      isJoinConstructor: true
    });
    joinConstructor.rightSide.isDropAreaEnabled = rightDropZoneShouldBeActive;
    return joinConstructor;
  },
  _getDraftJoinTreeModels: function _getDraftJoinTreeModels(options) {
    var joinTreesSize = options.joinTreesSize;
    var draftJoinTree = this.joinsDesignerViewStateModelService.getDraftJoinTree(),
        currentSidebarResource = this.joinsDesignerViewStateModelService.getCurrentSidebarResource();

    if (!draftJoinTree) {
      return;
    }

    var suppressCircularJoins = draftJoinTree.suppressCircularJoins,
        includeAllDataIslandJoins = draftJoinTree.includeAllDataIslandJoins;
    var convertedDraftJoinTree = {
      index: draftJoinTree.index,
      label: draftJoinTree.name,
      name: draftJoinTree.name,
      isDraftJoinTree: true,
      isValid: true,
      isExpanded: draftJoinTree.isExpanded,
      height: this.settings.height.JOIN_TREE,
      useMinimumPathJoins: this.advancedJoinsMappingSpecification.isUseMinimumPathJoinsOn(suppressCircularJoins, includeAllDataIslandJoins),
      useAllDataIslandJoins: this.advancedJoinsMappingSpecification.isUseAllDAtaIslandJoinsOn(suppressCircularJoins, includeAllDataIslandJoins)
    };
    var convertedJoin = {
      modelType: schemaEntitiesEnum.JOIN,
      height: this.settings.height.JOIN,
      weight: draftJoinTree.join.weight,
      isWeightEnabled: this.advancedJoinsMappingSpecification.isJoinWeightEnabled(suppressCircularJoins, includeAllDataIslandJoins),
      type: draftJoinTree.join.type,
      leftTableReference: draftJoinTree.join.leftSide,
      leftTableAlias: draftJoinTree.join.leftSide,
      rightTableReference: "",
      rightTableAlias: "",
      isExpanded: draftJoinTree.join.isExpanded,
      isDraftJoinTreeChild: true
    };
    var rightDropZoneShouldBeActive = this.shouldJoinConstructorRightDroppableAreaBeActiveSpecification.isSatisfiedBy({
      joinConstructor: draftJoinTree.joinConstructor,
      currentSidebarResource: currentSidebarResource
    });

    var convertedJoinConstructor = _.extend({
      height: this.settings.height.JOIN_CONSTRUCTOR,
      isJoinConstructor: true,
      isDraftJoinTreeChild: true
    }, _.cloneDeep(draftJoinTree.joinConstructor));

    convertedJoinConstructor.rightSide.isDropAreaEnabled = rightDropZoneShouldBeActive;
    var joinTreePlaceholder;

    if (draftJoinTree.index !== joinTreesSize) {
      joinTreePlaceholder = this._getJoinTreePlaceHolder({
        isFirstJoinTree: draftJoinTree.index === 0 ? true : false,
        joinTree: draftJoinTree,
        index: draftJoinTree.index
      });
    }

    var models = [];

    if (joinTreePlaceholder) {
      models = [joinTreePlaceholder];
    }

    models = models.concat(convertedDraftJoinTree);

    if (draftJoinTree.isExpanded) {
      models = models.concat(convertedJoin);
    }

    if (draftJoinTree.isExpanded && draftJoinTree.join.isExpanded) {
      models = models.concat(convertedJoinConstructor);
    }

    return {
      index: draftJoinTree.index,
      models: models
    };
  },
  _getJoinTreePlaceHolder: function _getJoinTreePlaceHolder(options) {
    var index = options.index,
        joinTree = options.joinTree,
        isFirstJoinTree = options.isFirstJoinTree,
        joinTreePlaceholderHeight = this.settings.height.JOIN_TREE_PLACEHOLDER;

    if (isFirstJoinTree) {
      joinTreePlaceholderHeight = this.settings.height.JOIN_TREE_FIRST_PLACEHOLDER;
    }

    var joinTreePlaceholder = {
      index: index,
      isJoinTreePlaceholder: true,
      height: joinTreePlaceholderHeight
    };

    if (joinTree.id) {
      joinTreePlaceholder.joinTreeId = joinTree.id;
    }

    return joinTreePlaceholder;
  },
  // Data Island
  _convertJoinTreeOwnProps: function _convertJoinTreeOwnProps(options) {
    var joinTree = options.joinTree,
        index = options.index,
        state = options.state;
    var includeAllDataIslandJoins = joinTree.getIncludeAllDataIslandJoins(),
        suppressCircularJoins = joinTree.getSuppressCircularJoins();
    return {
      id: joinTree.id,
      index: index,
      label: joinTree.name,
      name: joinTree.name,
      modelType: schemaEntitiesEnum.JOIN_TREE,
      isExpanded: this._isJoinTreeExpanded(joinTree.id, state),
      height: this.settings.height.JOIN_TREE,
      useMinimumPathJoins: this.advancedJoinsMappingSpecification.isUseMinimumPathJoinsOn(suppressCircularJoins, includeAllDataIslandJoins),
      useAllDataIslandJoins: this.advancedJoinsMappingSpecification.isUseAllDAtaIslandJoinsOn(suppressCircularJoins, includeAllDataIslandJoins)
    };
  },
  _isJoinTreeExpanded: function _isJoinTreeExpanded(joinTreeId, state) {
    var joinTrees = joinsDesignerUtil.getJoinTrees(state) || {},
        joinTree = joinTrees[joinTreeId] || {};
    return joinTree.isExpanded || false;
  },
  _convertJoinTreeChildren: function _convertJoinTreeChildren(options) {
    return this._convertJoinTreeNodes(options) || [];
  },
  // Join Tree
  _convertJoinTreeNodes: function _convertJoinTreeNodes(options) {
    var joinTree = options.joinTree,
        searchKeyword = options.searchKeyword,
        isParentVisible = options.isParentVisible,
        state = options.state,
        collections = options.collections,
        self = this,
        joinTreeNodes = [];
    var joins = joinTree.getJoins().reduce(function (memo, join) {
      var convertedJoin = self._convertAnyJoin({
        join: join,
        joinTree: joinTree,
        searchKeyword: searchKeyword,
        isParentVisible: isParentVisible,
        collections: collections,
        state: state,
        maps: options.maps
      }) || [];
      return memo.concat(convertedJoin);
    }, []);

    var loneJoinAliases = this._getLoneJoinAliases(joinTree).reduce(function (memo, joinAlias) {
      var convertedJoinAlias = self._convertJoinAlias({
        collections: collections,
        joinTreeId: joinTree.id,
        searchKeyword: searchKeyword,
        isParentVisible: isParentVisible,
        joinAlias: joinAlias,
        maps: options.maps
      }) || [];
      return memo.concat(convertedJoinAlias);
    }, []);

    joinTreeNodes = loneJoinAliases.concat(joins);

    var lastJoinTreeNode = _.last(joinTreeNodes);

    if (lastJoinTreeNode) {
      lastJoinTreeNode.isLastChild = true;
    }

    return joinTreeNodes;
  },
  // Join Alias
  _getLoneJoinAliases: function _getLoneJoinAliases(joinTree) {
    var usedJoinAliases = joinTree.getJoins().reduce(function (memo, joinAlias) {
      memo[joinAlias.getLeftJoinAliasId()] = true;
      memo[joinAlias.getRightJoinAliasId()] = true;
      return memo;
    }, {});
    return joinTree.getJoinAliases().chain().filter(function (joinAlias) {
      return _.isUndefined(usedJoinAliases[joinAlias.getId()]);
    });
  },
  _convertJoinAlias: function _convertJoinAlias(options) {
    var joinAlias = options.joinAlias,
        joinTreeId = options.joinTreeId,
        searchKeyword = options.searchKeyword,
        isParentVisible = options.isParentVisible,
        maps = options.maps;
    var tableReference = maps.tableReferencesMap[joinAlias.getTableReferenceId()],
        table = maps.tablesMap[tableReference.tableId];
    var joinAliasJson = {
      id: joinAlias.getId(),
      joinTreeId: joinTreeId,
      name: tableReference.getName(),
      modelType: schemaEntitiesEnum.JOIN_ALIAS,
      height: this.settings.height.JOIN_ALIAS
    };
    var isJoinAliasVisible = isParentVisible || joinTreeComponentsVisibilityUtil.isJoinAliasVisible(searchKeyword, joinAliasJson, [table.name]);

    if (isJoinAliasVisible) {
      return joinAliasJson;
    }
  },
  // Join
  _convertAnyJoin: function _convertAnyJoin(options) {
    var join = options.join;

    if (entityUtil.isJoin(join)) {
      return this._convertJoin(options);
    } else if (entityUtil.isComplexJoin(join)) {
      return this._convertComplexJoin(options);
    }
  },
  _convertComplexJoin: function _convertComplexJoin(options) {
    var join = options.join,
        searchKeyword = options.searchKeyword,
        isParentVisible = options.isParentVisible,
        maps = options.maps;

    var genericJoinProperties = this._convertGenericJoinProperties(options),
        leftTableName = genericJoinProperties.leftTableName,
        rightTableName = genericJoinProperties.rightTableName;

    delete genericJoinProperties.leftTableName;
    delete genericJoinProperties.rightTableName;

    var complexJoinJSON = _.extend({
      modelType: schemaEntitiesEnum.COMPLEX_JOIN,
      expression: join.getExpression().string
    }, genericJoinProperties);

    complexJoinJSON.height = complexJoinJSON.isExpanded ? this.settings.height.COMPLEX_JOIN_EXPANDED : this.settings.height.COMPLEX_JOIN;
    var complexJoinFieldNames = join.fieldReferences.reduce(function (memo, fieldReference) {
      var field = maps.fieldsMap[fieldReference.fieldId];

      if (field) {
        memo.push(field.name);

        if (field.sourceName) {
          memo.push(field.sourceName);
        }
      }

      return memo;
    }, []);
    var isComplexJoinVisible = isParentVisible || joinTreeComponentsVisibilityUtil.isComplexJoinVisible(searchKeyword, complexJoinJSON, [leftTableName, rightTableName].concat(complexJoinFieldNames));

    if (isComplexJoinVisible) {
      return complexJoinJSON;
    }
  },
  _convertJoin: function _convertJoin(options) {
    var join = options.join,
        joinChildren = [],
        joinTree = options.joinTree,
        searchKeyword = options.searchKeyword,
        isParentVisible = options.isParentVisible,
        collections = options.collections,
        self = this;

    var genericJoinProperties = this._convertGenericJoinProperties(options),
        leftTableName = genericJoinProperties.leftTableName,
        rightTableName = genericJoinProperties.rightTableName;

    delete genericJoinProperties.leftTableName;
    delete genericJoinProperties.rightTableName;

    var joinJSON = _.extend({
      modelType: schemaEntitiesEnum.JOIN,
      height: this.settings.height.JOIN
    }, genericJoinProperties);

    var isJoinVisible = isParentVisible || joinTreeComponentsVisibilityUtil.isJoinVisible(searchKeyword, joinJSON, [leftTableName, rightTableName]);

    if (joinJSON.isExpanded) {
      joinChildren = join.getJoinExpressions().chain().sortBy(function (joinExpression) {
        return entityUtil.isConstantJoinExpression(joinExpression);
      }).reduce(function (memo, joinExpression) {
        var convertedJoinExpression = self._convertAnyJoinExpression({
          joinId: join.getId(),
          joinTreeId: joinTree.id,
          joinExpression: joinExpression,
          collections: collections,
          isParentVisible: isJoinVisible,
          searchKeyword: searchKeyword,
          maps: options.maps
        }) || [];
        return memo.concat(convertedJoinExpression);
      }, []);
    }

    if (isJoinVisible || joinChildren.length) {
      return [joinJSON].concat(joinChildren);
    }
  },
  _convertGenericJoinProperties: function _convertGenericJoinProperties(options) {
    var join = options.join,
        joinTree = options.joinTree,
        suppressCircularJoins = joinTree.getSuppressCircularJoins(),
        includeAllDataIslandJoins = joinTree.getIncludeAllDataIslandJoins(),
        state = options.state,
        maps = options.maps;
    var joinId = join.getId(),
        leftJoinAlias = maps.joinAliasesMap[join.getLeftJoinAliasId()],
        rightJoinAlias = maps.joinAliasesMap[join.getRightJoinAliasId()],
        leftTableReference = maps.tableReferencesMap[leftJoinAlias.getTableReferenceId()],
        rightTableReference = maps.tableReferencesMap[rightJoinAlias.getTableReferenceId()],
        leftTable = maps.tablesMap[leftTableReference.tableId],
        rightTable = maps.tablesMap[rightTableReference.tableId];
    return {
      id: joinId,
      joinTreeId: joinTree.id,
      weight: join.getWeight(),
      isWeightEnabled: this.advancedJoinsMappingSpecification.isJoinWeightEnabled(suppressCircularJoins, includeAllDataIslandJoins),
      originalWeight: joinsDesignerUtil.getJoinOriginalWeight(joinId, state),
      type: join.getType(),
      leftTableReference: leftTableReference.getName(),
      leftTableAlias: leftJoinAlias.getName(),
      rightTableReference: rightTableReference.getName(),
      rightTableAlias: rightJoinAlias.getName(),
      leftTableName: leftTable.getName(),
      rightTableName: rightTable.getName(),
      isExpanded: joinsDesignerUtil.isJoinExpanded(joinId, state)
    };
  },
  // Join Expression
  _convertAnyJoinExpression: function _convertAnyJoinExpression(options) {
    var joinExpression = options.joinExpression;

    if (entityUtil.isJoinExpression(joinExpression)) {
      return this._convertJoinExpression(options);
    } else if (entityUtil.isConstantJoinExpression(joinExpression)) {
      return this._convertConstantJoinExpression(options);
    }
  },
  _convertJoinExpression: function _convertJoinExpression(options) {
    var joinId = options.joinId,
        joinTreeId = options.joinTreeId,
        joinExpression = options.joinExpression,
        searchKeyword = options.searchKeyword,
        isParentVisible = options.isParentVisible,
        maps = options.maps;
    var leftJoinAlias = maps.joinAliasesMap[joinExpression.getLeftJoinAliasId()],
        rightJoinAlias = maps.joinAliasesMap[joinExpression.getRightJoinAliasId()],
        leftTableReference = maps.tableReferencesMap[leftJoinAlias.getTableReferenceId()],
        rightTableReference = maps.tableReferencesMap[rightJoinAlias.getTableReferenceId()],
        leftTable = maps.tablesMap[leftTableReference.tableId],
        rightTable = maps.tablesMap[rightTableReference.tableId],
        leftField = maps.fieldsMap[joinExpression.getLeftFieldId()],
        rightField = maps.fieldsMap[joinExpression.getRightFieldId()];
    var joinExpressionJson = {
      id: joinExpression.getId(),
      joinId: joinId,
      joinTreeId: joinTreeId,
      modelType: schemaEntitiesEnum.JOIN_EXPRESSION,
      leftField: leftField.getName(),
      leftFieldId: leftField.getId(),
      leftFieldType: leftField.type,
      rightField: rightField.getName(),
      rightFieldId: rightField.getId(),
      rightFieldType: rightField.type,
      leftJoinAlias: leftJoinAlias.getName(),
      leftJoinAliasId: leftJoinAlias.getId(),
      rightJoinAlias: rightJoinAlias.getName(),
      rightJoinAliasId: rightJoinAlias.getId(),
      operator: joinExpression.getOperator(),
      height: this.settings.height.JOIN_EXPRESSION
    };
    var visibilityUtilOptions = [leftTable.name, rightTable.name, leftField.name, rightField.name];

    if (leftField.sourceName) {
      visibilityUtilOptions.push(leftField.sourceName);
    }

    if (rightField.sourceName) {
      visibilityUtilOptions.push(rightField.sourceName);
    }

    var isJoinExpressionVisible = isParentVisible || joinTreeComponentsVisibilityUtil.isJoinExpressionVisible(searchKeyword, joinExpressionJson, visibilityUtilOptions);

    if (isJoinExpressionVisible) {
      return joinExpressionJson;
    }
  },
  // Constant Join Expression
  _convertConstantJoinExpression: function _convertConstantJoinExpression(options) {
    var joinId = options.joinId,
        joinTreeId = options.joinTreeId,
        constantJoinExpression = options.joinExpression,
        searchKeyword = options.searchKeyword,
        isParentVisible = options.isParentVisible,
        maps = options.maps;
    var joinAlias = maps.joinAliasesMap[constantJoinExpression.getJoinAliasId()],
        tableReference = maps.tableReferencesMap[joinAlias.getTableReferenceId()],
        table = maps.tablesMap[tableReference.tableId],
        field = maps.fieldsMap[constantJoinExpression.getFieldId()];
    var constantJoinExpressionJson = {
      id: constantJoinExpression.getId(),
      joinId: joinId,
      joinTreeId: joinTreeId,
      modelType: schemaEntitiesEnum.CONSTANT_JOIN_EXPRESSION,
      field: field.getName(),
      fieldId: field.getId(),
      fieldType: field.type,
      joinAlias: joinAlias.getName(),
      joinAliasId: joinAlias.getId(),
      operator: constantJoinExpression.getOperator(),
      value: _.cloneDeep(constantJoinExpression.getValue()),
      height: this.settings.height.JOIN_EXPRESSION
    };
    var visibilityUtilOptions = [table.name, field.name];

    if (field.sourceName) {
      visibilityUtilOptions.push(field.sourceName);
    }

    var isConstantJoinExpressionVisible = isParentVisible || joinTreeComponentsVisibilityUtil.isConstantJoinExpressionVisible(searchKeyword, constantJoinExpressionJson, visibilityUtilOptions);

    if (isConstantJoinExpressionVisible) {
      return constantJoinExpressionJson;
    }
  }
});

module.exports = JoinsDesignerSchemaToViewModelConverter;

});