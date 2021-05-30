/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone","./findMethodsByPrefixes","./readOnlyMethodPrefixes"],function(e,n,t){function i(e,n,t,i){n&&e&&u.isFunction(e[t])&&(n[i]=function(){return e[t].apply(e,arguments)})}function r(e,n,t){u.each(t,function(t){u.isString(t)?i(e,n,t,t):u.isObject(t)&&i(e,n,t.source,t.target)})}function o(e,n){n.listenTo(e,"all",function(){n.trigger.apply(n,arguments)})}function s(e,n,t){t=t||[];var n=n||{};return u.isFunction(e.trigger)&&u.isFunction(e.listenTo)&&(n.trigger||u.extend(n,d.Events),o(e,n)),r(e,n,t),n}function c(e,n,t){return s(e,n,f(e,a,t))}var u=e("underscore"),d=e("backbone"),f=e("./findMethodsByPrefixes"),a=e("./readOnlyMethodPrefixes");t.exports={copyMethodsAndEvents:s,copyReadOnlyMethodsAndEvents:c}});