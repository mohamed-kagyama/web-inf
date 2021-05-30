define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function RepositoryResourceChooserDialogFactory(options) {
  options = options || options;

  _.bindAll(this, 'create');

  this.Dialog = options.Dialog;
}

_.extend(RepositoryResourceChooserDialogFactory.prototype, {
  create: function create(options) {
    var Dialog = this.Dialog;
    return new Dialog(options);
  }
});

module.exports = RepositoryResourceChooserDialogFactory;

});