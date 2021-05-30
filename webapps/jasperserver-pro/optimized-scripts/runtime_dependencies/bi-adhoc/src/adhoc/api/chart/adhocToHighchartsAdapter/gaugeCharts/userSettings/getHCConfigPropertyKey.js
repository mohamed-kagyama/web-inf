/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(r,e,n){var u=r("underscore");n.exports=function(r,e){var n=r.advancedProperties||{};if(u.isArray(n)){var i=u.find(n,function(r){return r.name===e});if(i)return i.value}return null}});