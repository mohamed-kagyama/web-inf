/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!../template/attentionDialogTemplate.htm","bundle!CommonBundle"],function(e,t,n){var o=e("text!../template/attentionDialogTemplate.htm"),i=e("bundle!CommonBundle");n.exports={create:function(e){var t=e.event,n=e.eventBus;return{template:o,components:{genericNotificationDialog:e.genericNotificationDialog},computed:{i18n:function(){return i}},data:function(){return e.store},methods:{close:function(){n.trigger(t)}}}}}});