define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

var treeVueConfigFactory = require("../../../../../common/component/tree/treeVueConfigFactory");

var treeActionsFactory = require("../../../../../common/component/tree/actions/treeActionsFactory");

var SequenceGenerator = require("../../../../../../model/util/SequenceGenerator");

var TreeNodeProvider = require("../../../../../common/component/tree/provider/TreeNodeProvider");

var repositoryResourceChooserVueConfigFactory = require("./repositoryResourceChooserVueConfigFactory");

var repositoryResourceChooserStateMutationsFactory = require("../mutations/repositoryResourceChooserStateMutationsFactory");

var repositoryResourceChooserActionsFactory = require("../actions/repositoryResourceChooserActionsFactory");

var repositoryResourceChooserBehaviourMixinFactory = require("../mixin/behaviour/repositoryResourceChooserBehaviourMixinFactory");

var RepositoryTreeNodeProvider = require("../../../../../common/component/repositoryTree/provider/RepositoryTreeNodeProvider");

var RepositoryListNodeProvider = require("../../../../../common/component/repositoryTree/provider/RepositoryListNodeProvider");

var ResourceLookupToTreeNodeConverter = require("../../../../../common/component/repositoryTree/converter/ResourceLookupToTreeNodeConverter");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var store = options.store;
    var resourceLookupToTreeNodeConverter = new ResourceLookupToTreeNodeConverter({
      sequenceGenerator: new SequenceGenerator(),
      resourceTypesToSelect: options.resourcesTypeToSelectTree
    });
    var repositoryResourcesTreeNodeProvider = new RepositoryTreeNodeProvider({
      resourceService: options.resourceService,
      skipEmptyFolders: true,
      defaultSearchParams: {
        offset: options.repositoryResourceChooserTree.offset,
        limit: options.repositoryResourceChooserTree.limit,
        forceTotalCount: true,
        forceFullPage: true,
        type: options.resourcesTypeToLoad
      },
      resourceLookupToTreeNodeConverter: resourceLookupToTreeNodeConverter
    });
    var resourceTreeNodeProvider = new TreeNodeProvider({
      parentDataProvider: repositoryResourcesTreeNodeProvider
    });
    var repositoryResourcesListNodeProvider = new RepositoryListNodeProvider({
      resourceService: options.resourceService,
      defaultSearchParams: {
        offset: options.repositoryResourceChooserList.offset,
        limit: options.repositoryResourceChooserList.limit,
        folderUri: '/',
        forceTotalCount: true,
        forceFullPage: true,
        type: options.resourcesTypeToLoad
      },
      resourceLookupToTreeNodeConverter: resourceLookupToTreeNodeConverter
    });
    var resourceListNodeProvider = new TreeNodeProvider({
      parentDataProvider: repositoryResourcesListNodeProvider
    });
    var repositoryResourceChooserList = treeVueConfigFactory.create(options.repositoryResourceChooserList);
    var repositoryResourceChooserTree = treeVueConfigFactory.create(options.repositoryResourceChooserTree);
    var ResourceList = Vue.extend(repositoryResourceChooserList);
    var ResourceTree = Vue.extend(repositoryResourceChooserTree);
    var resourcesListActions = treeActionsFactory.create({
      treeNodeProvider: resourceListNodeProvider
    }),
        repositoryTreeActions = treeActionsFactory.create({
      initialDataOptions: {
        options: {
          open: true
        },
        properties: {
          uri: '/'
        }
      },
      treeNodeProvider: resourceTreeNodeProvider
    }),
        repositoryResourceChooserActions = repositoryResourceChooserActionsFactory.create({
      resourcesListActions: resourcesListActions,
      repositoryTreeActions: repositoryTreeActions,
      resourceListNodeProvider: resourceListNodeProvider,
      repositoryResourcesListNodeProvider: repositoryResourcesListNodeProvider,
      store: store
    });
    var repositoryResourceChooserStateMutations = repositoryResourceChooserStateMutationsFactory.create({
      store: store
    });
    var repositoryResourceChooserBehaviourMixin = repositoryResourceChooserBehaviourMixinFactory.create({
      store: store,
      repositoryResourceChooserActions: repositoryResourceChooserActions,
      repositoryResourceChooserStateMutations: repositoryResourceChooserStateMutations
    });
    var repositoryResourceChooserConfig = repositoryResourceChooserVueConfigFactory.create({
      RepositoryTree: ResourceTree,
      ResourcesList: ResourceList,
      mixins: options.mixins
    });
    var RepositoryResourceChooser = Vue.extend(repositoryResourceChooserConfig);
    return {
      component: RepositoryResourceChooser,
      actions: repositoryResourceChooserActions,
      mutations: repositoryResourceChooserStateMutations,
      behaviour: repositoryResourceChooserBehaviourMixin
    };
  }
};

});