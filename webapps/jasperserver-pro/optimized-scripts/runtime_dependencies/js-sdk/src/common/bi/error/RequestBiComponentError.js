/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./BiComponentError","./enum/biComponentErrorCodes","./enum/biComponentErrorMessages"],function(e,r,s){var o=e("./BiComponentError"),t=e("./enum/biComponentErrorCodes"),n=e("./enum/biComponentErrorMessages");s.exports=o.extend({constructor:function(e,r){this.xmlHttpRequest=e;var s,a,m,p=r;if(!r)switch(e.status){case 401:p=t.AUTHENTICATION_ERROR;break;case 403:p=t.AUTHORIZATION_ERROR;break;default:p=t.UNEXPECTED_ERROR}a=n[p];try{s=JSON.parse(e.responseText)}catch(e){}s&&(s.errorCode?(p=s.errorCode,a=s.message,m=s.parameters||!s.properties?s.parameters:s.properties[0].value):a+=" : "+s.message,s.result&&s.result.msg&&(p=s.result.msg,s.result.devmsg&&(a=s.result.devmsg))),o.prototype.constructor.call(this,p,a,m)}})});