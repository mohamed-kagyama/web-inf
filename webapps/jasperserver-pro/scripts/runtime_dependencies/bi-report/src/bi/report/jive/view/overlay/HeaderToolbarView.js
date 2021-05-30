define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var $ = require('jquery');

var _ = require('underscore');

var OptionContainer = require("runtime_dependencies/js-sdk/src/common/component/base/OptionContainer");

var HoverMenu = require("runtime_dependencies/js-sdk/src/common/component/menu/HoverMenu");

var cascadingMenuTrait = require("runtime_dependencies/js-sdk/src/common/component/menu/cascadingMenuTrait");

var headerToolbarTemplate = require("text!./template/headerToolbarTemplate.htm");

var headerToolbarButtonTemplate = require("text!./template/headerToolbarButtonTemplate.htm");

var dropdownMenuTemplate = require("text!./template/dropdownMenuTemplate.htm");

var dropdownOptionTemplate = require("text!./template/dropdownOptionTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CascadingHoverMenu = HoverMenu.extend(cascadingMenuTrait);
var HeaderToolbarView = Backbone.View.extend({
  events: {
    'mousedown button': '_onMouseTouchDown',
    'touchstart button': '_onMouseTouchDown',
    'mouseup button': '_onMouseTouchUp',
    'touchend button': '_onMouseTouchUp'
  },
  initialize: function initialize(options) {
    options = options || {};
    this.parentElement = options.parentElement ? $(options.parentElement) : $('body');
    var buttons = options.buttons || [];
    this.buttons = new OptionContainer({
      contextName: 'button',
      mainTemplate: headerToolbarTemplate,
      contentContainer: '.jive_button_bar_options',
      optionTemplate: headerToolbarButtonTemplate,
      options: buttons
    });
    this.resetCurrentButton();
    this.initEvents();
    this.initHoverMenus();
    this.setElement(this.buttons.$el);
    this.rendered = false;
    Backbone.View.prototype.initialize.apply(this, arguments);
  },
  initEvents: function initEvents() {
    this.listenTo(this.buttons, 'mouseover', this._onMouseOver);
    this.listenTo(this.buttons, 'mouseout', this._onMouseOut);
    this.listenTo(this.buttons, 'button:select button:sortAsc button:sortDesc button:filter', this._onSelect);
  },
  initHoverMenus: function initHoverMenus() {
    this.cascadingMenus = [];

    _.each(this.buttons.options, function (option) {
      var hoverMenuOptions = option.model.get('hoverMenuOptions');

      if (hoverMenuOptions) {
        var cascadingMenu = new CascadingHoverMenu(hoverMenuOptions, option.$el, null, {
          menuContainerTemplate: dropdownMenuTemplate,
          menuOptionTemplate: dropdownOptionTemplate
        });
        this.listenTo(cascadingMenu, 'option:select', this._onSelect);
        this.cascadingMenus.push(cascadingMenu);
      }
    }, this);
  },
  _onSelect: function _onSelect(buttonView, buttonModel, e) {
    this.trigger('select', buttonView, buttonModel, e);
  },
  _onMouseTouchDown: function _onMouseTouchDown(e) {
    if (this.currentButton) {
      var buttonView = this.currentButton;
      !buttonView.$el.hasClass('disabled') && buttonView.$el.addClass('pressed');
    }

    return false;
  },
  _onMouseTouchUp: function _onMouseTouchUp(e) {
    if (this.currentButton) {
      this.currentButton.$el.removeClass('pressed');
    }

    return false;
  },
  _onMouseOver: function _onMouseOver(buttonView, buttons, model) {
    this.resetCurrentButton(buttonView);
    !buttonView.$el.hasClass('disabled') && buttonView.$el.addClass('over');
  },
  _onMouseOut: function _onMouseOut(buttonView, buttons, model) {
    this.resetCurrentButton();
    buttonView.$el.removeClass('over pressed');
  },
  resetCurrentButton: function resetCurrentButton(buttonView) {
    this.currentButton = buttonView ? buttonView : null;
  },
  resetButtonsClasses: function resetButtonsClasses() {
    this.$el.find('button').removeClass('over pressed disabled');
  },
  disableButtons: function disableButtons() {
    this.$el.find('button').addClass('disabled');
  },
  setPosition: function setPosition(options) {
    this.$el.position(options);
    return this;
  },
  show: function show(disable) {
    this.resetButtonsClasses();
    !disable && this.disableButtons();
    this.$el.show();
    return this;
  },
  hide: function hide() {
    this.$el.hide();
    return this;
  },
  render: function render() {
    this.parentElement.append(this.$el);
    this.rendered = true;
    return this;
  },
  remove: function remove() {
    Backbone.View.prototype.remove.apply(this, arguments);
    this.rendered = false;
    this.buttons && this.buttons.remove();

    _.invoke(this.cascadingMenus, 'remove');
  }
});
module.exports = HeaderToolbarView;

});