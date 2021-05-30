/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","../../../enum/dashboardWiringStandardIds","runtime_dependencies/js-sdk/src/common/component/webPageView/WebPageView"],function(e,t,n){function o(e){e.name===i.REFRESH_SLOT?this.applyUrl(!0):e.name===i.APPLY_SLOT&&this.applyUrl(!1)}var s=e("jquery"),i=e("../../../enum/dashboardWiringStandardIds"),r=e("runtime_dependencies/js-sdk/src/common/component/webPageView/WebPageView");n.exports={_initComponent:function(){if(this.component=new r({url:this.model.get("url"),scrolling:this.model.get("scroll")}),this.$el.addClass("dashboardVisualization"),this.listenTo(this.component,"load",function(){this.$el.addClass("rendered")},this),this.listenTo(this.model,"signal",o),this.model.lastPayload)for(var e in this.model.lastPayload)o.call(this,{name:e,value:this.model.lastPayload[e]},this.model.lastSender[e]);this.listenTo(this.model,"change:url",this.applyUrl,this)},_renderComponent:function(){this.component.render(this.$content),this.trigger("componentRendered",this)},_onComponentPropertiesChange:function(){var e=this.model.changedAttributes();e&&"scroll"in e&&(this.component.setScrolling(this.model.get("scroll")),this.refresh())},_removeComponent:function(){this.component.remove()},refresh:function(){return this.component.refresh(),s.Deferred().resolve()},applyUrl:function(e){try{var t=this.model.getParametrizationResult("url",this.paramsModel.attributes);this.component.url!==t?(this.hideMessage(),this.component.setUrl(t),this.component.$el.show()):e&&this.component.refresh()}catch(e){this.showMessage({errorCode:"parameter.not.specified"}),this.component.$el.hide()}}}});