/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../common/util/byIdReducer"],function(e,i,c){var t=e("underscore"),n=e("../../../../common/util/byIdReducer"),r=function(e){this.initialize(e)};t.extend(r.prototype,{initialize:function(e){this.clientDomainSchemaCalcFieldsService=e.clientDomainSchemaCalcFieldsService,this.converter=e.converter},convert:function(e){var i=e.schema,c=this.clientDomainSchemaCalcFieldsService.getCalcFieldsUsedInOtherCalcFields(),r=i.tables.reduce(n,{});return this.converter.convert(t.extend({},e,{calcFieldsUsedInOtherCalcFields:c,tableReferenceToTableMap:i.tableReferences.reduce(function(e,i){return e[i.id]=r[i.tableId],e},{})}))}}),c.exports=r});