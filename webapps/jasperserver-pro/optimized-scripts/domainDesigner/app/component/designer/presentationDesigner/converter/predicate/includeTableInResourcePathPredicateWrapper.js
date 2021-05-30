/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../model/schema/util/entityUtil"],function(e,t,r){var n=e("underscore"),s=e("../../../../../../model/schema/util/entityUtil");r.exports=function(e){return function(t){var r,i=n.clone(t.resourceIdsInItemsPaths);return(t.table||s.isTable(t.resource))&&(r=t.table?t.table.id:t.resource.id,i[r]=!0,t=n.extend({},t,{nestingLevel:t.nestingLevel+1},{resourceIdsInItemsPaths:i})),e(t)}}});