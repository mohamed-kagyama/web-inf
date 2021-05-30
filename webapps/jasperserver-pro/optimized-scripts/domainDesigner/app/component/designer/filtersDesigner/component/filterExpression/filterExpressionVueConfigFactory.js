/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!./template/filterExpressionTemplate.htm","./leftOperand","./operator","./rightOperand"],function(e,t,r){var p=e("text!./template/filterExpressionTemplate.htm"),o=e("./leftOperand"),n=e("./operator"),a=e("./rightOperand");r.exports={create:function(e){return{template:p,props:["filter"],components:{leftOperand:o,operator:n,rightOperand:a,cellActions:e.cellActions},methods:{}}}}});