/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,i){var o=e("underscore");i.exports={create:function(e){var r=e.joinsDesignerEventBus,i=e.isResourceDroppableIntoJoinTreeSpecification;return{methods:{drop:function(e,i){this.isHovered=!1,r.trigger("joinTree:drop",{joinTreeId:this.joinTree.id,item:i})},over:function(){this.isHovered=!0},out:function(){this.isHovered=!1},shouldBeDroppable:function(e){return!(o.isArray(e)&&o.isEmpty(e))&&i.isSatisfiedBy({resource:e.resource,joinTreeId:this.joinTree.id})}}}}}});