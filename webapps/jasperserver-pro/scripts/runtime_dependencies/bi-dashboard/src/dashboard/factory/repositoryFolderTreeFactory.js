define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Tree = require("runtime_dependencies/js-sdk/src/common/component/tree/Tree");

var $ = require('jquery');

var _ = require('underscore');

var TreeDataLayer = require("runtime_dependencies/js-sdk/src/common/component/tree/TreeDataLayer");

var TooltipTreePlugin = require("runtime_dependencies/js-sdk/src/common/component/tree/plugin/TooltipPlugin");

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

var resourcesTreeGetDataUriFnUtil = require("runtime_dependencies/bi-repository/src/bi/repository/util/resourcesTreeGetDataUriFnUtil");

var extractRootLevelDataFromHtmlResponse = require("runtime_dependencies/bi-repository/src/bi/repository/util/extractRootLevelDataFromHtmlResponse");

var repositoryFoldersTreeLevelTemplate = require("text!../template/repositoryFoldersTreeLevelTemplate.htm");

var i18n = require("bundle!CommonBundle");

var defaultSettings = require("runtime_dependencies/js-sdk/src/jrs.configs");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var processors = {
  folderTreeProcessor: {
    processItem: function processItem(item) {
      item._node = true;
      item._readonly = !(item.value.permissionMask == 1 || item.value.permissionMask & 4);
      return item;
    }
  },
  filterPublicFolderProcessor: {
    processItem: function processItem(item) {
      if (item.value.uri !== repositoryFoldersTreeFactory.settings.publicFolderUri && item.value.uri !== repositoryFoldersTreeFactory.settings.tempFolderUri) {
        return item;
      }
    }
  },
  i18n: {
    processItem: function processItem(item) {
      item.i18n = i18n;
      return item;
    }
  },
  tenantProcessor: {
    processItem: function processItem(item) {
      item._node = true;
      item.value.label = item.value.tenantName;
      item.value.uri = item.value.tenantUri;
      return item;
    }
  }
};

var repositoryFoldersTreeFactory = function repositoryFoldersTreeFactory(options) {
  options = options || {};
  return Tree.use(TooltipTreePlugin, {
    i18n: i18n,
    contentTemplate: options.tooltipContentTemplate
  }).create().instance({
    additionalCssClasses: 'folders',
    getDataUri: resourcesTreeGetDataUriFnUtil({
      getFolderUri: function getFolderUri(id) {
        return id === "@fakeRoot" ? "" : id;
      },
      contextPath: options.contextPath,
      type: [repositoryResourceTypes.FOLDER]
    }),
    levelDataId: 'uri',
    bufferSize: options.treeBufferSize || 5000,
    itemsTemplate: repositoryFoldersTreeLevelTemplate,
    collapsed: true,
    lazyLoad: true,
    rootless: true,
    selection: {
      allowed: true,
      multiple: false
    },
    customDataLayers: {
      //workaround for correct viewing of '/public' and '/' folder labels
      '/': _.extend(new TreeDataLayer({
        dataUriTemplate: options.contextPath + '/flow.html?_flowId=searchFlow&method=getNode&provider=repositoryExplorerTreeFoldersProvider&uri=/&depth=1',
        processors: _.chain(processors).omit('filterPublicFolderProcessor', 'tenantProcessor').values().value(),
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
            permissionMask: computePermissionMask(data.extra),
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
              permissionMask: computePermissionMask(publicFolder.extra),
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
    processors: [processors.i18n, processors.folderTreeProcessor, processors.filterPublicFolderProcessor],
    getDataArray: function getDataArray(data, status, xhr) {
      return data ? data[repositoryResourceTypes.RESOURCE_LOOKUP] : [];
    }
  });
};

function computePermissionMask(extra) {
  var mask = 2;
  extra.isWritable && (mask = mask | 4);
  extra.isRemovable && (mask = mask | 16);
  extra.isAdministrable && (mask = 1);
  return mask;
}

repositoryFoldersTreeFactory.settings = defaultSettings;
module.exports = repositoryFoldersTreeFactory;

});