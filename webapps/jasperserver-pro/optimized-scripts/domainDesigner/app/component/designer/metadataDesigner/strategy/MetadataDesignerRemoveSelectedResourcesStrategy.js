/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,t){var i=e("underscore"),o=function(e){this.initialize(e)};i.extend(o.prototype,{initialize:function(e){this.metadataDesignerDispatcherActionNameProvider=e.metadataDesignerDispatcherActionNameProvider,this.applicationDispatcherEventBus=e.applicationDispatcherEventBus,this.sourceTreeSelectionProvider=e.sourceTreeSelectionProvider,this.resourcesParentIdProvider=e.resourcesParentIdProvider},execute:function(e){var r=e.type,t=e.resources,o=this.metadataDesignerDispatcherActionNameProvider.getRemoveEventByResourceType(r),n=this.resourcesParentIdProvider.getParentId();this.applicationDispatcherEventBus.trigger(o,{ids:i.map(t,function(e){return e.id}),parentId:n,sourceTreeSelection:this.sourceTreeSelectionProvider.getSelection(t),resultTreeSelection:[]})}}),t.exports=o});