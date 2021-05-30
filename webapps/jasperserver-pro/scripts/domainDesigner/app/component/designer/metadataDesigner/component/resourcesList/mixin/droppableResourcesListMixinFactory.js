define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var droppableViewMixin = require("../../../../../../common/mixin/droppable/droppableViewMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var accept = options.accept;
    return {
      created: function created() {
        this.droppable = {
          el: ':el',
          drop: 'drop',
          accept: accept,
          tolerance: 'pointer'
        };
      },
      methods: _.extend({
        drop: function drop(event, resources) {
          this.$emit('drop', this.processResources(resources));
        },
        processResources: function processResources(resources) {
          resources = _.isArray(resources) ? resources : [resources];
          return _.map(resources, function (resourceElement) {
            return _.cloneDeep(resourceElement.resource);
          });
        }
      }, droppableViewMixin)
    };
  }
};

});