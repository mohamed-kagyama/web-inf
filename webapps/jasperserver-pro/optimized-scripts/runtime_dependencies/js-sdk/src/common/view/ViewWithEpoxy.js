/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","underscore","./mixin/epoxyViewMixin"],function(e,i,t){var o=e("backbone"),n=e("underscore"),r=e("./mixin/epoxyViewMixin"),p=o.View.extend({el:function(){return this.template({i18n:this.i18n,model:this.model.toJSON(),options:this.options})},constructor:function(e){if(e||(e={}),!e.template)throw new Error("Template must be defined");if(!e.model)throw new Error("Model must be defined");this.template=n.template(e.template),this.model=e.model,this.i18n=e.i18n||{},this.options=n.omit(e,"model","template","i18n"),o.View.apply(this,arguments)},initialize:function(){this.epoxifyView()},render:function(){return this.applyEpoxyBindings(),this},remove:function(){this.removeEpoxyBindings(),o.View.prototype.remove.apply(this,arguments)}});n.extend(p.prototype,r),t.exports=p});