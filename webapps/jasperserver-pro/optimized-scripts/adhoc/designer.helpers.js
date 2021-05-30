/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","prototype","./designer","./designer/aggregateFieldLabelFactory","underscore","jquery","runtime_dependencies/jrs-ui/src/dynamicTree/dynamicTree.utils","runtime_dependencies/jrs-ui/src/core/core.events.bis","runtime_dependencies/jrs-ui/src/core/core.layout","runtime_dependencies/jrs-ui/src/util/utils.common","runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator","../base/designer.base","runtime_dependencies/jrs-ui/src/components/components.dialogs"],function(e,t,n){var i=e("prototype"),r=i.$,a=i.$$,s=i.Template,o=i.Position,l=e("./designer"),d=e("./designer/aggregateFieldLabelFactory"),c=e("underscore"),u=e("jquery"),m=e("runtime_dependencies/jrs-ui/src/dynamicTree/dynamicTree.utils"),p=e("runtime_dependencies/jrs-ui/src/core/core.events.bis"),f=e("runtime_dependencies/jrs-ui/src/core/core.layout"),g=e("runtime_dependencies/jrs-ui/src/util/utils.common"),w=g.disableSelectionWithoutCursorStyle,v=g.enableSelection,S=e("runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator"),h=e("../base/designer.base"),y=e("runtime_dependencies/jrs-ui/src/components/components.dialogs");l.setDragStartState=function(e,t,n,i){var r=[Event.pointerX(i),Event.pointerY(i)],a=n.element,s=n.element=new Element("LI").update(u(a).html());s.classNames().set(a.classNames()),s.writeAttribute("fieldname",l.getFieldName()),s.setStyle({"z-index":a.getStyle("z-index")}),s.hide(),a.parentNode.appendChild(s),Element.clonePosition(s,a),o.absolutize(s),a.remove(),m.Tree.prototype.setDragStartState.apply(e,Array.prototype.slice.call(arguments,1)),n.draw(r),s.show()},l.deSelectAllPressedNavMuttons=function(){var e=a("UL#navigationOptions li");e&&e.each(function(e){p.out(r(e),function(e){return r(e).down(f.LIST_ITEM_WRAP_PATTERN)})})},l.hideAllDialogsAndMenus=function(){S.hideMenu(),Object.values(this.dialogESCFunctions).each(function(e){var t=r(e);t&&y.popup.hide(t)}.bind(this))},l.initPreventBrowserSelection=function(e){w(r(e))},l.initEnableBrowserSelection=function(e){v(r(e))},l.isNoDataToDisplay=function(){if(window.localContext.getMode()===h.TABLE)return u("#nothingToDisplay").is(":visible")},l.checkMaxRowsLimit=function(){if(window.localContext.state.hitMaxRows&&!this.isNoDataToDisplay()){var e=window.rowLimitMessage.replace("{0}",window.localContext.state.maxDataRowsCount);y.systemConfirm.show(e,5e3)}},l.isOnlyFieldsSelected=function(){var e=function(e){return e.hasChilds()};return null==this.getSelectedTreeNodes().detect(e)},l.showButtonMenuMouseOut=function(e){S.hideMenu(),Event.stopObserving(r(e),"mouseleave",l.showButtonMenuMouseOut)},l.isSelectedFieldCustom=function(){if(1==window.selObjects.length){var e=h.getSelectedObject();if(e.model)return e.model.isCustomField;var t=l.findFieldByName(l.getNameForSelected(e));return t&&t.isCustomField}},l.isSelectFieldsAllowed=function(){return window.isDomainType},l.isDeleteAllowed=function(){if(1!=window.selObjects.length)return!1;var e=h.getSelectedObject()?h.getSelectedObject().param.id:null,t=l.findFieldByName(e);return null!=t&&t.isCustomField&&!t.isUsed&&!l.isInUse(e)},l.isUsedInRowsOrColumns=function(e){return c.find(window.localContext.state.fieldsInUse,function(t){return t.split("_JRS_Measure")[0]===e})},l.canMoveToDimensions=function(){var e=window.selObjects.find(function(e){var t=l.findFieldByName(l.getNameForSelected(e));return t&&t.isCustomField&&t.aggregateField});return!window.selObjects.find(function(e){return e.param.id===h.SPACER_NAME||!(e.param.extra&&e.param.extra.isMeasure)||e.param.extra&&l.isUsedInRowsOrColumns(e.param.extra.id)})&&!e},l.canMoveToMeasures=function(){return!window.selObjects.find(function(e){return!!e.param&&(e.param.id===h.SPACER_NAME||e.param.extra&&e.param.extra.isMeasure||e.param.extra&&l.isUsedInRowsOrColumns(e.param.extra.id))})},l.getMessage=function(e,t){var n=l.messages[e];return n?new s(n).evaluate(t||{}):""},l.registerTemplate=function(e,t){if(!e||!t)throw"Some of required params to register template are missing";return e[t]||(e[t]=c.template(u("#"+t).html(),null,{evaluate:/\{\{([\s\S]+?)\}\}/g,interpolate:/\{\{=([\s\S]+?)\}\}/g,escape:/\{\{-([\s\S]+?)\}\}/g})),e[t]},l.createTemplate=function(e){if(!e)throw"Some of required params to register template are missing";var t=c.templateSettings;c.templateSettings={evaluate:/\{\{([\s\S]+?)\}\}/g,interpolate:/\{\{=([\s\S]+?)\}\}/g,escape:/\{\{-([\s\S]+?)\}\}/g};var n=c.template(u("#"+e).html());return c.templateSettings=t,n},l.hideOnePanel=function(){if(0===window.orientation){var e,t=document.getElementById("filters"),n=document.getElementById("fields"),i=u("#filter-container").find("div.panel.pane.filter").filter(":visible").length;t.className.indexOf("minimized")>=0||(e=i?n:t,f.minimize(e))}},l.defaultFieldJSONBuilder=function(e){return{dimensionId:e.param.extra.dimensionId,name:e.param.extra.id}},l.getListOfSelectedFields=function(e){var t=l.getSelectedTreeNodes();if(this.isOlapMode())return e=Object.isFunction(e)?e:l.defaultFieldJSONBuilder,t.collect(function(t){if(t.isParent()){return t.childs.detect(function(e){return window.localContext.canAddFilter(e)}).collect(e)}return window.localContext.canAddFilter(t)?e(t):null}).compact().flatten();for(var n=[],i=0;i<t.length;i++){var r=t[i];if(r.isParent()){for(var a=r.childs,s=0;s<a.length;s++){var o=a[s].param.id;window.localContext.canAddFilter(a[s])&&n.push(o)}if(0===n.length)continue}else{if(!window.localContext.canAddFilter(r))continue;n.push(r.param.id)}}return c.map(n,function(e){return{name:e}})},l.generateAvailableSummaryCalculationsMenu=function(e,t,n){var i=c.chain(window.localContext.state.fieldAvailableSummaries[e]).filter(function(e){return"None"!==e}).sortBy().value();i.unshift("None"),t.children=c.map(i,function(e){return S.createMenuElement("optionAction",c.extend({text:d.localizeAggregation(e),actionArgs:[e],isSelectedTestArgs:[e]},n))})},l.getMissingFieldsCanvasMessage=function(e){var t=c.reduce(e.allColumns,function(t,n){return c.contains(e.unresolvedMetadataReferences,n.name)?(t=t?t+", ":"")+(n.defaultDisplayName||n.name):t},""),n=l.getMessage("adhoc.inuse.designer.canvas.error.message");return n=n.replace("{0}",t)},n.exports=l});