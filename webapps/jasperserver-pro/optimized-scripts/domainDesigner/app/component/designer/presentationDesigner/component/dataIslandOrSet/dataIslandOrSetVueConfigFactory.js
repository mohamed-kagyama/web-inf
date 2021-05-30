/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","../../util/columnSetUtil","../presentationItem/enum/propertyToPropertyNameEnum","text!./template/dataIslandOrSetTemplate.htm"],function(e,t,r){var n=e("underscore"),o=e("bundle!DomainDesignerBundle"),p=e("../../util/columnSetUtil"),m=e("../presentationItem/enum/propertyToPropertyNameEnum"),u=e("text!./template/dataIslandOrSetTemplate.htm");r.exports={create:function(e){return{template:u,props:["item","editProperty","tableRowClass","treeIconClass","eventName","column0Width","column1Width"],components:{presentationItem:e.presentationItem,property:e.property,cell:e.cell,propertyEditor:e.propertyEditor,inputGroup:e.inputGroup},computed:{i18n:function(){return o},propertyNames:function(){return m}},methods:n.extend({},p)}}}});