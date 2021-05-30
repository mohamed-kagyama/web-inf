/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,t){var i=e("underscore"),o=function(e){this.initialize(e)};i.extend(o.prototype,{initialize:function(e){i.bindAll(this,"match"),e=e||{},this.getSearchProperty=e.getSearchProperty,this.searchKeywordProvider=e.searchKeywordProvider},match:function(e){var r=e.resource;if(e.parentMatchResult)return!0;var t=this.getSearchProperty(r,e);t=i.isArray(t)?t:[t];var o=(this.searchKeywordProvider.get()||"").toLocaleLowerCase();return!o||i.find(t,function(e){return e.indexOf(o)>=0})}}),t.exports=o});