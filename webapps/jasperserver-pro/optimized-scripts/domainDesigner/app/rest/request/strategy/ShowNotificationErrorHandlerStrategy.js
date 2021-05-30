/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../enum/requestCanceledEnum","../../errorHandling/errorMessageUtil"],function(e,r,n){var o=e("underscore"),t=e("../../enum/requestCanceledEnum"),i=e("../../errorHandling/errorMessageUtil"),s=function(e){this.notification=e.notification};o.extend(s.prototype,{handleError:function(e){e!==t.CANCELED&&this.notification.show({message:i.getFirstErrorMessage(e)})}}),n.exports=s});