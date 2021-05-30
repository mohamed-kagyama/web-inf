define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var domainDesignerSettings = require("settings!domainSettings");

var errorParametersKeysEnum = require("../../component/validation/errorHandling/enum/errorParametersKeysEnum");

var encryptedProfileAttributeErrorEnum = require("../../rest/enum/encryptedProfileAttributeErrorEnum");

var restErrorCodesEnum = require("../../../rest/enum/restErrorCodesEnum");

var emptyDataSourceEnum = require("../../model/enum/emptyDataSourceEnum");

var mapErrorConverterFactory = require("../../component/validation/errorHandling/converter/factory/mapErrorConverterFactory");

var ErrorToCategoryAndDetailsConverter = require("../../component/validation/errorHandling/converter/ErrorToCategoryAndDetailsConverter");

var CompositeValidationErrorConverter = require("../../component/validation/errorHandling/converter/CompositeValidationErrorConverter");

var genericUnknownErrorConverter = require("../../component/validation/errorHandling/converter/genericUnknownErrorConverter");

var saveDomainUnknownErrorConverter = require("../../component/validation/errorHandling/converter/saveDomainUnknownErrorConverter");

var domainSchemaNameMismatchErrorToErrorCategoryConverter = require("../../component/validation/errorHandling/converter/categoryConverter/domainSchemaNameMismatchErrorToErrorCategoryConverter");

var domainSchemaElementNameUnsupportedCharacterErrorToErrorCategoryConverter = require("../../component/validation/errorHandling/converter/categoryConverter/domainSchemaElementNameUnsupportedCharacterErrorToErrorCategoryConverter");

var domainSchemaErrorPropertyToValueConverterFactory = require("../../component/validation/errorHandling/converter/factory/domainSchemaErrorPropertyToValueConverterFactory");

var AccessDeniedExceptionToErrorMessageConverter = require("../../component/validation/errorHandling/converter/errorConverter/AccessDeniedExceptionToErrorMessageConverter");

var ResourceNotFoundExceptionToErrorMessageConverter = require("../../component/validation/errorHandling/converter/errorConverter/ResourceNotFoundExceptionToErrorMessageConverter");

var domainSchemaMissingDataBaseTableErrorToResourcePathConverter = require("../../component/validation/errorHandling/converter/errorConverter/domainSchemaMissingDataBaseTableErrorToResourcePathConverter");

var domainSchemaMissingDataBaseColumnErrorToResourcePathConverter = require("../../component/validation/errorHandling/converter/errorConverter/domainSchemaMissingDataBaseColumnErrorToResourcePathConverter");

var domainSchemaJoinElementEmptyReferenceErrorToResourcePathConverter = require("../../component/validation/errorHandling/converter/errorConverter/domainSchemaJoinElementEmptyReferenceErrorToResourcePathConverter");

var domainSchemaExpressionInvalidFieldsErrorToErrorMessageConverter = require("../../component/validation/errorHandling/converter/errorConverter/domainSchemaExpressionInvalidFieldsErrorToErrorMessageConverter");

var DomainSchemaResourcesGroupProfileAttributeExceptionToErrorMessageConverter = require("../../component/validation/errorHandling/converter/errorConverter/DomainSchemaResourcesGroupProfileAttributeExceptionToErrorMessageConverter");

var domainSchemaProfileAttributeNotFoundErrorToErrorMessageConverter = require("../../component/validation/errorHandling/converter/errorConverter/domainSchemaProfileAttributeNotFoundErrorToErrorMessageConverter");

var domainSchemaProfileAttributeInvalidCategoryErrorToErrorMessageConverter = require("../../component/validation/errorHandling/converter/errorConverter/domainSchemaProfileAttributeInvalidCategoryErrorToErrorMessageConverter");

var domainSchemaInvalidJoinTypeErrorToErrorMessageConverter = require("../../component/validation/errorHandling/converter/errorConverter/domainSchemaInvalidJoinTypeErrorToErrorMessageConverter");

var domainSchemaEmptyPresentationElementReferenceErrorToResourcePathConverter = require("../../component/validation/errorHandling/converter/errorConverter/domainSchemaEmptyPresentationElementReferenceErrorToResourcePathConverter");

var domainSchemaConstantGroupElementExpressionRequiredErrorToErrorMessageConverter = require("../../component/validation/errorHandling/converter/errorConverter/domainSchemaConstantGroupElementExpressionRequiredErrorToErrorMessageConverter");

var domainSchemaJoinExpressionInvalidGroupReferenceErrorToErrorMessageConverter = require("../../component/validation/errorHandling/converter/errorConverter/domainSchemaJoinExpressionInvalidGroupReferenceErrorToErrorMessageConverter");

var domainSecuritySchemaResourceAccessGrantExpressionInvalidFieldsErrorToErrorMessageConverter = require("../../component/validation/errorHandling/converter/errorConverter/domainSecuritySchemaResourceAccessGrantExpressionInvalidFieldsErrorToErrorMessageConverter");

var domainSecuritySchemaResourceAccessGrantExpressionParseErrorToErrorMessageConverter = require("../../component/validation/errorHandling/converter/errorConverter/domainSecuritySchemaResourceAccessGrantExpressionParseErrorToErrorMessageConverter");

var domainSecurityMissingElementErrorToErrorListConverter = require("../../component/validation/errorHandling/converter/errorConverter/domainSecurityMissingElementErrorToErrorListConverter");

var domainSchemaResourcesJoinSideInvalidErrorToErrorMessageConverter = require("../../component/validation/errorHandling/converter/errorConverter/domainSchemaResourcesJoinSideInvalidErrorToErrorMessageConverter");

var domainSchemaResourcesJoinReferenceNameInconsistentErrorToErrorMessageConverter = require("../../component/validation/errorHandling/converter/errorConverter/domainSchemaResourcesJoinReferenceNameInconsistentErrorToErrorMessageConverter");

var domainSchemaPresentationContainsNullElementErrorToResourcePathConverter = require("../../component/validation/errorHandling/converter/errorConverter/domainSchemaPresentationContainsNullElementErrorToResourcePathConverter");

