/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,r,n){n.exports={create:function(e){var r=e.joinsDesignerEventBus;return{methods:{toggleJoinTree:function(){r.trigger("toggle:draftJoinTree",{isExpanded:this.joinTree.isExpanded})},removeJoinTree:function(){r.trigger("remove:draftJoinTree")}}}}}});