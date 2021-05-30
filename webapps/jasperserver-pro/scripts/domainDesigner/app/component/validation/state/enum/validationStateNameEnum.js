define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  UNRECOVERABLE_ERROR_STATE: 'unrecoverableErrorState',
  DOMAIN_DESIGNER_INITIAL_STATE_DATA_SOURCE_URI_SELECTED_STATE: 'domainDesignerInitialStateDataSourceUriSelectedState',
  DOMAIN_DESIGNER_INITIAL_STATE_FAIL_STATE: 'domainDesignerInitialStateFailState',
  DOMAIN_DESIGNER_INITIAL_STATE_INITIALIZE_DESIGNER_STATE_AFTER_RECOVERABLE_ERROR_STATE: 'domainDesignerInitialStateInitializeDesignerStateAfterRecoverableErrorState',
  DOMAIN_DESIGNER_INITIAL_STATE_SECURITY_FILE_ERROR_STATE: 'domainDesignerInitialStateSecurityFileErrorState',
  DOMAIN_DESIGNER_INITIAL_STATE_VALIDATION_ERROR_STATE: 'domainDesignerInitialStateValidationErrorState',
  SET_DOMAIN_DESIGNER_STATE_STATE: 'setDomainDesignerStateState',
  DOMAIN_VALIDATION_STATE: 'domainValidationState',
  GOTO_PREVIOUS_LOCATION_OR_STAY_IN_DESIGNER_STATE: 'goToPreviousLocationOrStayInDesignerState',
  GOTO_PREVIOUS_LOCATION_STATE: 'goToPreviousLocationState',
  INITIALIZE_DOMAIN_DESIGNER_BY_DATA_SOURCE_URI_STATE: 'initializeDomainDesignerByDataSourceUriState',
  INITIALIZE_DOMAIN_DESIGNER_BY_DOMAIN_URI_STATE: 'initializeDomainDesignerByDomainUriState',
  INITIALIZE_DOMAIN_DESIGNER_STATE: 'initializeDomainDesignerState',
  MAP_SCHEMAS_STATE: 'mapSchemasState',
  REMOVE_ORPHAN_RESOURCES_STATE: 'removeOrphanResourcesState',
  REPLACE_DATA_SOURCE_STATE: 'replaceDataSourceState',
  SELECT_DATA_SOURCE_STATE: 'selectDataSourceState',
  TRY_TO_MAP_SCHEMAS_AFTER_VALIDATION_ERROR_STATE: 'tryToMapSchemaAfterValidationErrorState',
  UNAVAILABLE_SCHEMA_ERROR_STATE: 'unavailableSchemaErrorState',
  VALIDATION_ERROR_STATE: 'validationErrorState',
  VALIDATION_ERROR_MAP_SCHEMAS_STATE: 'validationErrorMapSchemaState',
  VALIDATION_ERROR_REMOVE_ORPHAN_RESOURCES_STATE: 'validationErrorRemoveOrphanResourcesState',
  REPLACE_DATA_SOURCE_INITIAL_STATE: 'replaceDataSourceInitialState',
  REPLACE_DATA_SOURCE_DATA_SOURCE_URI_SELECTED_STATE: 'replaceDataSourceDataSourceUriSelectedState',
  REPLACE_DATA_SOURCE_VALIDATION_ERROR_STATE: 'replaceDataSourceValidationErrorState',
  DATA_SOURCE_ERROR_STATE: 'openDataSourceValidationErrorDialogState',
  LOAD_NEW_FIELDS_FOR_ALL_TABLES_STATE: 'loadNewFieldsForAllTablesState',
  SET_DOMAIN_DESIGNER_STATE_WITH_CURRENT_DESIGNER_STATE: 'setDomainDesignerStateWithCurrentDesignerState',
  SAVE_DOMAIN_INITIAL_VALIDATION_STATE: 'saveDomainInitialValidationState',
  SAVE_DOMAIN_IS_SUCCESSFUL_STATE: 'saveDomainIsSuccessfulState',
  SAVE_DOMAIN_VALIDATION_ERROR_STATE: 'saveDomainValidationErrorState',
  SAVE_DOMAIN_AFTER_VALIDATION_ERROR_IS_RESOLVED_STATE: 'saveDomainAfterValidationErrorIsResolvedState',
  SAVE_DOMAIN_WITH_SAVE_DIALOG_STATE: 'saveDomainWithSaveDialogState',
  SAVE_DOMAIN_VALIDATION_SECURITY_FILE_STATE: 'saveDomainValidationSecurityFileState',
  SAVE_DOMAIN_SECURITY_FILE_ERROR_STATE: 'saveDomainSecurityFileErrorState',
  UPLOAD_SCHEMA_INITIAL_STATE: 'uploadSchemaInitialState',
  UPLOAD_SCHEMA_CHECK_SCHEMA_TYPE_STATE: 'uploadSchemaCheckSchemaTypeState',
  UPLOAD_SCHEMA_CONVERT_XML_TO_JSON_SCHEMA_STATE: 'uploadSchemaConvertXmlToJsonSchemaState',
  UPLOAD_SCHEMA_XML_CONVERSION_ERROR_STATE: 'uploadSchemaXmlConversionErrorState',
  UPLOAD_SCHEMA_SHOW_UPDATE_DOMAIN_WARNING_DIALOG_STATE: 'uploadSchemaShowUpdateDomainWarningDialogState',
  UPLOAD_SCHEMA_PARSE_SCHEMA_AND_CREATE_DOMAIN_STATE: 'uploadSchemaParseSchemaAndCreateDomainState',
  UPLOAD_SCHEMA_VALIDATE_DOMAIN_STATE: 'uploadSchemaValidateDomainState',
  UPLOAD_SCHEMA_DATA_SOURCE_URI_SELECTED_STATE: 'uploadSchemaDataSourceUriSelectedState',
  UPLOAD_SCHEMA_SHOW_ERROR_DIALOG_STATE: 'uploadSchemaShowErrorDialogState',
  UPLOAD_SCHEMA_FINAL_STATE: 'uploadSchemaFinalState',
  UPLOAD_SCHEMA_VALIDATION_ERROR_STATE: 'uploadSchemaValidationErrorState',
  DOWNLOAD_SCHEMA_VALIDATION_ERROR_STATE: 'downloadSchemaValidationErrorState'
};

});