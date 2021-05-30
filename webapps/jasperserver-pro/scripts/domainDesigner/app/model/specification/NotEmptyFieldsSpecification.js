define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var allCollectionsMixin = require("../../../model/schema/mixin/allCollectionsMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var NotEmptyFieldsSpecification = function NotEmptyFieldsSpecification(options) {
  this.initialize(options);
};

_.extend(NotEmptyFieldsSpecification.prototype, {
  initialize: function initialize(options) {
    this.dataStore = options.dataStore;
    this.mixInAllCollections(this.dataStore);
  },
  isSatisfied: function isSatisfied() {
    return this.fields.size() > 0;
  }
});

_.extend(NotEmptyFieldsSpecification.prototype, allCollectionsMixin);

module.exports = NotEmptyFieldsSpecification;

});