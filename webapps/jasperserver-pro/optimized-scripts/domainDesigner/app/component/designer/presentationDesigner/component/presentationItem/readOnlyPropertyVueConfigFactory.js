/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!./template/readOnlyPropertyTemplate.htm"],function(e,t,r){var p=e("text!./template/readOnlyPropertyTemplate.htm");r.exports={create:function(e){return{template:p,mixins:e.mixins||[],props:["item","propertyName"],computed:{label:function(){return this.item[this.propertyName]}}}}}});