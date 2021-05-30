define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getDroppableFn(name, attrs) {
  var dropFn, originalCallback;

  if (name || _.isString(name)) {
    originalCallback = this[name];

    if (_.isFunction(originalCallback)) {
      dropFn = _.bind(function (event, ui) {
        var self = this,
            data = ui.helper.data('data');

        _.defer(function () {
          originalCallback.call(self, event, data, attrs);
        });
      }, this);
    }
  }

  return dropFn;
}

module.exports = getDroppableFn;

});