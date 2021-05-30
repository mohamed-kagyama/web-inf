/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!./template/applicationVueTemplate.htm"],function(e,t,n){var a=e("text!./template/applicationVueTemplate.htm");n.exports={create:function(e){return{el:e.el,template:a,components:{sidebar:e.sidebar,domainDesignerCanvas:e.canvas,domainDesignerMenu:e.menu,tabs:e.tabs},computed:{contentLeftStyle:function(){return{left:this.sidebarWidth}}},data:function(){return e.data},mounted:function(){e.resizablePanel.setElement(this.$el.querySelector(".jr-jDomainSidebar"))}}}}});