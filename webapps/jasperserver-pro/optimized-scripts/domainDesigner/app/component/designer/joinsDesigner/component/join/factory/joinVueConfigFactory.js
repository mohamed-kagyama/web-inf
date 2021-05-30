/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!../template/joinVueTemplate.htm"],function(e,t,n){var i=e("text!../template/joinVueTemplate.htm");n.exports={create:function(e){var t=e.joinMenuOptionsFactory,n=e.clickMenuDirective,o=e.mixins;return{template:i,directives:{clickMenu:n},computed:{isAnyJoinMenuOptions:function(){return Boolean(this.joinMenuOptions.length)},joinMenuOptions:function(){return t.create({id:this.join.id})}},props:["join"],mixins:o}}}});