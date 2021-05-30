define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BaseComponentModel = require('./BaseComponentModel');

var jiveTypes = require('../enum/jiveTypes');

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BaseComponentModel.extend({
  defaults: function defaults() {
    return {
      id: null,
      server: '',
      type: jiveTypes.WEBFONTS,
      webfonts: []
    };
  },
  initialize: function initialize(attrs) {
    if (attrs && attrs.webfonts) {
      this._handleWebfonts(attrs.webfonts);
    }

    BaseComponentModel.prototype.initialize.apply(this, arguments);
  },
  _handleWebfonts: function _handleWebfonts(webfonts) {
    var serverUri = this.get('server'),
        modulesToLoad = _.map(webfonts, function (webfont) {
      return 'csslink!' + serverUri + webfont.path;
    });

    if (!_.isEmpty(modulesToLoad)) {
      require(modulesToLoad, function () {} // TODO: add fix for IE
      );
    }
  }
});

});