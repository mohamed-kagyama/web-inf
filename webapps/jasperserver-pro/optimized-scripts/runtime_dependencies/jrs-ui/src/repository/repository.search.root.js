/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./repository.search.actions","./repository.search.components","./repository.search.main"],function(r,o,e){function t(){return t=Object.assign||function(r){for(var o=1;o<arguments.length;o++){var e=arguments[o];for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t])}return r},t.apply(this,arguments)}var s=r("./repository.search.actions"),n=r("./repository.search.components"),i=r("./repository.search.main"),a=i.repositorySearch,c=t(a,s,n);window.repositorySearch=c,e.exports=c});