var domainBundleFileInvalidErrorToErrorMessageConverter = require("../../component/validation/errorHandling/converter/errorConverter/domainBundleFileInvalidErrorToErrorMessageConverter");

var domainSchemaXmlParseErrorToErrorMessageConverter = require("../../component/validation/errorHandling/converter/errorConverter/domainSchemaXmlParseErrorToErrorMessageConverter");

var DomainSchemaNameMismatchErrorToResourceNameConverter = require("../../component/validation/errorHandling/converter/errorConverter/DomainSchemaNameMismatchErrorToResourceNameConverter");

var domainSchemaEncryptedProfileAttributeErrorToErrorMessageConverter = require("../../component/validation/errorHandling/converter/errorConverter/domainSchemaEncryptedProfileAttributeErrorToErrorMessageConverter");

var domainInitialStateOpenDomainErrorToErrorMessageConverter = require("../../component/validation/errorHandling/converter/errorConverter/domainInitialStateOpenDomainErrorToErrorMessageConverter");

var DomainSchemaNameMismatchErrorsToAvailableSchemasListConverter = require("../../component/validation/errorHandling/converter/DomainSchemaNameMismatchErrorsToAvailableSchemasListConverter");

var serializationErrorToResourceNameConverter = require("../../component/validation/errorHandling/converter/errorConverter/serializationErrorToResourceNameConverter");

var domainSchemaResourcesGroupProfileAttributeExceptionErrorToOrphanResourceConverter = require("../../component/validation/errorHandling/converter/errorConverter/orphanResources/domainSchemaResourcesGroupProfileAttributeExceptionErrorToOrphanResourceConverter");

var schemaNameMismatchForProfileAttributeBasedSchemaErrorToOrphanResourceConverter = require("../../component/validation/errorHandling/converter/errorConverter/orphanResources/schemaNameMismatchForProfileAttributeBasedSchemaErrorToOrphanResourceConverter");

var domainSchemaMissingDataBaseTableErrorToOrphanResourceConverter = require("../../component/validation/errorHandling/converter/errorConverter/orphanResources/domainSchemaMissingDataBaseTableErrorToOrphanResourceConverter");

var domainSchemaMissingDataBaseColumnErrorToOrphanResourceConverter = require("../../component/validation/errorHandling/converter/errorConverter/orphanResources/domainSchemaMissingDataBaseColumnErrorToOrphanResourceConverter");

var domainSchemaResourceJdbsErrorToOrphanResourceConverter = require("../../component/validation/errorHandling/converter/errorConverter/orphanResources/domainSchemaResourceJdbsErrorToOrphanResourceConverter");

var DomainSchemaValidationErrorsToOrphanResourcesConverter = require("../../component/validation/errorHandling/converter/DomainSchemaValidationErrorsToOrphanResourcesConverter");

var illegalParameterValueErrorConverter = require("../../component/validation/errorHandling/converter/errorConverter/illegalParameterValueErrorConverter");

var validationErrorCodeBasedSpecificationFactory = require("../../component/validation/errorHandling/specification/factory/validationErrorCodeBasedSpecificationFactory");

var DropRecoverableErrorsFilter = require("../../component/validation/errorHandling/filter/DropRecoverableErrorsFilter");

var SortErrorsBySpecifications = require("../../component/validation/errorHandling/sorter/SortErrorsBySpecifications");

var IllegalDataSourceUriValidationSpecification = require("../../component/validation/errorHandling/specification/IllegalDataSourceUriValidationSpecification");

var DataSourceInvalidResourceReferenceValidationErrorSpecification = require("../../component/validation/errorHandling/specification/DataSourceInvalidResourceReferenceValidationErrorSpecification");

var AtLeastOneErrorSatisfyAtLeastOneSpecSpecification = require("../../component/validation/errorHandling/specification/AtLeastOneErrorSatisfyAtLeastOneSpecSpecification");

var DataSourceSchemaNameMismatchValidationErrorSpecification = require("../../component/validation/errorHandling/specification/DataSourceSchemaNameMismatchValidationErrorSpecification");

var ProfileAttributeSchemaNameMismatchValidationErrorSpecification = require("../../component/validation/errorHandling/specification/ProfileAttributeSchemaNameMismatchValidationErrorSpecification");

var DefaultSchemaNameMismatchValidationErrorSpecification = require("../../component/validation/errorHandling/specification/DefaultSchemaNameMismatchValidationErrorSpecification");

var ProfileAttributeBasedSchemaSpecification = require("../../model/specification/ProfileAttributeBasedSchemaSpecification");

var AllErrorsSatisfyAtLeastOneSpecSpecification = require("../../component/validation/errorHandling/specification/AllErrorsSatisfyAtLeastOneSpecSpecification");

var InvalidSecurityFileErrorsOnlySpecification = require("../../component/validation/errorHandling/specification/InvalidSecurityFileErrorsOnlySpecification");

var domainSecurityValidationErrorToErrorConverter = require("../../component/validation/errorHandling/converter/errorConverter/domainSecurityValidationErrorToErrorConverter");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

