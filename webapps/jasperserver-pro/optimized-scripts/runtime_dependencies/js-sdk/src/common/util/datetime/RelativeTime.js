/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./RelativeDate","underscore"],function(e,r,t){var i=e("./RelativeDate"),n=e("underscore"),o=function(){i.apply(this,arguments)},u=function(){};u.prototype=i.prototype,o.prototype=new u,o.prototype.constructor=o,o.PATTERNS={MINUTE:/^(MINUTE)(([+|\-])(\d{1,9}))?$/i,HOUR:/^(HOUR)(([+|\-])(\d{1,9}))?$/i},o.parse=function(e){if(o.isValid(e))for(var r in o.PATTERNS){var t=o.PATTERNS[r].exec(e);if(null!==t&&n.isArray(t)&&5===t.length)return new o(t[1],t[3],t[4])}},o.isValid=function(e){if(e instanceof o)return""!==e.toString();if(n.isString(e))for(var r in o.PATTERNS)if(o.PATTERNS[r].test(e))return!0;return!1},t.exports=o});