define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var ViewWithEpoxy = require("runtime_dependencies/js-sdk/src/common/view/ViewWithEpoxy");

var WiringConsumerCollectionView = require('./WiringConsumerCollectionView');

var _ = require('underscore');

var i18n = require("bundle!DashboardBundle");

var i18n2 = require("bundle!CommonBundle");

var dashboardComponentTypes = require('../../../enum/dashboardComponentTypes');

var WiringSelectConsumerView = require('./WiringSelectConsumerView');

var WiringConsumerViewModel = require('../../../model/filterManager/WiringConsumerViewModel');

var WiringRemoveConsumerView = require('./WiringRemoveConsumerView');

var wiringProducerTemplate = require("text!../../../template/filterManager/wiringProducerTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = ViewWithEpoxy.extend({
  events: {
    'blur > .filterColumn > input': 'checkNewProducerName',
    'click > .addConsumerColumn > button.add': 'addConsumer',
    'click > .removeConsumerColumn > button.delete': 'removeProducer'
  },
  computeds: {
    isHidden: function isHidden() {
      return !this.model.component.isVisible();
    }
  },
  constructor: function constructor(options) {
    options.template = wiringProducerTemplate;
    options.i18n = _.extend(i18n2, i18n);
    ViewWithEpoxy.prototype.constructor.call(this, options);
  },
  initialize: function initialize(options) {
    var self = this;
    ViewWithEpoxy.prototype.initialize.call(this, options);
    this.selectConsumersCollectionView = new WiringConsumerCollectionView({
      collection: this.model.consumers,
      el: this.$('.selectConsumerColumn > .consumerTable > tbody'),
      modelView: WiringSelectConsumerView,
      modelViewOptions: {
        consumers: options.consumers
      }
    });
    this.removeConsumersCollectionView = new WiringConsumerCollectionView({
      collection: this.model.consumers,
      el: this.$('.removeConsumerColumn > .consumerTable > tbody'),
      modelView: WiringRemoveConsumerView
    });
    this.listenTo(this.model.consumers, 'add remove', this.toggleRemoveProducerButton);
    this.listenTo(this.model, 'change', function () {
      self.model.isValid(true);
    });
  },
  render: function render() {
    ViewWithEpoxy.prototype.render.apply(this, arguments);
    this.selectConsumersCollectionView.render();
    this.removeConsumersCollectionView.render();
    this.toggleRemoveProducerButton();
    return this;
  },
  checkNewProducerName: function checkNewProducerName() {
    if (this.model.isValid(true)) {
      this.model.component.set('name', this.model.component.generateName(this.model.get('name')));
      var id = this.model.component.generateId();
      this.model.component.set('id', id);
      this.model.set({
        parameter: id,
        id: id + ':' + id,
        label: this.model.component.get('name'),
        parameterPublicName: id
      });
    }
  },
  removeProducer: function removeProducer() {
    this.model.trigger('destroy', this.model, this.model.collection);
  },
  addConsumer: function addConsumer() {
    this.model.consumers.add(new WiringConsumerViewModel({}, {
      collection: this.model.consumers
    }));
  },
  toggleRemoveProducerButton: function toggleRemoveProducerButton() {
    this.$('> .removeConsumerColumn > button.delete')[this.model.component.get('type') === dashboardComponentTypes.VALUE && !this.model.consumers.length ? 'show' : 'hide']();
  },
  remove: function remove() {
    this.selectConsumersCollectionView.remove();
    this.removeConsumersCollectionView.remove();
    ViewWithEpoxy.prototype.remove.apply(this, arguments);
  }
});

});