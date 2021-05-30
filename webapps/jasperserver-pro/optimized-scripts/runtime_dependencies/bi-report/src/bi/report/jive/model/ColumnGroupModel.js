/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone","./FormatModel","../util/jiveDataConverter","../collection/ConditionCollection"],function(t,o,n){var a=t("underscore"),e=t("backbone"),r=t("./FormatModel"),i=t("../util/jiveDataConverter"),s=t("../collection/ConditionCollection");n.exports=e.Model.extend({defaults:function(){return{id:null,groupType:"",groupName:"",dataType:"",forColumns:[],conditionalFormattingData:null,groupData:{}}},constructor:function(){this.format=new r,this.conditions=new s,e.Model.prototype.constructor.apply(this,arguments)},parse:function(t){return t.groupData&&(this.format.dataType=i.dataTypeToSchemaFormat[t.dataType],this.format.set(this.format.parse(t.groupData),{silent:!0})),t.conditionalFormattingData&&(this.conditions.dataType=i.dataTypeToSchemaFormat[t.dataType],this.conditions.conditionPattern=t.conditionalFormattingData.conditionPattern,this.conditions.reset(t.conditionalFormattingData.conditions,{silent:!0,parse:!0})),t},actions:{"change:format":function(){return{actionName:"editTextElement",editTextElementData:{applyTo:this.get("groupType"),tableUuid:this.parent.get("id"),columnIndex:this.get("forColumns")[0],groupName:this.get("groupName"),fontName:this.format.get("font").name,fontSize:this.format.get("font").size+"",fontBold:this.format.get("font").bold,fontItalic:this.format.get("font").italic,fontUnderline:this.format.get("font").underline,fontColor:this.format.get("font").color,formatPattern:this.format.toJiveFormat(),fontHAlign:this.format.get("align").charAt(0).toUpperCase()+this.format.get("align").slice(1),fontBackColor:"transparent"===this.format.get("backgroundColor")?"000000":this.format.get("backgroundColor"),mode:"transparent"===this.format.get("backgroundColor")?"Transparent":"Opaque"}}},"change:conditions":function(){var t=this.parent&&this.parent.config?this.parent.config.genericProperties:void 0;return{actionName:"conditionalFormatting",conditionalFormattingData:{applyTo:this.get("groupType"),tableUuid:this.parent.get("id"),columnIndex:this.get("forColumns")[0],groupName:this.get("groupName"),conditionPattern:this.get("conditionalFormattingData").conditionPattern,conditionType:this.get("conditionalFormattingData").conditionType,conditions:this.conditions.map(function(o){return o.toJiveFormat(t)})}}}},updateFromReportComponentObject:function(t){var o={};t.format&&(t.format.font=a.extend({},this.format.get("font"),t.format.font||{}),a.isObject(this.format.get("pattern"))&&("Numeric"===this.get("dataType")&&i.DURATION_PATTERN===t.format.pattern||(t.format.pattern=a.extend({},this.format.get("pattern"),t.format.pattern||{}))),t.format.backgroundColor&&"transparent"!==t.format.backgroundColor&&(t.format.backgroundColor=t.format.backgroundColor.toUpperCase()),t.format.font&&t.format.font.color&&(t.format.font.color=t.format.font.color.toUpperCase()),this.format.set(t.format)),t.conditions&&this.conditions.reset(t.conditions),this.set(o)}})});