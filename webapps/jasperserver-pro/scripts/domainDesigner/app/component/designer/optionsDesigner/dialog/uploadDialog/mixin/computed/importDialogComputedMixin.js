define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18nComputed = require("../../../../../../../common/vue/computed/i18nComputed");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  computed: _.extend({
    primaryButtonLabel: function primaryButtonLabel() {
      if (this.isRepositoryTab) {
        return this.i18n2['button.add'];
      }

      return this.i18n['domain.designer.advanced.options.securityFileUploadDialog.button.import'];
    }
  }, i18nComputed)
};

});