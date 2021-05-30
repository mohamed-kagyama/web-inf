define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var i18n = require("bundle!DashboardBundle");

var i18n2 = require("bundle!CommonBundle");

var Backbone = require('backbone');

var ReportsParametersCollection = require('../../collection/ReportsParametersCollection');

var Tree = require("runtime_dependencies/js-sdk/src/common/component/tree/Tree");

var TreeDataLayer = require("runtime_dependencies/js-sdk/src/common/component/tree/TreeDataLayer");

var TooltipTreePlugin = require("runtime_dependencies/js-sdk/src/common/component/tree/plugin/TooltipPlugin");

var InfiniteScrollPlugin = require("runtime_dependencies/js-sdk/src/common/component/tree/plugin/InfiniteScrollPlugin");

var ContextMenu = require("runtime_dependencies/js-sdk/src/common/component/menu/ContextMenu");

var ContextMenuTreePlugin = require("runtime_dependencies/js-sdk/src/common/component/tree/plugin/ContextMenuTreePlugin");

var DragTreePlugin = require("runtime_dependencies/js-sdk/src/common/component/tree/plugin/DragAndDropPlugin");

var SearchTreePlugin = require("runtime_dependencies/js-sdk/src/common/component/tree/plugin/SearchPlugin");

var EmptyNodesPlugin = require("runtime_dependencies/js-sdk/src/common/component/tree/plugin/HideEmptyNodesPlugin");

var Panel = require("runtime_dependencies/js-sdk/src/common/component/panel/Panel");

var collapsiblePanelTrait = require("runtime_dependencies/js-sdk/src/common/component/panel/trait/collapsiblePanelTrait");

var tabbedPanelTrait = require("runtime_dependencies/js-sdk/src/common/component/panel/trait/tabbedPanelTrait");

var menuPanelTrait = require("runtime_dependencies/js-sdk/src/common/component/panel/trait/menuPanelTrait");

var resizablePanelTrait = require("runtime_dependencies/js-sdk/src/common/component/panel/trait/resizablePanelTrait");

var dashboardComponentModelFactory = require('../../factory/dashboardComponentModelFactory');

var DashboardResourceModel = require('../../model/DashboardResourceModel');

var Accordion = require("runtime_dependencies/js-sdk/src/common/component/accordion/Accordion");

var dashboardComponentTypes = require('../../enum/dashboardComponentTypes');

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

var dashboardSettings = require('../../dashboardSettings');

var sidebarTemplate = require("text!../../template/sidebarTemplate.htm");

var sidebarTreeLeafTemplate = require("text!../../template/sidebarTreeLeafTemplate.htm");

var sidebarTreeLeafTooltipTemplate = require("text!../../template/tooltip/sideBarTreeLeafTooltipTemplate.htm");

var resourcesTreeGetDataUriFnUtil = require("runtime_dependencies/bi-repository/src/bi/repository/util/resourcesTreeGetDataUriFnUtil");

var extractRootLevelDataFromHtmlResponse = require("runtime_dependencies/bi-repository/src/bi/repository/util/extractRootLevelDataFromHtmlResponse");

