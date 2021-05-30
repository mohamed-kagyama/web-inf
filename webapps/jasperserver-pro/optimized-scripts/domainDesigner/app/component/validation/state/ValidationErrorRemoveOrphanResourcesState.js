/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./enum/validationStateNameEnum"],function(e,r,n){var o=e("underscore"),i=e("./enum/validationStateNameEnum"),t=function(e){this.initialize(e)};o.extend(t.prototype,{initialize:function(e){this.domainSchemaValidationErrorsToOrphanResourcesConverter=e.domainSchemaValidationErrorsToOrphanResourcesConverter},enter:function(e,r){this.domainSchemaValidationErrorsToOrphanResourcesConverter.convert(e.errors,{dataSourceUri:e.dataSourceUri}).then(function(n){e.orphanResources=n,r.enter(i.REMOVE_ORPHAN_RESOURCES_STATE,e)})}}),n.exports=t});