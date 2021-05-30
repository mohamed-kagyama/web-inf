define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var rightOperandValueEnum = require("../../../component/designer/filtersDesigner/draftFilter/enum/rightOperandValueEnum");

var ShouldCheckAvailableValuesLoadingForDraftFilterSpecification = require("../../../component/designer/filtersDesigner/draftFilter/specification/ShouldCheckAvailableValuesLoadingForDraftFilterSpecification");

var isSwitchFromStringSingleSelectToOperatorsWithEmptyDefaultValueSpecification = require("../../../component/designer/filtersDesigner/draftFilter/specification/isSwitchFromStringSingleSelectToOperatorsWithEmptyDefaultValueSpecification");

var ShouldUseDefaultValueForRightOperandSpecification = require("../../../component/designer/filtersDesigner/draftFilter/specification/ShouldUseDefaultValueForRightOperandSpecification");

var ShouldUseRawValueEditorForDraftFilterSpecification = require("../../../component/designer/filtersDesigner/draftFilter/specification/ShouldUseRawValueEditorForDraftFilterSpecification");

var shouldSwitchToRawValueEditorAfterAvailableValuesCheckFailSpecification = require("../../../component/designer/filtersDesigner/draftFilter/specification/shouldSwitchToRawValueEditorAfterAvailableValuesCheckFailSpecification");

var defaultDraftFilterFactory = require("../../../component/designer/filtersDesigner/draftFilter/factory/defaultDraftFilterFactory");

var draftFilterStateEnum = require("../../../component/designer/filtersDesigner/draftFilter/enum/draftFilterStateEnum");

var InitialState = require("../../../component/designer/filtersDesigner/draftFilter/state/InitialState");

var CheckAvailableValuesState = require("../../../component/designer/filtersDesigner/draftFilter/state/CheckAvailableValuesState");

var GetRightOperandDefaultValueState = require("../../../component/designer/filtersDesigner/draftFilter/state/GetRightOperandDefaultValueState");

var finalState = require("../../../component/designer/filtersDesigner/draftFilter/state/finalState");

var GetRightOperandState = require("../../../component/designer/filtersDesigner/draftFilter/state/GetRightOperandState");

var DraftFilterStateFactory = require("../../../component/designer/filtersDesigner/draftFilter/factory/DraftFilterStateFactory");

var FiltersDesignerDraftFilterFactory = require("../../../component/designer/filtersDesigner/draftFilter/factory/FiltersDesignerDraftFilterFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createStatefactory(context, options) {
  var states = {};
  states[draftFilterStateEnum.INITIAL_STATE] = new InitialState({
    defaultDraftFilterFactory: defaultDraftFilterFactory,
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    shouldCheckAvailableValuesLoadingForDraftFilterSpecification: new ShouldCheckAvailableValuesLoadingForDraftFilterSpecification({
      isSwitchFromStringSingleSelectToOperatorsWithEmptyDefaultValueSpecification: isSwitchFromStringSingleSelectToOperatorsWithEmptyDefaultValueSpecification
    }),
    shouldUseRawValueEditorForDraftFilterSpecification: new ShouldUseRawValueEditorForDraftFilterSpecification({
      clientDomainSchemaService: context.get('clientDomainSchemaService')
    })
  });
  states[draftFilterStateEnum.CHECK_AVAILABLE_VALUES_STATE] = new CheckAvailableValuesState({
    availableValuesDataProvider: context.get('dataProviderWithSearchAndCacheForAvailableValues'),
    shouldSwitchToRawValueEditorAfterAvailableValuesCheckFailSpecification: shouldSwitchToRawValueEditorAfterAvailableValuesCheckFailSpecification
  });
  states[draftFilterStateEnum.GET_RIGHT_OPERAND_DEFAULT_VALUE_STATE] = new GetRightOperandDefaultValueState({
    shouldUseDefaultValueForRightOperandSpecification: new ShouldUseDefaultValueForRightOperandSpecification({
      isSwitchFromStringSingleSelectToOperatorsWithEmptyDefaultValueSpecification: isSwitchFromStringSingleSelectToOperatorsWithEmptyDefaultValueSpecification
    })
  });
  states[draftFilterStateEnum.GET_RIGHT_OPERAND_STATE] = new GetRightOperandState({
    rightOperandValueEnum: rightOperandValueEnum,
    validatorConfig: context.get('draftFilterValidatorConfig')
  });
  states[draftFilterStateEnum.FINAL_STATE] = finalState;
  context.register('draftFilterStateFactory', new DraftFilterStateFactory({
    states: states
  }));
}

function createFiltersDesignerDraftFilterFactory(context, options) {
  context.register('filtersDesignerDraftFilterFactory', new FiltersDesignerDraftFilterFactory({
    stateFactory: context.get('draftFilterStateFactory')
  }));
}

module.exports = function (context, options) {
  createStatefactory(context, options);
  createFiltersDesignerDraftFilterFactory(context, options);
};

});