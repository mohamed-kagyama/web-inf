define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var ClickMenu = require("runtime_dependencies/js-sdk/src/common/component/menu/ClickMenu");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = ClickMenu.extend({
  constructor: function constructor(options) {
    options = options || {};
    var attachTo = $(options.el),
        menuOptions = options.menuOptions;
    this.eventBus = options.eventBus;
    ClickMenu.call(this, menuOptions, attachTo, {
      menuToggleMode: true,
      menuOptionTemplate: options.menuOptionTemplate
    });

    this._initMenuOptionsEvents(menuOptions);
  },
  _initMenuOptionsEvents: function _initMenuOptionsEvents(menuOptions) {
    _.each(menuOptions, function (menuOption) {
      this.listenTo(this, 'option:' + menuOption.action, _.partial(this._onMenuAction, menuOption.triggerEvent, menuOption));
    }, this);
  },
  _onMenuAction: function _onMenuAction(triggerEvent, menuOption) {
    this.hide();
    this.eventBus.trigger(triggerEvent, menuOption);
  }
});

});