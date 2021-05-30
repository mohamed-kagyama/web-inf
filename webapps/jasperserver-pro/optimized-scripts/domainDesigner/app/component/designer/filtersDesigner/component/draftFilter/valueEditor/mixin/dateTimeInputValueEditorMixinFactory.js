/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../enum/rightOperandValueFormatEnum"],function(e,t,r){var n=e("underscore"),i=e("../../../../enum/rightOperandValueFormatEnum");r.exports={create:function(e){var t=e.filtersDesignerEventBus,r=e.dateAndTimePickerOptionsFactory,a=e.defaultRightOperandValueFormatEnum||i;return{computed:{dateAndTimePickerOptions:function(){return r.create({dataType:this.filter.dataType,onSelect:n.bind(this.onSelect,this)})}},directives:{dateAndTimePicker:e.dateAndTimePicker},methods:{onSelect:function(e){e=a[this.filter.rightOperand.type](e),t.trigger("draftFilter:changeValue",e)}}}}}});