function createValidationErrorSpecifications(context) {
  context.register('emptyResourcesElementOnDomainSchemaValidationSpecification', validationErrorCodeBasedSpecificationFactory.create(restErrorCodesEnum.DOMAIN_SCHEMA_EMPTY_RESOURCES_ELEMENT));
  context.register('connectionFailedErrorOnDomainSchemaValidationSpecification', validationErrorCodeBasedSpecificationFactory.create(restErrorCodesEnum.CONNECTION_FAILED));
  context.register('domainDataSourceInvalidErrorOnDomainSchemaValidationSpecification', validationErrorCodeBasedSpecificationFactory.create(restErrorCodesEnum.DOMAIN_DATA_SOURCE_INVALID));
  context.register('domainDataSourceTypeNotSupportedErrorValidationSpecification', validationErrorCodeBasedSpecificationFactory.create(restErrorCodesEnum.DOMAIN_DATA_SOURCE_TYPE_NOT_SUPPORTED));
  context.register('domainDataSourceAccessDeniedErrorOnDomainSchemaValidationSpecification', validationErrorCodeBasedSpecificationFactory.create(restErrorCodesEnum.DOMAIN_DATA_SOURCE_ACCESS_DENIED));
  context.register('referenceNotFoundErrorOnDomainSchemaValidationSpecification', validationErrorCodeBasedSpecificationFactory.create(restErrorCodesEnum.REFERENCE_RESOURCE_NOT_FOUND));
  context.register('illegalParameterValueErrorErrorOnDomainSchemaValidationSpecification', validationErrorCodeBasedSpecificationFactory.create(restErrorCodesEnum.ILLEGAL_PARAMETER_VALUE_ERROR));
  context.register('domainSchemaNameMismatchErrorOnDomainSchemaValidationSpecification', validationErrorCodeBasedSpecificationFactory.create(restErrorCodesEnum.DOMAIN_SCHEMA_NAME_MISMATCH));
  context.register('domainSchemaMissingDataBaseTableErrorOnDomainSchemaValidationSpecification', validationErrorCodeBasedSpecificationFactory.create(restErrorCodesEnum.DOMAIN_SCHEMA_MISSING_DATABASE_TABLE));
  context.register('domainSchemaMissingDataBaseColumnErrorOnDomainSchemaValidationSpecification', validationErrorCodeBasedSpecificationFactory.create(restErrorCodesEnum.DOMAIN_SCHEMA_MISSING_DATABASE_COLUMN));
  context.register('domainSchemaResourcesJdbcErrorOnDomainSchemaValidationSpecification', validationErrorCodeBasedSpecificationFactory.create(restErrorCodesEnum.DOMAIN_SCHEMA_RESOURCES_JDBC));
  context.register('domainSchemaResourcesGroupProfileAttributeExceptionValidationErrorForProfileAttributeBasedSchemaSpecification', validationErrorCodeBasedSpecificationFactory.create(restErrorCodesEnum.DOMAIN_SCHEMA_RESOURCES_GROUP_PROFILE_ATTRIBUTE_EXCEPTION));
  context.register('domainSchemaProfileAttributeNotFoundErrorOnDomainSchemaValidationSpecification', validationErrorCodeBasedSpecificationFactory.create(restErrorCodesEnum.DOMAIN_SCHEMA_PROFILE_ATTRIBUTE_NOT_FOUND));
  context.register('dataSourceIsEmptySpecification', validationErrorCodeBasedSpecificationFactory.create(emptyDataSourceEnum.DATA_SOURCE_IS_EMPTY));
  context.register('illegalDataSourceUriValidationSpecification', new IllegalDataSourceUriValidationSpecification({
    illegalParameterValueErrorErrorOnDomainSchemaValidationSpecification: context.get('illegalParameterValueErrorErrorOnDomainSchemaValidationSpecification')
  }));
  context.register('dataSourceInvalidResourceReferenceValidationErrorSpecification', new DataSourceInvalidResourceReferenceValidationErrorSpecification({
    referenceNotFoundErrorOnDomainSchemaValidationSpecification: context.get('referenceNotFoundErrorOnDomainSchemaValidationSpecification')
  }));
  context.register('dataSourceInvalidValidationErrorSpecification', new AtLeastOneErrorSatisfyAtLeastOneSpecSpecification({
    specifications: [context.get('dataSourceIsEmptySpecification'), context.get('connectionFailedErrorOnDomainSchemaValidationSpecification'), context.get('domainDataSourceInvalidErrorOnDomainSchemaValidationSpecification'), context.get('domainDataSourceTypeNotSupportedErrorValidationSpecification'), context.get('domainDataSourceAccessDeniedErrorOnDomainSchemaValidationSpecification'), context.get('dataSourceInvalidResourceReferenceValidationErrorSpecification'), context.get('illegalDataSourceUriValidationSpecification')]
  }));
  context.register('profileAttributeBasedSchemaSpecificationForValidation', new ProfileAttributeBasedSchemaSpecification({
    clientDomainSchemaService: context.get('clientDomainSchemaServiceForDomainSchemaValidationService')
  }));
  context.register('profileAttributeSchemaNameMismatchValidationErrorSpecification', new ProfileAttributeSchemaNameMismatchValidationErrorSpecification({
    domainSchemaNameMismatchErrorOnDomainSchemaValidationSpecification: context.get('domainSchemaNameMismatchErrorOnDomainSchemaValidationSpecification'),
    profileAttributeBasedSchemaSpecification: context.get('profileAttributeBasedSchemaSpecificationForValidation')
  }));
  context.register('dataSourceSchemaNameMismatchValidationErrorSpecification', new DataSourceSchemaNameMismatchValidationErrorSpecification({
    defaultSchemaExistsAndNotEmptySpecification: context.get('validationDefaultSchemaExistsAndNotEmptySpecification'),
    domainSchemaNameMismatchErrorOnDomainSchemaValidationSpecification: context.get('domainSchemaNameMismatchErrorOnDomainSchemaValidationSpecification'),
    profileAttributeBasedSchemaSpecification: context.get('profileAttributeBasedSchemaSpecificationForValidation')
  }));
  context.register('defaultSchemaNameMismatchValidationErrorSpecification', new DefaultSchemaNameMismatchValidationErrorSpecification({
    domainSchemaNameMismatchErrorOnDomainSchemaValidationSpecification: context.get('domainSchemaNameMismatchErrorOnDomainSchemaValidationSpecification')
  }));
  context.register('orphanResourcesValidationErrorSpecification', new AtLeastOneErrorSatisfyAtLeastOneSpecSpecification({
    specifications: [context.get('domainSchemaResourcesGroupProfileAttributeExceptionValidationErrorForProfileAttributeBasedSchemaSpecification'), context.get('profileAttributeSchemaNameMismatchValidationErrorSpecification'), context.get('defaultSchemaNameMismatchValidationErrorSpecification'), context.get('domainSchemaMissingDataBaseTableErrorOnDomainSchemaValidationSpecification'), context.get('domainSchemaMissingDataBaseColumnErrorOnDomainSchemaValidationSpecification'), context.get('domainSchemaResourcesJdbcErrorOnDomainSchemaValidationSpecification')]
  }));
  context.register('allErrorsRecoverableValidationErrorSpecification', new AllErrorsSatisfyAtLeastOneSpecSpecification({
    specs: [context.get('domainSchemaNameMismatchErrorOnDomainSchemaValidationSpecification'), context.get('domainSchemaResourcesJdbcErrorOnDomainSchemaValidationSpecification'), context.get('domainSchemaMissingDataBaseTableErrorOnDomainSchemaValidationSpecification'), context.get('domainSchemaMissingDataBaseColumnErrorOnDomainSchemaValidationSpecification'), context.get('domainSchemaResourcesGroupProfileAttributeExceptionValidationErrorForProfileAttributeBasedSchemaSpecification'), context.get('domainSchemaProfileAttributeNotFoundErrorOnDomainSchemaValidationSpecification')]
  }));
  context.register('emptyResourcesElementValidationErrorSpecification', new AllErrorsSatisfyAtLeastOneSpecSpecification({
    specs: [context.get('emptyResourcesElementOnDomainSchemaValidationSpecification')]
  }));
  context.register('invalidSecurityFileErrorsOnlySpecification', new InvalidSecurityFileErrorsOnlySpecification());
}

