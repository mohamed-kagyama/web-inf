/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","requestSettings","runtime_dependencies/js-sdk/src/jrs.configs"],function(e,r,s){function n(){return n=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var s=arguments[r];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n])}return e},n.apply(this,arguments)}var t=e("requestSettings"),c=e("runtime_dependencies/js-sdk/src/jrs.configs"),i=c.userLocale.replace(/_/g,"-");s.exports=n({},t,{headers:n({},t.headers,{"Accept-Language":i})})});