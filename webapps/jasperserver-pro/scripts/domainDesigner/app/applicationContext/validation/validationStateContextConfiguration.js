define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var ValidationStateFactory = require("../../component/validation/state/factory/ValidationStateFactory");

var DataSourceMetadataToDTOConverter = require("../../component/designer/metadataDesigner/converter/DataSourceMetadataToDTOConverter");

var SequenceGenerator = require("../../../model/util/SequenceGenerator");

var ResourceIdentifierGenerator = require("../../common/util/ResourceIdentifierGenerator");

var domainMapSchemaUnavailableSchemaErrorToErrorParametersConverter = require("../../component/validation/errorHandling/converter/errorConverter/onSaveAndReplaceDataSource/domainMapSchemaUnavailableSchemaErrorToErrorParametersConverter");

var downloadSchemaUnrecoverableErrorDialogStateFactory = require("../../component/validation/errorHandling/dialog/factory/downloadSchemaUnrecoverableErrorDialogStateFactory");

var uploadSchemaUnrecoverableErrorDialogStateFactory = require("../../component/validation/errorHandling/dialog/factory/uploadSchemaUnrecoverableErrorDialogStateFactory");

var domainInitialStateUnrecoverableErrorDialogStateFactory = require("../../component/validation/errorHandling/dialog/factory/domainInitialStateUnrecoverableErrorDialogStateFactory");

var unavailableSchemasErrorDialogStateFactory = require("../../component/validation/errorHandling/dialog/factory/unavailableSchemasErrorDialogStateFactory");

var saveDomainUnrecoverableErrorDialogStateFactory = require("../../component/validation/errorHandling/dialog/factory/saveDomainUnrecoverableErrorDialogStateFactory");

var saveDomainSecurityFileErrorDialogStateFactory = require("../../component/validation/errorHandling/dialog/factory/saveDomainSecurityFileErrorDialogStateFactory");

var domainInitialStateSecurityFileErrorWarningDialogStateFactory = require("../../component/validation/errorHandling/dialog/factory/domainInitialStateSecurityFileErrorWarningDialogStateFactory");

var updateSavedSchemaWarningDialogStateFactory = require("../../component/validation/errorHandling/dialog/factory/updateSavedSchemaWarningDialogStateFactory");

var dataSourceErrorValidationDialogStateFactory = require("../../component/validation/errorHandling/dialog/factory/dataSourceErrorValidationDialogStateFactory");

var DomainDesignerInitialStateDataSourceUriSelectedState = require("../../component/validation/state/DomainDesignerInitialStateDataSourceUriSelectedState");

var UnrecoverableErrorState = require("../../component/validation/state/UnrecoverableErrorState");

var DomainDesignerInitialStateFailState = require("../../component/validation/state/DomainDesignerInitialStateFailState");

var DomainDesignerInitialStateInitializeDesignerStateAfterRecoverableErrorState = require("../../component/validation/state/DomainDesignerInitialStateInitializeDesignerStateAfterRecoverableErrorState");

var DomainDesignerInitialStateSecurityFileErrorState = require("../../component/validation/state/DomainDesignerInitialStateSecurityFileErrorState");

var DomainDesignerInitialStateValidationErrorState = require("../../component/validation/state/DomainDesignerInitialStateValidationErrorState");

var SetDomainDesignerStateState = require("../../component/validation/state/SetDomainDesignerStateState");

var DomainValidationState = require("../../component/validation/state/DomainValidationState");

var GoToPreviousLocationOrStayInDesignerState = require("../../component/validation/state/GoToPreviousLocationOrStayInDesignerState");

var GoToPreviousLocationState = require("../../component/validation/state/GoToPreviousLocationState");

var InitializeDomainDesignerByDataSourceUriState = require("../../component/validation/state/InitializeDomainDesignerByDataSourceUriState");

var InitializeDomainDesignerByDomainUriState = require("../../component/validation/state/InitializeDomainDesignerByDomainUriState");

var InitializeDomainDesignerState = require("../../component/validation/state/InitializeDomainDesignerState");

var MapSchemasState = require("../../component/validation/state/MapSchemasState");

var RemoveOrphanResourcesState = require("../../component/validation/state/RemoveOrphanResourcesState");

