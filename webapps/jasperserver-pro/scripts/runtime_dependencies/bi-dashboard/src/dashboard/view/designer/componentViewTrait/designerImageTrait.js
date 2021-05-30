define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var imageTrait = require('../../base/componentViewTrait/imageTrait');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = _.extend({}, imageTrait, {
  _renderComponent: function _renderComponent() {
    var uri = this.model.get('uri');
    this.component.render(uri);
    this.trigger('componentRendered', this);
  }
});

});