define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var lazyDroppableDirective = require("../../../../../common/vue/directive/lazyDroppableDirective");

var template = require("text!./template/lastRowTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var presentationDesignerEventBus = options.presentationDesignerEventBus,
        dropItemsIntoDropZoneSpecification = options.dropItemsIntoDropZoneSpecification,
        presentationDesignerLastRowDropZonePropertiesFactory = options.presentationDesignerLastRowDropZonePropertiesFactory;
    return {
      template: template,
      directives: {
        droppable: lazyDroppableDirective
      },
      mixins: options.mixins,
      props: ['lastRow', 'column0Width', 'column1Width'],
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
        heightInPx: function heightInPx() {
          return this.lastRow.height + 'px';
        },
        visibility: function visibility() {
          if (this.isHovered) {
            return {
              display: 'block'
            };
          }

          return {};
        }
      },
      methods: {
        drop: function drop(event, items) {
          this.isHovered = false;
          presentationDesignerEventBus.trigger('dropZone:drop', items, this.getDropZoneProperties(items));
        },
        over: function over() {
          presentationDesignerEventBus.trigger("lastRowDropZone:over");
          this.isHovered = true;
        },
        out: function out() {
          this.isHovered = false;
        },
        shouldBeDroppable: function shouldBeDroppable(items) {
          if (_.isEmpty(items)) {
            return false;
          }

          return dropItemsIntoDropZoneSpecification.isSatisfiedBy(items, this.getDropZoneProperties(items));
        },
        getDropZoneProperties: function getDropZoneProperties(items) {
          return presentationDesignerLastRowDropZonePropertiesFactory.create({
            items: items,
            lastRow: this.lastRow
          });
        }
      }
    };
  }
};

});