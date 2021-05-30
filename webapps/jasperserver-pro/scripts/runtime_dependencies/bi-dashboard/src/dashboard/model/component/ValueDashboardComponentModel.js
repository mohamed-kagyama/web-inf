define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var DashboardComponentModel = require('./DashboardComponentModel');

var dashboardComponentTypes = require('../../enum/dashboardComponentTypes');

var i18n = require("bundle!DashboardBundle");

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @author: Zakhar.Tomchenko
 * @version: $Id$
 */
module.exports = DashboardComponentModel.extend({
  componentName: i18n['dashboard.component.value.component.name'],
  defaults: _.extend({}, DashboardComponentModel.prototype.defaults, {
    type: dashboardComponentTypes.VALUE,
    value: undefined
  }),
  initialize: function initialize(attrs, options) {
    DashboardComponentModel.prototype.initialize.apply(this, arguments);
    this._values = [];
    this._current = -1;
    this.on("change:value", function () {
      if (!this._ignoreValueChange) {
        this._changed = true;
        this.notify();
      }
    }, this);
    this.initializeSpecific(attrs, options);
  },
  initializeSpecific: function initializeSpecific(attrs, options) {
    this.on("change:name", function () {
      this.set("label", this.get("name"), {
        silent: true
      });
    }, this);
    this.set("label", this.get("name"), {
      silent: true
    });
  },
  isVisible: function isVisible() {
    return false;
  },
  isValueProducer: function isValueProducer() {
    return true;
  },
  notify: function notify() {
    this.trigger(this.get("id"), this.get("value"));
  },
  acceptWiringVisitor: function acceptWiringVisitor(wiring) {
    wiring.register(this, {
      signals: [this.get("id")],
      slots: {}
    });
    this.notify();
  },
  applyDeferredValue: function applyDeferredValue() {
    if (this.isValueDeferred()) {
      this._current = this._deferredValue.index;
      this.set("value", this._deferredValue.value);
      this._deferredValue = undefined;
      this._ignoreValueChange = false;
      this.trigger("parametersState:deferredValueApplied", this);
    }

    if (this._isValueApplying) {
      var val = {};
      val[this.id] = this._deferredExternalValue;
      this.acquireValue(val);
    }
  },
  prepareForAcquire: function prepareForAcquire() {},
  acquireValue: function acquireValue(values, opts) {
    if (_.isUndefined(values[this.id])) {
      this.unset("value", opts);
    } else {
      this.unset("value", {
        silent: true
      });
      this.set("value", values[this.id], opts);
    }

    return new $.Deferred().resolve();
  },
  canPopValue: function canPopValue(n) {
    return this._current + n >= -1 && this._current + n < this._values.length;
  },
  isValueDeferred: function isValueDeferred() {
    return !_.isUndefined(this._deferredValue);
  },
  pushParametersState: function pushParametersState() {
    DashboardComponentModel.prototype.pushParametersState.call(this);

    if (this._current < this._values.length - 1) {
      this._values = this._values.slice(0, this._current + 1);
    }

    this._values.push(this._changed ? _.cloneDeep(this.get("value")) : this._values[this._values.length - 1] || this._default);

    this._current = this._values.length - 1;
    this._changed = false;
  },
  popParametersState: function popParametersState(n) {
    DashboardComponentModel.prototype.popParametersState.call(this, n);

    if (this.canPopValue(n)) {
      if (this._current + n === -1) {
        resetValue.call(this);
      } else {
        this._ignoreValueChange = true;

        if (this._deferValue()) {
          this._deferredValue = {
            value: this._values[this._current + n],
            index: this._current + n
          };
        } else {
          this._current += n;
          this.set("value", this._values[this._current]);
          this._ignoreValueChange = false;
        }
      }
    }
  },
  resetParametersState: function resetParametersState(opt) {
    DashboardComponentModel.prototype.resetParametersState.call(this);
    resetValue.call(this, opt);
  },
  setCurrentParametersStateAsDefault: function setCurrentParametersStateAsDefault(def) {
    DashboardComponentModel.prototype.setCurrentParametersStateAsDefault.call(this, def);
    this._default = _.cloneDeep(def || this.get("value"));
  },
  _deferValue: function _deferValue() {
    return false;
  }
});

function resetValue(opt) {
  this._ignoreValueChange = true;

  if (this._deferValue()) {
    this._deferredValue = {
      value: this._default,
      index: -1
    };
  } else {
    this._current = -1;
    this.set("value", this._default, opt);
    this._ignoreValueChange = false;
  }
}

});