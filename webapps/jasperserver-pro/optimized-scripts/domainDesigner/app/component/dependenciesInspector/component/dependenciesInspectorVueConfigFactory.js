/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","text!../template/dependenciesInspectorTemplate.htm"],function(e,t,n){var r=e("bundle!DomainDesignerBundle"),i=e("text!../template/dependenciesInspectorTemplate.htm");n.exports={create:function(e){return{template:i,components:{leftTreeVirtualData:e.leftTreeVirtualData,rightTreeVirtualData:e.rightTreeVirtualData},computed:{i18n:function(){return r}},methods:{onConfirm:function(){e.dependenciesInspectorEventBus.trigger("dependenciesInspectorComponent:confirm")},onReject:function(){e.dependenciesInspectorEventBus.trigger("dependenciesInspectorComponent:reject")}}}}}});