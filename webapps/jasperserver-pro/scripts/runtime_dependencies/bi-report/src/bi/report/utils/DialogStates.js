define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var StateHolder =
/*#__PURE__*/
function () {
  function StateHolder(state) {
    _classCallCheck(this, StateHolder);

    this.state = state;
  }

  _createClass(StateHolder, [{
    key: "get",
    value: function get() {
      return this.state;
    }
  }, {
    key: "set",
    value: function set(state) {
      this.state = state;
    }
  }, {
    key: "updateKey",
    value: function updateKey(key, value) {
      this.state[key] = value;
    }
  }]);

  return StateHolder;
}();

var DialogStates =
/*#__PURE__*/
function () {
  function DialogStates() {
    _classCallCheck(this, DialogStates);

    this.states = {};
  }

  _createClass(DialogStates, [{
    key: "register",
    value: function register(id, initialState) {
      if (!this.states[id]) {
        this.states[id] = new StateHolder(initialState);
      }

      return this.getState(id);
    }
  }, {
    key: "getState",
    value: function getState(id) {
      return this.states[id] || null;
    }
  }, {
    key: "setState",
    value: function setState(id, state) {
      this.states[id].set(state);
    }
  }]);

  return DialogStates;
}();

module.exports = DialogStates;

});