define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var moment = require("momentExtension");

var date = require("runtime_dependencies/js-sdk/src/common/util/parse/date");

var expandableBlockEnum = require('../types/expandableBlockEnum');

var _utilCookie = require('../util/cookie');

var cookie = _utilCookie.cookie;

var expandableBlockCookieStateEnum = require('../types/expandableBlockCookieStateEnum');

var globalConfiguration = require("settings!globalConfiguration");

var i18n = require("bundle!HomeBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
// @ts-ignore
// @ts-ignore
var timestampPattern = date.toMomentDateOrTimeOrTimestampPattern(globalConfiguration.timestampFormat, ' ', true);

function getBlockExpandedState(id) {
  return cookie.get(id) !== expandableBlockCookieStateEnum.COLLAPSED;
}

function getRecentItemUrl(resource) {
  var links = resource._links;
  var url = '#';

  if (links.run) {
    url = links.run.href;
  } else if (links.edit) {
    url = links.edit.href;
  } else if (links.open) {
    url = links.open.href;
  }

  return url;
}

var sidebarBlocksConverter = function sidebarBlocksConverter(recentResources, contentReferences) {
  var groupedContentReferences = _.groupBy(contentReferences, 'group');

  return [{
    id: expandableBlockEnum.RECENT_ITEMS,
    title: i18n['recently.viewed.items'],
    isExpanded: getBlockExpandedState(expandableBlockEnum.RECENT_ITEMS),
    items: recentResources.map(function (resource) {
      return {
        label: resource.label,
        path: resource.uri,
        resourceType: resource.resourceType,
        description: resource.description,
        date: moment(resource.lastAccessTime).calendar(undefined, {
          sameElse: timestampPattern
        }),
        actionAvailable: Object.keys(resource._links).length > 0,
        url: getRecentItemUrl(resource)
      };
    })
  }, {
    id: expandableBlockEnum.VIDEO_TUTORIALS,
    title: i18n['tutorial.view'],
    isExpanded: getBlockExpandedState(expandableBlockEnum.VIDEO_TUTORIALS),
    items: groupedContentReferences.tutorial.map(function (resource) {
      return {
        linkClass: 'tutorial',
        title: resource.title,
        url: resource.url
      };
    })
  }, {
    id: expandableBlockEnum.POPULAR_RESOURCES,
    title: i18n['popular.resources'],
    isExpanded: getBlockExpandedState(expandableBlockEnum.POPULAR_RESOURCES),
    items: groupedContentReferences.popular.map(function (resource) {
      return {
        linkClass: resource.id,
        title: resource.title,
        url: resource.url,
        description: resource.description
      };
    })
  }];
};

exports.sidebarBlocksConverter = sidebarBlocksConverter;

});