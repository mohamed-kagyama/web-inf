define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var SimpleModel = require("../../../../../../model/util/SimpleModel");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = SimpleModel.extend({
  setState: function setState(state) {
    var viewState = state.viewState,
        currentDesigner = viewState.getCurrentDesigner(),
        joinTreesSize = state.dataStore.joinTrees.size(),
        ownDesigner = this.get('ownDesigner');
    this.set('isVisible', currentDesigner === ownDesigner && joinTreesSize > 0);
  },
  defaults: {
    isVisible: false
  }
});

});