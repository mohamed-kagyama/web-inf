/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,t){function n(e,r){return u.reduce(e,function(e,t){r.removeData(t);var n=r.data(t);return u.isUndefined(n)||""===n||(e[t]=n),e},{})}var u=e("underscore");t.exports={getElementDataAttributes:n}});