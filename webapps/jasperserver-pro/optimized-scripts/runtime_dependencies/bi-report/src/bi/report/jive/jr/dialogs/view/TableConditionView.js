/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone.epoxy","./TableCommonFormatView","text!../template/tableConditionTemplate.htm","../model/TableConditionModel"],function(e,t,i){function o(e){var t=[];return n.each(e,function(e){t.push({label:e.val,value:e.key})}),t}var n=e("underscore"),d=e("backbone.epoxy"),l=e("./TableCommonFormatView"),a=e("text!../template/tableConditionTemplate.htm"),r=e("../model/TableConditionModel"),s=d.Model.extend({defaults:{conditionIndex:1,conditionOptions:[],dataType:"text",calendarPatterns:{}},computeds:{isNotBooleanType:function(){return"boolean"!==this.get("dataType")}},remove:function(){}});i.exports=l.extend({events:{"click div.jive_inputbutton[name='conditionRemove']":"_removeCondition","click div.jive_inputbutton[name='conditionMoveUp']":"_moveConditionUp","click div.jive_inputbutton[name='conditionMoveDown']":"_moveConditionDown"},el:function(){return n.template(a,{i18n:this.i18n})},initialize:function(){this.model=new r,this.viewModel=new s,d.View.prototype.initialize.apply(this,arguments)},computeds:{convertedOptions:{deps:["conditionOptions"],get:function(e){return o(e)}},conditionValueStart:{deps:["value"],get:function(e){return n.isArray(e)?e[0]:e},set:function(e){var t=this.getBinding("value");n.isArray(t)?(t[0]=e,this.model.set({value:t},{validate:!0})):this.model.set({value:e},{validate:!0})}},conditionValueEnd:{deps:["value"],get:function(e){if(n.isArray(e))return e[1]},set:function(e){var t=this.getBinding("value");n.isArray(t)&&(t[1]=e,this.model.set({value:t},{validate:!0}))}},getColspan:function(){return this.getBinding("isMultiValueOperator")?1:3}},_removeCondition:function(e){this.model.trigger("destroy",this.model,this.model.collection)},_moveConditionUp:function(e){var t=this.model.collection,i=t.indexOf(this.model);i>0&&(t.remove(this.model,{silent:!0}),t.add(this.model,{at:i-1},{silent:!0}),this.parent.render())},_moveConditionDown:function(e){var t=this.model.collection,i=t.indexOf(this.model);i<t.length-1&&(t.remove(this.model,{silent:!0}),t.add(this.model,{at:i+1},{silent:!0}),this.parent.render())},remove:function(){d.View.prototype.remove.apply(this,arguments),this.model&&this.model.remove(),this.viewModel&&this.viewModel.remove()}})});