define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var fileDownloader = require("./fileDownloader");

var endpoints = require("../../../../../rest/enum/endpointsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  downloadResource: function downloadResource(resource, getFileNameForUrlDownload, getFileNameForContentDownload) {
    if (!resource.content) {
      var url = endpoints.RESOURCES_SERVICE + resource.uri;
      fileDownloader.downloadUrl(url, getFileNameForUrlDownload(resource));
    } else {
      fileDownloader.download(resource.content.raw, getFileNameForContentDownload(resource));
    }
  }
};

});