define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  changeLocation: function changeLocation(location) {
    window.location.assign(location);
  },
  getCurrentLocationParameters: function getCurrentLocationParameters(search) {
    search = search || window.location.search;
    var params = search.substring(1).split('&');
    return _.reduce(params, function (memo, param) {
      var keyValue = param.split('='),
          key = decodeURIComponent(keyValue[0]),
          value = decodeURIComponent(keyValue[1]),
          existing = memo[key];

      if (existing) {
        if (_.isArray(existing)) {
          existing.push(value);
        } else {
          memo[key] = [existing, value];
        }
      } else {
        memo[key] = value;
      }

      return memo;
    }, {});
  },
  getPreviousLocation: function getPreviousLocation(previousUrlStorageKey, homePageUrl, domainDesignerPageUrl) {
    var defaultPreviousLocation = homePageUrl;

    if (document.referrer.indexOf('login.html') !== -1) {
      var previousUrl = window.localStorage ? localStorage.getItem(previousUrlStorageKey) : '';

      if (previousUrl) {
        previousUrl = decodeURIComponent(previousUrl);

        if (previousUrl) {
          defaultPreviousLocation = previousUrl;
        }
      }
    } else {
      if (document.referrer.indexOf(domainDesignerPageUrl) === -1 && document.referrer.length) {
        defaultPreviousLocation = document.referrer;
      } // In case of session timeout the user's experience will be interrupted by login page
      // Once the user logged back the Domain Designer page will be opened again
      // And in case user would like to get back we have to redirect him back to previous page.
      // To be able to do this we need to save this previous page in LocalStorage for future usage
      // In case of session timeout the user's experience will be interrupted by login page
      // Once the user logged back the Domain Designer page will be opened again
      // And in case user would like to get back we have to redirect him back to previous page.
      // To be able to do this we need to save this previous page in LocalStorage for future usage


      window.localStorage && localStorage.setItem(previousUrlStorageKey, encodeURIComponent(defaultPreviousLocation));
    }

    return defaultPreviousLocation;
  }
};

});