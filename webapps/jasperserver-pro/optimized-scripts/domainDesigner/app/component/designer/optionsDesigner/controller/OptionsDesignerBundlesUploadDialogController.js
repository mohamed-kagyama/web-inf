/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","runtime_dependencies/js-sdk/src/common/util/base64","../../../../model/enum/subResourceTypesEnum","../../../../model/util/resourcePropertiesUtil","backbone","../../../../dispatcher/enum/applicationStateEventsEnum"],function(e,s,i){var l=e("underscore"),n=e("runtime_dependencies/js-sdk/src/common/util/base64"),o=e("../../../../model/enum/subResourceTypesEnum"),t=e("../../../../model/util/resourcePropertiesUtil"),a=e("backbone"),r=e("../../../../dispatcher/enum/applicationStateEventsEnum"),u=function(e){this.applicationDispatcherEventBus=e.applicationDispatcherEventBus,this.optionsDesignerEventBus=e.optionsDesignerEventBus,this.bundlesUploadDialog=e.bundlesUploadDialog,this.replaceBundlesDialog=e.replaceBundlesDialog,this.replaceBundlesDialogStore=e.replaceBundlesDialogStore,this.clientResourcePropertiesService=e.clientResourcePropertiesService,this._initEvents()};l.extend(u.prototype,a.Events,{_initEvents:function(){this.listenTo(this.optionsDesignerEventBus,"show:bundlesUploadDialog",this._onShowBundlesUploadDialog),this.listenTo(this.optionsDesignerEventBus,"replaceBundlesDialog:replaceBundles",this._onReplaceBundlesDialogReplaceBundles),this.listenTo(this.optionsDesignerEventBus,"replaceBundlesDialog:selectNewFiles",this._onReplaceBundlesDialogSelectNewFiles),this.listenTo(this.optionsDesignerEventBus,"replaceBundlesDialog:cancel",this._onReplaceBundlesDialogCancel),this.listenTo(this.bundlesUploadDialog,"add:fromRepository",this._onAddBundlesFromRepository),this.listenTo(this.bundlesUploadDialog,"add:localFiles",this._onAddBundlesFromFileSystem)},_onShowBundlesUploadDialog:function(){this.bundlesUploadDialog.open()},_onReplaceBundlesDialogReplaceBundles:function(e){this.replaceBundlesDialog.close(),e=this.clientResourcePropertiesService.replaceBundles(e),this.applicationDispatcherEventBus.trigger(r.OPTIONS_DESIGNER_REPLACE_BUNDLES,e)},_onReplaceBundlesDialogSelectNewFiles:function(){this.replaceBundlesDialog.close(),this.bundlesUploadDialog.open()},_onReplaceBundlesDialogCancel:function(){this.replaceBundlesDialog.close()},_onAddBundlesFromRepository:function(e){var s=this._getBundlesByRepositoryFilesUris(e);this._addBundlesOrShowWarningDialogIfDuplicatesExist(s)},_getBundlesByRepositoryFilesUris:function(e){return e.map(function(e){var s=t.parseFileNameFromUrl(e),i=t.getBundleLocaleNameFromFileName(s),l=t.parseBundleLabelFromUrl(e,i);return{uri:e,type:o.FILE_REFERENCE,locale:i,label:l}})},_onAddBundlesFromFileSystem:function(e){e=this._getBundlesByBundleLocalFiles(e),this._addBundlesOrShowWarningDialogIfDuplicatesExist(e)},_getBundlesByBundleLocalFiles:function(e){return e.map(function(e){var s=t.getBundleLocaleNameFromFileName(e.name),i=t.parseBundleLabelFromFileName(e.name,s);return{content:{raw:e.content,base64:n.encode(e.content)},type:o.FILE,locale:s,label:i}})},_addBundlesOrShowWarningDialogIfDuplicatesExist:function(e){this.clientResourcePropertiesService.isAnyDuplicateBundles(e)?(this.replaceBundlesDialogStore.set("bundles",e),this.replaceBundlesDialog.open()):this.applicationDispatcherEventBus.trigger(r.OPTIONS_DESIGNER_ADD_BUNDLES,e)}}),i.exports=u});