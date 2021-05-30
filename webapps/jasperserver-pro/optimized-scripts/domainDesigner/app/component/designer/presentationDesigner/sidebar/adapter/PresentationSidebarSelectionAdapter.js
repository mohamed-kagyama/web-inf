/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,i){var n=e("underscore"),r=function(e){this.initialize(e)};n.extend(r.prototype,{initialize:function(e){this.rangeSelectionProvider=e.rangeSelectionProvider,this.presentationDesignerViewStateModelService=e.presentationDesignerViewStateModelService},isSelectionEmpty:function(){return this.presentationDesignerViewStateModelService.isPresentationSidebarSelectionEmpty()},getSelection:function(){return this.presentationDesignerViewStateModelService.getPresentationSidebarSelectedItems()},getSelectionSize:function(){return this.presentationDesignerViewStateModelService.getPresentationSidebarSelectionSize()},isSingleSelectionShouldBePerformedOnDrag:function(e){return this.presentationDesignerViewStateModelService.isPresentationSidebarSingleSelectShouldBePerformedOnDrag(e)},isMultiSelectionShouldBePerformedOnDrag:function(e){return this.presentationDesignerViewStateModelService.isPresentationSidebarMultiSelectShouldBePerformedOnDrag(e)},isRangeSelectionShouldBePerformedOnDrag:function(e){return this.presentationDesignerViewStateModelService.isPresentationSidebarMultiSelectShouldBePerformedOnDrag(e)},getNewSelection:function(e,t){var i=e.parentId;return t=n.extend({parentId:i},t),this.presentationDesignerViewStateModelService.getNewPresentationSidebarSelection(e,t)},getRangeSelectionStartItem:function(){return this.presentationDesignerViewStateModelService.getPresentationSidebarRangeSelectionStartItem()},getRangeSelectionItemsByLastSelectedItem:function(e){var t=this.rangeSelectionProvider.getRangeSelectionByLastSelectedItem(e);return n.values(t.items)}}),i.exports=r});