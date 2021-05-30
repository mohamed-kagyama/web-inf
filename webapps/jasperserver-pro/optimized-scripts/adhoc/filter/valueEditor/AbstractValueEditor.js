/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","underscore","../validation/ValidationError","runtime_dependencies/js-sdk/src/common/extension/backboneValidationExtension"],function(i,e,t){var n=i("backbone"),a=i("underscore"),r=i("../validation/ValidationError");i("runtime_dependencies/js-sdk/src/common/extension/backboneValidationExtension"),t.exports=n.View.extend({constructor:function(i){this.initOptions=i,this.template=a.template(i.template),n.View.apply(this,arguments)},i18nModel:function(i){return i.i18n=this.initOptions.i18n,i},serializeModel:function(){return this.model.toJSON()},modelVariableName:"value",initialize:function(i){n.Validation.bind(this,{valid:this.validCallback,invalid:this.invalidCallback,selector:"data-validation-field"}),this.init(i),this.render(),this.initView(i),this.registerEvents(),i.modelVariable&&(this.modelVariableName=i.modelVariable)},validCallback:function(i,e,t){i.markSingleFieldAsValid(e,t)},invalidCallback:function(i,e,t,n){i.markSingleFieldAsInvalid(e,t,n)},markSingleFieldAsValid:function(i,e){this.$("["+e+'="'+i+'"]').text("").parent().removeClass("error")},markSingleFieldAsInvalid:function(i,e,t){e=a.isArray(e)?e[0]:e,this.$("["+t+'="'+i+'"]').text(e instanceof r?e.getMessage():e).parent().addClass("error")},init:function(i){},initView:function(i){},removeView:function(){},registerEvents:function(){},render:function(){return this.$el.html(this.template(this.i18nModel(this.serializeModel()))),this.trigger("rendered",this),this},convert:function(i){return this.valueConverter?this.valueConverter(i):i},getValue:function(){return this.model.get(this.modelVariableName)},setValue:function(i){this.model.set(this.modelVariableName,i,{validate:!0})},updateData:function(){this.render()},remove:function(){return this.removeView(),n.Validation.unbind(this),n.View.prototype.remove.call(this),this}})});