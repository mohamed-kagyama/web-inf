define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var joinsDesignerEventBus = options.joinsDesignerEventBus,
        isResourceDroppableIntoJoinTreeSpecification = options.isResourceDroppableIntoJoinTreeSpecification;
    return {
      methods: {
        drop: function drop(event, item) {
          this.isHovered = false;
          joinsDesignerEventBus.trigger('joinTree:drop', {
            joinTreeId: this.joinTree.id,
            item: item
          });
        },
        over: function over() {
          this.isHovered = true;
        },
        out: function out() {
          this.isHovered = false;
        },
        shouldBeDroppable: function shouldBeDroppable(data) {
          var isEmptyArray = _.isArray(data) && _.isEmpty(data);

          if (isEmptyArray) {
            return false;
          }

          return isResourceDroppableIntoJoinTreeSpecification.isSatisfiedBy({
            resource: data.resource,
            joinTreeId: this.joinTree.id
          });
        }
      }
    };
  }
};

});