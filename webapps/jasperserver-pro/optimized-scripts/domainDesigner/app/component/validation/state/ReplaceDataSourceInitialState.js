/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./enum/validationStateNameEnum"],function(e,t,i){var n=e("underscore"),a=e("./enum/validationStateNameEnum"),r=function(e){this.initialize(e)};n.extend(r.prototype,{initialize:function(e){this.domainValidationMutations=e.domainValidationMutations,this.clientCurrentDesignerStateService=e.clientCurrentDesignerStateService},enter:function(e,t){var i=this.clientCurrentDesignerStateService.getDesignerState();this.domainValidationMutations.setDesignerState(i),t.enter(a.SELECT_DATA_SOURCE_STATE,e)}}),i.exports=r});