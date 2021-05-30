/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../rest/errorHandling/errorHandlingUtil","../../../rest/enum/requestCanceledEnum","./enum/validationStateNameEnum"],function(e,r,i){var n=e("underscore"),t=e("../../../rest/errorHandling/errorHandlingUtil"),a=e("../../../rest/enum/requestCanceledEnum"),o=e("./enum/validationStateNameEnum"),d=function(e){this.initialize(e)};n.extend(d.prototype,{initialize:function(e){this.dataSourceInvalidValidationErrorSpecification=e.dataSourceInvalidValidationErrorSpecification},enter:function(e,r){var i=e.error;if(delete e.error,i!==a.CANCELED){var n=t.getErrors(i);e.errors=n;this.dataSourceInvalidValidationErrorSpecification.isSatisfiedBy(n)?r.enter(o.DATA_SOURCE_ERROR_STATE,e):r.enter(o.UNRECOVERABLE_ERROR_STATE,e)}}}),i.exports=d});