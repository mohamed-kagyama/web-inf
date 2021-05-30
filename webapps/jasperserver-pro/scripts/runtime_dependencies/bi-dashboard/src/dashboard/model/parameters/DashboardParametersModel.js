define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.Model.extend({
  initialize: function initialize() {
    this._states = [];
    this._current = -1;
    this.on('change', function () {
      this._changed = true;
    }, this);
  },
  clear: function clear(apts) {
    if (this._default) {
      Backbone.Model.prototype.clear.call(this, {
        silent: true
      });
      this.set(this._default, apts);
    } else {
      Backbone.Model.prototype.clear.call(this, apts);
    }

    this._current = -1;
  },
  pushState: function pushState() {
    if (this._current < this._states.length - 1) {
      this._states = this._states.slice(0, this._current + 1);
    }

    this._states.push(this._changed ? _.cloneDeep(this.attributes) : this._states[this._states.length - 1] || this._default);

    this._current = this._states.length - 1;
    this._changed = false;
  },
  popState: function popState(n) {
    if (this.canPopState(n)) {
      this._current += n;

      if (this._current === -1) {
        this.clear();
      } else {
        this.set(this._states[this._current]);
      }
    }
  },
  setDefault: function setDefault(def) {
    if (_.keys(def || this.attributes).length) {
      this._default = _.cloneDeep(def || this.attributes);
    }
  },
  canPopState: function canPopState(n) {
    return this._current + n >= -1 && this._current + n < this._states.length;
  }
});

});