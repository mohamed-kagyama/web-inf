/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(r,e,n){n.exports={create:function(r){var e=r.request,n=r.errorHandlerStrategy;return function(){return e.apply(null,arguments).then(null,function(r){return n.handleError(r)||r})}}}});