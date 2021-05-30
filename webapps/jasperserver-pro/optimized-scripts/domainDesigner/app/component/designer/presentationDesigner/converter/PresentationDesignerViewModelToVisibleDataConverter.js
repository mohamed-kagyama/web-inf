/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../common/util/virtualDataUtil"],function(t,o,e){var i=t("underscore"),s=t("../../../../common/util/virtualDataUtil"),l=function(){};i.extend(l.prototype,{convert:function(t){var o=t.store,e=i.isNumber(t.scrollPos)?t.scrollPos:o.get("scrollPos"),l=t.canvasHeight?t.canvasHeight:o.get("canvasHeight"),n=t.collection,c=s.getVisibleDataOptions({collection:n,scrollPos:e,canvasHeight:l}),r=this._getModels({collection:n,visibleDataOptions:c});return{top:c.top,models:r,height:c.height,scrollPos:e,canvasHeight:l}},_getModels:function(t){var o=t.collection,e=t.visibleDataOptions;return o.slice(e.startPosition,e.endPosition)}}),e.exports=l});