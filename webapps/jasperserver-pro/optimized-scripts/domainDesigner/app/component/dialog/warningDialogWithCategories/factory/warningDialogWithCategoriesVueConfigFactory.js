/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../common/vue/computed/i18nComputed","text!../template/warningDialogWithCategoriesTemplate.htm"],function(e,t,o){var n=e("../../../../common/vue/computed/i18nComputed"),i=e("text!../template/warningDialogWithCategoriesTemplate.htm");o.exports={create:function(e){var t=e.store,o=e.eventBus;return{template:i,computed:n,components:{genericNotificationDialog:e.genericNotificationDialog,category:e.category,categoryDetails:e.categoryDetails},data:function(){return t.attributes},methods:{onConfirm:function(){o.trigger(this.confirmEvent)},onReject:function(){o.trigger(this.rejectEvent)},shouldRenderParametersList:function(e){return Boolean(e&&e.length)}}}}}});