define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var mimeTypes = require('./enum/mimeTypesEnum');

var endpointsEnum = require("./enum/endpointsEnum");

var profileAttributeErrorEnum = require("../app/model/enum/profileAttributeErrorEnum");

var profileAttributeUtil = require("../model/util/profileAttributeUtil");

var profileAttributeLevelsEnum = require("./enum/profileAttributeLevelsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var hierarchicAttributesHolderUriTemplate = _.template('holder=user:{{=organizationId}}{{=userId}}&includeInherited=true&{{=attributes}}');

var userLevelAttributesHolderUriTemplate = _.template('holder=user:{{=organizationId}}{{=userId}}&includeInherited=false&{{=attributes}}');

var tenantLevelAttributesHolderUriTemplate = _.template('holder=tenant:{{=organizationId}}&includeInherited=false&{{=attributes}}');

var serverLevelAttributesHolderUriTemplate = _.template('holder=tenant:/&includeInherited=false&{{=attributes}}');

var levelToParamMapper = {};
var HIERARCHIC_ATTRIBUTE = 'hierarchic';
levelToParamMapper[HIERARCHIC_ATTRIBUTE] = '_getHierarchicAttributesUrlParams';
levelToParamMapper[profileAttributeLevelsEnum.USER] = '_getUserLevelAttributesUrlParams';
levelToParamMapper[profileAttributeLevelsEnum.TENANT] = '_getTenantLevelAttributesUrlParams';
levelToParamMapper[profileAttributeLevelsEnum.SERVER] = '_getServerLevelAttributesUrlParams';

var ProfileAttributesService = function ProfileAttributesService(options) {
  this.initialize(options);
};

_.extend(ProfileAttributesService.prototype, {
  initialize: function initialize(options) {
    this.jrsConfigs = options.jrsConfigs || jrsConfigs;
    this.request = options.request;
    this.cache = options.cache;
  },
  // API
  getProfileAttributes: function getProfileAttributes(profileAttributes, options) {
    options = options || {
      refresh: false
    };
    profileAttributes = _.isArray(profileAttributes) ? profileAttributes : [profileAttributes];
    var self = this;

    var groupedProfileAttributes = _.groupBy(profileAttributes, this._groupByLevel),
        compactProfileAttributes = this._compactGroupedProfileAttributes(groupedProfileAttributes);

    var userAttributes = compactProfileAttributes[profileAttributeLevelsEnum.USER] || [],
        tenantAttributes = compactProfileAttributes[profileAttributeLevelsEnum.TENANT] || [],
        serverAttributes = compactProfileAttributes[profileAttributeLevelsEnum.SERVER] || [],
        hierarchicAttributes = compactProfileAttributes[HIERARCHIC_ATTRIBUTE] || [];

    var profileAttributesOnUnsupportedLevels = this._getProfileAttributesOnUnsupportedLevels(compactProfileAttributes);

    if (_.size(profileAttributesOnUnsupportedLevels) > 0) {
      var error = self._createErrorForProfileAttributesOnUnsupportedLevels(profileAttributesOnUnsupportedLevels);

      return new $.Deferred().reject(error);
    }

    var userRequest = this._getAnyLevelProfileAttributes(userAttributes, profileAttributeLevelsEnum.USER, options),
        tenantRequest = this._getAnyLevelProfileAttributes(tenantAttributes, profileAttributeLevelsEnum.TENANT, options),
        serverRequest = this._getAnyLevelProfileAttributes(serverAttributes, profileAttributeLevelsEnum.SERVER, options),
        hierarchicRequest = this._getAnyLevelProfileAttributes(hierarchicAttributes, HIERARCHIC_ATTRIBUTE, options);

    return $.when(userRequest, tenantRequest, serverRequest, hierarchicRequest).then(function (userResult, tenantResult, serverResult, hierarchicResult) {
      var result = self._concatAllAttributesResult({
        userRequest: userAttributes,
        userResult: userResult,
        tenantRequest: tenantAttributes,
        tenantResult: tenantResult,
        serverRequest: serverAttributes,
        serverResult: serverResult,
        hierarchicRequest: hierarchicAttributes,
        hierarchicResult: hierarchicResult
      });

      var allNotFoundAttributes = result.allNotFoundAttributes,
          allMappedAttributes = result.allMappedAttributes;

      if (_.size(allNotFoundAttributes) > 0) {
        var error = self._createErrorForNotFoundAttributes(allNotFoundAttributes);

        return new $.Deferred().reject(error, allMappedAttributes);
      } else {
        return allMappedAttributes;
      }
    });
  },
  _createErrorForProfileAttributesOnUnsupportedLevels: function _createErrorForProfileAttributesOnUnsupportedLevels(profileAttributesOnUnsupportedLevels) {
    return {
      responseJSON: {
        message: "Profile attributes contain unsupported levels.",
        errorCode: profileAttributeErrorEnum.PROFILE_ATTRIBUTE_UNSUPPORTED_LEVEL,
        parameters: _.map(profileAttributesOnUnsupportedLevels, function (attributes, level) {
          var levelWithAttributes = {};
          levelWithAttributes[level] = attributes.map(function (attribute) {
            return attribute.name;
          });
          return levelWithAttributes;
        }),
        profileAttributesOnUnsupportedLevels: profileAttributesOnUnsupportedLevels
      },
      status: 400
    };
  },
  _createErrorForNotFoundAttributes: function _createErrorForNotFoundAttributes(notFoundAttributes) {
    return {
      responseJSON: {
        message: "Profile attributes not found.",
        errorCode: profileAttributeErrorEnum.PROFILE_ATTRIBUTE_NOT_FOUND,
        parameters: notFoundAttributes.map(function (attr) {
          var name = attr.name,
              level = attr.level ? ":" + attr.level : "";
          return name + level;
        }),
        missingAttributes: notFoundAttributes
      },
      status: 404
    };
  },
  _getProfileAttributesOnUnsupportedLevels: function _getProfileAttributesOnUnsupportedLevels(compactProfileAttributes) {
    return _.omit(compactProfileAttributes, [profileAttributeLevelsEnum.USER, profileAttributeLevelsEnum.TENANT, profileAttributeLevelsEnum.SERVER, HIERARCHIC_ATTRIBUTE]);
  },
  _groupByLevel: function _groupByLevel(attribute) {
    var attributeLevel = attribute.level;

    if (attributeLevel) {
      return attributeLevel.toLowerCase();
    }

    return HIERARCHIC_ATTRIBUTE;
  },
  _compactGroupedProfileAttributes: function _compactGroupedProfileAttributes(groupedProfileAttributes) {
    return _.reduce(groupedProfileAttributes, function (memo, attributes, level) {
      memo[level] = _.reduce(attributes, function (memo, attribute) {
        if (memo.addedAttributes[attribute.name]) {
          return memo;
        }

        var compactedAttribute = {
          name: attribute.name
        };

        if (this._isProfileAttributeHasLevel(attribute)) {
          compactedAttribute.level = level;
        }

        memo.attributes.push(compactedAttribute);
        memo.addedAttributes[attribute.name] = true;
        return memo;
      }, {
        attributes: [],
        addedAttributes: {}
      }, this).attributes;
      return memo;
    }, {}, this);
  },
  _concatAllAttributesResult: function _concatAllAttributesResult(options) {
    var userRequest = options.userRequest,
        userResult = options.userResult,
        tenantRequest = options.tenantRequest,
        tenantResult = options.tenantResult,
        serverRequest = options.serverRequest,
        serverResult = options.serverResult,
        hierarchicRequest = options.hierarchicRequest,
        hierarchicResult = options.hierarchicResult;

    var userConvertedResult = this._mapProfileAttributesResult(userResult, userRequest),
        tenantConvertedResult = this._mapProfileAttributesResult(tenantResult, tenantRequest),
        serverConvertedResult = this._mapProfileAttributesResult(serverResult, serverRequest),
        hierarchicConverterResult = this._mapProfileAttributesResult(hierarchicResult, hierarchicRequest);

    var allNotFoundAttributes = userConvertedResult.notFoundAttributes.concat(tenantConvertedResult.notFoundAttributes).concat(serverConvertedResult.notFoundAttributes).concat(hierarchicConverterResult.notFoundAttributes);
    var allMappedAttributes = userConvertedResult.mappedAttributes.concat(tenantConvertedResult.mappedAttributes).concat(serverConvertedResult.mappedAttributes).concat(hierarchicConverterResult.mappedAttributes);
    return {
      allNotFoundAttributes: allNotFoundAttributes,
      allMappedAttributes: allMappedAttributes
    };
  },
  _getAnyLevelProfileAttributes: function _getAnyLevelProfileAttributes(profileAttributes, level, options) {
    if (_.size(profileAttributes) > 0) {
      var self = this;

      var attributesToFetch = this._getAttributesToFetch(profileAttributes, level, options);

      var getAttributesFromCache = _.bind(this._getAttributesFromCache, this, profileAttributes, level);

      if (_.size(attributesToFetch) > 0) {
        var attributes = $.param(this._mapProfileAttributesToUrlParams(attributesToFetch));
        var paramMapperMethodName = levelToParamMapper[level];
        var params = this[paramMapperMethodName](attributes);
        return this._getProfileAttributes(params).then(function (result) {
          self._putAttributesToCache(result, attributesToFetch, level);

          return getAttributesFromCache();
        });
      } else {
        return new $.Deferred().resolve(getAttributesFromCache());
      }
    } else {
      return this._getEmptyAttributes();
    }
  },
  _getProfileAttributeCacheKey: function _getProfileAttributeCacheKey(profileAttribute, level) {
    var args = [profileAttribute.name];

    if (this._isProfileAttributeHasLevel(profileAttribute)) {
      args.push(level);
    }

    return profileAttributeUtil.createProfileAttributeFunctionWithArgs(args);
  },
  _getAttributesToFetch: function _getAttributesToFetch(profileAttributes, level, options) {
    return _.filter(profileAttributes, function (profileAttribute) {
      var cacheKey = this._getProfileAttributeCacheKey(profileAttribute, level); // if refresh option is used we send request to fetch all attributes,
      // no matter if they are in the cache or not. Cache is never cleaned,
      // so values can only be updated but not deleted. This way application
      // will always find a cached value by provided key on condition
      // the value was cached before.


      if (options.refresh) {
        return true;
      } else {
        return !this.cache.get(cacheKey);
      }
    }, this);
  },
  _putAttributesToCache: function _putAttributesToCache(result, attributesToFetch, level) {
    var attributes = result ? result.attribute : [],
        groupedByNameAttributes = _.groupBy(attributes, "name");

    _.each(attributesToFetch, function (source) {
      var result = groupedByNameAttributes[source.name];

      if (result) {
        var resultAttr = _.first(result),
            cacheKey = this._getProfileAttributeCacheKey(source, level);

        this.cache.add(cacheKey, _.extend({}, source, {
          value: resultAttr.value,
          secure: resultAttr.secure
        }));
      }
    }, this);
  },
  _getAttributesFromCache: function _getAttributesFromCache(profileAttributes, level) {
    return _.reduce(profileAttributes, function (memo, profileAttribute) {
      var cacheKey = this._getProfileAttributeCacheKey(profileAttribute, level);

      var result = this.cache.get(cacheKey);

      if (result) {
        memo.push(result);
      }

      return memo;
    }, [], this);
  },
  _getEmptyAttributes: function _getEmptyAttributes() {
    return new $.Deferred().resolve([]);
  },
  _getProfileAttributes: function _getProfileAttributes(params) {
    return this.request({
      type: "GET",
      headers: {
        "Accept": mimeTypes.PROFILE_ATTRIBUTES_COLLECTION
      },
      url: endpointsEnum.PROFILE_ATTRIBUTES_SERVICE + "?" + params
    });
  },
  _getHierarchicAttributesUrlParams: function _getHierarchicAttributesUrlParams(attributes) {
    var userId = this.jrsConfigs.userId;
    return hierarchicAttributesHolderUriTemplate({
      userId: userId,
      organizationId: this._wrapOrganizationIdWithSlash(true, true),
      attributes: attributes
    });
  },
  _getUserLevelAttributesUrlParams: function _getUserLevelAttributesUrlParams(attributes) {
    var userId = this.jrsConfigs.userId;
    return userLevelAttributesHolderUriTemplate({
      userId: userId,
      organizationId: this._wrapOrganizationIdWithSlash(true, true),
      attributes: attributes
    });
  },
  _getTenantLevelAttributesUrlParams: function _getTenantLevelAttributesUrlParams(attributes) {
    return tenantLevelAttributesHolderUriTemplate({
      organizationId: this._wrapOrganizationIdWithSlash(true, false),
      attributes: attributes
    });
  },
  _getServerLevelAttributesUrlParams: function _getServerLevelAttributesUrlParams(attributes) {
    return serverLevelAttributesHolderUriTemplate({
      attributes: attributes
    });
  },
  _getOrganizationId: function _getOrganizationId() {
    return this.jrsConfigs.organizationId ? this.jrsConfigs.organizationId : "";
  },
  _wrapOrganizationIdWithSlash: function _wrapOrganizationIdWithSlash(head, tail) {
    var organizationId = this._getOrganizationId();

    if (head) {
      organizationId = "/" + organizationId;
    }

    if (tail && organizationId && organizationId !== "/") {
      organizationId = organizationId + "/";
    }

    return organizationId;
  },
  _mapProfileAttributesToUrlParams: function _mapProfileAttributesToUrlParams(profileAttributes) {
    profileAttributes = _.isArray(profileAttributes) ? profileAttributes : [profileAttributes];
    return profileAttributes.map(function (profileAttribute) {
      return {
        name: "name",
        value: profileAttribute.name
      };
    });
  },
  _mapProfileAttributesResult: function _mapProfileAttributesResult(attributes, attributesRequest) {
    var groupedByNameAttributes = _.groupBy(attributes, "name");

    return _.reduce(attributesRequest, function (memo, source) {
      var result = groupedByNameAttributes[source.name];

      if (!result) {
        memo.notFoundAttributes.push(source);
      } else {
        memo.mappedAttributes.push(result[0]);
      }

      return memo;
    }, {
      mappedAttributes: [],
      notFoundAttributes: []
    });
  },
  _isProfileAttributeHasLevel: function _isProfileAttributeHasLevel(profileAttribute) {
    return Boolean(profileAttribute.level);
  }
});

module.exports = ProfileAttributesService;

});