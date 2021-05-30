define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var dataSourceTypeEnum = require("../../../../model/enum/dataSourceTypeEnum");

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
var schemaErrorMessages = {
  singular: {
    missing: i18nMessage('domain.designer.metadataDesigner.schemaIsMissing.error.message'),
    empty: ''
  },
  plural: {
    missing: i18nMessage('domain.designer.metadataDesigner.schemasAreMissing.error.message'),
    wereMissing: i18nMessage('domain.designer.metadataDesigner.schemasWereMissing.error.message'),
    empty: '',
    wereEmpty: ''
  }
};
var tableErrorMessages = {
  singular: {
    missing: i18nMessage('domain.designer.metadataDesigner.tableIsMissing.error.message'),
    empty: i18nMessage('domain.designer.metadataDesigner.tableIsEmpty.error.message')
  },
  plural: {
    missing: i18nMessage('domain.designer.metadataDesigner.tablesAreMissing.error.message'),
    empty: i18nMessage('domain.designer.metadataDesigner.tablesAreEmpty.error.message'),
    wereMissing: i18nMessage('domain.designer.metadataDesigner.tablesWereMissing.error.message'),
    wereEmpty: i18nMessage('domain.designer.metadataDesigner.tablesWereEmpty.error.message')
  }
};

function getErrorMessage(messagesObject, options) {
  var errors,
      postErrors,
      errorMessage = {
    confirmationDialogErrors: null,
    popoverErrors: null
  },
      multipleResourcesSelected = options.selectedResources.length > 1;

  if (multipleResourcesSelected) {
    if (options.someResourcesAreMissing && options.someResourcesAreChildLess) {
      errors = [messagesObject.plural.missing, messagesObject.plural.empty];
      postErrors = [messagesObject.plural.wereMissing, messagesObject.plural.wereEmpty];
    } else if (options.someResourcesAreMissing) {
      errors = messagesObject.plural.missing;
      postErrors = messagesObject.plural.wereMissing;
    } else if (options.someResourcesAreChildLess) {
      errors = messagesObject.plural.empty;
      postErrors = messagesObject.plural.wereEmpty;
    }

    if (options.resourcesWithChildren.length) {
      errorMessage.confirmationDialogErrors = errors;
      errorMessage.popoverErrors = postErrors;
    } else {
      errorMessage.popoverErrors = errors;
    }
  } else if (options.someResourcesAreMissing) {
    errorMessage.popoverErrors = messagesObject.singular.missing;
  } else if (options.someResourcesAreChildLess) {
    errorMessage.popoverErrors = messagesObject.singular.empty;
  }

  return errorMessage;
}

module.exports = {
  create: function create(options) {
    var dataSourceType = options.dataSourceType,
        metadataResourcesType = options.metadataResourcesType;

    if (dataSourceType === dataSourceTypeEnum.DATA_SOURCE_WITH_SCHEMAS) {
      if (metadataResourcesType === schemaEntitiesEnum.DATA_SOURCE_GROUP) {
        return getErrorMessage(schemaErrorMessages, options);
      } else if (metadataResourcesType === schemaEntitiesEnum.TABLE) {
        return getErrorMessage(tableErrorMessages, options);
      }
    } else if (dataSourceType === dataSourceTypeEnum.DATA_SOURCE_WITHOUT_SCHEMAS) {
      return getErrorMessage(tableErrorMessages, options);
    }
  }
};

});