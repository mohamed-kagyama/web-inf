/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","../base/ComponentView","../../dashboardMessageBus","../../enum/dashboardMessageBusEvents","../../factory/sandboxFactory","../../view/designer/ParameterMenu","../../view/designer/propertiesDialog/PropertiesDialogController","../../enum/dashboardComponentTypes","runtime_dependencies/js-sdk/src/common/component/menu/ContextMenu","underscore","jquery","bundle!DashboardBundle"],function(e,t,o){var n=e("backbone"),i=e("../base/ComponentView"),s=e("../../dashboardMessageBus"),r=e("../../enum/dashboardMessageBusEvents"),l=e("../../factory/sandboxFactory"),a=e("../../view/designer/ParameterMenu"),p=e("../../view/designer/propertiesDialog/PropertiesDialogController"),d=e("../../enum/dashboardComponentTypes"),h=e("runtime_dependencies/js-sdk/src/common/component/menu/ContextMenu"),c=e("underscore"),u=e("jquery"),g=e("bundle!DashboardBundle");o.exports=i.extend({events:c.extend({},i.prototype.events,{click:"_selectComponent",dblclick:"_showPropertiesDialog",contextmenu:"_showContextMenu"}),initialize:function(){i.prototype.initialize.apply(this,arguments),this._initContextMenu(),this.model.get("type")!==d.FILTER_GROUP&&this.addOverlay(),this.on("componentRendered",c.bind(this._onComponentRendered,this)),this.listenTo(this.model,"change:selected",this._onComponentSelect),this.listenTo(s,r.TOGGLE_PREVIEW_MODE,c.bind(this._onTogglePreviewMode,this)),this.listenTo(this.dashboardProperties,"change",this._onDashboardPropertiesChange)},remove:function(){this.propertiesDialogController&&this.propertiesDialogController.remove(),i.prototype.remove.apply(this,arguments)},_initContextMenu:function(){var e=[{label:g["dashboard.context.menu.option.properties"],action:"properties"},{label:g["dashboard.context.menu.option.delete"],action:"delete"}];this.additionalContextMenuOptions&&(e=e.concat(this.additionalContextMenuOptions)),this.contextMenu=new h(e),this.listenTo(this.contextMenu,"option:properties",this._showPropertiesDialog),this.listenTo(this.contextMenu,"option:delete",this._deleteComponent),this._initComponentSpecificContextMenuEvents&&this._initComponentSpecificContextMenuEvents()},_onTogglePreviewMode:function(e){if(this.propertiesDialogController&&this.propertiesDialogController.dialog){var t=this.propertiesDialogController.dialog,o=this.propertiesDialogController.lastCoordinates;this.propertiesDialogController.dialogIsOpened&&!e?t.open(c.extend({silent:!0},o)):t.close({silent:!0})}},_onComponentRendered:function(){},_onComponentSelect:function(){this.model.get("selected")?this.$el.addClass("selected"):(this.$el.removeClass("selected"),this.contextMenu.hide())},_onDashboardPropertiesChange:function(e){},_deleteComponent:function(){this.trigger("delete",this.model)},_selectComponent:function(e){e&&e.stopPropagation&&e.stopPropagation(),this.model&&this.model.collection&&this.model.collection.selectComponent(u(e.target).attr("id")||this.model.id)},_showPropertiesDialog:function(e){var t={};if(e instanceof n.View){var o=e.$el.offset();t={top:o.top,left:o.left}}else e.stopPropagation&&e.stopPropagation(),t={top:e.pageY,left:e.pageX};this.contextMenu.hide(),a.useModel(l.get(this.model.dashboardId).get("dashboardModel")),this.propertiesDialogController||(this.propertiesDialogController=new p(this.model),this.listenTo(this.propertiesDialogController.dialog,"properties:dialog:select",this._selectComponent)),this.propertiesDialogController.lastCoordinates=t,this.propertiesDialogController.dialog.open(c.extend({renderContent:!1},t))},_showContextMenu:function(e){e.preventDefault(),this._selectComponent(e),this.contextMenu.show({left:e.pageX,top:e.pageY},this.$el)}})});