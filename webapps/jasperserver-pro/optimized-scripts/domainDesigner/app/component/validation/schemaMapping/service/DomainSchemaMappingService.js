/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","underscore"],function(e,i,n){var a=(e("jquery"),e("underscore")),r=function(e){this.initialize(e)};a.extend(r.prototype,{initialize:function(e){this.clientDomainValidationService=e.clientDomainValidationService,this.domainSchemaService=e.domainSchemaService},replaceSchemas:function(e,i){return this.domainSchemaService.reset(e),this.domainSchemaService.mapSchemas(i),this.clientDomainValidationService.serializeToServerSchema()}}),n.exports=r});