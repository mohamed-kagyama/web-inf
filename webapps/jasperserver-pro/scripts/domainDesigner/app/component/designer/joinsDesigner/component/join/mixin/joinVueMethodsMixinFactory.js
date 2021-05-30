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
          joinsDesignerEventBus.trigger('toggle:join', {
            id: this.join.id,
            isExpanded: this.join.isExpanded,
            joinTreeId: this.join.joinTreeId
          });
        },
        removeJoin: function removeJoin() {
          joinsDesignerEventBus.trigger('remove:join', {
            id: this.join.id,
            joinTreeId: this.join.joinTreeId
          });
        },
        selectJoinType: function selectJoinType(type) {
          joinsDesignerEventBus.trigger('update:join', {
            id: this.join.id,
            joinTreeId: this.join.joinTreeId
          }, {
            type: type
          });
        },
        selectJoinWeight: function selectJoinWeight(weight) {
          joinsDesignerEventBus.trigger('update:join', {
            id: this.join.id,
            joinTreeId: this.join.joinTreeId
          }, {
            weight: weight
          });
        },
        isJoinTypeSelected: function isJoinTypeSelected(type) {
          return this.join.type === type;
        },
        isJoinWeightSelected: function isJoinWeightSelected(weight) {
          return parseInt(this.join.weight, 10) === weight;
        }
      }
    };
  }
};

});