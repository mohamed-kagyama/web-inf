/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../enum/clientExpressionsEnum"],function(e,r,n){function t(e,r){var n={},t=[];return n[o.and.name]={},t.push(e),t.push(r),n[o.and.name][o.operands.name]=t,n}var s=e("underscore"),i=e("../../../enum/clientExpressionsEnum"),o=i.operators;n.exports={concatenateFilters:function(e){return e.length>1?s.reduce(e,function(e,r){return this._addFilterToFilterExpressionObject(e,r)},{filterExpressionObject:{}},this).filterExpressionObject:e[0]},_addFilterToFilterExpressionObject:function(e,r){return s.isEmpty(e.filterExpressionObject)?e.filterExpressionObject=r:e.filterExpressionObject=t(e.filterExpressionObject,r),e}}});