/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!./template/template.htm"],function(e,t,n){function a(e,t){try{e.setSelectionRange(t.start,t.end)}catch(e){}}var l=e("text!./template/template.htm");n.exports={template:l,directives:{rangeSelection:{bind:function(e,t){a(e,{start:t.value.start,end:t.value.end})},update:function(e,t){var n=t.value,l=t.oldValue,s=n.selectionRange.start!==l.selectionRange.start,o=n.selectionRange.end!==l.selectionRange.end;(s||o)&&a(e,{start:n.selectionRange.start,end:n.selectionRange.end}),e.focus()}}},props:["value","selectionRange"],methods:{onChange:function(e){var t=e.target,n=t.value,a=t.selectionStart,l=t.selectionEnd;this.$emit("change",{value:n,selectionRange:{start:a,end:l}})}}}});