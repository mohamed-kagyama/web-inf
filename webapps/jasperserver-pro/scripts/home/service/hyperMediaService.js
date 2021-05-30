define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var defaultRequest = require("request");

var $ = require('jquery');

var configs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var mediaTypes = require('../types/mediaTypes');

var _typesHalProviders = require('../types/halProviders');

var halNames = _typesHalProviders.halNames;
var halProviders = _typesHalProviders.halProviders;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var contextPath = configs.contextPath;

function findHalLinkByType(link, type) {
  if (!Array.isArray(link)) {
    return link;
  }

  var result = link.find(function (linkItem) {
    return linkItem.type === type;
  });

  if (!result) {
    throw new Error("HalLink with type ".concat(type, " not found"));
  }

  return result;
}

function getUrlFromHalLink(link) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : mediaTypes.APPLICATION_HAL_JSON;
  var halJsonLink = findHalLinkByType(link, type);
  return halJsonLink.href;
}

function extendHalResponseWithControls() {
  var resources = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var items = Array.isArray(resources) ? resources : [resources];
  return items.map(function (item) {
    var links = item._links;
    var embedded = item._embedded;
    var controls = Object.keys(embedded).reduce(function (memo, key) {
      var embeddedMaybeArray = embedded[key];
      var entity = Array.isArray(embeddedMaybeArray) ? embeddedMaybeArray[0] : embeddedMaybeArray;
      return _objectSpread({}, memo, _defineProperty({}, key, {
        label: entity.title,
        action: key,
        entity: entity
      }));
    }, {});
    controls = Object.keys(links).reduce(function (memo, key) {
      var halLinkMaybeArray = links[key];
      var halLink = findHalLinkByType(halLinkMaybeArray, mediaTypes.TEXT_HTML);
      return _objectSpread({}, memo, {
        label: halLink.title,
        action: halLink.relation,
        href: halLink.href
      });
    }, controls);
    return _objectSpread({}, item, {
      controls: controls
    });
  });
}

function createGetRoot(request) {
  return function () {
    return request({
      type: 'GET',
      traditional: true,
      dataType: 'json',
      url: "".concat(contextPath, "/rest_v2/hypermedia/root")
    });
  };
}

exports.createGetRoot = createGetRoot;
var getRoot = exports.getRoot = createGetRoot(defaultRequest);

function getResourcesByHalName(url, name, request) {
  return request({
    url: url
  }).then(function (value) {
    var resources = value._embedded[name];
    return extendHalResponseWithControls(resources);
  });
}

function getWorkflows(link, request) {
  return getResourcesByHalName(getUrlFromHalLink(link), halNames.workflow, request);
}

function getContentReferences(link, request) {
  return getResourcesByHalName(getUrlFromHalLink(link), halNames.contentReference, request);
}

function getResources(link, request) {
  return getResourcesByHalName(getUrlFromHalLink(link), halNames.resource, request);
}

function createGetHomeAdminWorkflowResources(request) {
  return function () {
    return getResourcesByHalName("".concat(contextPath, "/rest_v2/hypermedia/workflows?parentName=admin"), halNames.workflow, request);
  };
}

exports.createGetHomeAdminWorkflowResources = createGetHomeAdminWorkflowResources;
var getHomeAdminWorkflowResources = exports.getHomeAdminWorkflowResources = createGetHomeAdminWorkflowResources(defaultRequest);

function createGetHomePageResources(request) {
  var getRootFunc = createGetRoot(request);
  return function () {
    return getRootFunc().then(function (result) {
      var contentReferences = result._links[halProviders.contentReferences];
      var workflows = result._links[halProviders.workflows];
      var resources = result._links[halProviders.resources];
      return $.when(getContentReferences(contentReferences, request), getWorkflows(workflows, request), getResources(resources, request)).then(function (contentReferencesResult, workflowsResult, resourcesResult) {
        return {
          contentReferences: contentReferencesResult,
          workflows: workflowsResult,
          resources: resourcesResult
        };
      });
    });
  };
}

exports.createGetHomePageResources = createGetHomePageResources;
var getHomePageResources = exports.getHomePageResources = createGetHomePageResources(defaultRequest);

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});