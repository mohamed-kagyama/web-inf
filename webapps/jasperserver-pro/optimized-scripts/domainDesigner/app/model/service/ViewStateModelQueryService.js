/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,i){var o=e("underscore"),d=function(e){this.initialize(e)};o.extend(d.prototype,{initialize:function(e){o.bindAll(this,"isNodeExpanded","isNodeCollapsed"),this.viewStateModel=e.viewStateModel},isNodeExpanded:function(e){var t=this.viewStateModel.getSidebarExpandedNodes();return Boolean(t[e])},isNodeCollapsed:function(e){var t=this.viewStateModel.getSidebarCollapsedNodes();return Boolean(t[e])},getDraftState:function(){return this.viewStateModel.getDraftState()}}),i.exports=d});