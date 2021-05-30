/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,i,t){var r=e("underscore"),n=["permissionMask","updateDate","creationDate"],c=function(e){this.initialize(e)};r.extend(c.prototype,{initialize:function(e){this.clientDomainSchemaService=e.clientDomainSchemaService,this.clientResourcePropertiesService=e.clientResourcePropertiesService},serialize:function(){var e=r.omit(this.clientResourcePropertiesService.serialize(),n),i=this.clientDomainSchemaService.serializeWithDataAdapter();return r.extend(e,i)}}),t.exports=c});