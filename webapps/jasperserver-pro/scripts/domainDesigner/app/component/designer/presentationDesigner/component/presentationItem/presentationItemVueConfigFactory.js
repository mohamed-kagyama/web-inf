define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var template = require("text!./template/presentationItemTemplate.htm");

var columnSetUtil = require("../../util/columnSetUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      template: template,
      props: ['item', 'isAdvancedPropertiesPresent', 'tableRowClass', 'nestingLevelClass', 'treeNodeClass', 'treeIconClass', 'toggleNodeClass', 'column0Width', 'column1Width', 'eventName'],
      mixins: options.mixins,
      components: {
        treeNode: options.treeNode,
        togglePropertiesEditor: options.togglePropertiesEditor,
        removeItem: options.removeItem
      },
      methods: _.extend({}, columnSetUtil)
    };
  }
};

});