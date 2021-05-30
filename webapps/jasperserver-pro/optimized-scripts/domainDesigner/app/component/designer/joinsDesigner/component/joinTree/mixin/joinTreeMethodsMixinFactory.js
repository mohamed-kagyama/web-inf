/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,i,n){n.exports={create:function(e){var i=e.joinsDesignerEventBus;return{methods:{toggleJoinTree:function(){i.trigger("toggle:joinTree",{id:this.joinTree.id,isExpanded:this.joinTree.isExpanded})},removeJoinTree:function(){i.trigger("remove:joinTree",this.joinTree.id)}}}}}});