/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,i){var r=e("underscore"),a=function(e){this.initialize(e)};r.extend(a.prototype,{initialize:function(e){this.selectionService=e.selectionService,this.draggableItemsFactory=e.draggableItemsFactory},getDraggableData:function(e){var t,i=e.item,a=this.selectionService.getSelection(),o=this.draggableItemsFactory.create(a);i=r.first(this.draggableItemsFactory.create(i));var s=e.isSingleSelectShouldBePerformed,c=e.isMultipleSelectShouldBePerformed,l=e.isRangeSelectionShouldBePerformed;return s?(o=[],o.push(i)):c?o.push(i):l&&(t=this.selectionService.getRangeSelectionItemsByLastSelectedItem(e.item),o=this.draggableItemsFactory.create(t)),o}}),i.exports=a});