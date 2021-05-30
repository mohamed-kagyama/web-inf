/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,i,t){var n=e("underscore"),r=function(e){this.initialize(e)};n.extend(r.prototype,{initialize:function(e){this.presentationCanvasDroppableItemsService=e.presentationCanvasDroppableItemsService},isSatisfiedBy:function(e,i){var t=i,r=t.accepts;return!n.isEmpty(e)&&this.presentationCanvasDroppableItemsService.isResourcesAreAcceptedByDropZone(e,r)}}),t.exports=r});