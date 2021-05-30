/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!./template/operandTemplate.htm","../../../../../../model/schema/enum/filterOperandTypesEnum","vue"],function(e,t,p){var m=e("text!./template/operandTemplate.htm"),n=e("../../../../../../model/schema/enum/filterOperandTypesEnum"),r=e("vue");p.exports=r.extend({template:m,props:["operand"],components:{},computed:{isVariable:function(){return this.operand.type===n.VARIABLE}},methods:{}})});