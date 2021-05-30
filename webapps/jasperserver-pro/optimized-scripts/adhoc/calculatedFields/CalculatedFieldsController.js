/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone","./view/CalculatedFieldView"],function(i,e,s){var t=i("underscore"),n=i("backbone"),d=i("./view/CalculatedFieldView");s.exports=n.View.extend({initialize:function(i){this.service=i.service,this.view=new d({el:i.element}),this.view.listenTo(this.view.model,"validate:expression",t.bind(this._validateExpression,this)),this.view.listenTo(this.view.model,"validate:summaryExpression",t.bind(this._validateCustomSummary,this))},start:function(i){i=i||{},this.view.isEdit=i.editingMode,this.view.render(),this._fetchFieldsAndFunctions(),this._setFieldMetadata(i)},stop:function(){this.view.stopListening(this.view.model),this.view.undelegateEvents()},applyField:function(){if(this.view.model.isValidField()){return(this.view.isEdit?this.service.update.bind(this.service):this.service.add.bind(this.service))(this.view.model.toRequest(),this.view.model.get("fieldName")).done(t.bind(function(i){this.trigger("field:applied",i)},this)).fail(t.bind(this._handleServerError,this))}},_setFieldMetadata:function(i){this.view.isEdit&&i.selectedFieldName?this.service.get(i.selectedFieldName).done(t.bind(function(i){var e=i;this.view.model.populateFromField(e),this.trigger("field:loaded","MEASURE"===e.kind,!0)},this)):(this.view.model.set("kind",i.kind),this.trigger("field:loaded","MEASURE"===i.kind,!1))},_fetchFieldsAndFunctions:function(){this.service.fetchFieldsList().done(t.bind(function(i){this.view.model.set("availableFields",i)},this)),this.service.fetchFunctionsList().done(t.bind(function(i){this.view.model.set("availableFunctions",i)},this))},_handleServerError:function(i){if(500!==i.status){var e=JSON.parse(i.responseText);if(e&&e.parameters&&e.parameters[0]){var s=e.parameters[0];s="label"==s?"fieldLabel":s,this.view.model.trigger("invalid:"+s,{errorMessage:e.message})}}},_validateExpression:function(i){if(this.view.model.isExpressionValid("expression")){var e={expression:this.view.model.get("expression"),kind:this.view.model.get("kind")};this.service.validate(e).done(t.bind(function(e){this.view.model.set("availableSummaryFunctions",e.availableSummaries),this.view.model.isSummaryFunctionValid()||this.view.model.set("summaryFunction",e.summaryFunction),i&&i()},this)).fail(t.bind(function(i){this._handleServerError(i)},this))}},_validateCustomSummary:function(i){if(this.view.model.isExpressionValid("summaryExpression")){var e={expression:this.view.model.get("expression"),summaryFunction:this.view.model.get("summaryFunction"),summaryExpression:this.view.model.get("summaryExpression")};this.service.validate(e).done(t.bind(function(e){i&&i(e)},this)).fail(t.bind(function(i){this._handleServerError(i)},this))}}})});