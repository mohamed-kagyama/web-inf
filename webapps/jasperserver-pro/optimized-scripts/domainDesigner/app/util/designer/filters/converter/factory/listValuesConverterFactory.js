/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(r,e,n){var t=r("underscore");n.exports={create:function(r){return{convert:function(e,n){return e=t.isArray(e)?e:[e],t.map(e,function(e){return r.convert(e,n)})}}}}});