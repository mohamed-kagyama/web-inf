/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./enum/validationStateNameEnum"],function(e,i,t){var n=e("underscore"),r=e("./enum/validationStateNameEnum"),o=function(e){this.initialize(e)};n.extend(o.prototype,{initialize:function(e){this.clientResourcePropertiesService=e.clientResourcePropertiesService},enter:function(e,i){this.clientResourcePropertiesService.isDomainSaved()?i.enter(r.UPLOAD_SCHEMA_SHOW_UPDATE_DOMAIN_WARNING_DIALOG_STATE,e):i.enter(r.UPLOAD_SCHEMA_CHECK_SCHEMA_TYPE_STATE,e)}}),t.exports=o});