/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery","backbone","runtime_dependencies/js-sdk/src/common/bi/component/util/biComponentUtil","runtime_dependencies/js-sdk/src/common/bi/component/BiComponent","runtime_dependencies/js-sdk/src/common/bi/error/enum/biComponentErrorCodes","./error/biComponentErrorFactoryReportProxy","./ReportController","./model/ReportPropertiesModel","./enum/reportOutputFormats","./jive/enum/interactiveComponentTypes","./enum/reportEvents","runtime_dependencies/js-sdk/src/common/logging/logger","json!./schema/Report.json","json!./schema/ReportExport.json","json!./schema/ReportSearch.json","json!./schema/ReportSave.json","json!./schema/Chart.json","json!./schema/CrosstabDataColumn.json","json!./schema/CrosstabRowGroup.json","json!./schema/TableColumn.json"],function(e,r,t){function o(e){var r=null;return e&&f.keys(e).length&&(r={reportParameter:f.map(e,function(e,r){return{name:r,value:e}})}),r}function n(e,r,t,n,s){var i,a,c,p,d=this.validate(),u=this;if(d)return p=j.validationError(d),G.error(p.toString()),void e.reject(p);if(r.properties.isolateDom&&(f.isUndefined(r.properties.defaultJiveUi)||!1!==r.properties.defaultJiveUi.enabled))return p=j.genericError(C.UNSUPPORTED_CONFIGURATION_ERROR,"Default JIVE UI should be disabled when isolateDom option is true"),G.error(p.toString()),void e.reject(p);if(r.properties.container){var l=v(r.properties.container);if(!l.length||"1"!=l[0].nodeType)return p=j.containerNotFoundError(r.properties.container),G.error(p.toString()),void e.reject(p);t.view.setContainer(l)}f.isUndefined(r.properties.resource.executionId)?t.model.set("reportURI",r.properties.resource):t.model.set("executionId",r.properties.resource.executionId),t.model.contextPath=r.properties.server,h.createReadOnlyProperty(this,"server",r,!0,s),h.createReadOnlyProperty(this,"resource",r,!0,s),h.createReadOnlyProperty(this,"ignorePagination",r,!0,s),h.createReadOnlyProperty(this,"reportLocale",r,!0,s),h.createReadOnlyProperty(this,"reportTimeZone",r,!0,s),c=t.model.execution.get("parameters"),i=t.model.execution.get("pages"),a=t.model.execution.get("anchor");var m=f.isObject(r.properties.pages)?r.properties.pages.pages:r.properties.pages,E=f.isObject(r.properties.pages)?r.properties.pages.anchor:void 0;f.isUndefined(m)?(f.extend(t.model.getExport(P.HTML).get("options"),{pages:void 0,anchor:E}),t.model.execution.set({pages:void 0,anchor:E,ignorePagination:r.properties.ignorePagination,parameters:o(r.properties.params)})):(f.extend(t.model.getExport(P.HTML).get("options"),{pages:m,anchor:E}),t.model.execution.set({pages:m,anchor:E,ignorePagination:r.properties.ignorePagination,parameters:o(r.properties.params)})),r.properties.reportLocale&&t.model.execution.set({reportLocale:r.properties.reportLocale}),r.properties.reportTimeZone&&t.model.execution.set({reportTimeZone:r.properties.reportTimeZone});var R=t.model.execution.changedAttributes(),g=R&&"parameters"in R,A=R&&("pages"in R||"anchor"in R),_=r.searchActionExecutedSuccessfuly;r.searchActionExecutedSuccessfuly=!1;var T=function(){var e=new v.Deferred;return G.debug("Starting trying to render report"),r.properties.container?t.renderReport().done(function(){try{var r=u.data();s.set("_rendered",!0),e.resolve(r)}catch(r){G.error(r.toString()),e.reject(r)}}).fail(function(r){var t=j.reportRender(r),o=t.data&&t.data.error&&t.data.error.stack?"\n"+t.data.error.stack:"";G.error(t.toString()+o),e.reject(t)}):e.resolve(u.data()),e},O=function(){T().done(function(){r.data.totalPages=t.model.get("totalPages"),r.data.components=t.components.getComponents(),r.data.links=t.components.getLinks(),r.data.bookmarks=t.components.getBookmarks(),r.data.reportParts=t.components.getReportParts(),e.resolve(u.data())}).fail(e.reject)},S=function(o){var n;t.view.hideOverlay(),g&&t.model.execution.set({parameters:c},{silent:!0}),A&&(t.model.execution.set({pages:i,anchor:a},{silent:!0}),f.isUndefined(a)?r.properties.pages=i:r.properties.pages=f.isUndefined(i)?{anchor:a}:{pages:i,anchor:a}),o.errorDescriptor&&o.errorDescriptor.errorCode?(n=j.genericError(o.errorDescriptor.errorCode,o.errorDescriptor.message,o.errorDescriptor.parameters),G.error(n.toString()),e.reject(n)):"export"===o.source||"execution"===o.source?(n=j.reportStatus(o),f.include([C.REPORT_EXECUTION_FAILED,C.REPORT_EXECUTION_CANCELLED,C.REPORT_EXPORT_FAILED,C.REPORT_EXPORT_CANCELLED],n)?G.error(n.toString()):G.error("Report "+o.source+("export"===o.source?" to format '"+o.format+"'":"")+" "+o.status+": "+n.toString()),e.reject(n)):"highchartsInternalError"===o.type?(n=j.reportRender(o),G.error(n.toString()),e.reject(n)):(n=j.requestError(o),G.error(n.toString()),e.reject(n))};t.view.showOverlay(),t.model.isNew()?t.executeReport(n).then(O,S):function(){var e,r=v.Deferred();if(!f.isObject(t.updateComponent))return r.resolve();var o=t.updateComponent&&t.updateComponent.componentId,n=t.updateComponent&&t.updateComponent.componentProps,s=!f.isUndefined(o)&&f.findWhere(t.components.getComponents(),{name:o})||f.findWhere(t.components.getComponents(),{id:o});if(!s)throw new Error("Component with such name or id '"+o+"' was not found");var i=f.extend(s,n),a=Y[i.componentType];if(!a)throw new Error("Cannot validate component - unknown component type '"+i.componentType+"'");var c=h.validateObject(a,s);if(c)e=j.validationError(c),G.error(e.toString()),r.reject(e);else{var p=t.components.updateComponents([i]);p&&f.isArray(p)&&(p=f.compact(p)),p&&f.isArray(p)&&p.length?(p.silent=!0,t.runReportAction(p).done(function(){r.resolve(f.findWhere(t.components.getComponents(),{name:o}))}).fail(function(t){"export"===t.source||"execution"===t.source?(e=j.reportStatus(t),f.include([C.REPORT_EXECUTION_FAILED,C.REPORT_EXECUTION_CANCELLED,C.REPORT_EXPORT_FAILED,C.REPORT_EXPORT_CANCELLED],e)?G.error(e.toString()):G.error("Report "+t.source+("export"===t.source?" to format '"+t.format+"'":"")+" "+t.status+": "+e.toString()),r.reject(e)):"highchartsInternalError"===t.type?(e=j.reportRender(t),G.error(e.toString()),r.reject(e)):(e=j.requestError(t),G.error(e.toString()),r.reject(e))})):r.resolve(f.findWhere(t.components.getComponents(),{name:o}))}return r}().done(function(){g||n?t.applyReportParameters(n).then(O,S):A||_||t.updateComponent?t.fetchPageHtmlExportAndJiveComponents().then(O,S):T().then(e.resolve,e.reject)}).fail(e.reject)}function s(e,r,t,o){if(!1===t.view.setContainer(r.properties.container)){var n=j.containerNotFoundError(r.properties.container);return G.error(n.toString()),void e.reject(n)}t.renderReport().done(function(){o.set("_rendered",!0),e.resolve(t.view.$el[0])}).fail(function(r){var t=j.reportRender(r);G.error(t.toString()),e.reject(t)})}function i(e,r,t,o){if(o.get("_rendered"))t.view.applyScale(),e.resolve();else{var n=j.notYetRenderedError();G.error(n.toString()),e.reject(n)}}function a(e,r){r.cancelReportExecution().done(e.resolve).fail(function(r){var t=j.requestError(r);G.error(t.toString()),e.reject(t)})}function c(e,r){r.undoReportAction().done(e.resolve).fail(function(r){var t=j.requestError(r);G.error(t.toString()),e.reject(t)})}function p(e,r){r.undoAllReportAction().done(e.resolve).fail(function(r){var t=j.requestError(r);G.error(t.toString()),e.reject(t)})}function d(e,r){r.redoReportAction().done(e.resolve).fail(function(r){var t=j.requestError(r);G.error(t.toString()),e.reject(t)})}function u(e,r,t){r.destroy().done(function(){t.set("_destroyed",!0),e.resolve()}).fail(function(r){var t=j.requestError(r);G.error(t.toString()),e.reject(t)})}function l(e){return function(r,t,o,n){var s=new v.Deferred,i=t,a=o,c=n,p=r;f.isFunction(r)&&(p=void 0,i=r,a=t,c=o),i&&f.isFunction(i)&&s.done(i),a&&f.isFunction(a)&&s.fail(a),c&&f.isFunction(c)&&s.always(c);var d=p?h.validateObject(L,p):void 0;if(d){var u=j.validationError(d);G.error(u.toString()),s.reject(u)}else e.save(p).done(s.resolve).fail(function(e){var r,t=e&&e.responseText?JSON.parse(e.responseText):null;r=t&&t.result&&t.result.code&&t.result.msg?j.genericError(t.result.code,t.result.msg):j.requestError(e),G.error(r.toString()),s.reject(r)});return s}}function m(e,r){return function(t,o,n,s){var i,a,c;if(r.get("_destroyed"))c=j.alreadyDestroyedError(),G.error(c.toString()),i=(new v.Deferred).reject(c);else try{a=h.validateObject(N,t),a?(i=new v.Deferred,c=j.validationError(a),G.error(c.toString()),i.reject(c)):i=e.exportReport(t)}catch(e){i=new v.Deferred,c=j.javaScriptException(e),G.error(c.toString()),i.reject(c)}return i.done(o).fail(n).always(s),i}}function E(e,r,t){return function(o){var n,s,i;if(t.get("_destroyed"))i=j.alreadyDestroyedError(),G.error(i.toString()),n=(new v.Deferred).reject(i);else try{s=h.validateObject(b,o),s?(n=new v.Deferred,i=j.validationError(s),G.error(i.toString()),n.reject(i)):n=e.searchReportAction(o).then(function(e){var t=e;return r.searchActionExecutedSuccessfuly=!0,t.result&&t.result.actionResult&&t.result.actionResult.searchResults?t.result.actionResult.searchResults:[]})}catch(e){n=new v.Deferred,i=j.javaScriptException(e),G.error(i.toString()),n.reject(i)}return n}}function R(e,r){return function(){var t,o,n,s,i,a,c=this,p=v.Deferred();if(f.isString(arguments[0])?(i=arguments[0],t=arguments[1],o=arguments[2],n=arguments[3],s=arguments[4]):(t=arguments[0],i=t.id,o=arguments[1],n=arguments[2],s=arguments[3]),o&&f.isFunction(o)&&p.done(o),n&&f.isFunction(n)&&p.fail(n),s&&f.isFunction(s)&&p.always(s),r.get("_destroyed"))a=j.alreadyDestroyedError(),G.error(a.toString()),p.reject(a);else try{e.updateComponent={componentId:i,componentProps:t},c.run().always(function(){e.updateComponent=null}).fail(function(r){e.view.hideOverlay(),p.reject(r)}).done(function(){p.resolve(!f.isUndefined(i)&&f.findWhere(e.components.getComponents(),{name:i})||f.findWhere(e.components.getComponents(),{id:i}))})}catch(e){a=j.javaScriptException(e),G.error(a.toString()),p.reject(j.javaScriptException(e))}return p}}function g(e,r,t,o){return function(n){if(o.get("_destroyed"))throw j.alreadyDestroyedError();var s=this;return n&&f.isObject(n)&&f.keys(n).length?(f.each(e.events,function(e,o){f.isFunction(e)&&(o===H.CHANGE_TOTAL_PAGES?r.stopListening(t.model,"change:totalPages",e):o===H.CAN_REDO||o===H.CAN_UNDO?r.stopListening(t.stateStack,"change:position",e):o===H.REPORT_COMPLETED?r.stopListening(t,D.REPORT_COMPLETED,e):o===H.PAGE_FINAL?r.stopListening(t,D.PAGE_FINAL,e):o===H.BEFORE_RENDER?r.stopListening(t.view,D.BEFORE_RENDER,e):o===H.CHANGE_PAGES_STATE?r.stopListening(t,D.CURRENT_PAGE_CHANGED,e):o==H.BOOKMARKS_READY?r.stopListening(t.components,H.BOOKMARKS_READY,e):o==H.REPORTPARTS_READY&&r.stopListening(t.components,H.REPORTPARTS_READY,e))}),f.each(n,function(r,o){f.isFunction(r)&&(o===H.CHANGE_TOTAL_PAGES?e.events[o]=function(){r.call(s,t.model.get("totalPages"))}:o===H.CAN_UNDO?e.events[o]=function(){r.call(s,t.stateStack.get("canUndo"))}:o===H.CAN_REDO?e.events[o]=function(){r.call(s,t.stateStack.get("canRedo"))}:o===H.PAGE_FINAL?e.events[o]=function(e){r.call(s,e)}:o===H.REPORT_COMPLETED?e.events[o]=function(e,t){if(t)try{t="export"===t.source||"execution"===t.source?j.reportStatus(t):j.requestError(t)}catch(e){t=j.javaScriptException(e)}r.call(s,e,t)}:o===H.BEFORE_RENDER?e.events[o]=f.bind(r,s):o===H.CHANGE_PAGES_STATE?e.events[o]=f.bind(r,s):o==H.BOOKMARKS_READY?e.events[o]=function(e){e.length&&r.call(s,e)}:o==H.REPORTPARTS_READY&&(e.events[o]=function(e){e.length&&r.call(s,e)}))}),f.each(e.events,function(e,o){f.isFunction(e)&&(o===H.CHANGE_TOTAL_PAGES?r.listenTo(t.model,"change:totalPages",e):o===H.CAN_REDO?r.listenTo(t.stateStack,"change:canRedo",e):o===H.CAN_UNDO?r.listenTo(t.stateStack,"change:canUndo",e):o===H.PAGE_FINAL?r.listenTo(t,D.PAGE_FINAL,e):o===H.REPORT_COMPLETED?r.listenTo(t,D.REPORT_COMPLETED,e):o===H.BEFORE_RENDER?r.listenTo(t.view,D.BEFORE_RENDER,e):o===H.CHANGE_PAGES_STATE?r.listenTo(t,D.CURRENT_PAGE_CHANGED,e):o==H.BOOKMARKS_READY?r.listenTo(t.components,H.BOOKMARKS_READY,e):o==H.REPORTPARTS_READY&&r.listenTo(t.components,H.REPORTPARTS_READY,e))}),s):s}}var f=e("underscore"),v=e("jquery"),A=e("backbone"),h=e("runtime_dependencies/js-sdk/src/common/bi/component/util/biComponentUtil"),_=e("runtime_dependencies/js-sdk/src/common/bi/component/BiComponent"),C=e("runtime_dependencies/js-sdk/src/common/bi/error/enum/biComponentErrorCodes"),j=e("./error/biComponentErrorFactoryReportProxy"),T=e("./ReportController"),O=e("./model/ReportPropertiesModel"),P=e("./enum/reportOutputFormats"),S=e("./jive/enum/interactiveComponentTypes"),D=e("./enum/reportEvents"),y=e("runtime_dependencies/js-sdk/src/common/logging/logger"),x=e("json!./schema/Report.json"),N=e("json!./schema/ReportExport.json"),b=e("json!./schema/ReportSearch.json"),L=e("json!./schema/ReportSave.json"),w=e("json!./schema/Chart.json"),k=e("json!./schema/CrosstabDataColumn.json"),F=e("json!./schema/CrosstabRowGroup.json"),U=e("json!./schema/TableColumn.json"),G=y.register("Report"),I=f.keys(x.properties),B=["properties"],M=["data"],H={CHANGE_TOTAL_PAGES:"changeTotalPages",CHANGE_PAGES_STATE:"changePagesState",CAN_UNDO:"canUndo",CAN_REDO:"canRedo",BEFORE_RENDER:"beforeRender",PAGE_FINAL:"pageFinal",REPORT_COMPLETED:"reportCompleted",BOOKMARKS_READY:"bookmarksReady",REPORTPARTS_READY:"reportPartsReady"},Y={};Y[S.CHART]=w,Y[S.CROSSTAB_COLUMN]=k,Y[S.CROSSTAB_ROW]=F,Y[S.TABLE_COLUMN]=U;var q=function(e){e||(e={});var r=e.events,t={properties:f.extend({pages:1,autoresize:!0,chart:{},loadingOverlay:!0},e),data:{totalPages:void 0,components:[],links:[],bookmarks:[],reportParts:[]},searchActionExecutedSuccessfuly:!1,events:{}};delete t.properties.events;var o=new O(h.cloneDeep(t.properties));h.createInstancePropertiesAndFields(this,t,I,B,M,o);var v=new T(o),_=f.extend({},A.Events);v.view.$el.addClass("visualizejs _jr_report_container_ jr"),_.listenTo(v.model,"change:totalPages",function(){t.data.totalPages=v.model.get("totalPages")}),_.listenTo(v.components,"change add reset remove",function(){t.data.components=v.components.getComponents(),t.data.links=v.components.getLinks(),t.data.bookmarks=v.components.getBookmarks(),t.data.reportParts=v.components.getReportParts()}),f.extend(this,{validate:h.createValidateAction(t,x,o),run:h.createDeferredAction(n,o,t,v,!1,o),refresh:h.createDeferredAction(n,o,t,v,!0,o),render:h.createDeferredAction(s,o,t,v,o),resize:h.createDeferredAction(i,o,t,v,o),cancel:h.createDeferredAction(a,o,v),undo:h.createDeferredAction(c,o,v),undoAll:h.createDeferredAction(p,o,v),redo:h.createDeferredAction(d,o,v),search:E(v,t,o),save:l(v),destroy:h.createDeferredAction(u,o,v,o),export:m(v,o),updateComponent:R(v,o),events:g(t,_,v,o)}),this.events(r)};q.prototype=new _,f.extend(q,{exportFormats:["pdf","xlsx","xls","rtf","csv","xml","odt","ods","docx","pptx","json"],chart:{componentTypes:["chart"],types:w.properties.chartType.enum},table:{componentTypes:["tableColumn"],column:{types:["numeric","boolean","datetime","string","time"]}},crosstab:{componentTypes:["crosstabDataColumn","crosstabRowGroup"]}}),t.exports=q});