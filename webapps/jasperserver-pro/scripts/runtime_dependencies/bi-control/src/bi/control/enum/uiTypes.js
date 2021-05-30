define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var bool = require('../view/control/BooleanControlView');

var singleValueText = require('../view/control/SingleValueTextControlView');

var singleValueNumber = require('../view/control/SingleValueNumberControlView');

var singleValueDate = require('../view/control/SingleValueDateControlView');

var singleValueDatetime = require('../view/control/SingleValueDatetimeControlView');

var singleValueTime = require('../view/control/SingleValueTimeControlView');

var singleSelect = require('../view/control/SingleSelectControlView');

var singleSelectRadio = require('../view/control/SingleSelectRadioControlView');

var multiSelect = require('../view/control/MultiSelectControlView');

var multiSelectCheckbox = require('../view/control/MultiSelectCheckboxControlView');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  'bool': bool,
  'singleValueText': singleValueText,
  'singleValueNumber': singleValueNumber,
  'singleValueDate': singleValueDate,
  'singleValueDatetime': singleValueDatetime,
  'singleValueTime': singleValueTime,
  'singleSelect': singleSelect,
  'singleSelectRadio': singleSelectRadio,
  'multiSelect': multiSelect,
  'multiSelectCheckbox': multiSelectCheckbox
};

});