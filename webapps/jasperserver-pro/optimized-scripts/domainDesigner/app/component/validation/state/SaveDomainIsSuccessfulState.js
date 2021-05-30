/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../dispatcher/enum/applicationStateEventsEnum"],function(e,t,i){var r=e("underscore"),n=e("../../../dispatcher/enum/applicationStateEventsEnum"),s=function(e){this.initialize(e)};r.extend(s.prototype,{initialize:function(e){this.applicationDispatcherEventBus=e.applicationDispatcherEventBus,this.clientDomainValidationService=e.clientDomainValidationService,this.serverResourcePropertiesModelParser=e.serverResourcePropertiesModelParser,this.clientResourcePropertiesService=e.clientResourcePropertiesService},enter:function(e){var t=this._getResourcesContent(),i=this.serverResourcePropertiesModelParser.parse(e.response,t),r=this.clientDomainValidationService.getDesignerStateAfterSave();r.resourceProperties=i,this.applicationDispatcherEventBus.trigger(n.SAVE_SUCCESS,r)},_getResourcesContent:function(){var e,t,i=this.clientResourcePropertiesService.serializeToClientModel();return i.securityFile&&(e=i.securityFile.content),i.bundles&&(t=i.bundles.map(function(e){return e.content})),{bundlesContent:t,securityFileContent:e}}}),i.exports=s});