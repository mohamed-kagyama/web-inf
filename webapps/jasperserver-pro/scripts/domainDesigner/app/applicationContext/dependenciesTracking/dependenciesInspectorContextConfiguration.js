define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Dialog = require("runtime_dependencies/js-sdk/src/components/dialog/Dialog");

var eventBusFactory = require("../../../util/eventBusFactory");

var DependenciesInspectorModel = require("../../component/dependenciesInspector/model/DependenciesInspectorModel");

var automationDataNameAttributesEnum = require("../../common/enum/automationDataNameAttributesEnum");

var DependenciesInspectorApplication = require("../../component/dependenciesInspector/application/DependenciesInspectorApplication");

var DependenciesInspectorTreeStoreMutations = require("../../component/dependenciesInspector/mutations/DependenciesInspectorTreeStoreMutations");

var Vue = require('vue');

var DependenciesTreeStateModel = require("../../component/dependenciesInspector/model/DependenciesTreeStateModel");

var DependenciesTreeVirtualDataModel = require("../../component/dependenciesInspector/model/DependenciesTreeVirtualDataModel");

var DependenciesGroupsToVirtualDataOptionsConverter = require("../../component/dependenciesInspector/convertor/DependenciesGroupsToVirtualDataOptionsConverter");

var virtualDataVueConfigFactory = require("../../common/component/virtualData/virtualDataVueConfigFactory");

var treeVueFactory = require("../../common/component/tree/treeVueConfigFactory");

var dependenciesTreeVirtualDataVueConfigFactory = require("../../component/dependenciesInspector/component/dependenciesTreeVirtualDataVueConfigFactory");

var dependenciesInspectorVueConfigFactory = require("../../component/dependenciesInspector/component/dependenciesInspectorVueConfigFactory");

