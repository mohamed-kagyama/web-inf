define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

var RepositoryResourceChooserDialogWrapper = require("../../../component/repositoryResourceChooser/component/dialog/wrapper/RepositoryResourceChooserDialogWrapper");

var repositoryResourceChooserFactory = require("../../../component/repositoryResourceChooser/component/chooser/factory/repositoryResourceChooserFactory");

var repositoryResourceChooserComputedMixinFactory = require("../../../component/repositoryResourceChooser/component/chooser/mixin/computed/repositoryResourceChooserComputedMixinFactory");

var repositoryResourceChooserIsSelectionShouldBeIgnoredComputedMixinFactory = require("../../../component/repositoryResourceChooser/component/chooser/mixin/computed/repositoryResourceChooserIsSelectionShouldBeIgnoredComputedMixinFactory");

var repositoryResourceChooserResourceDoubleClickBehaviourMixin = require("../../../component/repositoryResourceChooser/component/chooser/mixin/behaviour/repositoryResourceChooserResourceDoubleClickBehaviourMixin");

var ignoreFolderSelectionPredicate = require("../../../component/repositoryResourceChooser/component/chooser/predicate/ignoreFolderSelectionPredicate");

var RepositoryItemChooserDialogView = require("runtime_dependencies/bi-repository/src/bi/repository/dialog/resourceChooser/view/RepositoryItemChooserDialogView");

var RepositoryResourceChooserDialogFactory = require("../../../component/repositoryResourceChooser/factory/RepositoryResourceChooserDialogFactory");

var repositoryResourceChooserTreeTemplate = require("text!../../../component/repositoryResourceChooser/component/chooser/template/repositoryResourceChooserTreeTemplate.htm");

var repositoryResourceChooserListTemplate = require("text!../../../component/repositoryResourceChooser/component/chooser/template/repositoryResourceChooserListTemplate.htm");

var addAutomationDataNameAttributeMixinFactory = require("../../../common/factory/addAutomationDataNameAttributeMixinFactory");

var automationDataNameAttributesEnum = require("../../../common/enum/automationDataNameAttributesEnum");

var RepositoryResourceChooserDialogStore = require("../../../component/repositoryResourceChooser/component/dialog/store/RepositoryResourceChooserDialogStore");

var repositoryResourceChooserDialogVueConfigFactory = require("../../../component/repositoryResourceChooser/component/dialog/factory/repositoryResourceChooserDialogVueConfigFactory");

var repositoryResourceChooserDialogBehaviourMixinFactory = require("../../../component/repositoryResourceChooser/component/dialog/mixin/behaviour/repositoryResourceChooserDialogBehaviourMixinFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createRepositoryChooserDialogFactory(context, contextOptions) {
  context.register('repositoryChooserDialogFactory', new RepositoryResourceChooserDialogFactory({
    Dialog: RepositoryItemChooserDialogView
  }));
  context.register('vueRepositoryChooserDialogFactory', {
    create: function create(options) {
      return createRepositoryTreeAndResourceChooser(context, options, contextOptions);
    }
  });
}

function createRepositoryTreeAndResourceChooser(context, options, contextOptions) {
  var store = new RepositoryResourceChooserDialogStore({}, {
    listItemHeight: contextOptions.repositoryResourceChooser.resourcesList.itemsHeight
  }),
      repositoryResourceChooserStore = store.get('repositoryResourceChooser');
  context.register('repositoryResourceChooserDialogStore', store);
  var repositoryResourceChooserFactoryMixins = addAutomationDataNameAttributeMixinFactory.create({
    config: {},
    dataNames: automationDataNameAttributesEnum.common.repositoryResourceChooser
  }).mixins;
  var repositoryResourceChooserListMixin = addAutomationDataNameAttributeMixinFactory.create({
    config: {},
    dataNames: automationDataNameAttributesEnum.common.repositoryResourceChooserList
  }).mixins;
  var repositoryResourceChooserTreeMixin = addAutomationDataNameAttributeMixinFactory.create({
    config: {},
    dataNames: automationDataNameAttributesEnum.common.repositoryResourceChooserTree
  }).mixins;
  var repositoryResourceChooser = repositoryResourceChooserFactory.create({
    store: repositoryResourceChooserStore,
    resourceService: context.get('resourcesServiceWrappedWithLoader'),
    resourcesTypeToSelectTree: options.resourcesTypeToSelectTree,
    resourcesTypeToLoad: options.resourcesTypeToLoad || options.resourcesTypeToSelectTree,
    repositoryResourceChooserList: {
      offset: contextOptions.repositoryResourceChooser.resourcesList.offset,
      limit: contextOptions.repositoryResourceChooser.resourcesList.limit,
      template: repositoryResourceChooserListTemplate,
      mixins: repositoryResourceChooserListMixin.concat(repositoryResourceChooserResourceDoubleClickBehaviourMixin)
    },
    repositoryResourceChooserTree: {
      debounceTime: contextOptions.loader.dialog.loadingDelay + contextOptions.loader.embedded.loadingMinDuration,
      offset: contextOptions.repositoryResourceChooser.repositoryTree.offset,
      limit: contextOptions.repositoryResourceChooser.repositoryTree.limit,
      template: repositoryResourceChooserTreeTemplate,
      mixins: repositoryResourceChooserTreeMixin.concat(repositoryResourceChooserResourceDoubleClickBehaviourMixin)
    },
    mixins: repositoryResourceChooserFactoryMixins
  });
  var repositoryResourceChooserDialogBehaviourMixin = repositoryResourceChooserDialogBehaviourMixinFactory.create({
    store: context.get('repositoryResourceChooserDialogStore'),
    repositoryResourceChooserStateMutations: repositoryResourceChooser.mutations,
    repositoryResourceChooserStateActions: repositoryResourceChooser.actions
  });
  var repositoryResourceChooserDialogConfig = repositoryResourceChooserDialogVueConfigFactory.create({
    RepositoryResourceChooser: repositoryResourceChooser.component,
    store: context.get('repositoryResourceChooserDialogStore'),
    mixins: [repositoryResourceChooser.behaviour, repositoryResourceChooserDialogBehaviourMixin, repositoryResourceChooserComputedMixinFactory.create({
      store: repositoryResourceChooserStore
    }), repositoryResourceChooserIsSelectionShouldBeIgnoredComputedMixinFactory.create({
      store: repositoryResourceChooserStore,
      test: options.ignoreResourceSelectionPredicate || ignoreFolderSelectionPredicate
    })]
  });
  var repositoryResourceChooserDialogConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: repositoryResourceChooserDialogConfig,
    dataNames: automationDataNameAttributesEnum.common.repositoryResourceChooserDialog
  });
  var RepositoryResourceChooserDialog = Vue.extend(repositoryResourceChooserDialogConfigWithDataNameAttribute);
  var repositoryResourceChooserDialog = new RepositoryResourceChooserDialog();
  context.register('repositoryResourceChooserDialog', repositoryResourceChooserDialog);
  return new RepositoryResourceChooserDialogWrapper({
    repositoryResourceChooserDialog: repositoryResourceChooserDialog
  });
}

module.exports = function (context, options) {
  createRepositoryChooserDialogFactory(context, options);
};

});