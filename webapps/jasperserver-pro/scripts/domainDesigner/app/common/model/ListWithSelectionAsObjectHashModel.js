define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var addToSelectionModelTrait = require("runtime_dependencies/js-sdk/src/components/scalableList/model/trait/addToSelectionModelTrait");

var ListWithSelectionAsObjectHashModel = require("runtime_dependencies/js-sdk/src/components/scalableList/model/ListWithSelectionAsObjectHashModel");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = ListWithSelectionAsObjectHashModel.extend(addToSelectionModelTrait).extend({
  fetch: function fetch(options) {
    options = _.extend({
      top: this.get('bufferStartIndex') || 0,
      bottom: this.get('bufferEndIndex') || this.bufferSize - 1
    }, options);

    if (options.force || this._isBufferReloadNecessary(options.top, options.bottom)) {
      if (options.top !== this.attributes.bufferStartIndex || options.bottom !== this.attributes.bufferEndIndex) {
        var bufferCenter = options.top + Math.floor((options.bottom - options.top) / 2);
        var bufferHalf = Math.floor(this.bufferSize / 2);
        this.attributes.bufferStartIndex = Math.max(0, bufferCenter - bufferHalf);
      }

      this.attributes.bufferEndIndex = this.attributes.bufferStartIndex + this.bufferSize - 1;
      this.getData({
        offset: this.get('bufferStartIndex'),
        limit: this.get('bufferEndIndex') - this.get('bufferStartIndex') + 1
      }).done(this._fetchComplete).fail(this.fetchFailed);
    } else {
      this.afterFetchComplete && this.afterFetchComplete(this.get('items'), this.get('total'));
    }
  }
});

});