/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!./template/draftFilterTemplate.htm"],function(e,t,r){var p=e("text!./template/draftFilterTemplate.htm");r.exports={create:function(e){return{template:p,props:["filter"],components:{optionsMenu:e.optionsMenu,leftOperand:e.leftOperand,operator:e.operator,rightOperand:e.rightOperand},computed:{},methods:{}}}}});