define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require("jquery");

var _ = require("underscore");

var encryptedProfileAttributeErrorEnum = require("../enum/encryptedProfileAttributeErrorEnum");

var encryptedProfileAttributeErrorParamKeyEnum = require("../enum/encryptedProfileAttributeErrorParamKeyEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ProfileAttributesServiceWithEncrytedAttributeErrorHandling = function ProfileAttributesServiceWithEncrytedAttributeErrorHandling(options) {
  this.initialize(options);
};

_.extend(ProfileAttributesServiceWithEncrytedAttributeErrorHandling.prototype, {
  initialize: function initialize(options) {
    this.profileAttributesService = options.profileAttributesService;
  },
  getProfileAttributes: function getProfileAttributes(profileAttributes, options) {
    var self = this;
    return this.profileAttributesService.getProfileAttributes(profileAttributes, options).then(function (attrs) {
      var dfd, result;

      var secureProfileAttributes = self._getAnySecureAttributes(attrs),
          isAnySecureProfileAttributes = secureProfileAttributes.length > 0;

      if (isAnySecureProfileAttributes) {
        dfd = new $.Deferred();
        result = dfd.reject(self._getSecureProfileAttributesError(secureProfileAttributes));
      } else {
        result = attrs;
      }

      return result;
    }, function (xhr, attrs) {
      var result, dfd;
      dfd = new $.Deferred();

      var secureProfileAttributes = self._getAnySecureAttributes(attrs),
          isAnySecureProfileAttributes = secureProfileAttributes.length > 0;

      if (isAnySecureProfileAttributes) {
        result = self._getSecureProfileAttributesError(secureProfileAttributes);
      } else {
        result = xhr;
      }

      return dfd.reject(result);
    });
  },
  _getSecureProfileAttributesError: function _getSecureProfileAttributesError(attrs) {
    return {
      responseJSON: _.map(attrs, function (attr) {
        return {
          errorCode: encryptedProfileAttributeErrorEnum.ENCRYPTED_PROFILE_ATTRIBUTE_ERROR,
          parameters: [{
            key: encryptedProfileAttributeErrorParamKeyEnum.ATTRIBUTE_NAME,
            value: attr.name
          }]
        };
      })
    };
  },
  _getAnySecureAttributes: function _getAnySecureAttributes(attrs) {
    return _.reduce(attrs, function (memo, attr) {
      if (attr.secure) {
        memo = memo.concat(attr);
      }

      return memo;
    }, []);
  }
});

module.exports = ProfileAttributesServiceWithEncrytedAttributeErrorHandling;

});