define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var template = require("text!./template/emptyDataIslandsTemplate.htm");

var lazyDroppableDirective = require("../../../../../common/vue/directive/lazyDroppableDirective");

var i18nComputed = require("../../../../../common/vue/computed/i18nComputed");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var presentationDesignerEventBus = options.presentationDesignerEventBus,
        dropAcceptedByDropZoneResourcesSpecification = options.dropAcceptedByDropZoneResourcesSpecification;
    return {
      props: ['dropZone', 'column0Width', 'isEmptyDataStructure'],
      template: template,
      mixins: options.mixins,
      computed: _.extend({
        droppableConfig: function droppableConfig() {
          return {
            drop: this.drop,
            over: this.over,
            out: this.out,
            test: this.canDropItems,
            tolerance: 'pointer'
          };
        }
      }, i18nComputed),
      directives: {
        droppable: lazyDroppableDirective
      },
      methods: {
        canDropItems: function canDropItems(items) {
          return dropAcceptedByDropZoneResourcesSpecification.isSatisfiedBy(items, this.dropZone);
        },
        drop: function drop(event, items) {
          presentationDesignerEventBus.trigger('emptyDataIslandsDropZone:drop', items);
        },
        over: function over() {
          presentationDesignerEventBus.trigger('emptyDataIslandsDropZone:over');
        },
        out: function out() {
          presentationDesignerEventBus.trigger('emptyDataIslandsDropZone:out');
        }
      }
    };
  }
};

});