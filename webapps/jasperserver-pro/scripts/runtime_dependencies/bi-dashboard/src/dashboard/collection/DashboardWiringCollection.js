define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var Backbone = require('backbone');

var dashboardWiringStandardIds = require('../enum/dashboardWiringStandardIds');

var CascadeInputControlsAutowiringStrategy = require('./autowiring/CascadeInputControlsAutowiringStrategy');

var OwnControlsAutowiringStrategy = require('./autowiring/OwnControlsAutowiringStrategy');

var RunReportAutowiringStrategy = require('./autowiring/RunReportAutowiringStrategy');

var AdhocDashletLinksAutowiringStrategy = require('./autowiring/AdhocDashletLinksAutowiringStrategy');

var DashboardWiringModel = require('../model/DashboardWiringModel');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var standard = _.reduce(_.values(dashboardWiringStandardIds), function (memo, val) {
  memo[val] = true;
  return memo;
}, {});

function cleanUpProducers(componentId, producersToKeep) {
  var modelPart = componentId + ':';
  this.remove(this.filter(function (connection) {
    return connection.get('producer').indexOf(modelPart) === 0 && (!producersToKeep || _.indexOf(producersToKeep, connection.get('producer')) < 0);
  }));
}

function cleanUpConsumers(componentId, signalsToKeep) {
  var self = this;
  signalsToKeep || (signalsToKeep = []);
  this.each(function (connection) {
    var consumersToRemove = connection.consumers.filter(function (consumerModel) {
      var parts = consumerModel.get('consumer').split(':');
      return parts[0] == componentId && _.indexOf(signalsToKeep, parts[1]) < 0;
    });

    _.each(consumersToRemove, function (consumerModel) {
      connection.consumers.remove(consumerModel);
      delete self.handlers[consumerModel.get('consumer')];
    });
  });
}

module.exports = Backbone.Collection.extend({
  model: DashboardWiringModel,
  initialize: function initialize() {
    var self = this;

    _.bindAll(this, 'register', 'unregister');

    this.handlers = {};
    this.on('add', function (wiringModel) {
      wiringModel.consumers.each(_.bind(this.attachHandler, this, wiringModel));
    });
    this.on('remove', function (wiringModel) {
      wiringModel.consumers.set([]);
    });
    this.on('reset', function (collection, options) {
      _.each(options.previousModels, function (wiringModel) {
        wiringModel.consumers.set([]);
      });

      this.each(function (wiringModel) {
        wiringModel.consumers.each(_.bind(self.attachHandler, self, wiringModel));
      });
    });
    this.on('add:consumers', this.attachHandler);
    this.on('remove:consumers', this.detachHandler);
    this.on('reset:consumers', function (wiringModel, consumerCollection, options) {
      _.each(options.previousModels, _.bind(self.detachHandler, self, wiringModel));

      consumerCollection.each(_.bind(self.attachHandler, self, wiringModel));
    });
    this.autowiring = [];
    this.autowiring.push(new OwnControlsAutowiringStrategy());
    this.autowiring.push(new CascadeInputControlsAutowiringStrategy());
    this.autowiring.push(new RunReportAutowiringStrategy());
    this.autowiring.push(new AdhocDashletLinksAutowiringStrategy());
  },
  register: function register(model, metadata) {
    cleanUpProducers.call(this, model.get('id'), _.map(metadata.signals, function (name) {
      return model.get('id') + ':' + name;
    }));
    cleanUpConsumers.call(this, model.get('id'), _.keys(metadata.slots));
    var addedModels = this.add(_.map(metadata.signals, function (name) {
      return {
        name: name,
        producer: model.get('id') + ':' + name,
        component: model.get('id')
      };
    }), {
      silent: true,
      component: model,
      consumers: []
    });

    for (var name in metadata.slots) {
      var consumer = model.get('id') + ':' + name;
      this.handlers[consumer] || (this.handlers[consumer] = new $.Deferred());
      this.handlers[consumer].resolve(metadata.slots[name]);
    }

    this.autowiringEnabled && _.invoke(this.autowiring, 'autowire', this, model, metadata); // We should trigger add event on the models after auto-wiring, because in opposite case
    // model will be in partial state - with not initialized consumers
    // We should trigger add event on the models after auto-wiring, because in opposite case
    // model will be in partial state - with not initialized consumers

    for (var i = 0, l = addedModels.length; i < l; i++) {
      (model = addedModels[i]).trigger('add', model, this);
    }
  },
  unregister: function unregister(model) {
    cleanUpProducers.call(this, model.get('id'));
    cleanUpConsumers.call(this, model.get('id'));

    _.invoke(this.autowiring, 'unwire', model);
  },
  enableAutowiring: function enableAutowiring() {
    this.autowiringEnabled = true;
  },
  disableAutowiring: function disableAutowiring() {
    this.autowiringEnabled = false;
  },
  askForHandler: function askForHandler(consumer) {
    this.handlers[consumer] || (this.handlers[consumer] = new $.Deferred());
    return this.handlers[consumer].promise();
  },
  attachHandler: function attachHandler(wiringModel, consumerModel) {
    this.askForHandler(consumerModel.get('consumer')).done(function (handler) {
      wiringModel.listenTo(wiringModel.component, wiringModel.get('name'), handler);
      wiringModel.value && handler(wiringModel.value, wiringModel.component);
    });
  },
  detachHandler: function detachHandler(wiringModel, consumerModel) {
    this.askForHandler(consumerModel.get('consumer')).done(function (handler) {
      wiringModel.stopListening(wiringModel.component, wiringModel.get('name'), handler);
      wiringModel.value && handler(undefined, wiringModel.component);
    });
  },
  hasUserWiring: function hasUserWiring() {
    return !!this.find(function (connection) {
      return !standard[connection.get('name')] && connection.consumers.find(function (consumer) {
        var name = consumer.get('consumer').split(':');
        return !standard[name[name.length - 1]];
      });
    });
  }
});

});