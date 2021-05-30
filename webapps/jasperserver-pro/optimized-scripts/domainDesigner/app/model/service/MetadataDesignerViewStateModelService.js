/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../enum/canvasViewDesignersEnum"],function(e,t,r){var i=e("underscore"),n=e("../enum/canvasViewDesignersEnum"),o=function(e){this.initialize(e)},u=n.METADATA_DESIGNER;i.extend(o.prototype,{initialize:function(e){i.bindAll(this,"isSidebarItemSelected"),this.viewStateModel=e.viewStateModel},getSidebarSelectionPath:function(){var e=this.viewStateModel.getCurrentResource(u);return e&&e.id},getCurrentSidebarResource:function(){return this.viewStateModel.getCurrentResource(u)},getDataSourceByName:function(e){return this.viewStateModel.getDataSource(e)},getAddResourcesError:function(){return this.viewStateModel.getDesignerSpecificRuntimeProperty(u,"addResourcesError")},isSidebarItemSelected:function(e){return this.viewStateModel.getCurrentResource(u).id===e.id},getSidebarSearchKeyword:function(){return this.viewStateModel.getSidebarSearchKeyword(u)},getResultTreeSelection:function(){var e=this.viewStateModel.getCurrentResource(u);return this.viewStateModel.getCurrentSelection(u).resultTree[e.resourceId]||[]}}),r.exports=o});