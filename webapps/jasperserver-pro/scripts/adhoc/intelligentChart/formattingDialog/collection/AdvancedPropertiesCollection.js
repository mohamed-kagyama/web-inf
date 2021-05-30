define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var AdvancedPropertyModel = require('../model/AdvancedPropertyModel');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var AdvancedPropertiesCollection = Backbone.Collection.extend({
  model: AdvancedPropertyModel,
  validationMessages: {
    DUPLICATE_MODEL_ADD: 'DUPLICATE_MODEL_ADD',
    DUPLICATE_MODEL_EDIT: 'DUPLICATE_MODEL_EDIT'
  },
  add: function add(models, options) {
    if (this._validateSingleModelAddition(models, options)) {
      return Backbone.Collection.prototype.add.apply(this, arguments);
    }
  },
  _validateSingleModelAddition: function _validateSingleModelAddition(models, options) {
    var isValid = true;

    if (!_.isArray(models)) {
      var existsInCollection = this.find(function (m) {
        return m === models;
      }),
          duplicates = this.filter(function (m) {
        return m.id === models.id;
      });

      if (!existsInCollection && duplicates.length > 0 && (!options || !options.silent)) {
        isValid = false;
        this.trigger('validation:invalid', this, models, {
          message: this.validationMessages.DUPLICATE_MODEL_ADD
        });
      } else if (existsInCollection && duplicates.length > 1 && (!options || !options.silent)) {
        isValid = false;
        this.trigger('validation:invalid', this, models, {
          message: this.validationMessages.DUPLICATE_MODEL_EDIT
        });
        models.set(models.previousAttributes());
      }

      if (isValid && (!options || !options.silent)) {
        this.trigger('validation:valid', this, models);
      }
    }

    return isValid;
  }
});
module.exports = AdvancedPropertiesCollection;

});