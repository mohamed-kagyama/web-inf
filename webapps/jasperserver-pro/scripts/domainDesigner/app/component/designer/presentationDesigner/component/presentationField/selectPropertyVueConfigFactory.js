define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      template: options.template,
      props: ['items', 'id', 'propertyName', 'label', 'dataName'],
      components: options.components,
      methods: {
        onChange: function onChange(value) {
          var result = {};
          result[this.propertyName] = value;
          options.presentationDesignerEventBus.trigger('update:presentationField', this.id, result);
        }
      }
    };
  }
};

});