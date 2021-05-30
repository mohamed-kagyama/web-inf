/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(n,r,e){function u(n,r,e,o){if(o=o||[],!t.isUndefined(n)&&!t.isNull(n)){o.push(n),e=e||{},e[n]=!0;var i=r[n];o=t.reduce(i,function(n,o,t){var i=o;return e[i]||(n=u(i,r,e,n)),n},o)}return o}function o(n){var r={},e=[];return t.reduce(n,function(e,o,t){var i=t;if(!r[i]){var c=u(i,n,r);e=e.concat([c])}return e},e)}var t=n("underscore");e.exports={findComponentForVertex:u,findComponents:o}});