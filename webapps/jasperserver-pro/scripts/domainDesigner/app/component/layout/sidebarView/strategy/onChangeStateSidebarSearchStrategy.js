define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  execute: function execute(options) {
    var store = options.store;
    store.set({
      isVisible: store.get('ownDesigner') === options.state.viewState.getCurrentDesigner(),
      searchKeyword: options.searchKeyword
    });
  }
};

});