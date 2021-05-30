/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery","runtime_dependencies/bi-report/src/bi/report/Report","runtime_dependencies/js-sdk/src/common/component/menu/HoverMenu","runtime_dependencies/js-sdk/src/common/component/notification/Notification","runtime_dependencies/js-sdk/src/common/component/dialog/LoadingDialog","runtime_dependencies/js-sdk/src/common/component/pagination/Pagination","runtime_dependencies/js-sdk/src/common/component/webPageView/WebPageView","../../../enum/dashboardWiringStandardIds","../../../dashboardSettings","../../../hyperlink/defaultLinkOptions","runtime_dependencies/bi-report/src/bi/report/enum/scaleStrategies","runtime_dependencies/bi-report/src/bi/report/jive/enum/hyperlinkTypes","../../../factory/sandboxFactory","runtime_dependencies/bi-report/src/bi/report/enum/reportOutputFormats","runtime_dependencies/js-sdk/src/common/util/browserDetection","text!../../../template/menuContainerTemplate.htm","text!../../../template/menuOptionTemplate.htm","bundle!jasperserver_messages","bundle!DashboardBundle","runtime_dependencies/js-sdk/src/common/logging/logger"],function(e,t,n){function i(){return i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},i.apply(this,arguments)}function o(e,t,n,i,o){var r;if(e===S.WIDTH)r=i/t;else if(e===S.HEIGHT)r=o/n;else{var s=i/t,a=o/n;r=s*n<o?s:a}return r}function r(e){var t=this;this.component&&this.component.export({outputFormat:"html",pages:2}).done(function(){var n=t.component.data().totalPages;t.paginationView||0===n?n>1&&t._refreshPagination(n,e):(t._initPagination({total:n,silent:!0,validate:!1}),t.paginationView.$el.find(".next, .prev, .first").prop("disabled",!1))})}function s(e){return e.$("> .dashletContent > .content > ._jr_report_container_ > .highcharts_parent_container").length>0}function a(e,t){e.name===T.REFRESH_SLOT?(this.paramsModel.paramsChanged&&(this.paramsModel.paramsChanged=!1,this.component.params(d(this))),this.refresh()):e.name===T.APPLY_SLOT&&this.paramsModel.paramsChanged&&(this.paramsModel.paramsChanged=!1,this.component.params(d(this)),this.paginationView&&(this.paginationView.resetSetOptions({silent:!0,validate:!1}),this.paginationView.model.set(this.paginationView.model.defaults),this.paginationView.$el.find(".next, .prev, .first").prop("disabled",!1)),this.refresh())}function d(e){var t=x.reduce(e.model.get("parameters"),function(e,t){return t.parametrizeProperty&&e.push(t.id),e},[]);return x.omit(e.paramsModel.attributes,t)}function p(e){var t={};for(var n in e)t[n]=x.isArray(e[n])?e[n]:[e[n]];return t}function l(e){if(e){var t=this.dashboardId?M.get(this.dashboardId).get("linkOptions")||{}:{},n={events:{}},i=this;for(var o in t.events)n.events[o]=function(e,n){var o="jr_hyperlink_interception"===e.eventType?"click":e.type.toLowerCase();t.events[o]&&t.events[o].call(i.component,e,n,x.bind(F.events[o],i.component,e,n,i))};for(var o in F.events)n.events.hasOwnProperty(o)||(n.events[o]=function(e,t){var n="jr_hyperlink_interception"===e.eventType?"click":e.type.toLowerCase();F.events[n]&&F.events[n].call(i.component,e,t,i)});return n.beforeRender=function(e){F.discoverHyperlinkHandlers(e).done(function(){t.beforeRender?t.beforeRender.call(i.component,e,x.bind(F.beforeRender,i.component,e,i)):F.beforeRender.call(i.component,e,i)})},n}}function h(){this.drilldownComponent&&(this.drilldownComponent instanceof k?this.drilldownComponent.remove():this.drilldownComponent.destroy(),this.drilldownComponent=null)}function c(e){try{if(!x.isUndefined(this.pages())&&e&&e.model&&this.pages()!==e.model.get("current")){var t=parseInt(x.isObject(this.pages())?this.pages().pages:this.pages(),10);!isNaN(t)&&e.model.set("current",t)}}catch(e){"already.destroyed.error"!==e.errorCode&&D.error(e.toString())}}function m(e){e>1?this.paginationView?this._refreshPagination(e):this._initPagination({total:e}):this.paginationView&&this.paginationView.hide()}function u(e,t,n){var i=this,o=new P({resource:e,container:this.$content,params:t,autoresize:!1,server:I.CONTEXT_PATH,showAdhocChartTitle:!0,scale:this.model.get("scaleToFit"),pages:x.isObject(n)&&x.isUndefined(n.pages)&&x.isUndefined(n.anchor)||x.isUndefined(n)?1:n,events:{changeTotalPages:x.bind(m,i),changePagesState:function(e){i.paginationView?i.paginationView.model.set("current",e):!x.isUndefined(this.data().totalPages)&&this.data().totalPages>1&&i._initPagination({current:e});var t=this.pages(),n=x.isObject(t)?{pages:e}:e;x.isObject(t)&&!x.isUndefined(t.anchor)&&(n.anchor=t.anchor),this.pages(n)},reportCompleted:function(){c.call(this,i.paginationView)},beforeRender:function(){i.hideMessage(),i.component===this&&i.drilldownComponent&&(h.call(i),m.call(i,this.data().totalPages),c.call(this,i.paginationView))}},defaultJiveUi:{floatingTableHeadersEnabled:!0,floatingCrosstabHeadersEnabled:!0}});return this.dashboardId&&o.properties(M.get(this.dashboardId).get("reportSettings")||{}),o}function g(e){var t=e.find("table")[0],n=t&&t.className;return n&&n.indexOf("jrPage")>=0?R(t):null}function f(e){this.hideMessage(),!1!==e&&this.trigger("componentRendered",self),!s(this)&&this._resetContentOverflow(this._calculateContentOverflow(this)),w.call(this),this.$el.find(".jrPage .highcharts_parent_container").attr("js-stdnav","false"),!g(this.$content)&&this.showMessage({errorCode:"report.empty.error"})}function w(){var e=!1;void 0!==this.model.get("showVizSelectorIcon")&&this.$el&&this.$el.find(".jive_chartSettingsIcon").length&&(e=!0,this.model.get("showVizSelectorIcon")?this.$("> .dashletContent > .content").removeClass("hideVizLauncher"):this.$("> .dashletContent > .content").addClass("hideVizLauncher")),this.model.set("showVizSelector",e)}function v(e){"report.execution.cancelled"!==e.errorCode&&(this.paginationView&&this.paginationView.hide(),this.$content.empty(),this.showMessage(e),this.ready.resolve())}function b(e,t){x.isUndefined(t)||e.pages(t).run().done(x.bind(f,this)).fail(x.bind(v,this))}function C(e,t,n,i){var o=x.extend({},i),r=x.template("{{= contextPath }}/rest_v2/reports{{= resource }}.{{= output }}{{= params }}");return!x.isUndefined(n.pages)&&(o.pages=n.pages),!x.isUndefined(n.anchor)&&(o.anchor=n.anchor),"xlsNoPag"===t&&(o.ignorePagination=!0,t="xls"),"xlsxNoPag"===t&&(o.ignorePagination=!0,t="xlsx"),r({contextPath:I.CONTEXT_PATH,resource:e,output:t,params:x.isEmpty(o)?"":"?"+R.param(o,!0)})}function _(e,t){var n={outputFormat:e,pages:t};return"xlsNoPag"===e&&(n.outputFormat="xls"),"xlsxNoPag"===e&&(n.outputFormat="xlsx"),n}var x=e("underscore"),R=e("jquery"),P=e("runtime_dependencies/bi-report/src/bi/report/Report"),O=e("runtime_dependencies/js-sdk/src/common/component/menu/HoverMenu"),y=e("runtime_dependencies/js-sdk/src/common/component/notification/Notification"),V=e("runtime_dependencies/js-sdk/src/common/component/dialog/LoadingDialog"),j=e("runtime_dependencies/js-sdk/src/common/component/pagination/Pagination"),k=e("runtime_dependencies/js-sdk/src/common/component/webPageView/WebPageView"),T=e("../../../enum/dashboardWiringStandardIds"),I=e("../../../dashboardSettings"),F=e("../../../hyperlink/defaultLinkOptions"),S=e("runtime_dependencies/bi-report/src/bi/report/enum/scaleStrategies"),E=e("runtime_dependencies/bi-report/src/bi/report/jive/enum/hyperlinkTypes"),M=e("../../../factory/sandboxFactory"),L=e("runtime_dependencies/bi-report/src/bi/report/enum/reportOutputFormats"),$=e("runtime_dependencies/js-sdk/src/common/util/browserDetection"),U=e("text!../../../template/menuContainerTemplate.htm"),z=e("text!../../../template/menuOptionTemplate.htm"),H=e("bundle!jasperserver_messages"),N=e("bundle!DashboardBundle"),A=e("runtime_dependencies/js-sdk/src/common/logging/logger"),W=i({},H,N),D=A.register("reportTrait"),X=[{label:W["jasper.report.view.hint.export.pdf"],action:"pdf",params:{outputFormat:"pdf"}},{label:W["jasper.report.view.hint.export.excel"],action:"excel",params:{outputFormat:"xls"}},{label:W["jasper.report.view.hint.export.excel.nopag"],action:"excel.nopag",params:{outputFormat:"xls",ignorePagination:!0}},{label:W["jasper.report.view.hint.export.rtf"],action:"rtf",params:{outputFormat:"rtf"}},{label:W["jasper.report.view.hint.export.csv"],action:"csv",params:{outputFormat:"csv"}},{label:W["jasper.report.view.hint.export.odt"],action:"odt",params:{outputFormat:"odt"}},{label:W["jasper.report.view.hint.export.ods"],action:"ods",params:{outputFormat:"ods"}},{label:W["jasper.report.view.hint.export.docx"],action:"docx",params:{outputFormat:"docx"}},{label:W["jasper.report.view.hint.export.xlsx"],action:"xlsx",params:{outputFormat:"xlsx"}},{label:W["jasper.report.view.hint.export.xlsx.nopag"],action:"xlsx.nopag",params:{outputFormat:"xlsx",ignorePagination:!0}},{label:W["jasper.report.view.hint.export.pptx"],action:"pptx",params:{outputFormat:"pptx"}}],q=function(){var e={};return e["dashboard.dashlet.error.input.controls.validation.error"]=function(e){return W["dashboard.dashlet.error."+e.errorCode]},function(t){var n=e[t.errorCode];return n?n(t):W["dashboard.dashlet.error."+t.errorCode]||W["dashboard.dashlet.error.unexpected.error"]}}();n.exports={_onViewInitialize:function(){if(this.$el.addClass("dashboardVisualization"),this.listenTo(this.model,"signal",x.bind(a,this)),this.model.lastPayload)for(var e in this.model.lastPayload)a.call(this,{name:e,value:this.model.lastPayload[e]},this.model.lastSender[e])},updateReportLinkOptions:function(){this.component&&this.component.linkOptions(l.call(this,this.component)||{}),this.drilldownComponent&&this.drilldownComponent instanceof P&&this.drilldownComponent.linkOptions(l.call(this,this.drilldownComponent)||{})},updateReportSettings:function(){this.component&&this.component.properties(M.get(this.dashboardId).get("reportSettings")||{}),this.drilldownComponent&&this.drilldownComponent instanceof P&&this.drilldownComponent.properties(M.get(this.dashboardId).get("reportSettings")||{})},exportAs:function(e){var t=this.drilldownComponent&&this.drilldownComponent instanceof P?this.drilldownComponent:this.component,n=new V({cancellable:!1});n.open(),t.export(e).done(function(e){window.open(e.href)}).fail(function(){y.show({message:W["dashboard.dashlet.error.report.export.failed"]})}).always(function(){n.close(),n.remove()})},_initComponent:function(){var e=this;if(x.bindAll(this,"updateReportLinkOptions","updateReportSettings"),this.dashboardId){var t=M.get(this.dashboardId);t.on("linkOptions",this.updateReportLinkOptions),t.on("reportSettings",this.updateReportSettings)}this.model.getReportResourceUri().done(function(t,n){n?(e._broken=!0,v.call(e,n)):(e.component=u.call(e,t,{}),e.updateReportLinkOptions())})},_removeComponent:function(e){if(!(!!e&&e.sessionExpired)&&this.isReportRan&&this.component.destroy(),this.component=null,h.call(this),this.isReportRan=!1,this.dashboardId){var t=M.get(this.dashboardId);t.off("linkOptions",this.updateReportLinkOptions),t.off("reportSettings",this.updateReportSettings)}this._removePagination(),this.exportMenu&&this.exportMenu.remove()},_renderComponent:function(){if(this.drilldownComponent&&this.drilldownComponent instanceof k?(this.paginationView&&(this.paginationView.hide(),this.resizeContentContainer()),this.drilldownComponent.render(this.$content),this.trigger("componentRendered",this)):this.drilldownComponent&&this.drilldownComponent instanceof P?(this.drilldownComponent.render(x.bind(this.trigger,this,"componentRendered",this)),!s(this)&&this._resetContentOverflow(this._calculateContentOverflow())):this.isReportRan&&(this.component.render(x.bind(this.trigger,this,"componentRendered",this)),!s(this)&&this._resetContentOverflow(this._calculateContentOverflow())),this.toolbar){var e=this;this.exportMenu=new O(X,this.toolbar.getOptionView("export").$el,null,{menuContainerTemplate:U,menuOptionTemplate:z}),x.each(X,function(t){e.listenTo(e.exportMenu,"option:"+t.action,function(){e.exportMenu.hide(),e.exportAs(t.params)})})}},_resizeComponent:function(){this.drilldownComponent?this.drilldownComponent instanceof P&&this.isReportRan&&(this.drilldownComponent.resize(),!s(this)&&this._resetContentOverflow(this._calculateContentOverflow())):this.component&&this.isReportRan&&(this.component.resize(),!s(this)&&this._resetContentOverflow(this._calculateContentOverflow()))},notify:function(e){var t=x.reduce(this.model.get("outputParameters"),function(t,n){var i=e[n.id];return i&&(t||(t={}),t[n.id]=x.isArray(i)?i:[i]),t},!1);t&&(this.model.notify(t),this.model.collection.getDashboardPropertiesComponent().applyParameters())},drilldown:function(e){var t,n=e.parameters?p(e.parameters):void 0,i=e.parameters&&!x.isUndefined(e.parameters._output)?e.parameters._output:void 0,o=this;if(x.isUndefined(e.pages)||(t={pages:e.pages}),x.isUndefined(e.anchor)||(t=x.extend({anchor:e.anchor},t)),e.type===E.REFERENCE){if(h.call(this),e.href.indexOf("javascript:")>-1)return;this.drilldownComponent=new k({url:e.href}),this.render()}else if(e.type===E.REPORT_EXECUTION)if(x.isUndefined(i)||i===L.HTML)e.resource===this.component.resource()?(h.call(this),n?(this.component.params(n),this.refresh().done(x.bind(b,this,this.component,t))):b.call(this,this.component,t)):this.drilldownComponent&&this.drilldownComponent instanceof P&&e.resource===this.drilldownComponent.resource()?n?this.drilldownComponent.params(n).refresh().done(x.bind(b,this,this.drilldownComponent,t)).fail(x.bind(v,this)):b.call(this,this.drilldownComponent,t):(h.call(this),this.paginationView&&this.paginationView.hide(),this.paginationView&&this.resizeContentContainer(),this.drilldownComponent=u.call(this,e.resource,n,t),this.updateReportLinkOptions(),this.drilldownComponent.run().done(x.bind(f,this)).fail(x.bind(v,this)));else if(x.isUndefined(t)&&(t={}),$.isIOS()){var r=document.createElement("a");r.setAttribute("href",C(e.resource,i,t,n)),r.setAttribute("target","_blank");var s=document.createEvent("HTMLEvents");s.initEvent("click",!0,!0),r.dispatchEvent(s)}else{var a=_(i,t),d=new P({resource:e.resource,params:n,server:I.CONTEXT_PATH,showAdhocChartTitle:!0,ignorePagination:"xlsNoPag"===i||"xlsxNoPag"===i,pages:x.isUndefined(t.pages)&&x.isUndefined(t.anchor)?1:t});d.run().done(function(){d.export(a).done(function(e){var t=e.href||e;o.dashboardId&&M.get(o.dashboardId).get("previewMode")&&M.get(o.dashboardId).set("disablePageLeaveConfirmation",!0),window.location.href=t,o.dashboardId&&M.get(o.dashboardId).get("previewMode")&&x.defer(function(){M.get(o.dashboardId).set("disablePageLeaveConfirmation",!1)})})})}},refresh:function(){this.toolbar&&this.toolbar.getOptionView("export").disable();var e=this,t=new R.Deferred;return this.cancel().always(function(){e.isReportRan?e.ready.done(function(){e.isReportRunning=!0,h.call(e),e.component.refresh().fail(t.reject).done(function(){var n=e.isPageChangingWhileReportIsRunning||{resetCurrent:!0};r.call(e,n),f.call(e,!1),t.resolve(),e.isPageChangingWhileReportIsRunning=!1})}):(e.isReportRunning=!0,e.component?e.component.run().fail(t.reject).done(function(){e.isReportRan=!0,r.call(e),e.resizeContentContainer(),f.call(e),t.resolve()}):(e._broken||e.hideMessage(),t.resolve()))}),t.fail(x.bind(v,this)).always(x.bind(this._onReportRunFinished,this)),t},cancel:function(){return this.isReportRunning&&this.component?this.component.cancel():(new R.Deferred).resolve()},_initPagination:function(e){var t=this.paginationView=new j(e);this._initPaginationEvents(t),this.$content.before(t.render().$el),!this.model.get("showPaginationControl")&&t.hide()},_initPaginationEvents:function(e){var t=this;this.listenTo(e,"pagination:change",function(n){var i=t.drilldownComponent&&t.drilldownComponent instanceof P?t.drilldownComponent:t.component;t.isPageChangingWhileReportIsRunning||(t.isPageChangingWhileReportIsRunning=!!this.isReportRunning),i.pages(n).run().done(x.bind(function(){e.options.silent&&e.$el.find(".current").val(n)},this)).fail(x.bind(function(){e.model.set("current",e.model.defaults.current)},this)).always(x.bind(this._onReportRunFinished,this))})},_refreshPagination:function(e,t){var n={total:e};t&&t.resetCurrent&&(n.current=this.paginationView.model.defaults.current),this.paginationView.resetSetOptions(),this.paginationView.model.set(n),this.model.get("showPaginationControl")&&this.paginationView.show()},_resetContentOverflow:function(e){var e=e||{};this.$content.css({"overflow-x":e.overflowX||"auto","overflow-y":e.overflowY||"auto"})},_calculateContentOverflow:function(){var e="auto",t="auto",n=g(this.$content),i=n&&n.outerWidth(),r=n&&n.outerHeight(),s=this.$content.outerWidth(),a=this.$content.outerHeight(),d=this.model.get("scaleToFit"),p=1!==d?o(d,i,r,s,a):1;return s>=Math.floor(i*p)&&(e="hidden"),a>=Math.floor(r*p)&&(t="hidden"),{overflowX:e,overflowY:t}},_removePagination:function(){this.paginationView&&(this.stopListening(this.paginationView),this.paginationView.remove(),this.paginationView=null)},_onComponentRendered:function(){this.model.set("isAdhocChart",s(this))},_onReportRunFinished:function(){this.isReportRunning=!1,this.$el.addClass("rendered"),this.toolbar&&this.toolbar.getOptionView("export").enable()},_onComponentPropertiesChange:function(){this.model.hasChanged("scaleToFit")&&(this.component.scale(this.model.get("scaleToFit")),this._renderComponent(),this._resetContentOverflow(this._calculateContentOverflow())),this.model.hasChanged("showPaginationControl")&&this.paginationView&&(this.model.get("showPaginationControl")&&this.paginationView.model.get("total")>1?(this.paginationView.show(),this.resizeContentContainer()):this.model.get("showPaginationControl")||(this.paginationView.hide(),this.resizeContentContainer()))},_errorMessageFactory:q}});