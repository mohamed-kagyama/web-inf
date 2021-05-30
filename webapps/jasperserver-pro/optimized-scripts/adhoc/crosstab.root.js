/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/jrs-ui/src/dynamicTree/dynamicTree.utils","underscore","runtime_dependencies/jrs-ui/src/util/utils.common","../base/designer.base","./crosstab","runtime_dependencies/jrs-ui/src/components/components.dialogs","./crosstab.actions","./crosstab.ajax","./crosstab.helpers","./crosstab.observers"],function(e,n,t){var r=e("runtime_dependencies/jrs-ui/src/dynamicTree/dynamicTree.utils"),i=e("underscore"),o=e("runtime_dependencies/jrs-ui/src/util/utils.common"),a=o.isNotNullORUndefined,s=e("../base/designer.base"),d=e("./crosstab"),l=e("runtime_dependencies/jrs-ui/src/components/components.dialogs");e("./crosstab.actions"),e("./crosstab.ajax"),e("./crosstab.helpers"),e("./crosstab.observers"),d.fieldsAtLevel=function(){var e=[],n=window.localContext.getSelectedObject(),t=window.localContext.isOlapMode()?[n.param.id]:window.adhocDesigner.getAllLeaves(n).map(function(e){return e.param.extra.id}),r=t.inject([],function(e,n){return e.concat(d.state.getLevelsFromDimension(n,"column")||[])}),i=t.inject([],function(e,n){return e.concat(d.state.getLevelsFromDimension(n,"row")||[])});return e.push(r,i),e},d.canMoveToDimensions=function(){return!window.selObjects.find(function(e){return window.localContext.isInUse(e.param.extra.id,e.param.extra.isMeasure)})},d.canMoveToMeasures=function(){return d.canMoveToDimensions()},d.canSaveReport=function(){return window.localContext.state.canSave},d.isGroupSelected=function(e){return!e.isMeasure},d.isRowGroupSelected=function(e){return"row"===e.axis&&!e.isMeasure},d.isColumnGroupSelected=function(e){return"column"===e.axis&&!e.isMeasure},d.isCurrentDateType=function(e){var n=d.getSelectedGroup(window.adhocDesigner.getSelectedColumnOrGroup());return!!n&&n.categorizerName==e},d.isSelectedMeasureNumeric=function(){var e=d.getSelectedMeasure();if(e){var n=window.adhocDesigner.getSuperType(e.type);return"int"==n||"dec"==n}return!1},d.isDateType=function(){return d.isDateTimeType("date")},d.isTimestampType=function(){return d.isDateTimeType("timestamp")},d.isTimeType=function(){return d.isDateTimeType("time")},d.isDateTimeType=function(e){var n=window.adhocDesigner.getSelectedColumnOrGroup();if(n){var t=d.isGroupSelected(n),r=d.getSelectedGroup(n);if(r){var i=!0===r.canReBucket,o=r.type===e;return t&&i&&o}}return!1},d.isSelectedMeasureItemType=function(e){var n=d.getSelectedMeasure();if(n){return window.adhocDesigner.getSuperType(n.type)===e}return!1},d.isSelectedMeasureMask=function(e){var n=d.getSelectedMeasure();return!!n&&(n.functionMaskOrDefault===e||!n.functionMaskOrDefault&&e===window.defaultMasks[window.adhocDesigner.INTEGER_TYPE_DISPLAY])},d.isSelectedSummaryFunction=function(e){var n=d.getSelectedMeasure();return!!n&&n.functionOrDefault===e},d.isSelectedTimeSummaryFunction=function(e){var n=d.getSelectedMeasure();return!!n&&n.aggregateFirstLevelFunction===e},d.canSwitchToRow=function(){var e=window.adhocDesigner.getSelectedColumnOrGroup();return window.localContext.isNonOlapMode()||d.state.getDimensionsCount(e.axis)>1},d.canAddSliceFilter=function(){var e=window.selObjects.find(function(e){return!e.isSliceable});return window.selObjects.first()&&!e},d.canMoveUpOrLeft=function(){var e=window.adhocDesigner.getSelectedColumnOrGroup();return d.getSelectedDimensionIndex(e)>0},d.canMoveDownOrRight=function(){var e=window.adhocDesigner.getSelectedColumnOrGroup();return d.getSelectedDimensionIndex(e)<d.state.getDimensionsCount(e.axis)-1},d.canMoveMeasureUpOrLeft=function(){return window.adhocDesigner.getSelectedColumnOrGroup().index>0},d.canMoveMeasureDownOrRight=function(){var e=window.adhocDesigner.getSelectedColumnOrGroup(),n=e.isMeasure?window.adhocDesigner.MEASURES:e.dimensionId,t=d.state.getLevelsFromDimension(n,e.axis).length;return e.index<t-1},d.canAddDimensionAsRowGroup=function(e){var n=window.localContext.getSelectedObject();if(n.axis)return!1;n.hasChilds()||(n=n.parent);var t=r.trees[n.getTreeId()],o=window.adhocDesigner.getAllLeaves(n,t),a=window.adhocDesigner.getAllLeaves(n,t).collect(function(e){return e.param.extra.id});if(window.localContext.isOlapMode()){var s=i.pluck(window.localContext.state.getFilteredList(),"name"),l=e&&i.intersection([e[0].name],s).length,c=n.param.id,u=window.localContext.state.getDimensionsCount("column"),w=n.param.extra&&n.param.extra.isHierarchy,m=d.state.getLevelsFromDimension(c,"column"),p=w&&1===u&&!i.isEmpty(m);if(0===u||p||e&&e[0].isMeasure&&l)return!1;var g=w&&n.param.extra.id,f=d.state.getLevelsFromDimension(c,"row"),h=i.isEmpty(m),v=window.localContext.fromSiblingHierarchy(g,c);return(w||h)&&(w&&v||f.length<n.getChildCount())}if(o[0].param.extra.isMeasure){return 0===window.localContext.state.getFilteredMeasureList("column").length}var x=i.pluck(window.localContext.state.getFilteredList(),"name"),C=d.fieldsAtLevel();return C[0].length>0?i.difference(a,x).length>0||d.isDateField(e[0]):0===C[0].length&&(0===C[1].length||window.localContext.isNonOlapMode()&&e&&(e[0].isMeasure||d.isDateField(e[0]))||e&&!i.contains(C[1],e[0].name))},d.canAddDimensionAsColumnGroup=function(e){var n=window.localContext.getSelectedObject();if(n.axis)return!1;n.hasChilds()||(n=n.parent);var t=r.trees[n.getTreeId()],o=window.adhocDesigner.getAllLeaves(n,t);if(window.localContext.isOlapMode()){var a=i.pluck(window.localContext.state.getFilteredList(),"name"),s=e&&i.intersection([e[0].name],a).length;if(e&&e[0].isMeasure&&s)return!1;var l=n.param.id,c=n.param.extra&&n.param.extra.isHierarchy,u=c&&n.param.extra.id,w=d.state.getLevelsFromDimension(l,"column"),m=d.state.getLevelsFromDimension(l,"row"),p=0===m.length,g=window.localContext.fromSiblingHierarchy(u,l);return(c||p)&&(c&&g||w.length<n.getChildCount())}if(o[0].param.extra.isMeasure){return 0===window.localContext.state.getFilteredMeasureList("row").length}var f=d.fieldsAtLevel();return 0===f[1].length&&(0===f[0].length||window.localContext.isNonOlapMode()&&e&&(e[0].isMeasure||d.isDateField(e[0]))||e&&!i.contains(f[0],e[0].name))},d.canAddLevelAsRowGroup=function(){if(0===window.localContext.state.getDimensionsCount("column")&&window.localContext.isOlapMode())return!1;var e=window.localContext.getSelectedObject();if(!e)return!1;var n=e.param.extra;if(!n)return!1;var t=window.localContext.isOlapMode()?[n.dimensionId]:window.adhocDesigner.getAllLeaves(e).map(function(e){return e.param.extra.dimensionId}),r=t.inject([],function(e,n){return e.concat(d.state.getLevelsFromDimension(n,"column")||[])}),o=t.inject([],function(e,n){return e.concat(d.state.getLevelsFromDimension(n,"row")||[])});return 0===r.length&&(0===o.length||window.localContext.isNonOlapMode()&&n&&(n.isMeasure||d.isDateField(n))||!i.contains(o,n.name))},d.canAddLevelAsColumnGroup=function(){var e=window.localContext.getSelectedObject();if(!e)return!1;var n=e.param.extra,t=window.localContext.isOlapMode()?[n.dimensionId]:window.adhocDesigner.getAllLeaves(e).map(function(e){return e.param.extra.dimensionId}),r=t.inject([],function(e,n){return e.concat(d.state.getLevelsFromDimension(n,"column")||[])});return 0===t.inject([],function(e,n){return e.concat(d.state.getLevelsFromDimension(n,"row")||[])}).length&&(0===r.length||window.localContext.isNonOlapMode()&&n&&(n.isMeasure||d.isDateField(n))||!r.find(function(e){return i.contains(i.map(s.getSelectedObjects(),function(e){return e.param.extra&&e.param.extra.id}),e)}))},d.showAddHierarchyConfirm=function(e,n,t){return!!window.localContext.fromSiblingHierarchy(e,n)&&(window.adhocDesigner.addConfirmDialog.show({ok:function(){if(d.isFiltersApplied(n))return void l.systemConfirm.show(window.adhocDesigner.getMessage("ADH_CROSSTAB_LAST_FILTERED_LEVEL"),5e3);t()}}),!0)},d.isFiltersApplied=function(e,n){var t=i.pluck(window.localContext.state.getLevelObjectsFromDimension(e,n),"levelUniqueName"),r=i.pluck(window.localContext.state.existingFilters,"name");return!i.isEmpty(i.intersection(t,r))},d.canAddSiblingLevels=function(){return!0},d.canHideLevel=function(){return!0},d.canShowLevel=function(){return!0},d.canHideSummariesForColumnGroup=function(){return d.canHideSummariesForGroup(!1)},d.canHideSummariesForRowGroup=function(){return d.canHideSummariesForGroup(!0)},d.canHideSummariesForGroup=function(e){return!0},d.canAddFilter=function(e,n){var t,r;if(window.localContext.isOlapMode()&&(t=a(e.isMeasure)?e.isMeasure:e.param.extra&&e.param.extra.isMeasure,r=window.localContext._isAddingFilterDuplicate(e)),t)return n&&n.push(window.addFilterErrorMessageMeasureAdd),!1;var i=e.param?e.param.extra&&e.param.extra.id:e.level;return i&&0===i.indexOf(window.localContext.ALL_LEVEL_NAME)?(n&&n.push(window.addFilterErrorMessageAllLevelAdd),!1):e.isParent&&e.isParent()?(n&&n.push(window.addFilterErrorMessageGroupAdd),!1):e.param&&window.localContext.fromSiblingHierarchy(e.param.extra.hierarchyName,e.param.extra.dimensionId)?(n&&n.push(window.addFilterErrorMessageAnotherHierarchy),!1):window.adhocDesigner.isSpacerSelected(e)?(n&&n.push(window.addFilterErrorMessageSpacerAdd),!1):window.adhocDesigner.isPercentOfParentCalcSelected(e)?(n&&n.push(window.addFilterErrorMessagePercentOfParentCalcFieldAdd),!1):window.adhocDesigner.isConstantSelected(e)?(n&&n.push(window.addFilterErrorMessageConstantAdd),!1):!r||(n&&n.push(window.addFilterErrorMessage),!1)},d._isAddingFilterDuplicate=function(e){var n;return n=e.param?"["+e.param.extra.dimensionId+"].["+e.param.extra.id+"]":"["+e.dimensionId+"].["+e.level+"]",window.adhocDesigner.filtersController.hasFilterForField(n)},d.getSelectedObject=function(){return window.selObjects.first()},d.getHierarchy=function(e){var n=e.param.extra;return e.hasChilds()?(e.getFirstChild().hasChilds()&&(n=e.getFirstChild().param.extra),n&&n.isHierarchy?n.id:void 0):n.hierarchyName},d._getAvailableFieldsNodeBySelection=function(e,n,t){var r={};if(window.selectionCategory.area==s.AVAILABLE_FIELDS_AREA)t.hasChilds()?(r.isMeasure="measuresTree"===t.treeId,r.dimensionId=r.isMeasure?t.treeId:t.param.id,r.uri=window.localContext.isNonOlapMode()?t.param.uri:void 0,r.level=null):(r.isMeasure=!!t.param.extra.isMeasure,r.level=t.param.extra.dimensionId&&t.param.id,r.dimensionId=t.param.extra.dimensionId||t.param.extra.id),r.hierarchyName=d.getHierarchy(t),r.index=-1;else if(window.selectionCategory.area==s.ROW_GROUP_MENU_LEVEL||window.selectionCategory.area==s.COLUMN_GROUP_MENU_LEVEL)if(e||n){var i=/.*\[(.*)\]/.exec(e),o=i&&i[1];r.isMeasure=!n,r.level=e,r.dimensionId=r.isMeasure?window.adhocDesigner.MEASURES:n,r.index=-1,r.hierarchyName=o}else{if(!t.axis)return void alert("Need a way to get dimension name for clicked level from crosstab");r=t}return r},d.getAvailableFieldsNodeBySelection=function(e,n){return d._getAvailableFieldsNodeBySelection(e,n,window.selObjects.first())},d.getAvailableFieldsNodesBySelection=function(e,n){for(var t=[],r=0;r<window.selObjects.length;r++)t.push(d._getAvailableFieldsNodeBySelection(e,n,window.selObjects[r])),t[r].extra=t[r],t[r].dimensionId=t[r].dimensionId,t[r].id=t[r].level;return t},d.canShowSortOptions=function(){if(window.selObjects.length>1)return!1;var e="column"===window.selObjects[0].axis,n=window.localContext.state.crosstab.hasConcreteRowGroups;return window.selObjects[0].isInner&&(e?n:window.selObjects[0].isMeasure)},d.canShowTopBottomNFilterMenu=function(){var e=!window.localContext.isOlapMode()&&d.canShowSortOptions(),n=window.localContext.state.hasConcreteRowGroups,t=window.localContext.state.getDimensions("row"),r=n&&i.find(t,function(e){return"Measures"===e.name});return e&&!r},d.isSortOptionSelected=function(e){return window.selObjects[0].sorting===e},d.isDateField=function(e){return"Timestamp"===e.type||"Date"===e.type||"Time"===e.type},d.isTopBottomNOptionSelected=function(e){return window.selObjects[0].topBottomFilter===e},t.exports=d});