var settings = require("settings!treeComponent");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ParametersCache = ReportsParametersCollection.instance;
var LIST_ITEM_HEIGHT = 27;
var VIEW_TYPES = {
  FOLDERS: 'folders',
  LIST: 'list'
};
var GROUP_IDS = {
  VIEW: 'view',
  VISUALIZATION: 'visualization'
};
var TREE_OPTIONS = {
  folders: {
    bufferSize: parseInt(settings.treeLevelLimit, 10)
  },
  list: {
    bufferSize: 100,
    cache: {
      searchKey: 'searchString',
      pageSize: 100
    }
  }
};
module.exports = Panel.extend({
  constructor: function constructor(options) {
    Panel.call(this, _.extend({
      title: i18n['dashboard.sidebar.title'],
      collapserSelector: '> .button.minimize, > .icon.minimize',
      template: sidebarTemplate,
      traits: [collapsiblePanelTrait, resizablePanelTrait],
      collapsed: false,
      additionalCssClasses: 'jr',
      contentContainer: '.content',
      closedClass: 'minimized',
      handles: 'e',
      minWidth: dashboardSettings.SIDEBAR_MIN_WIDTH,
      maxWidth: dashboardSettings.SIDEBAR_MAX_WIDTH
    }, options));
  },
  initialize: function initialize(options) {
    var self = this;
    Panel.prototype.initialize.apply(this, arguments);
    options || (options = {});
    options.strategy || (options.strategy = {
      onDashletDragStart: function onDashletDragStart() {},
      onDashletDrag: function onDashletDrag() {},
      onDashletDragStop: function onDashletDragStop() {}
    });
    var tooltipOptions = {
      i18n: i18n2,
      attachTo: this.$el,
      contentTemplate: sidebarTreeLeafTooltipTemplate
    };
    this.dashboardId = options.dashboardId;
    this.addedParameterContainers = [];
    this.filterContextMenu = new ContextMenu([{
      label: i18n['dashboard.context.menu.option.add.to.filter.manager'],
      action: 'add'
    }, {
      label: i18n['dashboard.context.menu.option.remove.from.filter.manager'],
      action: 'remove',
      'default': true
    }], {
      toggle: true
    });
    this.listenTo(this.filterContextMenu, 'option:add', function (optionView, optionModel) {
      var componentObj = this.filterContextMenu.treeItem.value,
          dashboardResource = DashboardResourceModel.createDashboardResource(componentObj),
          componentsCollection = this.model.currentFoundation.components,
          inputComponentModel = dashboardComponentModelFactory(componentObj, {
        resource: dashboardResource,
        collection: componentsCollection,
        dashboardId: self.dashboardId
      }, {
        createComponentObj: true
      });
      inputComponentModel.set({
        'ownerResourceId': componentObj.ownerResourceId,
        'ownerResourceParameterName': componentObj.ownerResourceParameterName,
        'masterDependencies': componentObj.masterDependencies,
        'fullCollectionRequired': componentObj.mandatory && !!componentObj.masterDependencies.length
      });
      !componentsCollection.findWhere({
        resource: componentObj.uri
      }) && componentsCollection.add(inputComponentModel);
    });
    this.listenTo(this.filterContextMenu, 'option:remove', function (optionView, optionModel) {
      var componentObj = this.filterContextMenu.treeItem.value;
      var componentsCollection = this.model.currentFoundation.components;
      var model = componentsCollection.findWhere({
        resource: componentObj.uri
      });
      model && componentsCollection.remove(model);
    });
    var ContentPanelTree = Tree.use(TooltipTreePlugin, tooltipOptions).use(ContextMenuTreePlugin, {
      contextMenu: this.filterContextMenu,
      defaultSelectedItems: function defaultSelectedItems(item, actions) {
        var model = _.find(self.model.currentFoundation.wiring.models, function (model) {
          return model.component.get('resource') === item.value.uri;
        });

        if (model) {
          return actions[0];
        }
      },
      showContextMenuCondition: function showContextMenuCondition(item) {
        if (item.cssClass === 'dashboard-existingContent-filter-invisible') {
          return this.contextMenu;
        }
      }
    }).use(EmptyNodesPlugin).use(DragTreePlugin, {
      onDragStart: _.bind(options.strategy.onDashletDragStart, options.strategy),
      onDrag: _.bind(options.strategy.onDashletDrag, options.strategy),
      onDragStop: _.bind(options.strategy.onDashletDragStop, options.strategy)
    }).create(),
        ExistingContentPanelTree = Tree.use(TooltipTreePlugin, tooltipOptions).use(InfiniteScrollPlugin).use(SearchTreePlugin, {
      additionalParams: {
        type: [repositoryResourceTypes.REPORT_UNIT, repositoryResourceTypes.ADHOC_DATA_VIEW]
      }
    }).use(DragTreePlugin, {
      onDragStart: _.bind(options.strategy.onDashletDragStart, options.strategy),
      onDrag: _.bind(options.strategy.onDashletDrag, options.strategy),
      onDragStop: _.bind(options.strategy.onDashletDragStop, options.strategy)
    }).create(),
        self = this;
    this.reportParametersTree = ContentPanelTree.instance({
      itemsTemplate: sidebarTreeLeafTemplate,
      listItemHeight: LIST_ITEM_HEIGHT,
      selection: {
        allowed: true,
        multiple: false
      },
      rootless: true,
      collapsed: false,
      predefinedData: {
        '/': []
      },
      processors: [{
        processItem: function processItem(item, options) {
          item.value.ownerResourceId = options.id;
          item.value.ownerResourceParameterName = item.value.id;
          item.value.resourceType = repositoryResourceTypes.INPUT_CONTROL;
          return item;
        }
      }, {
        processItem: cssClassItemProcessor
      }, {
        processItem: i18nItemProcessor
      }, {
        processItem: function processItem(item, options) {
          item.value.visible || (item.dragDisabled = item.cssClass += '-invisible');
          return item;
        }
      }],
      getDataArray: function getDataArray(data, status, xhr) {
        return _.clone(data);
      }
    });
    this.reportParametersTree.defaultDataLayer.obtainData = obtainParametersDataFromCache;
    this.newContentTree = ContentPanelTree.instance({
      itemsTemplate: sidebarTreeLeafTemplate,
      dataUriTemplate: this.model.contextPath + '/rest_v2/settings/dashboardSettings',
      selection: {
        allowed: true,
        multiple: false
      },
      listItemHeight: LIST_ITEM_HEIGHT,
      lazyLoad: false,
      rootless: true,
      processors: [{
        processItem: i18nItemProcessor
      }, {
        processItem: function processItem(item) {
          item.cssClass = 'dashboard-newContent-' + item.value.id;
          return item;
        }
      }],
      getDataArray: function getDataArray(data) {
        return _.map(data.newItemsRegistry, function (item) {
          item.label = i18n[item.label] ? i18n[item.label] : item.label;
          item.description = i18n[item.description] ? i18n[item.description] : item.description;
          return item;
        });
      }
    });
    var existingContentTreeViewProcessors = [{
      processItem: function processItem(item) {
        item._node = item.value.resourceType === repositoryResourceTypes.FOLDER;
        return item;
      }
    }, {
      processItem: function processItem(item) {
        if (!(item.value.resourceType === 'folder' && item.value._links.content === '')) {
          delete item.value._links;
          return item;
        }
      }
    }, {
      processItem: cssClassItemProcessor
    }, {
      processItem: i18nItemProcessor
    }];
    this.existingContentTreeView = Tree.use(TooltipTreePlugin, tooltipOptions).use(InfiniteScrollPlugin).use(DragTreePlugin, {
      onDragStart: _.bind(options.strategy.onDashletDragStart, options.strategy),
      onDrag: _.bind(options.strategy.onDashletDrag, options.strategy),
      onDragStop: _.bind(options.strategy.onDashletDragStop, options.strategy)
    }).use(SearchTreePlugin, {
      additionalParams: {
        type: [repositoryResourceTypes.REPORT_UNIT, repositoryResourceTypes.ADHOC_DATA_VIEW]
      }
    }).create().instance(_.extend({}, TREE_OPTIONS[VIEW_TYPES.FOLDERS], {
      itemsTemplate: sidebarTreeLeafTemplate,
      listItemHeight: LIST_ITEM_HEIGHT,
      selection: {
        allowed: true,
        multiple: false
      },
      rootless: true,
      collapsed: true,
      lazyLoad: true,
      additionalCssClasses: 'folders',
      getDataUri: resourcesTreeGetDataUriFnUtil({
        getFolderUri: function getFolderUri(id) {
          return id === "@fakeRoot" ? "" : id;
        },
        forceFullPage: true,
        contextPath: options.model.contextPath,
        containerType: repositoryResourceTypes.FOLDER,
        exclude: "/temp"
      }),
      levelDataId: 'uri',
      customDataLayers: {
        //workaround for correct viewing of '/public' and '/' folder labels
        '/': _.extend(new TreeDataLayer({
          dataUriTemplate: options.contextPath + '/flow.html?_flowId=searchFlow&method=getNode&provider=repositoryExplorerTreeFoldersProvider&uri=/&depth=1',
          processors: existingContentTreeViewProcessors,
          getDataArray: function getDataArray(data) {
            data = extractRootLevelDataFromHtmlResponse(data);

            var publicFolder = _.find(data.children, function (item) {
              return item.uri === '/public';
            }),
                res = [{
              id: '@fakeRoot',
              label: data.label,
              uri: '/',
              resourceType: 'folder',
              _links: {
                content: '@fakeContentLink'
              }
            }];

            if (publicFolder) {
              res.push({
                id: '/public',
                label: publicFolder.label,
                uri: '/public',
                resourceType: 'folder',
                _links: {
                  content: '@fakeContentLink'
                }
              });
            }

            return res;
          }
        }), {
          accept: 'text/html',
          dataType: 'text'
        })
      },
      processors: [{
        processItem: function processItem(item) {
          if (item.value.uri !== '/public') {
            return item;
          }
        }
      }].concat(existingContentTreeViewProcessors),
      getDataArray: function getDataArray(data, status, xhr) {
        return data && data[repositoryResourceTypes.RESOURCE_LOOKUP] ? data[repositoryResourceTypes.RESOURCE_LOOKUP] : [];
      },
      getDataSize: function getDataSize(data, status, xhr) {
        return +xhr.getResponseHeader('Total-Count');
      }
    }));
    this.libraryView = ExistingContentPanelTree.instance(_.extend({}, TREE_OPTIONS[VIEW_TYPES.LIST], {
      itemsTemplate: sidebarTreeLeafTemplate,
      listItemHeight: LIST_ITEM_HEIGHT,
      selection: {
        allowed: true,
        multiple: false
      },
      rootless: true,
      dataUriTemplate: options.model.contextPath + '/rest_v2/resources?offset={{- offset }}&limit={{- limit }}&forceTotalCount=true&excludeFolder=/temp&forceFullPage=true',
      levelDataId: 'uri',
      processors: [{
        processItem: cssClassItemProcessor
      }, {
        processItem: i18nItemProcessor
      }],
      getDataArray: function getDataArray(data, status, xhr) {
        return data && data[repositoryResourceTypes.RESOURCE_LOOKUP] ? data[repositoryResourceTypes.RESOURCE_LOOKUP] : [];
      },
      getDataSize: function getDataSize(data, status, xhr) {
        return +xhr.getResponseHeader('Total-Count');
      }
    }));
    this.libraryPanel = new Panel({
      title: i18n['dashboard.sidebar.existing.content.library'],
      traits: [collapsiblePanelTrait, menuPanelTrait, tabbedPanelTrait, resizablePanelTrait],
      collapsed: false,
      handles: 's',
      additionalCssClasses: 'libraryPanel',
      resizableEl: '.subcontainer',
      overflow: 'hidden',
      tabs: [{
        action: VIEW_TYPES.LIST,
        content: this.libraryView,
        primary: true,
        label: VIEW_TYPES.LIST,
        hidden: true
      }, {
        action: VIEW_TYPES.FOLDERS,
        content: this.existingContentTreeView,
        label: VIEW_TYPES.FOLDERS,
        hidden: true
      }],
      menuOptionSelectable: true,
      menuPadding: {
        top: -11,
        left: 6
      },
      menuToggleMode: true,
      menuOptions: [{
        label: i18n['dashboard.sidebar.existing.content.list.view'],
        groupId: GROUP_IDS.VIEW,
        action: VIEW_TYPES.LIST,
        'default': true
      }, {
        label: i18n['dashboard.sidebar.existing.content.folder.view'],
        groupId: GROUP_IDS.VIEW,
        action: VIEW_TYPES.FOLDERS
      }, {
        label: i18n['dashboard.sidebar.existing.content.all'],
        groupId: GROUP_IDS.VISUALIZATION,
        action: 'all',
        'default': true
      }, {
        label: i18n['dashboard.sidebar.existing.content.reports'],
        groupId: GROUP_IDS.VISUALIZATION,
        action: 'report'
      }, {
        label: i18n['dashboard.sidebar.existing.content.adhoc.views'],
        groupId: GROUP_IDS.VISUALIZATION,
        action: 'adhoc'
      }],
      onCollapseControlPressed: function onCollapseControlPressed(e) {
        self._resetHeights();

        self.accordion.toggle(self.libraryPanel);
      }
    });
    this.newContentPanel = new Panel({
      title: i18n['dashboard.sidebar.new.content'],
      traits: [collapsiblePanelTrait, resizablePanelTrait],
      collapsed: false,
      fixedHeight: true,
      content: this.newContentTree,
      handles: 's',
      additionalCssClasses: 'newContentPanel',
      resizableEl: '.subcontainer',
      minHeight: dashboardSettings.PANELS_MIN_HEIGHT,
      onCollapseControlPressed: function onCollapseControlPressed(e) {
        self._resetHeights();

        self.accordion.toggle(self.newContentPanel);
      }
    });
    this.reportParametersContentPanel = new Panel({
      title: i18n['dashboard.sidebar.report.parameters'],
      traits: [collapsiblePanelTrait],
      collapsed: true,
      additionalCssClasses: 'reportParametersContentPanel',
      silent: false,
      content: this.reportParametersTree,
      onCollapseControlPressed: function onCollapseControlPressed(e) {
        self._resetHeights();

        self.accordion.toggle(self.reportParametersContentPanel);
      }
    });
    this.accordion = new Accordion({
      container: this.$('> .content > .body'),
      panels: [this.newContentPanel, this.libraryPanel, this.reportParametersContentPanel],
      allowMultiplePanelsOpen: true
    });
    this.windowHeight = $(window).height();
    var newContentFlatListLoaded = false,
        libraryLoaded = false;

    function onAllExpandedTreesLoad() {
      if (libraryLoaded && newContentFlatListLoaded) {
        this.accordion.fit();
      }
    }

    this.listenToOnce(this.newContentTree.getLevel('/'), 'ready', function () {
      newContentFlatListLoaded = true;
      onAllExpandedTreesLoad.call(this);
      this.newContentPanelDefaultHeight = this.newContentPanel.$el.outerHeight(true);
    }, this);
    this.listenToOnce(this.libraryView.getLevel('/'), 'ready', function () {
      libraryLoaded = true;
      onAllExpandedTreesLoad.call(this);
    }, this);
    this.listenTo(this.accordion, 'fit', _.bind(onAccordionFit, this));
    this.listenTo(this.model.foundations, 'addComponent', function (componentModel, foundationModel) {
      foundationModel === self.model.currentFoundation && addReportParameterUI.call(self, componentModel);
    });
    this.listenTo(this.model.foundations, 'removeComponent', function (componentModel, foundationModel) {
      foundationModel === self.model.currentFoundation && removeReportParameterUI.call(self, componentModel);
    });
    this.listenTo(this.model.foundations, 'editComponent', function (componentModel, foundationModel) {
      foundationModel === self.model.currentFoundation && editReportParameterUI.call(self, componentModel);
    });
    this.listenTo(this.libraryPanel, 'option:all', _.bind(function (view, model) {
      this.libraryView.clearCache();

      this._filterByResource();
    }, this));
    this.listenTo(this.libraryPanel, 'option:report', _.bind(function (view, model) {
      this.libraryView.clearCache();

      this._filterByResource({
        type: [repositoryResourceTypes.REPORT_UNIT]
      }, 'report');
    }, this));
    this.listenTo(this.libraryPanel, 'option:adhoc', _.bind(function (view, model) {
      this.libraryView.clearCache();

      this._filterByResource({
        type: [repositoryResourceTypes.ADHOC_DATA_VIEW]
      }, 'adhoc');
    }, this));
    this.listenTo(this.libraryPanel, 'option:folders', _.bind(function (view, model) {
      this.libraryPanel.openTab(VIEW_TYPES.FOLDERS);

      this._filterByResource(this.activeResourceFilterOptions);

      this.accordion.fit();
    }, this));
    this.listenTo(this.libraryPanel, 'option:list', _.bind(function (view, model) {
      this.libraryPanel.openTab(VIEW_TYPES.LIST);

      this._filterByResource(this.activeResourceFilterOptions);

      this.accordion.fit();
    }, this));
    this.listenTo(this.libraryPanel.tabs[VIEW_TYPES.FOLDERS].searchForm, 'search', _.bind(function (context) {
      var listViewSearchForm = this.libraryPanel.tabs[VIEW_TYPES.LIST].searchForm,
          actions = [{
        action: VIEW_TYPES.LIST,
        groupId: GROUP_IDS.VIEW
      }];
      this.activeVisualization && actions.push({
        action: this.activeVisualization,
        groupId: 'visualization'
      });
      listViewSearchForm.setSearchString(context.searchString);
      listViewSearchForm.search(context);
      this.libraryPanel.filterMenu.resetSelection(actions, true);
    }, this));
    this.listenTo(this.libraryPanel.tabs[VIEW_TYPES.LIST].searchForm, 'clear', _.bind(function () {
      this.libraryPanel.tabs[VIEW_TYPES.FOLDERS].searchForm.clear();
    }, this));
    this.listenTo(this.newContentPanel, 'resize', _.bind(this._onPanelResize, this, this.newContentPanel));
    this.listenTo(this.libraryPanel, 'resize', _.bind(this._onPanelResize, this, this.libraryPanel));

    _.bindAll(this, '_onWindowResize');

    $(window).on('resize', this._onWindowResize);
  },
  _onPanelResize: function _onPanelResize(panel) {
    var isLibraryPanel = _.isEqual(panel, this.libraryPanel);

    this.reportParametersContentPanel.fixedHeight = !isLibraryPanel;
    this.libraryPanel.fixedHeight = isLibraryPanel;
    this.accordion.fit();
  },
  _filterByResource: function _filterByResource(options, visualization) {
    visualization && this._setActiveVisualization(visualization);

    if (!_.isEqual(options, this.activeResourceFilterOptions) || this.selectedTabId !== this.libraryPanel.selectedTab) {
      this.selectedTabId = this.libraryPanel.selectedTab;
      this.selectedTab = this.libraryPanel.tabs[this.selectedTabId];
      this.activeResourceFilterOptions = options || {};
      this.selectedTab.searchForm.search(this.activeResourceFilterOptions);
    }
  },
  _setActiveVisualization: function _setActiveVisualization(visualization) {
    this.activeVisualization = visualization;
  },
  _resetHeights: function _resetHeights() {
    this.libraryPanel.fixedHeight = false;
    this.reportParametersContentPanel.fixedHeight = false;
    this.newContentPanel.setHeight(this.newContentPanelDefaultHeight);
  },
  _onWindowResize: function _onWindowResize(e) {
    var currentWindowHeight = $(window).height(); //hack which prevent jquery ui resize event from bubbling to window.
    //See http://bugs.jquery.com/ticket/9841
    //hack which prevent jquery ui resize event from bubbling to window.
    //See http://bugs.jquery.com/ticket/9841

    if (!e.target.tagName && this.windowHeight !== currentWindowHeight) {
      this.windowHeight = currentWindowHeight;

      this._resetHeights();

      this.resizeTimer && clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(_.bind(function () {
        this.accordion.fit();
      }, this), 100);
    }
  },
  render: function render() {
    this.$('> .content > .body').append(this.newContentPanel.$el).append(this.libraryPanel.$el).append(this.reportParametersContentPanel.$el);
    this.reportParametersContentPanel.content.expand('/', {
      depth: 0,
      silent: true
    });
    return this;
  },
  remove: function remove() {
    $(window).off('resize', this._onWindowResize);
    this.newContentPanel.remove();
    this.libraryPanel.remove();
    this.reportParametersContentPanel.remove();
    this.filterContextMenu.remove();
    Backbone.View.prototype.remove.apply(this, arguments);
  }
});

