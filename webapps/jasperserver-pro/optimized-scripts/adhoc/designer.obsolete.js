/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./designer","jquery","underscore","runtime_dependencies/bi-repository/src/bi/repository/model/RepositoryResourceModel","runtime_dependencies/js-sdk/src/common/util/identityUtil","runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes","../base/designer.base","runtime_dependencies/jrs-ui/src/core/core.events.bis","runtime_dependencies/jrs-ui/src/util/utils.common","runtime_dependencies/jrs-ui/src/actionModel/actionModel.primaryNavigation"],function(e,t,i){var n=e("./designer"),o=e("jquery"),r=e("underscore"),d=e("runtime_dependencies/bi-repository/src/bi/repository/model/RepositoryResourceModel"),a=e("runtime_dependencies/js-sdk/src/common/util/identityUtil"),s=e("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes"),c=e("../base/designer.base"),l=e("runtime_dependencies/jrs-ui/src/core/core.events.bis"),u=e("runtime_dependencies/jrs-ui/src/util/utils.common"),w=u.matchAny,p=e("runtime_dependencies/jrs-ui/src/actionModel/actionModel.primaryNavigation");n.handleBack=function(){var e=n.buildSaveRequestData();n.filtersController.hasNotAppliedFilters()?n.showSaveConfirmationDialog(function(){o(document).trigger("adhocDesigner:save",n.buildResourceMetadata(e))}):o(document).trigger("adhocDesigner:save",n.buildResourceMetadata(e))},n.handleCancel=function(){o(document).trigger("adhocDesigner:cancel")},n.buildSaveRequestData=function(){var e=!!window.saveUri,t=e?window.saveFolder:"/temp",i=e?window.saveLabel:a.generateUniqueName("tmpAdv_"),n=e?window.saveDesc:"Dashboard visualization.",o=e;return window.embeddedSaveAsUri&&(t=d.getParentFolderFromUri(window.embeddedSaveAsUri),i=d.getNameFromUri(window.embeddedSaveAsUri)),window.embeddedSaveAsOverwrite&&(o=window.embeddedSaveAsOverwrite),window.window.embeddedSaveAsUri&&(t=d.getParentFolderFromUri(window.embeddedSaveAsUri),i=d.getNameFromUri(window.embeddedSaveAsUri)),window.embeddedSaveAsOverwrite&&(o=window.embeddedSaveAsOverwrite),{aruLabel:i,aruFolder:t,aruDesc:n,allOverwrite:o}},n.buildResourceMetadata=function(e){var t=!!window.saveUri,i={uri:[e.aruFolder,e.aruLabel].join("/"),resourceType:s.ADHOC_DATA_VIEW,type:window.localContext.mode,label:e.aruLabel,version:1};return t||(i.dataSourceUri=window.reportUnitURI),i},n.saveEmbedded=function(){var e=n.buildSaveRequestData();c.sendRequest(c.getControllerPrefix()+"_save",e,function(t){var i=r.clone(e);i.viewType=t.viewType,o(document).trigger("adhocDesigner:saved",n.buildResourceMetadata(i))})},n.crossDocumentListener=function(e){e.origin===window.location.origin&&"adhocDesigner:save"==e.data&&n.saveEmbedded()},n.saveAndRun=function(){window.windowPopUp=window.open("","jr"),l.disable(o("execute"));var e=function(e){n.updateStateAndRender(e),window.windowPopUp.location="flow.html?_flowId=viewAdhocReportFlow&clientKey="+window.clientKey+"&reportUnit="+window.localContext.state.tempAruName+"&noReturn=true"};c.sendRequest("co_saveTemp",[],e)},n.applyAdhocTheme=function(e,t){var i=null,n=e.element(),r=null;if(t){var d=t.childElements();i=w(n,["li.button"],!0),i&&(r=i.identify(),d.each(function(e){l.unSelect(e)}),l.select(i)),r!==window.selectedThemeId&&(window.selectedThemeId=r,o(this.CANVAS_PARENT_ID)&&window.selectedThemeId&&(o(this.CANVAS_PARENT_ID).writeAttribute("class",r),this.toggleAdhocTheme()))}},n.orientationSelected=function(e){n.setPageOrientation(e),c.unSelectAll()},n.getOrientation=function(){return window.localContext.state.pageOrientation},n.orientationEquals=function(e){return n.getOrientation()==e},n.getPaperSize=function(){return window.localContext.state.paperSize},n.paperSizeEquals=function(e){return n.getPaperSize()==e},n.paperSizeSelected=function(e,t){n.setPaperSize(e),c.unSelectAll(t)},n.goToDesignView=function(){var e=document.location.href.parseQuery();delete e._flowId,delete e.viewReport,delete e.fromDesigner,p.setNewLocation("designer",Object.toQueryString(e))},n.goToPresentationView=function(){var e=document.location.href.parseQuery();delete e._flowId,e.viewReport=!0,e.fromDesigner=!0,p.setNewLocation("designer",Object.toQueryString(e))},n.getAllAvailableFolders=function(e){var t=[];if(!e){if(!this.availableTree)return t;e=this.availableTree.rootNode,t.push(e)}if(e.param.type===this.FOLDER_TYPE)for(var i=0;i<e.childs.length;i++){var n=e.childs[i];n.param.type===this.FOLDER_TYPE&&(t.push(n),t=t.concat(this.getAllAvailableFolders(n)))}return t},n.togglePagePropsRoller=function(){window.selectionObject.pagePropsRollDown=!window.selectionObject.pagePropsRollDown},n.setFieldValuesOnColumnSelection=function(){},n.setFieldValuesOnGroupSelection=function(){},n.selectReport=function(){c.unSelectAll(),this.activateReportSelectionObject()},n.activateReportSelectionObject=function(){this.selectSingleObject(window.titleBar),window.selectionCategory.area=c.TITLE_SELECT_AREA},n.isSingleFieldSelected=function(){return 1==c.getSelectedObject().length},n.isInColumns=function(e){for(var t=0;t<window.localContext.state.columns.length;t++)if(e==window.localContext.state.columns[t])return!0;return!1},n.setPageOrientation=function(e){c.sendRequest("co_setPageOrientation",["o="+e])},n.setPaperSize=function(e){c.sendRequest("co_setPaperSize",["s="+e])},i.exports=n});