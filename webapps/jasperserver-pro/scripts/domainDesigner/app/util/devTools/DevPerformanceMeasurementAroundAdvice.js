define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/* eslint no-console: "off" */
var profileMessageTemplate = '{{=name}}';

var DevPerformanceMeasurementAroundAdvice = function DevPerformanceMeasurementAroundAdvice(options) {
  _.bindAll(this, 'around');

  this.messageTemplate = _.template(options.messageTemplate || profileMessageTemplate);
  this.performance = options.performance;
};

_.extend(DevPerformanceMeasurementAroundAdvice.prototype, {
  around: function around(name, originalInvocation) {
    var passedArguments = Array.prototype.slice.call(arguments, 2),
        profileMessage = this.messageTemplate({
      name: name,
      args: passedArguments
    });
    return this._profile(profileMessage, originalInvocation, passedArguments);
  },
  _profile: function _profile(action, invocation, args) {
    this._startProfile(action);

    var result = invocation.apply(null, args);

    this._endProfile(action);

    return result;
  },
  _startProfile: function _startProfile(action) {
    this.performance && console.time(action);
  },
  _endProfile: function _endProfile(action) {
    this.performance && console.timeEnd(action);
  }
});

module.exports = DevPerformanceMeasurementAroundAdvice;

});