function i18nItemProcessor(item) {
  item.i18n = i18n2;
  return item;
}

function cssClassItemProcessor(item) {
  item.cssClass = 'dashboard-existingContent-';

  switch (item.value.resourceType) {
    case repositoryResourceTypes.REPORT_UNIT:
      item.cssClass += 'report';
      break;

    case repositoryResourceTypes.ADHOC_DATA_VIEW:
      item.cssClass += 'adhoc';
      break;

    case repositoryResourceTypes.INPUT_CONTROL:
      item.cssClass += 'filter';
      break;

    default:
      break;
  }

  return item;
}

function onAccordionFit() {
  var panel = this.libraryPanel,
      panelContentMaxHeight = panel.$('> .subcontainer').height(),
      searchBoxHeight = panel.$('.searchLockup').filter(':visible').outerHeight(true);
  panel.$('> .subcontainer').css('overflow', 'hidden');
  var hideRootEl = panel.$('.j-view-port-chunk').closest('.hideRoot'),
      sListEl = panel.$('.j-view-port-chunk').parent();

  if (panel.selectedTab === VIEW_TYPES.FOLDERS) {
    //In case of folder view some of the parent elements have to be made scrollable
    //so folders will not re-render on scroll and thus will not collapse
    sListEl.css({
      'max-height': ''
    });
    hideRootEl.css({
      'max-height': panelContentMaxHeight - searchBoxHeight + 'px',
      overflow: 'auto'
    });
  } else {
    //in case of list view underlying scalable list element should be made scrollable
    //in order to make autoloading works
    hideRootEl.css({
      'max-height': ''
    });
    sListEl.css({
      'max-height': panelContentMaxHeight - searchBoxHeight + 'px',
      overflow: 'auto'
    }); //also we have to call constraint recalculation for scalable list
    //every time parent container size was changed
    //also we have to call constraint recalculation for scalable list
    //every time parent container size was changed

    var self = this;

    _.defer(function () {
      self.libraryView.recalcConstraints();
      self.libraryView.getLevel('/').fetch({
        force: true,
        keepPosition: true
      });
    });
  }
}

