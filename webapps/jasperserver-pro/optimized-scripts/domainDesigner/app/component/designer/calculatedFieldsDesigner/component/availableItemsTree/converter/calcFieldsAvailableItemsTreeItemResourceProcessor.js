/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,n,r){function d(e){return t.extend({resource:t.omit(e,["id","name","elements","levelNesting","expanded"])},{id:e.id,type:e.type,expanded:e.expanded,resourceId:e.resourceId,name:e.name,elements:e.elements,levelNesting:e.levelNesting})}var t=e("underscore");r.exports=d});