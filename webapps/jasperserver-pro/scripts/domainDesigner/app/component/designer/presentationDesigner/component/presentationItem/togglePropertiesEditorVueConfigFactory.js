define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var template = require("text!./template/togglePropertiesEditor.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      template: template,
      props: ['item', 'eventName'],
      components: {
        cell: options.cell
      },
      methods: {
        onTogglePropertiesEditor: function onTogglePropertiesEditor() {
          options.presentationDesignerEventBus.trigger('toggle:' + this.eventName + 'PropertiesEditor', this.item);
        }
      }
    };
  }
};

});