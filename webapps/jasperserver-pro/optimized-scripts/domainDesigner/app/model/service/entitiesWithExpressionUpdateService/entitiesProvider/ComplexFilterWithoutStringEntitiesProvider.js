/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./predicate/isComplexFilterExpressionWithoutStringPredicate"],function(e,t,r){var i=e("underscore"),n=e("./predicate/isComplexFilterExpressionWithoutStringPredicate"),o=function(){};i.extend(o.prototype,{getEntities:function(e){return e.filters.filter(n)}}),r.exports=o});