function createErrorConverters(context) {
  context.register('firstPropertyConverter', mapErrorConverterFactory.create({
    converter: domainSchemaErrorPropertyToValueConverterFactory.create(0)
  }));
  context.register('illegalParameterValueErrorConverter', mapErrorConverterFactory.create({
    converter: illegalParameterValueErrorConverter
  }));
  context.register('domainSchemaInvalidReferenceErrorToResourcePathConverter', mapErrorConverterFactory.create({
    converter: domainSchemaErrorPropertyToValueConverterFactory.create(errorParametersKeysEnum.INVALID_REFERENCE)
  }));
  context.register('domainSchemaErrorElementNamePropertyToResourceNameConverter', mapErrorConverterFactory.create({
    converter: domainSchemaErrorPropertyToValueConverterFactory.create(errorParametersKeysEnum.ELEMENT_NAME)
  }));
  context.register('domainSchemaElementInvalidValuePropertyToValueConverter', mapErrorConverterFactory.create({
    converter: domainSchemaErrorPropertyToValueConverterFactory.create(errorParametersKeysEnum.INVALID_VALUE)
  }));
  context.register('domainSchemaInvalidExpressionToStringConverter', mapErrorConverterFactory.create({
    converter: domainSchemaErrorPropertyToValueConverterFactory.create(errorParametersKeysEnum.EXPRESSION)
  }));
  context.register('domainSchemaMissingDataBaseTableErrorToResourcePathConverter', mapErrorConverterFactory.create({
    converter: domainSchemaMissingDataBaseTableErrorToResourcePathConverter
  }));
  context.register('domainSchemaMissingDataBaseColumnErrorToResourcePathConverter', mapErrorConverterFactory.create({
    converter: domainSchemaMissingDataBaseColumnErrorToResourcePathConverter
  }));
  context.register('domainSchemaJoinElementEmptyReferenceErrorToResourcePathConverter', mapErrorConverterFactory.create({
    converter: domainSchemaJoinElementEmptyReferenceErrorToResourcePathConverter
  }));
  context.register('domainSchemaErrorResourcePathPropertyToResourcePathConverter', mapErrorConverterFactory.create({
    converter: domainSchemaErrorPropertyToValueConverterFactory.create(errorParametersKeysEnum.RESOURCE_PATH)
  }));
  context.register('domainSchemaPropertyPathToErrorMessageConverter', mapErrorConverterFactory.create({
    converter: domainSchemaErrorPropertyToValueConverterFactory.create(errorParametersKeysEnum.PROPERTY_PATH)
  }));
  context.register('domainSchemaNameMismatchErrorToResourceNameConverter', new DomainSchemaNameMismatchErrorToResourceNameConverter({
    missingSchemasConverter: mapErrorConverterFactory.create({
      converter: domainSchemaErrorPropertyToValueConverterFactory.create(errorParametersKeysEnum.DOMAIN_SCHEMA_NAME)
    })
  }));
  context.register('domainSchemaExpressionInvalidFieldsErrorToErrorMessageConverter', mapErrorConverterFactory.create({
    converter: domainSchemaExpressionInvalidFieldsErrorToErrorMessageConverter
  }));
  context.register('domainSecuritySchemaInvalidErrorToErrorDetailsConverter', mapErrorConverterFactory.create({
    converter: domainSchemaErrorPropertyToValueConverterFactory.create(errorParametersKeysEnum.DETAILS)
  }));
  context.register('domainSchemaInvalidJoinTypeErrorToErrorMessageConverter', mapErrorConverterFactory.create({
    converter: domainSchemaInvalidJoinTypeErrorToErrorMessageConverter
  }));
  context.register('domainSchemaEmptyPresentationElementReferenceErrorToResourcePathConverter', mapErrorConverterFactory.create({
    converter: domainSchemaEmptyPresentationElementReferenceErrorToResourcePathConverter
  }));
  context.register('domainSchemaConstantGroupElementExpressionRequiredErrorToErrorMessageConverter', mapErrorConverterFactory.create({
    converter: domainSchemaConstantGroupElementExpressionRequiredErrorToErrorMessageConverter
  }));
  context.register('domainSchemaJoinExpressionInvalidGroupReferenceErrorToErrorMessageConverter', mapErrorConverterFactory.create({
    converter: domainSchemaJoinExpressionInvalidGroupReferenceErrorToErrorMessageConverter
  }));
  context.register('domainSchemaPresentationContainsNullElementErrorToResourcePathConverter', mapErrorConverterFactory.create({
    converter: domainSchemaPresentationContainsNullElementErrorToResourcePathConverter
  }));
  context.register('domainSecuritySchemaResourceAccessGrantExpressionInvalidFieldsErrorToErrorMessageConverter', mapErrorConverterFactory.create({
    converter: domainSecuritySchemaResourceAccessGrantExpressionInvalidFieldsErrorToErrorMessageConverter
  }));
  context.register('domainSecuritySchemaResourceAccessGrantExpressionParseErrorToErrorMessageConverter', mapErrorConverterFactory.create({
    converter: domainSecuritySchemaResourceAccessGrantExpressionParseErrorToErrorMessageConverter
  }));
  context.register('domainSchemaResourcesJoinSideInvalidErrorToErrorMessageConverter', mapErrorConverterFactory.create({
    converter: domainSchemaResourcesJoinSideInvalidErrorToErrorMessageConverter
  }));
  context.register('domainSchemaResourcesInvalidNumberJoinsErrorToErrorMessageConverter', mapErrorConverterFactory.create({
    converter: domainSchemaErrorPropertyToValueConverterFactory.create(errorParametersKeysEnum.JOIN_TREE_ID)
  }));
  context.register('domainSchemaResourcesJoinReferenceNameInconsistentErrorToErrorMessageConverter', mapErrorConverterFactory.create({
    converter: domainSchemaResourcesJoinReferenceNameInconsistentErrorToErrorMessageConverter
  }));
  context.register('domainSchemaXmlParseErrorToErrorMessageConverter', mapErrorConverterFactory.create({
    converter: domainSchemaXmlParseErrorToErrorMessageConverter
  }));
  context.register('serializationErrorToErrorMessageConverter', mapErrorConverterFactory.create({
    converter: serializationErrorToResourceNameConverter
  }));
  context.register('domainSchemaResourcesGroupProfileAttributeExceptionToErrorMessageConverter', mapErrorConverterFactory.create({
    converter: new DomainSchemaResourcesGroupProfileAttributeExceptionToErrorMessageConverter({
      domainSchemaProfileAttributeNotFoundErrorToErrorMessageConverter: domainSchemaProfileAttributeNotFoundErrorToErrorMessageConverter,
      domainSchemaProfileAttributeInvalidCategoryErrorToErrorMessageConverter: domainSchemaProfileAttributeInvalidCategoryErrorToErrorMessageConverter
    })
  }));
  context.register('domainSchemaProfileAttributeNotFoundErrorToErrorMessageConverter', mapErrorConverterFactory.create({
    converter: domainSchemaProfileAttributeNotFoundErrorToErrorMessageConverter
  }));
  context.register('domainSchemaProfileAttributeInvalidCategoryErrorToErrorMessageConverter', mapErrorConverterFactory.create({
    converter: domainSchemaProfileAttributeInvalidCategoryErrorToErrorMessageConverter
  }));
  context.register('domainBundleFileInvalidErrorToErrorMessageConverter', mapErrorConverterFactory.create({
    converter: domainBundleFileInvalidErrorToErrorMessageConverter
  }));
  context.register('domainSchemaNameMismatchErrorsToAvailableSchemasListConverter', new DomainSchemaNameMismatchErrorsToAvailableSchemasListConverter({
    dataSourceSchemaNameMismatchValidationErrorSpecification: context.get('dataSourceSchemaNameMismatchValidationErrorSpecification')
  }));
  context.register("domainSchemaEncryptedProfileAttributeErrorToErrorMessageConverter", mapErrorConverterFactory.create({
    converter: domainSchemaEncryptedProfileAttributeErrorToErrorMessageConverter
  }));
}

