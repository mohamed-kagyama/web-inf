/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../BaseInputControlView","runtime_dependencies/js-sdk/src/components/sizer/Sizer","jquery","underscore","../../util/inputControlHelpers","text!../../template/singleSelectRadioTemplate.htm","text!../../template/radioInputItem.htm"],function(t,e,i){var n=t("../BaseInputControlView"),s=t("runtime_dependencies/js-sdk/src/components/sizer/Sizer"),o=t("jquery"),h=t("underscore"),a=t("../../util/inputControlHelpers"),r=t("text!../../template/singleSelectRadioTemplate.htm"),l=t("text!../../template/radioInputItem.htm");i.exports=n.extend({template:r,renderStructure:function(){return this.$el=o(h.template(this.template||"")(this._renderData())),this.$radioContainer=this.$el.find(".jr-mInput-set"),this.renderOptions(),this.once("attached",this._checkForRealAttachedToDOM,this),this},renderOptions:function(){var t=this.$radioContainer.find("ul")[0],e=h.map(this.model.state.options.toJSON(),function(t){var e=h.clone(t);return e.readOnly=this.model.get("readOnly"),e.name=this.getOptionName(),e.uuid="jr-label-id-"+h.uniqueId(this.model.get("id")),e},this);a.setInnerHtml(t,function(t){return h.template(l)(t)},{data:e}),this._handleHeight()},updateOptionsSelection:function(){var t=this;this.model.state.options.each(function(e){t.$radioContainer.find("input[value='"+e.get("value")+"']").prop("checked",e.get("selected"))}),this._handleHeight()},_checkForRealAttachedToDOM:function(){this._getItemHeight()?(this.attached=!0,this.$radioContainer.height(this._calcHeightByItemsCount(5)),this._initSizer()):h.delay(h.bind(this._checkForRealAttachedToDOM,this),500)},_initSizer:function(){this.sizer=new s({container:this.$radioContainer}),this.$el.append(this.sizer.$el),this._handleHeight()},_handleHeight:function(){var t=this.model.state.options.length;if(this.attached&&t&&this._getItemHeight()){var e=this.$radioContainer.height(),i=e,n=this._calcHeightByItemsCount(3),s=this._calcHeightByItemsCount(t)+2;t<=5?n=s=i=this._calcHeightByItemsCount(Math.max(3,t)):e>s&&(i=this._calcHeightByItemsCount(t)),this.$radioContainer.height(i),this.sizer.updateMinMax({minHeight:n,maxHeight:s}),n===s?(this.sizer.hide(),this.$radioContainer.css("overflow-y","auto")):(this.sizer.show(),this.$radioContainer.css("overflow-y","scroll"))}},_calcHeightByItemsCount:function(t){return t*this._getItemHeight()+Math.round(parseFloat(this.$radioContainer.find("ul").css("margin-top"))||0)},_getItemHeight:function(){return this.$radioContainer.find("li").outerHeight()},getOptionName:function(){return this.model.get("id")+"_option"},bindCustomEventListeners:function(){if(!this.model.get("readOnly")){var t=this;this.$el.on("change","input",h.bind(function(e){var i=e.target.value;setTimeout(function(){t.model.changeState(i)})},this))}this.model.state.options.on("reset",this.renderOptions,this),this.model.state.options.on("change:selected",this.updateOptionsSelection,this)},remove:function(){this.$el.off("change","input"),this.singleSelect&&this.singleSelect.remove(),this.model.state.options.off("reset",this.renderOptions,this),this.model.state.options.off("change:selected",this.updateOptionsSelection,this),n.prototype.remove.call(this)}})});