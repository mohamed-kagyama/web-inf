/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./enum/validationStateNameEnum","../../../rest/enum/requestCanceledEnum","../../../rest/errorHandling/errorHandlingUtil"],function(e,i,r){var t=e("underscore"),a=e("./enum/validationStateNameEnum"),n=e("../../../rest/enum/requestCanceledEnum"),o=e("../../../rest/errorHandling/errorHandlingUtil"),c=function(e){this.initialize(e)};t.extend(c.prototype,{initialize:function(e){this.dataSourceInvalidValidationErrorSpecification=e.dataSourceInvalidValidationErrorSpecification,this.dataSourceSchemaNameMismatchValidationErrorSpecification=e.dataSourceSchemaNameMismatchValidationErrorSpecification,this.encryptedProfileAttributeErrorSpecification=e.encryptedProfileAttributeErrorSpecification},enter:function(e,i){var r,t=e.xhr;if(t===n.CANCELED)i.enter(a.GOTO_PREVIOUS_LOCATION_STATE,e);else{r=o.getErrors(t),e.errors=r;var c=this.dataSourceInvalidValidationErrorSpecification.isSatisfiedBy(r),E=this.dataSourceSchemaNameMismatchValidationErrorSpecification.isSatisfiedBy(r),d=this.encryptedProfileAttributeErrorSpecification.isSatisfiedBy(r);c?i.enter(a.DATA_SOURCE_ERROR_STATE,e):E?i.enter(a.VALIDATION_ERROR_MAP_SCHEMAS_STATE,e):d?(e.isAnyEncryptedProfileAttributes=d,i.enter(a.UNRECOVERABLE_ERROR_STATE,e)):i.enter(a.VALIDATION_ERROR_REMOVE_ORPHAN_RESOURCES_STATE,e)}}}),r.exports=c});