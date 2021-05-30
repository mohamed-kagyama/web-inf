define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var pathUtil = require("./pathUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
//returns uri where omitted number parent levels.
//for example:
//resourceUri = /test/test1/test3, parentLevelsToSkip = 2
//result = /test3
function getRelativeUri(resourcePath, parentLevelsToSkip) {
  resourcePath = pathUtil.split(resourcePath.replace(/^\//, ''), '\\', getSeparator(), false);
  return getSeparator() + resourcePath.slice(parentLevelsToSkip).join(getSeparator());
} //returns uri where omitted number parent levels.
//for example:
//resourceUri = /test/test1/test3, parentLevelsToSkip = 2
//result = /test
//returns uri where omitted number parent levels.
//for example:
//resourceUri = /test/test1/test3, parentLevelsToSkip = 2
//result = /test


function getParentUri(resourcePath, parentLevelsToSkip) {
  parentLevelsToSkip = parentLevelsToSkip || 1;
  resourcePath = pathUtil.split(resourcePath.replace(/^\//, ''), '\\', getSeparator(), false);
  return getSeparator() + resourcePath.slice(0, resourcePath.length - parentLevelsToSkip).join('/');
}

function escapeUriComponent(uriComponent) {
  return pathUtil.escape(uriComponent, '\\', getSeparator());
}

function lastPathSymbolIsSeparator(path) {
  return path && path.indexOf(getSeparator()) === path.length - 1;
}

function joinUriComponents() {
  var path = '',
      uriComponents = Array.prototype.slice.call(arguments, 0);
  return _.reduce(uriComponents, function (path, uriComponent) {
    if (uriComponent) {
      if (isSeparator(uriComponent) || lastPathSymbolIsSeparator(path) || !path) {
        path = path + uriComponent;
      } else {
        path = path + getSeparator() + escapeUriComponent(uriComponent);
      }
    }

    return path;
  }, path);
}

function getAbsoluteUri() {
  return getSeparator() + joinUriComponents.apply(null, arguments);
}

function getRootUri() {
  return getSeparator();
}

function getSeparator() {
  return '/';
}

function isSeparator(uriComponent) {
  return uriComponent === getSeparator();
}

function splitUri(uri) {
  return uri ? pathUtil.split(uri.replace(/^\//, ''), '\\', '/', false) : uri;
}

function replaceSeparator(uri, splitSeparator, joinSeparator) {
  return uri ? pathUtil.split(uri.replace(new RegExp('^\\' + splitSeparator), ''), '\\', splitSeparator, false).join(joinSeparator) : uri;
}

function getLastSegment(uri) {
  var splitedUri = uri.split(getSeparator());
  return _.last(splitedUri);
}

module.exports = {
  getSeparator: getSeparator,
  getRootUri: getRootUri,
  getAbsoluteUri: getAbsoluteUri,
  joinUriComponents: joinUriComponents,
  splitUri: splitUri,
  escapeUriComponent: escapeUriComponent,
  getRelativeUri: getRelativeUri,
  getParentUri: getParentUri,
  replaceSeparator: replaceSeparator,
  getLastSegment: getLastSegment
};

});