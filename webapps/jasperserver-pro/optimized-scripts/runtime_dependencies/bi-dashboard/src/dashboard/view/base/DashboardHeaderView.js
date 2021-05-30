/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone","text!../../template/dashboardHeaderTemplate.htm","bundle!DashboardBundle"],function(e,t,l){var n=e("underscore"),o=e("backbone"),a=e("text!../../template/dashboardHeaderTemplate.htm"),i=e("bundle!DashboardBundle"),d=o.View.extend({el:n.template(a,{i18n:i}),initialize:function(e){var t=this;this.model=e.model,this.model&&this.listenTo(this.model,"change:label",function(){this.setTitle(t.model.get("label"))}),this.$toolbarPlaceholder=this.$(".pageHeader-title-controls:not(.pageHeader-title-controlsRight)")},setTitle:function(e){this.$el.find(".pageHeader-title-text").text(e)},setTextButton:function(e){this.$el.find(".jr-mButton-label.jr")[0].textContent=e}});l.exports=d});