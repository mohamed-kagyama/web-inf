/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone.epoxy","underscore","text!../template/tableFilterTemplate.htm","../model/TableFilterModel","./dateTimePickerEpoxyBindingHandler"],function(e,t,i){function r(e){var t=[];return l.each(e,function(e){t.push({label:e.val,value:e.key})}),t}var n=e("backbone.epoxy"),l=e("underscore"),o=e("text!../template/tableFilterTemplate.htm"),a=e("../model/TableFilterModel"),s=e("./dateTimePickerEpoxyBindingHandler"),d=n.Model.extend({defaults:{columnLabel:"",clearFilter:"true",filterOptions:[],dataType:"text",emptyFilterOption:"..."},computeds:{isNotClearFilter:function(){return"true"!==this.get("clearFilter")},isNotBooleanType:function(){return"boolean"!==this.get("dataType")},transformedFilterOptions:{deps:["clearFilter","filterOptions"],get:function(e,t){return"true"===e?[]:r(t)}}},remove:function(){}});i.exports=n.View.extend({constructor:function(e){this.i18n=e.i18n,n.View.prototype.constructor.call(this,e)},initialize:function(){this.model=new a,this.viewModel=new d,this.listenTo(this.viewModel,"change:clearFilter",this._onClearFilterChanged),n.View.prototype.initialize.apply(this,arguments)},el:function(){return l.template(o,{i18n:this.i18n})},computeds:{filterValueStart:{deps:["value"],get:function(e){return l.isArray(e)?e[0]:e},set:function(e){var t=this.getBinding("value");l.isArray(t)?t[0]=e:this.setBinding("value",e)}},filterValueEnd:{deps:["value"],get:function(e){if(l.isArray(e))return e[1]},set:function(e){var t=this.getBinding("value");l.isArray(t)&&(t[1]=e)}}},bindingHandlers:{dateTimePicker:s},_onClearFilterChanged:function(){"true"===this.viewModel.get("clearFilter")?this.model.reset():this.model.set("operator",this.viewModel.get("filterOptions")[0].key)},remove:function(){n.View.prototype.remove.apply(this,arguments),this.model&&this.model.remove(),this.viewModel&&this.viewModel.remove()}})});