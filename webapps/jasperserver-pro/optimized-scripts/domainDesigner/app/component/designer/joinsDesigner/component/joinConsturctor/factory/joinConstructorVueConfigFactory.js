/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","text!../template/joinConstructorVueTemplate.htm"],function(e,r,t){var o=e("underscore"),n=e("text!../template/joinConstructorVueTemplate.htm");t.exports={create:function(e){var r=e.LeftDroppableArea,t=e.RightDroppableArea,p=e.joinsDesignerEventBus;return{template:n,mixins:e.mixins,components:{leftDroppableArea:r,rightDroppableArea:t},props:["joinConstructor"],methods:{onRightDroppableAreaDrop:function(e){var r=o.cloneDeep(this.joinConstructor);p.trigger(this.rightDroppableAreaDropEvent,r,e)},onLeftDroppableAreaRemove:function(){p.trigger(this.leftDroppableAreaRemoveEvent)}}}}}});