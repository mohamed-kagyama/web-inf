/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone","../util/metadataDesignerUtil"],function(e,t,n){var s=e("underscore"),i=e("backbone"),o=e("../util/metadataDesignerUtil"),r=function(e){this.initialize(e)};s.extend(r.prototype,i.Events,{initialize:function(e){this.swapButtonsStore=e.swapButtonsStore,this.storeChangeEventBus=e.storeChangeEventBus,this._initEvents()},_initEvents:function(){this.listenTo(this.storeChangeEventBus,"change",this._onStoreChange)},_onStoreChange:function(e){var t=o.getCurrentResource(e),n=t&&t.resourceId,s=o.getCurrentSelection(e),i=s.sourceTree[n]||[],r=s.resultTree[n]||[];this.swapButtonsStore.set({isMoveToResultButtonDisabled:0===i.length,isMoveToSourceButtonDisabled:0===r.length})}}),n.exports=r});