define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var measureOrDimensionEnum = require("../../../model/schema/enum/measureOrDimensionEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
var presentationFieldsMeasureOrDimensionEnum = {};
presentationFieldsMeasureOrDimensionEnum[measureOrDimensionEnum.MEASURE] = i18nMessage('domain.designer.presentationDesigner.presentationField.measure');
presentationFieldsMeasureOrDimensionEnum[measureOrDimensionEnum.DIMENSION] = i18nMessage('domain.designer.presentationDesigner.presentationField.dimension');
module.exports = presentationFieldsMeasureOrDimensionEnum;

});