/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../model/schema/util/entityUtil"],function(e,i,s){var r=e("underscore"),t=e("../../../../../../model/schema/util/entityUtil"),d=function(e){this.initialize(e)};r.extend(d.prototype,{initialize:function(e){r.bindAll(this,"process"),this.isExpanded=e.isExpanded,this.isCollapsed=e.isCollapsed,this.searchKeywordProvider=e.searchKeywordProvider},process:function(e){var i=!1,s=this.searchKeywordProvider.get();return t.isField(e.type)||(i=s?!this.isCollapsed(e.resourceId):this.isExpanded(e.resourceId),e.expanded=i),e}}),s.exports=d});