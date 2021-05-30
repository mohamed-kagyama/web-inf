/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../../common/vue/directive/lazyDroppableDirective","text!./template/dropZoneTemplate.htm"],function(e,o,t){var r=e("../../../../../../../common/vue/directive/lazyDroppableDirective"),i=e("text!./template/dropZoneTemplate.htm");t.exports={create:function(e){var o=e.presentationDesignerEventBus;return{template:i,props:["dropZone"],directives:{droppable:r},computed:{droppableConfig:function(){return{drop:this.drop,tolerance:"pointer"}},visibility:function(){return this.dropZone.isVisible?{display:"block"}:{}}},methods:{drop:function(e,t){o.trigger("dropZone:drop",t,{ownerId:this.dropZone.ownerId,parentId:this.dropZone.parentId,index:this.dropZone.index,which:this.dropZone.which,accepts:this.dropZone.accepts})}}}}}});