function createDomainSchemaValidationErrorsToOrphanResourcesConverter(context, options) {
  context.register('domainSchemaValidationErrorsToOrphanResourcesConverter', new DomainSchemaValidationErrorsToOrphanResourcesConverter({
    dataSourceInfoService: context.get('dataSourceInfoService'),
    specsAndConverters: [{
      spec: context.get('domainSchemaResourcesGroupProfileAttributeExceptionValidationErrorForProfileAttributeBasedSchemaSpecification'),
      converter: domainSchemaResourcesGroupProfileAttributeExceptionErrorToOrphanResourceConverter
    }, {
      spec: context.get('profileAttributeSchemaNameMismatchValidationErrorSpecification'),
      converter: schemaNameMismatchForProfileAttributeBasedSchemaErrorToOrphanResourceConverter
    }, {
      spec: context.get('defaultSchemaNameMismatchValidationErrorSpecification'),
      converter: schemaNameMismatchForProfileAttributeBasedSchemaErrorToOrphanResourceConverter
    }, {
      spec: context.get('domainSchemaMissingDataBaseTableErrorOnDomainSchemaValidationSpecification'),
      converter: domainSchemaMissingDataBaseTableErrorToOrphanResourceConverter
    }, {
      spec: context.get('domainSchemaMissingDataBaseColumnErrorOnDomainSchemaValidationSpecification'),
      converter: domainSchemaMissingDataBaseColumnErrorToOrphanResourceConverter
    }, {
      spec: context.get('domainSchemaResourcesJdbcErrorOnDomainSchemaValidationSpecification'),
      converter: domainSchemaResourceJdbsErrorToOrphanResourceConverter
    }]
  }));
}

