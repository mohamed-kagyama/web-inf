/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,n,r){var t=e("underscore");r.exports={convert:function(e){var n=e.parentId,r=e.presentationItemsGroupedByEntity;return t.reduce(r,function(e,r){return t.each(r.presentationItems,function(r){var o=t.extend({},r,{parentId:n});e.push(o)}),e},[])}}});