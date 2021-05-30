/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DashboardBundle","runtime_dependencies/js-sdk/src/common/component/menu/HoverMenu","../../dashboardMessageBus","../../enum/dashboardMessageBusEvents","text!../../template/designerToolbarTemplate.htm","../viewer/ViewerToolbarView","../../enum/dashboardComponentTypes","../../view/designer/propertiesDialog/PropertiesDialogController","./SaveDialogView","./filterManager/FilterManagerDialog","jquery"],function(e,t,i){var o=e("underscore"),s=e("bundle!DashboardBundle"),r=e("runtime_dependencies/js-sdk/src/common/component/menu/HoverMenu"),n=e("../../dashboardMessageBus"),a=e("../../enum/dashboardMessageBusEvents"),l=e("text!../../template/designerToolbarTemplate.htm"),d=e("../viewer/ViewerToolbarView"),h=e("../../enum/dashboardComponentTypes"),p=e("../../view/designer/propertiesDialog/PropertiesDialogController"),u=e("./SaveDialogView"),g=e("./filterManager/FilterManagerDialog"),v=e("jquery");i.exports=d.extend({events:{"click #grid":"toggleLayoutGrid","click #filterManager":"showFilterManagerDialog","click #filterPopup":"toggleFilterPopupDialog","click #properties":"togglePropertiesDialog","click #undo":"undo","click #undoAll":"undoAll","click #redo":"redo"},el:o.template(l,{i18n:s}),initialize:function(e){d.prototype.initialize.apply(this,arguments);var t=this.model.currentFoundation;this.dashboardId=e.dashboardId,this.state=e.state,this.saveDialog=new u({model:this.model}),this.listenTo(this.model,"change:uri",o.bind(function(){this._initSaveMenu()},this)),this.listenTo(t,"addComponent",function(e){e.get("type")===h.DASHBOARD_PROPERTIES&&this._initDashboardPropertiesDialogController(e)}),this.listenTo(this.saveDialog,"save",function(){this.trigger("dashboard:save")},this),this.listenTo(this.state,"change:currentState",this._onDashboardStateChange),this.listenTo(t,"addComponent removeComponent",this._onComponentsChange),this.listenTo(t.wiring,"init",function(){this.model.currentFoundation.wiring.initialized&&this.model.currentFoundation.hasVisualComponents()&&this.$("#filterManager").removeAttr("disabled").removeClass("disabledButton")},this),this.listenTo(n,a.OPEN_FILTER_MANAGER,this.showFilterManagerDialog),this._initSaveMenu(),this._initDashboardPropertiesDialogController(t.components.getDashboardPropertiesComponent())},undo:function(){this.trigger("button:undo")},undoAll:function(){this.trigger("button:undoAll")},redo:function(){this.trigger("button:redo")},togglePreviewMode:function(){this.previewIsOn?(this.previewIsOn=!1,this.showAllButtons(["filterPopup"]),this.$("#filterPopup").removeClass("pressed").removeClass("down"),this.filterPopupIsVisible=!1,this.$(".toolbar").removeClass("previewMode"),this.$el.addClass("column decorated primary"),this.trigger("preview:off"),this.propertiesIsOn&&(this.$("#properties").addClass("down"),this.propertiesDialogController.dialog.open()),this.gridIsOn&&this.$("#grid").addClass("down"),this.setVisibility({export:!1}),this._onDashboardStateChange()):(this.previewIsOn=!0,this.hideAllButtons(["save","export","filterPopup","undo","redo","undoAll"]),this.$(".toolbar").addClass("previewMode"),this.$el.removeClass("column decorated primary"),this.$("#filterPopup").removeClass("pressed").removeClass("down"),this.filterPopupIsVisible=!1,this.trigger("preview:on"),this.propertiesIsOn&&(this.$("#properties").removeClass("down"),this.propertiesDialogController.dialog.close()),this.gridIsOn&&this.$("#grid").removeClass("down"),this.setVisibility({export:this.model.currentFoundation.components.getDashboardPropertiesComponent().get("showExportButton")})),n.trigger(a.TOGGLE_PREVIEW_MODE,!0)},toggleLayoutGrid:function(){this.gridIsOn?(this.gridIsOn=!1,this.$("#grid").removeClass("down"),this.trigger("grid:off")):(this.gridIsOn=!0,this.$("#grid").addClass("down"),this.trigger("grid:on"))},showFilterManagerDialog:function(){this.filterManagerDialog||(this.filterManagerDialog=new g({model:this.model.currentFoundation,dashboardId:this.dashboardId})),this.filterManagerDialog.open()},_initDashboardPropertiesDialogController:function(e){this.propertiesDialogController&&(this.stopListening(this.propertiesDialogController.dialog),this.propertiesDialogController.dialog.remove()),this.propertiesDialogController=new p(e),this.listenTo(this.propertiesDialogController.dialog,"close",function(){this.$("#properties").removeClass("down")},this),this.listenTo(this.propertiesDialogController.dialog,"button:cancel",function(){this.propertiesIsOn=!1},this),this.listenTo(this.propertiesDialogController.dialog,"button:ok",function(){this.propertiesIsOn=!1},this),this.listenTo(this.propertiesDialogController.dialog.content.original,"change",this._onDashboardPropertiesChange)},togglePropertiesDialog:function(){var e=this.$("#properties");this.propertiesIsOn?(e.removeClass("down"),this.propertiesDialogController.dialog.close(),this.propertiesIsOn=!1):(e.addClass("down"),this.propertiesDialogController.dialog.open(),this.propertiesIsOn=!0)},hideAllButtons:function(e){var t=this.$(".toolbar button");e&&o.isArray(e)&&e.length>0&&(t=t.not(o.map(e,function(e){return"[id='"+e+"']"}).join(","))),t.addClass("hidden").hide()},showAllButtons:function(e){var t=this.$(".toolbar button");e&&o.isArray(e)&&e.length>0&&(t=t.not(o.map(e,function(e){return"[id='"+e+"']"}).join(","))),t.removeClass("hidden").show()},_onDashboardStateChange:function(){this.state.hasPreviousState()?this.$("#undo, #undoAll").removeAttr("disabled").removeClass("over disabledButton"):this.$("#undo, #undoAll").attr("disabled","disabled").addClass("disabledButton").removeClass("over"),this.state.hasNextState()?this.$("#redo").removeAttr("disabled").removeClass("over disabledButton"):this.$("#redo").attr("disabled","disabled").addClass("disabledButton").removeClass("over")},_onDashboardPropertiesChange:function(e){"dashletFilterShowPopup"in e.changedAttributes()&&(this.setVisibility({filterPopup:e.get("dashletFilterShowPopup")}),e.get("dashletFilterShowPopup")||this.closeFilterPopupDialog())},_onComponentsChange:function(){var e=this.$("#save").removeClass("over"),t=v(".menu.toggleView p:last"),i=v(".jr-mButton.jr-mButtonDropdown.jr-mButtonMedium.jr");this.model.currentFoundation.hasVisualComponents()?(e.removeAttr("disabled").removeClass("disabledButton"),t.removeAttr("disabled").removeClass("disabledButton"),i.removeAttr("disabled").removeClass("disabledButton"),this.model.currentFoundation.wiring.initialized&&this.$("#filterManager").removeAttr("disabled").removeClass("disabledButton")):(e.attr("disabled","disabled").addClass("disabledButton"),t.attr("disabled","disabled"),i.attr("disabled","disabled"),this.$("#filterManager").attr("disabled","disabled").addClass("disabledButton"))},_initSaveMenu:function(){this.saveMenu&&(this.stopListening(this.saveMenu),this.saveMenu.remove());var e=[{label:s["dashboard.save.label"],action:"save"}];this.model.isNew()||e.push({label:s["dashboard.save.as.label"],action:"saveAs"}),this.saveMenu=new r(e,this.$("#save")),this.listenTo(this.saveMenu,"option:save",o.bind(function(){this._onSaveMenuOptionSelected()},this)),this.listenTo(this.saveMenu,"option:saveAs",o.bind(function(){this._onSaveAsMenuOptionSelected()},this))},_onSaveMenuOptionSelected:function(){this.saveMenu.hide(),this.saveDialog.save()},_onSaveAsMenuOptionSelected:function(){this.saveMenu.hide(),this.saveDialog.saveAs()},remove:function(){this.saveMenu&&this.saveMenu.remove(),this.saveDialog&&this.saveDialog.remove(),this.propertiesDialogController.dialog&&this.propertiesDialogController.dialog.remove(),d.prototype.remove.apply(this,arguments)}})});