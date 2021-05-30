define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var $ = require('jquery');

var i18n = require("bundle!jasperserver_messages");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
* @author: Pavel Savushchik
* @version: $Id$
*/
module.exports = Backbone.View.extend({
  constructor: function constructor(options) {
    if (!options || !options.model || !(options.model instanceof Backbone.Model)) {
      throw new Error("View should have associated Backbone.Model");
    }

    Backbone.View.apply(this, arguments);
  },
  initialize: function initialize() {
    //make i18n accessible from template's scope
    this.i18n = i18n;
    this.listenTo(this.model.state, "reset change", this.updateWarningMessage, this);
    this.listenTo(this.model, "change:label", this.render);
    this.render();
  },
  render: function render() {
    this.renderStructure();
    this.renderState();
    this.model.get("visible") && this.bindCustomEventListeners();
    this.updateWarningMessage();
    this.model.get("readOnly") && this.disable();
    return this;
  },
  renderStructure: function renderStructure() {
    this.$el = $(_.template(this.template || "")(this._renderData()));
    return this;
  },
  renderState: function renderState() {
    this.updateValue(this.model.state.get("value"));
  },
  updateValue: function updateValue() {},
  bindCustomEventListeners: function bindCustomEventListeners() {},
  enable: function enable() {
    this.$el.removeClass("jr-isDisabled"); // if this component based on more complex component, let's call their enable functions

    if (this.multiSelect) {
      this.multiSelect.setDisabled(false);
      return;
    }

    if (this.singleSelect) {
      this.singleSelect.setDisabled(false);
      return;
    }

    this.$el.find("input, select").prop('disabled', false);
  },
  disable: function disable() {
    this.$el.addClass("jr-isDisabled"); // if this component based on more complex component, let's call their disable functions

    if (this.multiSelect) {
      this.multiSelect.setDisabled(true);
      return;
    }

    if (this.singleSelect) {
      this.singleSelect.setDisabled(true);
      return;
    }

    this.$el.find("input, select").prop('disabled', true);
  },
  updateWarningMessage: function updateWarningMessage() {
    var $el = this.$el.find(".jr-mInput-alert");

    if (!this.model.state.get("error") || this.model.get("isDesignerMode")) {
      $el.addClass("jr-isInvisible").text("");
    } else {
      $el.removeClass("jr-isInvisible").text(this.model.state.get("error"));
    }
  },
  remove: function remove() {
    this.model.state.off("reset change", this.updateWarningMessage, this);
    Backbone.View.prototype.remove.call(this);
  },
  _renderData: function _renderData() {
    return _.defaults({
      uuid: "jr-label-id-" + _.uniqueId(this.model.get("id")),
      message: ""
    }, this.model.toJSON());
  }
});

});