var addAutomationDataNameAttributeMixinFactory = require("../../common/factory/addAutomationDataNameAttributeMixinFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createDependenciesInspectorApplication(context, options) {
  context.register('dependenciesInspectorEventBus', eventBusFactory.create());
  var leftVirtualDataEventBus = eventBusFactory.create();
  var rightVirtualDataEventBus = eventBusFactory.create();
  var leftDependenciesTreeVirtualDataComponentEventBus = eventBusFactory.create();
  var rightDependenciesTreeVirtualDataComponentEventBus = eventBusFactory.create();
  var leftDependenciesTreeVirtualDataModel = new DependenciesTreeVirtualDataModel();
  var rightDependenciesTreeVirtualDataModel = new DependenciesTreeVirtualDataModel();
  var leftDependenciesTreeStateModel = new DependenciesTreeStateModel();
  var rightDependenciesTreeStateModel = new DependenciesTreeStateModel();
  var LeftVirtualData = Vue.extend(virtualDataVueConfigFactory.create({
    eventBus: leftVirtualDataEventBus,
    defaultHeight: options.dependenciesInspector.canvasHeight
  }));
  var RightVirtualData = Vue.extend(virtualDataVueConfigFactory.create({
    eventBus: rightVirtualDataEventBus,
    defaultHeight: options.dependenciesInspector.canvasHeight
  }));
  var leftDependenciesGroupsToVirtualDataOptionsConverter = new DependenciesGroupsToVirtualDataOptionsConverter({
    dependenciesTreeStateModel: leftDependenciesTreeStateModel
  });
  var rightDependenciesGroupsToVirtualDataOptionsConverter = new DependenciesGroupsToVirtualDataOptionsConverter({
    dependenciesTreeStateModel: rightDependenciesTreeStateModel
  });
  var treeVueConfig = treeVueFactory.create({
    debounceTime: options.loader.dialog.loadingDelay + options.loader.embedded.loadingMinDuration
  });
  var treeVueConfigConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: treeVueConfig,
    dataNames: automationDataNameAttributesEnum.validation.tree
  });
  var dependenciesInspectorLeftTreeVirtualDataConfig = dependenciesTreeVirtualDataVueConfigFactory.create({
    virtualData: LeftVirtualData,
    mixins: [treeVueConfigConfigWithDataNameAttribute],
    store: leftDependenciesTreeVirtualDataModel.attributes,
    dependenciesTreeVirtualDataComponentEventBus: leftDependenciesTreeVirtualDataComponentEventBus
  });
  var dependenciesInspectorLeftTreeVirtualDataConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: dependenciesInspectorLeftTreeVirtualDataConfig,
    dataNames: automationDataNameAttributesEnum.validation.leftTreeVirtualData
  });
  var dependenciesInspectorRightTreeVirtualDataConfig = dependenciesTreeVirtualDataVueConfigFactory.create({
    virtualData: RightVirtualData,
    mixins: [treeVueConfigConfigWithDataNameAttribute],
    store: rightDependenciesTreeVirtualDataModel.attributes,
    dependenciesTreeVirtualDataComponentEventBus: rightDependenciesTreeVirtualDataComponentEventBus
  });
  var dependenciesInspectorRightTreeVirtualDataConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: dependenciesInspectorRightTreeVirtualDataConfig,
    dataNames: automationDataNameAttributesEnum.validation.rightTreeVirtualData
  });
  var dependenciesInspectorConfig = dependenciesInspectorVueConfigFactory.create({
    leftTreeVirtualData: dependenciesInspectorLeftTreeVirtualDataConfigWithDataNameAttribute,
    rightTreeVirtualData: dependenciesInspectorRightTreeVirtualDataConfigWithDataNameAttribute,
    dependenciesInspectorEventBus: context.get('dependenciesInspectorEventBus')
  });
  var dependenciesInspectorConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: dependenciesInspectorConfig,
    dataNames: automationDataNameAttributesEnum.validation.domainDesignerDependenciesInspector
  });
  context.register('dependenciesInspectorModel', new DependenciesInspectorModel());
  var DependenciesInspectorComponent = Vue.extend(dependenciesInspectorConfigWithDataNameAttribute);
  context.register('dependenciesInspectorComponent', new DependenciesInspectorComponent({
    data: context.get('dependenciesInspectorModel').attributes
  }));
  context.register('dependenciesInspectorDialog', new Dialog({
    el: context.get('dependenciesInspectorComponent').$mount().$el
  }));
  var dependenciesInspectorLeftTreeStoreMutations = new DependenciesInspectorTreeStoreMutations({
    defaultCanvasHeight: options.dependenciesInspector.canvasHeight,
    dependenciesTreeVirtualDataModel: leftDependenciesTreeVirtualDataModel,
    dependenciesTreeStateModel: leftDependenciesTreeStateModel,
    dependenciesGroupsToVirtualDataOptionsConverter: leftDependenciesGroupsToVirtualDataOptionsConverter
  });
  var dependenciesInspectorRightTreeStoreMutations = new DependenciesInspectorTreeStoreMutations({
    defaultCanvasHeight: options.dependenciesInspector.canvasHeight,
    dependenciesTreeVirtualDataModel: rightDependenciesTreeVirtualDataModel,
    dependenciesTreeStateModel: rightDependenciesTreeStateModel,
    dependenciesGroupsToVirtualDataOptionsConverter: rightDependenciesGroupsToVirtualDataOptionsConverter
  });
  context.register('dependenciesInspectorApplication', new DependenciesInspectorApplication({
    defaultHeight: options.dependenciesInspector.canvasHeight,
    dependenciesInspectorModel: context.get('dependenciesInspectorModel'),
    dependenciesInspectorEventBus: context.get('dependenciesInspectorEventBus'),
    dependenciesInspectorDialog: context.get('dependenciesInspectorDialog'),
    leftVirtualDataEventBus: leftVirtualDataEventBus,
    rightVirtualDataEventBus: rightVirtualDataEventBus,
    dependenciesLeftTreeVirtualDataComponentEventBus: leftDependenciesTreeVirtualDataComponentEventBus,
    dependenciesRightTreeVirtualDataComponentEventBus: rightDependenciesTreeVirtualDataComponentEventBus,
    dependenciesInspectorLeftTreeStoreMutations: dependenciesInspectorLeftTreeStoreMutations,
    dependenciesInspectorRightTreeStoreMutations: dependenciesInspectorRightTreeStoreMutations
  }));
}

module.exports = function (context, options) {
  createDependenciesInspectorApplication(context, options);
};

});