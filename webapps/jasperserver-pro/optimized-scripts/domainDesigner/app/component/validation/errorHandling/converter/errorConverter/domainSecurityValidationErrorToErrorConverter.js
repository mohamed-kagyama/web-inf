/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(r,e,n){var o=r("underscore");n.exports={convert:function(r){return o.map(r,function(r){var e="";return r.properties.forEach(function(r){return e+=r.value}),e})}}});