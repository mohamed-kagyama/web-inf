define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var pathUtil = require("../../../../util/pathUtil");

var schemaModelUtil = require("../../../../../model/schema/util/schemaModelUtil");

var entityUtil = require("../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
var PATH_SEPARATOR = '.';

var PresentationDesignerItemReferencePathProvider = function PresentationDesignerItemReferencePathProvider(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerItemReferencePathProvider.prototype, {
  initialize: function initialize(options) {
    this.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec = options.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec;
    this.dataSourceGroupNameIsEmptySpecification = options.dataSourceGroupNameIsEmptySpecification;
    this.clientDataSourceGroupService = options.clientDataSourceGroupService;
  },
  getPresentationFieldReferencePath: function getPresentationFieldReferencePath(presentationField, collections) {
    var sourceType = presentationField.sourceType;

    if (entityUtil.isConstantGroup(sourceType)) {
      // Constant field. path should be like constant_group_level.constant_field_name
      return this._getConstantGroupFieldSourcePath(presentationField, collections);
    } else if (entityUtil.isTableReference(sourceType)) {
      return this._getTableReferenceFieldSourcePath({
        fieldId: presentationField.fieldId,
        fieldType: presentationField.fieldType,
        sourceId: presentationField.sourceId
      }, collections);
    } else if (entityUtil.isJoinTree(sourceType)) {
      // cross table calc field path should be DataIslandName.calc_field_name
      return this._getCrossTableCalcFieldSourcePath(presentationField, collections);
    } else if (entityUtil.isJoinAlias(sourceType)) {
      // path should be DataSourceName.schemaName.alias_name.field
      return this._getJoinAliasFieldSourcePath(presentationField, collections);
    }
  },
  _getTableReferenceFieldSourcePath: function _getTableReferenceFieldSourcePath(options, collections) {
    var self = this,
        tableReference = collections.tableReferences.byId(options.sourceId),
        table = schemaModelUtil.getTableByTableReference(tableReference, collections),
        field;
    var isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute = this.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec.isSatisfied();

    if (entityUtil.isCalcField(options.fieldType)) {
      field = tableReference.getCalcFields().byId(options.fieldId);
    } else {
      field = _.findWhere(schemaModelUtil.getAllTableFields(table), {
        id: options.fieldId
      });
    }

    var tableParents = schemaModelUtil.getResourceParents(table, collections).reduce(function (memo, resource) {
      var resourceJSON = resource.toJSON(),
          resourceName = resourceJSON.name,
          isDataSourceGroup = entityUtil.isDataSourceGroup(resource),
          isDataSourceGroupNameEmpty = self.dataSourceGroupNameIsEmptySpecification.isSatisfied(resourceJSON);

      if (isDataSourceGroup) {
        if (isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute) {
          return memo;
        } else if (isDataSourceGroupNameEmpty) {
          resourceName = i18nMessage('domain.designer.sidebar.empty.profile.attribute.value.placeholder');
        } else {
          resourceName = self.clientDataSourceGroupService.getName(resourceJSON);
        }
      }

      memo.unshift(resourceName);
      return memo;
    }, []);
    var referencePathComponents = tableParents.concat([tableReference.getName(), field.getName()]);
    return this._buildPath(referencePathComponents);
  },
  _getConstantGroupFieldSourcePath: function _getConstantGroupFieldSourcePath(presentationField, collections) {
    var constantGroup = collections.constantGroups.byId(presentationField.sourceId),
        field = constantGroup.getCalcFields().byId(presentationField.fieldId);
    return this._buildPath([constantGroup.getName(), field.getName()]);
  },
  _getCrossTableCalcFieldSourcePath: function _getCrossTableCalcFieldSourcePath(presentationField, collections) {
    var dataIsland = collections.dataIslands.byId(presentationField.dataIslandId),
        dataIslandSource = schemaModelUtil.getDataIslandSource(dataIsland, collections),
        field = dataIslandSource.getCalcFields().byId(presentationField.fieldId);
    return this._buildPath([dataIsland.getName(), field.getName()]);
  },
  _getJoinAliasFieldSourcePath: function _getJoinAliasFieldSourcePath(presentationField, collections) {
    var joinAlias = collections.joinAliases.byId(presentationField.sourceId),
        tableReferenceId = schemaModelUtil.getTableReferenceByJoinAlias(joinAlias, collections).getId();
    return this._getTableReferenceFieldSourcePath({
      fieldId: presentationField.fieldId,
      fieldType: presentationField.fieldType,
      sourceId: tableReferenceId
    }, collections);
  },
  _buildPath: function _buildPath(components) {
    return pathUtil.join(components, '\\', PATH_SEPARATOR);
  }
});

module.exports = PresentationDesignerItemReferencePathProvider;

});