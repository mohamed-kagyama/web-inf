/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","text!./template/presentationDesignerTemplate.htm"],function(e,n,t){var r=e("bundle!DomainDesignerBundle"),a=e("text!./template/presentationDesignerTemplate.htm");t.exports={create:function(e){var n=e.bundles||r;return{template:a,components:{controls:e.controls,presentationDesignerTable:e.presentationDesignerTable},data:function(){return e.data},computed:{i18n:function(){return n}}}}}});