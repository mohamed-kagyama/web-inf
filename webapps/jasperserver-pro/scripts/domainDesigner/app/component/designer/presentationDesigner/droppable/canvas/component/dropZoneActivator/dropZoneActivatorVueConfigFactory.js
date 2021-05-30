define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var template = require("text!./template/dropZoneActivatorTemplate.htm");

var extractDataFromDraggable = require("../../../../../../../common/util/extractDataFromDraggable");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var presentationDesignerEventBus = options.presentationDesignerEventBus,
        dropItemsIntoDropZoneSpecification = options.dropItemsIntoDropZoneSpecification;
    return {
      template: template,
      props: ['index', 'which', 'ownerId', 'accepts', 'parentId', 'dataIslandId'],
      computed: {
        droppableConfig: function droppableConfig() {
          return {
            drop: this.drop,
            over: this.over,
            out: this.out,
            tolerance: 'pointer',
            test: this.isDroppableZoneShouldBeActivated
          };
        }
      },
      methods: {
        enter: function enter() {
          if (this.isDroppableZoneShouldBeActivated(extractDataFromDraggable())) {
            presentationDesignerEventBus.trigger('dropZoneActivator:over', this.getDropZoneActivatorProperties());
          }
        },
        leave: function leave() {
          if (this.isDroppableZoneShouldBeActivated(extractDataFromDraggable())) {
            presentationDesignerEventBus.trigger('dropZoneActivator:out', this.getDropZoneActivatorProperties());
          }
        },
        isDroppableZoneShouldBeActivated: function isDroppableZoneShouldBeActivated(items) {
          return dropItemsIntoDropZoneSpecification.isSatisfiedBy(items, this.getDropZoneActivatorProperties());
        },
        getDropZoneActivatorProperties: function getDropZoneActivatorProperties() {
          return {
            index: this.index,
            which: this.which,
            ownerId: this.ownerId,
            accepts: this.accepts,
            parentId: this.parentId,
            dataIslandId: this.dataIslandId
          };
        }
      }
    };
  }
};

});