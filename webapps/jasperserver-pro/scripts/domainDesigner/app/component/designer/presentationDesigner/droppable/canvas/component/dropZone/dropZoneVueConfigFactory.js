define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var lazyDroppableDirective = require("../../../../../../../common/vue/directive/lazyDroppableDirective");

var template = require("text!./template/dropZoneTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var presentationDesignerEventBus = options.presentationDesignerEventBus;
    return {
      template: template,
      props: ['dropZone'],
      directives: {
        droppable: lazyDroppableDirective
      },
      computed: {
        droppableConfig: function droppableConfig() {
          return {
            drop: this.drop,
            tolerance: 'pointer'
          };
        },
        visibility: function visibility() {
          if (this.dropZone.isVisible) {
            return {
              display: 'block'
            };
          }

          return {};
        }
      },
      methods: {
        drop: function drop(event, items) {
          presentationDesignerEventBus.trigger('dropZone:drop', items, {
            ownerId: this.dropZone.ownerId,
            parentId: this.dropZone.parentId,
            index: this.dropZone.index,
            which: this.dropZone.which,
            accepts: this.dropZone.accepts
          });
        }
      }
    };
  }
};

});