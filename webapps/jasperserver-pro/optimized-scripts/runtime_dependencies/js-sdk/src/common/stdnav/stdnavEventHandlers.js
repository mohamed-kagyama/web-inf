/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","../logging/logger"],function(e,n,i){var t=e("jquery"),s=e("../logging/logger"),a=s.register("stdnav");i.exports={_onClick:function(e){var n=t(e.target);if(1===n.length){if(null!=this._buildBehavior(n).click){!1===this.runAction("click",e.target)&&(e.stopPropagation(),e.preventDefault())}}},_onMouseDown:function(e){var n=t(e.target);if(1===n.length){if(null!=this._buildBehavior(n).mousedown){!1===this.runAction("mousedown",e.target)&&(e.stopPropagation(),e.preventDefault())}}},_onMouseUp:function(e){var n=t(e.target);if(1===n.length){if(null!=this._buildBehavior(n).mouseup){!1===this.runAction("mouseup",e.target)&&(e.stopPropagation(),e.preventDefault())}}},_onLabeledTagOver:function(e){var n=t(e.currentTarget);n.attr("aria-label")&&n.data("title")&&n.attr("title",n.attr("aria-label"))},_onKeydown:function(e){e.target;if(0!==t(".subfocus").length){var n=t(".subfocus")[0],i=t(n).prop("nodeName");if(t(n).is(":input")||t.inArray(i,["INPUT","SELECT","OBJECT","TEXTAREA"])>-1)if("INPUT"===i){if(0===t(n).closest(".j-toolbar").length)return}else if("BUTTON"!==i&&27!==e.keyCode)return;var s;switch(e.keyCode){case 13:s="enter";break;case 27:s="exit";break;case 32:s="toggle";break;case 33:s="pageup";break;case 34:s="pagedown";break;case 35:s="end";break;case 36:s="home";break;case 37:s="left";break;case 38:s="up";break;case 39:s="right";break;case 40:s="down";break;case 91:s="structleft";break;case 93:s="structright"}if(!this.nullOrUndefined(s)){var a=this.runAction(s,n);this.nullOrUndefined(a)||(e.stopPropagation(),e.preventDefault(),this.forceFocus(a))}}},basicClick:function(e,n){var i=this.runAction("fixfocus",e);return this.nullOrUndefined(i)?a.debug("stdnav.basicClick: "+e.nodeName+"#"+e.id+" has no navigable ancestor, ignoring"):(a.debug("stdnav.basicClick("+e.nodeName+"#"+e.id+") refocusing to "+i.nodeName+"#"+i.id),this.nullOrUndefined(i)||this.forceFocus(i)),!0},basicFixFocus:function(e,n){if(this.isNavigable(e)||t(e).is(":input"))return e;var i=this.closestNavigableAncestor(e);return this.nullOrUndefined(i)?null:i},basicFixSuperfocus:function(e,n){var i=null;if(t(e).is(":input,fieldset")){var s=t(e).closest("form");t(e).closest("form"),s.length>0&&(i=s[0])}else i=this.isNavigable(e)?e:this.closestNavigableAncestor(e);return null!==i&&void 0!==i||(i=e),i},parentFixSuperfocus:function(e,n){return this.basicFixSuperfocus(e.parentNode,n)},basicFixSubfocus:function(e,n){return e},basicFocusIn:function(e,n){return a.debug("stdnav.basicFocusIn("+e.nodeName+"#"+e.id+")"),e},basicFocusOut:function(e,n){return a.debug("stdnav.basicFocusOut("+e.nodeName+"#"+e.id+")"),null},basicMouseDown:function(e,n){var i=this.runAction("fixfocus",e);return this.nullOrUndefined(i)?a.debug("stdnav.basicClick: "+e.nodeName+"#"+e.id+" has no navigable ancestor, ignoring"):(a.debug("stdnav.basicClick("+e.nodeName+"#"+e.id+") refocusing to "+i.nodeName+"#"+i.id),this.nullOrUndefined(i)||this.forceFocus(i)),!0},basicMouseUp:function(e,n){return!0},basicSuperfocusIn:function(e,n){a.debug("stdnav.basicSuperfocusIn("+e.nodeName+"#"+e.id+")");var i=null;if("focusSelector"in n){var s=":input,fieldset,"+n.focusSelector+'[js-navigable!="false"]',o=null;"barrier"in n&&(o=n.barrier);var u=this._maxNavDepth;"maxdepth"in n&&(u=n.maxdepth),"ghostfocus"in n&&!0===n.ghostfocus&&(i=this.closestDescendant(e,s+" .ghostfocus",o,u),t(i).removeClass("ghostfocus")),null==i&&(i=this.closestDescendant(e,s,o,u))}return null==i&&(i=e),i},basicSuperfocusOut:function(e,n){return a.debug("stdnav.basicSuperfocusOut("+e.nodeName+"#"+e.id+")"),"ghostfocus"in n&&!0===n.ghostfocus&&this._priorFocus&&t(this._priorFocus).addClass("ghostfocus"),null},basicSubfocusIn:function(e,n){return a.debug("stdnav.basicSubfocusIn("+e.nodeName+"#"+e.id+")"),null},basicSubfocusOut:function(e,n){return a.debug("stdnav.basicSubfocusOut("+e.nodeName+"#"+e.id+")"),null},basicEnter:function(e,n){a.debug("stdnav.basicEnter("+e.nodeName+"#"+e.id+")");var i=this.closestNavigableDescendant(e);return void 0!==i&&this.runAction("enter",i),e},basicToggle:function(e,n){a.debug("stdnav.basicToggle("+e.nodeName+"#"+e.id+")");var i=this.closestNavigableDescendant(e);return void 0!==i&&this.runAction("toggle",i),null},basicExit:function(e,n){a.debug("stdnav.basicExit("+e.nodeName+"#"+e.id+")");var i=this.closestNavigableAncestor(t(".superfocus"));return i||(i=t("#searchInput")),void 0!==i&&this.runAction("rejoined",i[0]),i[0]},basicRejoined:function(e,n){a.debug("stdnav.basicRejoined("+e.nodeName+"#"+e.id+")")}}});