define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18nComputed = require("../../../../../../../common/vue/computed/i18nComputed");

var repositoryResourceChooserDialogUtil = require("../../../../../../repositoryResourceChooser/component/chooser/util/repositoryResourceChooserDialogUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  computed: _.extend({
    isRepositoryTreeMode: function isRepositoryTreeMode() {
      return repositoryResourceChooserDialogUtil.isRepositoryTreeMode(this.repositoryResourceChooser.searchResultMode);
    },
    isResourcesListMode: function isResourcesListMode() {
      return repositoryResourceChooserDialogUtil.isResourcesListMode(this.repositoryResourceChooser.searchResultMode);
    },
    primaryButtonLabel: function primaryButtonLabel() {
      if (this.isRepositoryTab) {
        return this.i18n2['button.add'];
      }

      return this.i18n2['button.upload'];
    },
    secondaryButtonLabel: function secondaryButtonLabel() {
      return this.i18n2['button.cancel'];
    }
  }, i18nComputed)
};

});