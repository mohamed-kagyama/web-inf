define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var textTrait = require('../../base/componentViewTrait/textTrait');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = _.extend({}, textTrait, {
  /**
   * @memberof textTrait
   * @desc renders component
   * @access protected
   * @fires componentRendered
   */
  _renderComponent: function _renderComponent() {
    var text = this.model.get('text');
    this.component.render(text);
    this.trigger('componentRendered', this);
  },
  resize: function resize() {
    this.component.applyFontSize();
  }
});

});