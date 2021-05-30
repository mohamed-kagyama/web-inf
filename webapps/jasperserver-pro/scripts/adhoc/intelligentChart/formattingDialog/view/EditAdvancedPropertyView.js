define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var i18n = require("bundle!adhoc_messages");

var templateEditAdvancedProperty = require("text!../template/EditAdvancedPropertyTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.View.extend({
  template: _.template(templateEditAdvancedProperty),
  tagName: 'tr',
  className: 'edit',
  initialize: function initialize(attrs, options) {
    options = options || {};
    this.editMode = options.editMode;
    this.render();
    this.originalModelValues = this.model.toJSON();
    this.listenTo(this.model, 'validated', this._onValidated);
  },
  events: {
    'click .save.button': '_save',
    'click .cancel.button': '_cancel'
  },
  render: function render() {
    this.$el.html(this.template(_.extend({}, this.model.attributes, {
      i18n: i18n
    })));
    return this;
  },
  _save: function _save() {
    var values = this._getValues();

    this.model.set(values, {
      validate: true
    });

    if (this.model.isValid()) {
      this.trigger(this.editMode ? 'edit' : 'add', this, this.model);
    }
  },
  _onValidated: function _onValidated() {
    if (this.model.validationError && this.model.validationError.name) {
      this.$('td.name').addClass('error');
      this.$('td.name .warning').removeClass('hidden');
    } else {
      this.$('td.name').removeClass('error');
      this.$('td.name .warning').addClass('hidden');
    }

    if (this.model.validationError && this.model.validationError.value) {
      this.$('td.value').addClass('error');
      this.$('td.value .warning').removeClass('hidden');
    } else {
      this.$('td.value').removeClass('error');
      this.$('td.value .warning').addClass('hidden');
    }
  },
  _getValues: function _getValues() {
    return {
      name: this.$('input').val(),
      value: this.$('textarea').val()
    };
  },
  _cancel: function _cancel() {
    this.trigger('cancel', this, this.model, this.originalModelValues);
  }
});

});