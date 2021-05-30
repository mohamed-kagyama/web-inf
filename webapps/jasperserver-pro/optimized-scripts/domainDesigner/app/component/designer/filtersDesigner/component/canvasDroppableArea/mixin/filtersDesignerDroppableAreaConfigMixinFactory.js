/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,r){var o=e("underscore");r.exports={create:function(e){var t=e.eventBus;return{computed:{droppableConfig:function(){return{el:":el",drop:this.drop,over:this.over,out:this.out,test:this.test,tolerance:"pointer"}}},methods:{drop:function(e,r){this.isOver=!1,t.trigger("canvasDroppableArea:drop",r)},over:function(){this.isOver=!0},out:function(){this.isOver=!1},test:function(e){return!o.isEmpty(e)}}}}}});