define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var _ = require('underscore');

var $ = require('jquery');

var domUtil = require("runtime_dependencies/js-sdk/src/common/util/domUtil");

var AlertDialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/AlertDialog");

var i18n = require("bundle!DashboardBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.View.extend({
  template: _.template(''),
  el: function el() {
    return this.template({
      i18n: i18n
    });
  },
  initialize: function initialize(options) {
    this.ready = new $.Deferred();
    this.dashboardProperties = options.dashboardProperties;
    this.dashboardId = options.dashboardId;
    this.listenTo(this.model, 'change', this._onPropertiesChange);
    this.listenTo(this.model, 'change:interactive', function () {
      this.model.get('interactive') ? this.removeOverlay() : this.addOverlay();
    });

    _.bindAll(this, '_onWindowResize');

    $(window).on('resize', this._onWindowResize);
    this._onViewInitialize && this._onViewInitialize();
    this._initComponent && this._initComponent();
  },
  render: function render() {
    this._onViewRender && this._onViewRender();
    this._renderComponent && this._renderComponent();
    return this;
  },
  resize: function resize() {
    this._onViewResize && this._onViewResize();
    this._resizeComponent && this._resizeComponent();
  },
  remove: function remove(options) {
    this.removeOverlay();
    this._errorDialog && this._errorDialog.remove();
    $(window).off('resize', this._onWindowResize);
    this._removeComponent && this._removeComponent(options);
    this._onViewRemove && this._onViewRemove();
    Backbone.View.prototype.remove.apply(this, arguments);
  },
  addOverlay: function addOverlay() {},
  removeOverlay: function removeOverlay() {
    this.$overlay && this.$overlay.remove();
    this.$overlay = null;
  },
  showErrorDialog: function showErrorDialog(msg) {
    var offset = domUtil.getElementOffset(this.$el[0]),
        width = this.$el.width(),
        height = this.$el.height();

    if (!this._errorDialog) {
      this._errorDialog = new AlertDialog({
        modal: false
      });
    }

    this._errorDialog.setMessage(msg.toString());

    this._errorDialog.open({
      top: height / 3 + offset.top,
      left: width / 3 + offset.left
    });
  },
  _onPropertiesChange: function _onPropertiesChange() {
    this._onComponentPropertiesChange && this._onComponentPropertiesChange();
  },
  _onWindowResize: function _onWindowResize(e) {
    //hack which prevent jquery ui resize event from bubbling to window.
    //See http://bugs.jquery.com/ticket/9841
    if (!e.target.tagName) {
      this.resizeTimer && clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(_.bind(this.resize, this), 300);
    }
  }
});

});