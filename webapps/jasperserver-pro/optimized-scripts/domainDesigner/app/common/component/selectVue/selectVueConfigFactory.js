/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","text!./template/selectTemplate.htm"],function(e,t,n){var r=(e("underscore"),e("text!./template/selectTemplate.htm"));n.exports={create:function(){return{template:r,props:["items"],methods:{onChange:function(e){this.$emit("change",e)}}}}}});