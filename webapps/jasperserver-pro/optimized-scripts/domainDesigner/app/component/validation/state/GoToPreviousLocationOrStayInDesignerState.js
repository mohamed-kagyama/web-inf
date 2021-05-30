/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./enum/validationStateNameEnum"],function(e,t,n){var i=e("underscore"),r=e("./enum/validationStateNameEnum"),a=function(e){this.initialize(e)};i.extend(a.prototype,{initialize:function(e){this.clientCurrentDesignerStateService=e.clientCurrentDesignerStateService},enter:function(e,t){this.clientCurrentDesignerStateService.doesCurrentDesignerStateContainsDataSources()&&!e.isAnyEncryptedProfileAttributes||t.enter(r.GOTO_PREVIOUS_LOCATION_STATE,e)}}),n.exports=a});