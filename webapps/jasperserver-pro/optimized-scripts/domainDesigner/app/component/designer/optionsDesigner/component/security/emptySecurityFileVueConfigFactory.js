/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","text!./template/emptySecurityFileTemplate.htm"],function(e,t,n){var i=(e("underscore"),e("bundle!DomainDesignerBundle")),r=e("text!./template/emptySecurityFileTemplate.htm");n.exports={create:function(e){return{template:r,props:["securityFile"],computed:{i18n:function(){return i}},methods:{onAddSecurityFile:function(){e.optionsDesignerEventBus.trigger("show:securityFileUploadDialog")}}}}}});