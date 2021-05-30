define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var template = require("text!../template/joinTreePlaceholderVueTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var joinsDesignerEventBus = options.joinsDesignerEventBus,
        lazyDroppableDirective = options.lazyDroppableDirective,
        isResourceDroppableIntoJoinTreePlaceholderSpecification = options.isResourceDroppableIntoJoinTreePlaceholderSpecification;
    return {
      template: template,
      directives: {
        droppable: lazyDroppableDirective
      },
      props: ['joinTreePlaceholder'],
      data: function data() {
        return {
          isHovered: false
        };
      },
      computed: {
        droppableConfig: function droppableConfig() {
          return {
            drop: this.drop,
            over: this.over,
            out: this.out,
            tolerance: 'pointer',
            test: this.shouldBeDroppable
          };
        },
        inlineStyles: function inlineStyles() {
          return this.joinTreePlaceholder.isLastJoinTreePlaceholder ? {
            height: this.joinTreePlaceholder.height + 'px'
          } : {};
        }
      },
      methods: {
        drop: function drop(event, item) {
          joinsDesignerEventBus.trigger('joinTreePlaceholder:drop', {
            item: item,
            index: this.joinTreePlaceholder.index
          });
          this.isHovered = false;
        },
        over: function over() {
          this.isHovered = true;
        },
        out: function out() {
          this.isHovered = false;
        },
        shouldBeDroppable: function shouldBeDroppable(data) {
          var isEmptyArray = _.isArray(data) && _.isEmpty(data);

          if (isEmptyArray) {
            return false;
          }

          return isResourceDroppableIntoJoinTreePlaceholderSpecification.isSatisfiedBy({
            resource: data.resource,
            joinTreePlaceholder: {
              index: this.joinTreePlaceholder.index
            }
          });
        }
      }
    };
  }
};

});