function createUnrecoverableErrorsConverterConfig(context) {
  var unrecoverableErrorsConverterConfig = {};
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.RESOURCE_NOT_FOUND] = new ResourceNotFoundExceptionToErrorMessageConverter({
    genericResourceNotFoundErrorToErrorMessageConverter: new ErrorToCategoryAndDetailsConverter({
      category: i18nMessage('domain.designer.error.resource.not.found.category'),
      errorsConverter: context.get('firstPropertyConverter')
    })
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.ACCESS_DENIED] = new AccessDeniedExceptionToErrorMessageConverter({
    parametersFullErrorToErrorMessageConverter: new ErrorToCategoryAndDetailsConverter({
      category: i18nMessage('domain.designer.error.dialog.validation.access.denied'),
      errorsConverter: context.get('firstPropertyConverter')
    }),
    parametersLessErrorToErrorMessageConverter: new ErrorToCategoryAndDetailsConverter({
      category: {
        label: i18nMessage('domain.designer.error.dialog.validation.access.denied'),
        isBold: false
      }
    })
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.ILLEGAL_PARAMETER_VALUE_ERROR] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.illegal.parameter.value.error.category'),
    errorsConverter: context.get('illegalParameterValueErrorConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_MISSING_DATABASE_TABLE] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.domain.schema.missing.data.base.table.category'),
    errorsConverter: context.get('domainSchemaMissingDataBaseTableErrorToResourcePathConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_MISSING_DATABASE_COLUMN] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.domain.schema.missing.data.base.column.category'),
    errorsConverter: context.get('domainSchemaMissingDataBaseColumnErrorToResourcePathConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_INVALID_PRESENTATION_ELEMENT_REFERENCE] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.invalid.presentation.element.reference.category'),
    errorsConverter: context.get('domainSchemaInvalidReferenceErrorToResourcePathConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_INVALID_DATA_ISLAND_REFERENCE] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.invalid.data.island.reference.category'),
    errorsConverter: context.get('domainSchemaInvalidReferenceErrorToResourcePathConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_INVALID_JOIN_ELEMENT_REFERENCE] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.invalid.join.element.reference.category'),
    errorsConverter: context.get('domainSchemaInvalidReferenceErrorToResourcePathConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_MULTIPLE_DATA_ISLANDS_ARE_REFERENCING_SAME_RESOURCE] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.multiple.data.islands.referencing.same.resource.category'),
    errorsConverter: context.get('domainSchemaErrorElementNamePropertyToResourceNameConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_PRESENTATION_GROUP_CONTAINS_ELEMENTS_FROM_UNJOINED_TABLES] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.presentation.group.contains.elements.from.unjoined.tables.category'),
    errorsConverter: context.get('domainSchemaErrorElementNamePropertyToResourceNameConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_PRESENTATION_ELEMENT_NAME_LENGTH_LIMIT] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.presentation.element.name.length.limit.category', domainDesignerSettings.presentationElementNameLengthLimit),
    errorsConverter: context.get('domainSchemaElementInvalidValuePropertyToValueConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_PRESENTATION_ELEMENT_LABEL_LENGTH_LIMIT] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.presentation.element.label.length.limit.category', domainDesignerSettings.presentationElementLabelLengthLimit),
    errorsConverter: context.get('domainSchemaElementInvalidValuePropertyToValueConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_PRESENTATION_ELEMENT_LABEL_ID_LENGTH_LIMIT] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.presentation.element.labelId.length.limit.category', domainDesignerSettings.presentationElementLabelIdLengthLimit),
    errorsConverter: context.get('domainSchemaElementInvalidValuePropertyToValueConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_PRESENTATION_ELEMENT_DESCRIPTION_LENGTH_LIMIT] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.presentation.element.description.length.limit.category', domainDesignerSettings.presentationElementDescriptionLengthLimit),
    errorsConverter: context.get('domainSchemaElementInvalidValuePropertyToValueConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_PRESENTATION_ELEMENT_DESCRIPTION_ID_LENGTH_LIMIT] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.presentation.element.descriptionId.length.limit.category', domainDesignerSettings.presentationElementDescriptionIdLengthLimit),
    errorsConverter: context.get('domainSchemaElementInvalidValuePropertyToValueConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_INVALID_RESOURCE_TYPE] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.invalid.resource.type.category'),
    errorsConverter: context.get('domainSchemaErrorElementNamePropertyToResourceNameConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_EMPTY_RESOURCES_ELEMENT] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.empty.resources.element.category')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_EMPTY_RESOURCE_GROUP_ELEMENT] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.empty.resources.group.category'),
    errorsConverter: context.get('domainSchemaErrorResourcePathPropertyToResourcePathConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_EMPTY_JOIN_ELEMENT_REFERENCE] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.empty.join.reference.element.reference.category'),
    errorsConverter: context.get('domainSchemaJoinElementEmptyReferenceErrorToResourcePathConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_RESOURCES_JDBC] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.resources.jdbc.category'),
    errorsConverter: context.get('domainSchemaErrorResourcePathPropertyToResourcePathConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_NAME_MISMATCH] = new ErrorToCategoryAndDetailsConverter({
    categoryConverter: domainSchemaNameMismatchErrorToErrorCategoryConverter,
    errorsConverter: context.get('domainSchemaNameMismatchErrorToResourceNameConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_RESOURCES_FILTER_EXPRESSION_INVALID_FIELDS] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.filter.expression.invalid.fields.category'),
    errorsConverter: context.get('domainSchemaExpressionInvalidFieldsErrorToErrorMessageConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_RESOURCES_ELEMENT_EXPRESSION_INVALID_FIELDS] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.calculated.field.expression.invalid.fields.category'),
    errorsConverter: context.get('domainSchemaExpressionInvalidFieldsErrorToErrorMessageConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_DATA_ISLAND_RESOURCE_PATH_EMPTY] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.data.island.resource.path.empty.category'),
    errorsConverter: context.get('domainSchemaErrorElementNamePropertyToResourceNameConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_RESOURCES_JOIN_EXPRESSION_INVALID_FIELDS] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.join.expression.invalid.fields.category'),
    errorsConverter: context.get('domainSchemaExpressionInvalidFieldsErrorToErrorMessageConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_RESOURCES_JOIN_EXPRESSION_INVALID_GROUP_REFERENCE] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.join.expression.invalid.group.reference.category'),
    errorsConverter: context.get('domainSchemaJoinExpressionInvalidGroupReferenceErrorToErrorMessageConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_RESOURCES_GROUP_PROFILE_ATTRIBUTE_EXCEPTION] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.resources.group.profile.attribute.exception.category'),
    errorsConverter: context.get('domainSchemaResourcesGroupProfileAttributeExceptionToErrorMessageConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_QUERY_PROFILE_ATTRIBUTE_EXCEPTION] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.resources.group.profile.attribute.exception.category'),
    errorsConverter: context.get('domainSchemaResourcesGroupProfileAttributeExceptionToErrorMessageConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_PROFILE_ATTRIBUTE_NOT_FOUND] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.resources.group.profile.attribute.not.found.category'),
    errorsConverter: context.get('domainSchemaProfileAttributeNotFoundErrorToErrorMessageConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_PROFILE_ATTRIBUTE_INVALID_CATEGORY] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.resources.group.profile.attribute.invalid.category.exception.category'),
    errorsConverter: context.get('domainSchemaProfileAttributeInvalidCategoryErrorToErrorMessageConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_RESOURCES_JOIN_TYPE] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.invalid.join.type.category'),
    errorsConverter: context.get('domainSchemaInvalidJoinTypeErrorToErrorMessageConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_NON_UNIQUE_RESOURCE_NAME] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.non.unique.resource.name.category'),
    errorsConverter: context.get('domainSchemaErrorElementNamePropertyToResourceNameConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_NON_UNIQUE_PRESENTATION_ELEMENT_NAME] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.non.unique.presentation.element.name.category'),
    errorsConverter: context.get('domainSchemaErrorElementNamePropertyToResourceNameConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_EMPTY_PRESENTATION_ELEMENT_REFERENCE] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.presentation.element.empty.resource.path.category'),
    errorsConverter: context.get('domainSchemaEmptyPresentationElementReferenceErrorToResourcePathConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_JOIN_EXPRESSION_PARSING_ERROR] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.join.expression.parsing.error.category'),
    errorsConverter: context.get('domainSchemaInvalidExpressionToStringConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_CALCULATED_FIELD_EXPRESSION_PARSING_ERROR] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.calculated.field.expression.parsing.error.category'),
    errorsConverter: context.get('domainSchemaInvalidExpressionToStringConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_CONSTANT_GROUP_ELEMENT_EXPRESSION_REQUIRED] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.constant.group.element.expression.required.error.category'),
    errorsConverter: context.get('domainSchemaConstantGroupElementExpressionRequiredErrorToErrorMessageConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_FILTER_EXPRESSION_PARSING_ERROR] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.filter.expression.parsing.error.category'),
    errorsConverter: context.get('domainSchemaInvalidExpressionToStringConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_NULL_RESOURCE_GROUP] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.resources.contain.null.element.error.category'),
    errorsConverter: context.get('domainSchemaErrorResourcePathPropertyToResourcePathConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_PRESENTATION_CONTAINS_NULL_ELEMENT] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.presentation.contains.null.element.error.category'),
    errorsConverter: context.get('domainSchemaPresentationContainsNullElementErrorToResourcePathConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_RESOURCES_JOIN_LEFT_INVALID] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.resources.join.left.invalid.category'),
    errorsConverter: context.get('domainSchemaResourcesJoinSideInvalidErrorToErrorMessageConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_RESOURCES_JOIN_RIGHT_INVALID] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.resources.join.right.invalid.category'),
    errorsConverter: context.get('domainSchemaResourcesJoinSideInvalidErrorToErrorMessageConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_RESOURCES_INVALID_NUMBER_JOINS] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.invalid.number.joins.category'),
    errorsConverter: context.get('domainSchemaResourcesInvalidNumberJoinsErrorToErrorMessageConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_RESOURCES_JOIN_REFERENCE_NAME_INCONSISTENT] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.resources.join.reference.name.inconsistent.category'),
    errorsConverter: context.get('domainSchemaResourcesJoinReferenceNameInconsistentErrorToErrorMessageConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_BUNDLE_FILE_INVALID] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.domain.bundle.file.invalid.error.category'),
    errorsConverter: context.get('domainBundleFileInvalidErrorToErrorMessageConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_XML_PARSE] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.parse.error.file.invalid'),
    errorsConverter: context.get('domainSchemaXmlParseErrorToErrorMessageConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.REFERENCE_RESOURCE_NOT_FOUND] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.referenced.resource'),
    errorsConverter: domainInitialStateOpenDomainErrorToErrorMessageConverter //TODO: replace with generic converter

  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.MANDATORY_PARAMETER_ERROR] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.is.incomplete.category'),
    errorsConverter: context.get('domainSchemaPropertyPathToErrorMessageConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.SERIALIZATION_ERROR] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.error.dialog.schema.parse.error.file.invalid'),
    errorsConverter: context.get('serializationErrorToErrorMessageConverter')
  });
  unrecoverableErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SCHEMA_ELEMENT_NAME_UNSUPPORTED_CHARACTER] = new ErrorToCategoryAndDetailsConverter({
    categoryConverter: domainSchemaElementNameUnsupportedCharacterErrorToErrorCategoryConverter,
    errorsConverter: context.get('domainSchemaErrorElementNamePropertyToResourceNameConverter')
  });
  unrecoverableErrorsConverterConfig[encryptedProfileAttributeErrorEnum.ENCRYPTED_PROFILE_ATTRIBUTE_ERROR] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage("domain.designer.error.dialog.schema.resources.group.profile.attribute.exception.category"),
    errorsConverter: context.get("domainSchemaEncryptedProfileAttributeErrorToErrorMessageConverter")
  });
  context.register('unrecoverableErrorsConverterConfig', unrecoverableErrorsConverterConfig);
}

