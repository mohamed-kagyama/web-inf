define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var event = options.event,
        presentationDesignerEventBus = options.presentationDesignerEventBus,
        resizerDirective = options.resizerDirective;
    return {
      directives: {
        resizer: resizerDirective
      },
      computed: {
        resizerConfig: function resizerConfig() {
          return {
            resize: this.resize
          };
        }
      },
      methods: {
        resize: function resize(options) {
          presentationDesignerEventBus.trigger(event, options);
        }
      }
    };
  }
};

});