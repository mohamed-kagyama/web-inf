/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../enum/clientExpressionsEnum"],function(n,e,r){function u(n){return o.reduce(n.operands,function(n,e){return n=o.extend({},n,e)},{})}var o=n("underscore"),t=n("../../../../enum/clientExpressionsEnum"),i=t.operators,s=t.functions,c=[i.equals.name,i.in.name,s.function.name];r.exports={isSatisfiedBy:function(n){var e=u(n);return o.some(c,function(n){return e[n]})}}});