function createUnrecoverableErrorsConverter(context, options) {
  context.register('unrecoverableErrorsConverter', new CompositeValidationErrorConverter({
    categoryAndErrorsConverterConfig: context.get('unrecoverableErrorsConverterConfig'),
    unknownErrorConverter: genericUnknownErrorConverter
  }));
  context.register('unrecoverableErrorsConverterForSaveDomain', new CompositeValidationErrorConverter({
    categoryAndErrorsConverterConfig: context.get('unrecoverableErrorsConverterConfig'),
    unknownErrorConverter: saveDomainUnknownErrorConverter
  }));
  context.register('unrecoverableErrorsConverterForDownloadSchema', new CompositeValidationErrorConverter({
    categoryAndErrorsConverterConfig: {},
    unknownErrorConverter: new ErrorToCategoryAndDetailsConverter({
      errors: [i18nMessage('domain.designer.download.schema.error.dialog.header')]
    })
  }));
}

function createDataSourceErrorsConverter(context) {
  var dataSourceErrorsConverter = {};
  dataSourceErrorsConverter[restErrorCodesEnum.CONNECTION_FAILED] = new ErrorToCategoryAndDetailsConverter({
    errors: [i18nMessage('domain.designer.error.dialog.datasource.connection.failed')]
  });
  dataSourceErrorsConverter[restErrorCodesEnum.DOMAIN_DATA_SOURCE_ACCESS_DENIED] = new ErrorToCategoryAndDetailsConverter({
    errors: [i18nMessage('domain.designer.error.dialog.validation.datasource.access.denied')]
  });
  dataSourceErrorsConverter[restErrorCodesEnum.DOMAIN_DATA_SOURCE_INVALID] = new ErrorToCategoryAndDetailsConverter({
    errors: [i18nMessage('domain.designer.error.dialog.datasource.invalid')]
  });
  dataSourceErrorsConverter[restErrorCodesEnum.DOMAIN_DATA_SOURCE_TYPE_NOT_SUPPORTED] = new ErrorToCategoryAndDetailsConverter({
    errors: [i18nMessage('domain.designer.error.dialog.datasource.type.not.supported')]
  });
  dataSourceErrorsConverter[emptyDataSourceEnum.DATA_SOURCE_IS_EMPTY] = new ErrorToCategoryAndDetailsConverter({
    errors: [i18nMessage('domain.designer.error.dialog.validation.datasource.is.empty')]
  });
  context.register('dataSourceErrorsConverter', new CompositeValidationErrorConverter({
    categoryAndErrorsConverterConfig: dataSourceErrorsConverter,
    unknownErrorConverter: context.get('unrecoverableErrorsConverter')
  }));
}

