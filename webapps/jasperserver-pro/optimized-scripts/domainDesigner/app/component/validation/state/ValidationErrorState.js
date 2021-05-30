/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./enum/validationStateNameEnum"],function(e,t,A){var i=e("underscore"),n=e("./enum/validationStateNameEnum"),I=function(e){this.initialize(e)};i.extend(I.prototype,{initialize:function(e){},enter:function(e,t){e.initialState===n.INITIALIZE_DOMAIN_DESIGNER_STATE?t.enter(n.DOMAIN_DESIGNER_INITIAL_STATE_VALIDATION_ERROR_STATE,e):e.initialState===n.REPLACE_DATA_SOURCE_INITIAL_STATE?t.enter(n.REPLACE_DATA_SOURCE_VALIDATION_ERROR_STATE,e):e.initialState===n.SAVE_DOMAIN_INITIAL_VALIDATION_STATE&&t.enter(n.SAVE_DOMAIN_VALIDATION_ERROR_STATE,e)}}),A.exports=I});