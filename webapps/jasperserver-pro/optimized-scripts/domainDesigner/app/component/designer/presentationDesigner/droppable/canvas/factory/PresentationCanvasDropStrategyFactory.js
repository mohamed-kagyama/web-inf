/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(t,e,n){function a(t,e){return{execute:r.partial(t.execute,e)}}function s(t){return r.map(t,function(t){return t.id})}var r=t("underscore"),i=function(t){this.initialize(t)};r.extend(i.prototype,{initialize:function(t){this.presentationCanvasDropDataIslandsStrategy=t.presentationCanvasDropDataIslandsStrategy,this.presentationCanvasDropPresentationItemsStrategy=t.presentationCanvasDropPresentationItemsStrategy},create:function(t){var e=s(t.items);if(t.isAcceptsDataIslands){if(t.isDataIslandsBeingDropped)return a(this.presentationCanvasDropDataIslandsStrategy,{dataIslandsIds:e,position:t.position})}else if(t.isAcceptsSetsOrFields)return t.isMiddleDropZone?a(this.presentationCanvasDropPresentationItemsStrategy,{presentationItemIds:e,targetParentId:t.targetId}):a(this.presentationCanvasDropPresentationItemsStrategy,{targetParentId:t.targetParentId,position:t.position,presentationItemIds:e})}}),n.exports=i});