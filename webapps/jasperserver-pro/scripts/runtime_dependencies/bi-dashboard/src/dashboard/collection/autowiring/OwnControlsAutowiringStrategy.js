define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var BaseAutowiringStrategy = require('./BaseAutowiringStrategy');

var dashboardComponentTypes = require('../../enum/dashboardComponentTypes');

var dashboardWiringStandardIds = require('../../enum/dashboardWiringStandardIds');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BaseAutowiringStrategy.extend({
  autowire: function autowire(collection, component, metadata) {
    if (component.resource && component.resource.resource && (component.resource.resource.type === dashboardComponentTypes.REPORT || component.resource.resource.type === dashboardComponentTypes.ADHOC_VIEW)) {
      wireWithAlreadyRegisteredConnections(this, collection, component, metadata);
    }

    if (component.resource && component.resource.resource && component.resource.resource.type === dashboardComponentTypes.INPUT_CONTROL) {
      wireWithAlreadyRegisteredOwners(this, collection, component, metadata);
    }
  }
});

function wireWithAlreadyRegisteredConnections(self, collection, component, metadata) {
  var connections = collection.reduce(function (memo, conn) {
    if (conn.component.get('ownerResourceId') === component.resource.id) {
      memo.push(conn);
    }

    return memo;
  }, []),
      controlIds = component.get('parameters') || [];

  _.each(connections, function (connection) {
    var cId = _.find(controlIds, function (cId) {
      // it is a report
      return connection.component.resource.id === cId.uri || // it is a dashboard visualization
      connection.component.getOwnerUri() === cId.uri && connection.component.getOwnerParameterName() === cId.id || // it is a dashboard visualization with outdated parameters uris (i.e still pointing to temporary resources instead of dashboard ones)
      // this happens when the dashboard was saved, but the visualization wasn't ever edited after dashboard save
      connection.component.resource.id === cId.uri + '_files/' + cId.id;
    });

    connection.consumers.add({
      consumer: component.id + ':' + cId.id
    });
    collection.get(connection.component.get('parentId') + ':' + dashboardWiringStandardIds.REFRESH_SIGNAL).consumers.add({
      consumer: component.id + ':' + dashboardWiringStandardIds.APPLY_SLOT
    });
  });
}

function wireWithAlreadyRegisteredOwners(self, collection, component, metadata) {
  var connection = collection.find(function (conn) {
    return conn.component.resource && conn.component.resource.id === component.resource.id;
  }),
      owner = component.collection.find(function (owner) {
    return owner.resource && owner.resource.id === component.get('ownerResourceId');
  });

  if (owner) {
    _.each(owner.get('parameters'), function (cId) {
      if (component.getOwnerParameterName() === cId.id) {
        connection.consumers.add({
          consumer: owner.id + ':' + cId.id
        });

        if (connection.component.get('parentId')) {
          collection.get(connection.component.get('parentId') + ':' + dashboardWiringStandardIds.REFRESH_SIGNAL).consumers.add({
            consumer: owner.id + ':' + dashboardWiringStandardIds.APPLY_SLOT
          });
        }
      }
    });
  }
}

});