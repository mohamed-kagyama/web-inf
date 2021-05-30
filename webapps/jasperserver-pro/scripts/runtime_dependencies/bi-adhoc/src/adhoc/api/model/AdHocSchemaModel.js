define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function findInGroup(group, reference) {
  var res;

  for (var i = group.length - 1; i > -1 && !res; i--) {
    if (group[i].group) {
      res = findInGroup(group[i].group.elements, reference);
    } else if (group[i].element) {
      if (group[i].element.hierarchicalName === reference) {
        res = group[i].element;
      }
    } else {
      throw new Error('Unknown element type in schema');
    }
  }

  return res;
}

var AdHocSchemaModel = Backbone.Model.extend({
  initialize: function initialize(arr, args) {
    this.contextPath = args.contextPath;
  },
  getByReference: function getByReference(reference) {
    return findInGroup(this.get('presentation'), reference);
  }
});
module.exports = AdHocSchemaModel;

});