/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../model/enum/canvasViewDesignersEnum","./enum/validationStateNameEnum"],function(e,i,n){var t=e("underscore"),a=e("../../../model/enum/canvasViewDesignersEnum"),o=e("./enum/validationStateNameEnum"),r=function(e){this.initialize(e)};t.extend(r.prototype,{initialize:function(e){this.clientDomainValidationService=e.clientDomainValidationService},enter:function(e,i){e.initialState===o.INITIALIZE_DOMAIN_DESIGNER_STATE?e.domainDesignerState=this.clientDomainValidationService.getDesignerStateAfterValidation({currentDesigner:a.PRESENTATION_DESIGNER}):e.domainDesignerState=this.clientDomainValidationService.getDesignerStateAfterValidation(),i.enter(o.SET_DOMAIN_DESIGNER_STATE_STATE,e)}}),n.exports=r});