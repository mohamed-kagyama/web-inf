define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function joinTreeConverter(joinTree, options) {
  options = options || {};
  joinTree = joinTree.toJSON();
  return _.extend({
    label: joinTree.name,
    entityType: schemaEntitiesEnum.JOIN_TREE
  }, joinTree, options.properties);
}

function joinAliasConverter(joinAlias, options) {
  options = options || {};
  var joinAliasJSON = joinAlias.toJSON(),
      tableReferenceJSON = options.tableReference.toJSON();
  return _.extend({
    name: tableReferenceJSON.name,
    label: tableReferenceJSON.name,
    sourceId: joinAliasJSON.id,
    sourceType: schemaEntitiesEnum.JOIN_ALIAS,
    entityType: schemaEntitiesEnum.PRESENTATION_SET
  }, options.properties);
}

function tableReferenceConverter(tableReference, options) {
  options = options || {};
  var tableReferenceJSON = tableReference.toJSON();
  return _.extend({
    name: tableReferenceJSON.name,
    label: tableReferenceJSON.name,
    sourceId: tableReferenceJSON.id,
    sourceType: schemaEntitiesEnum.TABLE_REFERENCE,
    entityType: schemaEntitiesEnum.PRESENTATION_SET
  }, options.properties);
}

function tableGroupConverter(tableGroup, options) {
  var tableGroupJSON = tableGroup.toJSON();
  return _.extend({
    name: tableGroupJSON.name,
    label: tableGroupJSON.name,
    sourceId: tableGroupJSON.id,
    sourceType: schemaEntitiesEnum.TABLE_GROUP,
    entityType: schemaEntitiesEnum.PRESENTATION_SET
  }, options.properties);
}

function fieldConverter(field, options) {
  var source = options.joinAlias || options.tableReference || options.joinTree;
  var sourceJSON = {
    id: source.id,
    type: entityUtil.getEntityName(source)
  };
  var fieldJSON = field.toJSON();
  return {
    name: fieldJSON.name,
    label: fieldJSON.name,
    sourceId: sourceJSON.id,
    sourceType: sourceJSON.type,
    fieldId: fieldJSON.id,
    fieldType: entityUtil.getEntityName(field),
    entityType: schemaEntitiesEnum.PRESENTATION_FIELD
  };
}

module.exports = {
  convertJoinTree: joinTreeConverter,
  convertJoinAlias: joinAliasConverter,
  convertTableReference: tableReferenceConverter,
  convertTableGroup: tableGroupConverter,
  convertCalcField: fieldConverter,
  convertField: fieldConverter
};

});