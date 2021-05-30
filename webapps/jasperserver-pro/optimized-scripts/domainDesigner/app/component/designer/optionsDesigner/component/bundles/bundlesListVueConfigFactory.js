/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../common/vue/computed/i18nComputed","text!./template/bundlesLIstTemplate.htm"],function(e,t,n){var o=e("underscore"),u=e("../../../../../common/vue/computed/i18nComputed"),d=e("text!./template/bundlesLIstTemplate.htm");n.exports={create:function(e){return{template:d,props:["bundles"],components:{bundleItem:e.bundleItem},computed:o.extend({},u),methods:{onAddLocaleBundle:function(){e.optionsDesignerEventBus.trigger("show:bundlesUploadDialog")},onDownloadBundleTemplate:function(){e.optionsDesignerEventBus.trigger("show:downloadBundleTemplateDialog")}}}}}});