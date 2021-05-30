define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var treeItemVueConfigFactory = require("../treeItem/treeItemVueConfigFactory");

var template = require("text!./template/treeTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    options = options || {};
    var TreeItem = options.TreeItem || treeItemVueConfigFactory.create({
      debounceTime: options.debounceTime || 0
    });
    return {
      components: {
        treeItem: TreeItem
      },
      mixins: options.mixins,
      template: options.template || template,
      props: {
        nodes: {
          type: Array,
          "default": function _default() {
            return [];
          }
        },
        selection: {
          type: Object
        }
      },
      methods: {
        toggle: function toggle(treeItem) {
          this.$emit('toggle', treeItem);
        },
        select: function select(treeItem) {
          this.$emit('select', treeItem);
        }
      }
    };
  }
};

});