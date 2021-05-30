/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,a,t){var i=e("underscore"),n=function(e){this.initialize(e)};i.extend(n.prototype,{initialize:function(e){this.clientDomainSchemaService=e.clientDomainSchemaService,this.presentationCanvasDroppableItemsService=e.presentationCanvasDroppableItemsService},isSatisfiedBy:function(e,a){var t=a.dataIslandId,i=a.accepts,n=this.clientDomainSchemaService.isConstantDataIslandAlreadyExists(),s=this.presentationCanvasDroppableItemsService.isDropZoneAcceptsDataIslands(i),r=Boolean(t&&this.presentationCanvasDroppableItemsService.isItemsHaveTheSameSourceAsDataIsland(e,t)),o=this.presentationCanvasDroppableItemsService.isItemsHaveTheSameSource(e),c=Boolean(t&&this.clientDomainSchemaService.isConstantDataIsland(t));return s?!n&&o:r||!c}}),t.exports=n});