/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!./template/bundleItemTemplate.htm"],function(e,t,n){var o=e("text!./template/bundleItemTemplate.htm");n.exports={create:function(e){return{template:o,props:["bundle","index"],methods:{onDeleteBundle:function(){e.optionsDesignerEventBus.trigger("remove:bundle",this.index)},onDownloadBundle:function(){e.optionsDesignerEventBus.trigger("download:bundle",this.bundle)}}}}}});