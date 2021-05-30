define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var lazyDroppableDirective = require("../../../../../../common/vue/directive/lazyDroppableDirective");

var template = require("text!../template/droppableAreaVueTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var mixins = options.mixins;
    return {
      template: template,
      mixins: mixins,
      props: ['state'],
      directives: {
        droppable: lazyDroppableDirective
      },
      data: function data() {
        return {
          overLabel: ''
        };
      },
      computed: {
        isPlaceholderVisible: function isPlaceholderVisible() {
          return !this.state.fieldId && !this.overLabel;
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
      },
      methods: {
        remove: function remove() {
          this.$emit('remove');
        },
        drop: function drop(event, data) {
          var resource = this.getDropAreaResource(data);
          this.overLabel = '';
          this.$emit('drop', resource);
        },
        over: function over(event, data) {
          var resource = this.getDropAreaResource(data);
          this.overLabel = resource.label;
          this.$emit('over', resource);
        },
        out: function out(event, data) {
          var resource = this.getDropAreaResource(data);
          this.overLabel = '';
          this.$emit('out', resource);
        },
        shouldBeDroppable: function shouldBeDroppable() {
          return this.state.isDropAreaEnabled;
        },
        getDropAreaResource: function getDropAreaResource(data) {
          return _.extend({
            label: data.label
          }, data.resource);
        }
      }
    };
  }
};

});