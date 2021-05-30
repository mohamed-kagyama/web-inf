define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var _ = require('underscore');

var $ = require('jquery');

var BackboneValidation = require("runtime_dependencies/js-sdk/src/common/extension/backboneValidationExtension");

var i18n = require("bundle!DashboardBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var dashboardComponentTypes = require('../../enum/dashboardComponentTypes');

var substitutionConstants = require("runtime_dependencies/bi-control/src/bi/control/enum/substitutionConstants");

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

var parser = require('../parameters/ParameterParser');

var DashboardParametersModel = require('../parameters/DashboardParametersModel');

var dashboardSettings = require('../../dashboardSettings');

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var log = logger.register("DashboardComponentModel");
var i18nMessage = i18nMessageUtil.extend({
  bundle: i18n
});
var DASHLET_ID_VALID_WORD_PATTERN = new RegExp(dashboardSettings.DASHLET_ID_VALID_WORD_PATTERN);
var ID_BLACK_LIST_CHARS_REG = new RegExp(dashboardSettings.DASHLET_ID_BLACK_LIST_CHARS_PATTERN, 'g');
/**
 * Iterate over array and return first truthy value returned after invocation
 *
 * @param array
 * @param iterator
 * @returns {*}
 */

function _any(array, iterator) {
  var i,
      val,
      length = array.length;

  for (i = 0; i < length; i++) {
    val = iterator(array[i]);

    if (val) {
      return val;
    }
  }
}
/**
 * Generate valid identifier consisting from dasherized alfa-numeric chars.
 *
 * @param {string} str String taken to generate id from it
 * @returns {string} Sanitized identifier
 */

/**
 * Generate valid identifier consisting from dasherized alfa-numeric chars.
 *
 * @param {string} str String taken to generate id from it
 * @returns {string} Sanitized identifier
 */


function _identify(str) {
  // We should check whether name will be the valid identifier
  str = _.trim(str);

  if (!str.match(DASHLET_ID_VALID_WORD_PATTERN)) {
    return null;
  } // Sanitize string for id. White-listed symbols: spaces, dashes and alfa-numeric allowed only
  // Sanitize string for id. White-listed symbols: spaces, dashes and alfa-numeric allowed only


  return str.replace(ID_BLACK_LIST_CHARS_REG, '_');
}

function _addIndex(str, i, delimiter) {
  return _.trim(str) + (i > 1 ? (delimiter || '_') + i : '');
}

var DashboardComponentModel = Backbone.Model.extend({
  defaults: {
    id: undefined,
    type: undefined,
    name: undefined,
    resource: undefined,
    selected: false,
    interactive: true
  },
  validation: {
    name: [{
      required: true,
      msg: new i18nMessage('dashboard.component.error.name.required')
    }, {
      fn: function fn(value, attr, computedState) {
        return this.collection.find(function (c) {
          return c.get('name') == value && c.get('id') !== computedState.id;
        });
      },
      msg: new i18nMessage('dashboard.component.error.name.duplication')
    }]
  },
  componentName: 'Component',
  initialize: function initialize(attrs, options) {
    if (!this.get('name')) {
      this.set('name', this.generateName());
    }

    if (!this.get('id')) {
      // By default id is generated from the component name.
      this.set('id', this.generateId());
    }

    options || (options = {});

    if (options.resource) {
      this.resource = options.resource;
    }

    if (options.dashboardId) {
      this.dashboardId = options.dashboardId;
    }

    this.paramsModel = new DashboardParametersModel();
    this.listenTo(this.paramsModel, 'change', _.partial(this.trigger, 'paramsModelChanged', this));
  },
  set: function set(k, val, options) {
    var attrs,
        params,
        oldParams,
        addedParams,
        removedParams,
        isUpdatedParams,
        res,
        self = this;
    if (k == null) return this;

    if (_typeof(k) === 'object') {
      attrs = k;
      options = val;
    } else {
      (attrs = {})[k] = val;
    }

    _.each(_.keys(attrs), function (key) {
      if (attrs[key] && attrs[key].indexOf && attrs[key].indexOf('$P{') >= 0) {
        params || (params = []);
        parser.substitute(attrs[key], function (paramName) {
          _.indexOf(params, paramName) == -1 && params.push(paramName);
        });
      }

      if (key && this.get(key) && this.get(key).indexOf && this.get(key).indexOf('$P{') >= 0) {
        oldParams || (oldParams = []);
        parser.substitute(this.get(key), function (paramName) {
          _.indexOf(oldParams, paramName) == -1 && oldParams.push(paramName);
        });
      }
    }, this);

    if (params) {
      if (oldParams) {
        addedParams = _.difference(params, oldParams);
        removedParams = _.difference(oldParams, params);
      } else {
        addedParams = params;
      }
    } else {
      removedParams = oldParams;
    }

    this.parametersFromProperties = _.difference((this.parametersFromProperties || []).concat(addedParams || []), removedParams);
    isUpdatedParams = addedParams || removedParams || attrs.parameters;

    if (isUpdatedParams) {
      attrs.parameters = _.reduce(this.parametersFromProperties, function (memo, paramName) {
        var outputParam,
            label = paramName;

        if (!_.findWhere(memo, {
          id: paramName
        })) {
          if (self.has('outputParameters')) {
            outputParam = _.findWhere(self.get('outputParameters'), {
              id: paramName
            });
            outputParam && (label = outputParam.label);
          }

          memo.push({
            id: paramName,
            label: label,
            parametrizeProperty: true
          });
        }

        return memo;
      }, attrs.parameters || _.filter(this.get('parameters') || [], function (p) {
        return !p.parametrizeProperty;
      }));
    }

    res = Backbone.Model.prototype.set.call(this, attrs, options);

    if ((isUpdatedParams || attrs.outputParameters) && !(options && options.silent)) {
      this.trigger('parameters:set');
    }

    return res;
  },
  getChildren: function getChildren() {
    var self = this;
    return this.collection.filter(function (model) {
      return model.get('parentId') === self.get('id');
    });
  },
  getParent: function getParent() {
    if (!this.has('parentId')) {
      return undefined;
    }

    return this.collection.findWhere({
      id: this.get('parentId')
    });
  },
  generateName: function generateName(name) {
    var simpleName = name || _.trim(this.get('label')) || this.componentName,
        id = _identify(this.get('type') === dashboardComponentTypes.INPUT_CONTROL && this.has('resourceId') ? this.get('resourceId') : simpleName),
        i;

    if (!id) {
      // Generate id from the component name when natural name couldn't be used as id.
      id = this.componentName;
      this.set('id', this.generateId(id));
    }

    i = this.generateIndex(simpleName, 'name', ' ');
    return _addIndex(simpleName, i, ' ');
  },
  // Generate Id from the Natural Id that could be overridden. Fall back to name if natural id is not defined.
  generateId: function generateId(name) {
    var id = _any([name, this.get('type') === dashboardComponentTypes.INPUT_CONTROL && this.has('resourceId') ? this.get('resourceId') : this.get('name'), this.componentName, this.get('type')], _identify),
        i = this.generateIndex(id, 'id', '_');

    return _addIndex(id, i);
  },
  generateIndex: function generateIndex(value, key, delimiter) {
    if (!this.collection) {
      return 1;
    }

    var i = 1;

    while (true) {
      // We add index counter only for i > 1
      var searchValue = value + (i > 1 ? delimiter + i : '');
      var criteria = {};
      criteria[key] = searchValue;

      if (this.collection.findWhere(criteria)) {
        i++;
      } else {
        break;
      }
    }

    return i;
  },
  isVisualization: function isVisualization() {
    return this.get('type') === dashboardComponentTypes.REPORT || this.get('type') === dashboardComponentTypes.WEB_PAGE_VIEW || this.get('type') === dashboardComponentTypes.IMAGE || this.get('type') === dashboardComponentTypes.ADHOC_VIEW || this.get('type') === dashboardComponentTypes.TABLE || this.get('type') === dashboardComponentTypes.CHART || this.get('type') === dashboardComponentTypes.CROSSTAB;
  },
  isValueProducer: function isValueProducer() {
    return false;
  },
  isVisible: function isVisible() {
    return true;
  },
  isAutoRefreshable: function isAutoRefreshable() {
    return this.has('autoRefresh') && this.has('refreshInterval') && this.has('refreshIntervalUnit');
  },
  isParametrized: function isParametrized() {
    return this.has('parameters') && this.get('parameters').length > 0;
  },
  notify: function notify(signals) {
    _.each(_.keys(signals || {}), function (signal) {
      this.trigger(signal, signals[signal]);
    }, this);
  },
  acceptWiringVisitor: function acceptWiringVisitor(visitor) {
    this._getWiringMetadata().done(visitor.register);
  },
  _getWiringMetadata: function _getWiringMetadata() {
    var res = new $.Deferred();
    res.resolve(this, {
      signals: [],
      slots: {}
    });
    return res.promise();
  },
  clone: function clone() {
    var clone = Backbone.Model.prototype.clone.call(this);
    clone.collection = this.collection;
    return clone;
  },
  toJSON: function toJSON() {
    var data = Backbone.Model.prototype.toJSON.apply(this, arguments); // We doesn't persist Component selection and interactive states
    // We doesn't persist Component selection and interactive states

    delete data.selected;
    delete data.interactive;
    return data;
  },
  toDashboardComponentObject: function toDashboardComponentObject() {
    var component = this.pick('id', 'name', 'type', 'interactive', 'resource');

    try {
      component.name = this.getParametrizationResult('name', this.paramsModel.attributes, {
        tolerateMissing: true
      });
    } catch (ex) {
      log.error(ex);
    }

    component.position = null;
    component.toolbar = null;
    component.maximized = null;
    component.pagination = null;

    if (_.isUndefined(component.resource)) {
      component.resource = null;
    }

    return component;
  },
  updateFromDashboardComponentObject: function updateFromDashboardComponentObject(obj) {
    var attrs = _.omit(obj, 'id', 'name', 'type', 'toolbar', 'position', 'maximized', 'pagination', 'resource');

    this.set(attrs);
  },
  getParametrizationResult: function getParametrizationResult(name, values, options) {
    if (!_.isUndefined(this.get(name))) {
      var valuesResolver = _.isFunction(values) ? values : function (key, tolerateMissing) {
        if (!values[key] || !values[key][0] || _.intersection(values[key], [substitutionConstants.NOTHING_SUBSTITUTION_VALUE, substitutionConstants.NULL_SUBSTITUTION_VALUE]).length) {
          if (tolerateMissing) {
            return [];
          } else {
            throw key;
          }
        }

        return values[key];
      };
      return parser.substitute(this.get(name), valuesResolver, options);
    }
  },
  pushParametersState: function pushParametersState() {
    this.paramsModel.pushState();
  },
  popParametersState: function popParametersState(n) {
    this.paramsModel.popState(n);
  },
  resetParametersState: function resetParametersState(opt) {
    this.paramsModel.clear(opt);
  },
  setCurrentParametersStateAsDefault: function setCurrentParametersStateAsDefault(def) {
    this.paramsModel.setDefault(def);
  }
});

_.extend(DashboardComponentModel.prototype, BackboneValidation.mixin);

module.exports = DashboardComponentModel;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});