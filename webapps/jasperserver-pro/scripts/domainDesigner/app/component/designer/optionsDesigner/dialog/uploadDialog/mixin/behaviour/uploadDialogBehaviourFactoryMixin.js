define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var uploadDialogTabEnum = require("../../enum/uploadDialogTabEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getBehaviour(options) {
  var store = options.store;
  return {
    methods: {
      open: function open() {
        store.reset();
        return this.fetch({
          clearSelection: true,
          resetSearchKeyword: true,
          fileType: store.attributes.repositoryResourceChooser.fileType
        });
      },
      onRepositoryTabClick: function onRepositoryTabClick() {
        this.currentTab = uploadDialogTabEnum.REPOSITORY;
      },
      onLocalFileTabClick: function onLocalFileTabClick() {
        this.currentTab = uploadDialogTabEnum.LOCAL_FILE;
      },
      onSecondaryButtonClick: function onSecondaryButtonClick() {
        this.$emit('close');
      }
    }
  };
}

module.exports = {
  create: getBehaviour
};

});