define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var presentationDesignerEventBus = options.presentationDesignerEventBus;
    return {
      methods: {
        selectItem: function selectItem(item, $event) {
          if (!$event.shiftKey && !$event.ctrlKey && !$event.metaKey) {
            presentationDesignerEventBus.trigger('presentationItem:select', item);
          }
        },
        addToRangeSelection: function addToRangeSelection(item) {
          presentationDesignerEventBus.trigger('presentationItem:addToSelectionRange', item);
        },
        toggleItemSelection: function toggleItemSelection(item) {
          presentationDesignerEventBus.trigger('presentationItem:toggleSelection', item);
        }
      }
    };
  }
};

});