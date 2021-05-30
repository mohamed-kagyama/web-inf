/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","backbone.epoxy","underscore","../../../util/jiveDataConverter","runtime_dependencies/js-sdk/src/common/component/dialog/AlertDialog","../util/FormatModelCache","bundle!jasperreports_messages","text!../template/tableConditionCollectionTemplate.htm","./TableConditionView","../model/TableConditionModel"],function(e,t,o){function i(e,t,o){var i,n,a,l=this.cache,r=t,d=e.previous("applyTo"),c=this.columnComponentModel;if(null!=r&&!o.isReset){if(!this.validate())return void e.set({applyTo:d},{isReset:!0});d&&(i="detailrows"===d?l.createKey(d,c):l.createKey(d,c.parent.columnGroups.findWhere({id:d}),!0),l.set(i,this.collection.toJSON())),"detailrows"===r?(i=l.createKey(r,c),null===l.get(i)&&l.set(i,s.call(this,c.conditions.toJSON(),c.get("dataType")))):(a=c.parent.columnGroups.findWhere({id:r}),i=l.createKey(r,a,!0),null===l.get(i)&&l.set(i,s.call(this,a.conditions.toJSON(),a.get("dataType")))),n=l.keyInfo[i].model,this.collection.conditionPattern=n.get("conditionalFormattingData").conditionPattern,this.collection.dataType=n.get("dataType"),this.addAll(l.get(i))}}function n(){var e=this,t=this.columnComponentModel,o=t.get("columnIndex"),i=t.parent.columnGroups,n=[],a=[],s=[],l=[];i.each(function(t){-1!=c.indexOf(t.get("forColumns"),o)&&null!==t.get("conditionalFormattingData")&&("groupheading"===t.get("groupType")?a.push({value:t.get("id"),label:t.get("groupName")+" "+e.i18n["net.sf.jasperreports.components.headertoolbar.groupheading.prefix"]}):"groupsubtotal"===t.get("groupType")?s.push({value:t.get("id"),label:t.get("groupName")+" "+e.i18n["net.sf.jasperreports.components.headertoolbar.groupsubtotal.prefix"]}):"tabletotal"===t.get("groupType")&&l.push({value:t.get("id"),label:e.i18n["net.sf.jasperreports.components.headertoolbar.applyto.option.tabletotal"]}))}),n.push.apply(n,a),t.get("canFormatConditionally")&&n.push({value:"detailrows",label:this.i18n["net.sf.jasperreports.components.headertoolbar.applyto.option.detailrows"]}),n.push.apply(n,s),n.push.apply(n,l),this.viewModel.set("applyToOptions",n);var r=this.viewModel.previous("applyTo");r?(this.viewModel.set("applyTo",null,{silent:!0}),c.findWhere(n,{value:r})?this.viewModel.set("applyTo",r):this.viewModel.set("applyTo","detailrows")):this.viewModel.set("applyTo","detailrows"),n.length?this.viewModel.set("canAddCondition",!0):this.viewModel.set("canAddCondition",!1)}function a(){var e,t=this.viewModel.get("applyTo");"detailrows"===t?e=this.cache.createKey(t,this.columnComponentModel):t&&(e=this.cache.createKey(t,this.columnComponentModel.parent.columnGroups.findWhere({id:t}),!0)),e&&this.cache.set(e,this.collection.toJSON())}function s(e,t){var o,i=this,n=p.dataTypeToSchemaFormat[t];return c.map(e,function(e){var t={};return e.operator&&(t.operator=p.schemaFormatOperatorToFilterOperator(e.operator,e.value,n),o=i.columnComponentModel.parent.config.genericProperties,"datetime"===n?c.isArray(e.value)?(t.value=[],t.value[0]=p.isoTimestampTojQueryUiTimestamp(e.value[0],o),t.value[1]=p.isoTimestampTojQueryUiTimestamp(e.value[1],o)):t.value=p.isoTimestampTojQueryUiTimestamp(e.value,o):"time"===n?c.isArray(e.value)?(t.value=[],t.value[0]=p.isoTimeTojQueryUiTime(e.value[0],o),t.value[1]=p.isoTimeTojQueryUiTime(e.value[1],o)):t.value=p.isoTimeTojQueryUiTime(e.value,o):t.value=e.value),c.extend(e,t)})}function l(e,t,o){var i,n=this;return e.map(function(e){if(e.operator){var a=c.isArray(e.value)?e.value[0]:e.value,s=c.isArray(e.value)?e.value[1]:void 0;i=p.operatorAndValueToSchemaFormat.call(n.columnComponentModel,e.operator,p.dataTypeToSchemaFormat[t],a,s,o)}return c.extend(e,i)})}var r=e("backbone"),d=e("backbone.epoxy"),c=e("underscore"),p=e("../../../util/jiveDataConverter"),u=e("runtime_dependencies/js-sdk/src/common/component/dialog/AlertDialog"),h=e("../util/FormatModelCache"),m=e("bundle!jasperreports_messages"),v=e("text!../template/tableConditionCollectionTemplate.htm"),g=e("./TableConditionView"),f=e("../model/TableConditionModel"),w=r.Collection.extend({model:f}),y=d.Model.extend({defaults:function(){return{applyToOptions:[],applyTo:null,canAddCondition:!0}},reset:function(){return this.clear({silent:!0}).set(this.defaults()),this},remove:function(){}});o.exports=d.View.extend({events:{"click .jive_inputbutton[name='conditionAdd']":"addNewCondition"},el:function(){return c.template(v,{i18n:m})},constructor:function(e){this.i18n=e.i18n,d.View.apply(this,arguments)},initialize:function(){this.viewModel=new y,this.collection=new w,this.cache=new h,this._subviews=[],this._$subviewsContainer=this.$("table.conditionList > tbody"),this.listenTo(this.viewModel,"change:applyTo",c.bind(i,this)),this.listenTo(this.collection,"remove",this.removeSubview),this.on("tabSwitched",function(){a.call(this)}),this.errorDialog=new u({additionalCssClasses:"jive_dialog"}),d.View.prototype.initialize.apply(this,arguments)},addSubview:function(e){var t=new g(c.extend({},{i18n:this.i18n,model:e,genericProperties:this.columnComponentModel.parent.config.genericProperties}));return this._$subviewsContainer.append(t.render().$el),this._subviews.push(t),t},addModel:function(e,t){var o,i,n=new g({i18n:this.i18n,genericProperties:this.columnComponentModel.parent.config.genericProperties}),a=this.viewModel.get("applyTo");return n.parent=this,o="detailrows"===a?this.columnComponentModel.get("dataType").toLowerCase():this.columnComponentModel.parent.columnGroups.findWhere({id:a}).get("dataType").toLowerCase(),n.viewModel.set({conditionOptions:this.columnComponentModel.parent.config.genericProperties.operators[o],dataType:o,calendarPatterns:this.columnComponentModel.parent.config.genericProperties.calendarPatterns}),n.model.set(e),this._$subviewsContainer.append(n.render().$el),this._subviews.push(n),t||(i=this.collection.add(n.model),n.viewModel.set("conditionIndex",this.collection.indexOf(i)+1)),n.model},addAll:function(e){var t=this;this.collection.set(c.map(e,function(e,o){var i=t.addModel(e,!0);return t.getSubviewByModel(i).viewModel.set("conditionIndex",o+1),i}))},removeSubview:function(e){var t=this.getSubviewByModel(e);if(t){var o=c.indexOf(this._subviews,t);this._subviews.splice(o,1),t.remove()}},getSubviewByModel:function(e){return c.find(this._subviews,function(t){return t.model===e})},render:function(){c.invoke(this._subviews,"remove"),this._subviews=[],this._$subviewsContainer.empty();var e=this.collection.toJSON();return this.collection.reset(),this.addAll(e),this},addNewCondition:function(e){if(!this.$(e.target).is(".disabled")){var t=new f,o=this.addModel(t.defaults()),i=this.getSubviewByModel(o);o.set("operator",i.getBinding("convertedOptions")[0].value),t.remove()}},setColumnComponentModel:function(e,t){t?a.call(this):(this.cache.clear(),this.viewModel.set({applyTo:null},{silent:!0}),this.collection.genericProperties=e.parent.config.genericProperties),this.columnComponentModel=e,n.call(this)},getActions:function(){var e=this,t=this.cache,o=[];return a.call(this),c.each(t.map,function(i,n){var a=t.keyInfo[n];a.model.updateFromReportComponentObject({conditions:l.call(e,i.current,a.model.get("dataType"),a.model.get("conditionalFormattingData").conditionPattern)}),o.push(a.model.actions["change:conditions"].call(a.model))}),o},isValid:function(){var e=[];return this.collection.reduce(function(e,t){return t.isValid()||e.push(t),e},e),!e.length},validate:function(){return!!this.isValid()||(this.errorDialog.setMessage(m["net.sf.jasperreports.components.headertoolbar.conditions.invalid"]),this.errorDialog.open(),!1)},clear:function(){c.invoke(this._subviews,"remove"),this.collection.reset(),this.cache.clear()},remove:function(){d.View.prototype.remove.apply(this,arguments),this.viewModel&&this.viewModel.remove(),this.collection&&this.collection.remove(),this.cache&&this.cache.remove(),this.errorDialog&&this.errorDialog.remove(),c.invoke(this._subviews,"remove"),this._subviews=[]}})});