/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,n){var i=e("underscore"),r=function(e){this.initialize(e)};i.extend(r.prototype,{initialize:function(e){this.rangeSelectionProvider=e.rangeSelectionProvider,this.presentationDesignerViewStateModelService=e.presentationDesignerViewStateModelService},isSelectionEmpty:function(){return this.presentationDesignerViewStateModelService.isPresentationItemsSelectionEmpty()},getSelection:function(){return this.presentationDesignerViewStateModelService.getPresentationCanvasSelectedItems()},getSelectionSize:function(){return this.presentationDesignerViewStateModelService.getPresentationItemsSelectionSize()},isSingleSelectionShouldBePerformedOnDrag:function(e){return this.presentationDesignerViewStateModelService.isPresentationItemSingleSelectShouldBePerformedOnDrag(e)},isMultiSelectionShouldBePerformedOnDrag:function(e){return this.presentationDesignerViewStateModelService.isPresentationItemMultiSelectShouldBePerformedOnDrag(e)},isRangeSelectionShouldBePerformedOnDrag:function(e){return this.presentationDesignerViewStateModelService.isPresentationItemMultiSelectShouldBePerformedOnDrag(e)},getNewSelection:function(e,t){var n=e.parentId;return t=i.extend({parentId:n},t),this.presentationDesignerViewStateModelService.getNewPresentationItemsSelection(e,t)},getRangeSelectionStartItem:function(){return this.presentationDesignerViewStateModelService.getPresentationItemsRangeSelectionStartItem()},getRangeSelectionItemsByLastSelectedItem:function(e){var t=this.rangeSelectionProvider.getRangeSelectionByLastSelectedItem(e);return i.values(t.items)}}),n.exports=r});