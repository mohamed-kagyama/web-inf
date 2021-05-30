define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var RepositoryFileModel = require("runtime_dependencies/bi-repository/src/bi/repository/model/RepositoryFileModel");

var repositoryFileTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryFileTypes");

var javaPropertiesParser = require("runtime_dependencies/js-sdk/src/common/util/parse/javaProperties");

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function parseUnicode(contentJSON) {
  return _.reduce(contentJSON, function (memo, valueWithUnicode, key) {
    memo[key] = valueWithUnicode.replace(/\\u\w\w\w\w/g, function (match) {
      return String.fromCharCode('0x'.concat(match.slice(2)));
    });
    return memo;
  }, {});
}

module.exports = RepositoryFileModel.extend({
  stringifyContent: false,
  defaults: function () {
    return _.extend({}, RepositoryFileModel.prototype.defaults, {
      type: repositoryFileTypes.PROP
    });
  }(),
  setContent: function setContent(content) {
    this.content = content;
    this.contentJSON = parseUnicode(javaPropertiesParser(content));
  },
  toJSON: function toJSON(addContent) {
    var json = RepositoryFileModel.prototype.toJSON.call(this);
    addContent && (json.content = this._encodeContent(this.content));
    return json;
  }
});

});