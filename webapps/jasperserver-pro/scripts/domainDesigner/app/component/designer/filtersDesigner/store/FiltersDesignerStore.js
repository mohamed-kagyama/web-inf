define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var SimpleModel = require("../../../../../model/util/SimpleModel");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var FiltersDesignerStore = SimpleModel.extend({
  defaults: function defaults() {
    return {
      runtime: {
        canvasDroppableArea: {
          isHidden: true
        },
        left: {
          over: false
        },
        right: {
          over: false
        }
      },
      ownTab: '',
      ownDesigner: '',
      currentTab: '',
      currentDesigner: '',
      filters: [],
      top: 0,
      scrollPos: 0,
      height: 0,
      canvasHeight: 0,
      isDraftFilterPresent: false,
      isInitialDroppableZoneActive: false,
      isEmptyDataStructure: false,
      searchKeyword: ''
    };
  }
});
module.exports = FiltersDesignerStore;

});