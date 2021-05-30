/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./enum/validationStateNameEnum"],function(e,a,i){var t=e("underscore"),r=e("./enum/validationStateNameEnum"),n=function(e){this.initialize(e)};t.extend(n.prototype,{initialize:function(e){this.domainSchemaNameMismatchErrorsToAvailableSchemasListConverter=e.domainSchemaNameMismatchErrorsToAvailableSchemasListConverter},enter:function(e,a){e.availableSchemasToMap=this.domainSchemaNameMismatchErrorsToAvailableSchemasListConverter.convert(e.errors),a.enter(r.TRY_TO_MAP_SCHEMAS_AFTER_VALIDATION_ERROR_STATE,e)}}),i.exports=n});