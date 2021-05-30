/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,i){var n=e("underscore"),s=function(e){this.initialize(e)};n.extend(s.prototype,{initialize:function(e){this.presentationCanvasDroppableItemsService=e.presentationCanvasDroppableItemsService},isSatisfiedBy:function(e,t){var i=t,n=i.accepts,s=this.presentationCanvasDroppableItemsService.isDropZoneAcceptsDataIslands(n),a=this.presentationCanvasDroppableItemsService.isMiddleDropZone(i),r=this.presentationCanvasDroppableItemsService.areResourcesReferencedByDataIsland(e);return s&&!r&&!a}}),i.exports=s});