define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var measureOrDimensionEnum = require('../../../../../../model/schema/enum/measureOrDimensionEnum');

var template = require("text!./template/treeNode.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      template: template,
      components: {
        dropZoneActivator: options.dropZoneActivator
      },
      mixins: options.mixins,
      props: ['item', 'nestingLevelClass', 'treeNodeClass', 'treeIconClass', 'toggleNodeClass', 'eventName'],
      computed: {
        labelOrName: function labelOrName() {
          return this.item.label || this.item.name;
        },
        nestingLevelClass: function nestingLevelClass() {
          return this.treeNodeClass + '-' + this.item.nestingLevel;
        },
        treeNodeKindClass: function treeNodeKindClass() {
          var treeNodeKindClass = '';

          if (this.item.kind === measureOrDimensionEnum.MEASURE) {
            treeNodeKindClass = 'jr-mTree-leafMeasure';
          } else if (this.item.kind === measureOrDimensionEnum.DIMENSION) {
            treeNodeKindClass = 'jr-mTree-leafField';
          }

          return treeNodeKindClass;
        }
      },
      methods: {
        onToggle: function onToggle() {
          if (this.toggleNodeClass) {
            options.presentationDesignerEventBus.trigger('toggle:' + this.eventName, this.item);
          }
        }
      }
    };
  }
};

});