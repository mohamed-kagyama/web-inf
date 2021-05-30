/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/filterExpressionTypes"],function(e,n,o){var l=e("../enum/filterExpressionTypes");o.exports={_expressionRValue:function(){var e=this.get("value")[0],n=this.get("value")[1];return null==e&&console&&console.warn("Value is undefined or null for some reason",e),null==n&&console&&console.warn("Value is undefined or null for some reason",n),{start:encodeURIComponent(null==e?"":e),end:encodeURIComponent(null==n?"":n),dataType:this.get("filterDataType"),type:l.RANGE}}}});