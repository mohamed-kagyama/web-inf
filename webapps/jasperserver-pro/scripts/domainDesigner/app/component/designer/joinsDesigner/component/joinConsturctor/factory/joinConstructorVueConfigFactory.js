define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var template = require("text!../template/joinConstructorVueTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var LeftDroppableArea = options.LeftDroppableArea,
        RightDroppableArea = options.RightDroppableArea,
        joinsDesignerEventBus = options.joinsDesignerEventBus;
    return {
      template: template,
      mixins: options.mixins,
      components: {
        leftDroppableArea: LeftDroppableArea,
        rightDroppableArea: RightDroppableArea
      },
      props: ['joinConstructor'],
      methods: {
        onRightDroppableAreaDrop: function onRightDroppableAreaDrop(resource) {
          var joinConstructor = _.cloneDeep(this.joinConstructor);

          joinsDesignerEventBus.trigger(this.rightDroppableAreaDropEvent, joinConstructor, resource);
        },
        onLeftDroppableAreaRemove: function onLeftDroppableAreaRemove() {
          joinsDesignerEventBus.trigger(this.leftDroppableAreaRemoveEvent);
        }
      }
    };
  }
};

});