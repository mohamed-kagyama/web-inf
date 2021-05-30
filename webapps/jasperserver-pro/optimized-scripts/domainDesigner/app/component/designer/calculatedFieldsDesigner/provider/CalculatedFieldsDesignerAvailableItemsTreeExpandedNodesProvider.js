/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,i,o){var t=e("underscore"),s=function(e){this.initialize(e)};t.extend(s.prototype,{initialize:function(e){t.bindAll(this,"isNodeExpanded","isNodeCollapsed"),this.store=e.store},isNodeExpanded:function(e){return this.store.get("availableValuesExpandedNodes")[e]},isNodeCollapsed:function(e){return this.store.get("availableValuesCollapsedNodes")[e]}}),o.exports=s});