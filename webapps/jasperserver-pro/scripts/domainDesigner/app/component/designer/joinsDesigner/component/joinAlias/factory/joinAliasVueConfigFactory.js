define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var template = require("text!../template/joinAliasVueTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var joinsDesignerEventBus = options.joinsDesignerEventBus;
    return {
      template: template,
      props: ['joinAlias'],
      methods: {
        remove: function remove() {
          joinsDesignerEventBus.trigger('remove:joinAlias', this.joinAlias.id);
        }
      }
    };
  }
};

});