define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var FileLoader = function FileLoader(options) {
  this.initialize(options);
};

_.extend(FileLoader.prototype, {
  initialize: function initialize(options) {
    options = options || {};
    this.FileReaderConstructor = options.FileReader || FileReader;
  },
  loadFilesWithContent: function loadFilesWithContent(files) {
    files = _.isArray(files) ? files : [files];

    var filesDFD = _.map(files, function (file) {
      var reader = new this.FileReaderConstructor(),
          fileDFD = new $.Deferred();

      reader.onload = function () {
        fileDFD.resolve({
          name: file.name,
          content: reader.result
        });
      };

      reader.readAsText(file);
      return fileDFD;
    }, this);

    return $.when.apply($, filesDFD).then(function () {
      return Array.prototype.slice.call(arguments, 0);
    });
  }
});

module.exports = FileLoader;

});