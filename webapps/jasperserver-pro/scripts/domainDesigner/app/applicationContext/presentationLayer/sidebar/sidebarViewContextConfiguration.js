define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var domElAsVueComponent = require("../../../common/vue/util/domElAsVueComponent");

var eventBusFactory = require("../../../../util/eventBusFactory");

var sidebarMainVueConfigFactory = require("../../../component/layout/sidebarView/component/main/sidebarMainVueConfigFactory");

var clickMenuDirectiveFactory = require("../../../common/vue/directive/clickMenuDirectiveFactory");

var dataSourceMenuOptionTemplate = require("text!../../../component/layout/sidebarView/template/dataSourceMenuOptionTemplate.htm");

var addAutomationDataNameAttributeMixinFactory = require("../../../common/factory/addAutomationDataNameAttributeMixinFactory");

var automationDataNameAttributesEnum = require("../../../common/enum/automationDataNameAttributesEnum");

var SidebarController = require("../../../component/layout/sidebarView/controller/SidebarController");

var SidebarResizablePanelView = require("../../../component/layout/sidebarView/view/SidebarResizablePanelView");

var ClickMenuWithEventsRetrigger = require("../../../common/menu/ClickMenuWithEventsRetrigger");

var DataSourceMenuOptionsFactory = require("../../../component/layout/sidebarView/factory/DataSourceMenuOptionsFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createSidebarEventBus(context, options) {
  context.register('sidebarEventBus', eventBusFactory.create());
}

function createSidebarController(context, options) {
  context.register('sidebarController', new SidebarController({
    storeChangeEventBus: context.get('storeChangeEventBus'),
    applicationCrossComponentEventBus: context.get('applicationCrossComponentEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    clearAllDataConfirmationDialog: context.get('clearAllDataConfirmationDialog'),
    sidebarEventBus: context.get('sidebarEventBus'),
    resourcePropertiesService: context.get('clientResourcePropertiesService'),
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    clientDomainSchemaCalcFieldsService: context.get('clientDomainSchemaCalcFieldsService'),
    validationStateFactory: context.get('validationStateFactory')
  }));
}

function createSidebarView(context, options) {
  var dataSourceMenuOptionsFactory = new DataSourceMenuOptionsFactory({
    clientDomainSchemaService: context.get('clientDomainSchemaService')
  });
  var clickMenuDirective = clickMenuDirectiveFactory.create(ClickMenuWithEventsRetrigger, {
    menuOptionTemplate: dataSourceMenuOptionTemplate,
    eventBus: context.get('sidebarEventBus')
  });
  context.register('sidebarResizablePanel', new SidebarResizablePanelView({
    applicationCrossComponentEventBus: context.get('applicationCrossComponentEventBus'),
    SIDEBAR_MIN_WIDTH: options.sidebar.SIDEBAR_MIN_WIDTH,
    SIDEBAR_MAX_WIDTH: options.sidebar.SIDEBAR_MAX_WIDTH
  }));
  var sidebarMainConfig = sidebarMainVueConfigFactory.create({
    clickMenuDirective: clickMenuDirective,
    dataSourceMenuOptionsFactory: dataSourceMenuOptionsFactory,
    metadataDesignerSidebar: domElAsVueComponent({
      el: context.get('metadataDesignerSidebar').$el
    }),
    joinsDesignerResourcesForEmptyJoinTreesSidebar: domElAsVueComponent({
      el: context.get('joinsDesignerResourcesForEmptyJoinTreesSidebar').$el
    }),
    joinsDesignerResourcesForNotEmptyJoinTreesSidebar: domElAsVueComponent({
      el: context.get('joinsDesignerResourcesForNotEmptyJoinTreesSidebar').$el
    }),
    joinsDesignerJoinTreesTreeSidebar: domElAsVueComponent({
      el: context.get('joinsDesignerJoinTreesTreeSidebar').$el
    }),
    presentationDesignerSidebar: domElAsVueComponent({
      el: context.get('presentationDesignerSidebar').$el
    }),
    filtersDesignerSidebar: domElAsVueComponent({
      el: context.get('filtersDesignerSidebar').$el
    }),
    metadataDesignerSidebarSearch: context.get('metadataDesignerSidebarSearch'),
    joinsDesignerSidebarSearch: context.get('joinsDesignerSidebarSearch'),
    presentationDesignerSidebarSearch: context.get('presentationDesignerSidebarSearch'),
    filtersDesignerSidebarSearch: context.get('filtersDesignerSidebarSearch')
  });
  var sidebarMainConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: sidebarMainConfig,
    dataNames: automationDataNameAttributesEnum.sidebar.options
  });
  context.register('sidebarVueConfig', sidebarMainConfigWithDataNameAttribute);
}

module.exports = function (context, options) {
  createSidebarEventBus(context, options);
  createSidebarView(context, options);
  createSidebarController(context, options);
};

});