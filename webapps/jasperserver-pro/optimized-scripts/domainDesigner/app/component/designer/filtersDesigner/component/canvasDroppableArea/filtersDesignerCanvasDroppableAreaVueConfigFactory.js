/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","text!./template/filtersDesignerCanvasDroppableAreaViewTemplate.htm","../../../../../common/vue/computed/i18nComputed","../../../../../common/vue/directive/lazyDroppableDirective"],function(e,t,i){var r=e("underscore"),o=e("text!./template/filtersDesignerCanvasDroppableAreaViewTemplate.htm"),n=e("../../../../../common/vue/computed/i18nComputed"),p=e("../../../../../common/vue/directive/lazyDroppableDirective");i.exports={create:function(e){return{template:o,components:{},props:["isEmptyDataStructure","filters","isActive"],data:function(){return{isOver:!1}},mixins:e.mixins||[],directives:{droppable:p},computed:r.extend({isDropZoneActive:function(){return this.isActive&&!this.isOver}},n)}}}});