define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var lazyDroppableDirective = require("../../../../../../common/vue/directive/lazyDroppableDirective");

var template = require("text!../template/joinsDesignerInitialDropZoneVueTemplate.htm");

var i18nComputed = require("../../../../../../common/vue/computed/i18nComputed");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var joinsDesignerEventBus = options.joinsDesignerEventBus;
    return {
      template: template,
      data: function data() {
        return {
          isOver: false
        };
      },
      props: ['isActive', 'isEmptyDataStructure'],
      directives: {
        droppable: lazyDroppableDirective
      },
      computed: _.extend({
        isDropZoneActive: function isDropZoneActive() {
          return this.isActive && !this.isOver;
        },
        droppableConfig: function droppableConfig() {
          return {
            drop: this.drop,
            over: this.over,
            out: this.out,
            tolerance: 'pointer',
            test: this.shouldBeDroppable
          };
        }
      }, i18nComputed),
      methods: {
        drop: function drop(event, item) {
          this.isOver = false;
          joinsDesignerEventBus.trigger('initialDropZone:drop', item);
        },
        over: function over() {
          this.isOver = true;
        },
        out: function out() {
          this.isOver = false;
        },
        shouldBeDroppable: function shouldBeDroppable(data) {
          return this.isActive && !_.isEmpty(data);
        }
      }
    };
  }
};

});