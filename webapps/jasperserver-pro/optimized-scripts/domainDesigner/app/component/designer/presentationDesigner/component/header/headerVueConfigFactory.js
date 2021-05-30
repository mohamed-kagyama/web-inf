/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","../../util/columnSetUtil","text!./template/headerTemplate.htm"],function(e,t,n){var i=e("underscore"),l=e("bundle!DomainDesignerBundle"),r=e("../../util/columnSetUtil"),c=e("text!./template/headerTemplate.htm");n.exports={create:function(e){return{template:c,props:["scrollBarWidth","isScrollBarPresent","column0Width","column1Width","columnSet"],mixins:e.mixins,components:{cell:e.cell,textCell:e.textCell},directives:{clickMenu:e.clickMenuDirective},computed:{i18n:function(){return l},fullWidthCorrection:function(){return this.isScrollBarPresent?this.scrollBarWidth+"px":"initial"},canvasMenuOptions:function(){return e.canvasMenuOptionsFactory.create(this.columnSet)}},methods:i.extend({},r)}}}});