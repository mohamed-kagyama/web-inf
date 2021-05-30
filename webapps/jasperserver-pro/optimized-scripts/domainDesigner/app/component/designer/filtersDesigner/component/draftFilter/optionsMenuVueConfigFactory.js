/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!./template/optionsMenuTemplate.htm"],function(e,t,i){var n=e("text!./template/optionsMenuTemplate.htm");i.exports={create:function(e){var t=e.draftFilterOptionsMenuOptionsFactory,i=e.clickMenuDirective;return{template:n,directives:{clickMenu:i},props:["filter"],computed:{menuOptions:function(){return t.create(this.filter)}}}}}});