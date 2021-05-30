/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/viewStateModelDefaultsEnum","underscore"],function(e,t,n){function u(e,t){return t===a.EMPTY_OBJECT?0===f.keys(e).length:e===t}function r(e,t,n){return f.isUndefined(e[t])?n===a.EMPTY_OBJECT?{}:n:e[t]}function o(e,t,n,r){var o=u(n,r);o&&!f.isUndefined(e[t])?delete e[t]:o||(e[t]=n)}var a=e("../enum/viewStateModelDefaultsEnum"),f=e("underscore");n.exports={matchDefault:u,getPropertyValueOrDefault:r,setPropertyValueOrDefault:o}});