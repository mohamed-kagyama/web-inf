define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var joinsDesignerEventBus = options.joinsDesignerEventBus;
    return {
      methods: {
        toggleJoinTree: function toggleJoinTree() {
          joinsDesignerEventBus.trigger('toggle:draftJoinTree', {
            isExpanded: this.joinTree.isExpanded
          });
        },
        removeJoinTree: function removeJoinTree() {
          joinsDesignerEventBus.trigger('remove:draftJoinTree');
        }
      }
    };
  }
};

});