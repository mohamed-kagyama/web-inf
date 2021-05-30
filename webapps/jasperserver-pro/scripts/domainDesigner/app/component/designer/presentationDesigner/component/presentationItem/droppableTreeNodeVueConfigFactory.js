define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var lazyDroppableDirective = require("../../../../../common/vue/directive/lazyDroppableDirective");

var dropZonePositionEnum = require("../../enum/dropZonePositionEnum");

var dropZonesAcceptTypesEnum = require("../../droppable/canvas/enum/dropZonesAcceptTypesEnum");

var template = require("text!./template/droppableTreeNode.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var treeNode = options.treeNode,
        dropItemsIntoDropZoneSpecification = options.dropItemsIntoDropZoneSpecification,
        presentationDesignerEventBus = options.presentationDesignerEventBus;
    return {
      template: template,
      directives: {
        droppable: lazyDroppableDirective
      },
      components: {
        treeNode: treeNode
      },
      props: ['item', 'nestingLevelClass', 'treeNodeClass', 'treeIconClass', 'toggleNodeClass', 'eventName'],
      computed: {
        droppableConfig: function droppableConfig() {
          return {
            drop: this.drop,
            test: this.isDroppableZoneShouldBeActivated,
            tolerance: 'pointer'
          };
        }
      },
      methods: {
        drop: function drop(event, items) {
          presentationDesignerEventBus.trigger('dropZone:drop', items, this.getDropZoneProperties());
        },
        isDroppableZoneShouldBeActivated: function isDroppableZoneShouldBeActivated(items) {
          return dropItemsIntoDropZoneSpecification.isSatisfiedBy(items, this.getDropZoneProperties());
        },
        getDropZoneProperties: function getDropZoneProperties() {
          return {
            ownerId: this.item.id,
            parentId: this.item.parentId,
            dataIslandId: this.item.dataIslandId || this.item.id,
            which: dropZonePositionEnum.MIDDLE,
            accepts: dropZonesAcceptTypesEnum.SIDEBAR_RESOURCES_SETS_AND_ITEMS
          };
        }
      }
    };
  }
};

});