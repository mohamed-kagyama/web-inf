/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../model/schema/util/entityUtil"],function(e,i,r){var t=e("underscore"),n=e("../../../../../model/schema/util/entityUtil"),o=function(e){};t.extend(o.prototype,{isSatisfiedBy:function(e){var i=e.resource,r=e.joinTreePlaceholder,t=i.index,o=t+1,d=r.index;return i.isDraftJoinTree?d!==t:!!n.isJoinTree(i.type)&&(d!==t&&o!==d)}}),r.exports=o});