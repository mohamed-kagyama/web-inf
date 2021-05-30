/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,s){var i=e("underscore");s.exports={setValue:function(e,t){return t=t||{renderSelection:!0},this.model.select(e,{silent:!0}),t.renderSelection&&this._selectVisibleItems(e),this},_selectVisibleItems:function(e){var t=this.model.get("bufferStartIndex");i.each(this.model.get("items"),function(s,n){var r=n+t;-1!==i.indexOf(e,s.value)?this._selectItemByIndex(r):this._deselectItemByIndex(r)},this)}}});