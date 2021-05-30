/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","vue","text!./template/actionButtonVueTemplate.htm"],function(t,e,n){var o=t("vue"),i=t("text!./template/actionButtonVueTemplate.htm");n.exports=o.extend({props:{label:{type:String,default:""}},template:i,methods:{onClick:function(t){this.$emit("click",t)}}})});