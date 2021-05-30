define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var BaseAutowiringStrategy = require('./BaseAutowiringStrategy');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BaseAutowiringStrategy.extend({
  autowire: function autowire(collection, component, metadata) {
    if (component.parametersFromProperties) {
      var parametrizeProperty = _.filter(component.get('parameters'), function (parameter) {
        return _.indexOf(component.parametersFromProperties, parameter.id) > -1;
      }),
          urlParam = _.filter(component.get('outputParameters'), function (parameter) {
        return _.findWhere(parametrizeProperty, {
          id: parameter.id
        });
      });

      collection.each(function (connection) {
        if (connection.get('component') === component.id) {
          var param = _.findWhere(urlParam, {
            id: connection.get('name')
          });

          if (param) {
            connection.consumers.add({
              consumer: component.id + ':' + param.id
            });
          }
        }
      });
    }
  }
});

});