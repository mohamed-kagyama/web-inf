define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var EMPTY_OBJECT = '{}';
module.exports = {
  EMPTY_OBJECT: EMPTY_OBJECT,
  JOINS_DESIGNER: {
    NODE_EXPANSION: {
      property: 'isExpanded',
      value: true
    }
  },
  PRESENTATION_DESIGNER: {
    PRESENTATION_FIELD: {
      value: EMPTY_OBJECT
    },
    PRESENTATION_SET: {
      value: EMPTY_OBJECT
    },
    DATA_ISLAND: {
      value: EMPTY_OBJECT
    },
    NODE_EXPANSION: {
      property: 'isExpanded',
      value: true
    },
    PROPERTY_EDITOR_EXPANSION: {
      property: 'isPropertiesEditorExpanded',
      value: false
    }
  },
  CALCULATED_FIELDS_DESIGNER: {
    VISIBILITY: {
      property: 'visible',
      value: false
    },
    CONTEXT: {
      CALC_FIELD_ID: {
        property: 'calcFieldId',
        value: null
      },
      SOURCE_ID: {
        property: 'sourceId',
        value: null
      },
      SOURCE_TYPE: {
        property: 'sourceType',
        value: ''
      },
      SOURCE_NAME: {
        property: 'sourceName',
        value: ''
      }
    }
  }
};

});