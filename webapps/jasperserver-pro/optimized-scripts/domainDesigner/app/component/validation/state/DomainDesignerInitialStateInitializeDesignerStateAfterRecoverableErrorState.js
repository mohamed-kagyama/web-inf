/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./enum/validationStateNameEnum"],function(e,i,t){var n=e("underscore"),a=e("./enum/validationStateNameEnum"),o=function(e){this.initialize(e)};n.extend(o.prototype,{initialize:function(e){this.clientDomainInitialDesignerStateService=e.clientDomainInitialDesignerStateService,this.domainValidationMutations=e.domainValidationMutations},enter:function(e,i){var t=this,n=e.domainResource;return t.clientDomainInitialDesignerStateService.getInitialDesignerStateByDomainResource(n).then(function(n){t.domainValidationMutations.setDesignerState(n),i.enter(a.DOMAIN_VALIDATION_STATE,e)},function(t){e.xhr=t,i.enter(a.DOMAIN_DESIGNER_INITIAL_STATE_FAIL_STATE,e)})}}),t.exports=o});