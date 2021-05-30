/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../enum/filterExpressionTypes"],function(e,n,r){var o=e("underscore"),s=e("../enum/filterExpressionTypes");r.exports={_expressionRValue:function(){return o.map(this.get("value"),function(e){return null==e&&console&&console.warn("Value is undefined or null for some reason",e),{value:encodeURIComponent(null==e?"":e),type:s.LITERAL,dataType:this.get("filterDataType")}},this)}}});