function addReportParameterUI(componentModel) {
  if (_.contains([dashboardComponentTypes.ADHOC_VIEW, dashboardComponentTypes.REPORT, dashboardComponentTypes.CROSSTAB, dashboardComponentTypes.CHART, dashboardComponentTypes.TABLE], componentModel.get('type')) && _.indexOf(this.addedParameterContainers, componentModel.resource.resource.get('uri')) === -1) {
    this.reportParametersContentPanel.content.addItem('/', {
      id: componentModel.resource.resource.get('uri'),
      i18n: i18n,
      cssClass: 'dashboard-existingContent-' + (componentModel.get('type') === dashboardComponentTypes.ADHOC_VIEW ? 'adhoc' : 'report'),
      value: {
        label: componentModel.get('name'),
        uri: componentModel.resource.resource.get('uri')
      },
      _node: true
    });
    var level = this.reportParametersTree.getLevel(componentModel.resource.resource.get('uri'));
    level.hasItems() && this.accordion.expand(this.reportParametersContentPanel);
    this.listenToOnce(level, 'ready', function (treeLevel) {
      treeLevel.hasItems() && this.accordion.expand(this.reportParametersContentPanel);
    }, this);
    this.addedParameterContainers.push(componentModel.resource.resource.get('uri'));
  }
}

