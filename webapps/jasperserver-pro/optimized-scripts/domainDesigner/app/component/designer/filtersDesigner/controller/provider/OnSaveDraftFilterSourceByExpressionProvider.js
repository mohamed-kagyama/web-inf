/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../util/filterTypeUtil","../../../../../../model/schema/util/entityUtil","../../../../../../model/schema/enum/schemaEntitiesEnum"],function(e,i,r){function o(e,i){return l.isJoinTree(e.sourceType)||l.isJoinTree(i.sourceType)}function t(e,i){return l.isJoinAlias(e.sourceType)&&l.isJoinAlias(i.sourceType)}function c(e,i){return t(e,i)&&e.sourceId!==i.sourceId}function n(e,i){return t(e,i)&&e.sourceId!==i.sourceId}var u=e("underscore"),s=e("../../util/filterTypeUtil"),l=e("../../../../../../model/schema/util/entityUtil"),d=e("../../../../../../model/schema/enum/schemaEntitiesEnum"),a=function(e){this.initialize(e)};u.extend(a.prototype,{initialize:function(e){this.clientDomainSchemaService=e.clientDomainSchemaService},getSource:function(e){var i=e.left,r=e.right;return s.isFieldToFieldFilter(i.type,r.type)?this._getFieldToFieldFilterSource(i,r):this._getFieldToValueFilterSource(i)},_getFieldToFieldFilterSource:function(e,i){var r,t={sourceType:d.JOIN_TREE};return o(e,i)?(r=l.isJoinTree(e.sourceType)?e:i,t.sourceId=r.sourceId):c(e,i)?t.sourceId=this.clientDomainSchemaService.getJoinTreeIdByJoinAliasId(e.sourceId):n(e,i)?t.sourceId=this.clientDomainSchemaService.getTableReferenceIdByJoinAliasId(e.sourceId):(r=l.isConstantGroup(e.sourceType)?i:e,t=this._getFieldToValueFilterSource(r)),t},_getFieldToValueFilterSource:function(e){var i={sourceType:d.TABLE_REFERENCE};return l.isJoinTree(e.sourceType)?(i.sourceId=e.sourceId,i.sourceType=d.JOIN_TREE):l.isJoinAlias(e.sourceType)?i.sourceId=this.clientDomainSchemaService.getTableReferenceIdByJoinAliasId(e.sourceId):l.isTableReference(e.sourceType)&&(i.sourceId=e.sourceId),i}}),r.exports=a});