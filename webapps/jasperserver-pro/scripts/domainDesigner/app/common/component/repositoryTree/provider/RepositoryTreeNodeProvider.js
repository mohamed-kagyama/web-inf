define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var repositoryFakeFolderEnum = require("../enum/repositoryFakeFolderEnum");

var mimeTypesEnum = require("../../../../../rest/enum/mimeTypesEnum");

var resourceLookupUtil = require("../util/resourceLookupUtil");

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function defaultResourceLookupFilter(resourceLookup) {
  return resourceLookup && !resourceLookupUtil.isEmptyFolder(resourceLookup);
}

function RepositoryTreeNodeProvider(options) {
  options = options || options;

  _.bindAll(this, 'getData', '_filterEmptyFolders');

  this.resourceLookupsFilter = options.resourceLookupsFilter || defaultResourceLookupFilter;
  this.resourceService = options.resourceService;
  this.toTreeNode = options.resourceLookupToTreeNodeConverter.convert;
  this.defaultSearchParams = _.defaults(options.defaultSearchParams || {});
}

_.extend(RepositoryTreeNodeProvider.prototype, {
  getData: function getData(options, resource) {
    options = options || {};
    this.fileType = resource.fileType || options.fileType;
    var self = this,
        offset = options.offset,
        limit = options.limit;

    var searchParams = _.defaults({
      folderUri: resource && resource.uri ? resource.uri : repositoryFakeFolderEnum.ROOT_FOLDER.URI,
      offset: offset,
      limit: limit,
      recursive: false,
      containerType: repositoryResourceTypes.FOLDER
    }, this.defaultSearchParams);

    return $.when(this.resourceService.search(searchParams), this.resourceService.getResource('', {
      type: mimeTypesEnum.REPOSITORY_FOLDER
    })).then(function (searchResult, getResourceResponse) {
      return self._createFakeRootAndPublicFolder({
        resource: resource,
        searchResult: searchResult,
        rootResourceDescriptor: getResourceResponse[0],
        searchParams: searchParams
      });
    }).then(function (searchResult) {
      return self._removePublicFolderFromChildrenOfFakeRootFolder(resource, searchResult);
    }).then(this._filterEmptyFolders).then(function (searchResult) {
      searchResult.data.each(function (item) {
        item.fileType = self.fileType;
      });
      return {
        data: searchResult.data.map(self.toTreeNode),
        total: searchResult.total
      };
    });
  },
  getQueryKeyword: function getQueryKeyword() {
    return this.defaultSearchParams.q;
  },
  setQueryKeyword: function setQueryKeyword(queryKeyword) {
    this.defaultSearchParams.q = queryKeyword;
  },
  resetQueryKeyword: function resetQueryKeyword() {
    delete this.defaultSearchParams.q;
  },
  _isFakeResource: function _isFakeResource(resource) {
    return resource && resource.id === repositoryFakeFolderEnum.ROOT_FOLDER.FAKE_ID;
  },
  _isRootFolder: function _isRootFolder(resource) {
    return resource && resource.uri === repositoryFakeFolderEnum.ROOT_FOLDER.URI;
  },
  _createFakeRootAndPublicFolder: function _createFakeRootAndPublicFolder(options) {
    var resource = options.resource,
        searchResult = options.searchResult,
        searchParams = options.searchParams,
        rootResourceDescriptor = options.rootResourceDescriptor;

    if (this._isRootFolder(resource) && !this._isFakeResource(resource)) {
      var publicFolder = _.find(searchResult.data, function (resource) {
        return resource.uri === repositoryFakeFolderEnum.PUBLIC_FOLDER.URI;
      });

      var rootAndPublic = [_.extend({}, repositoryFakeFolderEnum.ROOT_FOLDER.FOLDER, {
        label: rootResourceDescriptor.label
      })];

      if (publicFolder) {
        rootAndPublic = rootAndPublic.concat(publicFolder);
        searchResult = {
          data: rootAndPublic,
          total: rootAndPublic.length
        };
      } else {
        return this._getPublicFolder(searchParams).then(function (publicFolder) {
          rootAndPublic = rootAndPublic.concat(publicFolder);
          return {
            data: rootAndPublic,
            total: rootAndPublic.length
          };
        }, function () {
          return new $.Deferred().resolve({
            data: rootAndPublic,
            total: rootAndPublic.length
          });
        });
      }
    }

    return searchResult;
  },
  _removePublicFolderFromChildrenOfFakeRootFolder: function _removePublicFolderFromChildrenOfFakeRootFolder(resource, searchResult) {
    if (this._isRootFolder(resource) && this._isFakeResource(resource)) {
      var resourcesWithoutPublicFolder = searchResult.data.filter(function (resource) {
        return resource.uri !== repositoryFakeFolderEnum.PUBLIC_FOLDER.URI;
      });
      searchResult = {
        data: resourcesWithoutPublicFolder,
        total: searchResult.total - 1
      };
    }

    return searchResult;
  },
  _filterEmptyFolders: function _filterEmptyFolders(searchResult) {
    var data;

    if (this.resourceLookupsFilter) {
      data = searchResult.data.filter(this.resourceLookupsFilter);
      searchResult = {
        data: data,
        total: data.length
      };
    }

    return searchResult;
  },
  _getPublicFolder: function _getPublicFolder(searchParams) {
    searchParams = _.extend({}, searchParams, {
      folderUri: repositoryFakeFolderEnum.PUBLIC_FOLDER.URI
    });
    return $.when(this.resourceService.search(searchParams), this.resourceService.getResource(repositoryFakeFolderEnum.PUBLIC_FOLDER.URI)).then(function (searchResult, getResourceResponse) {
      if (searchResult.data.length) {
        return _.extend({}, repositoryFakeFolderEnum.PUBLIC_FOLDER.FOLDER, {
          label: getResourceResponse[0].label
        });
      } else {
        return new $.Deferred().reject();
      }
    });
  }
});

module.exports = RepositoryTreeNodeProvider;

});