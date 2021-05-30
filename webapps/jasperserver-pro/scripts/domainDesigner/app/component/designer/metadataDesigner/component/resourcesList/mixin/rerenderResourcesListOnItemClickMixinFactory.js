define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var tree = options.tree;
    return {
      created: function created() {
        tree.on('item:click', this.onItemClick);
      },
      destroyed: function destroyed() {
        tree.off('item:click', this.onItemClick);
      },
      methods: {
        onItemClick: function onItemClick() {
          _.defer(function () {
            tree.fetch({
              keepPosition: true
            });
          });
        }
      }
    };
  }
};

});