var ReplaceDataSourceState = require("../../component/validation/state/ReplaceDataSourceState");

var SelectDataSourceState = require("../../component/validation/state/SelectDataSourceState");

var DataSourceErrorState = require("../../component/validation/state/DataSourceErrorState");

var LoadNewFieldsForAllTablesState = require("../../component/validation/state/LoadNewFieldsForAllTablesState");

var TryToMapSchemaAfterValidationErrorState = require("../../component/validation/state/TryToMapSchemaAfterValidationErrorState");

var UnavailableSchemaErrorState = require("../../component/validation/state/UnavailableSchemaErrorState");

var ValidationErrorState = require("../../component/validation/state/ValidationErrorState");

var ValidationErrorMapSchemasState = require("../../component/validation/state/ValidationErrorMapSchemasState");

var ValidationErrorRemoveOrphanResourcesState = require("../../component/validation/state/ValidationErrorRemoveOrphanResourcesState");

var ReplaceDataSourceInitialState = require("../../component/validation/state/ReplaceDataSourceInitialState");

var ReplaceDataSourceDataSourceUriSelectedState = require("../../component/validation/state/ReplaceDataSourceDataSourceUriSelectedState");

var ReplaceDataSourceValidationErrorState = require("../../component/validation/state/ReplaceDataSourceValidationErrorState");

var SaveDomainInitialValidationState = require("../../component/validation/state/SaveDomainInitialValidationState");

var SaveDomainValidationSecurityFileState = require("../../component/validation/state/SaveDomainValidationSecurityFileState");

var SaveDomainIsSuccessfulState = require("../../component/validation/state/SaveDomainIsSuccessfulState");

var SaveDomainValidationErrorState = require("../../component/validation/state/SaveDomainValidationErrorState");

var SaveDomainAfterValidationErrorIsResolvedState = require("../../component/validation/state/SaveDomainAfterValidationErrorIsResolvedState");

var SaveDomainWithSaveDialogState = require("../../component/validation/state/SaveDomainWithSaveDialogState");

var SaveDomainSecurityFileErrorState = require("../../component/validation/state/SaveDomainSecurityFileErrorState");

var SetDomainDesignerStateWithCurrentDesignerState = require("../../component/validation/state/SetDomainDesignerStateWithCurrentDesignerState");

var UploadSchemaInitialState = require("../../component/validation/state/UploadSchemaInitialState");

var UploadSchemaCheckSchemaTypeState = require("../../component/validation/state/UploadSchemaCheckSchemaTypeState");

var UploadSchemaConvertXmlToJsonSchemaState = require("../../component/validation/state/UploadSchemaConvertXmlToJsonSchemaState");

var UploadSchemaXmlConversionErrorState = require("../../component/validation/state/UploadSchemaXmlConversionErrorState");

var UploadSchemaDataSourceUriSelectedState = require("../../component/validation/state/UploadSchemaDataSourceUriSelectedState");

var UploadSchemaFinalState = require("../../component/validation/state/UploadSchemaFinalState");

var UploadSchemaShowErrorDialogState = require("../../component/validation/state/UploadSchemaShowErrorDialogState");

var UploadSchemaParseSchemaAndCreateDomainState = require("../../component/validation/state/UploadSchemaParseSchemaAndCreateDomainState");

var UploadSchemaShowUpdateDomainWarningDialogState = require("../../component/validation/state/UploadSchemaShowUpdateDomainWarningDialogState");

var UploadSchemaValidateDomainState = require("../../component/validation/state/UploadSchemaValidateDomainState");

var UploadSchemaValidationErrorState = require("../../component/validation/state/UploadSchemaValidationErrorState");

var GenericMapBasedFactory = require("../../component/validation/errorHandling/factory/GenericMapBasedFactory");

var DownloadSchemaValidationErrorState = require("../../component/validation/state/DownloadSchemaValidationErrorState");

var repositoryResourceChooserStateMutationsFactory = require("../../component/repositoryResourceChooser/component/chooser/mutations/repositoryResourceChooserStateMutationsFactory");

var repositoryResourceChooserActionsFactory = require("../../component/repositoryResourceChooser/component/chooser/actions/repositoryResourceChooserActionsFactory");

