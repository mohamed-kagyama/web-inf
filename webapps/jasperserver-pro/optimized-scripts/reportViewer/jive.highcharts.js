/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","highcharts-more","bundle!adhoc_messages","highcharts-heatmap"],function(e,t,n){var i=e("jquery"),r=e("highcharts-more"),h=e("bundle!adhoc_messages");e("highcharts-heatmap");var a={changeType:{}},c=function(e){this.rdy=new i.Deferred,this.config=e,this.parent=null,this.loader=null,this.api=a,this.highchartsInstance=null,this.events={ACTION_PERFORMED:"action",HYPERLINK_INTERACTION:"hyperlinkInteraction"},this._init()};c.prototype={changeType:function(e){var t=this,n={action:{actionName:"changeChartType",changeChartTypeData:{chartComponentUuid:t.config.chartUuid,chartType:e.type}}};return this.loader.runAction(n).then(function(e){return t._notify({name:t.events.ACTION_PERFORMED,type:"changeChartType",data:e}),t})},render:function(e){var t,n=this;e=e||{},e.recreateConfig&&(n.highchartsInstance&&n.highchartsInstance.destroy&&(n.highchartsInstance.destroy(),n.highchartsInstance=void 0),n.rdy=new i.Deferred,n._init(e)),n.rdy.then(function(){try{n.highchartsInstance=new r.Chart(n.hcConfig)}catch(e){t=/\#19/.test(e)?h.ADH_1214_ICHARTS_ERROR_TOO_MANY_VALUES:h.ADH_1214_ICHARTS_ERROR_UNCAUGHT,i.each(r.charts,function(e,t){t&&n.hcConfig.chart.renderTo===t.renderTo.id&&t.destroy()}),n.highchartsInstance&&n.highchartsInstance.destroy&&(n.highchartsInstance.destroy(),n.highchartsInstance=void 0),n._notify({name:"error",type:"highchartsInternalError",data:{error:e,message:t}})}})},_init:function(t){var n=this,h=this.config.hcinstancedata;t=t||{},this.config.globalOptions&&r.setOptions(this.config.globalOptions),n.hcConfig={},n._setConfigDefaults();var a=new i.Deferred;a.resolve(),i.each(this.config.hcinstancedata.services,function(t,r){var h=r.service,c=r.data;a=a.then(function(){var t=new i.Deferred;return e([h],function(e){if("itemHyperlinkSettingService"===h){var i=new e(n,n.hcConfig,c);i.hyperlinkSeriesPointClickedHandler=n._hyperlinkSeriesPointClicked,i.perform()}else e.perform(n.hcConfig,c);t.resolve()}),t})}),a.then(function(){n.hcConfig.chart.renderTo=h.renderto,t.ignoreSize||(n.hcConfig.chart.width=h.width,n.hcConfig.chart.height=h.height),n.rdy.resolve()})},_hyperlinkSeriesPointClicked:function(e){this._notify({name:this.events.HYPERLINK_INTERACTION,type:"hyperlinkClicked",data:e})},_notify:function(e){this.parent._notify(e)},_setConfigDefaults:function(){this.config.charttype&&this.config.charttype.indexOf("TreeMap")>=0&&i.extend(!0,this.hcConfig,{plotOptions:{treemap:{drillUpButton:{position:{y:-45}}}}})}},n.exports=c});