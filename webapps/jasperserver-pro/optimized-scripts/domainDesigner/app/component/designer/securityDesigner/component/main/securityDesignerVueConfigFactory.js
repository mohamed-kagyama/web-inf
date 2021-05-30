/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","text!./template/securityDesignerTemplate.htm"],function(e,t,n){var r=(e("underscore"),e("bundle!DomainDesignerBundle")),u=e("text!./template/securityDesignerTemplate.htm");n.exports={create:function(e){return{template:u,components:{editor:e.editor},data:function(){return e.data},computed:{i18n:function(){return r}}}}}});