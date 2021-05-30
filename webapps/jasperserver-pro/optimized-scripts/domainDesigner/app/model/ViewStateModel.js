/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../model/util/SimpleModel","./enum/viewStateModelDefaultsEnum","../component/designer/presentationDesigner/enum/columnSetEnum","./enum/canvasViewDesignersEnum"],function(e,t,n){var r=e("underscore"),i=e("../../model/util/SimpleModel"),s=e("./enum/viewStateModelDefaultsEnum"),u=e("../component/designer/presentationDesigner/enum/columnSetEnum"),o=e("./enum/canvasViewDesignersEnum"),a={metadataDesigner:"_getMetadataDesignerDefaults",joinsDesigner:"_getJoinsDesignerDefaults",presentationDesigner:"_getPresentationDesignerDefaults",filtersDesigner:"_getFiltersDesignerDefaults"},d={metadataDesigner:"_getMetadataDesignerRuntimeDefaults",joinsDesigner:"_getJoinsDesignerRuntimeDefaults",calculatedFieldsDesigner:"_getCalculatedFieldsDesignerRuntimeDefaults",presentationDesigner:"_getPresentationDesignerRuntimeDefaults",filtersDesigner:"_getFiltersDesignerRuntimeDefaults"},l=function(e,t){this.defaultOptions=t||{},i.apply(this,arguments)};r.extend(l.prototype,i.prototype,{defaults:function(){var e=r.cloneDeep(this.defaultOptions);return{currentDesigner:e.currentDesigner||o.METADATA_DESIGNER,dataSource:{},designer:this._getDesignerDefaults(a),runtime:{draftState:{},designer:this._getRuntimeDesignerDefaults(d,e.runtime)}}},reset:function(){this.set(this.defaults())},resetDesigner:function(e){var t=r.clone(this.get("designer")),n=this.defaults();t[e]=n.designer[e],this.set("designer",t)},clone:function(){return new l(r.cloneDeep(this.toJSON()))},_getDesignerDefaults:function(e,t){return r.extend({sidebar:{expandedNodes:{},collapsedNodes:{}}},this._getRuntimeDesignerDefaults(e,t))},_getRuntimeDesignerDefaults:function(e,t){var n={};return t=t||{},r.each(o,function(i,s){var u=e[i];n[i]={},u&&r.extend(n[i],this[u]()),t[i]&&r.extend(n[i],t[i])},this),n},_getMetadataDesignerDefaults:function(){return{selectedResource:{type:"",id:null,resourceId:null},selection:{sourceTree:{},resultTree:{}},searchKeyword:{sourceTree:{},resultTree:{},sidebar:""}}},_getJoinsDesignerDefaults:function(){return{selectedResource:{type:"",id:null,resourceId:null,parentTableReferenceId:null,parentJoinTreeId:null},joinTrees:{},joins:{},searchKeyword:{sidebar:""}}},_getFiltersDesignerDefaults:function(){return{selectedResource:{type:"",id:null,resourceId:null},searchKeyword:{sidebar:"",canvas:""},filtersPositions:{}}},_getPresentationDesignerDefaults:function(){return{dropZoneActivator:null,searchKeyword:{sidebar:"",canvas:""},defaultPresentationItemsNodeExpandedState:s.PRESENTATION_DESIGNER.NODE_EXPANSION.value,defaultPresentationItemsEditorExpandedState:s.PRESENTATION_DESIGNER.PROPERTY_EDITOR_EXPANSION.value,dataIslands:{},presentationSets:{},presentationFields:{},selection:{parentId:null,items:{}},sidebarSelection:{parentId:null,items:{}},columnSet:u.DEFAULT}},_getMetadataDesignerRuntimeDefaults:function(){return{addResourcesError:{popoverMessage:"",highlightInvalidResources:!1}}},_getJoinsDesignerRuntimeDefaults:function(){return{}},_getPresentationDesignerRuntimeDefaults:function(){return{cellsWidth:{}}},_getFiltersDesignerRuntimeDefaults:function(){return{}},_getCalculatedFieldsDesignerRuntimeDefaults:function(){return{context:{},visible:s.CALCULATED_FIELDS_DESIGNER.VISIBILITY.value}},getCurrentDesigner:function(){return this.get("currentDesigner")},getDataSource:function(e){return this.get("dataSource")[e]},getSidebarExpandedNodes:function(){return r.cloneDeep(this.get("designer").sidebar.expandedNodes)},getSidebarCollapsedNodes:function(){return r.cloneDeep(this.get("designer").sidebar.collapsedNodes)},setSidebarExpandedNodes:function(e){this.get("designer").sidebar.expandedNodes=e},setSidebarCollapsedNodes:function(e){this.get("designer").sidebar.collapsedNodes=e},setCurrentResource:function(e,t){this.setDesignerSpecificProperty(e,"selectedResource",t)},getCurrentResource:function(e){return this.getDesignerSpecificProperty(e,"selectedResource")},setDesignerSpecificProperty:function(e,t,n){var i=this.get("designer"),s=i[e];if(r.isUndefined(s[t]))throw new Error("Current designer does not have the following property: "+t);s[t]=n},getDesignerSpecificProperty:function(e,t){return this.get("designer")[e][t]},setDesignerSpecificRuntimeProperty:function(e,t,n){var i=this.get("runtime"),s=i.designer,u=s[e];if(r.isUndefined(u[t]))throw new Error("Current designer does not have the following property: "+t);u[t]=n},getDesignerSpecificRuntimeProperty:function(e,t){return this.get("runtime").designer[e][t]},setRuntimeProperty:function(e,t){this.get("runtime")[e]=t},getRuntimeProperty:function(e){return this.get("runtime")[e]},getDraftState:function(){return r.cloneDeep(this.getRuntimeProperty("draftState"))},setDraftState:function(e){this.setRuntimeProperty("draftState",e)},setCurrentDesigner:function(e){this.set("currentDesigner",e)},setDataSource:function(e,t){this.get("dataSource")[e]=t||{}},getSearchKeyword:function(e){return this.getDesignerSpecificProperty(e,"searchKeyword")},getSidebarSearchKeyword:function(e){return this.getDesignerSpecificProperty(e,"searchKeyword").sidebar},getCurrentSelection:function(e){return this.getDesignerSpecificProperty(e,"selection")}}),n.exports=l});