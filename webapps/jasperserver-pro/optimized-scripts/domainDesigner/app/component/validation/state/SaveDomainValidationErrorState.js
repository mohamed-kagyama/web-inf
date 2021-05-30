/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../rest/errorHandling/errorHandlingUtil","./enum/validationStateNameEnum"],function(i,r,e){var a=i("underscore"),t=i("../../../rest/errorHandling/errorHandlingUtil"),n=i("./enum/validationStateNameEnum"),o=function(i){this.initialize(i)};a.extend(o.prototype,{initialize:function(i){this.dataSourceInvalidValidationErrorSpecification=i.dataSourceInvalidValidationErrorSpecification,this.dataSourceSchemaNameMismatchValidationErrorSpecification=i.dataSourceSchemaNameMismatchValidationErrorSpecification,this.orphanResourcesValidationErrorSpecification=i.orphanResourcesValidationErrorSpecification,this.invalidSecurityFileErrorsOnlySpecification=i.invalidSecurityFileErrorsOnlySpecification},enter:function(i,r){var e=t.getErrors(i.xhr);i.errors=e;var a=this.dataSourceInvalidValidationErrorSpecification.isSatisfiedBy(e),o=this.dataSourceSchemaNameMismatchValidationErrorSpecification.isSatisfiedBy(e),c=this.orphanResourcesValidationErrorSpecification.isSatisfiedBy(e);this.invalidSecurityFileErrorsOnlySpecification.isSatisfiedBy(e)?r.enter(n.SAVE_DOMAIN_SECURITY_FILE_ERROR_STATE,i):a?r.enter(n.DATA_SOURCE_ERROR_STATE,i):o?r.enter(n.VALIDATION_ERROR_MAP_SCHEMAS_STATE,i):c?r.enter(n.VALIDATION_ERROR_REMOVE_ORPHAN_RESOURCES_STATE,i):r.enter(n.UNRECOVERABLE_ERROR_STATE,i)}}),e.exports=o});