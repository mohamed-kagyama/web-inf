/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,t){var n=e("underscore"),i={_onInitialize:function(){var e=this.$contentContainer.find("li"),r=this._getGroupNames(this.collection.models,"groupId");n.each(r,function(r){var t=e.filter("[data-groupId='"+r+"']").first();t.index()&&t.before("<li class='leaf separator'></li>")},this)},_getGroupNames:function(e,r){return n.keys(n.groupBy(e,function(e){return e.get(r)}))}};t.exports=i});