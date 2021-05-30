define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var uploadDialogTabEnum = require("../../../enum/uploadDialogTabEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  computed: {
    isRepositoryTab: function isRepositoryTab() {
      return this.currentTab === uploadDialogTabEnum.REPOSITORY;
    },
    isLocalFileTab: function isLocalFileTab() {
      return this.currentTab === uploadDialogTabEnum.LOCAL_FILE;
    }
  }
};

});