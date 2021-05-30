/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./enum/calculatedFieldDesignerOperatorsEnum","text!./template/calculatedFieldsDesignerOperatorsTemplate.htm"],function(e,t,r){var a=e("./enum/calculatedFieldDesignerOperatorsEnum"),l=e("text!./template/calculatedFieldsDesignerOperatorsTemplate.htm");r.exports={template:l,props:["disableButtons"],data:function(){return{operators:a}},methods:{selectOperator:function(e){this.$emit("selectOperator",e)},getComputedValueByName:function(e){return this[e]}}}});