function createSecurityFileErrorsConverter(context) {
  var securityErrorsConverterConfig = {};
  securityErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SECURITY_SCHEMA_INVALID] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.warning.dialog.security.file.invalid.error.category'),
    errorsConverter: context.get('domainSecuritySchemaInvalidErrorToErrorDetailsConverter')
  });
  securityErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SECURITY_MISSING_ELEMENT] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.warning.dialog.security.file.missing.element.error.category'),
    errorsConverter: domainSecurityMissingElementErrorToErrorListConverter
  });
  securityErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SECURITY_SCHEMA_RESOURCE_ACCESS_GRANT_EXPRESSION_INVALID_FIELDS] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.warning.dialog.security.file.invalid.fields.error.category'),
    errorsConverter: context.get('domainSecuritySchemaResourceAccessGrantExpressionInvalidFieldsErrorToErrorMessageConverter')
  });
  securityErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SECURITY_SCHEMA_RESOURCE_ACCESS_GRANT_EXPRESSION_PARSE_ERROR] = new ErrorToCategoryAndDetailsConverter({
    category: i18nMessage('domain.designer.warning.dialog.security.file.expression.parsing.error.category'),
    errorsConverter: context.get('domainSecuritySchemaResourceAccessGrantExpressionParseErrorToErrorMessageConverter')
  });
  securityErrorsConverterConfig[restErrorCodesEnum.DOMAIN_SECURITY_SCHEMA_CLIENT_VALIDATION_ERROR] = new ErrorToCategoryAndDetailsConverter({
    category: '',
    errorsConverter: domainSecurityValidationErrorToErrorConverter
  });
  context.register('securityFileErrorsConverter', new CompositeValidationErrorConverter({
    categoryAndErrorsConverterConfig: securityErrorsConverterConfig,
    unknownErrorConverter: genericUnknownErrorConverter
  }));
}

function createDataSourceChooserPopoverErrorMessageConverter(context, options) {
  var dataSourceChooserPopoverErrorMessageConverterConfig = {};
  dataSourceChooserPopoverErrorMessageConverterConfig[restErrorCodesEnum.ACCESS_DENIED] = new ErrorToCategoryAndDetailsConverter({
    errors: [i18nMessage('domain.designer.error.dialog.validation.datasource.access.denied')]
  });
  dataSourceChooserPopoverErrorMessageConverterConfig[restErrorCodesEnum.RESOURCE_NOT_FOUND] = new ErrorToCategoryAndDetailsConverter({
    errors: [i18nMessage('domain.designer.resource.chooser.not.found.resource')]
  });
  context.register('dataSourceChooserPopoverErrorMessageConverter', new CompositeValidationErrorConverter({
    categoryAndErrorsConverterConfig: dataSourceChooserPopoverErrorMessageConverterConfig,
    unknownErrorConverter: context.get('dataSourceErrorsConverter')
  }));
}

function createErrorFilters(context, options) {
  context.register('dropRecoverableErrorsFilter', new DropRecoverableErrorsFilter({
    specsForRecoverableErrors: [context.get('dataSourceInvalidValidationErrorSpecification'), context.get('dataSourceSchemaNameMismatchValidationErrorSpecification'), context.get('orphanResourcesValidationErrorSpecification'), context.get('invalidSecurityFileErrorsOnlySpecification'), context.get('allErrorsRecoverableValidationErrorSpecification')]
  }));
  context.register('dropRecoverableErrorsFilterForSchemaUpload', new DropRecoverableErrorsFilter({
    specsForRecoverableErrors: [context.get('dataSourceInvalidValidationErrorSpecification')]
  }));
  context.register('dropRecoverableErrorsFilterForSchemaDownload', new DropRecoverableErrorsFilter({
    specsForRecoverableErrors: []
  }));
}

function createErrorSorters(context, options) {
  context.register('dataSourceInvalidErrorsSorter', new SortErrorsBySpecifications({
    specifications: [context.get('dataSourceInvalidValidationErrorSpecification')]
  }));
}

module.exports = function (context, options) {
  createValidationErrorSpecifications(context);
  createErrorConverters(context);
  createDomainSchemaValidationErrorsToOrphanResourcesConverter(context);
  createUnrecoverableErrorsConverterConfig(context, options);
  createUnrecoverableErrorsConverter(context, options);
  createDataSourceErrorsConverter(context, options);
  createSecurityFileErrorsConverter(context, options);
  createDataSourceChooserPopoverErrorMessageConverter(context, options);
  createErrorFilters(context, options);
  createErrorSorters(context, options);
};

});