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
        toggleJoin: function toggleJoin() {
          joinsDesignerEventBus.trigger('toggle:draftJoinTreeJoin', {
            isExpanded: this.join.isExpanded
          });
        },
        removeJoin: function removeJoin() {
          joinsDesignerEventBus.trigger('remove:draftJoinTreeJoin');
        },
        selectJoinType: function selectJoinType(type) {
          joinsDesignerEventBus.trigger('update:draftJoinTreeJoin:type', {
            type: type
          });
        },
        selectJoinWeight: function selectJoinWeight(weight) {
          joinsDesignerEventBus.trigger('update:draftJoinTreeJoin:weight', {
            weight: weight
          });
        }
      }
    };
  }
};

});