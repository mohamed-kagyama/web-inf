/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,i){function n(e,t,i){var n=this.get("bufferStartIndex")+t;this.selectionContains&&(i?(e.selected=!0,!this.selectionContains(e.value,n)&&this.addValueToSelection(e.value,n)):(e.selected=!1,this.selectionContains(e.value,n)&&this.removeValueFromSelection(e.value,n))),delete e.addToSelection}var o=e("underscore");i.exports={afterFetchComplete:function(e,t){o.each(e,function(e,t){e&&(e.addToSelection?n.call(this,e,t,!0):o.isUndefined(e.addToSelection)||n.call(this,e,t))},this)}}});