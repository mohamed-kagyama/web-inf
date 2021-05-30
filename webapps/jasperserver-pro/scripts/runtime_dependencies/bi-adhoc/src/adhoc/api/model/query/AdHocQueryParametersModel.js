define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var queryVariableTypes = require('../enum/QueryVariableTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var relativeDataRegExp = /^(DAY|WEEK|MONTH|QUARTER|SEMI|YEAR)([\+|-][\d]{1,9})?$/;
var AdHocQueryParametersModel = Backbone.Model.extend({
  initialize: function initialize(attr, opts) {
    this._types = {};
    this._singular = {};
  },
  toJSON: function toJSON() {
    var self = this;
    return _.map(this.attributes, function (value, name) {
      var parameter = {
        name: name
      };

      if (self._singular[name]) {
        parameter.expression = {
          object: toServerValue(self._types[name], value)
        };
      } else {
        parameter.expression = {
          object: {
            list: {
              items: _.map(value, _.bind(toServerValue, self, self._types[name]))
            }
          }
        };
      }

      return parameter;
    });
  },
  acquire: function acquire(parameters, filtersMetadata) {
    var self = this,
        values = {},
        altTypes = _.reduce(filtersMetadata, function (memo, filter) {
      return _.reduce(filter.variables, function (m, variable) {
        m[variable.name] = variable.type;
        return m;
      }, memo);
    }, {});

    this._types = ensureTypes(parameters, altTypes);
    this._singular = _.reduce(parameters, function (memo, parameter) {
      memo[parameter.name] = !parameter.expression.object.list;
      return memo;
    }, {});

    _.each(parameters, function (parameter) {
      values[parameter.name] = self._determinateParameterValue(parameter);
    });

    this.set(values);
  },
  set: function set() {
    var attr,
        opts,
        self = this;

    if (arguments.length > 1 && _.isString(arguments[0])) {
      attr = {};
      attr[arguments[0]] = arguments[1];
      opts = arguments[2];
    } else {
      attr = arguments[0];
      opts = arguments[1];
    }

    attr = _.reduce(_.keys(attr), function (memo, key) {
      if (self._singular[key]) {
        if (_.isArray(attr[key])) {
          if (attr[key].length) {
            memo[key] = setNullValues(self._types[key], attr[key][0]);
          } else {
            memo[key] = null;
          }
        } else {
          memo[key] = setNullValues(self._types[key], attr[key]);
        }
      } else {
        memo[key] = _.map(attr[key], _.bind(setNullValues, self, self._types[key]));
      }

      return memo;
    }, {});
    return Backbone.Model.prototype.set.call(this, attr, opts);
  },
  toDataComponent: function toDataComponent() {
    var type = this._types;
    return _.map(_.keys(this.attributes), function (key) {
      return {
        id: key,
        type: type[key]
      };
    });
  },
  _determinateParameterValue: function _determinateParameterValue(parameter) {
    if (parameter.expression.object.list) {
      if (parameter.expression.object.list.items.length) {
        return _.map(parameter.expression.object.list.items, function (item) {
          return _.values(item)[0].value;
        });
      } else {
        return [];
      }
    } else {
      return _.values(parameter.expression.object)[0].value;
    }
  }
});

function setNullValues(type, value) {
  var res = value;

  if (value === '' && type !== 'string') {
    res = null;
  } else if (value === '~NULL~') {
    res = null;
  }

  return res;
}

function ensureTypes(parameters, types) {
  return _.reduce(parameters, function (memo, parameter) {
    if (!memo[parameter.name]) {
      var expr = parameter.expression.object.list ? parameter.expression.object.list.items[0] : parameter.expression.object;

      if (expr) {
        memo[parameter.name] = _.keys(expr)[0];
      } else {
        memo[parameter.name] = 'string';
      }
    }

    return memo;
  }, types || {});
}

function toServerValue(type, value) {
  var res = {};

  if (value === null) {
    res.NULL = {};
  } else if ((type === queryVariableTypes.DATE || type === queryVariableTypes.TIMESTAMP) && relativeDataRegExp.test(value)) {
    if (type === queryVariableTypes.DATE) {
      res.relativeDateRange = {
        value: value
      };
    } else {
      res.relativeTimestampRange = {
        value: value
      };
    }
  } else if (type === queryVariableTypes.TIMESTAMP) {
    res[type] = {
      value: value.replace('T', ' ')
    };
  } else {
    res[type] = {
      value: value
    };
  }

  return res;
}

module.exports = AdHocQueryParametersModel;

});