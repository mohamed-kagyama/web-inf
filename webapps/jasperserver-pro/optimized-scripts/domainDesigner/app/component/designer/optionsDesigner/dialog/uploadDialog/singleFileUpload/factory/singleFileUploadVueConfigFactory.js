/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!../template/singleFileUploadVueTemplate.htm"],function(e,t,l){var i=e("text!../template/singleFileUploadVueTemplate.htm");l.exports={create:function(){return{template:i,props:{file:{type:Object,default:null},fileInputLabel:{type:String,default:""},fileInputPlaceholder:{type:String,default:""},accept:{type:String,default:"*.*"},actionButtonLabel:{type:String,default:""},errorMessage:{type:String,default:""}},computed:{isFileAbsent:function(){return!Boolean(this.file)},fileName:function(){return this.isFileAbsent?"":this.file.name}},methods:{selectFile:function(e){var t=e.target.files[0],l=this.$el.querySelector(".jr-jFileUploadInput");t&&this.$emit("selectFile",t),l&&(l.value="")}}}}}});