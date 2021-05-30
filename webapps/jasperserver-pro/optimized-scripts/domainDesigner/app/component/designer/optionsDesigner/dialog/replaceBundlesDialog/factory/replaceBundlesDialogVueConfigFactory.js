/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","text!../template/replaceBundlesDialogVueTemplate.htm","../../../../../../common/vue/computed/i18nComputed"],function(e,t,n){var l=e("underscore"),o=e("text!../template/replaceBundlesDialogVueTemplate.htm"),u=e("../../../../../../common/vue/computed/i18nComputed");n.exports={create:function(e){var t=e.store,n=e.optionsDesignerEventBus;return{template:o,computed:l.extend({},u),data:function(){return t},methods:{onReplaceBundlesButtonClick:function(){n.trigger("replaceBundlesDialog:replaceBundles",l.cloneDeep(this.bundles))},onSelectNewFilesButtonClick:function(){n.trigger("replaceBundlesDialog:selectNewFiles")},onCancelButtonClick:function(){n.trigger("replaceBundlesDialog:cancel")}}}}}});