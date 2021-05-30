/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./enum/applicationStateActionsEnum"],function(e,t,n){function r(e){function t(e){var t,i=e.changes,a=i.schema||i.resourceProperties,u=i.viewState;return e.skipHistory||(a?t=n:u&&(t=r)),t}e=e||{};var n=e.pushHistoryFullState,r=e.pushHistoryViewState,u=e.clearHistory,o=e.storeChangeEventEmitter,s={"*":{afterReturning:[function(){return o.emitStoreChange.apply(null,arguments)}]},save:{afterReturning:[u]}};return i.each(a,function(e,n){var r=t(e);r&&(i.isUndefined(s[n])&&(s[n]={}),i.isUndefined(s[n].afterReturning)&&(s[n].afterReturning=[]),s[n].afterReturning.push(r))}),s}var i=e("underscore"),a=e("./enum/applicationStateActionsEnum");n.exports={create:r}});