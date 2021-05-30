/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,i,r){var t=e("underscore"),n=function(e){this.initialize(e)};t.extend(n.prototype,{initialize:function(e){t.bindAll(this,"match"),e=e||{},this.searchKeywordProvider=e.searchKeywordProvider,this.isExpanded=e.isExpanded},match:function(e){var i=e.resource,r=this.isExpanded(i.id);return Boolean(this.searchKeywordProvider.get()||r)}}),r.exports=n});