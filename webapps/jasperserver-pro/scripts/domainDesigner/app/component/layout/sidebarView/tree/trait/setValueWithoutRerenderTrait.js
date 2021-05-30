define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  setValue: function setValue(selection, options) {
    options = options || {
      renderSelection: true
    };
    this.model.select(selection, {
      silent: true
    });

    if (options.renderSelection) {
      this._selectVisibleItems(selection);
    }

    return this;
  },
  _selectVisibleItems: function _selectVisibleItems(selection) {
    var bufferStartIndex = this.model.get("bufferStartIndex");

    _.each(this.model.get("items"), function (item, index) {
      var itemIndex = index + bufferStartIndex,
          isSelected = _.indexOf(selection, item.value) !== -1;
      isSelected ? this._selectItemByIndex(itemIndex) : this._deselectItemByIndex(itemIndex);
    }, this);
  }
};

});