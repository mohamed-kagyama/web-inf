/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../layout/sidebarView/tree/plugin/ContextMenuTreePlugin","../../../../layout/sidebarView/tree/plugin/TooltipPlugin","text!../template/presentationDesignerSidebarTreeTemplate.htm"],function(e,t,i){function n(e){var t=e.dataProvider,i=e.listItemHeight,n=e.sidebarTooltipOptionsFactory,a=e.presentationDesignerSidebarContextMenuOptionsProvider,l=e.sidebarTreeContextMenuVisibilitySpecification,p=e.presentationDesignerSidebarContextMenuEventHandlers;return{selection:{allowed:{left:!1,right:!1}},plugins:[{constr:o,options:{getContextMenuOptions:a.getMenuOptions,showContextMenuCondition:l.isSatisfiedBy,contextMenuEvents:p}},{constr:r,options:{getTooltipOptions:n.create}}],listItemHeight:i,itemsTemplate:s,dataProvider:t}}var o=e("../../../../layout/sidebarView/tree/plugin/ContextMenuTreePlugin"),r=e("../../../../layout/sidebarView/tree/plugin/TooltipPlugin"),s=e("text!../template/presentationDesignerSidebarTreeTemplate.htm");i.exports={getTreeOptions:n}});