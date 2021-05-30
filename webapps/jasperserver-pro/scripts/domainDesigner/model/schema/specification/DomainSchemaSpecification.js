define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DomainSchemaSpecification = function DomainSchemaSpecification(options) {
  _.bindAll(this, 'canUsePresentationItemName');

  this._initialize(options);
};

_.extend(DomainSchemaSpecification.prototype, {
  _initialize: function _initialize(options) {
    this.granularSpecs = options.domainSchemaGranularSpecs;
  },
  canRemoveTableReference: function canRemoveTableReference(tableReferenceId) {
    return this.granularSpecs.canNotRemoveTheVeryLastTableReferenceForSpecificTable(tableReferenceId);
  },
  canRenameTableReference: function canRenameTableReference(id, name) {
    return this.granularSpecs.tableReferenceNameShouldBeUniqueAcrossAllTableReferences(id, name);
  },
  canRenameDerivedTable: function canRenameDerivedTable(tableId, name, dataSourceId) {
    var isNameForDerivedTableUniqueAmongTables = true;

    if (dataSourceId) {
      isNameForDerivedTableUniqueAmongTables = this.granularSpecs.derivedTableNameShouldBeUniqueAmongTables(tableId, name, dataSourceId);
    }

    var isNameForDerivedTableUniqueAmongTableReferences = this.granularSpecs.derivedTableNameShouldBeUniqueAmongAllTableReferences(tableId, name);
    return isNameForDerivedTableUniqueAmongTables && isNameForDerivedTableUniqueAmongTableReferences;
  },
  canUpdateDataSourceGroup: function canUpdateDataSourceGroup(id, name) {
    return this.granularSpecs.dataSourceGroupNameShouldBeUniqueOnSameLevel({
      id: id,
      name: name
    });
  },
  canCreateDataSourceGroup: function canCreateDataSourceGroup(name, parentId) {
    return this.granularSpecs.dataSourceGroupNameShouldBeUniqueOnSameLevel({
      name: name,
      parentId: parentId
    });
  },
  canUseJoinTreeName: function canUseJoinTreeName(name, id) {
    return this.granularSpecs.joinTreeNameShouldBeUniqueThroughAllJoinTreeNames(name, id);
  },
  canCreateJoinExpression: function canCreateJoinExpression(options) {
    return this.granularSpecs.joinExpressionShouldUseDifferentLeftAndRightTableReferences(options) && this.granularSpecs.joinExpressionShouldUseUniqueCombinationOfLeftTableAndFieldAndRightTableAndField(options);
  },
  canUseNewPresentationItemNames: function canUseNewPresentationItemNames(names, existingPresentationItemsByNameMap) {
    var newPresentationItemNamesShouldBeUniqueBetweenThemselves = this.granularSpecs.newPresentationItemNamesShouldBeUniqueBetweenThemselves(names),
        presentationItemNameShouldBeUniqueThroughAllPresentationItemNames = _.every(names, function (name) {
      return this.granularSpecs.presentationItemNameShouldBeUniqueThroughAllPresentationItemNames({
        name: name,
        existingPresentationItemsByNameMap: existingPresentationItemsByNameMap
      });
    }, this);

    return newPresentationItemNamesShouldBeUniqueBetweenThemselves && presentationItemNameShouldBeUniqueThroughAllPresentationItemNames;
  },
  canUsePresentationItemName: function canUsePresentationItemName(options) {
    return this.granularSpecs.presentationItemNameShouldBeUniqueThroughAllPresentationItemNames(options);
  },
  canUseDataIslandName: function canUseDataIslandName(name, id) {
    return this.granularSpecs.dataIslandNameShouldBeUniqueThroughAllDataIslandNames(name, id);
  },
  canCreateCalcField: function canCreateCalcField(options) {
    var name = options.calcFieldName;
    return this._canUseCalcFieldName(name, options);
  },
  canUpdateCalcField: function canUpdateCalcField(options) {
    var id = options.calcFieldId,
        type = options.calcFieldType,
        name = options.calcFieldName;
    return this._canUseCalcFieldName(name, options) && !this.granularSpecs.calcFieldDataTypeCanNotBeChangedIfThereAreDependentFilters(id, type);
  },
  shouldRenameJoinAliasOnTableReferenceRename: function shouldRenameJoinAliasOnTableReferenceRename(originalTableReferenceName, joinAliasName) {
    return this.granularSpecs.joinAliasNameShouldBeRenamedIfItIsTheSameAsTableReferenceName(originalTableReferenceName, joinAliasName);
  },
  // private methods
  _canUseCalcFieldName: function _canUseCalcFieldName(calcFieldName, options) {
    return this.granularSpecs.calcFieldNameCanNotBeEmpty(calcFieldName) && this.granularSpecs.resourceNameShouldNotContainForbiddenCharacters(calcFieldName) && this.granularSpecs.calcFieldNameShouldBeUniqueThroughOtherFieldNamesOnSameLevel(calcFieldName, options);
  }
});

module.exports = DomainSchemaSpecification;

});