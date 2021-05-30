/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,s){var n=e("underscore"),i=function(e){this.initialize(e)};n.extend(i.prototype,{initialize:function(e){this.presentationCanvasDroppableItemsService=e.presentationCanvasDroppableItemsService},isSatisfiedBy:function(e,t){var s=t,n=s.accepts,i=this.presentationCanvasDroppableItemsService.isDropZoneAcceptsSetsAndFields(n),r=this.presentationCanvasDroppableItemsService.areResourcesReferencedByDataIsland(e),a=this.presentationCanvasDroppableItemsService.isItemsFromTheSameSourceAsDropZoneDataIsland(e,s);return i&&r&&a}}),s.exports=i});