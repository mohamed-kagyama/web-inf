define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.Collection.extend({
  findComponentDeep: function findComponentDeep(componentType) {
    var components = this.filter({
      componentType: componentType
    });
    var childComponents = this.reduce(function (res, model) {
      return res.concat(model.components.findComponentDeep(componentType));
    }, []);
    return components.concat(childComponents);
  }
});

});