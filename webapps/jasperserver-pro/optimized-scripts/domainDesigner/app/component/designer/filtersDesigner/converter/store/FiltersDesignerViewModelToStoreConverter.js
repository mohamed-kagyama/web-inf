/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../common/util/virtualDataUtil"],function(t,e,i){var o=t("underscore"),s=t("../../../../../common/util/virtualDataUtil"),r=function(t){this.filtersDesignerViewStateModelService=t.filtersDesignerViewStateModelService};o.extend(r.prototype,{convert:function(t){var e=this.filtersDesignerViewStateModelService.getDraftFilterState(),i=t.store,r=i.get("wasScrolledToBottom")||!1,l=o.isNumber(t.scrollPos)?t.scrollPos:i.get("scrollPos"),a=t.canvasHeight?t.canvasHeight:i.get("canvasHeight"),n=t.collection,c=Boolean(e&&!o.isEmpty(e));c||(r=!1);var g=c&&!e.id&&!r,v=s.getTotalHeight(n);g&&(l=Math.ceil(v-a),r=!0);var h=s.getVisibleDataOptions({collection:n,totalHeight:v,scrollPos:l,canvasHeight:a});return{filters:this._getVisibleFilters({filters:n,visibleDataOptions:h}),top:h.top,height:h.height,scrollPos:l,canvasHeight:a,wasScrolledToBottom:r,isDraftFilterPresent:c}},_getVisibleFilters:function(t){var e=t.filters,i=t.visibleDataOptions;return e.slice(i.startPosition,i.endPosition)}}),i.exports=r});