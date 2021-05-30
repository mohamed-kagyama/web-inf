/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!../template/joinAliasVueTemplate.htm"],function(e,t,i){var n=e("text!../template/joinAliasVueTemplate.htm");i.exports={create:function(e){var t=e.joinsDesignerEventBus;return{template:n,props:["joinAlias"],methods:{remove:function(){t.trigger("remove:joinAlias",this.joinAlias.id)}}}}}});