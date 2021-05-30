/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery","runtime_dependencies/js-sdk/src/common/component/menu/HoverMenu"],function(e,n,t){var i=e("underscore"),o=e("jquery"),s=e("runtime_dependencies/js-sdk/src/common/component/menu/HoverMenu");t.exports=s.extend({constructor:function(e){e=e||{};var n=o(e.el),t=e.menuOptions;this.eventBus=e.eventBus,s.call(this,t,n,void 0,{menuOptionTemplate:e.menuOptionTemplate}),this._initMenuOptionsEvents(t)},_initMenuOptionsEvents:function(e){i.each(e,function(e){this.listenTo(this,"option:"+e.action,i.partial(this._onMenuAction,e.triggerEvent,e))},this)},_onMenuAction:function(e,n){this.trigger("selectionMade"),this.eventBus.trigger(e,n)}})});