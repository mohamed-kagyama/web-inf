/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","text!./template/securityFileTemplate.htm"],function(e,t,i){var n=e("bundle!DomainDesignerBundle"),r=e("text!./template/securityFileTemplate.htm");i.exports={create:function(e){return{template:r,props:["securityFile"],computed:{i18n:function(){return n}},methods:{onDeleteSecurityFile:function(){e.optionsDesignerEventBus.trigger("remove:securityFile")},onDownloadSecurityFile:function(){e.optionsDesignerEventBus.trigger("download:securityFile",this.securityFile)},onReplaceSecurityFile:function(){e.optionsDesignerEventBus.trigger("show:securityFileUploadDialog")}}}}}});