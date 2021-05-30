define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var SaveMenuOptionsFactory = function SaveMenuOptionsFactory(options) {
  this.initialize(options);
};

_.extend(SaveMenuOptionsFactory.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, '_isSaved');

    this.clientResourcePropertiesService = options.clientResourcePropertiesService;
  },
  create: function create() {
    return [{
      label: i18nMessage('domain.designer.menu.save'),
      triggerEvent: 'save',
      action: 'save'
    }, {
      label: i18nMessage('domain.designer.menu.saveAs'),
      action: 'saveAs',
      triggerEvent: 'saveAs',
      test: this._isSaved
    }];
  },
  _isSaved: function _isSaved() {
    return this.clientResourcePropertiesService.isDomainSaved();
  }
});

module.exports = SaveMenuOptionsFactory;

});