/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!./template/complexFilterTemplate.htm"],function(e,t,l){var o=e("text!./template/complexFilterTemplate.htm");l.exports={create:function(e){return{template:o,props:["filter"],components:{cellActions:e.cellActions},computed:{},methods:{}}}}});