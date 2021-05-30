/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../common/vue/computed/i18nComputed","../../moveItems/enum/movePresentationItemsPositionEnum","text!./template/controlsTemplate.htm"],function(e,t,n){var o=(e("underscore"),e("../../../../../common/vue/computed/i18nComputed")),r=e("../../moveItems/enum/movePresentationItemsPositionEnum"),i=e("text!./template/controlsTemplate.htm");n.exports={create:function(e){return{template:i,props:["moveButtonsStatus","isAddSetButtonActive","searchKeyword"],components:{search:e.search},computed:o,methods:{onAddSet:function(){e.presentationDesignerEventBus.trigger("addSet")},onMoveToTop:function(){e.presentationDesignerEventBus.trigger("movePresentationSetClick",r.MOVE_TOP)},onMoveUp:function(){e.presentationDesignerEventBus.trigger("movePresentationSetClick",r.MOVE_UP)},onMoveDown:function(){e.presentationDesignerEventBus.trigger("movePresentationSetClick",r.MOVE_DOWN)},onMoveToBottom:function(){e.presentationDesignerEventBus.trigger("movePresentationSetClick",r.MOVE_BOTTOM)}}}}}});