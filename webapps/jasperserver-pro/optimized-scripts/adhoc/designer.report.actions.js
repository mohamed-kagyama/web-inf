/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","prototype","./designer","runtime_dependencies/js-sdk/src/jrs.configs","../base/designer.base","runtime_dependencies/jrs-ui/src/util/utils.common","runtime_dependencies/jrs-ui/src/components/components.toolbarButtons.events","runtime_dependencies/jrs-ui/src/core/core.layout","jquery","runtime_dependencies/jrs-ui/src/components/components.dialogs","./intelligentChart/adhocIntelligentChart","request","./loading/loadingDialog"],function(e,n,t){var o=e("prototype"),s=o.$,a=e("./designer"),i=e("runtime_dependencies/js-sdk/src/jrs.configs"),r=e("../base/designer.base"),d=e("runtime_dependencies/jrs-ui/src/util/utils.common"),l=d.exists,c=d.gotoDefaultLocation,u=e("runtime_dependencies/jrs-ui/src/components/components.toolbarButtons.events"),p=e("runtime_dependencies/jrs-ui/src/core/core.layout"),w=e("jquery"),m=e("runtime_dependencies/jrs-ui/src/components/components.dialogs"),g=e("./intelligentChart/adhocIntelligentChart"),b=e("request"),C=e("./loading/loadingDialog");a.goToTopicView=function(e){var n="flow.html?_flowId=adhocFlow&_mode="+e+"&launchType="+window.localContext.state.launchType+"&alreadyEditing=true";i.initAdditionalUIComponents||(n+="&decorate=no"),window.isEmbeddedDesigner&&(n+="&"+w.param({embeddedDesigner:!0,embeddedName:window.embeddedName,saveAsUri:window.embeddedSaveAsUri,saveAsOverwrite:window.embeddedSaveAsOverwrite})),document.location.href=n},a.cancelAdHoc=function(){if(l(window.localContext.isDashboard)&&window.localContext.isDashboard)return void c();window.usingAdhocLauncher&&""!==window.usingAdhocLauncher?history.back():this.redirectToTopicPage()},a.cancelTopic=function(e){e?history.back():r.redirectToHomePage()},a.enableCanUndoRedo=function(){l(u)&&(u.setButtonState(s("undo"),window.localContext.state.canUndo),u.setButtonState(s("redo"),window.localContext.state.canRedo),u.setButtonState(s("undoAll"),window.localContext.state.canUndo))},a.enableRunAndSave=function(e){l(u)&&(u.setButtonState(s("save"),e),u.setButtonState(s("presentation"),e),u.setButtonState(s("export"),e)),window.canRunAndSave=e},a.canSaveAdhocReport=function(){return window.localContext.canSaveReport()},a.toggleDisplayManager=function(){a.isDisplayManagerVisible()?(w("#"+a.DISPLAY_MANAGER_ID).addClass(p.HIDDEN_CLASS),a.setDisplayManagerVisible(!1)):(w("#"+a.DISPLAY_MANAGER_ID).removeClass(p.HIDDEN_CLASS),a.setDisplayManagerVisible(!0)),w("#designer").trigger("layout_update"),g.resize(),a.setShowDisplayManager(a.isDisplayManagerVisible())},a.isDisplayManagerVisible=function(){return window.localContext.state.showDisplayManager},a.setDisplayManagerVisible=function(e){window.localContext.state.showDisplayManager=e},a.isCrosstabCellsMerged=function(){return window.localContext.state.crosstab.mergeCrosstabCells},a.exportReport=function(e){var n="reportGenerator.html?action=displayTempReportUnit&clientKey="+encodeURIComponent(window.clientKey)+"&exportFormat="+encodeURIComponent(e||""),t=b({url:n,type:"GET",dataType:"json"}).then(function(e){"OK"===e.status?window.open(e.data,"_blank"):m.errorPopup.show(e.data.msg)},function(){m.errorPopup.show("Unknown Error")});C(t,{el:w("#loading")})},a.enableXtabPivot=function(e){l(u)&&u.setButtonState(s("pivot"),e)},a.enableSort=function(e){l(u)&&u.setButtonState(s("sort"),e)},a.toggleUseDomainLabels=function(){var e=!window.localContext.state.useDomainLabels,n=function(e){window.localContext.standardOpCallback(e),a.isUseDomainLabels()&&m.systemConfirm.show(a.getMessage("adhoc.designer.warn.use.domain.labels"),5e3),a.updateTrees(),a.filtersController.setFilters(e,{reset:!0})};r.sendRequest("co_toggleUseDomainLabels",["name=useDomainLabels","value="+e],n,null)},a.isUseDomainLabels=function(){return window.localContext.state.useDomainLabels},t.exports=a});