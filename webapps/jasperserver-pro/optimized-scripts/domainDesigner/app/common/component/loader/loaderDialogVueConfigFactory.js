/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../vue/computed/i18nComputed","text!./template/loaderTemplate.htm"],function(e,t,i){var o=e("../../vue/computed/i18nComputed"),n=e("text!./template/loaderTemplate.htm");i.exports={create:function(e){var t=e.Dialog,i=e.loaderEventBus,l=e.zIndex;return{template:n,computed:o,data:function(){return{isDialogVisible:!1,hasCancel:e.hasCancel}},methods:{close:function(){this.dialog.close(),this.isDialogVisible=!1},open:function(){this.dialog.open(),this.isDialogVisible=!0},isVisible:function(){return this.isDialogVisible},onCancelClick:function(){i.trigger("cancel")}},created:function(){this.dialog=new t({el:this.$mount().$el,zIndex:l})},destroyed:function(){this.close(),this.dialog.remove()}}}}});