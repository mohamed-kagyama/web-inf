define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var itemAttributes = ['id', 'index', 'dataIslandId'];
module.exports = {
  computed: {
    itemSelectionProperties: function itemSelectionProperties() {
      return _.extend({}, _.pick(this.item, itemAttributes), {
        type: this.item.modelType,
        parentId: this.item.parentId || null
      });
    }
  }
};

});