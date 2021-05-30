/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,i){var n=e("underscore"),o=function(e){this.initialize(e)};n.extend(o.prototype,{initialize:function(e){this.selectionService=e.selectionService,this.rangeSelectionProvider=e.rangeSelectionProvider},getSelection:function(e){var t,i=e.item,o=e.isSingleSelectShouldBePerformed,r=e.isMultipleSelectShouldBePerformed,c=e.isRangeSelectionShouldBePerformed;return o?(n.extend(i,{rangeSelectionStartItem:!0}),t=this.selectionService.getNewSelection(i)):r?t=this.selectionService.getNewSelection(i,{toggle:!0}):c&&(t=this.rangeSelectionProvider.getRangeSelectionByLastSelectedItem(i)),t}}),i.exports=o});