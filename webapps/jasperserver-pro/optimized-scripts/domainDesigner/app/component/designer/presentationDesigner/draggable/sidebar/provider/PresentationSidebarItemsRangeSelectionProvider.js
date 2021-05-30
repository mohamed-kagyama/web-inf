/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../util/uriUtil"],function(e,t,n){var i=e("underscore"),r=e("../../../../../../util/uriUtil"),a=function(e){this.initialize(e)};i.extend(a.prototype,{initialize:function(e){this.presentationDesignerViewStateModelService=e.presentationDesignerViewStateModelService,this.sidebarTreeModel=e.sidebarTreeModel},getRangeSelectionByLastSelectedItem:function(e){var t=this.presentationDesignerViewStateModelService.getPresentationSidebarRangeSelectionStartItem();if(!t)throw new Error("Range selection start item is undefined");var n=r.getParentUri(String(e.id)),i=this.sidebarTreeModel.getNode(n),a=n===r.getSeparator()?i:i.elements,o=this._getSelectionRange(t,e);a=this._getChildrenInRange(a,o);var s=this._getSelectionItems({items:a,rangeSelectionStartItem:t});return this.presentationDesignerViewStateModelService.getNewPresentationSidebarSelection(s,{parentId:e.parentId})},_getChildrenInRange:function(e,t){return i.reduce(e,function(e,n,i){return i>=t.start&&i<=t.end&&e.push(n.resource),e},[])},_getSelectionRange:function(e,t){return{start:Math.min(e.index,t.index),end:Math.max(e.index,t.index)}},_getSelectionItems:function(e){var t=e.items,n=e.rangeSelectionStartItem;return i.map(t,function(e){return e=i.clone(e),n.index===e.index&&(e.rangeSelectionStartItem=!0),e},this)}}),n.exports=a});