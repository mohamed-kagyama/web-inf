define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var _ = require('underscore');

var ValidationError = require('../validation/ValidationError');

require("runtime_dependencies/js-sdk/src/common/extension/backboneValidationExtension");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.View.extend({
  constructor: function constructor(options) {
    this.initOptions = options;
    this.template = _.template(options.template);
    Backbone.View.apply(this, arguments);
  },
  i18nModel: function i18nModel(serializedModel) {
    serializedModel.i18n = this.initOptions.i18n;
    return serializedModel;
  },
  serializeModel: function serializeModel() {
    return this.model.toJSON();
  },
  modelVariableName: 'value',
  initialize: function initialize(options) {
    Backbone.Validation.bind(this, {
      valid: this.validCallback,
      invalid: this.invalidCallback,
      selector: 'data-validation-field'
    });
    this.init(options);
    this.render();
    this.initView(options);
    this.registerEvents();

    if (options.modelVariable) {
      this.modelVariableName = options.modelVariable;
    }
  },
  validCallback: function validCallback(view, attr, selector) {
    view.markSingleFieldAsValid(attr, selector);
  },
  invalidCallback: function invalidCallback(view, attr, error, selector) {
    view.markSingleFieldAsInvalid(attr, error, selector);
  },
  markSingleFieldAsValid: function markSingleFieldAsValid(attr, selector) {
    this.$('[' + selector + '="' + attr + '"]').text('').parent().removeClass('error');
  },
  markSingleFieldAsInvalid: function markSingleFieldAsInvalid(attr, error, selector) {
    error = _.isArray(error) ? error[0] : error;
    this.$('[' + selector + '="' + attr + '"]').text(error instanceof ValidationError ? error.getMessage() : error).parent().addClass('error');
  },
  init: function init(options) {},
  initView: function initView(options) {},
  removeView: function removeView() {},
  registerEvents: function registerEvents() {},
  render: function render() {
    this.$el.html(this.template(this.i18nModel(this.serializeModel())));
    this.trigger('rendered', this);
    return this;
  },
  convert: function convert(value) {
    return this.valueConverter ? this.valueConverter(value) : value;
  },
  getValue: function getValue() {
    return this.model.get(this.modelVariableName);
  },
  setValue: function setValue(value) {
    this.model.set(this.modelVariableName, value, {
      validate: true
    });
  },
  updateData: function updateData() {
    this.render();
  },

  /**
       * Overrides View.remove() method to free resources.
       *
       * @returns {*}
       */
  remove: function remove() {
    this.removeView();
    Backbone.Validation.unbind(this);
    Backbone.View.prototype.remove.call(this);
    return this;
  }
});

});