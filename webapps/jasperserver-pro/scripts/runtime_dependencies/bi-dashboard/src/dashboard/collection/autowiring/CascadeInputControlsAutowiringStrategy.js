define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var BaseAutowiringStrategy = require('./BaseAutowiringStrategy');

var dashboardComponentTypes = require('../../enum/dashboardComponentTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BaseAutowiringStrategy.extend({
  autowire: function autowire(collection, component, metadata) {
    if (component.resource && component.resource.resource && component.resource.resource.type === dashboardComponentTypes.INPUT_CONTROL) {
      wireWithAlreadyRegisteredConnections(this, collection, component, metadata);
      wireWithAlreadyRegisteredOwners(this, collection, component, metadata);
    }
  }
});

function wireWithAlreadyRegisteredConnections(self, collection, component, metadata) {
  var dependent = component.collection.filter(function (candidate) {
    return candidate.getOwnerUri && candidate.getOwnerUri() == component.getOwnerUri() && _.contains(candidate.get('masterDependencies') || [], component.getOwnerParameterName());
  }),
      connection = collection.find(function (conn) {
    return conn.component.resource && conn.component.resource.id === component.resource.id;
  });

  _.each(dependent, function (dependentControl) {
    connection.consumers.add({
      consumer: dependentControl.id + ':' + component.getOwnerParameterName()
    });
  });
}

function wireWithAlreadyRegisteredOwners(self, collection, component, metadata) {
  _.each(_.keys(metadata.slots), function (key) {
    var connection = collection.find(function (conn) {
      return conn.get('name') == key && conn.component.get('ownerResourceId') == component.get('ownerResourceId');
    });
    connection && connection.consumers.add({
      consumer: component.id + ':' + key
    });
  });
}

});