define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var BaseComponentModel = require('./BaseComponentModel');

var jiveTypes = require('../enum/jiveTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BaseComponentModel.extend({
  defaults: function defaults() {
    return {
      bookmarks: [],
      id: undefined,
      type: jiveTypes.BOOKMARKS
    };
  },
  constructor: function constructor(attrs, options) {
    options || (options = {});
    options.parse || (options = _.extend({}, options, {
      parse: true
    }));
    BaseComponentModel.call(this, attrs, options);
  },
  parse: function parse(data) {
    data.bookmarks = this._processBookmarks(data.bookmarks);
    return data;
  },
  _processBookmarks: function _processBookmarks(bookmarks) {
    if (bookmarks) {
      var self = this;
      return _.map(bookmarks, function (bookmark) {
        return {
          anchor: bookmark.label,
          page: bookmark.pageIndex + 1,
          bookmarks: self._processBookmarks(bookmark.bookmarks)
        };
      });
    }

    return null;
  }
});

});