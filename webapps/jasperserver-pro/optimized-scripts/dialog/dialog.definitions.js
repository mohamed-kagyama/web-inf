/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","prototype","jquery","runtime_dependencies/js-sdk/src/jrs.configs","runtime_dependencies/jrs-ui/src/namespace/namespace","runtime_dependencies/jrs-ui/src/util/utils.common","underscore","runtime_dependencies/jrs-ui/src/dynamicTree/dynamicTree.utils","runtime_dependencies/jrs-ui/src/core/core.layout","runtime_dependencies/jrs-ui/src/components/components.dialogs"],function(e,t,r){var o=e("prototype"),i=(o.$,e("jquery")),n=e("runtime_dependencies/js-sdk/src/jrs.configs"),a=e("runtime_dependencies/jrs-ui/src/namespace/namespace"),s=a.JRS,l=e("runtime_dependencies/jrs-ui/src/util/utils.common"),d=l.disableSelectionWithoutCursorStyle,c=l.enableSelection,p=e("underscore"),u=e("runtime_dependencies/jrs-ui/src/dynamicTree/dynamicTree.utils"),h=e("runtime_dependencies/jrs-ui/src/core/core.layout"),f=e("runtime_dependencies/jrs-ui/src/components/components.dialogs");s.ViewQueryDialog=function(e){var t=function(t){this.template=e(t.id),this.selectionContainer=t.selectionContainer,this.updateContent(t.content)};return t.fn=t.prototype,t.fn.close=function(){d(this.selectionContainer),this.unregisterEvents(),f.popup.hide(this.template.get(0))},t.fn.show=function(){c(this.selectionContainer),f.popup.show(this.template.get(0)),this.registerEvents()},t.fn.updateContent=function(t){e(".content .body textarea",this.template).text(t||"")},t.fn._eventsAreRegistered=!1,t.fn.registerEvents=function(){!0!==this._eventsAreRegistered&&(e(".button",this.template).on("click",e.proxy(this.close,this)),this._eventsAreRegistered=!0)},t.fn.unregisterEvents=function(){!1!==this._eventsAreRegistered&&(e(".button",this.template).off("click"),this._eventsAreRegistered=!1)},t}(i),s.SaveAsDialog=function(e,t){return function(r){function o(e){var t;for(var r in u)u.hasOwnProperty(r)&&(e[r]=u[r].val());m&&(t=m.getSelectedNode(),t?(e.folder=t.param.uri,e.isFolderWritable=!t.param.extra||t.param.extra.isWritable):e.folder=null),g&&(t=g.getSelectedNode(),t?(e.reportFolder=t.param.uri,e.isReportFolderWritable=!t.param.extra||t.param.extra.isWritable):e.reportFolder=null)}function i(e){e.stopPropagation(),o(h),l.prepareState&&l.prepareState(h),l.validator(h)&&l.saveHandler(h).then(function(){d.close()})}function n(e){e.stopPropagation(),d.close()}function a(e){var r=e.attr("id"),o=t.createRepositoryTree(r,{providerId:"adhocRepositoryTreeFoldersProvider",rootUri:"/",organizationId:l.organizationId,publicFolderUri:l.publicFolderUri,urlGetNode:"flow.html?_flowId=adhocTreeFlow&method=getNode",urlGetChildren:"flow.html?_flowId=adhocTreeFlow&method=getChildren",treeErrorHandlerFn:function(){}}),i=o.modifyRootObject;return o.modifyRootObject=function(e,t,r,n){for(var a=t?e:e.children,s=0,l=a.length;s<l;s++)a[s].extra.isWritable||(a[s].cssClass="readonly"),a[s].children&&o.modifyRootObject(a[s],!1,a[s],!0);if(t?e=a:e.children=a,!n)return i.call(this,e,t,r)},o}var s={templateMatcher:"#saveAs",insertAfterMatcher:"#frame",cloneTemplate:!1,elementId:null,okButtonMatcher:".saveButton",cancelButtonMatcher:".cancelButton",inputMatchers:{name:".resourceName",description:".resourceDescription"},foldersTreeMatcher:"#saveDataViewFoldersTree",reportFoldersTreeMatcher:"#saveReportFoldersTree",organizationId:"",publicFolderUri:"/public",grabKeydownEvents:!0,validator:function(e){return!0},saveHandler:function(t){var r=e.Deferred();return r.resolve(),r}},l=e.extend({},s,r),d=this,c=function(t){var r=e(t.templateMatcher);return l.cloneTemplate&&(r=r.clone()),l.cloneTemplate&&l.elementId&&r.attr("id",t.elementId),e(l.insertAfterMatcher).append(r),r.on("keydown",function(e){l.grabKeydownEvents&&e.stopPropagation(),e.keyCode==Event.KEY_ESC&&d.close()}),r}(l);this.dialogElement=c;var u=function(e,t){var r={};for(var o in t.inputMatchers)t.inputMatchers.hasOwnProperty(o)&&(r[o]=e.find(t.inputMatchers[o]));return r}(c,l);this.inputElements=u;var h={folder:null,isFolderWritable:!1,reportFolder:null,isReportFolderWritable:!1},m=null,g=null,v=c.find(l.foldersTreeMatcher),_=c.find(l.reportFoldersTreeMatcher);this.foldersTree=v,this.reportFoldersTree=_,this.open=function(t){h=t,f.popup.show(c.get(0));for(var r in u)if(u.hasOwnProperty(r)){var o=u[r],s=h[r];if(o[0]&&"SELECT"===o[0].tagName.toUpperCase()&&p.isArray(s)){o.empty();var d;p.each(s,function(e){d=new Option(e.label,e.id),d.id=e.id,o.append(d)})}else o.val(h[r])}c.find(l.okButtonMatcher).click(i),c.find(l.cancelButtonMatcher).click(n);var T=e.Deferred(),y=h.folder&&h.reportFolder?0:1;return h.folder&&(m=a(v),m.showTreePrefetchNodes(h.folder,function(){y++,h.folder&&m.openAndSelectNode(h.folder),2===y&&T.resolve()})),h.reportFolder&&_.length>0&&(g=a(_),g.showTreePrefetchNodes(h.reportFolder,function(){y++,g.openAndSelectNode(h.reportFolder),2===y&&T.resolve()})),T},this.close=function(){c.find(l.okButtonMatcher).off("click",i),c.find(l.cancelButtonMatcher).off("click",n),f.popup.hide(c.get(0))}}}(i,u),s.RepositorySelectionDialog=function(e,t){var r={idsPrefix:"repSelDialog_",templateMatcher:"#repositorySelectionDialog",insertAfterMatcher:"#frame",okButtonMatcher:".okButton",cancelButtonMatcher:".cancelButton",repositoryTreeMatcher:"ul.repositoryTree",organizationId:"",publicFolderUri:"/public",treeFlowId:"treeFlow",treeProviderId:"repositoryExplorerTreeFoldersProvider",uriOnCancel:null,selectionValidationMessage:"Item not selected",acceptOnlyLeaf:!0,okHandler:function(t){var r=e.Deferred();return r.resolve(),r}};return function(o){function i(t){var r=e(t.templateMatcher).clone();return s.elementId&&r.attr("id",t.elementId),e(s.insertAfterMatcher).append(r),r}function n(e){e.stopPropagation();var t=l._repositoryTree.getSelectedNode();if(!t||s.acceptOnlyLeaf&&t.isParent())return void alert(s.selectionValidationMessage);var r=s.okHandler(t.param.uri);r?r.then(function(){l.close()}):l.close()}function a(e){e.stopPropagation(),l.close(),s.uriOnCancel&&(document.location=s.uriOnCancel)}var s=e.extend({},r,o),l=this;this._createRepositoryTree=function(){var e=s.idsPrefix+"repTree";return this.$repositoryTree.attr("id",e),t.createRepositoryTree(e,{providerId:s.treeProviderId,rootUri:"/",organizationId:s.organizationId,publicFolderUri:s.publicFolderUri,urlGetNode:"flow.html?_flowId="+s.treeFlowId+"&method=getNode",urlGetChildren:"flow.html?_flowId="+s.treeFlowId+"&method=getChildren",treeErrorHandlerFn:function(){}})},this.init=function(){this.$dialogElement=i(s),this.$repositoryTree=this.$dialogElement.find(s.repositoryTreeMatcher),this.$dialogElement.find(s.okButtonMatcher).click(n),this.$dialogElement.find(s.cancelButtonMatcher).click(a)},this.open=function(){function t(e){if(e.isParent())for(var r=0;r<e.childs.length;r++)t(e.childs[r]);else"com.jaspersoft.ji.adhoc.AdhocDataView"===e.param.type&&(e.param.cssClass="adhocDataView",e.refreshStyle())}f.popup.show(this.$dialogElement.get(0),!0),this._repositoryTree=this._createRepositoryTree();var r=e.Deferred();return this._repositoryTree.observe("children:loaded",function(e){e.memo.nodes.each(function(e){t(e)})}),this._repositoryTree.showTreePrefetchNodes("/",function(){l._repositoryTree.openAndSelectNode("/"),r.resolve()}),this._repositoryTree.observe("leaf:dblclick",n),r},this.close=function(){f.popup.hide(this.$dialogElement.get(0))},this.init()}}(i,u),s.GeneratorPropertiesDialog=function(e,t){function r(e){return u.createRepositoryTree(e.treeId,{providerId:e.treeProviderId,rootUri:"/",organizationId:e.organizationId,publicFolderUri:e.publicFolderUri,urlGetNode:"flow.html?_flowId="+e.treeFlowId+"&method=getNode",urlGetChildren:"flow.html?_flowId="+e.treeFlowId+"&method=getChildren",treeErrorHandlerFn:function(){}})}var o={id:"reportGeneratorProperties",treeId:"advLocationTree",treeFlowId:"adhocTreeFlow",treeProviderId:"adhocDataViewsTreeDataProvider",organizationId:t.organizationId,publicFolderUri:t.publicFolderUri,advUri:void 0,reportGenerators:null,messages:{}},n=function n(a){this.opts=i.extend({},o,a),this.template=e("#"+this.opts.id),this.customGenerators=t.commonReportGeneratorsMetadata||[],p.isUndefined(this.opts.advUri)?(e("#advTreePanel").removeClass(h.HIDDEN_CLASS),e("#reportGeneratorProperties").addClass(n.WITH_TREE_CLASS),this._tree=r(this.opts)):e("#reportGeneratorProperties").removeClass(n.WITH_TREE_CLASS),this._generatorSelect=new s.generatorSelect({id:"commonGeneratorSelect",parent:this.template.get(0),reportGenerators:this.customGenerators})};n.WITH_TREE_CLASS="withTree",n.NO_GENERATORS_CLASS=h.NO_GENERATORS_CLASS,n.fn=n.prototype,n.fn.show=function(){c(this.selectionContainer),0===this.customGenerators.length&&this.template.addClass(n.NO_GENERATORS_CLASS),f.popup.show(this.template.get(0),!0),this.registerEvents();var e=a();e&&(e.template?this._generatorSelect.val(e.template,"TEMPLATE"):e.generator&&this._generatorSelect.val(e.generator,"GENERATOR"));var t=e&&e.sourceURI?e.sourceURI:"/",r=this._tree;r&&r.showTreePrefetchNodes(t,function(){e&&r.openAndSelectNode(t)})};var a=n.fn.store=function(e){var t=window.localStorage;if(!t)return null;if(!e){var r=t.getItem("reportGenerator");return r?JSON.parse(r):null}t.setItem("reportGenerator",JSON.stringify(e))},l=n.fn.ok=function(){var e=this.getValue();p.isUndefined(e.sourceURI)?alert(this.getMessage("advNotSelected")):p.isEmpty(e.template)&&"TEMPLATE"===this._generatorSelect.state?alert(this.getMessage("templateNotSelected")):(a(e),this.opts.okHandler&&this.opts.okHandler(e),this.close())},m=n.fn.close=function(){return this.unregisterEvents(),d(this.selectionContainer),f.popup.hide(this.template.get(0)),this};return n.fn.getMessage=function(e){return this.opts.messages[e]},n.fn.getValue=function(){var e=this.opts.advUri;if(p.isUndefined(e)){var t=this._tree.getSelectedNode();t&&"com.jaspersoft.ji.adhoc.AdhocDataView"==t.param.type&&(e=t.param.uri)}var r={sourceURI:e};return"TEMPLATE"===this._generatorSelect.state&&(r.template=this._generatorSelect.val()),"GENERATOR"===this._generatorSelect.state&&(r.generator=this._generatorSelect.val()),r},n.fn._eventsAreRegistered=!1,n.fn.registerEvents=function(){!0!==this._eventsAreRegistered&&(e("#reportGeneratorPropertiesBtnOk",this.template).on("click",e.proxy(l,this)),e("#reportGeneratorPropertiesBtnCancel",this.template).on("click",e.proxy(m,this)),this._eventsAreRegistered=!0)},n.fn.unregisterEvents=function(){!1!==this._eventsAreRegistered&&(e("#reportGeneratorPropertiesBtnOk",this.template).off("click"),e("#reportGeneratorPropertiesBtnCancel",this.template).off("click"),this._eventsAreRegistered=!1)},n}(i,n),s.generatorSelect=function(e,t,r){function o(t){return e("#"+t.options.id)}function n(t){t._radios=e("#"+t.options.id+" input[type="+S+"]").get();var r=t._radios.length;t._inputs=new Array(r);for(var o=0;o<r;o++){var i=t._radios[o].id,n=i.replace(T(S),""),a=e("#"+n);a.length>0&&(t._inputs[o]=a[0])}}function a(e){e.StateContract={},e._states=new Array(e._radios.length);var r=0;for(var o in w.StateContractPrototype){var i=t.clone(w.StateContractPrototype[o],!0);i.index=r,e.StateContract[o]=i,e._states[r]=o,r++}}function l(r,o){var i=r.StateContract.GENERATOR,n=e(r._inputs[i.index]);o&&o.length>0?(n.parents("li").removeClass("hidden"),t.each(o,function(t){n.append(e("<option></option>").val(t.id).text(t.label))})):n.parents("li").addClass("hidden")}function d(e){e.template.on("click",function(t){c(t.target)?e.refresh():p(t.target)&&u(t.target)&&_(e)})}function c(e){return e.type?"radio"===e.type:e.control&&"radio"==e.control.type}function p(e){return e.type&&"button"==e.type||"SPAN"===e.tagName&&"button"==e.parentNode.type}function u(t){var r;return!!t&&(r=e(t).closest("button"),0!==r.length&&!1===r[0].disabled)}function h(t){e(t).attr("checked","checked")}function f(t){t=e(t);var r=t.parent();t.attr("disabled","disabled"),r.find("button").attr("disabled","disabled")}function m(t){t=e(t);var r=t.parent();t.attr("disabled",null),r.find("button").attr("disabled",null)}function g(t,r){e(t).val(r)}function v(t){return e(t).val()}function _(e){var t=e.StateContract[e.state],r=e._inputs[t.index];e._dialog||(e._dialog=new s.TemplateDialog({id:e.options.id+"TemplateDialog",parent:e.options.parent,okHandler:function(e){g(r,e)}})),e._dialog&&e._dialog.show(v(r))}function T(e){return e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()}var y={id:"generatorSelect",defaultRadioIdPrefix:"DefaultTemplateRadio",customTemplateRadioIdPrefix:"CustomTemplateRadio",customGeneratorRadioIdPrefix:"CustomGeneratorRadio",reportGenerators:[{id:"custom",label:"Custom"}],treeId:"templateLocationTree",treeFlowId:"adhocTreeFlow",treeProviderId:"templateTreeDataProvider",organizationId:r.organizationId,publicFolderUri:r.publicFolderUri},S="radio",w=function(e){this.StateContract={},this.options=i.extend({},y,e),this.template=o(this),this.state="DEFAULT",n(this),a(this),l(this,this.options.reportGenerators),d(this),this.refresh()};return w.fn=w.prototype,w.StateContractPrototype={DEFAULT:{index:0},TEMPLATE:{index:1},GENERATOR:{index:2}},w.fn.val=function(e,r){var o=this.StateContract[this.state];if(!t.isString(e))return v(this._inputs[o.index]);t.isString(r)&&t.has(this.StateContract,r)&&(o=this.StateContract[r]),h(this._radios[o.index]),g(this._inputs[o.index],e),this.refresh()},w.fn.refresh=function(){for(var e=0;e<this._radios.length;e++)this._radios[e].checked?(m(this._inputs[e]),this.state=this._states[e]):f(this._inputs[e])},w.fn.hide=function(){this.template.addClass("hidden")},w.fn.show=function(){this.template.removeClass("hidden")},w}(i,window._,n),s.TemplateDialog=function(e,t){function r(e){return u.createRepositoryTree(e.treeId,{providerId:e.treeProviderId,rootUri:"/",organizationId:e.organizationId,publicFolderUri:e.publicFolderUri,urlGetNode:"flow.html?_flowId="+e.treeFlowId+"&method=getNode",urlGetChildren:"flow.html?_flowId="+e.treeFlowId+"&method=getChildren",treeErrorHandlerFn:function(){}})}var o=function(){return{treeId:"TemplateTree",treeFlowId:"adhocTreeFlow",treeProviderId:"templateTreeDataProvider",organizationId:t.organizationId,publicFolderUri:t.publicFolderUri,defaultTemplateUri:t.defaultTemplateUri}},n=function(t){this.opts=i.extend({},o(),t),this.opts.treeId=this.opts.id+"Tree",this.template=e("#"+this.opts.id),this._tree=r(this.opts)};n.fn=n.prototype,n.fn.show=function(e){f.childPopup.show(this.template.get(0),!0,this.opts.parent),this.registerEvents();var t=this.opts.defaultTemplateUri||"/",r=this._tree;r.showTreePrefetchNodes(e||t,function(){r.openAndSelectNode(e||t)})};var a=n.fn.ok=function(){var e=this._tree.getSelectedNode();e&&"com.jaspersoft.jasperserver.api.metadata.common.domain.FileResource"===e.param.type&&(this.opts.okHandler&&this.opts.okHandler(e.param.uri),this.close())},s=n.fn.close=function(){return d(this.selectionContainer),this.unregisterEvents(),f.childPopup.hide(this.template.get(0)),this};return n.fn._eventsAreRegistered=!1,n.fn.registerEvents=function(){!0!==this._eventsAreRegistered&&(e("#"+this.opts.id+"OkTemplate",this.template).on("click",e.proxy(a,this)),e("#"+this.opts.id+"CloseTemplate",this.template).on("click",e.proxy(s,this)),this._eventsAreRegistered=!0)},n.fn.unregisterEvents=function(){!1!==this._eventsAreRegistered&&(e("#"+this.opts.id+"OkTemplate",this.template).off("click"),e("#"+this.opts.id+"CloseTemplate",this.template).off("click"),this._eventsAreRegistered=!1)},n}(i,n);var m=s.RepositorySelectionDialog,g=s.ViewQueryDialog,v=s.SaveAsDialog,_=s.GeneratorPropertiesDialog,T=s.generatorSelect,y=s.TemplateDialog;t.RepositorySelectionDialog=m,t.ViewQueryDialog=g,t.SaveAsDialog=v,t.GeneratorPropertiesDialog=_,t.generatorSelect=T,t.TemplateDialog=y});