/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!./template/leftOperandTemplate.htm","./operand"],function(e,t,r){var p=e("text!./template/leftOperandTemplate.htm"),o=e("./operand");r.exports={create:function(e){return{template:p,props:["filter"],components:{operand:o,fieldValueEditor:e.fieldValueEditor},computed:{},methods:{}}}}});