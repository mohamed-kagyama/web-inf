define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var entityUtil = require("../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function sortChildren(children) {
  var result = children.reduce(function (memo, child) {
    var setChildren = [];

    if (entityUtil.isPresentationSet(child)) {
      setChildren = sortChildren(child.children);
      child.children.fromArray(setChildren);
      memo.sets.push(child);
    } else if (entityUtil.isPresentationField(child)) {
      memo.fields.push(child);
    }

    return memo;
  }, {
    sets: [],
    fields: []
  });
  return result.fields.concat(result.sets);
}

module.exports = {
  sort: function sort(collections) {
    collections.dataIslands.each(function (dataIsland) {
      var children = sortChildren(dataIsland.children);
      dataIsland.children.fromArray(children);
    });
    return collections;
  }
};

});