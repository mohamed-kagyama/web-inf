/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!./template/propertyTemplate.htm"],function(e,t,r){var p=e("text!./template/propertyTemplate.htm");r.exports={create:function(e){return{template:p,props:["editProperty","item","propertyName","readonly"],components:{cell:e.cell,propertyEditor:e.propertyEditor,readOnlyProperty:e.readOnlyProperty},methods:{}}}}});