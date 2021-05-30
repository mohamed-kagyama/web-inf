/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./enum/entityTypeToDependentEntityTypesMap","./enum/entitiesToOmitByTargetEntityTypeEnum"],function(e,t,n){function i(){r.bindAll(this,"reduce")}var r=e("underscore"),o=e("./enum/entityTypeToDependentEntityTypesMap"),u=e("./enum/entitiesToOmitByTargetEntityTypeEnum");r.extend(i.prototype,{reduce:function(e,t){return this._getCollectionsWithoutTargetEntitiesAndTheirChildren(e,t)},_getCollectionsWithoutTargetEntitiesAndTheirChildren:function(e,t){var n={},i=t.targetEntityType,y=t.targetEntitiesIds;return i?(n=r.pick(e,o[i]),n[i]&&(n[i]=r.filter(e[i],function(e){return!y[e.id]})),n=r.omit(n,u[i])):n=e,n}}),n.exports=i});