var validationStateNameEnum = require("../../component/validation/state/enum/validationStateNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createDataSourceErrorConverterBasedOnInitialStateFactory(context, options) {
  var dataSourceErrorConverterBasedOnInitialStateMap = {};
  dataSourceErrorConverterBasedOnInitialStateMap[validationStateNameEnum.INITIALIZE_DOMAIN_DESIGNER_STATE] = context.get('dataSourceErrorsConverter');
  dataSourceErrorConverterBasedOnInitialStateMap[validationStateNameEnum.REPLACE_DATA_SOURCE_INITIAL_STATE] = context.get('dataSourceErrorsConverter');
  dataSourceErrorConverterBasedOnInitialStateMap[validationStateNameEnum.SAVE_DOMAIN_INITIAL_VALIDATION_STATE] = context.get('dataSourceErrorsConverter');
  dataSourceErrorConverterBasedOnInitialStateMap[validationStateNameEnum.UPLOAD_SCHEMA_INITIAL_STATE] = context.get('dataSourceErrorsConverter');
  context.register('dataSourceErrorConverterBasedOnInitialStateFactory', new GenericMapBasedFactory({
    map: dataSourceErrorConverterBasedOnInitialStateMap
  }));
}

function createUnrecoverableErrorDialogStateFactoryBasedOnInitialStateFactory(context, options) {
  var unrecoverableErrorDialogStateFactoryMap = {};
  unrecoverableErrorDialogStateFactoryMap[validationStateNameEnum.INITIALIZE_DOMAIN_DESIGNER_STATE] = domainInitialStateUnrecoverableErrorDialogStateFactory;
  unrecoverableErrorDialogStateFactoryMap[validationStateNameEnum.REPLACE_DATA_SOURCE_INITIAL_STATE] = domainInitialStateUnrecoverableErrorDialogStateFactory;
  unrecoverableErrorDialogStateFactoryMap[validationStateNameEnum.SAVE_DOMAIN_INITIAL_VALIDATION_STATE] = saveDomainUnrecoverableErrorDialogStateFactory;
  unrecoverableErrorDialogStateFactoryMap[validationStateNameEnum.UPLOAD_SCHEMA_INITIAL_STATE] = uploadSchemaUnrecoverableErrorDialogStateFactory;
  unrecoverableErrorDialogStateFactoryMap[validationStateNameEnum.DOWNLOAD_SCHEMA_VALIDATION_ERROR_STATE] = downloadSchemaUnrecoverableErrorDialogStateFactory;
  context.register('unrecoverableErrorDialogStateFactoryFactory', new GenericMapBasedFactory({
    map: unrecoverableErrorDialogStateFactoryMap
  }));
}

function createDropRecoverableErrorsFilterFactoryBasedOnInitialStateFactory(context, options) {
  var dropRecoverableErrorsFilterMap = {};
  dropRecoverableErrorsFilterMap[validationStateNameEnum.INITIALIZE_DOMAIN_DESIGNER_STATE] = context.get('dropRecoverableErrorsFilter');
  dropRecoverableErrorsFilterMap[validationStateNameEnum.REPLACE_DATA_SOURCE_INITIAL_STATE] = context.get("dropRecoverableErrorsFilter");
  dropRecoverableErrorsFilterMap[validationStateNameEnum.SAVE_DOMAIN_INITIAL_VALIDATION_STATE] = context.get('dropRecoverableErrorsFilter');
  dropRecoverableErrorsFilterMap[validationStateNameEnum.UPLOAD_SCHEMA_INITIAL_STATE] = context.get('dropRecoverableErrorsFilterForSchemaUpload');
  dropRecoverableErrorsFilterMap[validationStateNameEnum.DOWNLOAD_SCHEMA_VALIDATION_ERROR_STATE] = context.get('dropRecoverableErrorsFilterForSchemaDownload');
  context.register('dropRecoverableErrorsFilterFactory', new GenericMapBasedFactory({
    map: dropRecoverableErrorsFilterMap
  }));
}

