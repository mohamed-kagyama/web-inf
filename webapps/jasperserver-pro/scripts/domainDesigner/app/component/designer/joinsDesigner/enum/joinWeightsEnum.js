define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var options = [{
  label: '1',
  value: 1
}, {
  label: '2',
  value: 2
}, {
  label: '3',
  value: 3
}, {
  label: '4',
  value: 4
}, {
  label: '5',
  value: 5
}, {
  label: '6',
  value: 6
}, {
  label: '7',
  value: 7
}, {
  label: '8',
  value: 8
}, {
  label: '9',
  value: 9
}, {
  label: '10',
  value: 10
}];
module.exports = {
  options: options,
  defaultOption: _.first(options)
};

});