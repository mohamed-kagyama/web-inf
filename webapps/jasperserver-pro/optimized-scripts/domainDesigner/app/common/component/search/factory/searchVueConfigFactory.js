/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!../template/searchVueTemplate.htm","../../../vue/computed/i18nComputed"],function(e,t,r){var u=e("text!../template/searchVueTemplate.htm"),n=e("../../../vue/computed/i18nComputed");r.exports={create:function(e){return e=e||{},{template:u,props:["searchKeyword"],data:function(){return{currentInputValue:""}},computed:n,updated:function(){this.currentInputValue=this.searchKeyword},methods:{onSearchKeywordInput:function(e){this.currentInputValue=e},searchByEnterKey:function(t){e.eventBus.trigger("change:searchKeyword",t)},reset:function(){this.currentInputValue="",e.eventBus.trigger("change:searchKeyword","")},searchByClick:function(){e.eventBus.trigger("change:searchKeyword",this.currentInputValue)}}}}}});