define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var jQuery = require('jquery');

var Dialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/Dialog");

var AlertDialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/AlertDialog");

var Tree = require("runtime_dependencies/js-sdk/src/common/component/tree/Tree");

var TreeDataLayer = require("runtime_dependencies/js-sdk/src/common/component/tree/TreeDataLayer");

var tabbedPanelTrait = require("runtime_dependencies/js-sdk/src/common/component/panel/trait/tabbedPanelTrait");

var TooltipTreePlugin = require("runtime_dependencies/js-sdk/src/common/component/tree/plugin/TooltipPlugin");

var SearchTreePlugin = require("runtime_dependencies/js-sdk/src/common/component/tree/plugin/SearchPlugin");

var InfiniteScrollPlugin = require("runtime_dependencies/js-sdk/src/common/component/tree/plugin/InfiniteScrollPlugin");

var NoSearchResultsMessagePlugin = require("runtime_dependencies/js-sdk/src/common/component/tree/plugin/NoSearchResultsMessagePlugin");

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

var i18n = require("bundle!adhoc_messages");

var commonMessagesBundle = require("bundle!CommonBundle");

var browserDetection = require("runtime_dependencies/js-sdk/src/common/util/browserDetection");

var datachooserDialogTemplate = require("text!../template/datachooserDialogTemplate.htm");

var dataChooserTreeLeafTemplate = require("text!../template/dataChooserTreeLeafTemplate.htm");

var sidebarTreeLeafTooltipTemplate = require("text!../template/tooltip/sidebarTreeLeafTooltipTemplate.htm");

var tabsOptionsTemplate = require("text!../template/datachooserTabTemplate.htm");

var settings = require("settings!treeComponent");

var resourcesTreeGetDataUriFnUtil = require("runtime_dependencies/bi-repository/src/bi/repository/util/resourcesTreeGetDataUriFnUtil");

