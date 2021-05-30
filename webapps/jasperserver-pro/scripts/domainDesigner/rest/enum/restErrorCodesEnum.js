define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  // domain schema
  DOMAIN_SCHEMA_MULTIPLE_DATA_ISLANDS_ARE_REFERENCING_SAME_RESOURCE: 'domain.schema.multiple.data.islands.same.resource',
  DOMAIN_SCHEMA_INVALID_RESOURCE_TYPE: 'domain.schema.resources.invalid.type',
  DOMAIN_SCHEMA_RESOURCES_JOIN_TYPE: 'domain.schema.resources.join.type',
  DOMAIN_SCHEMA_RESOURCES_JOIN_LEFT_INVALID: 'domain.schema.resources.join.left.invalid',
  DOMAIN_SCHEMA_RESOURCES_JOIN_RIGHT_INVALID: 'domain.schema.resources.join.right.invalid',
  DOMAIN_SCHEMA_RESOURCES_INVALID_NUMBER_JOINS: 'domain.schema.resources.invalid.number.joins',
  DOMAIN_SCHEMA_RESOURCES_JOIN_REFERENCE_NAME_INCONSISTENT: 'domain.schema.resources.join.reference.name.inconsistent',
  DOMAIN_SCHEMA_ELEMENT_NAME_UNSUPPORTED_CHARACTER: 'domain.schema.element.name.unsupported.character',
  DOMAIN_SCHEMA_PRESENTATION_CONTAINS_NULL_ELEMENT: 'domain.schema.presentation.contains.null.element',
  DOMAIN_SCHEMA_PRESENTATION_GROUP_CONTAINS_ELEMENTS_FROM_UNJOINED_TABLES: 'domain.schema.presentation.group',
  DOMAIN_SCHEMA_PRESENTATION_ELEMENT_NAME_LENGTH_LIMIT: 'domain.schema.presentation.element.name.length.limit',
  DOMAIN_SCHEMA_PRESENTATION_ELEMENT_LABEL_LENGTH_LIMIT: 'domain.schema.presentation.element.label.length.limit',
  DOMAIN_SCHEMA_PRESENTATION_ELEMENT_LABEL_ID_LENGTH_LIMIT: 'domain.schema.presentation.element.labelId.length.limit',
  DOMAIN_SCHEMA_PRESENTATION_ELEMENT_DESCRIPTION_LENGTH_LIMIT: 'domain.schema.presentation.element.description.length.limit',
  DOMAIN_SCHEMA_PRESENTATION_ELEMENT_DESCRIPTION_ID_LENGTH_LIMIT: 'domain.schema.presentation.element.descriptionId.length.limit',
  DOMAIN_SCHEMA_EMPTY_RESOURCES_ELEMENT: 'domain.schema.resources.empty',
  DOMAIN_SCHEMA_NULL_RESOURCE_GROUP: 'domain.schema.resources.contain.null.element',
  DOMAIN_SCHEMA_EMPTY_RESOURCE_GROUP_ELEMENT: 'domain.schema.resources.group.empty',
  DOMAIN_SCHEMA_NON_UNIQUE_RESOURCE_NAME: 'domain.schema.resources.resource.name.not.unique',
  DOMAIN_SCHEMA_NON_UNIQUE_PRESENTATION_ELEMENT_NAME: 'domain.schema.presentation.element.name.not.unique',
  DOMAIN_SCHEMA_EMPTY_PRESENTATION_ELEMENT_REFERENCE: 'domain.schema.presentation.element.empty.reference',
  DOMAIN_SCHEMA_EMPTY_JOIN_ELEMENT_REFERENCE: 'domain.schema.resources.join.element.empty.reference',
  DOMAIN_SCHEMA_INVALID_JOIN_ELEMENT_REFERENCE: 'domain.schema.resources.join.element.invalid.reference',
  DOMAIN_SCHEMA_INVALID_PRESENTATION_ELEMENT_REFERENCE: 'domain.schema.presentation.element.invalid.reference',
  DOMAIN_SCHEMA_INVALID_DATA_ISLAND_REFERENCE: 'domain.schema.presentation.data.island.invalid.reference',
  DOMAIN_SCHEMA_JOIN_EXPRESSION_PARSING_ERROR: 'domain.schema.resources.join.expression.parse.error',
  DOMAIN_SCHEMA_CALCULATED_FIELD_EXPRESSION_PARSING_ERROR: 'domain.schema.resources.element.expression.parse.error',
  DOMAIN_SCHEMA_CONSTANT_GROUP_ELEMENT_EXPRESSION_REQUIRED: 'domain.schema.resources.constants.group.element.expression.required',
  DOMAIN_SCHEMA_FILTER_EXPRESSION_PARSING_ERROR: 'domain.schema.resources.filter.expression.parse.error',
  DOMAIN_SCHEMA_MISSING_DATABASE_TABLE: 'domain.schema.missing.database.table',
  DOMAIN_SCHEMA_MISSING_DATABASE_COLUMN: 'domain.schema.missing.database.column',
  DOMAIN_SCHEMA_RESOURCES_JDBC: 'domain.schema.resources.jdbc',
  DOMAIN_SCHEMA_NAME_MISMATCH: 'domain.db.schema.name.mismatch',
  DOMAIN_SCHEMA_RESOURCES_FILTER_EXPRESSION_INVALID_FIELDS: 'domain.schema.resources.filter.expression.invalid.fields',
  DOMAIN_SCHEMA_RESOURCES_ELEMENT_EXPRESSION_INVALID_FIELDS: 'domain.schema.resources.element.expression.invalid.fields',
  DOMAIN_SCHEMA_DATA_ISLAND_RESOURCE_PATH_EMPTY: 'domain.schema.presentation.data.island.resource.path.empty',
  DOMAIN_SCHEMA_RESOURCES_JOIN_EXPRESSION_INVALID_FIELDS: 'domain.schema.resources.join.expression.invalid.fields',
  DOMAIN_SCHEMA_RESOURCES_JOIN_EXPRESSION_INVALID_GROUP_REFERENCE: 'domain.schema.resources.join.expression.invalid.group.reference',
  DOMAIN_SCHEMA_RESOURCES_GROUP_PROFILE_ATTRIBUTE_EXCEPTION: 'domain.schema.resources.group.profile.attribute.exception',
  DOMAIN_SCHEMA_PROFILE_ATTRIBUTE_NOT_FOUND: 'profile.attribute.substitution.not.found',
  DOMAIN_SCHEMA_PROFILE_ATTRIBUTE_INVALID_CATEGORY: 'profile.attribute.substitution.category.invalid',
  DOMAIN_SCHEMA_QUERY_PROFILE_ATTRIBUTE_EXCEPTION: 'domain.schema.resources.query.profile.attribute.exception',
  DOMAIN_SCHEMA_XML_PARSE: 'domain.schema.xml.parse.error',
  MANDATORY_PARAMETER_ERROR: 'mandatory.parameter.error',
  SERIALIZATION_ERROR: 'serialization.error',
  REFERENCE_RESOURCE_NOT_FOUND: 'referenced.resource.not.found',
  ILLEGAL_PARAMETER_VALUE_ERROR: 'illegal.parameter.value.error',
  // domain data source
  DOMAIN_DATA_SOURCE_INVALID: 'domain.data.source.invalid',
  DOMAIN_DATA_SOURCE_ACCESS_DENIED: 'domain.data.source.access.denied',
  DOMAIN_DATA_SOURCE_TYPE_NOT_SUPPORTED: 'domain.data.source.type.not.supported',
  // security file
  DOMAIN_SECURITY_SCHEMA_INVALID: 'domain.security.schema.invalid',
  DOMAIN_SECURITY_MISSING_ELEMENT: 'domain.security.missing.element',
  DOMAIN_SECURITY_SCHEMA_RESOURCE_ACCESS_GRANT_EXPRESSION_INVALID_FIELDS: 'domain.security.schema.resource.access.grant.expression.invalid.fields',
  DOMAIN_SECURITY_SCHEMA_RESOURCE_ACCESS_GRANT_EXPRESSION_PARSE_ERROR: 'domain.security.schema.resource.access.grant.expression.parse.error',
  DOMAIN_SECURITY_SCHEMA_CLIENT_VALIDATION_ERROR: 'domain.security.schema.client.validation.error',
  // bundles
  DOMAIN_BUNDLE_FILE_INVALID: 'domain.bundle.file.invalid',
  // generic errors
  RESOURCE_NOT_FOUND: 'resource.not.found',
  SQL_EXCEPTION: 'sql.exception',
  CONNECTION_FAILED: 'connection.failed',
  ACCESS_DENIED: 'access.denied'
};

});