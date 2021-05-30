define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var moment = require("momentExtension");

var numeral = require('numeral/numeral');

var genericTypes = require("../../../model/schema/enum/genericTypesEnum");

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var serverAdHocMasks = require("bundle!adhoc_masks");

var adhocMasksClient = require("bundle!adhoc_masks_client");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
var BUNDLE_PROPERTY_TITLE_SEPARATOR = '_';
var MASK_GROUPS = {
  DATE: 'DATE',
  NUMBER: 'NUMBER'
};
var NONE_MASK = {
  value: '',
  label: i18nMessage('domain.designer.presentationDesigner.presentationField.none')
};

var genericTypesForMasks = _.pick(genericTypes, 'INTEGER', 'DECIMAL', 'TIME', 'TIMESTAMP', 'DATE');

var typeToMask = _.reduce(genericTypesForMasks, function (memo, value) {
  memo[value] = {
    defaults: NONE_MASK,
    available: [NONE_MASK]
  };
  return memo;
}, {});

var numberTypesForExtending = [{
  type: genericTypes.INTEGER,
  bundlePropertyTitle: 'int'
}, {
  type: genericTypes.DECIMAL,
  bundlePropertyTitle: 'dec'
}];
var dateTypesForExtending = [{
  type: genericTypes.DATE,
  bundlePropertyTitle: 'date'
}, {
  type: genericTypes.TIME,
  bundlePropertyTitle: 'time'
}, {
  type: genericTypes.TIMESTAMP,
  bundlePropertyTitle: 'timestamp'
}];

var dateMasks = _getMasksForTypes({
  typeOptions: dateTypesForExtending,
  genericMasks: serverAdHocMasks,
  clientMasks: adhocMasksClient,
  maskGroup: MASK_GROUPS.DATE
});

var numberMasks = _getMasksForTypes({
  typeOptions: numberTypesForExtending,
  genericMasks: serverAdHocMasks,
  clientMasks: adhocMasksClient,
  maskGroup: MASK_GROUPS.NUMBER
});

typeToMask = _extendMasksForTypes({
  typeToMask: typeToMask,
  typesForExtending: _getTypesForExtending(dateTypesForExtending),
  masks: dateMasks
});
typeToMask = _extendMasksForTypes({
  typeToMask: typeToMask,
  typesForExtending: _getTypesForExtending(numberTypesForExtending),
  masks: numberMasks
});

function _getTypesForExtending(typesForExtending) {
  return _.reduce(typesForExtending, function (accumulator, typeOption) {
    return accumulator.concat([typeOption.type]);
  }, []);
}

function _extendMasksForTypes(options) {
  var typeToMask = options.typeToMask,
      masksForExtending = options.masks,
      typesForExtending = options.typesForExtending;

  _.each(typesForExtending, function (type) {
    typeToMask[type].available = typeToMask[type].available.concat(masksForExtending[type]);
  });

  return typeToMask;
}

function _getMasksForTypes(options) {
  var typeOptions = options.typeOptions,
      genericMasks = options.genericMasks,
      clientMasks = options.clientMasks,
      genericMasksForType,
      clientMasksForType,
      maskOptionsForType;
  var result = {};

  _.each(typeOptions, function (typeOption) {
    genericMasksForType = _getMasksForType({
      typeOption: typeOption,
      masks: genericMasks
    });
    clientMasksForType = _getMasksForType({
      typeOption: typeOption,
      masks: clientMasks
    });
    maskOptionsForType = _getMaskOptions({
      genericMasksForType: genericMasksForType,
      clientMasksForType: clientMasksForType,
      maskGroup: options.maskGroup
    });
    result[typeOption.type] = maskOptionsForType;
  });

  return result;
}

function _getMasksForType(options) {
  var masks = options.masks;
  var filteredMasks = {};

  for (var prop in masks) {
    if (masks.hasOwnProperty(prop)) {
      if (_getCurrentTypeFromBundleProp(prop) === options.typeOption.bundlePropertyTitle) {
        filteredMasks[prop] = masks[prop];
      }
    }
  }

  return filteredMasks;
}

function _getCurrentTypeFromBundleProp(prop) {
  var lastSeparatorPosition = prop.lastIndexOf(BUNDLE_PROPERTY_TITLE_SEPARATOR);
  var beforeLastSeparatorPosition = prop.lastIndexOf(BUNDLE_PROPERTY_TITLE_SEPARATOR, lastSeparatorPosition - 1);
  return prop.slice(beforeLastSeparatorPosition + 1, lastSeparatorPosition);
}

function _getMaskOptions(options) {
  var genericMasksForType = options.genericMasksForType,
      clientMasksForType = options.clientMasksForType,
      maskGroup = options.maskGroup,
      lastSeparatorPosition,
      maskSortingPosition;
  var result = [];

  for (var prop in genericMasksForType) {
    if (genericMasksForType.hasOwnProperty(prop)) {
      lastSeparatorPosition = prop.lastIndexOf(BUNDLE_PROPERTY_TITLE_SEPARATOR);
      maskSortingPosition = prop.slice(lastSeparatorPosition + 1);
      result[maskSortingPosition] = {
        label: genericMasksForType[prop],
        value: genericMasksForType[prop]
      };

      if (clientMasksForType[prop]) {
        if (maskGroup === MASK_GROUPS.DATE) {
          result[maskSortingPosition].label = moment.tz(jrsConfigs.userTimezone).format(clientMasksForType[prop]);
        } else if (maskGroup === MASK_GROUPS.NUMBER) {
          result[maskSortingPosition].label = numeral(serverAdHocMasks.ADH_101_EXAMPLE_NUMBER).format(clientMasksForType[prop]);
        }
      }
    }
  }

  return result;
}

module.exports = typeToMask;

});