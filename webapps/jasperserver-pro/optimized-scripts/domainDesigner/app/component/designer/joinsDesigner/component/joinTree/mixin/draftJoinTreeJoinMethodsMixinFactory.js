/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,i,n){n.exports={create:function(e){var i=e.joinsDesignerEventBus;return{methods:{toggleJoin:function(){i.trigger("toggle:draftJoinTreeJoin",{isExpanded:this.join.isExpanded})},removeJoin:function(){i.trigger("remove:draftJoinTreeJoin")},selectJoinType:function(e){i.trigger("update:draftJoinTreeJoin:type",{type:e})},selectJoinWeight:function(e){i.trigger("update:draftJoinTreeJoin:weight",{weight:e})}}}}}});