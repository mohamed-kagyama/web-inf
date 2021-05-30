/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","prototype","bundle!adhoc_messages","./designer","../base/designer.base","runtime_dependencies/jrs-ui/src/dynamicTree/dynamicTree.utils","runtime_dependencies/jrs-ui/src/util/utils.common","runtime_dependencies/jrs-ui/src/components/components.dialogs","jquery","underscore","./table.init","runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator","./designer.calculatedFields"],function(e,t,n){var a=e("prototype"),i=a.$break,l=e("bundle!adhoc_messages"),r=e("./designer"),o=e("../base/designer.base"),d=e("runtime_dependencies/jrs-ui/src/dynamicTree/dynamicTree.utils"),s=e("runtime_dependencies/jrs-ui/src/util/utils.common"),c=s.isNotNullORUndefined,u=e("runtime_dependencies/jrs-ui/src/components/components.dialogs"),m=e("jquery"),f=e("underscore"),w=e("./table.init"),C=e("runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator"),A=e("./designer.calculatedFields");r.addFieldToCanvas=function(){window.localContext.getMode()===o.TABLE?w.addFieldAsColumn():window.localContext.getMode()===o.CROSSTAB?window.localContext.addFieldAsLastMeasure():window.localContext.getMode()===o.CHART&&window.localContext.addFieldAsMeasure()},r.checkIfFieldIsNumeric=function(e){var t=r.findFieldByName(e);return null!=t&&"Numeric"==t.type},r.checkIfAllSelectedAreNumeric=function(){for(var e=null,t=null,n=0;n<window.selObjects.length;n++)if((t=window.selObjects[n])&&(window.selectionCategory.area===o.AVAILABLE_FIELDS_AREA?e=t.param.id:window.selectionCategory.area===o.COLUMN_LEVEL&&(e=t.header.getAttribute("data-fieldName")),!r.checkIfFieldIsNumeric(e)))return!1;return!0},r.collectFields=function(e,t,n){for(var a=[],i=0;i<e.length;i++){var l=e[i];l.isParent()&&t?a=a.concat(this.collectFields(l.childs,t,n)):n?n(l.param.id)&&a.push(l.param.id):a.push(l.param.id)}return a},r.getAllFields=function(){return c(window.localContext.state.allColumns)?window.localContext.state.allColumns:[]},r.findFieldByName=function(e){var t=null;return window.localContext.state.allColumns&&window.localContext.state.allColumns.each(function(n){if(n.name&&n.name==e)throw t=n,i}),t},r.getNameForSelected=function(e){return window.selectionCategory.area===o.AVAILABLE_FIELDS_AREA?e?e.param.id:"":e.chartMeasureId?e.chartMeasureId:window.selectionCategory.area===o.COLUMN_LEVEL?e.header.getAttribute("data-fieldName"):window.selectionCategory.area===o.GROUP_LEVEL?e.fieldName:window.selectionCategory.area===o.ROW_GROUP_MENU_LEVEL||window.selectionCategory.area===o.COLUMN_GROUP_MENU_LEVEL?e.name:window.selectionCategory.area===o.SUMMARY_LEVEL?e.model.name:window.selectionCategory.area===o.LEGEND_MENU_LEVEL?e.legendName:void 0},r.getFieldName=function(){var e=o.getSelectedObject();return e?this.getNameForSelected(e):""},r.getFieldIndexByName=function(e){if(c(window.localContext.state.allColumns))for(var t=window.localContext.state.allColumns.length,n=0;n<t;n++){var a=window.localContext.state.allColumns[n];if(a.name==e)return n}return-1},r.moveToDimensions=function(){if(window.selObjects.first()){var e=window.selObjects.clone();r.moveToMeasuresOrAttributes(e);var t=e.collect(function(e){return e.param.id}).join(",");r.changeFieldAttributeOrMeasure(t,"attribute")}},r.moveToMeasures=function(){if(window.selObjects.first()){var e=window.selObjects.clone();r.moveToMeasuresOrAttributes(e);var t=e.collect(function(e){return e.param.id}).join(",");r.changeFieldAttributeOrMeasure(t,"measures")}},r.selectFromAvailableFields=function(e,t){e||this.addSelectedObject(e,t,!1,!0);var n=this.isMultiSelect(e,o.AVAILABLE_FIELDS_AREA);window.selectionCategory.area=o.AVAILABLE_FIELDS_AREA;var a=this.isAlreadySelected(t);this.addSelectedObject(e,t,n,a),C.setSelected(f.map(d.trees[t.getTreeId()].selectedNodes,function(e){return e.param.extra}))},r.updateFieldsInUse=function(e){[].push.apply(window.localContext.state.fieldsInUse,e)},r.removeFromFieldsInUse=function(e){window.localContext.state.fieldsInUse&&(window.localContext.state.fieldsInUse=f.difference(window.localContext.state.fieldsInUse,e))},r.isInUse=function(e){return f.find(window.localContext.state.fieldsInUse,function(t){return t===e})||r.hasDependencyOnIt(e)},r.isInError=function(e){return f.find(window.localContext.state.unresolvedMetadataReferences,function(t){return t===e})},r.createCalculatedField=function(){A.createField("DIMENSION")},r.createCalculatedMeasure=function(){A.createField("MEASURE")},r.editCalculatedField=function(){A.updateField()},r.deleteCalculatedField=function(){var e=o.getSelectedObject(),t=m("#"+r.DELETE_CALCULATED_FIELD_CONFIRMATION_DIALOG.DIALOG_ID);u.popupConfirm.show(t[0],!1,{message:l.ADH_436_CALCULATED_FIELD_REMOVE_CONFIRM+' "'+e.name.unescapeHTML()+'".',okButtonSelector:"#"+r.DELETE_CALCULATED_FIELD_CONFIRMATION_DIALOG.OK_BUTTON_ID,cancelButtonSelector:"#"+r.DELETE_CALCULATED_FIELD_CONFIRMATION_DIALOG.CANCEL_BUTTON_ID}).done(A.deleteField.bind(A))},r.isPercentOfParentCalcSelected=function(e){return r.isAggregateSelected(e)},r.isAggregateSelected=function(e){if(e||(e=o.getSelectedObject()),e){var t=r.getNameForSelected(e),n=r.findFieldByName(t);return n&&n.aggregateField}return!1},r.isPercentOfParentCalc=function(e){var t=r.findFieldByName(e);return t&&t.aggregateField},r.hasDependencyOnIt=function(e){var t=r.findFieldByName(e);return t&&t.isUsed},r.updateAllFieldLabels=function(){if(window.isDesignView){var e=r,t=[e.dimensionsTree,e.measuresTree];f.each(t,function(t){f.each(e.getAllLeaves(null,t),function(t){var n=e.findFieldByName(t.param.id);n&&n.isCustomField&&(r.updateTreeFieldLabel(t,n.defaultDisplayName),t.param.cssClass=e.isInUse(t.param.id)?"calculatedField dependency":"calculatedField",t.refreshStyle())}),t.renderTree()})}},r.updateTreeFieldLabel=function(e,t){e.name=t.replace(/\\'/g,"'"),e.param.label=t.replace(/\\'/g,"'")},n.exports=r});