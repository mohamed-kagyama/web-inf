define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var lazyDraggableMixin = require("../../../../../../common/mixin/draggable/lazyDraggableMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var presentationDesignerEventBus = options.presentationDesignerEventBus,
        presentationItemsDraggableLabelFactory = options.presentationItemsDraggableLabelFactory,
        presentationItemsDraggableDataFactory = options.presentationItemsDraggableDataFactory,
        presentationItemsOnDragStartOptionsFactory = options.presentationItemsOnDragStartOptionsFactory;
    return {
      created: function created() {
        this.draggable = {
          selector: ':el',
          containment: 'body',
          scroll: false,
          onDragStart: 'dragStart',
          onDrag: 'drag',
          onDragStop: 'dragStop'
        };
      },
      mounted: function mounted() {
        this._initializeDraggable();
      },
      methods: _.extend({
        dragStart: function dragStart(options, event) {
          var item = {
            id: this.item.id,
            type: this.item.modelType,
            parentId: this.item.parentId,
            name: this.item.name,
            index: this.item.index,
            dataIslandId: this.item.dataIslandId
          };
          options = presentationItemsOnDragStartOptionsFactory.getOptions({
            item: item,
            event: event
          });
          var label = presentationItemsDraggableLabelFactory.getDraggableLabel(options),
              data = presentationItemsDraggableDataFactory.getDraggableData(options);
          presentationDesignerEventBus.trigger('canvas:dragStart', options);
          return {
            label: label,
            data: data
          };
        },
        drag: function drag(data, options, event) {
          presentationDesignerEventBus.trigger('canvas:drag', event);
        },
        dragStop: function dragStop() {
          presentationDesignerEventBus.trigger('canvas:dragStop');

          this._destroyDraggable();
        }
      }, lazyDraggableMixin)
    };
  }
};

});