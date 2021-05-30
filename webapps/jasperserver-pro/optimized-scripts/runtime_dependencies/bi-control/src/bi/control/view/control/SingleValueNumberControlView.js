/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../BaseInputControlView","text!../../template/singleValueNumberTemplate.htm"],function(e,t,n){var i=e("underscore"),a=e("../BaseInputControlView"),o=e("text!../../template/singleValueNumberTemplate.htm");n.exports=a.extend({template:o,updateValue:function(e){this.$el.find("input").val(e)},bindCustomEventListeners:function(){this.$el.on("change keyup","input",i.bind(function(e){this.model.changeState(e.target.value)},this)),this.model.state.on("change:value",function(e,t){this.updateValue(t)},this)},remove:function(){this.$el.off("change","input"),this.model.state.off("change:value",void 0,this),a.prototype.remove.call(this)}})});