/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./enum/childrenPropertyEnum"],function(e,t,n){var r=e("underscore"),i=e("./enum/childrenPropertyEnum"),o=function(e){this.initialize(e)};r.extend(o.prototype,{initialize:function(e){e=e||{},this.clientDomainSchemaService=e.clientDomainSchemaService,this.presentationItemDTONameGenerator=e.presentationItemDTONameGenerator,this.constantGroupConverter=e.constantGroupConverter},convert:function(e){var t=this.clientDomainSchemaService.getDataStore();return this.presentationItemDTONameGenerator.reset(),this.constantGroupConverter.convert(r.extend({schema:t,childrenProperty:i.CHILDREN_PROPERTY},e))}}),n.exports=o});