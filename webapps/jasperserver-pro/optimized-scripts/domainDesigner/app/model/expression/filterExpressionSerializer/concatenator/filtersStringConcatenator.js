/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../enum/clientExpressionsEnum"],function(r,e,n){function i(r,e){return[r,o.and.name,e].join(" ")}var t=r("underscore"),s=r("../../../enum/clientExpressionsEnum"),o=s.operators;n.exports={concatenateFilters:function(r){return r.length>1?t.reduce(r,function(r,e){return this._addFilterToFilterExpressionString(r,e)},{filterExpressionString:""},this).filterExpressionString:r[0]},_addFilterToFilterExpressionString:function(r,e){return t.isEmpty(r.filterExpressionString)?r.filterExpressionString=e:r.filterExpressionString=i(r.filterExpressionString,e),r}}});