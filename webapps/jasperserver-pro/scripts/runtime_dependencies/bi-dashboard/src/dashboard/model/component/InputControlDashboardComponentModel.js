define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var DashboardComponentModel = require('./DashboardComponentModel');

var ValueDashboardComponentModel = require('./ValueDashboardComponentModel');

var ReportsParametersCollection = require('../../collection/ReportsParametersCollection');

var i18n = require("bundle!DashboardBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var $ = require('jquery');

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.extend({
  bundle: i18n
});
var ParametersCache = ReportsParametersCollection.instance;

function convertICDataToWiringInfo(model, parameters) {
  var res = {
    signals: [model.getOwnerParameterName()],
    slots: {}
  };

  _.each(parameters, function (parameter) {
    res.slots[parameter] = function (name) {
      return function (value, sender) {
        model.trigger('signal', {
          name: name,
          value: value
        }, sender);
      };
    }(parameter);
  });

  return res;
}

module.exports = ValueDashboardComponentModel.extend({
  componentName: i18n['dashboard.component.input.control.component.name'],
  defaults: _.extend({}, DashboardComponentModel.prototype.defaults, {
    label: undefined
  }),
  validation: _.extend({}, DashboardComponentModel.prototype.validation, {
    label: [{
      required: true,
      msg: new i18nMessage('dashboard.component.error.filter.label.required')
    }]
  }),
  initializeSpecific: function initializeSpecific(attrs, options) {
    this.componentInitializedDfd = new $.Deferred();
  },
  isVisible: function isVisible() {
    return this.resource.resource.has('visible') ? this.resource.resource.get('visible') : this.has('parentId');
  },
  getOwnerUri: function getOwnerUri() {
    var owner = this.collection.findWhere({
      resource: this.get('ownerResourceId')
    });
    return owner ? owner.resource.resource.get('uri') : undefined;
  },
  getOwnerParameterName: function getOwnerParameterName() {
    return this.get('ownerResourceParameterName');
  },
  notify: function notify() {
    this.trigger(this.getOwnerParameterName(), this.get('value'));
  },
  toDashboardComponentObject: function toDashboardComponentObject() {
    var data = DashboardComponentModel.prototype.toDashboardComponentObject.apply(this, arguments);
    data.resource = null;
    return data;
  },
  toJSON: function toJSON() {
    return _.omit(this.attributes, 'value');
  },
  acceptControlState: function acceptControlState(state) {
    // the value should be unset to make sure that the event will be triggered anyway
    // handles case, when the control accepts new value, same as previous
    this.unset('value', {
      silent: true
    });
    this.set('value', extractValuesFromStateModel(state));
    this.get('parentId') && this.collection.get(this.get('parentId')).notify();
  },
  prepareForAcquire: function prepareForAcquire(values) {
    var self = this;

    if (this.has('masterDependencies') && this.get('masterDependencies').length) {
      var parents = this.collection.filter(function (comp) {
        return comp.get('ownerResourceId') === self.get('ownerResourceId') && _.contains(self.get('masterDependencies'), comp.getOwnerParameterName());
      });

      _.each(parents, function (parent) {
        if (!_.isUndefined(values[parent.id])) {
          self.paramsModel.unset(parent.id, {
            silent: true
          });
        }

        parent.prepareForAcquire(values);
      });
    }
  },
  acquireValue: function acquireValue(values, opts) {
    var res;

    if (this.has('masterDependencies') && this.get('masterDependencies').length && deferredUpdateRequired(this, values)) {
      this._deferredExternalValue = values[this.id];
      res = this._isValueApplying = $.Deferred();
    } else {
      if (_.isUndefined(values[this.id])) {
        this.unset('value', opts);
      } else {
        this.unset('value', {
          silent: true
        });
        this.set('value', values[this.id], opts);
      }

      if (this._isValueApplying) {
        res = this._isValueApplying;
        this._isValueApplying = undefined;
        this._deferredExternalValue = undefined;
        res.resolve();
      }

      res = new $.Deferred().resolve();
    }

    return res.promise();
  },
  acceptWiringVisitor: function acceptWiringVisitor(wiring) {
    var self = this;
    wiring.register(this, convertICDataToWiringInfo(this, this.get('masterDependencies')));
    ParametersCache.getInputControlAsParameter(this.getOwnerUri(), this.getOwnerParameterName(), {
      full: this.get('fullCollectionRequired')
    }).done(function (control) {
      self.set('value', extractValuesFromRawState(control.state), {
        silent: true
      });
      self.notify();
      self.componentInitializedDfd.resolve();
    }).fail(function () {
      self.componentInitializedDfd.resolve();
    });
  },
  popParametersState: function popParametersState(n) {
    this.paramsModel.on('change', setDefer, this);
    ValueDashboardComponentModel.prototype.popParametersState.call(this, n);
    this.paramsModel.off('change', setDefer, this);
    this._defer = false;
  },
  resetParametersState: function resetParametersState(n) {
    this.paramsModel.on('change', setDefer, this);
    ValueDashboardComponentModel.prototype.resetParametersState.call(this, n);
    this.paramsModel.off('change', setDefer, this);
    this._defer = false;
  },
  _deferValue: function _deferValue() {
    return this._defer;
  }
});

function setDefer() {
  this._defer = true;
}

function deferredUpdateRequired(control, values) {
  var parents = control.collection.filter(function (comp) {
    return comp.get('ownerResourceId') === control.get('ownerResourceId') && _.contains(control.get('masterDependencies'), comp.getOwnerParameterName());
  });
  return _.reduce(parents, function (memo, parent) {
    return memo || _.has(values, parent.getOwnerParameterName()) || deferredUpdateRequired(parent, values);
  }, false);
}

function extractValuesFromStateModel(state) {
  return state.isValue ? _.isArray(state.get('value')) ? state.get('value') : [state.get('value')] : state.options.reduce(function (memo, option) {
    option.get('selected') && memo.push(option.get('value'));
    return memo;
  }, []);
}

function extractValuesFromRawState(state) {
  return !state.options ? _.isArray(state.value) ? state.value : [state.value] : _.reduce(state.options, function (memo, option) {
    option.selected && memo.push(option.value);
    return memo;
  }, []);
}

});