var extractRootLevelDataFromHtmlResponse = require("runtime_dependencies/bi-repository/src/bi/repository/util/extractRootLevelDataFromHtmlResponse");

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var contextPath = jrsConfigs.contextPath;
var ADHOC_REPORT_TYPE_PARAM_NAME = 'reportType';
var LIST_ITEM_HEIGHT = 26;
var DECORATE_PARAM_NAME = 'decorate';
var IS_EMBEDDED_DESIGNER_PARAM_NAME = 'embeddedDesigner';
var LIST_TAB = 'list';
var TREE_BUFFER_SIZE = parseInt(settings.treeLevelLimit, 10);
var COMMON_TYPES = [repositoryResourceTypes.DOMAIN_TOPIC, repositoryResourceTypes.TOPIC, repositoryResourceTypes.SEMANTIC_LAYER_DATA_SOURCE];
var OLAP_TYPES = [repositoryResourceTypes.SECURE_MONDRIAN_CONNECTION, repositoryResourceTypes.MONDRIAN_CONNECTION, repositoryResourceTypes.XMLA_CONNECTION];
var LIST_VIEW_RESOURCES_GET_DATA_URI_FN = resourcesTreeGetDataUriFnUtil({
  getFolderUri: function getFolderUri(id) {
    return id === "@fakeRoot" ? "" : id;
  },
  contextPath: contextPath,
  recursive: true,
  forceTotalCount: true,
  forceFullPage: true
});
var OLAP_CONNECTIONS_TYPES = [repositoryResourceTypes.MONDRIAN_CONNECTION, repositoryResourceTypes.SECURE_MONDRIAN_CONNECTION, repositoryResourceTypes.XMLA_CONNECTION];
module.exports = Dialog.extend({
  events: {
    'resize': 'onResizeHeight'
  },
  onResizeHeight: function onResizeHeight() {
    this.$contentContainer.height(this.$el.height() - this._resizableContainerShiftHeight);
    this.listTreeView.rootLevel.list.$el.height(this.$el.height() - this._resizableContainerShiftHeight - 6);
    this.hierarhicalTreeView.rootLevel.list.$el.css('height', '100%');
  },
  constructor: function constructor(options) {
    options || (options = {});
    this._dfdRenderSerachFormTo = jQuery.Deferred();

    var reportType = this._getParameterByName(ADHOC_REPORT_TYPE_PARAM_NAME);

    reportType = reportType || 'crosstab';
    this.reportType = reportType === 'chart' ? 'ichart' : reportType;
    this.decorate = this._getParameterByName(DECORATE_PARAM_NAME) || 'yes';
    this.isEmbeddedDesigner = this._getParameterByName(IS_EMBEDDED_DESIGNER_PARAM_NAME);
    var treeViewResourcesGetDataUriFn,
        treeViewResourcesType = options.resourcesTypes;

    if (!treeViewResourcesType) {
      if (this.reportType === "table") {
        treeViewResourcesType = COMMON_TYPES;
      } else {
        treeViewResourcesType = COMMON_TYPES.concat(OLAP_TYPES);
      }
    }

    treeViewResourcesGetDataUriFn = resourcesTreeGetDataUriFnUtil({
      getFolderUri: function getFolderUri(id) {
        return id === "@fakeRoot" ? "" : id;
      },
      contextPath: contextPath,
      recursive: false,
      type: treeViewResourcesType,
      containerType: repositoryResourceTypes.FOLDER,
      forceTotalCount: true,
      forceFullPage: true
    });
    var tooltipOptions = {
      attachTo: this.$el,
      i18n: i18n,
      contentTemplate: sidebarTreeLeafTooltipTemplate
    };
    var ResourcesTree = Tree.use(TooltipTreePlugin, tooltipOptions).use(InfiniteScrollPlugin).create();
    var resourceTypes = options.resourcesTypes;

    if (!resourceTypes) {
      resourceTypes = _.union([repositoryResourceTypes.TOPIC, repositoryResourceTypes.DOMAIN_TOPIC, repositoryResourceTypes.SEMANTIC_LAYER_DATA_SOURCE], OLAP_CONNECTIONS_TYPES);
    }

    var ResourcesTreeWithSearch = Tree.use(TooltipTreePlugin, tooltipOptions).use(NoSearchResultsMessagePlugin).use(SearchTreePlugin, {
      additionalParams: {
        type: this.reportType === 'table' ? _.first(resourceTypes, 3) : resourceTypes
      },
      dfdRenderTo: this._dfdRenderSerachFormTo
    }).create();
    var processors = {
      treeNodeProcessor: {
        processItem: function processItem(item) {
          item._node = _.contains(_.union([repositoryResourceTypes.FOLDER], OLAP_CONNECTIONS_TYPES), item.value.resourceType);
          return item;
        }
      },
      i18nItemProcessor: {
        processItem: function processItem(item) {
          item.i18n = commonMessagesBundle;
          return item;
        }
      },
      filterPublicFolderProcessor: {
        processItem: function processItem(item) {
          if (item.value.uri !== '/public') {
            return item;
          }
        }
      },
      filterTempFolderProcessor: {
        processItem: function processItem(item) {
          if (!item.value.uri.match(/\/temp\//) && !item.value.uri.match(/\/temp$/)) {
            return item;
          }
        }
      },
      filterEmptyFoldersProcessor: {
        processItem: function processItem(item) {
          if (!(item.value.resourceType === 'folder' && item.value._links.content === '')) {
            return item;
          }
        }
      },
      cssClassItemProcessor: {
        processItem: cssClassItemProcessor
      }
    };
    var olapDataLayer = new TreeDataLayer({
      requestType: 'POST',
      dataUriTemplate: contextPath + '/rest_v2/connections',
      processors: [processors.i18nItemProcessor, processors.cssClassItemProcessor],
      levelDataId: 'uri',
      getDataArray: function getDataArray(data, status, xhr) {
        return data && data[repositoryResourceTypes.RESOURCE_LOOKUP] ? data[repositoryResourceTypes.RESOURCE_LOOKUP] : [];
      }
    });

    var customizedGetDataLayerFunc = function customizedGetDataLayerFunc(level) {
      var isOlapResource = _.contains(OLAP_CONNECTIONS_TYPES, level.resource.resourceType);

      if (!isOlapResource) {
        return this.customDataLayers && this.customDataLayers[level.id] ? this.customDataLayers[level.id] : this.defaultDataLayer;
      } else {
        var olapDataLayer = _.clone(this.customDataLayers['olapDataLayer']);

        _.extend(olapDataLayer, {
          accept: 'application/repository.' + level.resource.resourceType + '.metadata+json',
          contentType: 'application/repository.' + level.resource.resourceType + '+json',
          data: JSON.stringify(level.resource)
        });

        return olapDataLayer;
      }
    };

    this.hierarhicalTreeView = ResourcesTree.instance({
      itemsTemplate: dataChooserTreeLeafTemplate,
      listItemHeight: LIST_ITEM_HEIGHT,
      selection: {
        allowed: true,
        multiple: false
      },
      rootless: true,
      collapsed: true,
      lazyLoad: true,
      bufferSize: TREE_BUFFER_SIZE,
      additionalCssClasses: "folders",
      getDataUri: treeViewResourcesGetDataUriFn,
      levelDataId: "uri",
      customDataLayers: {
        //workaround for correct viewing of '/public' folder label
        '/': _.extend(new TreeDataLayer({
          dataUriTemplate: contextPath + '/flow.html?_flowId=searchFlow&method=getNode&provider=repositoryExplorerTreeFoldersProvider&uri=/&depth=1',
          processors: _.chain(processors).omit('filterPublicFolderProcessor').values().value(),
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
        }),
        'olapDataLayer': olapDataLayer
      },
      processors: _.values(processors),
      getDataArray: function getDataArray(data, status, xhr) {
        return data && data[repositoryResourceTypes.RESOURCE_LOOKUP] ? data[repositoryResourceTypes.RESOURCE_LOOKUP] : [];
      },
      getDataSize: function getDataSize(data, status, xhr) {
        return +xhr.getResponseHeader('Total-Count');
      },
      getDataLayer: customizedGetDataLayerFunc
    });
    this.listTreeView = ResourcesTreeWithSearch.instance({
      rootLevelHeight: _.bind(this.getContentHeight, this),
      itemsTemplate: dataChooserTreeLeafTemplate,
      listItemHeight: LIST_ITEM_HEIGHT,
      selection: {
        allowed: true,
        multiple: false
      },
      rootless: true,
      collapsed: true,
      lazyLoad: true,
      getDataUri: LIST_VIEW_RESOURCES_GET_DATA_URI_FN,
      levelDataId: "uri",
      cache: {
        searchKey: 'searchString',
        pageSize: 100
      },
      processors: [{
        processItem: function processItem(item) {
          item._node = _.contains(OLAP_CONNECTIONS_TYPES, item.value.resourceType);
          return item;
        }
      }, processors.i18nItemProcessor, processors.cssClassItemProcessor, processors.filterTempFolderProcessor],
      customDataLayers: {
        'olapDataLayer': olapDataLayer
      },
      getDataLayer: customizedGetDataLayerFunc,
      getDataArray: function getDataArray(data, status, xhr) {
        return data && data[repositoryResourceTypes.RESOURCE_LOOKUP] ? data[repositoryResourceTypes.RESOURCE_LOOKUP] : [];
      },
      getDataSize: function getDataSize(data, status, xhr) {
        return +xhr.getResponseHeader('Total-Count');
      }
    });
    Dialog.prototype.constructor.call(this, {
      template: datachooserDialogTemplate,
      modal: true,
      resizable: true,
      additionalCssClasses: 'sourceDialogNew',
      title: i18n['ADH_108_DATA_CHOOSER_DIALOG_TITLE'],
      traits: [tabbedPanelTrait],
      tabHeaderContainerSelector: '.tabHeaderContainer',
      tabContainerClass: 'tabContainer control groupBox treeBox',
      optionTemplate: tabsOptionsTemplate,
      toggleClass: 'down',
      tabs: [{
        label: i18n['ADH_108_DATA_CHOOSER_FOLDERS_TAB'],
        action: 'tree',
        content: this.hierarhicalTreeView,
        exposeAction: true,
        additionalCssClasses: 'action square small',
        i18n: i18n
      }, {
        label: i18n['ADH_108_DATA_CHOOSER_LIST_TAB'],
        action: 'list',
        content: this.listTreeView,
        exposeAction: true,
        additionalCssClasses: 'action square small',
        i18n: i18n
      }],
      buttons: [{
        label: i18n['ADH_016_BUTTON_OK'],
        action: 'apply',
        primary: true
      }, {
        label: i18n['ADH_010_BUTTON_CANCEL'],
        action: 'cancel',
        primary: false
      }]
    });
    this.disableButton('apply');
    this.on('button:apply', _.bind(this._onSelectDataDialogOkButtonClick, this));
    this.on('button:cancel', _.bind(this._onSelectDataDialogCancelButtonClick, this));
  },
  initialize: function initialize(options) {
    var selectionListener = function selectionListener(selection) {
      var okButton = _.find(this.buttons.options, function (option) {
        return option.model.attributes.action === 'apply';
      }).$el;

      var itemSelected = selection && _.isArray(selection) && selection[0];
      var resourceUri = itemSelected ? selection[0].uri : undefined;
      var resourceType = itemSelected ? selection[0].resourceType : undefined;

      if (!(itemSelected || resourceUri || resourceType)) {
        this.disableButton('apply');
        this.$('.itemDescription').empty();
        return;
      }

      resourceType !== repositoryResourceTypes.FOLDER ? this.$('.itemDescription').text(itemSelected.description || '') : this.$('.itemDescription').empty();
      resourceType === repositoryResourceTypes.SEMANTIC_LAYER_DATA_SOURCE ? okButton.find('.wrap').text(i18n['ADH_108_DATA_CHOOSER_DOMAIN_LABEL']) : okButton.find('.wrap').text(i18n['ADH_016_BUTTON_OK']);

      if (_.contains(_.union([repositoryResourceTypes.FOLDER], OLAP_CONNECTIONS_TYPES), resourceType)) {
        delete this.resourceData;
        this.disableButton('apply');
        return;
      }

      this.resourceData = {};

      if (resourceType === repositoryResourceTypes.OLAP_CUBE) {
        this.resourceData.resourceUri = resourceUri.substring(0, resourceUri.lastIndexOf('/'));
        this.resourceData.cube = resourceUri.substring(resourceUri.lastIndexOf('/') + 1);
        this.resourceData.reportType = 'olap_' + this.reportType;
      } else {
        this.resourceData.resourceUri = resourceUri;
        this.resourceData.reportType = this.reportType;
      }

      this.resourceData.event = this._getAdHocFlowEvent(resourceType);
      this.resourceData.flowExecutionKey = window.flowExecutionKey;
      this.enableButton('apply');
    };

    this.errorDialog = new AlertDialog();
    this.listenTo(this.hierarhicalTreeView, 'selection:change', selectionListener);
    this.listenTo(this.listTreeView, 'selection:change', selectionListener);
    this.listenTo(this.hierarhicalTreeView, 'levelRenderError', _.bind(this._onLevelRenderError, this.errorDialog));
    this.listenTo(this.listTreeView, 'levelRenderError', _.bind(this._onLevelRenderError, this.errorDialog));
    this.listenTo(this.hierarhicalTreeView, 'item:dblclick', this._onSelectDataDialogOkButtonClick);
    this.listenTo(this.listTreeView, 'item:dblclick', this._onSelectDataDialogOkButtonClick);
    this.listenTo(this.listTreeView.rootLevel, 'ready', this.onResizeHeight, this);
    this.listenTo(this.hierarhicalTreeView.rootLevel, 'ready', this.onResizeHeight, this);
    this.listenTo(this.listTreeView.searchForm, 'search', this._onSearch);
    this.listenTo(this.listTreeView.searchForm, 'clear', this._resetItemSelection);
    this.on('tab:tree tab:list', this._resetItemSelection, this);
    Dialog.prototype.initialize.apply(this, arguments);
  },
  getContentHeight: function getContentHeight() {
    return this.$el.height() - this._resizableContainerShiftHeight;
  },
  render: function render() {
    Dialog.prototype.render.apply(this, arguments); // connect search form to dialog header
    // connect search form to dialog header
    // connect search form to dialog header
    // connect search form to dialog header

    this._dfdRenderSerachFormTo.resolve(this.$tabHeaderContainer);

    this.openTab(LIST_TAB);
    return this;
  },
  open: function open() {
    var self = this;
    self._resizableContainerShiftHeight = 6;
    Dialog.prototype.open.apply(this, arguments);

    var setTabContainerStyles = _.bind(function () {
      this.$contentContainer.find('.tabContainer').css({
        'height': 'inherit',
        'overflow-y': 'auto'
      });
    }, this);
    /*
    IE8, IE9 compatibility workaround
    */

    /*
            IE8, IE9 compatibility workaround
         */

    /*
            IE8, IE9 compatibility workaround
         */

    /*
            IE8, IE9 compatibility workaround
         */


    if (browserDetection.isIE8() || browserDetection.isIE9()) {
      setTimeout(setTabContainerStyles, 1);
    } else {
      setTabContainerStyles();
    }

    this.$el.children().not('.subcontainer').not('.ui-resizable-e').not('.ui-resizable-se').each(function () {
      self._resizableContainerShiftHeight += self.$(this).outerHeight(true);
    });
    this.$contentContainer.height(this.$el.height() - this._resizableContainerShiftHeight);
  },
  close: function close() {
    if (this.hierarhicalTreeView) {
      this.hierarhicalTreeView.collapse('@fakeRoot', {
        silent: true
      });
      this.hierarhicalTreeView.collapse('/public', {
        silent: true
      });
      this.hierarhicalTreeView.resetSelection();
    }

    Dialog.prototype.close.apply(this, arguments);
  },
  _onSearch: function _onSearch() {
    this.openTab(LIST_TAB);
    this.disableButton('apply');
  },
  _resetItemSelection: function _resetItemSelection() {
    this.hierarhicalTreeView.resetSelection();
    this.listTreeView.resetSelection();
    this.$('.itemDescription').empty();
  },
  _getAdHocFlowEvent: function _getAdHocFlowEvent(resourceType) {
    var adHocFlowEvent = '';

    if (resourceType == repositoryResourceTypes.REPORT_UNIT || resourceType == repositoryResourceTypes.DOMAIN_TOPIC) {
      adHocFlowEvent = 'startAdHocWithTopic';
    } else if (resourceType == repositoryResourceTypes.SEMANTIC_LAYER_DATA_SOURCE) {
      adHocFlowEvent = 'startQueryBuilder';
    } else if (resourceType === repositoryResourceTypes.OLAP_CUBE) {
      adHocFlowEvent = 'startAdhocForOlap';
    }

    return adHocFlowEvent;
  },
  _onSelectDataDialogOkButtonClick: function _onSelectDataDialogOkButtonClick() {
    if (this.resourceData) {
      document.location = 'flow.html?_flowId=adhocFlow&realm=' + encodeURIComponent(encodeURIComponent(this.resourceData.resourceUri)) + '&_flowExecutionKey=' + this.resourceData.flowExecutionKey + '&reportType=' + this.resourceData.reportType + '&embeddedDesigner=' + this.isEmbeddedDesigner + '&decorate=' + this.decorate + '&_eventId=' + this.resourceData.event + (this.resourceData.cube ? '&cube=' + this.resourceData.cube : '');
    }
  },
  _onLevelRenderError: function _onLevelRenderError(responseStatus, error, level) {
    error = JSON.parse(error);
    var errMsg = error.message;
    if (error.parameters) errMsg = error.parameters[0].substring(error.parameters[0].indexOf(': ') + 2, error.parameters[0].indexOf('\n'));
    this.setMessage(errMsg);
    this.open();
    level.$el.removeClass(level.loadingClass).addClass(level.openClass);
  },
  _onSelectDataDialogCancelButtonClick: function _onSelectDataDialogCancelButtonClick() {
    this.close();

    if (this.isEmbeddedDesigner && document.referrer.indexOf('login.html') === -1) {
      jQuery(document).trigger('adhocDesigner:cancel');
    }
  },
  _getParameterByName: function _getParameterByName(name) {
    var urlParamPattern = new RegExp('[\\?&]' + name + '=([^&#]*)'),
        paramValues = urlParamPattern.exec(location.search);
    return paramValues == null ? '' : decodeURIComponent(paramValues[1].replace(/\+/g, ' '));
  }
});

function cssClassItemProcessor(item) {
  switch (item.value.resourceType) {
    case repositoryResourceTypes.REPORT_UNIT:
      item.cssClass = 'topic';
      break;

    case repositoryResourceTypes.DOMAIN_TOPIC:
      item.cssClass = 'domain topic';
      break;

    case repositoryResourceTypes.SEMANTIC_LAYER_DATA_SOURCE:
      item.cssClass = 'domain';
      break;

    case repositoryResourceTypes.OLAP_CUBE:
      item.cssClass = 'olap';
      break;

    default:
      break;
  }

  return item;
}

});