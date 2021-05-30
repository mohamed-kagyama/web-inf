/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./BaseFiltersController","./editor/ComplexExpressionEditor","./ComplexExpressionModel","runtime_dependencies/js-sdk/src/common/logging/logger"],function(e,i,s){var o=e("underscore"),t=e("./BaseFiltersController"),r=e("./editor/ComplexExpressionEditor"),l=e("./ComplexExpressionModel"),n=e("runtime_dependencies/js-sdk/src/common/logging/logger"),p=n.register("AdhocFilters"),d=t.extend({isOlap:!1,initialize:function(){t.prototype.initialize.apply(this,arguments),this.expressionModel=new l({id:"complexFilter",complexExpression:"",filterPodMinimized:!0}),this.complexExpressionEditor=new r({el:this.$("#expression-container"),model:this.expressionModel}),this.on("invalid:complexExpression",this.showComplexExpressionServerError),this.listenTo(this.collection,"change:value",this.updateFilter),this.listenTo(this.collection,"change:isAnyValue",this.updateFilter),this.listenTo(this.expressionModel,"toggle",this.toggleFilter),this.listenTo(this.expressionModel,"change:complexExpression",o.partial(this.setFiltersChanged,!0)),this.listenTo(this.expressionModel,"change:complexExpression",this.clearComplexExpressionServerError),this.listenTo(this.expressionModel,"change:filterPodMinimized",this.changeFilterPanelHeight)},changeFilterPanelHeight:function(){var e=this.$("> .content > .body"),i=this.$("> .content > .footer");e[this.expressionModel.get("filterPodMinimized")?"addClass":"removeClass"]("complexExpressionMinimized"),i[this.expressionModel.get("filterPodMinimized")?"addClass":"removeClass"]("complexExpressionMinimized"),e[this.expressionModel.get("filterPodMinimized")?"removeClass":"addClass"]("complexExpressionMaximized"),i[this.expressionModel.get("filterPodMinimized")?"removeClass":"addClass"]("complexExpressionMaximized")},render:function(){return t.prototype.render.apply(this,arguments),this.complexExpressionEditor.render(),this.changeFilterPanelHeight(),this},clearComplexExpressionServerError:function(){this.complexExpressionEditor.$("label.control.input").hasClass("error")&&(this.$("#filterMessage span").empty(),this.complexExpressionEditor.$("label.control.input").removeClass("error"))},showComplexExpressionServerError:function(e,i){this.$("#filterMessage span").html(i),this.complexExpressionEditor.$("label.control.input").addClass("error")},setFilters:function(e){this.expressionModel.set("complexExpression",e.complexExpression),this.expressionModel.set("filterPodMinimized",e.isComplexFilterPodMinimized),t.prototype.setFilters.apply(this,arguments)},_deleteFilterDoneCallback:function(e,i){this.expressionModel.set("complexExpression",i.complexExpression),t.prototype._deleteFilterDoneCallback.apply(this,arguments)},_deleteAllFiltersDoneCallback:function(e,i){this.expressionModel.set("complexExpression",i.complexExpression),t.prototype._deleteAllFiltersDoneCallback.apply(this,arguments)},applyFilters:function(){return this.$("#filterMessage span").empty(),this.setFiltersChanged(!1),this.service.applyFiltersAndExpression(this.collection.toExpression(),this.expressionModel.get("complexExpression")).done(o.bind(function(e,i,s){var o=s.getResponseHeader("adhocException");if(o)return void p.error(o);this.setFilters(e),this.onApply(e)},this)).fail(o.bind(function(e){var i=JSON.parse(e.responseText);i.editFilterError&&this.trigger("invalid:filters",this.collection,i.editFilterError),i.complexFilterError&&this.trigger("invalid:complexExpression",this.collection,i.complexFilterError)},this))}});window.FiltersController=d,s.exports=d});