/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","underscore"],function(e,s,t){var i=e("backbone"),o=e("underscore");t.exports=i.View.extend({events:{click:"select",mouseover:"mouseover",mouseout:"mouseout"},constructor:function(e){if(!e||!e.template)throw new Error("Option should have defined template");if(!(e.model&&e.model instanceof i.Model))throw new Error("Option should have associated Backbone.Model");this.template=o.template(e.template),this.disabledClass=e.disabledClass,this.hiddenClass=e.hiddenClass,this.toggleClass=e.toggleClass,this.overClass=e.overClass||"over",i.View.apply(this,arguments)},initialize:function(){i.View.prototype.initialize.apply(this,arguments);var e=this;!0===this.model.get("disabled")&&this.disable(),!0===this.model.get("hidden")&&this.hide(),!0===this.model.get("selected")&&this.addSelection(),this.listenTo(this.model,"change:over",function(s,t){t?e.$("> p").addClass(e.overClass):e.$("> p").removeClass(e.overClass)})},el:function(){return this.template(this.model.toJSON())},enable:function(){this.$el.removeAttr("disabled").removeClass(this.disabledClass)},disable:function(){this.$el.attr("disabled","disabled").addClass(this.disabledClass)},over:function(){this.model.set({over:!0})},leave:function(){this.model.set({over:!1})},show:function(){this.$el.show().removeClass(this.hiddenClass)},hide:function(){this.$el.hide().addClass(this.hiddenClass)},isVisible:function(){return this.$el.is(":visible")},isDisabled:function(){return this.$el.is(":disabled")},select:function(e){this.model.trigger("select",this,this.model,e),this.trigger("click",this,this.model,e)},addSelection:function(){this.$el.addClass(this.toggleClass),this.model.set("selected",!0)},removeSelection:function(){this.$el.removeClass(this.toggleClass),this.model.unset("selected")},mouseover:function(e){this.trigger("mouseover",this,this.model,e)},mouseout:function(e){this.trigger("mouseout",this,this.model,e)}})});