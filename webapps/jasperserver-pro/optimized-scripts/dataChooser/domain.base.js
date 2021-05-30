/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","prototype","underscore","runtime_dependencies/jrs-ui/src/util/utils.common","runtime_dependencies/jrs-ui/src/core/core.ajax","../core/core.ajax.utils","runtime_dependencies/jrs-ui/src/core/core.events.bis","runtime_dependencies/jrs-ui/src/dynamicTree/dynamicTree.utils","runtime_dependencies/js-sdk/src/common/util/xssUtil","runtime_dependencies/js-sdk/src/common/util/parse/date","momentExtension","runtime_dependencies/js-sdk/src/common/util/parse/NumberUtils"],function(e,r,t){var n=e("prototype"),o=n.$,i=n.Template,d=n.$break,a=n.$$,l=e("underscore"),s=e("runtime_dependencies/jrs-ui/src/util/utils.common"),u=s.buildActionUrl,c=s.matchAny,h=s.isSupportsTouch,m=s.deepClone,f=e("runtime_dependencies/jrs-ui/src/core/core.ajax"),p=f.AjaxRequester,b=f.ajaxTargettedUpdate,N=e("../core/core.ajax.utils"),C=N.baseErrorHandler,v=e("runtime_dependencies/jrs-ui/src/core/core.events.bis"),g=e("runtime_dependencies/jrs-ui/src/dynamicTree/dynamicTree.utils"),_=e("runtime_dependencies/js-sdk/src/common/util/xssUtil"),y=e("runtime_dependencies/js-sdk/src/common/util/parse/date"),M=e("momentExtension"),T=e("runtime_dependencies/js-sdk/src/common/util/parse/NumberUtils"),E=new T,O={PROPAGATE_EVENT:"propagateEvent",_messages:{},disabledFolderTooltip:"disabledFolderTooltip",attributesPattern:new RegExp("\\s*attribute\\s*\\(\\s*'[^\\/'\\s][^\\/']*'(?:\\s*,\\s*'[^\\/'\\s][^\\/']*')*\\s*\\)\\s*"),getMessage:function(e,r){var t=this._messages[e];return t?new i(t).evaluate(r||{}):""},setMessage:function(e,r){this._messages[e]=r},treeErrorHandler:function(){throw"exception while loading tree"},submitForm:function(e,r,t){if(r){var n=u(r);t&&t(),o(e).writeAttribute("method","post").writeAttribute("action",n),o(e).submit()}},sendAjaxRequest:function(e,r,t,n){var o=u(e),i={postData:Object.toQueryString(r),callback:t,errorHandler:this._serverErrorHandler,mode:p.prototype.EVAL_JSON};n&&Object.extend(i,n),b(o,i)},_serverErrorHandler:function(e,r){return C(e)},elementClicked:function(e,r){return!(!e||!r)&&c(e,[r],!0)},basicClickHandler:function(e,r,t){var n=null;return r.any(function(r){if(n=O.elementClicked(e,r.key))return Object.isFunction(r.value)?r.value(n):Object.isFunction(t)&&t(r.value),!0})},registerClickHandlers:function(e,r,t){if(O._bodyClickEventHandlers)return void(t?Array.prototype.unshift:Array.prototype.push).apply(O._bodyClickEventHandlers,e);O._bodyClickEventHandlers=e,a(r||"body")[0].observe(h()?"touchstart":"click",function(e){var r=e.element();O._bodyClickEventHandlers&&O._bodyClickEventHandlers.each(function(t){var n=t(r);if(n)throw n!==O.PROPAGATE_EVENT&&Event.stop(e),d})})},enableButton:function(e,r){"string"==typeof e&&(e=o(e)),e.disabled=r,r?v.enable(e):v.disable(e)},setOptionsToSelect:function(e,r){if(e&&(e.update(""),r))return r.each(function(r){var t={value:r.value,title:r.label};r.selected&&(t.selected="selected");var n=new Element("option",t);n.appendChild(document.createTextNode(r.label)),e.appendChild(n)}),e},getDataIslandId:function(e,r){var t=g.trees[e.getTreeId()].getRootNode();return function e(r,n){return null===r.parent||r.parent===t?r.param.extra[n]:e(r.parent,n)}(e,r)},areNodesFromSameIsland:function(e,r){return!!e.any(function(e){return e.param.extra.isConstant})||(!(1!==e.pluck("parent").uniq().length)||1===e.map(function(e){return O.getDataIslandId(e,r||"itemId")}).uniq().length)},NumberFormat:function(e,r){var t="."===e,n=new RegExp("["+e.gsub(/\s/,"\\s")+"]+"),o=new RegExp("["+r.gsub(/\s/,"\\s")+"]+"),i=new RegExp("^-|\\"+r+"?\\d+|\\"+r+"$|\\"+e+"+","g");return{toNumber:function(e){return!e||!t&&/[.]/.test(e)?NaN:Number(e.gsub(o,"").gsub(n,"."))||O.attributesPattern.test(e)},normalizeNumberEntry:function(t){var n=t.strip(),o=n.match(O.attributesPattern)||n.match(i);if(!o)return"";for(var d=!1,a=0;a<o.length;a++)o[a].startsWith(e)?d?delete o[a]:(o[a]=e,d=!0):o[a].startsWith(r)&&d&&(o[a]=o[a].substring(1));return o.join("")},isInteger:function(e){return n.test(e)}}},baseValidator:function(e,r){var t=!0,n="";return e()&&(n=r,t=!1),{isValid:t,errorMessage:n}},maxLengthValidator:function(e,r,t){return O.baseValidator(function(e,r){return e.length>r}.curry(e,r),t)},minLengthValidator:function(e,r,t){return O.baseValidator(function(e,r){return e.length<r}.curry(e,r),t)},valueNotEmptyValidator:function(e,r){return O.baseValidator(function(e){return Object.isArray(e)&&0===e.length||!e||!String(e).strip()}.curry(e),r)},stringIdValidator:function(e,r){return O.baseValidator(function(e){return!/^[^0-9() .,'"=!+-\/><\/\/:][^() .,'"=!+-\/><\/\/:]*$/.test(e)}.curry(e),r)},numberValidator:function(e,r,t){return O.baseValidator(isNaN.curry(r.toNumber(e)),t)},numberBoundsValidator:function(e,r,t){return O.baseValidator(function(e,r){return e===E.MinRange||e===E.MaxRange||!(e<=r.max&&e>=r.min)}.curry(e,r),t)},rangeValidator:function(e,r,t){return O.baseValidator(function(e,r){return!(e<r)}.curry(e,r),t)},dateValidator:function(e,r,t,n){return O.baseValidator(function(){var n=y.toMomentDateOrTimeOrTimestampPattern(r,t);return!M(e,n,!0).isValid()&&!O.attributesPattern.test(e)},n)},unescapeTree:function e(r){r.hasChilds()&&l.each(r.childs,function(r){e(r)}),r.name=_.unescape(r.name)}};O.NodeCopyMoveController=function(){},O.NodeCopyMoveController.addMethod("copy",function(e,r,t){if(e&&e.length>0&&r){var n=g.trees[r.getTreeId()],o=e.collect(function(e){var o=e.param.id,i=this._copyParentStructure(e,n);return i?this._mergeToDestTree(i,r,o,t):null}.bind(this));return r.isloaded=!0,o.without(null)}}),O.NodeCopyMoveController.addMethod("copySelected",function(e,r){if(window.sourceTree&&r)return this.copy(window.sourceTree.selectedNodes,r)}),O.NodeCopyMoveController.addMethod("move",function(e,r){if(e&&r){var t=this.copy(e,r);return this.hide(e),t}}),O.NodeCopyMoveController.addMethod("moveSelected",function(e,r){if(e&&r)return this.move(e.selectedNodes,r)}),O.NodeCopyMoveController.addMethod("hide",function(e,r,t){if(e&&e.length>0){r||(r=this._getVisibleChildrenCount),t||(t=function(e,r){e.hide(r)});var n=g.trees[e[0].getTreeId()];e.collect(function(e){return e.id}).each(function(e){var o=g.nodes[e];t(o,!0);for(var i=o.parent;i&&i!=n.getRootNode()&&!(r(i)>0);)t(i,!1),i.refreshStyle(),i=i.parent}.bind(this))}}),O.NodeCopyMoveController.addMethod("_handleDuplicatedNode",function(e,r){return e.param.id}),O.NodeCopyMoveController.addMethod("_markAsLoaded",function(e){e.isloaded=!0,e.isParent()&&e.childs.each(function(e){this._markAsLoaded(e)}.bind(this))}),O.NodeCopyMoveController.addMethod("_mergeToDestTree",function(e,r,t,n){if(r){var o=g.trees[r.getTreeId()];if(n)return t=this._handleDuplicatedNode(e,r),o.findNodeById(t,e);var i=o.findNodeChildByMetaName(r,e.param.id);return null!=i?(i.isHidden()&&i.show(),e.hasChilds()&&(i.disabled&&i.enable(e.tooltip),e.childs.each(function(e){this._mergeToDestTree(e,i)}.bind(this))),o.findNodeById(t,i)):(r.addChild(e),this._markAsLoaded(e),o.findNodeById(t,e))}}),O.NodeCopyMoveController.addMethod("_copyParentStructure",function(e,r){if(e&&r){var t=g.trees[e.getTreeId()];if(e.disabled)return null;for(var n=this._copyNode(e,r,!0),o=e.parent,i=null;o&&o!=t.getRootNode();)i=this._copyNode(o,r,!1),i.addChild(n),n=i,o=o.parent;return n}}),O.NodeCopyMoveController.addMethod("_buildMetanode",function(e){return m(e.param)}),O.NodeCopyMoveController.addMethod("_copyNode",function(e,r,t){if(e&&r){var n=r.processNode(this._buildMetanode(e));t&&(e.hasChilds()?e.childs.each(function(e){if(!e.disabled){var e=this._copyNode(e,r,t);e&&n.addChild(e)}}.bind(this)):n.setHasChilds(!1));var o=e.childs.findAll(function(e){return e.disabled});return e.childs.length>0&&o.length==e.childs.length?null:n}}),O.NodeCopyMoveController.addMethod("_delete",function(e){e&&e.collect(function(e){return e.id}).each(function(e){var r=g.nodes[e];r&&r.parent.removeChild(r)})}),O.NodeCopyMoveController.addMethod("_getVisibleChildrenCount",function(e){var r=e.childs.findAll(function(e){return e.isHidden()});return e.childs.length-r.length}),O.resetTreeSelectionHandler={_COMMON_ELEMENTS_TO_SAVE_SELECTION:["#pageDimmer","#detail","#standardConfirm"],_getTrees:null,_elementIds:null,_callback:null,_validator:null,init:function(e,r,t,n){O.resetTreeSelectionHandler._init.bind(O.resetTreeSelectionHandler,e,r,t,n)()},_init:function(e,r,t,n){this._getTrees=r,this._callback=t,this._validator=n,this._elementIds=this._COMMON_ELEMENTS_TO_SAVE_SELECTION.concat(e),O.registerClickHandlers([this._removeTreeSelectionClickEventHandler.bind(this)],null,!0)},_removeTreeSelectionClickEventHandler:function(e){if(!c(e,this._elementIds,!0)){var r=!1;return this._getTrees().each(function(e){if(e.selectedNodes&&e.selectedNodes.first())throw r=!0,d}),r?!(!this._validator||this._validator())||(this._getTrees().each(function(e){e._deselectAllNodes()}),this._callback&&this._callback(),!1):!1}}},O.NodeChangeOrderController=function(){},O.NodeChangeOrderController.addMethod("findNodeWithSpecificOrder",function(e,r,t){for(var n=e.length-1;n>=0;n--)if(e[n].isSelected()==t&&e[n].orderNumber===r)return e[n];return null}),O.NodeChangeOrderController.addMethod("findMaxSiblingNode",function(e,r,t){var n=null,o=null;return e.each(function(e){e.isSelected()==r&&(null!==n&&t!=e.orderNumber<n||(n=e.orderNumber,o=e))}),o}),O.NodeChangeOrderController.addMethod("moveNode",function(e,r,t,n){var o=e.orderNumber,i=e.parent.childs,d=null,a=null;t?(d=this.findMaxSiblingNode(i,!1,r,e.param.type),a=d?d.orderNumber:-1,i.each(function(t){t.param.id!==e.param.id&&(r==t.orderNumber>a&&r==t.orderNumber<o||t.orderNumber==a)&&(t.orderNumber=r?t.orderNumber+1:t.orderNumber-1,n&&n(t,t.orderNumber))}),n&&n(e,a),e.orderNumber=a):(a=r?e.orderNumber-1:e.orderNumber+1,(d=this.findNodeWithSpecificOrder(i,a,!1))&&(n&&n(e,a),n&&n(d,o),e.orderNumber=a,d.orderNumber=o))}),O.NodeChangeOrderController.addMethod("nodeAscSorter",function(e,r){return e.orderNumber-r.orderNumber}),O.NodeChangeOrderController.addMethod("nodeDescSorter",function(e,r){return r.orderNumber-e.orderNumber}),O.DisplayNodeChangeOrderController=function(){O.NodeChangeOrderController.call()},O.DisplayNodeChangeOrderController.prototype=m(O.NodeChangeOrderController.prototype),O.DisplayNodeChangeOrderController.addMethod("findMaxSiblingNode",function(e,r,t,n){var o=null,i=null;return e.each(function(e){e.isSelected()==r&&(null!==o&&t!=e.orderNumber<o||n&&e.param.type!==n||(o=e.orderNumber,i=e))}),i}),t.exports=O});