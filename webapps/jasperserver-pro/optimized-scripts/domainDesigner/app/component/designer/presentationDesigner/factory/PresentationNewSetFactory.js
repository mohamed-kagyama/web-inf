/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../util/predicate/invert","../../../../../model/schema/enum/schemaEntitiesEnum"],function(e,t,i){var n=e("underscore"),r=e("../../../../../util/predicate/invert"),a=e("../../../../../model/schema/enum/schemaEntitiesEnum"),s=function(e){this.initialize(e)};n.extend(s.prototype,{initialize:function(e){n.bindAll(this,"_presentationSetWithGivenNameAlreadyExists"),this.sequenceGenerator=e.sequenceGenerator,this.domainSchemaSpecification=e.domainSchemaSpecification,this.resourceIdentifierGenerator=e.resourceIdentifierGenerator},_presentationSetWithGivenNameAlreadyExists:function(e){return r(this.domainSchemaSpecification.canUsePresentationItemName)({name:e})},create:function(e){this.sequenceGenerator.reset();var t=e.parentId,i=this.resourceIdentifierGenerator.generate(null,this._presentationSetWithGivenNameAlreadyExists);return{name:i,label:i,parentId:t,entityType:a.PRESENTATION_SET}}}),i.exports=s});