/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../list/model/ScalableListModel"],function(e,t,o){var l=e("underscore"),i=e("../../list/model/ScalableListModel");o.exports={afterFetchComplete:function(e,t){i.prototype.afterFetchComplete.apply(this,arguments);var o,n;l.each(e,function(e,t){e.addToSelection&&(e.selected=!0,o=e.value,n=this.get("bufferStartIndex")+t,this.selectionContains&&!this.selectionContains(o,n)&&this.addValueToSelection(o,n),delete e.addToSelection)},this)}}});