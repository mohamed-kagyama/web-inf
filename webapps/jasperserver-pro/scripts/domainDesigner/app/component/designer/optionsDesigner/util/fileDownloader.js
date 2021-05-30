define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var mimeTypesEnum = require("../../../../../rest/enum/mimeTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var a = document.createElement('a');
a.style = 'display: none';
document.body.appendChild(a);

function download(content, name) {
  var blob = new Blob([content], {
    type: mimeTypesEnum.OCTET_STREAM
  }),
      url;

  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, name);
  } else {
    url = window.URL.createObjectURL(blob);
    downloadUrl(url, name);
    window.URL.revokeObjectURL(url);
  }
}

function downloadUrl(url, name) {
  a.href = url;
  a.download = name;
  a.click();
}

module.exports = {
  download: download,
  downloadUrl: downloadUrl
};

});