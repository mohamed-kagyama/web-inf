/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./formatsMapping","bundle!AdHocBundle","momentExtension","runtime_dependencies/js-sdk/src/jrs.configs"],function(e,n,r){function t(e){var n=z[e];return n||(n=z[e.split("_")[0]]),n||(n=z.en),n}function o(e,n){var r=t(g.userLocale);return n=u(n),e=r[n][e]}function u(e){return e=l.isObject(e)&&e.categorizer?e.categorizer:e||"none"}function s(e){return l.contains(["year","quarter","month","day"],u(e))}function i(e){return"day_of_week"===u(e)}function a(e){return p["adhoc.day.of.week."+e]||e}function d(e){var n;return n=/T/.test(e)?T(e).tz(g.userTimezone).format("Z"):T("1970-01-01").tz(g.userTimezone).format("Z"),y.test(e)?e=e.replace(y,n):e+=n,e}function c(e){var n;return y.test(e)||(n=/T/.test(e)?T(e).tz(g.userTimezone).format("Z"):T("1970-01-01").tz(g.userTimezone).format("Z"),e+=n),e}function m(e){return null===e||""===e}function f(e){return e===p["adhoc.node.other.node"]}var l=e("underscore"),z=e("./formatsMapping"),p=e("bundle!AdHocBundle"),T=e("momentExtension"),g=e("runtime_dependencies/js-sdk/src/jrs.configs"),y=/[+-]\d{2}:?\d{2}$/;r.exports={getFormatForMoment:o,getLocalizedDayOfWeek:a,setToUserTimezone:d,ensureTimezone:c,shouldBeFormattedByDateFormatter:s,shouldBeReturnedAsLocalazedDayOfWeek:i,isNullOrEmpty:m,isOtherNode:f}});