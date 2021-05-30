define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  convert: function convert(options) {
    var parentId = options.parentId,
        presentationItemsGroupedByEntity = options.presentationItemsGroupedByEntity;
    return _.reduce(presentationItemsGroupedByEntity, function (memo, element) {
      _.each(element.presentationItems, function (presentationItem) {
        var presentationItemWithParentId = _.extend({}, presentationItem, {
          parentId: parentId
        });

        memo.push(presentationItemWithParentId);
      });

      return memo;
    }, []);
  }
};

});