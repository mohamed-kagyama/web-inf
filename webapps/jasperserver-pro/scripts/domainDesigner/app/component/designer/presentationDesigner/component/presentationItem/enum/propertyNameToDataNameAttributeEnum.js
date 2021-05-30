define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var automationDataNameAttributesEnum = require("../../../../../../common/enum/automationDataNameAttributesEnum");

var propertyToPropertyNameEnum = require("./propertyToPropertyNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var propertyNameToDataNameAttributeEnum = {};
propertyNameToDataNameAttributeEnum[propertyToPropertyNameEnum.labelPropertyEditorName] = automationDataNameAttributesEnum.presentationDesigner.dataIslandOrSet.columnSetLabel;
propertyNameToDataNameAttributeEnum[propertyToPropertyNameEnum.aggregationPropertyEditorName] = automationDataNameAttributesEnum.presentationDesigner.dataIslandOrSet.columnSetAggregation;
propertyNameToDataNameAttributeEnum[propertyToPropertyNameEnum.kindPropertyEditorName] = automationDataNameAttributesEnum.presentationDesigner.dataIslandOrSet.columnSetKind;
propertyNameToDataNameAttributeEnum[propertyToPropertyNameEnum.maskPropertyEditorName] = automationDataNameAttributesEnum.presentationDesigner.dataIslandOrSet.columnSetMask;
propertyNameToDataNameAttributeEnum[propertyToPropertyNameEnum.namePropertyEditorName] = automationDataNameAttributesEnum.presentationDesigner.dataIslandOrSet.columnSetId;
propertyNameToDataNameAttributeEnum[propertyToPropertyNameEnum.descriptionPropertyEditorName] = automationDataNameAttributesEnum.presentationDesigner.dataIslandOrSet.columnSetDescription;
propertyNameToDataNameAttributeEnum[propertyToPropertyNameEnum.labelKeyPropertyEditorName] = automationDataNameAttributesEnum.presentationDesigner.dataIslandOrSet.columnSetLabelKey;
propertyNameToDataNameAttributeEnum[propertyToPropertyNameEnum.descriptionKeyPropertyEditorName] = automationDataNameAttributesEnum.presentationDesigner.dataIslandOrSet.columnSetDescriptionKey;
propertyNameToDataNameAttributeEnum[propertyToPropertyNameEnum.sourcePathPropertyEditorName] = automationDataNameAttributesEnum.presentationDesigner.dataIslandOrSet.columnSetSource;
module.exports = propertyNameToDataNameAttributeEnum;

});