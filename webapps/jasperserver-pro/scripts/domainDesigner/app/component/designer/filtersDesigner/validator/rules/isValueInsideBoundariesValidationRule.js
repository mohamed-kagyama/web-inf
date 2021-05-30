define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var dataSourceMetadataTypesBoundariesEnum = require("../../../../../../model/schema/enum/dataSourceMetadataTypesBoundariesEnum");

var numberUtil = require("../../../../../common/util/numberUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
module.exports = {
  validate: function validate(value, options) {
    if (!value) {
      return;
    }

    value = numberUtil.parseNumber(value);
    var boundaries = dataSourceMetadataTypesBoundariesEnum[options.filterType];

    if (!_.isFinite(value) && _.isFinite(boundaries.max) && _.isFinite(boundaries.min)) {
      return i18nMessage('domain.designer.filters.validation.rightOperand.outOfBoundaries');
    }

    if (_.isFinite(value) && (value > boundaries.max || value < boundaries.min)) {
      return i18nMessage('domain.designer.filters.validation.rightOperand.outOfBoundaries');
    }
  }
};

});