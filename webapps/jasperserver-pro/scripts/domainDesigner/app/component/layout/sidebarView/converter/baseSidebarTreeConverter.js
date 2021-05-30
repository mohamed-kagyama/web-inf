define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CHILDREN_PROPERTY = 'elements';

function matchPredicate(predicate, options) {
  if (_.isUndefined(predicate)) {
    return true;
  } else if (_.isFunction(predicate)) {
    return predicate(options);
  } else {
    return predicate;
  }
}

function convertResources(resources, options) {
  var convertResource = options.convertResource,
      resourceMatch = options.resourceMatch,
      resourceOrChildrenMatch = options.resourceOrChildrenMatch,
      resourceJsonMatch = options.resourceJsonMatch,
      postProcess = options.postProcess,
      comparator = options.comparator;
  var self = this;
  var result = resources.reduce(function (memo, resource) {
    var path = _.clone(options.path) || [];
    path.push(resource.id);

    var optionsWithResource = _.extend({}, options, {
      resource: resource,
      path: path
    });

    var entityMatchResult = matchPredicate(resourceMatch, optionsWithResource);

    if (!entityMatchResult) {
      return memo;
    }

    var currentResourceOrChildrenMatchResult = matchPredicate(resourceOrChildrenMatch, optionsWithResource);
    var resourceJson = convertResource(resource, _.extend({}, options, {
      parentMatchResult: currentResourceOrChildrenMatchResult,
      path: path
    }));
    var resourcesJson = _.isArray(resourceJson) ? resourceJson : [resourceJson];
    resourcesJson = _.filter(resourcesJson, function (resourceJson) {
      return matchPredicate(resourceJsonMatch, _.extend({}, options, {
        resource: resource,
        resourceJson: resourceJson,
        isResourceMatch: currentResourceOrChildrenMatchResult
      }));
    }, self);
    return memo.concat(resourcesJson);
  }, []);

  if (comparator) {
    result.sort(comparator);
  }

  if (postProcess) {
    result = _.map(result, function (resourceJson, index) {
      return postProcess(resourceJson, _.extend({}, options, {
        index: index
      }));
    });
  }

  return result;
}

function convertResourceWithChildren(resource, options) {
  var children = options.children,
      convertResource = options.convertResourceNoChildren,
      childrenProperty = options.childrenProperty || CHILDREN_PROPERTY,
      cleanOptions = _.omit(options, ['children']),
      convertedChildren = [],
      properties = {};

  var convertChildrenMatchResult = matchPredicate(options.convertChildrenMatch, {
    resource: resource
  });
  var doNotSkipResourceConversion = matchPredicate(options.doNotSkipResourceConversion, options);

  if (convertChildrenMatchResult) {
    convertedChildren = convertResources(children, _.extend({}, cleanOptions, {
      parent: resource
    }));
    properties[childrenProperty] = convertedChildren;
  }

  if (doNotSkipResourceConversion) {
    return convertResource(resource, _.extend({}, cleanOptions, {
      properties: properties
    }));
  }

  return properties[childrenProperty] || [];
}

module.exports = {
  convertResources: convertResources,
  convertResourceWithChildren: convertResourceWithChildren
};

});