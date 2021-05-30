define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var dataSourceMetadataTypesEnum = require("../../../../../model/schema/enum/dataSourceMetadataTypesEnum");

var viewStateModelDefaultsEnum = require("../../../../model/enum/viewStateModelDefaultsEnum");

var SimpleModel = require("../../../../../model/util/SimpleModel");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getCalcFieldTypes() {
  var keys = _.sortBy(_.keys(dataSourceMetadataTypesEnum));

  return _.map(keys, function (key) {
    return {
      label: key,
      value: dataSourceMetadataTypesEnum[key]
    };
  });
}

var CalculatedFieldsDesignerStore = SimpleModel.extend({
  defaults: function defaults() {
    return {
      id: null,
      isUsedInComplexJoin: false,
      isUsedInJoinExpression: false,
      isVisible: viewStateModelDefaultsEnum.CALCULATED_FIELDS_DESIGNER.VISIBILITY.value,
      formulaValue: '',
      formulaSelectionRange: {
        start: 0,
        end: 0
      },
      selectionRange: {
        start: 0,
        end: 0
      },
      fieldReferences: [],
      type: dataSourceMetadataTypesEnum.Integer,
      name: '',
      originalName: '',
      expression: {
        string: '',
        object: {}
      },
      availableValuesExpandedNodes: {},
      availableValuesCollapsedNodes: {},
      calcFieldTypes: getCalcFieldTypes(),
      expressionValidationInProgress: false,
      calcFieldValidationInProgress: false,
      errors: {
        name: '',
        expression: {
          message: '',
          level: ''
        }
      },
      expressionValidationSuccessMessage: '',
      searchKeyword: ''
    };
  },
  toDTO: function toDTO() {
    var id = this.get('id');
    var dto = {
      fieldReferences: _.cloneDeep(this.get('fieldReferences')),
      name: this.get('name'),
      expression: _.cloneDeep(this.get('expression')),
      type: this.get('type')
    };

    if (id !== null) {
      dto.id = id;
    }

    return dto;
  }
});
module.exports = CalculatedFieldsDesignerStore;

});