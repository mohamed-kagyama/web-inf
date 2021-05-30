define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

var eventBusFactory = require("../../../util/eventBusFactory");

var ApplicationController = require("../../component/layout/applicationView/controller/ApplicationController");

var expirationManager = require('../../../../session/expirationManager');

var MenuStore = require("../../component/layout/menuView/component/store/MenuStore");

var menuVueConfigFactory = require("../../component/layout/menuView/component/factory/menuVueConfigFactory");

var MenuViewController = require("../../component/layout/menuView/controller/MenuViewController");

var createDesigners = require("./createDesigners");

var SaveMenuOptionsFactory = require("../../component/layout/menuView/factory/SaveMenuOptionsFactory");

var ExportSchemaMenuOptionsFactory = require("../../component/layout/menuView/factory/ExportSchemaMenuOptionsFactory");

var hoverMenuDirectiveFactory = require("../../common/vue/directive/hoverMenuDirectiveFactory");

var HoverMenuWithEventsRetrigger = require("../../common/menu/HoverMenuWithEventsRetrigger");

var addAutomationDataNameAttributeMixinFactory = require("../../common/factory/addAutomationDataNameAttributeMixinFactory");

var automationDataNameAttributesEnum = require("../../common/enum/automationDataNameAttributesEnum");

var SchemaIsIntegralAndCompleteSpecification = require("../../component/layout/menuView/specification/SchemaIsIntegralAndCompleteSpecification");

var designerSwitcherVueConfigFactory = require("../../component/layout/designerSwitcher/component/designerSwitcherVueConfigFactory");

var DesignerSwitcherController = require("../../component/layout/designerSwitcher/controller/DesignerSwitcherController");

var DesignerSwitcherStore = require("../../component/layout/designerSwitcher/store/DesignerSwitcherStore");

var designerSwitcherVueTemplate = require("text!../../component/layout/designerSwitcher/template/designerSwitcherVueTemplate.htm");

var menuItemWithOptionsTemplate = require("text!../../common/template/menuItemWithOptionsTemplate.htm");

var Application = require("../../Application");

var applicationVueConfigFactory = require("../../component/layout/applicationView/component/applicationVueConfigFactory");

var ApplicationVueStore = require("../../component/layout/applicationView/component/store/ApplicationVueStore");

var ContextHelpController = require("../../common/controller/ContextHelpController");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createMenuView(context, options) {
  var allowJSONExport = options.allowJSONExport;
  context.register('menuEventBus', eventBusFactory.create());
  var saveMenuOptionsFactory = new SaveMenuOptionsFactory({
    clientResourcePropertiesService: context.get('clientResourcePropertiesService')
  });
  var hoverMenuDirective = hoverMenuDirectiveFactory.create(HoverMenuWithEventsRetrigger, {
    menuOptionTemplate: menuItemWithOptionsTemplate,
    eventBus: context.get('menuEventBus')
  });
  context.register('schemaIsIntegralAndCompleteSpecification', new SchemaIsIntegralAndCompleteSpecification({
    clientDomainSchemaService: context.get('clientDomainSchemaService')
  }));
  var exportSchemaMenuOptionsFactory = new ExportSchemaMenuOptionsFactory({
    exportJSON: allowJSONExport,
    schemaIsIntegralAndCompleteSpecification: context.get('schemaIsIntegralAndCompleteSpecification')
  });
  context.register('menuStore', new MenuStore());
  var menuVueConfig = menuVueConfigFactory.create({
    data: context.get('menuStore').attributes,
    menuEventBus: context.get('menuEventBus'),
    exportJSON: allowJSONExport,
    hoverMenuDirective: hoverMenuDirective,
    saveMenuOptionsFactory: saveMenuOptionsFactory,
    exportSchemaMenuOptionsFactory: exportSchemaMenuOptionsFactory
  });
  var menuVueConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: menuVueConfig,
    dataNames: automationDataNameAttributesEnum.common.menuView
  });
  context.register('menuVueConfig', menuVueConfigWithDataNameAttribute);
  context.register('menuViewController', new MenuViewController({
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    applicationCrossComponentEventBus: context.get('applicationCrossComponentEventBus'),
    schemaIsIntegralAndCompleteSpecification: context.get('schemaIsIntegralAndCompleteSpecification'),
    historyModel: context.get('historyModel'),
    menuStore: context.get('menuStore'),
    menuEventBus: context.get('menuEventBus'),
    validationStateFactory: context.get('validationStateFactory')
  }));
}

function createDesignerSwitcherView(context, options) {
  context.register('designerSwitcherEventBus', eventBusFactory.create());
  var designerSwitcherStore = new DesignerSwitcherStore();
  var designerSwitcherConfig = designerSwitcherVueConfigFactory.create({
    data: designerSwitcherStore.attributes,
    template: designerSwitcherVueTemplate,
    designerSwitcherEventBus: context.get('designerSwitcherEventBus')
  });
  var designerSwitcherConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: designerSwitcherConfig,
    dataNames: automationDataNameAttributesEnum.common.designerSwitcher
  });
  context.register('designerSwitcherController', new DesignerSwitcherController({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    designerSwitcherEventBus: context.get('designerSwitcherEventBus'),
    designerSwitcherStore: designerSwitcherStore,
    clientDomainSchemaService: context.get('clientDomainSchemaService')
  }));
  context.register('designerSwitcherVueConfig', designerSwitcherConfigWithDataNameAttribute);
}

function createViews(context, options) {
  createDesigners(context, options);
  createMenuView(context, options);
  createDesignerSwitcherView(context, options);
  context.register('applicationVueStore', new ApplicationVueStore());
  var ApplicationVue = Vue.extend(applicationVueConfigFactory.create({
    data: context.get('applicationVueStore').attributes,
    el: options.el,
    resizablePanel: context.get('sidebarResizablePanel'),
    sidebar: Vue.extend(context.get('sidebarVueConfig')),
    canvas: Vue.extend(context.get('canvasVueConfig')),
    menu: Vue.extend(context.get('menuVueConfig')),
    tabs: Vue.extend(context.get('designerSwitcherVueConfig'))
  }));
  context.register('applicationVue', new ApplicationVue());
}

function createControllers(context, options) {
  context.register('applicationController', new ApplicationController({
    loginPageUrl: options.loginPageUrl,
    window: options.window,
    expirationManager: expirationManager,
    timeoutWarningDelay: options.timeoutWarningDelay,
    storeChangeEventBus: context.get('storeChangeEventBus'),
    clientResourcePropertiesService: context.get('clientResourcePropertiesService'),
    model: context.get('applicationVueStore'),
    historyModel: context.get('historyModel'),
    initialSidebarWidth: options.sidebar.initialWidth,
    applicationCrossComponentEventBus: context.get('applicationCrossComponentEventBus')
  }));
  context.register('contextHelpController', new ContextHelpController({
    storeChangeEventBus: context.get('storeChangeEventBus')
  }));
}

function createApplication(context, options) {
  context.register('application', new Application({
    applicationDispatcherEventConfigInitializer: context.get('applicationDispatcherEventConfigInitializer'),
    validationStateFactory: context.get('validationStateFactory'),
    applicationVueStore: context.get('applicationVueStore'),
    initialStartupOptions: {
      domainUri: options.domainUri,
      dataSourceUri: options.dataSourceUri,
      parentFolderUri: options.parentFolderUri
    }
  }));
}

module.exports = function (context, options) {
  createViews(context, options);
  createControllers(context, options);
  createApplication(context, options);
};

});