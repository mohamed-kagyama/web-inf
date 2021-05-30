/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../base/componentViewTrait/dashletTrait","../../../dashboardSettings","../../../enum/dashboardComponentTypes","underscore","runtime_dependencies/js-sdk/src/common/logging/logger"],function(e,t,i){function o(e,t){var i=["x","y","width","height"];h.each(i,function(i){e.attr("data-"+i,t.get(i))}),e.attr(s.COMPONENT_ID_ATTRIBUTE,t.id)}var n=e("../../base/componentViewTrait/dashletTrait"),s=e("../../../dashboardSettings"),a=e("../../../enum/dashboardComponentTypes"),h=e("underscore"),r=e("runtime_dependencies/js-sdk/src/common/logging/logger"),l=r.register("designerDashletTrait");i.exports=h.extend({},n,{_onViewInitialize:function(){n._onViewInitialize.apply(this,arguments),h.contains([a.ADHOC_VIEW,a.REPORT,a.CHART,a.TABLE,a.CROSSTAB],this.model.get("type"))&&void 0===this.model.get("showVizSelectorIcon")&&this.model.set("showVizSelectorIcon",!s.DASHBOARD_SHOW_VISUALIZE_SELECTOR_ICON),this.listenTo(this.model,"change:x change:y",this._onComponentMove),this.listenTo(this.model,"change:width change:height",this._onComponentResize)},_onViewRemove:function(){n._onViewRemove.apply(this,arguments),this.$content.off("mousedown")},_onComponentResize:function(){this.$el.parent().css(this.model.getCssPosition()),o(this.$el.parent(),this.model),this.resize(),l.debug("resized dashlet "+this.model.id)},_onComponentMove:function(){this.$el.parent().css(this.model.getCssPosition()),o(this.$el.parent(),this.model),l.debug("moved dashlet "+this.model.id)},_onDashboardPropertiesChange:function(e){var t=e.changedAttributes();t&&("showDashletBorders"in t||"dashletPadding"in t||"titleBarColor"in t||"titleTextColor"in t||"dashletMargin"in t)&&(this._setDashletVisualAppearance(),this.resize())},_toggleDashletToolbarButtons:function(){this.toolbar&&(this.toolbar.getOptionView("refresh").disable(),this.toolbar.getOptionView("maximize").disable(),this.toolbar.getOptionView("export").disable(),this.toolbar.getOptionView("export").enable=this.toolbar.getOptionView("export").disable)},updateTitle:function(){this.toolbar&&this.toolbar.$(".innerLabel > p").text(this.model.get("name"))}})});