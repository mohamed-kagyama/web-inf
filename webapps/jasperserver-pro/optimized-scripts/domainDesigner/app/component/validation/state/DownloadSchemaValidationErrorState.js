/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../rest/errorHandling/errorHandlingUtil","../../../rest/enum/requestCanceledEnum","./enum/validationStateNameEnum"],function(e,r,n){var t=e("underscore"),i=e("../../../rest/errorHandling/errorHandlingUtil"),o=e("../../../rest/enum/requestCanceledEnum"),a=e("./enum/validationStateNameEnum"),u=function(e){this.initialize(e)};t.extend(u.prototype,{initialize:function(e){},enter:function(e,r){var n=e.error;delete e.error,n!==o.CANCELED&&(e.errors=i.getErrors(n),r.enter(a.UNRECOVERABLE_ERROR_STATE,e))}}),n.exports=u});