/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../base/componentViewTrait/filterGroupTrait","../../../enum/dashboardComponentTypes","underscore"],function(o,t,e){var n=o("../../base/componentViewTrait/filterGroupTrait"),i=o("../../../enum/dashboardComponentTypes"),s=o("underscore");e.exports=s.extend({},n,{_initComponent:function(){this.model.isDesigner=!0,n._initComponent.apply(this,arguments),s.bindAll(this,"_onMouseDown"),this.$content.on("mousedown",this._onMouseDown)},_onMouseDown:function(o){var t=this.$el.parent();if(t.hasClass("ui-draggable")){var e=this.$content.offset().left,n=o.pageX>e+this.scrollBarPosition.x2&&o.pageX<e+this.scrollBarPosition.x1;t.draggable("option","disabled",n)}},_resizeComponent:function(){n._resizeComponent.apply(this,arguments),this._getScrollBarPosition();var o=this;s.chain(this.component.componentViews||[]).filter(function(t){return t.model.get("type")===i.INPUT_CONTROL&&t.model.getParent()===o.model}).invoke("_resizeComponent")},_getScrollBarPosition:function(){var o=this.$content.css("overflow-y");this.scrollBarPosition={x1:this.$content.css("overflow-y","hidden")[0].clientWidth,x2:this.$content.css("overflow-y",o)[0].clientWidth}},_toggleButtons:function(){this.component.disableButtons()},_onDashboardPropertiesChange:function(o){var t=o.changedAttributes();"dashletFilterShowPopup"in t&&this.model.set("floating",t.dashletFilterShowPopup)},_removeComponent:function(){n._removeComponent.apply(this,arguments),this.$content.off("mousedown",this._onMouseDown)}})});