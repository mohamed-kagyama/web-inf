/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","prototype","jquery","./report.view.runtime","runtime_dependencies/jrs-ui/src/components/components.dialogs","runtime_dependencies/jrs-ui/src/core/core.ajax","../core/core.ajax.utils","runtime_dependencies/js-sdk/src/common/component/dialog/ConfirmationDialog","runtime_dependencies/jrs-ui/src/core/core.events.bis","runtime_dependencies/jrs-ui/src/dynamicTree/dynamicTree.utils"],function(e,r,t){function o(e,r){function t(e){var r=a(e.templateMatcher);return p.cloneTemplate&&(r=this.dialogElement.clone()),p.elementId&&r.attr("id",e.elementId),a(p.insertAfterMatcher).append(r),r}function o(e){e.name=m.find(p.nameInputMatcher).val(),e.description=m.find(p.descriptionInputMatcher).val();var r=h.getSelectedNode();e.folder=r?r.param.uri:null}function n(e){return e.name?!!e.folder||(alert(i.getMessage("jasper.report.view.save.missing.folder")),!1):(alert(i.getMessage("jasper.report.view.save.missing.name")),!1)}function s(e){o(v),n(v)&&r(v).then(function(){e.stopPropagation(),f.close()})}function l(e){e.stopPropagation(),f.close()}function u(){var e=w.createRepositoryTree(p.foldersTreeId,{providerId:"adhocRepositoryTreeFoldersProvider",rootUri:"/",organizationId:i.organizationId,publicFolderUri:i.publicFolderUri,urlGetNode:"flow.html?_flowId=adhocTreeFlow&method=getNode",urlGetChildren:"flow.html?_flowId=adhocTreeFlow&method=getChildren",treeErrorHandlerFn:function(){}}),r=e.modifyRootObject,t=e.modifyRootObject=function(e,o,n,s){for(var a=o?e:e.children,i=0,c=a.length;i<c;i++)a[i].extra.isWritable||(a[i].cssClass="readonly"),a[i].children&&t(a[i],!1,a[i],!0);if(o?e=a:e.children=a,!s)return r.call(this,e,o,n)};return e}var d={templateMatcher:"#saveAs",insertAfterMatcher:"#frame",cloneTemplate:!1,elementId:null,okButtonMatcher:"#saveAsBtnSave",cancelButtonMatcher:"#saveAsBtnCancel",nameInputMatcher:"#saveAsInputName",descriptionInputMatcher:"#saveAsInputDescription",foldersTreeId:"saveAsFoldersTree"},p=a.extend({},d,e),f=this,m=null,v={folder:null,name:null,description:null},h=null;this.open=function(e){e.folder||(e.folder="/"),m=t(p),c.popup.show(m.get(0)),m.find(p.nameInputMatcher).val(e.name),m.find(p.descriptionInputMatcher).val(e.description),m.find(p.nameInputMatcher).focus(),m.find(p.okButtonMatcher).click(s),m.find(p.cancelButtonMatcher).click(l),h=u(),h.observe("node:selected",function(e){try{m.find(p.okButtonMatcher)[0].disabled=!e.memo.node.param.extra.isWritable}catch(e){m.find(p.okButtonMatcher)[0].disabled=!0,console&&console.log("report.view[this.open] - "+e)}}),h.showTreePrefetchNodes(e.folder,function(){h.openAndSelectNode(e.folder)})},this.close=function(){m.find(p.okButtonMatcher).off("click",s),m.find(p.cancelButtonMatcher).off("click",l),c.popup.hide(m.get(0))}}var n=e("prototype"),s=n.$,a=e("jquery"),i=e("./report.view.runtime"),c=e("runtime_dependencies/jrs-ui/src/components/components.dialogs"),l=e("runtime_dependencies/jrs-ui/src/core/core.ajax"),u=l.isValidJsonResponse,d=l.AjaxRequester,p=l.ajaxTargettedUpdate,f=l.appendPostData,m=e("../core/core.ajax.utils"),v=m.baseErrorHandler,h=e("runtime_dependencies/js-sdk/src/common/component/dialog/ConfirmationDialog"),g=e("runtime_dependencies/jrs-ui/src/core/core.events.bis"),w=e("runtime_dependencies/jrs-ui/src/dynamicTree/dynamicTree.utils");i.jsonErrorHandler=function(e){if(!u(e)){return v(e)||alert("Unexpected response"),!0}return!1},i.save=function(){if(i.isUriTmp(i.reportUnitURI))return i.saveAs();var e={_flowExecutionKey:i.reportExecutionKey(),_eventId:"saveReport"};i.newIcOrder&&(e.inputControlOrder=i.newIcOrder);var r="flow.html?"+Object.toQueryString(e),t={mode:d.prototype.EVAL_JSON,errorHandler:i.jsonErrorHandler,callback:function(e){e.flowExecutionKey&&(i.flowExecutionKeyOutput=e.flowExecutionKey),e.response&&"success"==e.response.status?c.systemConfirm.show(i.getMessage(e.response.msg),5e3):e.response&&"failure"==e.response.status&&(i.newIcOrder?c.systemConfirm.show(i.getMessage(e.response.msg),5e3):"cluster.exception.session.attribute.missing.popup"==e.response.msg?c.clusterErrorPopup.show(e.response.msg):c.errorPopup.show(i.getMessage(e.response.msg))),i.savedState=window.jasperreports.reportviewertoolbar.currentState(),i.snapshotSaveStatus=null,i.newIcOrder=!1}};p(r,t)},i.doSaveAs=function(e,r){var t={_flowExecutionKey:i.reportExecutionKey(),_eventId:"saveReportAs",folder:e.folder,name:e.name,description:e.description,overwrite:r};i.newIcOrder&&(t.inputControlOrder=i.newIcOrder);var o={mode:d.prototype.EVAL_JSON,postData:f("",t),errorHandler:i.jsonErrorHandler,callback:function(r){switch(r.response.status){case"success":r.flowExecutionKey&&(i.flowExecutionKeyOutput=r.flowExecutionKey);var t=i.reportLabel;i.reportUnitURI=r.response.copyURI,i.reportLabel=e.name,i.reportDescription=e.description,document.title=i.replaceSingleOccurrence(document.title,t,i.reportLabel),a("#reportViewFrame .title").each(function(e,r){var o=a(r),n=o.html(),s=i.replaceSingleOccurrence(n,t,i.reportLabel);s!=n&&o.text(s)}),g.disable("undo"),g.disable("redo"),g.disable("undoAll"),c.systemConfirm.show(i.getMessage(r.response.msg),5e3),i.savedState=window.jasperreports.reportviewertoolbar.currentState(),i.snapshotSaveStatus=null,i.newIcOrder&&(i.newIcOrder=!1);break;case"failure":"cluster.exception.session.attribute.missing.popup"==r.response.msg?c.clusterErrorPopup.show(r.response.msg):c.errorPopup.show(i.getMessage(r.response.msg));break;case"confirmOverwrite":var o=new h({text:i.getMessage(r.response.msg)});o.on("button:yes",function(){i.doSaveAs(e,!0),o.remove()}),o.on("button:no",function(){o.remove()}),o.open()}}};p("flow.html",o)},i.replaceSingleOccurrence=function(e,r,t){var o=e.indexOf(r);return o<0||e.indexOf(r,o+1)>=0?e:e.replace(r,t)},i.uriToParts=function(e){var r={name:null,folder:null},t=e.lastIndexOf("/");return t<0?r.name=e:1==t?(r.folder="/",r.name=e.substring(1)):(r.folder=e.substring(0,t),r.name=e.substring(t+1)),r},i.uriToFolder=function(e){var r=e.lastIndexOf("/");return r<0?null:1==r?"/":e.substring(0,r)},i.isUriTmp=function(e){return 0===e.indexOf(i.tempFolderUri)},i.saveAs=function(){void 0===i.saveAsDialog&&(i.saveAsDialog=new o({},function(e){i.doSaveAs(e,!1);var r=a.Deferred();return r.resolve(),r}));var e=i.reportUnitURI;i.isUriTmp(e)&&i.allRequestParameters&&i.allRequestParameters.advUri&&i.allRequestParameters.advUri[0]&&(e=i.allRequestParameters.advUri[0]);var r={name:i.reportLabel,folder:i.uriToFolder(e),description:i.reportDescription};i.saveAsDialog.open(r)},i.refreshSave=function(){var e=null!=i.lastPageIndex;e?g.enable(s("fileOptions")):g.disable(s("fileOptions")),e&&"NEW"==i.snapshotSaveStatus&&!i.snapshotSaved&&(i.snapshotSaveStatus=null,i.snapshotSaved=!0,window.setTimeout(i.autoSaveSnapshot,200))},i.confirmExit=function(){return i.reportRunning?confirm(i.getMessage("jasper.report.view.in.progress.confirm.leave")):!(i.savedState&&i.savedState!=window.jasperreports.reportviewertoolbar.currentState()||null!=i.lastPageIndex&&"UPDATED"==i.snapshotSaveStatus)||confirm(i.getMessage("jasper.report.view.confirmLeave"))},i.reportRefreshedOrig=i.reportRefreshed,i.reportRefreshed=function(){i.reportRefreshedOrig(),i.savedState||(i.savedState=window.jasperreports.reportviewertoolbar.currentState())},i.autoSaveSnapshot=function(){var e={_flowExecutionKey:i.reportExecutionKey(),_eventId:"saveReportDataSnapshot"},r="flow.html?"+Object.toQueryString(e),t={mode:d.prototype.EVAL_JSON,silent:!0,errorHandler:function(e){return!u(e)},callback:function(e){e.flowExecutionKey&&(i.flowExecutionKeyOutput=e.flowExecutionKey)}};p(r,t)},t.exports=i});