function createUnrecoverableErrorsConverterBasedOnInitialStateFactory(context, options) {
  var unrecoverableErrorsConverterMap = {};
  unrecoverableErrorsConverterMap[validationStateNameEnum.INITIALIZE_DOMAIN_DESIGNER_STATE] = context.get('unrecoverableErrorsConverter');
  unrecoverableErrorsConverterMap[validationStateNameEnum.REPLACE_DATA_SOURCE_INITIAL_STATE] = context.get("unrecoverableErrorsConverter");
  unrecoverableErrorsConverterMap[validationStateNameEnum.SAVE_DOMAIN_INITIAL_VALIDATION_STATE] = context.get('unrecoverableErrorsConverterForSaveDomain');
  unrecoverableErrorsConverterMap[validationStateNameEnum.UPLOAD_SCHEMA_INITIAL_STATE] = context.get('unrecoverableErrorsConverter');
  unrecoverableErrorsConverterMap[validationStateNameEnum.DOWNLOAD_SCHEMA_VALIDATION_ERROR_STATE] = context.get('unrecoverableErrorsConverterForDownloadSchema');
  context.register('unrecoverableErrorsConverterFactory', new GenericMapBasedFactory({
    map: unrecoverableErrorsConverterMap
  }));
}

function createValidationStates(context, options) {
  context.register(validationStateNameEnum.DOMAIN_DESIGNER_INITIAL_STATE_DATA_SOURCE_URI_SELECTED_STATE, new DomainDesignerInitialStateDataSourceUriSelectedState({
    domainValidationMutations: context.get('domainValidationMutations'),
    clientDomainInitialDesignerStateService: context.get('clientDomainInitialDesignerStateService')
  }));
  context.register(validationStateNameEnum.UNRECOVERABLE_ERROR_STATE, new UnrecoverableErrorState({
    validationErrorDialogStore: context.get('validationErrorDialogStore'),
    dropRecoverableErrorsFilterFactory: context.get('dropRecoverableErrorsFilterFactory'),
    unrecoverableErrorDialogStateFactoryFactory: context.get('unrecoverableErrorDialogStateFactoryFactory'),
    unrecoverableErrorsConverterFactory: context.get('unrecoverableErrorsConverterFactory'),
    validationEventBus: context.get('validationEventBus'),
    validationErrorDialog: context.get('validationErrorDialog')
  }));
  context.register(validationStateNameEnum.DOMAIN_DESIGNER_INITIAL_STATE_FAIL_STATE, new DomainDesignerInitialStateFailState({
    dataSourceInvalidValidationErrorSpecification: context.get('dataSourceInvalidValidationErrorSpecification'),
    allErrorsRecoverableValidationErrorSpecification: context.get('allErrorsRecoverableValidationErrorSpecification'),
    invalidSecurityFileErrorsOnlySpecification: context.get('invalidSecurityFileErrorsOnlySpecification')
  }));
  context.register(validationStateNameEnum.DOMAIN_DESIGNER_INITIAL_STATE_INITIALIZE_DESIGNER_STATE_AFTER_RECOVERABLE_ERROR_STATE, new DomainDesignerInitialStateInitializeDesignerStateAfterRecoverableErrorState({
    clientDomainInitialDesignerStateService: context.get('clientDomainInitialDesignerStateService'),
    domainValidationMutations: context.get('domainValidationMutations')
  }));
  context.register(validationStateNameEnum.DOMAIN_DESIGNER_INITIAL_STATE_SECURITY_FILE_ERROR_STATE, new DomainDesignerInitialStateSecurityFileErrorState({
    validationEventBus: context.get('validationEventBus'),
    validationWarningDialog: context.get('validationWarningDialog'),
    validationWarningDialogStore: context.get('validationWarningDialogStore'),
    domainInitialStateSecurityFileErrorWarningDialogStateFactory: domainInitialStateSecurityFileErrorWarningDialogStateFactory,
    securityFileErrorsConverter: context.get('securityFileErrorsConverter')
  }));
  context.register(validationStateNameEnum.SET_DOMAIN_DESIGNER_STATE_STATE, new SetDomainDesignerStateState({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus')
  }));
  context.register(validationStateNameEnum.DOMAIN_DESIGNER_INITIAL_STATE_VALIDATION_ERROR_STATE, new DomainDesignerInitialStateValidationErrorState({
    orphanResourcesValidationErrorSpecification: context.get('orphanResourcesValidationErrorSpecification'),
    dataSourceInvalidValidationErrorSpecification: context.get('dataSourceInvalidValidationErrorSpecification'),
    domainSchemaNameMismatchErrorsToAvailableSchemasListConverter: context.get('domainSchemaNameMismatchErrorsToAvailableSchemasListConverter'),
    dataSourceSchemaNameMismatchValidationErrorSpecification: context.get('dataSourceSchemaNameMismatchValidationErrorSpecification'),
    emptyResourcesElementValidationErrorSpecification: context.get('emptyResourcesElementValidationErrorSpecification')
  }));
  context.register(validationStateNameEnum.DOMAIN_VALIDATION_STATE, new DomainValidationState({
    validationService: context.get('validationServiceWrappedWithLoader'),
    domainValidationMutations: context.get('domainValidationMutations'),
    domainSchemaMappingService: context.get('domainSchemaMappingService'),
    clientDomainValidationService: context.get('clientDomainValidationService')
  }));
  context.register(validationStateNameEnum.GOTO_PREVIOUS_LOCATION_OR_STAY_IN_DESIGNER_STATE, new GoToPreviousLocationOrStayInDesignerState({
    clientCurrentDesignerStateService: context.get('clientCurrentDesignerStateService')
  }));
  context.register(validationStateNameEnum.GOTO_PREVIOUS_LOCATION_STATE, new GoToPreviousLocationState({
    goToPreviousLocation: context.get('goToPreviousLocation')
  }));
  context.register(validationStateNameEnum.INITIALIZE_DOMAIN_DESIGNER_BY_DATA_SOURCE_URI_STATE, new InitializeDomainDesignerByDataSourceUriState({
    clientDomainInitialDesignerStateService: context.get('clientDomainInitialDesignerStateService')
  }));
  context.register(validationStateNameEnum.INITIALIZE_DOMAIN_DESIGNER_BY_DOMAIN_URI_STATE, new InitializeDomainDesignerByDomainUriState({
    validationService: context.get('validationServiceWrappedWithLoader'),
    resourcesService: context.get('resourcesServiceWrappedWithLoader'),
    domainValidationMutations: context.get('domainValidationMutations'),
    clientDomainInitialDesignerStateService: context.get('clientDomainInitialDesignerStateService')
  }));
  context.register(validationStateNameEnum.INITIALIZE_DOMAIN_DESIGNER_STATE, new InitializeDomainDesignerState());
  context.register(validationStateNameEnum.MAP_SCHEMAS_STATE, new MapSchemasState({
    schemaMappingModel: context.get('schemaMappingModel'),
    schemaMappingDialog: context.get('schemaMappingDialog'),
    domainValidationEventBus: context.get('domainValidationEventBus'),
    defaultSchemaExistsAndNotEmptySpecification: context.get('validationDefaultSchemaExistsAndNotEmptySpecification'),
    clientDomainSchemaService: context.get('clientDomainSchemaServiceForDomainSchemaValidationService'),
    clientDomainValidationService: context.get('clientDomainValidationService'),
    clientCurrentDesignerStateService: context.get('clientCurrentDesignerStateService')
  }));
  context.register(validationStateNameEnum.REMOVE_ORPHAN_RESOURCES_STATE, new RemoveOrphanResourcesState({
    domainValidationMutations: context.get('domainValidationMutations'),
    entityCollector: context.get('validationDependenciesTrackingEntityCollector'),
    dependenciesConverter: context.get('validationDependenciesTrackingConverter'),
    dependenciesInspectorApplication: context.get('dependenciesInspectorApplication'),
    clientDomainValidationService: context.get('clientDomainValidationService')
  }));
  context.register(validationStateNameEnum.REPLACE_DATA_SOURCE_STATE, new ReplaceDataSourceState({
    dataSourceFreshInfoService: context.get('dataSourceFreshInfoService'),
    domainValidationMutations: context.get('domainValidationMutations'),
    clientDomainValidationService: context.get('clientDomainValidationService')
  }));
  context.register(validationStateNameEnum.SELECT_DATA_SOURCE_STATE, new SelectDataSourceState({
    dataSourceChooserDialog: context.get('dataSourceChooserDialog'),
    dataSourceChooserDialogStore: context.get('repositoryResourceChooserDialogStore'),
    dataSourceChooserPopoverErrorMessageConverter: context.get('dataSourceChooserPopoverErrorMessageConverter'),
    clientResourcePropertiesService: context.get('clientResourcePropertiesService'),
    dataSourceSelectionCheckService: context.get('dataSourceSelectionCheckService'),
    selectDataSourceLoaderDialogEventBus: context.get('selectDataSourceLoaderDialogEventBus'),
    repositoryResourceChooserStateMutations: repositoryResourceChooserStateMutationsFactory.create({
      store: context.get('repositoryResourceChooserDialogStore').get('repositoryResourceChooser')
    }),
    repositoryResourceChooserActions: repositoryResourceChooserActionsFactory.create({
      store: context.get('repositoryResourceChooserDialogStore').get('repositoryResourceChooser')
    })
  }));
  context.register(validationStateNameEnum.DATA_SOURCE_ERROR_STATE, new DataSourceErrorState({
    validationErrorDialog: context.get('validationErrorDialog'),
    validationErrorDialogStore: context.get('validationErrorDialogStore'),
    validationEventBus: context.get('validationEventBus'),
    dataSourceInvalidErrorsSorter: context.get('dataSourceInvalidErrorsSorter'),
    dataSourceErrorsConverterFactory: context.get('dataSourceErrorConverterBasedOnInitialStateFactory'),
    dataSourceErrorValidationDialogStateFactory: dataSourceErrorValidationDialogStateFactory
  }));
  var dataSourceMetadataToDTOConverter = new DataSourceMetadataToDTOConverter({
    fieldsNameGenerator: new ResourceIdentifierGenerator({
      sequenceGenerator: new SequenceGenerator()
    }),
    clientDomainSchemaService: context.get('clientDomainSchemaServiceForDomainSchemaValidationService')
  });
  context.register(validationStateNameEnum.LOAD_NEW_FIELDS_FOR_ALL_TABLES_STATE, new LoadNewFieldsForAllTablesState({
    metadataService: context.get('metadataServiceWrappedWithLoader'),
    validationMetadataService: context.get('validationMetadataService'),
    domainValidationMutations: context.get('domainValidationMutations'),
    clientDomainValidationService: context.get('clientDomainValidationService'),
    dataSourceMetadataToDTOConverter: dataSourceMetadataToDTOConverter,
    schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec: context.get('validationSchemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec')
  }));
  context.register(validationStateNameEnum.SET_DOMAIN_DESIGNER_STATE_WITH_CURRENT_DESIGNER_STATE, new SetDomainDesignerStateWithCurrentDesignerState({
    clientDomainValidationService: context.get('clientDomainValidationService')
  }));
  context.register(validationStateNameEnum.TRY_TO_MAP_SCHEMAS_AFTER_VALIDATION_ERROR_STATE, new TryToMapSchemaAfterValidationErrorState({
    dataSourceFreshInfoService: context.get('dataSourceFreshInfoService'),
    clientDomainValidationService: context.get('clientDomainValidationService')
  }));
  context.register(validationStateNameEnum.UNAVAILABLE_SCHEMA_ERROR_STATE, new UnavailableSchemaErrorState({
    validationErrorDialog: context.get('validationErrorDialog'),
    validationErrorDialogStore: context.get('validationErrorDialogStore'),
    unavailableSchemasErrorDialogStateFactory: unavailableSchemasErrorDialogStateFactory,
    domainMapSchemaUnavailableSchemaErrorToErrorParametersConverter: domainMapSchemaUnavailableSchemaErrorToErrorParametersConverter,
    validationEventBus: context.get('validationEventBus')
  }));
  context.register(validationStateNameEnum.VALIDATION_ERROR_STATE, new ValidationErrorState({}));
  context.register(validationStateNameEnum.VALIDATION_ERROR_MAP_SCHEMAS_STATE, new ValidationErrorMapSchemasState({
    domainSchemaNameMismatchErrorsToAvailableSchemasListConverter: context.get('domainSchemaNameMismatchErrorsToAvailableSchemasListConverter')
  }));
  context.register(validationStateNameEnum.VALIDATION_ERROR_REMOVE_ORPHAN_RESOURCES_STATE, new ValidationErrorRemoveOrphanResourcesState({
    domainSchemaValidationErrorsToOrphanResourcesConverter: context.get('domainSchemaValidationErrorsToOrphanResourcesConverter')
  }));
  context.register(validationStateNameEnum.REPLACE_DATA_SOURCE_INITIAL_STATE, new ReplaceDataSourceInitialState({
    domainValidationMutations: context.get('domainValidationMutations'),
    clientCurrentDesignerStateService: context.get('clientCurrentDesignerStateService')
  }));
  context.register(validationStateNameEnum.REPLACE_DATA_SOURCE_DATA_SOURCE_URI_SELECTED_STATE, new ReplaceDataSourceDataSourceUriSelectedState({}));
  context.register(validationStateNameEnum.REPLACE_DATA_SOURCE_VALIDATION_ERROR_STATE, new ReplaceDataSourceValidationErrorState({
    encryptedProfileAttributeErrorSpecification: context.get("encryptedProfileAttributeErrorSpecification"),
    dataSourceInvalidValidationErrorSpecification: context.get('dataSourceInvalidValidationErrorSpecification'),
    dataSourceSchemaNameMismatchValidationErrorSpecification: context.get('dataSourceSchemaNameMismatchValidationErrorSpecification')
  }));
  context.register(validationStateNameEnum.SAVE_DOMAIN_INITIAL_VALIDATION_STATE, new SaveDomainInitialValidationState({
    domainValidationMutations: context.get('domainValidationMutations'),
    clientCurrentDesignerStateService: context.get('clientCurrentDesignerStateService')
  }));
  context.register(validationStateNameEnum.SAVE_DOMAIN_VALIDATION_SECURITY_FILE_STATE, new SaveDomainValidationSecurityFileState({
    domainValidationMutations: context.get('domainValidationMutations'),
    clientCurrentDesignerStateService: context.get('clientCurrentDesignerStateService')
  }));
  context.register(validationStateNameEnum.SAVE_DOMAIN_IS_SUCCESSFUL_STATE, new SaveDomainIsSuccessfulState({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    clientDomainValidationService: context.get('clientDomainValidationService'),
    serverResourcePropertiesModelParser: context.get('serverResourcePropertiesModelParser'),
    clientResourcePropertiesService: context.get('clientResourcePropertiesService')
  }));
  context.register(validationStateNameEnum.SAVE_DOMAIN_VALIDATION_ERROR_STATE, new SaveDomainValidationErrorState({
    dataSourceInvalidValidationErrorSpecification: context.get('dataSourceInvalidValidationErrorSpecification'),
    dataSourceSchemaNameMismatchValidationErrorSpecification: context.get('dataSourceSchemaNameMismatchValidationErrorSpecification'),
    orphanResourcesValidationErrorSpecification: context.get('orphanResourcesValidationErrorSpecification'),
    invalidSecurityFileErrorsOnlySpecification: context.get('invalidSecurityFileErrorsOnlySpecification')
  }));
  context.register(validationStateNameEnum.SAVE_DOMAIN_AFTER_VALIDATION_ERROR_IS_RESOLVED_STATE, new SaveDomainAfterValidationErrorIsResolvedState({
    saveDialogModel: context.get('saveDialogModel')
  }));
  context.register(validationStateNameEnum.SAVE_DOMAIN_WITH_SAVE_DIALOG_STATE, new SaveDomainWithSaveDialogState({
    saveDialog: context.get('saveDialog')
  }));
  context.register(validationStateNameEnum.SAVE_DOMAIN_SECURITY_FILE_ERROR_STATE, new SaveDomainSecurityFileErrorState({
    validationEventBus: context.get('validationEventBus'),
    validationErrorDialog: context.get('validationErrorDialog'),
    validationErrorDialogStore: context.get('validationErrorDialogStore'),
    saveDomainSecurityFileErrorDialogStateFactory: saveDomainSecurityFileErrorDialogStateFactory,
    securityFileErrorsConverter: context.get('securityFileErrorsConverter')
  }));
  context.register(validationStateNameEnum.UPLOAD_SCHEMA_INITIAL_STATE, new UploadSchemaInitialState({
    clientResourcePropertiesService: context.get('clientResourcePropertiesService')
  }));
  context.register(validationStateNameEnum.UPLOAD_SCHEMA_CHECK_SCHEMA_TYPE_STATE, new UploadSchemaCheckSchemaTypeState({}));
  context.register(validationStateNameEnum.UPLOAD_SCHEMA_CONVERT_XML_TO_JSON_SCHEMA_STATE, new UploadSchemaConvertXmlToJsonSchemaState({
    resourcesService: context.get('resourcesServiceWrappedWithLoader')
  }));
  context.register(validationStateNameEnum.UPLOAD_SCHEMA_XML_CONVERSION_ERROR_STATE, new UploadSchemaXmlConversionErrorState({}));
  context.register(validationStateNameEnum.UPLOAD_SCHEMA_SHOW_UPDATE_DOMAIN_WARNING_DIALOG_STATE, new UploadSchemaShowUpdateDomainWarningDialogState({
    validationEventBus: context.get('validationEventBus'),
    validationWarningDialog: context.get('validationWarningDialog'),
    validationWarningDialogStore: context.get('validationWarningDialogStore'),
    updateSavedSchemaWarningDialogStateFactory: updateSavedSchemaWarningDialogStateFactory
  }));
  context.register(validationStateNameEnum.UPLOAD_SCHEMA_PARSE_SCHEMA_AND_CREATE_DOMAIN_STATE, new UploadSchemaParseSchemaAndCreateDomainState({
    clientDomainService: context.get('clientDomainService')
  }));
  context.register(validationStateNameEnum.UPLOAD_SCHEMA_VALIDATE_DOMAIN_STATE, new UploadSchemaValidateDomainState({
    validationService: context.get('validationServiceWrappedWithLoader'),
    dataSourceInfoService: context.get('dataSourceInfoServiceWrappedWithLoader'),
    asyncServerSchemaModelParserService: context.get('asyncServerSchemaModelParserService'),
    schemaModelConverter: context.get('schemaModelConverter'),
    entitiesWithExpressionUpdateService: context.get('entitiesWithExpressionUpdateService'),
    parametrizedSchemaResolvingService: context.get('parametrizedSchemaResolvingService'),
    designerViewStateByDomainProvider: context.get('designerViewStateByDomainProvider')
  }));
  context.register(validationStateNameEnum.UPLOAD_SCHEMA_SHOW_ERROR_DIALOG_STATE, new UploadSchemaShowErrorDialogState({
    validationEventBus: context.get('validationEventBus'),
    uploadSchemaValidationErrorDialog: context.get('validationErrorDialog'),
    uploadSchemaValidationErrorDialogStore: context.get('validationErrorDialogStore'),
    uploadSchemaUnrecoverableErrorDialogStateFactory: uploadSchemaUnrecoverableErrorDialogStateFactory
  }));
  context.register(validationStateNameEnum.UPLOAD_SCHEMA_FINAL_STATE, new UploadSchemaFinalState({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus')
  }));
  context.register(validationStateNameEnum.UPLOAD_SCHEMA_DATA_SOURCE_URI_SELECTED_STATE, new UploadSchemaDataSourceUriSelectedState({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus')
  }));
  context.register(validationStateNameEnum.UPLOAD_SCHEMA_VALIDATION_ERROR_STATE, new UploadSchemaValidationErrorState({
    dataSourceInvalidValidationErrorSpecification: context.get('dataSourceInvalidValidationErrorSpecification')
  }));
  context.register(validationStateNameEnum.DOWNLOAD_SCHEMA_VALIDATION_ERROR_STATE, new DownloadSchemaValidationErrorState({}));
}

function createValidationStateFactory(context, options) {
  var stateMap = _.reduce(validationStateNameEnum, function (memo, stateName) {
    memo[stateName] = context.get(stateName);
    return memo;
  }, {});

  context.register('validationStateFactory', new ValidationStateFactory({
    validationStates: stateMap
  }));
}

module.exports = function (context, options) {
  createDropRecoverableErrorsFilterFactoryBasedOnInitialStateFactory(context, options);
  createDataSourceErrorConverterBasedOnInitialStateFactory(context, options);
  createUnrecoverableErrorDialogStateFactoryBasedOnInitialStateFactory(context, options);
  createUnrecoverableErrorsConverterBasedOnInitialStateFactory(context, options);
  createValidationStates(context, options);
  createValidationStateFactory(context, options);
};

});