/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery","../base/Dimmer","../panel/Panel","../base/OptionContainer","../panel/trait/resizablePanelTrait","text!./template/dialogTemplate.htm","text!./template/dialogButtonTemplate.htm","jquery-ui/ui/widgets/draggable"],function(t,e,i){var s=t("underscore"),n=t("jquery"),o=t("../base/Dimmer"),a=t("../panel/Panel"),h=t("../base/OptionContainer"),l=t("../panel/trait/resizablePanelTrait"),r=t("text!./template/dialogTemplate.htm"),d=t("text!./template/dialogButtonTemplate.htm");t("jquery-ui/ui/widgets/draggable");var u=a.extend({defaultTemplate:r,events:{mousedown:"_focus",touchstart:"_focus",keydown:"_onKeyDown",keyup:"_onKeyboardEvent",keypress:"_onKeyboardEvent",resize:"_onDialogResize"},constructor:function(t){t||(t={}),t.traits||(t.traits=[]),this.resizable=t.resizable||!1,this.modal=t.modal||!1,this.additionalBodyCssClasses=t.additionalBodyCssClasses||"",this.resizable&&-1===s.indexOf(t.traits,l)&&t.traits.push(l),a.call(this,t)},initialize:function(t){this.dialogOptions=s.extend({},t),this.collapsed=!this.collapsed,this.resetSizeOnOpen=!!s.isUndefined(t.resetSizeOnOpen)||t.resetSizeOnOpen,s.isEmpty(t.buttons)||(this.buttons=new h({options:t.buttons,el:this.$(".jr-mDialog-footer")[0]||this.$(".footer")[0],contextName:"button",optionTemplate:t.dialogButtonTemplate||d})),a.prototype.initialize.apply(this,arguments),this.buttons&&this.listenTo(this.buttons,s.map(t.buttons,function(t){return"button:"+t.action}).join(" "),s.bind(function(t,e){this.trigger("button:"+e.get("action"),t,e)},this)),this.render()},getTemplateArguments:function(){var t=a.prototype.getTemplateArguments.apply(this,arguments);return s.extend(t,{additionalBodyCssClasses:this.additionalBodyCssClasses})},setElement:function(t){var e=a.prototype.setElement.apply(this,arguments);return this.buttons&&this.buttons.setElement(this.$(".jr-mDialog-footer")[0]||this.$(".footer")[0]),e},setTitle:function(t){this.$(".jr-mDialog-header > .jr-mDialog-header-title").text(t)},render:function(){return this.$el.hide(),this.modal&&(this.dimmer=new o({zIndex:900})),n("body").append(this.$el),this.$el.draggable({handle:".mover",addClasses:!1,containment:"document"}),this},open:function(t){if(this.isVisible())return this;this.resetSizeOnOpen&&(this.$el.css({height:"",width:""}),this.$el.find("textarea").css({height:"",width:""})),a.prototype.open.apply(this,arguments),this.modal&&this.dimmer.css({zIndex:++u.highestIndex}).show(),this._setMinSize();var e=this._position(t);return this.$el.css({top:e.top,left:e.left,position:"absolute"}),this._increaseZIndex(),this.buttons&&this.buttons.$(".over").removeClass("over"),this.$el.show(),this.$el.find("input").first().focus(),this._onDialogResize(),this.trigger("dialog:visible"),this},close:function(){if(this.isVisible())return this.$el.css({zIndex:--u.highestIndex}),this.modal&&this.dimmer.css({zIndex:--u.highestIndex}).hide(),this.$el.hide(),a.prototype.close.apply(this,arguments),this},addCssClasses:function(t){this.$el.addClass(t)},toggleCollapsedState:function(){return this},enableButton:function(t){this.buttons.enable(t)},disableButton:function(t){this.buttons.disable(t)},isVisible:function(){return this.$el.is(":visible")},_setMinSize:function(){this.dialogOptions.minWidth&&this.$el.css({minWidth:this.dialogOptions.minWidth}),this.dialogOptions.minHeight&&this.$el.css({minHeight:this.dialogOptions.minHeight}),this.dialogOptions.setMinSizeAsSize&&this.$el.css({width:this.dialogOptions.minWidth,height:this.dialogOptions.minHeight})},_position:function(t){var e,i,s=n("body"),o=this.$el.height(),a=this.$el.width();if(t&&void 0!==t.top&&void 0!==t.left){e=t.top,i=t.left;var h=s.height(),l=s.width(),r=h-t.top,d=l-t.left;r<o&&(e=t.top-o,e=e<0?h/2-o/2:e),d<a&&(i=t.left-a,i=i<0?l/2-a/2:i)}else e=n(window).height()/2-o/2,i=n(window).width()/2-a/2;return{top:Math.max(0,e),left:Math.max(0,i)}},_focus:function(){!this.modal&&this._increaseZIndex()},_increaseZIndex:function(){this.$el.css({zIndex:++u.highestIndex})},_onKeyDown:function(t){this.buttons._onKeyDown(t),t.stopPropagation()},_onKeyboardEvent:function(t){t.stopPropagation()},_onDialogResize:function(){},remove:function(){this.buttons&&this.buttons.remove(),this.dimmer&&this.dimmer.remove();try{this.$el.draggable("destroy")}catch(t){}a.prototype.remove.call(this)}},{highestIndex:5e3,resetHighestIndex:function(t){u.highestIndex=t||5e3}});i.exports=u});