/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,n,r){function a(e){var n=Array.prototype.slice.call(arguments,1);if(t.isFunction(e))return e.apply(null,n)}function l(e,n,r){r=t.defaults(r||{},{elementHandler:i,anyHandler:o});var u=t.isArray(e);t.each(e,function(e,i){var o=n[u?r.elementHandler:i],c=a(n[r.anyHandler],i,e);c||(c=a(o,e,i)),c||(t.isArray(e)||t.isObject(e))&&l(e,n,r)})}var t=e("underscore"),i="element",o="any";r.exports={walk:l}});