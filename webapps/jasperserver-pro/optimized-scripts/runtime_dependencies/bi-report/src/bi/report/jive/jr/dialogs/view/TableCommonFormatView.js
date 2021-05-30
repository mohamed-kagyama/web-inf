/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone.epoxy","./bindigs/resetColorBinding","./bindigs/colorPickerBinding","./dateTimePickerEpoxyBindingHandler"],function(e,i,t){var n=e("underscore"),s=e("backbone.epoxy"),a=e("./bindigs/resetColorBinding"),c=e("./bindigs/colorPickerBinding"),l=e("./dateTimePickerEpoxyBindingHandler");t.exports=s.View.extend({constructor:function(e){this.i18n=e.i18n,s.View.prototype.constructor.call(this,e)},bindingHandlers:{radioDiv:{init:function(e,i,t,s){var a=e.data("model-attr");this.$el=e;var c=function(i){t[a](e.data("value"))};this.callback=n.bind(c,this),this.$el.on("click",this.callback)},set:function(e,i){var t=e.siblings("div[data-bind*='radioDiv']");e.data("value")===i&&(e.addClass("selected"),t.removeClass("selected"))},clean:function(){this.$el.off("click",this.callback)}},checkboxDiv:{init:function(e,i,t,s){var a=e.data("model-attr");this.$el=e,this.isTrippleState=!!this.$el.data("tripplestate");var c=function(i){t[a](this._get(e))};this.callback=n.bind(c,this),this.$el.on("click",this.callback)},set:function(e,i){!0===i?e.removeClass("unchanged").addClass("selected"):!1===i?e.removeClass("unchanged").removeClass("selected"):e.removeClass("selected").addClass("unchanged")},_get:function(e){return this.isTrippleState?!!e.is(".unchanged")||!e.is(".selected")&&null:!e.is(".selected")},clean:function(){this.$el.off("click",this.callback)}},resetColor:a(),colorpicker:c(),dateTimePicker:l}})});