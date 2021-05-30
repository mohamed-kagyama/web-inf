define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var DashboardWiringConsumerCollection = require('../collection/DashboardWiringConsumerCollection');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.Model.extend({
  idAttribute: 'producer',
  initialize: function initialize(attrs, options) {
    options || (options = {});
    this.component = options.component;
    this.consumers = options.consumers && options.consumers instanceof DashboardWiringConsumerCollection ? options.consumers : new DashboardWiringConsumerCollection(options.consumers || []);
    this.listenTo(this.component, this.get('name'), function (value) {
      this.value = value;
    }, this);
    this.listenTo(this.consumers, 'add', function (model, collection, options) {
      this.trigger('add:consumers', this, model, collection, options);
    }, this);
    this.listenTo(this.consumers, 'remove', function (model, collection, options) {
      this.trigger('remove:consumers', this, model, collection, options);
    }, this);
    this.listenTo(this.consumers, 'reset', function (collection, options) {
      this.trigger('reset:consumers', this, collection, options);
    }, this);
  },
  toJSON: function toJSON() {
    var data = Backbone.Model.prototype.toJSON.apply(this, arguments);
    data.consumers = this.consumers.toJSON();
    return data;
  }
});

});