/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/filterExpressionTypes"],function(e,t,n){var r=e("../enum/filterExpressionTypes");n.exports={_expressionRValue:function(){var e=this.get("value");return{value:encodeURIComponent(e),dataType:this.get("filterDataType"),type:r.LITERAL}}}});