/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!../template/genericNotificationDialogTemplate.htm"],function(t,e,n){var i=t("text!../template/genericNotificationDialogTemplate.htm");n.exports={create:function(t){return{props:{title:{type:String,default:""},headerClass:{type:String,default:""},headerIconClass:{type:String,default:""},header:{type:String,default:""},confirmButtonLabel:{type:String,default:""},confirmButtonDataNameAttribute:{type:String,default:""},confirmButtonClass:{type:String,default:""},rejectButtonLabel:{type:String,default:""},rejectButtonDataNameAttribute:{type:String,default:""}},template:i,components:{actionButton:t.actionButton},methods:{onConfirm:function(){this.$emit("confirm")},onReject:function(){this.$emit("reject")}}}}}});