/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,n){var t=e("underscore");n.exports={extract:function(e,r){var n=t.filter(e,function(e){return e.key===r});return 1===n.length?t.first(n):n}}});