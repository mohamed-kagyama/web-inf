/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../layout/sidebarView/tree/plugin/ContextMenuTreePlugin","../../../../layout/sidebarView/tree/plugin/TooltipPlugin","text!../../template/filtersDesignerSidebarTreeTemplate.htm"],function(e,t,i){function n(e){var t=e.listItemHeight,i=e.dataProvider,n=e.sidebarTooltipOptionsFactory,l=e.filtersDesignerSidebarContextMenuEventHandlers,a=e.filtersDesignerSidebarContextMenuOptionsProvider,u=e.filtersDesignerSidebarTreeContextMenuVisibilitySpecification;return{listItemHeight:t,itemsTemplate:s,dataProvider:i,plugins:[{constr:r,options:{getContextMenuOptions:a.getMenuOptions,showContextMenuCondition:u.isSatisfiedBy,contextMenuEvents:l}},{constr:o,options:{getTooltipOptions:n.create}}]}}var r=e("../../../../layout/sidebarView/tree/plugin/ContextMenuTreePlugin"),o=e("../../../../layout/sidebarView/tree/plugin/TooltipPlugin"),s=e("text!../../template/filtersDesignerSidebarTreeTemplate.htm");i.exports={getTreeOptions:n}});