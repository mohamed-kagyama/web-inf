/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../common/vue/computed/i18nComputed","text!../template/downloadBundleTemplateDialogTemplate.htm"],function(e,t,n){var o=e("underscore"),i=e("../../../../../../common/vue/computed/i18nComputed"),a=e("text!../template/downloadBundleTemplateDialogTemplate.htm");n.exports={create:function(e){return{computed:o.extend({},i),template:a,methods:{onOk:function(){e.optionsDesignerEventBus.trigger("downloadBundleTemplate",{autoGenerateLabelKeyIfMissing:this.autoGenerateLabelKeyIfMissing,autoGenerateDescriptionKeyIfMissing:this.autoGenerateDescriptionKeyIfMissing})},onCancel:function(){e.optionsDesignerEventBus.trigger("hide:downloadBundleTemplateDialog")}}}}}});