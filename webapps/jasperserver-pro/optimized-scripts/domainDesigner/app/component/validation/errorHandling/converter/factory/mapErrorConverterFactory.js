/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(r,e,n){var t=r("underscore");n.exports={create:function(r){var e=r.converter;return{convert:function(r,n){return t.map(r,function(r){return e.convert(r,n)})}}}}});