function editReportParameterUI(componentModel) {
  var level = this.reportParametersContentPanel.content.getLevel(componentModel.resource.resource.get('uri')); // in case that resource was created, dashboard was saved and resource edited
  // in the tree it still has old id, while uri is new, so look at resource id, which is the same as old uri
  // in case that resource was created, dashboard was saved and resource edited
  // in the tree it still has old id, while uri is new, so look at resource id, which is the same as old uri

  level || (level = this.reportParametersContentPanel.content.getLevel(componentModel.resource.id));
  this.listenToOnce(level, 'ready', function () {
    var show = false,
        items = this.reportParametersContentPanel.content.getLevel('/').items;

    for (var key in items) {
      show |= items[key].hasItems();
    }

    if (show) {
      this.accordion.expand(this.reportParametersContentPanel);
    } else {
      this.accordion.collapse(this.reportParametersContentPanel);
    }
  }, this);
  level.refresh();
}

function removeReportParameterUI(componentModel) {
  if (!componentModel.resource) {
    return;
  }

  var reportIndex = _.indexOf(this.addedParameterContainers, componentModel.resource.resource.get('uri')),
      self = this; // fixes cases when resource URI changes after saving AdHoc View inside Dashboard
  // fixes cases when resource URI changes after saving AdHoc View inside Dashboard


  if (reportIndex === -1) {
    reportIndex = _.indexOf(this.addedParameterContainers, componentModel.get('resource'));
  }

  if (reportIndex > -1) {
    var componentWithSameReport = this.model.currentFoundation.components.findWhere({
      resource: componentModel.resource.resource.get('uri')
    }); // fixes cases when resource URI changes after saving AdHoc View inside Dashboard
    // fixes cases when resource URI changes after saving AdHoc View inside Dashboard

    if (!componentWithSameReport) {
      componentWithSameReport = this.model.currentFoundation.components.findWhere({
        resource: componentModel.get('resource')
      });
    }

    if (!componentWithSameReport) {
      this.addedParameterContainers.splice(reportIndex, 1);

      if (!this.addedParameterContainers.length || _.all(this.addedParameterContainers, function (reportUri) {
        return !self.reportParametersTree.getLevel(reportUri).hasItems();
      })) {
        this.accordion.collapse(this.reportParametersContentPanel);
      }

      var treeLevel = this.reportParametersContentPanel.content.getLevel(componentModel.resource.resource.get('uri'));
      treeLevel && treeLevel.remove();
    }
  }
}

function obtainParametersDataFromCache(options) {
  var result = new $.Deferred(),
      self = this;

  if (this.predefinedData && this.predefinedData[options.id]) {
    result.resolve({
      total: this.predefinedData[options.id].length,
      data: this.predefinedData[options.id]
    });
  } else {
    ParametersCache.getReportControls(options.id).done(function () {
      result.resolve({
        total: self.getDataSize.apply(self, arguments),
        data: self._process.call(self, self.getDataArray.apply(self, arguments), options)
      });
    }).fail(_.bind(result.reject, result));
  }

  return result;
}

});