/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../enum/addPresentationItemsToCanvasEventEnum"],function(e,t,n){var s=e("underscore"),i=e("../enum/addPresentationItemsToCanvasEventEnum"),r=function(e){this.initialize(e)};s.extend(r.prototype,{initialize:function(e){s.bindAll(this,"execute"),this.applicationDispatcherEventBus=e.applicationDispatcherEventBus,this.presentationCanvasDroppableItemsService=e.presentationCanvasDroppableItemsService,this.presentationSidebarJoinTreeResourcesToPresentationItemsGroupedByJoinTreeConverter=e.presentationSidebarJoinTreeResourcesToPresentationItemsGroupedByJoinTreeConverter,this.presentationItemsGroupedByEntityToPresentationItemsWithParentIdConverter=e.presentationItemsGroupedByEntityToPresentationItemsWithParentIdConverter},execute:function(e){var t=e.items,n=e.position,s=e.parentId,r=this.presentationCanvasDroppableItemsService.getItemsNestingLevel(t),o=this.presentationCanvasDroppableItemsService.getItemsDataIslandSourceId(t),a=this.presentationCanvasDroppableItemsService.getResourceIdsInItemsPaths(t),p=this.presentationSidebarJoinTreeResourcesToPresentationItemsGroupedByJoinTreeConverter.convert({nestingLevel:r,joinTreeIds:o,resourceIdsInItemsPaths:a}),I=this.presentationItemsGroupedByEntityToPresentationItemsWithParentIdConverter.convert({parentId:s,presentationItemsGroupedByEntity:p});this.applicationDispatcherEventBus.trigger(i.ADD_PRESENTATION_ITEMS,{selection:{parentId:s,positionOffset:n,itemsQuantity:t.length},presentationItems:I,position:n})}}),n.exports=r});