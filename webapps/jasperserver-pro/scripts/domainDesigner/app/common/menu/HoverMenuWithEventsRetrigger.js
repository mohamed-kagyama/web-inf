define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var HoverMenu = require("runtime_dependencies/js-sdk/src/common/component/menu/HoverMenu");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = HoverMenu.extend({
  constructor: function constructor(options) {
    options = options || {};
    var attachTo = $(options.el),
        menuOptions = options.menuOptions;
    this.eventBus = options.eventBus;
    HoverMenu.call(this, menuOptions, attachTo, undefined, {
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
    //Need to trigger this in order to force menu hide
    this.trigger('selectionMade');
    this.eventBus.trigger(triggerEvent, menuOption);
  }
});

});