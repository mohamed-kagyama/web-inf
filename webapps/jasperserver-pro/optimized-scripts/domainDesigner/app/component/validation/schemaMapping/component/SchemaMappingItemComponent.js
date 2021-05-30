/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","vue","underscore","bundle!DomainDesignerBundle","text!../template/schemaMappingDialogItemTemplate.htm"],function(e,t,n){var m=e("vue"),i=(e("underscore"),e("bundle!DomainDesignerBundle")),a=e("text!../template/schemaMappingDialogItemTemplate.htm");n.exports=m.extend({template:a,props:["schema"],computed:{i18n:function(){return i}},methods:{onClickSchemaItem:function(e){this.$emit("schemaItemClicked",e)}}})});