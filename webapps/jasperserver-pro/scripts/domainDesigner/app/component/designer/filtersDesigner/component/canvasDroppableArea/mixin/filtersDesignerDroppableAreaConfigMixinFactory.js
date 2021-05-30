define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var eventBus = options.eventBus;
    return {
      computed: {
        droppableConfig: function droppableConfig() {
          return {
            el: ':el',
            drop: this.drop,
            over: this.over,
            out: this.out,
            test: this.test,
            tolerance: 'pointer'
          };
        }
      },
      methods: {
        drop: function drop(e, resource) {
          this.isOver = false;
          eventBus.trigger('canvasDroppableArea:drop', resource);
        },
        over: function over() {
          this.isOver = true;
        },
        out: function out() {
          this.isOver = false;
        },
        test: function test(data) {
          return !_.isEmpty(data);
        }
      }
    };
  }
};

});