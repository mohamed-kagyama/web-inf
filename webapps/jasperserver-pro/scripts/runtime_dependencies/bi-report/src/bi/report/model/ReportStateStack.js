define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.Model.extend({
  defaults: function defaults() {
    return {
      counter: 0,
      states: [],
      position: -1,
      canUndo: false,
      canRedo: false
    };
  },
  initialize: function initialize() {
    this.on('change:position', function () {
      this.set({
        'canUndo': this.hasPrevious(),
        'canRedo': this.hasNext()
      });
    }, this);
  },
  newState: function newState() {
    if (this.get('position') + 2 < this.get('states').length) {
      this.get('states').splice(this.get('position') + 2, this.get('states').length - this.get('position') - 2);
    }

    this.set('counter', this.get('counter') + 1);
    this.get('states')[this.get('position') + 1] = this.get('counter');
    this.set('position', this.get('position') + 1);
  },
  previousState: function previousState() {
    if (this.get('position') > 0) {
      this.set('position', this.get('position') - 1);
    }
  },
  firstState: function firstState() {
    this.set('position', 0);
  },
  nextState: function nextState() {
    if (this.get('position') + 1 < this.get('states').length) {
      this.set('position', this.get('position') + 1);
    }
  },
  hasPrevious: function hasPrevious() {
    return this.get('position') > 0;
  },
  hasNext: function hasNext() {
    return this.get('position') + 1 < this.get('states').length;
  },
  currentState: function currentState() {
    return this.get('states')[this.get('position')];
  }
});

});