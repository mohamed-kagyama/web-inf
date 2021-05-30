/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,n,r){function i(e,n){var r,i;return(e||t.isString(e))&&(i=this[e],t.isFunction(i)&&(r=t.bind(function(e,r){var o=this,u=r.helper.data("data");t.defer(function(){i.call(o,e,u,n)})},this))),r}var t=e("underscore");r.exports=i});