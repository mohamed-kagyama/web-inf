/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,i,t){var n=e("underscore"),s=function(e){this.initialize(e)};n.extend(s.prototype,{initialize:function(e){this.presentationCanvasDroppableItemsService=e.presentationCanvasDroppableItemsService},isSatisfiedBy:function(e,i){var t=i,n=t.accepts,s=this.presentationCanvasDroppableItemsService.isDropZoneAcceptsDataIslands(n),r=this.presentationCanvasDroppableItemsService.isMiddleDropZone(t),a=this.presentationCanvasDroppableItemsService.isItemsBeingDroppedFromCanvas(e);return s&&a&&!r}}),t.exports=s});