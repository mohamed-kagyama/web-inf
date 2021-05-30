/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery","./dateTrait","./InputRangeValueEditor"],function(e,t,n){var i=e("underscore"),r=e("jquery"),s=e("./dateTrait"),o=e("./InputRangeValueEditor"),a=o.prototype;n.exports=o.extend(i.extend({},s,{onChange:function(e){this.model.set("isAnyValue",!1,{silent:!0}),a.onChange.call(this,e)},registerEvents:function(){a.registerEvents.call(this),this.$el.on("change","input[type=checkbox]",i.bind(function(e){var t=r(e.target).prop("checked");this.model.set("isAnyValue",t),t&&(this.model._setDefaultValue(),this.render())},this))}}))});