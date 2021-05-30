/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","text!./template/emptyDataIslandsTemplate.htm","../../../../../common/vue/directive/lazyDroppableDirective","../../../../../common/vue/computed/i18nComputed"],function(e,t,o){var r=e("underscore"),n=e("text!./template/emptyDataIslandsTemplate.htm"),i=e("../../../../../common/vue/directive/lazyDroppableDirective"),p=e("../../../../../common/vue/computed/i18nComputed");o.exports={create:function(e){var t=e.presentationDesignerEventBus,o=e.dropAcceptedByDropZoneResourcesSpecification;return{props:["dropZone","column0Width","isEmptyDataStructure"],template:n,mixins:e.mixins,computed:r.extend({droppableConfig:function(){return{drop:this.drop,over:this.over,out:this.out,test:this.canDropItems,tolerance:"pointer"}}},p),directives:{droppable:i},methods:{canDropItems:function(e){return o.isSatisfiedBy(e,this.dropZone)},drop:function(e,o){t.trigger("emptyDataIslandsDropZone:drop",o)},over:function(){t.trigger("emptyDataIslandsDropZone:over")},out:function(){t.trigger("emptyDataIslandsDropZone:out")}}}}}});